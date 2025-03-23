import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      birth_day: ['', [Validators.required]]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.message = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.userService.register(this.registerForm.value)
      .pipe(
        catchError((error) => {
          this.message = error.error?.message || 'Ocurrió un error en el registro.';
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.message = 'Registro exitoso. Redirigiendo a la activación...';
          this.registerForm.reset();
          this.router.navigate(['/activation']);
        }
      });
  }
}
