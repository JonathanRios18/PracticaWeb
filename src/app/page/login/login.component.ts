import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [NavbarComponent, FormsModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Almacenar el token en el almacenamiento local o manejo de sesión
          localStorage.setItem('token', response.token);
          
          // Redirigir a la página de inicio (home) o cualquier otra ruta
          this.router.navigate(['/']);  // Esto redirige a la ruta principal
        },
        error: (error) => {
          console.error('Login error', error);
          alert('Credenciales inválidas');
        },
      });
    }
  }
}
