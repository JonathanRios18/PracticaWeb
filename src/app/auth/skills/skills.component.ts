import { Component, OnInit } from '@angular/core';
import { SkillService, Skill } from '../../services/skill.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule],
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  selectedSkill: Skill | null = null;

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getSkills().subscribe(
      (data) => {
        this.skills = data;
      },
      (error) => {
        console.error('Error al cargar las habilidades:', error);
      }
    );
  }
}
