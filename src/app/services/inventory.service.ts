import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Interfaz para visualización
export interface InventoryDisplay {
  id: number;
  item_name: string;
  quantity: number;
  character: string;
}

// Interfaz para envío al backend
export interface InventoryForm {
  id: number;
  item_name: string;
  quantity: number;
  character_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = `${environment.apiUrl}/inventories`;

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryDisplay[]> {
    return this.http.get<InventoryDisplay[]>(this.apiUrl);
  }

  getInventoryItem(id: number): Observable<InventoryDisplay> {
    return this.http.get<InventoryDisplay>(`${this.apiUrl}/${id}`);
  }

  addInventory(item: InventoryForm): Observable<InventoryForm> {
    return this.http.post<InventoryForm>(this.apiUrl, item);
  }

  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
