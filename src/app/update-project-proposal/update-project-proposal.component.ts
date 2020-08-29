import { Component, OnInit } from '@angular/core';
import { Company } from '../_models/company';
import { ProjectProposal } from '../_models/project-proposal';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ScientificArea } from '../_models/scientific-area';
import { ExternalMentor } from '../_models/external-mentor';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CompanyAuthService } from '../_services/company-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { ExternalMentorService } from '../_services/external-mentor.service';
import { ProposeProjectService } from '../_services/propose-project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectCoveringSubject } from '../_models/project-covering-subject';
import { BsModalService } from 'ngx-bootstrap/modal';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-project-proposal',
  templateUrl: './update-project-proposal.component.html',
  styleUrls: ['./update-project-proposal.component.css']
})
export class UpdateProjectProposalComponent implements OnInit {
  company: Company;
  externalMentors: ExternalMentor[];
  scientificAreas: ScientificArea[];
  projectForm: FormGroup;
  selectedProjectProposal: ProjectProposal;
  projectProposals: ProjectProposal[];
  bsConfig: Partial<BsDatepickerConfig>;
  coveringSubjectForm: FormGroup;
  selectedSubject: ProjectCoveringSubject;
  subjects;
  subjectIndex: number;
  editedSubject = false;

  constructor(private fb: FormBuilder, private companyAuth: CompanyAuthService, private route: ActivatedRoute,
    private mentorService: ExternalMentorService, private alertify: AlertifyService, private modalService: BsModalService,
    private projectService: ProposeProjectService, private router: Router) { }

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
      this.scientificAreas = data['areas'];
      this.projectProposals = data['projects'];
    });

    this.createCoveringSubjectForm();
    this.createProjectForm();
    }

    createProjectForm(){
      this.projectForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        startDateProjectProposal: [null, Validators.required],
        daysDuration: ['', [Validators.required, this.validateDaysDuration]],
        externalMentor: [null, Validators.required],
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

  createCoveringSubjectForm(){
    this.coveringSubjectForm = this.fb.group({
      area: [null, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  selectProject(id: number){
    this.projectService.getById(id).subscribe((project: ProjectProposal) =>{
      this.createProjectForm();
      this.selectedProjectProposal = project;
      this.projectForm.get('name').setValue(project.name);
      this.projectForm.get('description').setValue(project.description);
      this.projectForm.get('startDateProjectProposal').setValue(new Date(project.startDateProjectProposal));
      this.projectForm.get('daysDuration').setValue(project.daysDuration);
      this.projectForm.get('externalMentor').setValue(project.externalMentor.mentorID);
      let subjects = this.projectForm.get('subjects') as FormArray;
      this.selectedProjectProposal.subjects.forEach((subj) => {
        subjects.push(this.fb.group({
          scientificArea: subj.scientificArea,
          name: subj.name,
          description: subj.description,
        }));
      }, error => {
        this.alertify.error(error);
      })

    });
  }

  

  deleteSubject(index: number){
      this.selectedProjectProposal.subjects.splice(index, 1);
      this.subjects.removeAt(index);
      this.createCoveringSubjectForm();
      this.editedSubject = true;
  }

  selectSubject(index: number){
    this.selectedSubject = this.selectedProjectProposal.subjects[index];
    this.coveringSubjectForm.get('area').setValue(this.selectedSubject.scientificArea.scientificAreaID);
    this.coveringSubjectForm.get('name').setValue(this.selectedSubject.name);
    this.coveringSubjectForm.get('description').setValue(this.selectedSubject.description);
    this.subjectIndex = index;
  }

  updateSubject(){
    if(this.coveringSubjectForm.valid){
      const index = this.selectedProjectProposal.subjects.indexOf(this.selectedSubject);
      if(this.coveringSubjectForm.get('area').dirty)
        this.selectedSubject.scientificArea = this.scientificAreas.find(x => x.scientificAreaID == this.coveringSubjectForm.get('area').value);
      if(this.coveringSubjectForm.get('name').dirty)
        this.selectedSubject.name = this.coveringSubjectForm.get('name').value;
      if(this.coveringSubjectForm.get('description').dirty)
        this.selectedSubject.description = this.coveringSubjectForm.get('description').value;

      this.selectedProjectProposal.subjects[index] = this.selectedSubject;

      this.coveringSubjectForm.get('area').markAsPristine();
      this.coveringSubjectForm.get('description').markAsPristine();
      this.coveringSubjectForm.get('name').markAsPristine();

      this.subjects.at(index).get('name').setValue(this.selectedSubject.name);

      this.createCoveringSubjectForm();
      this.selectedSubject = null;
      this.editedSubject = true;
    }
  }

  deleteProjectProposal(id: number){
    this.projectService.delete(id).subscribe(next => {
      const index = this.projectProposals.findIndex(x => x.projectProposalID == id);
      this.projectProposals.splice(index, 1);
      this.createProjectForm();
      this.createCoveringSubjectForm();
      this.alertify.success('Успешно сте обрисали предлог пројекта');
    }, error => {
      this.alertify.error(error);
    });
  }

  addSubject(){
    if(this.coveringSubjectForm.valid){
      let subjects = this.projectForm.get('subjects') as FormArray;
      let group = this.coveringSubjectForm as FormGroup;
      subjects.push(this.fb.group({
        scientificArea: this.scientificAreas.find(x => x.scientificAreaID == this.coveringSubjectForm.get('area').value),
        name: this.coveringSubjectForm.get('name').value,
        description: this.coveringSubjectForm.get('description').value
      }));

      this.selectedProjectProposal.subjects.push({
        scientificArea: this.scientificAreas.find(x => x.scientificAreaID == this.coveringSubjectForm.get('area').value),
        name: this.coveringSubjectForm.get('name').value,
        description: this.coveringSubjectForm.get('description').value,
        projectCoveringSubjectID: 0
      });
      this.createCoveringSubjectForm();
      this.editedSubject = true;
    }
  }

  updateProjectProposal(){
    if(this.projectForm.valid){
      if(this.projectForm.get('name').dirty)
        this.selectedProjectProposal.name = this.projectForm.get('name').value;
      
      if(this.projectForm.get('description').dirty)
        this.selectedProjectProposal.description = this.projectForm.get('description').value;

      if(this.projectForm.get('startDateProjectProposal').dirty)
        this.selectedProjectProposal.startDateProjectProposal = this.projectForm.get('startDateProjectProposal').value;
        
      if(this.projectForm.get('daysDuration').dirty)
        this.selectedProjectProposal.daysDuration = this.projectForm.get('daysDuration').value;
        
      if(this.projectForm.get('externalMentor').dirty){
        var index = this.company.mentors.findIndex(x => x.mentorID == this.projectForm.get('externalMentor').value)
        this.selectedProjectProposal.externalMentor = this.company.mentors[index];
      }
        //  this.selectedProjectProposal.externalMentor = this.externalMentors.find(x => x.mentorID == this.projectForm.get('externalMentor').value);
      console.log(this.projectForm.get('externalMentor').value);

      this.projectService.update(this.selectedProjectProposal).subscribe((projectProposal: ProjectProposal) => {
        const index = this.projectProposals.findIndex(x => x.projectProposalID == this.selectedProjectProposal.projectProposalID);
        this.projectProposals[index] = projectProposal;
        this.createCoveringSubjectForm();
        this.createProjectForm();
        this.alertify.success('Успешно сте изменили пројекат');
      }, error => {
        this.alertify.error(error);
      })
    }
  }

  isInvalidDate(event){
    const test = event.target.value;
    if ( test == 'Invalid date' ){
      event.target.value = new Date(this.projectForm.get('startDateProjectProposal').value);
    }}

  logout(){
    this.companyAuth.decodedToken = null;
    this.companyAuth.currentCompany = null;
    localStorage.removeItem('token');
    localStorage.removeItem('company');
    this.alertify.success('Успешно сте се одјавили!');
    this.router.navigate(['/']);
  }




}
