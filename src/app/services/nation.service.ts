import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Nation {
  id: number;
  name: string;
  climate: string;
  history: string;
}

@Injectable({
  providedIn: 'root'
})
export class NationService {
  private apiUrl = `${environment.apiUrl}/nations`;
  
  constructor(private http: HttpClient) {}

  getNations(): Observable<Nation[]> {
    return this.http.get<Nation[]>(this.apiUrl);
  }

  getNation(id: number): Observable<Nation> {
    return this.http.get<Nation>(`${this.apiUrl}/${id}`);
  }

  addNation(nation: Nation): Observable<Nation> {
    return this.http.post<Nation>(this.apiUrl, nation);
  }

  deleteNation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}