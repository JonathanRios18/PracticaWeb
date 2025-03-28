import { Component, OnInit, OnDestroy } from '@angular/core';
import { InventoryService, InventoryDisplay, InventoryForm } from '../../services/inventory.service';
import { CharacterService, Character } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { jwtDecode }from 'jwt-decode';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, FormsModule, CommonModule],
})
export class InventoriesComponent implements OnInit, OnDestroy {
  inventory: InventoryDisplay[] = [];
  characters: Character[] = [];
  newInventoryItem: InventoryForm = { id: 0, item_name: '', quantity: 0, character_id: 0 };
  showModal: boolean = false;
  userRole: string | null = null;

  private pollingInterval: any;

  constructor(
    private inventoryService: InventoryService,
    private characterService: CharacterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadInventory();
    this.loadCharacters();
    this.getUserRole();
    this.startPolling();
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  getUserRole(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userRole = decodedToken?.role || null;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
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

  startPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.loadInventory();
      this.loadCharacters();
    }, 8000);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newInventoryItem = { id: 0, item_name: '', quantity: 0, character_id: 0 };
  }

  addInventoryItem(): void {
    if (this.newInventoryItem.item_name && this.newInventoryItem.quantity > 0 && this.newInventoryItem.character_id) {
      this.inventoryService.addInventory(this.newInventoryItem).subscribe(
        (response) => {
          const inventoryDisplay: InventoryDisplay = {
            id: response.id,
            item_name: response.item_name,
            quantity: response.quantity,
            character: this.characters.find(c => c.id === response.character_id)?.name || '',
          };

          this.inventory.push(inventoryDisplay);
          this.closeModal();
        },
        (error) => {
          console.error('Error al agregar el inventario:', error);
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  deleteInventoryItem(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este ítem del inventario?')) {
      this.inventoryService.deleteInventory(id).subscribe(
        () => {
          this.inventory = this.inventory.filter(item => item.id !== id);
        },
        (error) => {
          console.error('Error al eliminar el ítem de inventario:', error);
        }
      );
    }
  }
}
