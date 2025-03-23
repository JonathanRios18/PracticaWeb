import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quest {
  id: number;
  title: string;
  description: string;
  dificulty_level: string;
  character: string;
  enemy: string;
  nation: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  private apiUrl = 'http://192.168.100.194:8000/api/quests';

  constructor(private http: HttpClient) {}

  getQuests(): Observable<Quest[]> {
    return this.http.get<Quest[]>(this.apiUrl);
  }

  getQuest(id: number): Observable<Quest> {
    return this.http.get<Quest>(`${this.apiUrl}/${id}`);
  }
}
