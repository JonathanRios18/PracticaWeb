import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
  standalone: true
})
export class AdminNavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión', error);
        alert('Tu sesión ha expirado. Inicia sesión de nuevo.');
        localStorage.removeItem('token'); // Asegurarse de que el token se borre
        this.router.navigate(['/login']);
      },
    });
  }
}
