import { Routes } from '@angular/router';

export const PARENTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./pages/dashboard-overview/dashboard-overview').then(
        (m) => m.DashboardOverview,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile-page/profile-page').then(
        (m) => m.ProfilePage,
      ),
  },
];