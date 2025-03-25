import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Interfaz para visualización
export interface SkillDisplay {
  id: number;
  skill_name: string;
  type: string;
  character: string;
}

// Interfaz para envío al backend
export interface SkillForm {
  id: number;
  skill_name: string;
  type: string;
  character_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = `${environment.apiUrl}/skills`;

  constructor(private http: HttpClient) {}

  getSkills(): Observable<SkillDisplay[]> {
    return this.http.get<SkillDisplay[]>(this.apiUrl);
  }

  getSkill(id: number): Observable<SkillDisplay> {
    return this.http.get<SkillDisplay>(`${this.apiUrl}/${id}`);
  }

  addSkill(skill: SkillForm): Observable<SkillForm> {
    return this.http.post<SkillForm>(this.apiUrl, skill);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
