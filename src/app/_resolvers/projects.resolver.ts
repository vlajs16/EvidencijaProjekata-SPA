import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { ProjectProposal } from '../_models/project-proposal';
import { ProposeProjectService } from '../_services/propose-project.service';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';

@Injectable()
export class ProjectsResolver implements Resolve<Project[]>{
    constructor(
        private alertify: AlertifyService,
        private projectService: ProjectService,
        private router: Router
        ){}
    
    resolve(): Observable<Project[]>{
        return this.projectService.getAll().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}