import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../_models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl + 'company/';

constructor(private http: HttpClient) { }

getAllCompanies(): Observable<Company[]>{
  return this.http.get<Company[]>(this.baseUrl);
}

getCompanyById(id: number): Observable<Company>{
  return this.http.get<Company>(this.baseUrl + id);
}


}
