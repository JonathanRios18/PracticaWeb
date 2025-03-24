import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://192.168.100.194:8000/api/nations'; // URL de tu backend

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