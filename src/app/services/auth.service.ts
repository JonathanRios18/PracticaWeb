import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Usar jwt-decode para decodificar el token

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://192.168.252.226:8000/api'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para loguearse
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Método para logout
  logout(): Observable<any> {
    const token = this.getToken();
    if (token) {
      return this.http.post(`${this.apiUrl}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return new Observable();
  }

  // Guardar token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token); // Guardar token en localStorage
  }

  // Eliminar token de localStorage
  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  // Obtener token de localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Debugging
      return decodedToken.exp > Date.now() / 1000;
    }
    return false;
  }  
}
