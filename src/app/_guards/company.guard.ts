import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { CompanyAuthService } from '../_services/company-auth.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyGuard implements CanActivate{
    constructor(
        private companyAuth: CompanyAuthService,
        private router: Router,
        private alertify: AlertifyService
    ){}

    canActivate(): boolean{
        if(this.companyAuth.loggedIn()){
            return true;
        }
        this.alertify.error('You shall not pass!');
        this.router.navigate(['/']);
        return false;
    }
}