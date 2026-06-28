import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ParentProfileService } from '../../services/parent-profile.service';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.css',
})
export class DashboardOverview implements OnInit {
  private readonly profileService = inject(ParentProfileService);

  readonly parentName = this.profileService.displayName;
  readonly isLoading  = this.profileService.isLoading;
  readonly profile    = this.profileService.profile;

  ngOnInit(): void {
    this.profileService.loadProfile();
  }
}