import { Component } from '@angular/core';
import { ParentProfile } from '../../components/parent-profile/parent-profile';


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ParentProfile
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage {}