import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryDisplay, InventoryForm } from '../../services/inventory.service';
import { CharacterService, Character } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, FormsModule, CommonModule],
})
export class InventoriesComponent implements OnInit {
  inventory: InventoryDisplay[] = []; // Para mostrar en la tabla
  characters: Character[] = []; // Lista de personajes
  newInventoryItem: InventoryForm = { id: 0, item_name: '', quantity: 0, character_id: 0 }; // Modelo para formulario
  showModal: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.loadInventory();
    this.loadCharacters();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(
      (data: InventoryDisplay[]) => {
        this.inventory = data;
      },
      (error) => {
        console.error('Error al cargar el inventario:', error);
      }
    );
  }

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe(
      (data: Character[]) => {
        this.characters = data;
      },
      (error) => {
        console.error('Error al cargar los personajes:', error);
      }
    );
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newInventoryItem = { id: 0, item_name: '', quantity: 0, character_id: 0 }; // Reiniciar formulario
  }

  addInventoryItem(): void {
    if (this.newInventoryItem.item_name && this.newInventoryItem.quantity > 0 && this.newInventoryItem.character_id) {
      this.inventoryService.addInventory(this.newInventoryItem).subscribe(
        (response) => {
          const inventoryDisplay: InventoryDisplay = {
            id: response.id,
            item_name: response.item_name,
            quantity: response.quantity,
            character: this.characters.find(c => c.id === response.character_id)?.name || 'Unknown',
          };

          this.inventory.push(inventoryDisplay);
          this.closeModal();
          this.loadInventory();
        },
        (error) => {
          console.error('Error al agregar el inventario:', error);
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  // Método para eliminar un ítem de inventario
  deleteInventoryItem(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este ítem del inventario?')) {
      this.inventoryService.deleteInventory(id).subscribe(
        () => {
          // Eliminar el ítem de la lista local
          this.inventory = this.inventory.filter(item => item.id !== id);
        },
        (error) => {
          console.error('Error al eliminar el ítem de inventario:', error);
        }
      );
    }
  }
}
