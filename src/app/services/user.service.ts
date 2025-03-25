import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  activateAccount(email: string, code: string): Observable<any> {
    const activationUrl = `${this.apiUrl}/activate`;
    return this.http.post<any>(activationUrl, { email, code });
  }
}
