import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CompanyAuthService } from './_services/company-auth.service';
import { Company } from './_models/company';
import { EmployeeAuthService } from './_services/employee-auth.service';
import { Employee } from './_models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EvidencijaProjekata-SPA';
  jwtHelper = new JwtHelperService();

  constructor(private companyAuth: CompanyAuthService, private employeeAuth: EmployeeAuthService){}

  ngOnInit(){
    const token = localStorage.getItem('token');
    // const company: Company = JSON.parse(localStorage.getItem('company'));
    if (token) {
      if(this.jwtHelper.decodeToken(token).actort == 'company'){
        this.companyAuth.decodedToken = this.jwtHelper.decodeToken(token);
        const company: Company = JSON.parse(localStorage.getItem('company'));
        if(company){
          this.employeeAuth.currentEmployee = company;
        }
        this.companyAuth.currentCompany = company;
      } else {
        this.employeeAuth.decodedToken = this.jwtHelper.decodeToken(token);
        const user: Employee = JSON.parse(localStorage.getItem('user'));
        if(user){
          this.employeeAuth.currentEmployee = user;
        }

      }
    }


  }

  userLoggedIn(){
    return this.employeeAuth.loggedIn();
  }
}
