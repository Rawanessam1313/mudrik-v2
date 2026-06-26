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

  // ✅ صفحة الهوم أصبحت عامة (غير محمية)
  {
    path: 'home',
    component: Home   // تم إزالة canActivate: [authGuard]
  },

  //  لوحة تحكم ولي الأمر (User)
  {
    path: 'parent-dashboard',
    canActivate: [authGuard, roleGuard(['User'])],   // تم التغيير من 'Parent' إلى 'User'
    component: ParentsDashboard
  },

  //  لوحة تحكم المدير (Admin)
  {
    path: 'admin-dashboard',
    canActivate: [authGuard, roleGuard(['Admin'])],
    component: ParentsDashboard   // يمكن أن يكون مكوناً مختلفاً للمدير
  },

  // مسارات المصادقة (غير محمية)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // اختصارات لتسجيل الدخول والتسجيل
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

  // أي مسار غير معروف يُعيد التوجيه إلى تسجيل الدخول
  { path: '**', redirectTo: 'auth/login-page' }
];