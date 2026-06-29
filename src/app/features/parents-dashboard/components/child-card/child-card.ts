import { Component, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDto, Gender } from '../../models/Iparent';
import { GamificationService } from '../../services/gamification.service';

@Component({
  selector: 'app-child-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-card.html',
  styleUrl: './child-card.css',
})
export class ChildCard {
  private readonly gamification = inject(GamificationService);

  readonly student  = input.required<StudentDto>();
  readonly isActive = input<boolean>(false);
  readonly viewDetails = output<StudentDto>();

  // ─── Computed ─────────────────────────────────────────────

  readonly avatarUrl = computed(() =>
    `/avatars/${this.student().avatarId}.png`
  );

  readonly gradeLevelText = computed(() => {
    const grades: Record<number, string> = {
      1: 'الصف الأول الابتدائي', 2: 'الصف الثاني الابتدائي',
      3: 'الصف الثالث الابتدائي', 4: 'الصف الرابع الابتدائي',
      5: 'الصف الخامس الابتدائي', 6: 'الصف السادس الابتدائي',
    };
    return grades[this.student().gradeLevel] ?? `الصف ${this.student().gradeLevel}`;
  });

  readonly avatarBg = computed(() =>
    this.student().gender === Gender.Female ? '#FFF0F5' : '#F0F4FF'
  );

  // ✅ من الـ Gamification API الحقيقي
  readonly streakDays = computed(() =>
    this.gamification.getStreak(this.student().id)?.currentStreak ?? 0
  );

  readonly overallProgress = computed(() => {
    const { completedLessons, totalLessons } = this.student();
    if (!totalLessons) return 0;
    return Math.round((completedLessons / totalLessons) * 100);
  });

  onViewDetails(): void {
    this.viewDetails.emit(this.student());
  }
}