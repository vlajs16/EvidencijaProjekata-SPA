import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Employee } from '../_models/employee';
import { EmployeeAuthService } from '../_services/employee-auth.service';

@Injectable()
export class EmployeesResolver implements Resolve<Employee[]>{
    constructor(
        private alertify: AlertifyService,
        private employeeService: EmployeeAuthService,
        private router: Router
        ){}
    
    resolve(): Observable<Employee[]>{
        return this.employeeService.getAll().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}