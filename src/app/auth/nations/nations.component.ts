import { Component, OnInit } from '@angular/core';
import { NationService, Nation } from '../../services/nation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { AuthService } from '../../services/auth.service';
import { jwtDecode }from 'jwt-decode';

@Component({
  selector: 'app-nations',
  templateUrl: './nations.component.html',
  styleUrls: ['./nations.component.css'],
  standalone: true,
  imports: [FormsModule, AdminNavbarComponent, CommonModule]
})
export class NationsComponent implements OnInit {
  nations: Nation[] = [];
  isModalOpen: boolean = false;
  userRole: string | null = null;

  newNation: Nation = {
    id: 0,
    name: '',
    climate: '',
    history: ''
  };

  constructor(private nationService: NationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadNations();
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

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  addNation(): void {
    this.nationService.addNation(this.newNation).subscribe(
      (response) => {
        console.log('Nación agregada exitosamente:', response);
        this.nations.push(response);
        this.closeModal();
        this.loadNations(); 
      },
      (error) => {
        console.error('Error al agregar la nación:', error);
      }
    );
  }

  resetForm(): void {
    this.newNation = {
      id: 0,
      name: '',
      climate: '',
      history: ''
    };
  }

  deleteNation(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta nación?')) {
      this.nationService.deleteNation(id).subscribe(
        () => {
          this.nations = this.nations.filter(nation => nation.id !== id);
        },
        (error) => {
          console.error('Error al eliminar la nación:', error);
        }
      );
    }
  }
}
