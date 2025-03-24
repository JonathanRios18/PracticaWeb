import { Component, OnInit } from '@angular/core';
import { EnemyService, Enemy } from '../../services/enemy.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.css'],
  standalone: true,
  imports: [FormsModule, AdminNavbarComponent, CommonModule]
})
export class EnemiesComponent implements OnInit {
  enemies: Enemy[] = [];
  selectedEnemy: Enemy | null = null;
  isModalOpen: boolean = false;
  userRole: string | null = null;

  newEnemy: Enemy = {
    id: 0,
    name: '',
    description: '',
    type: '',
    strength_level: 0
  };

  constructor(private enemyService: EnemyService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEnemies();
    this.getUserRole();
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

  loadEnemies(): void {
    this.enemyService.getEnemies().subscribe(
      (data) => {
        this.enemies = data;
      },
      (error) => {
        console.error('Error al cargar los enemigos:', error);
      }
    );
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  addEnemy(): void {
    this.enemyService.addEnemy(this.newEnemy).subscribe(
      (response) => {
        console.log('Enemigo agregado exitosamente:', response);
        this.enemies.push(response);
        this.closeModal();
        this.loadEnemies();
      },
      (error) => {
        console.error('Error al agregar el enemigo:', error);
      }
    );
  }

  resetForm(): void {
    this.newEnemy = {
      id: 0,
      name: '',
      description: '',
      type: '',
      strength_level: 0
    };
  }

  deleteEnemy(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este enemigo?')) {
      this.enemyService.deleteEnemy(id).subscribe(
        () => {
          this.enemies = this.enemies.filter(enemy => enemy.id !== id);
        },
        (error) => {
          console.error('Error al eliminar el enemigo:', error);
        }
      );
    }
  }
}
