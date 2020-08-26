import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl + 'project/';


  constructor(private http: HttpClient) { }

  getNumber(){
    return this.http.get<any>(this.baseUrl + 'number');
  }

  insertProject(project: Project){
    return this.http.post(this.baseUrl, project);
  }

  delete(id: number){
    return this.http.delete(this.baseUrl + id);
  }

  update(project: Project){
    return this.http.put(this.baseUrl + project.projectID, project);
  }

  getById(id: number): Observable<Project>{
    return this.http.get<Project>(this.baseUrl + id);
  }

  getAll(): Observable<Project[]>{
    return this.http.get<Project[]>(this.baseUrl);
  }

}
