import { Component, OnInit } from '@angular/core';
import { SkillService, SkillDisplay, SkillForm } from '../../services/skill.service';
import { CharacterService, Character } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { jwtDecode }from 'jwt-decode';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, FormsModule, CommonModule],
})
export class SkillsComponent implements OnInit {
  skills: SkillDisplay[] = [];
  characters: Character[] = [];
  newSkill: SkillForm = { id: 0, skill_name: '', type: '', character_id: 0 };
  showModal: boolean = false;
  userRole: string | null = null;

  private pollingInterval: any;

  constructor(private skillService: SkillService, private characterService: CharacterService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadSkills();
    this.loadCharacters();
    this.startPolling();
    this.getUserRole(); // Obtener el rol del usuario al iniciar
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);  // Detener polling cuando el componente se destruya
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

  loadSkills(): void {
    this.skillService.getSkills().subscribe(
      (data: SkillDisplay[]) => {
        this.skills = data;
      },
      (error) => {
        console.error('Error loading skills:', error);
      }
    );
  }

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe(
      (data: Character[]) => {
        this.characters = data;
      },
      (error) => {
        console.error('Error loading characters:', error);
      }
    );
  }

  startPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.loadSkills();
      this.loadCharacters();
    }, 8000);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newSkill = { id: 0, skill_name: '', type: '', character_id: 0 };
  }

  addSkill(): void {
    if (this.newSkill.skill_name && this.newSkill.type && this.newSkill.character_id) {
      this.skillService.addSkill(this.newSkill).subscribe(
        (response) => {
          const skillDisplay: SkillDisplay = {
            id: response.id,
            skill_name: response.skill_name,
            type: response.type,
            character: this.characters.find(c => c.id === response.character_id)?.name || ''
          };

          this.skills.push(skillDisplay);
          this.closeModal();
        },
        (error) => {
          console.error('Error adding skill:', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  deleteSkill(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta habilidad?')) {
      this.skillService.deleteSkill(id).subscribe(
        () => {
          // Eliminar la habilidad de la lista local
          this.skills = this.skills.filter(skill => skill.id !== id);
        },
        (error) => {
          console.error('Error deleting skill:', error);
        }
      );
    }
  }
}
