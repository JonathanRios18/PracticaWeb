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
  private apiUrl = 'http://192.168.252.226:8000/api/enemies';

  constructor(private http: HttpClient) {}

  getEnemies(): Observable<Enemy[]> {
    return this.http.get<Enemy[]>(this.apiUrl);
  }

  getEnemy(id: number): Observable<Enemy> {
    return this.http.get<Enemy>(`${this.apiUrl}/${id}`);
  }

  addEnemy(enemy: Enemy): Observable<Enemy> {
    return this.http.post<Enemy>(this.apiUrl, enemy);
  }

  deleteEnemy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}