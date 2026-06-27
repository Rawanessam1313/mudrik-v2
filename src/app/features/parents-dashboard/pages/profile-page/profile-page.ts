import { Component } from '@angular/core';
import { ParentProfileComponent } from '../../components/parent-profile/parent-profile';

@Component({
  selector: 'app-profile-page',
  imports: [ParentProfileComponent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {}
