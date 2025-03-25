import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

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
    localStorage.setItem('auth_token', token);
  }

  // Eliminar token de localStorage
  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  // Obtener token de localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken.exp > Date.now() / 1000;
    }
    return false;
  }  

  // Decodificar token
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
