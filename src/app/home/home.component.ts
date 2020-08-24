import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyAuthService } from '../_services/company-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  model: any = {};
  constructor(
    private fb: FormBuilder,
    private companyAuth: CompanyAuthService,
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
      console.log(this.model)
      this.companyAuth.login(this.model).subscribe(next => {
        this.alertify.success("Успешно сте се улоговали");
        this.router.navigate(['/projectproposal']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

}
