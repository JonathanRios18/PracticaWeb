import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryItem } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule],
})
export class InventoriesComponent implements OnInit {
  inventory: InventoryItem[] = [];
  selectedItem: InventoryItem | null = null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(
      (data) => {
        this.inventory = data;
      },
      (error) => {
        console.error('Error al cargar el inventario:', error);
      }
    );
  }
}
