import { Component, OnInit } from '@angular/core';
import { NationService, Nation } from '../../services/nation.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-nations',
  templateUrl: './nations.component.html',
  styleUrls: ['./nations.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule]
})
export class NationsComponent implements OnInit {
  nations: Nation[] = [];
  selectedNation: Nation | null = null;

  constructor(private nationService: NationService) {}

  ngOnInit(): void {
    this.loadNations();
  }

  loadNations(): void {
    this.nationService.getNations().subscribe(
      (data) => {
        this.nations = data;
      },
      (error) => {
        console.error('Error al cargar las naciones:', error);
      }
    );
  }
}