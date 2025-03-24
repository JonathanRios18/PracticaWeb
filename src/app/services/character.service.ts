import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
  id?: number;
  name: string;
  level: number;
  health: number;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'http://192.168.100.194:8000/api/characters'; // Laravel backend

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  createCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(this.apiUrl, character);
  }

  // Método para eliminar un personaje
  deleteCharacter(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
