import { Component, OnInit } from '@angular/core';
import { QuestService, Quest } from '../../services/quest.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule],
})
export class QuestsComponent implements OnInit {
  quests: Quest[] = [];
  selectedQuest: Quest | null = null;

  constructor(private questService: QuestService) {}

  ngOnInit(): void {
    this.loadQuests();
  }

  loadQuests(): void {
    this.questService.getQuests().subscribe(
      (data) => {
        this.quests = data;
      },
      (error) => {
        console.error('Error al cargar las misiones:', error);
      }
    );
  }
}
