import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParentProfileService } from '../../services/parent-profile.service';
import { ParentProfile as ParentProfileData } from '../../models/parent-profile.model';

@Component({
  selector: 'app-parent-profile',
  imports: [FormsModule],
  templateUrl: './parent-profile.html',
  styleUrl: './parent-profile.css',
})
export class ParentProfileComponent {
  private readonly profileService = inject(ParentProfileService);

  isEditing = false;
  draft: ParentProfileData = { ...this.profileService.profile() };

  get profile(): ParentProfileData {
    return this.profileService.profile();
  }

  get initials(): string {
    return this.profileService.initials;
  }

  startEdit(): void {
    this.draft = { ...this.profile };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.draft = { ...this.profile };
    this.isEditing = false;
  }

  saveProfile(): void {
    const fullName = this.draft.fullName.trim();
    const email = this.draft.email.trim();

    if (!fullName || !email) {
      return;
    }

    this.profileService.updateProfile({
      ...this.draft,
      fullName,
      email,
      phoneNumber: this.draft.phoneNumber.trim(),
     
    });

    this.isEditing = false;
  }

  onAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

   
  }
}
