import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://192.168.252.226:8000/api/inventories'; // URL del backend

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryDisplay[]> {
    return this.http.get<InventoryDisplay[]>(this.apiUrl);
  }

  addInventory(item: InventoryForm): Observable<InventoryForm> {
    return this.http.post<InventoryForm>(this.apiUrl, item);
  }

  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
