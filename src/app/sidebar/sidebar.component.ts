import { Component, OnInit } from '@angular/core';
import { EmployeeAuthService } from '../_services/employee-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: Employee;
  constructor(private empAuth: EmployeeAuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this.empAuth.currentEmployee;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.empAuth.decodedToken = null;
    this.empAuth.currentEmployee = null;
    this.alertify.success('Успешно сте се одјавили!');
    this.router.navigate(['/employee']);
  }

}
