import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthService {
  baseUrl = environment.apiUrl + 'employee/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentEmployee: any;

  constructor(private http: HttpClient) { }

  login(user: any){
    return this.http.post(this.baseUrl + 'login', user)
    .pipe(
      map((response: any) => {
        const us = response;
        if(response){
          localStorage.setItem('token', us.token);
          localStorage.setItem('user', JSON.stringify(us.user));
          this.decodedToken = this.jwtHelper.decodeToken(us.token);
          this.currentEmployee = us.user;
        }
      })
    );
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getAll(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl);
  }
}
