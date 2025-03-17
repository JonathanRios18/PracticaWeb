import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta por defecto
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
