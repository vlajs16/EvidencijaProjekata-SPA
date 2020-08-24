import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectProposal } from '../_models/project-proposal';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { CompanyAuthService } from './company-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposeProjectService {
  baseUrl = environment.apiUrl + 'projectProposal/';

  constructor(private http: HttpClient, private alertify: AlertifyService,
    private companyAuth: CompanyAuthService) { }

  insertProjectProposal(projectProposal: ProjectProposal){
    return this.http.post(this.baseUrl + this.companyAuth.decodedToken.nameid, projectProposal);
  }

  getAll(): Observable<ProjectProposal[]>{
    return this.http.get<ProjectProposal[]>(this.baseUrl);
  }

  getById(id: number): Observable<ProjectProposal>{
    return this.http.get<ProjectProposal>(this.baseUrl + id);
  }

}
