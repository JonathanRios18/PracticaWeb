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
        const token = response.token;
        console.log('Token recibido:', token); // Debugging
        if (token) {
          this.authService.saveToken(token);
          console.log('Token guardado:', this.authService.getToken()); // Verificar almacenamiento
          this.errorMessage = '';
          this.router.navigate(['/dashboard']);
        } else {
          console.error('No se recibió un token válido.');
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Las credenciales son incorrectas. Por favor, inténtalo de nuevo.';
      }
    );
  }  
}