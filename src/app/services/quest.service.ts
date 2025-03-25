import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Interfaz de visualización
export interface QuestDisplay {
  id: number;
  title: string;
  description: string;
  dificulty_level: string;
  character: string; // Nombre del personaje
  enemy: string; // Nombre del enemigo
  nation: string; // Nombre de la nación
}

// Interfaz para envío al backend
export interface QuestForm {
  id: number;
  title: string;
  description: string;
  dificulty_level: string;
  character_id: number; // ID del personaje
  enemy_id: number; // ID del enemigo
  nation_id: number; // ID de la nación
}

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  private apiUrl = `${environment.apiUrl}/quests`;

  constructor(private http: HttpClient) {}

  getQuests(): Observable<QuestDisplay[]> {
    return this.http.get<QuestDisplay[]>(this.apiUrl);
  }

  getQuest(id: number): Observable<QuestDisplay> {
    return this.http.get<QuestDisplay>(`${this.apiUrl}/${id}`);
  }

  addQuest(quest: QuestForm): Observable<QuestForm> {
    return this.http.post<QuestForm>(this.apiUrl, quest);
  }

  deleteQuest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
