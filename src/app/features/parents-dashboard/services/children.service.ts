import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, EMPTY } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StudentDto, StudentProgressDto, ActivityEventDto } from '../models/Iparent';
import { GamificationService } from './gamification.service';

// ════════════════════════════════════════════════════════════
// MOCK — يتحذف لما GET /api/parent/children يتكتب
// ════════════════════════════════════════════════════════════
const MOCK_STUDENTS: StudentDto[] = [
  {
    id: '1', parentProfileId: 'p1', firstName: 'سارة',
    age: 7, gender: 1, gradeLevel: 1, avatarId: 'avatar_1',
    hasDyslexia: true, hasADHD: false,
    fontPreference: 'OpenDyslexic', colorOverlay: '#fffde7',
    audioEnabled: true, interestsJson: '["رسم","قراءة"]',
    learningStylePref: 'visual', personalityTag: 'explorer',
    createdAt: new Date().toISOString(),
    completedLessons: 12, totalLessons: 28,
  },
  {
    id: '2', parentProfileId: 'p1', firstName: 'أحمد',
    age: 9, gender: 0, gradeLevel: 3, avatarId: 'avatar_2',
    hasDyslexia: false, hasADHD: true,
    fontPreference: 'Cairo', colorOverlay: '',
    audioEnabled: false, interestsJson: '["رياضيات","علوم"]',
    learningStylePref: 'kinesthetic', personalityTag: 'achiever',
    createdAt: new Date().toISOString(),
    completedLessons: 24, totalLessons: 30,
  },
];

const MOCK_PROGRESS: Record<string, StudentProgressDto> = {
  '1': {
    studentId: '1',
    points: [
      { date: '2025-06-01', score: 55, quizTitle: 'الحروف الأبجدية' },
      { date: '2025-06-08', score: 62, quizTitle: 'الكلمات القصيرة' },
      { date: '2025-06-15', score: 70, quizTitle: 'الجمل البسيطة' },
      { date: '2025-06-22', score: 68, quizTitle: 'القراءة الجهرية' },
    ],
  },
  '2': {
    studentId: '2',
    points: [
      { date: '2025-06-01', score: 70, quizTitle: 'الجمع والطرح' },
      { date: '2025-06-08', score: 75, quizTitle: 'الضرب' },
      { date: '2025-06-15', score: 80, quizTitle: 'الكسور' },
      { date: '2025-06-22', score: 82, quizTitle: 'المسائل التطبيقية' },
    ],
  },
};

const MOCK_ACTIVITY: ActivityEventDto[] = [
  { id: '1', type: 'lesson_completed', studentName: 'أحمد',
    description: 'أكمل أحمد درس "الكسور الاعتيادية"',
    occurredAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: '2', type: 'badge_earned', studentName: 'سارة',
    description: 'حصلت سارة على وسام "المستكشفة الذكية"',
    occurredAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
  { id: '3', type: 'profile_updated', studentName: 'سارة',
    description: 'تم تحديث الملف الشخصي لسارة',
    occurredAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
];
// ════════════════════════════════════════════════════════════

@Injectable({ providedIn: 'root' })
export class ChildrenService {
  private readonly http           = inject(HttpClient);
  private readonly gamification   = inject(GamificationService);
  private readonly baseUrl        = `${environment.apiUrl}/parent`;

  readonly students           = signal<StudentDto[]>([]);
  readonly activity           = signal<ActivityEventDto[]>([]);
  readonly selectedChild      = signal<StudentDto | null>(null);
  readonly selectedProgress   = signal<StudentProgressDto | null>(null);
  readonly isLoading          = signal(false);
  readonly isProgressLoading  = signal(false);
  readonly error              = signal<string | null>(null);

  readonly hasChildren = computed(() => this.students().length > 0);

  // ─── Streak helper ────────────────────────────────────────
  // بيرجع الـ streak بتاع طفل من الـ GamificationService
  getStreakDays(studentId: string): number {
    return this.gamification.getStreak(studentId)?.currentStreak ?? 0;
  }

  // ─── Load Children ────────────────────────────────────────
  loadChildren(): void {
    if (this.students().length || this.isLoading()) return;
    this.isLoading.set(true);

    // ✅ MOCK
    setTimeout(() => {
      this.students.set(MOCK_STUDENTS);
      this.isLoading.set(false);
      // بعد ما الأطفال يتحملوا — جيب streaks كلهم مرة واحدة
      // ✅ الـ Gamification API شغال — مش mock
      this.gamification.loadStreaksForAll(MOCK_STUDENTS.map(s => s.id));
    }, 800);

    // 🔌 API — فعّليه لما GET /api/parent/children يتكتب
    // this.http.get<StudentDto[]>(`${this.baseUrl}/children`).pipe(
    //   tap((data) => {
    //     this.students.set(data);
    //     this.isLoading.set(false);
    //     this.gamification.loadStreaksForAll(data.map(s => s.id)); // ✅ شغال
    //   }),
    //   catchError(() => { this.isLoading.set(false); return EMPTY; }),
    // ).subscribe();
  }

  // ─── Load Activity ────────────────────────────────────────
  loadActivity(): void {
    if (this.activity().length) return;

    // ✅ MOCK
    setTimeout(() => this.activity.set(MOCK_ACTIVITY), 400);

    // 🔌 API
    // this.http.get<ActivityEventDto[]>(`${this.baseUrl}/activity`).pipe(
    //   tap((data) => this.activity.set(data)),
    //   catchError(() => EMPTY),
    // ).subscribe();
  }

  // ─── Select child ─────────────────────────────────────────
  selectChild(student: StudentDto): void {
    this.selectedChild.set(student);
    this.loadProgress(student.id);
    // جيب الـ XP history لما يفتح التفاصيل
    this.gamification.loadXpHistory(student.id);
  }

  clearSelection(): void {
    this.selectedChild.set(null);
    this.selectedProgress.set(null);
  }

  // ─── Load Progress ────────────────────────────────────────
  private loadProgress(studentId: string): void {
    this.isProgressLoading.set(true);
    this.selectedProgress.set(null);

    // ✅ MOCK
    setTimeout(() => {
      this.selectedProgress.set(
        MOCK_PROGRESS[studentId] ?? { studentId, points: [] }
      );
      this.isProgressLoading.set(false);
    }, 500);

    // 🔌 API — لما quiz system يتبنى
    // this.http.get<StudentProgressDto>(`${this.baseUrl}/children/${studentId}/progress`).pipe(
    //   tap((data) => { this.selectedProgress.set(data); this.isProgressLoading.set(false); }),
    //   catchError(() => { this.isProgressLoading.set(false); return EMPTY; }),
    // ).subscribe();
  }

  // ─── Relative Time ────────────────────────────────────────
  formatRelativeTime(isoString: string): string {
    const diff  = Date.now() - new Date(isoString).getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days  = Math.floor(hours / 24);
    if (days > 0)  return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
    if (hours > 0) return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
    if (mins > 0)  return `منذ ${mins} دقيقة`;
    return 'الآن';
  }
}