import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService, Character } from '../../services/character.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule, FormsModule]
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  showModal: boolean = false;
  newCharacter: Character = {
    name: '',
    level: 1,
    health: 100
  };

  userRole: string | null = null;

  private pollingInterval: any;

  constructor(private characterService: CharacterService, private authService: AuthService) {}

  ngOnInit(): void {
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

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe(
      (data) => {
        this.characters = data;
      },
      (error) => {
        console.error('Error al cargar los personajes:', error);
      }
    );
  }

  startPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.loadCharacters();
    }, 8000);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  addCharacter(): void {
    this.characterService.createCharacter(this.newCharacter).subscribe(
      (response) => {
        this.characters.push(response);
        this.closeModal();
      },
      (error) => {
        console.error('Error al agregar personaje:', error);
      }
    );
  }

  deleteCharacter(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este personaje?')) {
      this.characterService.deleteCharacter(id).subscribe(
        () => {
          this.characters = this.characters.filter(character => character.id !== id);
          alert('Personaje eliminado correctamente.');
        },
        (error) => {
          console.error('Error al eliminar el personaje:', error);
        }
      );
    }
  }
}
