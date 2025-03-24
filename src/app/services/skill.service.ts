// skill.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para mostrar en la tabla
export interface SkillDisplay {
  id: number;
  skill_name: string;
  type: string;
  character: string; // Nombre del personaje
}

export interface SkillForm {
  id: number;
  skill_name: string;
  type: string;
  character_id: number; // ID del personaje
}

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = 'http://192.168.100.194:8000/api/skills'; // Ajusta la URL si es necesario

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
}
