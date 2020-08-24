import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExternalMentorContact } from '../_models/external-mentor-contact';
import { CompanyAuthService } from './company-auth.service';
import { ExternalMentor } from '../_models/external-mentor';

@Injectable({
  providedIn: 'root'
})
export class ExternalMentorService {
  baseUrl = environment.apiUrl + 'externalmentor/'
  constructor(private http: HttpClient, private companyAuth: CompanyAuthService) { }

  updateContact(id: number, contact: ExternalMentorContact){
    return this.http.put(this.baseUrl + id + '/contacts/' + this.companyAuth.decodedToken.nameid + '/' + contact.serialNumber, contact); 
  }

  deleteContact(id: number, serialNumber: number){
    return this.http.delete(this.baseUrl + id + '/contacts/' + this.companyAuth.decodedToken.nameid + '/' + serialNumber);
  }

  insertContact(id: number, contact: ExternalMentorContact){
    return this.http.post(this.baseUrl + id + '/contacts/' + this.companyAuth.decodedToken.nameid, contact);
  }

  insertMentor(mentor: ExternalMentor){
    return this.http.post<ExternalMentor>(this.baseUrl + this.companyAuth.decodedToken.nameid, mentor);
  }

}
