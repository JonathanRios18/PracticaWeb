import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule], // ✅ Agregamos ReactiveFormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
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
          this.message = 'Registro exitoso. Revisa tu correo para activarlo.';
          this.registerForm.reset();
        }
      });
  }
}
