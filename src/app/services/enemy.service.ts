import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Enemy {
  id: number;
  name: string;
  description: string;
  type: string;
  strength_level: number;
}

@Injectable({
  providedIn: 'root'
})
export class EnemyService {
  private apiUrl = 'http://192.168.100.194:8000/api/enemies'; // URL de tu backend

  constructor(private http: HttpClient) {}

  getEnemies(): Observable<Enemy[]> {
    return this.http.get<Enemy[]>(this.apiUrl);
  }

  getEnemy(id: number): Observable<Enemy> {
    return this.http.get<Enemy>(`${this.apiUrl}/${id}`);
  }
}