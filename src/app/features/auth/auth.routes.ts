import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page';
import { RegisterPageComponent } from './components/register-page/register-page';

export const AUTH_ROUTES: Routes = [

  { path: 'login-page', component: LoginPageComponent },

  { path: 'register-page', component: RegisterPageComponent }
];
