import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Company } from '../_models/company';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyAuthService {
  baseUrl = environment.apiUrl + 'companyauth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentCompany: Company;

constructor(private http: HttpClient) { }

login(company: any){
  return this.http.post(this.baseUrl + 'login', company)
  .pipe(
    map((response: any) => {
      const comp = response;
      if(comp){
        localStorage.setItem('token', comp.token);
        localStorage.setItem('company', JSON.stringify(comp.company));
        this.decodedToken = this.jwtHelper.decodeToken(comp.token);
        console.log(this.decodedToken.actort);
        this.currentCompany = comp.company;
      }
    })
  );
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token) && this.jwtHelper.decodeToken(token).actort == 'company'; // vraca true ako token nije expired
}

}
