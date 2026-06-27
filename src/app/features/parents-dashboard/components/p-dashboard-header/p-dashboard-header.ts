import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { ParentProfileService } from '../../services/parent-profile.service';

@Component({
  selector: 'app-p-dashboard-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './p-dashboard-header.html',
  styleUrl: './p-dashboard-header.css',
})
export class PDashboardHeader {
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private readonly profileService = inject(ParentProfileService);
  private readonly elementRef = inject(ElementRef);

  isDropdownOpen = false;
  readonly hasNotifications = true;

  get parentName(): string {
    return this.profileService.displayName;
  }

  get parentEmail(): string {
    return this.profileService.profile().email;
  }

  get initials(): string {
    return this.profileService.initials;
  }


  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  navigateToProfile(): void {
    this.closeDropdown();
    this.router.navigate(['/parent-dashboard/profile']);
  }

  navigateToDashboard(): void {
    this.closeDropdown();
    this.router.navigate(['/parent-dashboard/overview']);
  }

  logout(): void {
    this.closeDropdown();
    this.auth.logout();
  }

  openAddChild(): void {
    this.router.navigate(['/parent-dashboard/overview']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}
