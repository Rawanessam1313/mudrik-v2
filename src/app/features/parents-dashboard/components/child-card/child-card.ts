import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-card',
  imports: [CommonModule],
  templateUrl: './child-card.html',
  styleUrl: './child-card.css',
})
export class ChildCard {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) age!: number;
  @Input({ required: true }) progress!: number;
  @Input() avatarUrl: string | null = null;

  get initials(): string {
    return this.name.trim().charAt(0);
  }
}
