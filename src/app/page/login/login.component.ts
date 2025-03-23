import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe(
      (response) => {
        const token = response.token; // Asegúrate de que el backend devuelve el token en esta propiedad
        this.authService.saveToken(token);
        this.errorMessage = '';
        this.router.navigate(['/characters']); // Redirige tras login exitoso
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Las credenciales son incorrectas. Por favor, inténtalo de nuevo.';
      }
    );
  }
}