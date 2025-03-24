import { Component, OnInit } from '@angular/core';
import { QuestService, QuestDisplay, QuestForm } from '../../services/quest.service';
import { CharacterService, Character } from '../../services/character.service';
import { EnemyService, Enemy } from '../../services/enemy.service';
import { NationService, Nation } from '../../services/nation.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { jwtDecode }from 'jwt-decode';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule, FormsModule],
})
export class QuestsComponent implements OnInit {
  userRole: string | null = null; // Variable para almacenar el rol del usuario
  quests: QuestDisplay[] = []; // Para mostrar en la tabla
  newQuest: QuestForm = {
    id: 0,
    title: '',
    description: '',
    dificulty_level: '',
    character_id: 0,
    enemy_id: 0,
    nation_id: 0,
  }; // Modelo para el formulario
  characters: Character[] = []; // Lista de personajes
  enemies: Enemy[] = []; // Lista de enemigos
  nations: Nation[] = []; // Lista de naciones
  showModal: boolean = false; // Controla la apertura del modal

  constructor(
    private questService: QuestService,
    private characterService: CharacterService,
    private enemyService: EnemyService,
    private nationService: NationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadQuests();
    this.loadCharacters();
    this.loadEnemies();
    this.loadNations();
    this.getUserRole(); // Obtener el rol del usuario al iniciar
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

  loadQuests(): void {
    this.questService.getQuests().subscribe(
      (data: QuestDisplay[]) => {
        this.quests = data;
      },
      (error) => {
        console.error('Error al cargar las misiones:', error);
      }
    );
  }

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe(
      (data: Character[]) => {
        this.characters = data;
      },
      (error) => {
        console.error('Error al cargar personajes:', error);
      }
    );
  }

  loadEnemies(): void {
    this.enemyService.getEnemies().subscribe(
      (data: Enemy[]) => {
        this.enemies = data;
      },
      (error) => {
        console.error('Error al cargar enemigos:', error);
      }
    );
  }

  loadNations(): void {
    this.nationService.getNations().subscribe(
      (data: Nation[]) => {
        this.nations = data;
      },
      (error) => {
        console.error('Error al cargar naciones:', error);
      }
    );
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newQuest = {
      id: 0,
      title: '',
      description: '',
      dificulty_level: '',
      character_id: 0,
      enemy_id: 0,
      nation_id: 0,
    };
  }

  addQuest(): void {
    if (
      this.newQuest.title &&
      this.newQuest.description &&
      this.newQuest.dificulty_level &&
      this.newQuest.character_id &&
      this.newQuest.enemy_id &&
      this.newQuest.nation_id
    ) {
      this.questService.addQuest(this.newQuest).subscribe(
        (response) => {
          // Convertir la respuesta de QuestForm a QuestDisplay para mostrarla en la tabla
          const questDisplay: QuestDisplay = {
            id: response.id,
            title: response.title,
            description: response.description,
            dificulty_level: response.dificulty_level,
            character: this.characters.find(c => c.id === response.character_id)?.name || 'Unknown',
            enemy: this.enemies.find(e => e.id === response.enemy_id)?.name || 'Unknown',
            nation: this.nations.find(n => n.id === response.nation_id)?.name || 'Unknown',
          };

          this.quests.push(questDisplay); // Añadir a la lista
          this.closeModal();
          this.loadQuests();
        },
        (error) => {
          console.error('Error al agregar la misión:', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Método para eliminar una nación
  deleteQuest(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta nación?')) {
      this.questService.deleteQuest(id).subscribe(
        () => {
          // Eliminar la nación de la lista local
          this.quests = this.quests.filter(quest => quest.id !== id);
        },
        (error) => {
          console.error('Error al eliminar la nación:', error);
        }
      );
    }
  }
}