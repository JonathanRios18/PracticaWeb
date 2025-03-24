import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuestDisplay {
  id: number;
  title: string;
  description: string;
  dificulty_level: string;
  character: string; // Nombre del personaje
  enemy: string; // Nombre del enemigo
  nation: string; // Nombre de la nación
}

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
  private apiUrl = 'http://192.168.252.226:8000/api/quests';

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
