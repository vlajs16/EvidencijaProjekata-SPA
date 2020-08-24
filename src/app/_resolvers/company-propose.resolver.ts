import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Company } from '../_models/company';
import { Observable, of } from 'rxjs';
import { CompanyAuthService } from '../_services/company-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { CompanyService } from '../_services/company.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CompanyProposeResolver implements Resolve<Company>{
    constructor(
        private companyAuth: CompanyAuthService,
        private alertify: AlertifyService,
        private companyService: CompanyService,
        private router: Router
        ){}
    
    resolve(): Observable<Company>{
        return this.companyService.getCompanyById(this.companyAuth.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}