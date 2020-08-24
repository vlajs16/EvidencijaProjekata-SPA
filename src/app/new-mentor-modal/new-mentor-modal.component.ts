import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExternalMentorService } from '../_services/external-mentor.service';
import { ExternalMentor } from '../_models/external-mentor';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-new-mentor-modal',
  templateUrl: './new-mentor-modal.component.html',
  styleUrls: ['./new-mentor-modal.component.css']
})
export class NewMentorModalComponent implements OnInit {
  @ViewChild('template') elementView: TemplateRef<any>;
  modalRef: BsModalRef;
  @Output() updateMentor = new EventEmitter<ExternalMentor>();

  newMentor: ExternalMentor;
  mentorForm: FormGroup;
  contacts;


  constructor(private modalService: BsModalService, private mentorService: ExternalMentorService,
    private fb: FormBuilder, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createMentorForm();
  }


  showComponent(){
    this.modalRef = this.modalService.show(this.elementView);
  }

  hideComponent(){
    this.modalRef.hide();
  }

  createMentorForm(){
    this.mentorForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      contactType1: ['Telephone', Validators.required],
      contacts: new FormArray([], this.validateSize)
    });

    this.contacts = this.mentorForm.get('contacts') as FormArray;
  }

  validateSize(arr: FormArray){
    return arr.length <= 0 ? {invalidSize: true} : null;
  }


  addNewContact(){
    const contact = this.fb.group({
      contactType: [this.mentorForm.get('contactType1').value, Validators.required],
      value: ['', Validators.required]
    });
    console.log(contact);
    this.contacts.push(contact);
  }

  deleteContact(index: number){
    this.contacts.removeAt(index);
  }

  insertMentor(){
    if(this.mentorForm.valid){

      var mentor: ExternalMentor = {
        mentorID: 0,
        name: '',
        surname: '',
        contacts: [{contactType: '', value: ''}]
      };

      mentor = Object.assign(mentor, this.mentorForm.value);
      
      this.mentorService.insertMentor(mentor).subscribe((newMentor: ExternalMentor) => {
        this.newMentor = newMentor;
        this.updateMentor.emit(newMentor);
        this.alertify.success('Успешно сте додали новог ментора')
        this.createMentorForm();
        this.modalRef.hide();
      }, error => {
        this.alertify.error(error);
      })
    }
  }

}
