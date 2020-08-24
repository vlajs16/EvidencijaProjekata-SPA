import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ScientificArea } from '../_models/scientific-area';

@Injectable({
  providedIn: 'root'
})
export class ScientificAreaService {
baseUrl = environment.apiUrl + 'scientificarea/';
constructor(private http: HttpClient) { }

getAllAreas(): Observable<ScientificArea[]>{
  return this.http.get<ScientificArea[]>(this.baseUrl);
}

getArea(id: number): Observable<ScientificArea>{
  return this.http.get<ScientificArea>(this.baseUrl + id);
}

find(criteria: string): Observable<ScientificArea[]>{
  return this.http.get<ScientificArea[]>(this.baseUrl + 'criteria/' + criteria);
}

}
