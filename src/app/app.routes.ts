import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { ActivationComponent } from './page/activation/activation.component';
import { AuthGuard } from './guards/auth.guard';
import { CharactersComponent } from './auth/characters/characters.component';
import { SkillsComponent } from './auth/skills/skills.component';
import { InventoriesComponent } from './auth/inventories/inventories.component';
import { EnemiesComponent } from './auth/enemies/enemies.component';
import { NationsComponent } from './auth/nations/nations.component';
import { QuestsComponent } from './auth/quests/quests.component';
import { ProfileComponent } from './auth/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activation', component: ActivationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'characters', component: CharactersComponent, canActivate: [AuthGuard] },
  { path: 'skills', component: SkillsComponent, canActivate: [AuthGuard] },
  { path: 'inventories', component: InventoriesComponent, canActivate: [AuthGuard] },
  { path: 'enemies', component: EnemiesComponent, canActivate: [AuthGuard] },
  { path: 'nations', component: NationsComponent, canActivate: [AuthGuard] },
  { path: 'quests', component: QuestsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
