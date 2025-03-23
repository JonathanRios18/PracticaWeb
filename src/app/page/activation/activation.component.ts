import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent {
  activationForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router  // Inyectar Router
  ) {
    this.activationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  activateAccount() {
    if (this.activationForm.invalid) {
      this.message = 'Por favor, ingresa un correo válido y un código de 6 dígitos.';
      return;
    }

    const { email, code } = this.activationForm.value;

    this.userService.activateAccount(email, code).subscribe(
      (response) => {
        this.message = 'Cuenta activada exitosamente. Ahora puedes iniciar sesión.';
        this.activationForm.reset();
        this.router.navigate(['/login']);
      },
      (error) => {
        this.message = error.error?.message || 'Error al activar la cuenta.';
      }
    );
  }
}
