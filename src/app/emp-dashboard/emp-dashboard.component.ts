import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {
  approved: number;
  notApproved: number;
  numbers: number[];

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.approved = data['numbers'].approved;
      this.notApproved = data['numbers'].notApproved;
    });
  }

}
