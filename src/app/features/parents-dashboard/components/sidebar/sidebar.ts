import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


interface NavItem {
  label: string;
  path: string;
  icon: string;
  exact?: boolean;
}
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
    private router = inject(Router);
 
  readonly navItems: NavItem[] = [
    { label: 'لوحة التحكم', path: '/parent/overview',  icon: 'ti-layout-dashboard', exact: true },
    { label: 'أطفالي',      path: '/parent/children',  icon: 'ti-users' },
    { label: 'التقارير',    path: '/parent/reports',   icon: 'ti-chart-bar' },
    { label: 'الملف الشخصي', path: '/parent/profile', icon: 'ti-user-circle' },
  ];
 
  logout(): void {
    // TODO: استدعاء AuthService.logout() وبعدين redirect
    this.router.navigate(['/login']);
  }
}
