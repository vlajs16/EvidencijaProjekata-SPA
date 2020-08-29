import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { ProjectProposal } from '../_models/project-proposal';
import { ProposeProjectService } from '../_services/propose-project.service';

@Injectable()
export class ProposedProjectsCompanyResolver implements Resolve<ProjectProposal[]>{
    constructor(
        private alertify: AlertifyService,
        private projectProposal: ProposeProjectService,
        private router: Router
        ){}
    
    resolve(): Observable<ProjectProposal[]>{
        return this.projectProposal.getByCompany().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}