import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { ScientificArea } from '../_models/scientific-area';
import { ScientificAreaService } from '../_services/scientific-area.service';

@Injectable()
export class ScientificAreaResolver implements Resolve<ScientificArea>{
    constructor(
        private alertify: AlertifyService,
        private areaService: ScientificAreaService,
        private router: Router
        ){}

    resolve(): Observable<ScientificArea>{
        return this.areaService.getAllAreas().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}