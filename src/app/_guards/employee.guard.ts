import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { CompanyAuthService } from '../_services/company-auth.service';
import { EmployeeAuthService } from '../_services/employee-auth.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeGuard implements CanActivate{
    constructor(
        private employeeAuth: EmployeeAuthService,
        private router: Router,
        private alertify: AlertifyService
    ){}

    canActivate(): boolean{
        if(this.employeeAuth.loggedIn()){
            return true;
        }
        this.alertify.error('You shall not pass!');
        this.router.navigate(['/employee']);
        return false;
    }
}