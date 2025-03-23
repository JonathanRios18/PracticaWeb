import { Component, OnInit } from '@angular/core';
import { EnemyService, Enemy } from '../../services/enemy.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule]
})
export class EnemiesComponent implements OnInit {
  enemies: Enemy[] = [];
  selectedEnemy: Enemy | null = null;

  constructor(private enemyService: EnemyService) {}

  ngOnInit(): void {
    this.loadEnemies();
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
}