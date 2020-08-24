import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { ScientificArea } from '../_models/scientific-area';
import { ScientificAreaService } from '../_services/scientific-area.service';
import { ProjectService } from '../_services/project.service';

@Injectable()
export class NumbersResolver implements Resolve<any>{
    constructor(
        private alertify: AlertifyService,
        private projectService: ProjectService,
        private router: Router
        ){}

    resolve(): Observable<any>{
        return this.projectService.getNumber().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}