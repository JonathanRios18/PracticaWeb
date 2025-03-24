import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `http://192.168.252.226:8000/api`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, data);
  }

  activateAccount(email: string, code: string): Observable<any> {
    const activationUrl = `${this.apiUrl}/users/activate`; // URL del endpoint de activación
    return this.http.post<any>(activationUrl, { email, code });
  }
}
