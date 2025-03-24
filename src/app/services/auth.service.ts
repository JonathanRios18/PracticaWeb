import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Usar importación predeterminada de jwt-decode

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://192.168.100.194:8000/api'; // URL de tu backend

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

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

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token'); // Método para eliminar el token
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token); // Decodificar el token
      return decodedToken.exp > Date.now() / 1000; // Verificar si el token no ha expirado
    }
    return false;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role; // Retornar el rol del usuario desde el token decodificado
    }
    return null;
  }

  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'admin'; // Verificar si el rol es 'admin'
  }

  isUser(): boolean {
    const role = this.getUserRole();
    return role === 'user'; // Verificar si el rol es 'user'
  }
}
