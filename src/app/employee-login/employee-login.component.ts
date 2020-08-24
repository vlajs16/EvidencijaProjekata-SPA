import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { EmployeeAuthService } from '../_services/employee-auth.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  loginForm: FormGroup;
  model: any = {};
  constructor(
    private fb: FormBuilder,
    private employeeAuth: EmployeeAuthService,
    private alertify: AlertifyService,
    private router: Router
    ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(4)]]
    });
  }

  login(){
    if (this.loginForm.valid){
      this.model.username = this.loginForm.get('username').value;
      this.model.password = this.loginForm.get('password').value;
      this.employeeAuth.login(this.model).subscribe(next => {
        this.alertify.success("Успешно сте се улоговали");
        console.log(this.employeeAuth.currentEmployee);
        this.router.navigate(['/dashboard']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

}
