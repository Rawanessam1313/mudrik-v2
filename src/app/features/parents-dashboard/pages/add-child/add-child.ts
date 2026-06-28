import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type LearningNeed = 'dyslexia' | 'adhd' | 'both' | 'none';

@Component({
  selector: 'app-add-child',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-child.html',
  styleUrl: './add-child.css'
})
export class AddChildComponent {
  childName = '';
  childAge: number | null = null;
  childGender = 'male';
  childGrade = '';
  selectedAvatar = '👦';
  selectedNeed: LearningNeed = 'none';
  isLoading = false;
  showSuccess = false;

  avatars = ['👦', '👧', '🦊', '🦁', '🤖', '🚀', '🐼', '🐱'];

  needs = [
    { key: 'dyslexia' as LearningNeed, icon: 'fas fa-font', titleAr: 'عسر القراءة', titleEn: 'Dyslexia' },
    { key: 'adhd' as LearningNeed, icon: 'fas fa-bolt', titleAr: 'تشتت الانتباه', titleEn: 'ADHD' },
    { key: 'both' as LearningNeed, icon: 'fas fa-layer-group', titleAr: 'كلاهما', titleEn: 'Mixed Needs' },
    { key: 'none' as LearningNeed, icon: 'fas fa-check-circle', titleAr: 'لا يوجد', titleEn: 'No diagnosis' },
  ];

  constructor(private router: Router) {}

  get liveName(): string {
    return this.childName || 'اسم الطفل';
  }

  get liveMeta(): string {
    const gradeMap: { [key: string]: string } = {
      '1': 'الصف الأول الابتدائي',
      '2': 'الصف الثاني الابتدائي',
      '3': 'الصف الثالث الابتدائي',
      '4': 'الصف الرابع الابتدائي',
    };
    const gradeText = this.childGrade ? gradeMap[this.childGrade] : '';
    const ageText = this.childAge ? `${this.childAge} سنوات` : '';

    if (gradeText && ageText) return `${gradeText} • ${ageText}`;
    if (gradeText) return gradeText;
    if (ageText) return ageText;
    return 'الصف الدراسي • السن';
  }

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  selectNeed(need: LearningNeed) {
    this.selectedNeed = need;
  }

  onSubmit() {
    if (!this.childName || !this.childAge || !this.childGrade) return;

    this.isLoading = true;

    // TODO: replace with real API call once backend is ready
    setTimeout(() => {
      this.isLoading = false;
      this.showSuccess = true;

      setTimeout(() => {
        this.router.navigateByUrl('/child-onboarding');
      }, 2000);
    }, 1200);
  }
}