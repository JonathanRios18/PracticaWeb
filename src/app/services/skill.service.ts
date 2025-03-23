import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Skill {
  id: number;
  skill_name: string;
  type: string;
  character: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = 'http://192.168.100.194:8000/api/skills'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient) {}

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }
}
