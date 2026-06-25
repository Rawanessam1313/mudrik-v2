import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ParentsDashboard } from './features/parents-dashboard/parents-dashboard';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
  path: 'dashboard',
  component: ParentsDashboard
},
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'login',
    redirectTo: 'auth/login-page',
    pathMatch: 'full'
  },
  {
    path: 'register',
    redirectTo: 'auth/register-page',
    pathMatch: 'full'
  },

 
  {
    path: 'parent-dashboard',
    canActivate: [authGuard, roleGuard(['parent'])],
    component: ParentsDashboard
  },

  {
    path: 'admin-dashboard',
    canActivate: [authGuard, roleGuard(['admin'])],
    component: ParentsDashboard
  },

  // داشبورد الطالب — محمي بالـ auth + role
  // {
  //   path: 'student-dashboard',
  //   canActivate: [authGuard, roleGuard(['Student'])],
  //   loadComponent: () =>
  //     import('./features/student/dashboard/dashboard.component').then(m => m.DashboardComponent)
  // },

  { path: '**', redirectTo: 'auth/login-page' }
];
