import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Company } from '../_models/company';
import { ExternalMentor } from '../_models/external-mentor';
import { ScientificArea } from '../_models/scientific-area';
import { ProjectProposal } from '../_models/project-proposal';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CompanyAuthService } from '../_services/company-auth.service';
import { ActivatedRoute } from '@angular/router';
import { ExternalMentorContact } from '../_models/external-mentor-contact';
import { ExternalMentorService } from '../_services/external-mentor.service';
import { AlertifyService } from '../_services/alertify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewMentorModalComponent } from '../new-mentor-modal/new-mentor-modal.component';
import { ProposeProjectService } from '../_services/propose-project.service';

@Component({
  selector: 'app-project-proposal',
  templateUrl: './project-proposal.component.html',
  styleUrls: ['./project-proposal.component.css'],
  animations: [
    trigger('add', [
      state('true', style({width: '45%'})),
      state('false', style({width: '100%'})),
      transition('true <=> false', animate('0.4s'))
    ]),

    trigger('close', [
      state('true', style({width: '45%'})),
      state('false', style({width: '100%'})),
      transition('true <=> false', animate('0.4s'))
    ]),

    trigger('lower', [
      state('true', style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('true <=> false', animate('0.4s'))
    ])
  ]
})
export class ProjectProposalComponent implements OnInit {
  company: Company;
  externalMentors: ExternalMentor[];
  newExternalMentor: ExternalMentor;
  scientificAreas: ScientificArea[];
  projectProposal: ProjectProposal;
  projectForm: FormGroup;
  addContactForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  selectedMentor: ExternalMentor;
  // editContact: boolean[] = [];
  editForm: FormGroup;
  coveringSubjectForm: FormGroup;

  modalRef: BsModalRef;
  subjects;
  
  @ViewChild(NewMentorModalComponent) newMentor;

  // treba dodati tip kontakta kao string da bira iz padajuceg menija

  constructor(private fb: FormBuilder, private companyAuth: CompanyAuthService, private route: ActivatedRoute,
    private mentorService: ExternalMentorService, private alertify: AlertifyService, private modalService: BsModalService,
    private projectService: ProposeProjectService) { }

  ngOnInit() {
    var date  = new Date();
    var miniDate = new Date();
    miniDate.setDate(date.getDate() + 5);
    this.bsConfig = {
      containerClass: 'theme-blue',
      minDate: miniDate
    }
    
    this.route.data.subscribe(data => {
      this.company = data['company'];
      this.selectedMentor = this.company.mentors[0];
      this.scientificAreas = data['areas'];
      this.createCoveringSubjectForm();
      for (let i = 0; i <  this.company.mentors[0].contacts.length; i++) {
        // this.editContact[i] = false;
        this.createEditContactFormGroup();
        // console.log(this.editContact);
        console.log("dodato");
      }
    });

    this.createProjectForm();
    this.createContactForm();
    
    
    // this.company = this.companyAuth.currentCompany;


  }

  ngOnLoad(){
    this.createEditContactFormGroup();
  }

  createProjectForm(){
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      goal: ['', Validators.required],
      description: ['', Validators.required],
      activities: ['', Validators.required],
      startDateProjectProposal: [null, Validators.required],
      daysDuration: ['', [Validators.required, this.validateDaysDuration]],
      externalMentor: [this.selectedMentor.mentorID, Validators.required],
      subjects: this.fb.array([], this.validateSubjectsArray)
    });

    this.subjects = this.projectForm.get('subjects') as FormArray;
  }

  validateSubjectsArray(arr: FormArray){
    return arr.length <= 0 ? {'invalid-length': true} : null;
  }

  validateDaysDuration(d: FormControl){
    const days = Number(d.value);
    return (isNaN(days) || (days < 0 || days > 92)) ? {'not-number': true} : null;
  }


  proposeProject(){
    if(this.projectForm.valid){
      this.projectProposal = Object.assign({}, this.projectForm.value);
      // console.log(this.projectProposal);
      this.projectProposal.externalMentor = this.company.mentors.find(x => x.mentorID == this.projectForm.get('externalMentor').value);
      // this.projectProposal.subjects.forEach(subj => subj.scientificArea == this.scientificAreas.find(x => x.scientificAreaID == ));
      // for (let i = 0; i < this.subjects.length; i++) {
      //   this.projectProposal.subjects[i].scientificArea = this.scientificAreas.find(x => x.scientificAreaID == this.subjects[i].get('scientificArea').value)
      // }
      // console.log(this.projectProposal);
      this.projectProposal.company = this.company;
      this.projectService.insertProjectProposal(this.projectProposal).subscribe(next => {
        this.createProjectForm();
        this.createContactForm();
        this.createCoveringSubjectForm();
        this.alertify.success('Успешно сте предложили пројекат');
      }, error => {
        this.alertify.error(error);
      });

    }else{
      this.alertify.error('Невалидан унос података');
    }
  }

  // Sredjivanje kontakta
  addContact: boolean = false;

  togleContact(){
    this.addContact = !this.addContact;
  }

  addNewContact(){
    console.log(this.addContactForm.get('contactType').value + " " + this.addContactForm.get('value').value);
    if(this.addContactForm.valid){
      let contact: ExternalMentorContact = {
        contactType: this.addContactForm.get('contactType').value,
        value: this.addContactForm.get('value').value
    };

      this.mentorService.insertContact(this.selectedMentor.mentorID, contact).subscribe((cont: ExternalMentorContact) => {
        this.selectedMentor.contacts.push(cont);
        this.alertify.success('Успешно сте додали контакт');
        this.addContact = false;
        this.addContactForm.get('value').setValue('');
        this.addContactForm.get('contactType').setValue('Telephone');
        // this.createEditContactSelected();
      this.createEditContactFormGroup();
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  deleteContact(index: number){
    const contact = this.selectedMentor.contacts[index];
    this.mentorService.deleteContact(this.selectedMentor.mentorID, contact.serialNumber).subscribe(next => {
      this.selectedMentor.contacts.splice(index, index);
      this.alertify.success("Успешно сте обрисали контакт")
      // this.createEditContactSelected();
      this.createEditContactFormGroup();

    }, error => {
      this.alertify.error(error)
    });
  }

  changeSelectedMentor(){
      this.selectedMentor = this.company.mentors.find(x => x.mentorID == this.projectForm.get('externalMentor').value);
      console.log(this.selectedMentor);
      // this.createEditContactSelected();
      this.createEditContactFormGroup();
  }

  // Editovanje kontakta

  enableEditingContact(id: number){
    this.editForm.get('contact' + id).enable();
  }

  updateContact(index: number){
    if(this.editForm.valid){
        let contact = this.selectedMentor.contacts[index];
        contact.value = this.editForm.get('contact' + index).value;
        this.mentorService.updateContact(this.selectedMentor.mentorID, contact).subscribe(next => {
        this.editForm.get('contact' + index).disable();
        this.alertify.success("Успешно сте изменили контакт");
      }, error => {
        this.alertify.error(error);
      });
    }
  }


  createContactForm(){
    this.addContactForm = this.fb.group({
      contactType: ['Telephone', Validators.required],
      value: ['', Validators.required]});
  }

  createEditContactFormGroup(){
    let group: any = {};
    let i = 0;
    const byId = (el: ExternalMentor) => el.mentorID == this.selectedMentor.mentorID;

    const index = this.company.mentors.findIndex(byId);
    this.company.mentors[index].contacts.forEach(cont => {
      group['contact' + i] = new FormControl({value: cont.value, disabled: true}, Validators.required);
      i++;
    });
    // this.editForm = this.fb.group(group);
    this.editForm = new FormGroup(group);
  }

  openModal() {
    this.newMentor.showComponent();
  }

  addNewMentor(emp){
    this.company.mentors.push(emp);
  }

  // COVERING SUBJECTS

  createCoveringSubjectForm(){
    this.coveringSubjectForm = this.fb.group({
      area: [this.scientificAreas[0].scientificAreaID, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addCoveringSubject(){
    if(this.coveringSubjectForm.valid){
      let subjects = this.projectForm.get('subjects') as FormArray;
      let group = this.coveringSubjectForm as FormGroup;
      subjects.push(this.fb.group({
        scientificArea: this.scientificAreas.find(x => x.scientificAreaID == this.coveringSubjectForm.get('area').value),
        name: this.coveringSubjectForm.get('name').value,
        description: this.coveringSubjectForm.get('description').value
      }));
      this.createCoveringSubjectForm();
    }
  }

  deleteSubject(index: number){
    let subjects = this.projectForm.get('subjects') as FormArray;
    subjects.removeAt(index);
  }

}
