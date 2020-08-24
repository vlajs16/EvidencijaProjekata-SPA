import { Component, OnInit } from '@angular/core';
import { ProposeProjectService } from '../_services/propose-project.service';
import { ProjectService } from '../_services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectProposal } from '../_models/project-proposal';
import { Project } from '../_models/project';
import { Employee } from '../_models/employee';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeAuthService } from '../_services/employee-auth.service';

@Component({
  selector: 'app-approving-project',
  templateUrl: './approving-project.component.html',
  styleUrls: ['./approving-project.component.css']
})
export class ApprovingProjectComponent implements OnInit {
  proposals: ProjectProposal[];
  selectedProposal: ProjectProposal;
  projectToApprove: Project;
  mentors: Employee[];
  projectForm: FormGroup;

  constructor(private proposalService: ProposeProjectService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private authService: EmployeeAuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.proposals = data['projects'];
      this.mentors = data['employees'];
    });
    this.createProjectForm();
  }

  setSelectedProposal(id: number){
    this.proposalService.getById(id).subscribe((proposal: ProjectProposal) => {
      this.selectedProposal = proposal;
      this.projectForm.get('projectProposal').setValue(proposal.projectProposalID);
    }, error => {
      this.alertify.error(error);
    });
  }

  createProjectForm(){
    this.projectForm = this.fb.group({
      projectProposal: ['', Validators.required],
      description: ['', Validators.required],
      note: [''],
      internalMentor: [this.mentors[0].employeeID, Validators.required]
    });
  }

  approveProject(){
    if(this.projectForm.valid){
      this.projectToApprove = Object.assign({}, this.projectForm.value);
      this.projectToApprove.projectProposal = this.selectedProposal;
      this.projectToApprove.internalMentor = this.mentors.find(x => x.employeeID == this.projectForm.get('internalMentor').value);
      this.projectToApprove.decisionMaker = this.authService.currentEmployee;
      this.projectService.insertProject(this.projectToApprove).subscribe(next =>{
        this.alertify.success('Успешно сте одобрили пројекат');
        const index = this.proposals.findIndex(x => x.projectProposalID == this.projectToApprove.projectProposal.projectProposalID);
        this.proposals.splice(index, index);
        this.cancelApproval();
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  cancelApproval(){
    this.selectedProposal = null;
    this.createProjectForm();
  }

}
