import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
  standalone: true,
})
export class AdminNavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Logout successful', response);
        this.authService.removeToken(); // Eliminar el token
        this.router.navigate(['/login']); // Redirigir a la página de login
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
}
