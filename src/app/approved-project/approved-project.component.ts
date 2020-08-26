import { Component, OnInit } from '@angular/core';
import { Project } from '../_models/project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../_services/project.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../_models/employee';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-approved-project',
  templateUrl: './approved-project.component.html',
  styleUrls: ['./approved-project.component.css'],
  animations: [
    trigger('forEditing', [
      state('not-edit', style({
          // display: 'none',
          opacity: 0
      })),
      state('edit', style({
        // display: 'block',
        opacity: 1
      })),
      transition('not-edit => edit', [
        animate('400ms')
      ]),
      transition('edit => not-edit', [
        animate('400ms')
      ])
    ]),
    trigger('displaying', [
      state('not-edit', style({
        display: 'none'
      })),
      state('edit', style({
        display: 'block'
      })),
      transition('not-edit => edit', [
        animate('50ms')
      ]),
      transition('edit => not-edit', [
        animate('450ms')
      ])
    ])
  ]
})
export class ApprovedProjectComponent implements OnInit {
  selectedProject: Project;
  projects: Project[];
  projectForm: FormGroup;
  mentors: Employee[];


  constructor(private fb: FormBuilder, private projectService: ProjectService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projects = data['projects'];
      this.mentors = data['employees'];
    });
    this.createProjectForm();
  }

  createProjectForm(){
    this.projectForm = this.fb.group({
      description: [this.selectedProject?.description, Validators.required],
      note: [this.selectedProject?.note],
      internalMentor: [this.mentors[0].employeeID, Validators.required]
    });
  }

  deleteProject(index: number){
    var projectToDelete: Project = this.projects[index];
    this.projectService.delete(projectToDelete.projectID).subscribe(next => {
      this.projects.splice(index, 1);
      this.selectedProject = null;
      this.createProjectForm();
      this.alertify.success('Успешно сте избрисали пројекат');
    }, error => {
      this.alertify.error(error);
    });
  }

  updateProject(){
    console.log(this.projectForm.dirty)
    if(this.projectForm.dirty && this.projectForm.valid){
      this.projectForm.get('description').dirty ? this.selectedProject.description = this.projectForm.get('description').value : null;
      this.projectForm.get('note').dirty ? this.selectedProject.note = this.projectForm.get('note').value : null;
      this.projectForm.get('internalMentor').dirty ? this.selectedProject.internalMentor = this.mentors.find(x => x.employeeID == this.projectForm.get('internalMentor').value) : null;

      this.projectService.update(this.selectedProject).subscribe(next => {
        this.projectForm.markAsPristine();
        this.alertify.success('Успешно сте изменили пројекат');
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  setToEdit(id: number){
    this.projectService.getById(id).subscribe((project: Project) => {
      this.selectedProject = project;
      this.projectForm.get('internalMentor').setValue(this.selectedProject.internalMentor.employeeID);
      this.projectForm.get('description').setValue(this.selectedProject.description);
      this.projectForm.get('note').setValue(this.selectedProject.note);
    }, error => {
      this.alertify.error(error);
    });
  }

  cancelEdit(){
    this.selectedProject = null;
    this.createProjectForm();
  }

}
