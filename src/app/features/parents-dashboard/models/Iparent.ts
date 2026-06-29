// ─── Parent ──────────────────────────────────────────────────

export interface ParentProfileDto {
  id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  consentGiven: boolean;
  createdAt: string;
}

export interface UpdateParentProfileDto {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface ParentViewModel {
  fullName: string;
  email: string;
  phoneNumber: string;
  consentGiven: boolean;
  createdAt: string;
}

// ─── Student ─────────────────────────────────────────────────

export enum Gender {
  Male   = 0,
  Female = 1,
}

/**
 * GET /api/parent/children
 * يتطابق مع GetStudentDTO — بدون gamification (دي endpoint منفصلة)
 */
export interface StudentDto {
  id: string;
  parentProfileId: string;
  firstName: string;
  age: number;
  gender: Gender;
  gradeLevel: number;
  avatarId: string;
  hasDyslexia: boolean;
  hasADHD: boolean;
  fontPreference: string;
  colorOverlay: string;
  audioEnabled: boolean;
  interestsJson: string;
  learningStylePref: string;
  personalityTag: string;
  createdAt: string;

  // محسوب من StudentLessonStates — لما الباك يجهز
  completedLessons: number;
  totalLessons: number;
}

// ─── Gamification ─────────────────────────────────────────────

/**
 * GET /api/Gamification/streaks/{studentProfileId}
 */
export interface StreakDto {
  studentProfileId: string;
  currentStreak: number;    // الـ streakDays
  longestStreak: number;
  lastActivityDate: string;
  freezeTokensAvailable: number;
}

/**
 * GET /api/Gamification/xp/{studentProfileId}/history
 */
export interface XpHistoryDto {
  studentProfileId: string;
  totalXp: number;
  transactions: XpTransactionDto[];
}

export interface XpTransactionDto {
  id: string;
  amount: number;
  reason: string;
  awardedAt: string;
}

// ─── Progress Chart ───────────────────────────────────────────

/**
 * GET /api/parent/children/:id/progress
 * لما الـ AI يتبنى — دلوقتي بييجي []
 */
export interface StudentProgressDto {
  studentId: string;
  points: ProgressPoint[];
}

export interface ProgressPoint {
  date: string;
  score: number;      // 0-100
  quizTitle: string;
}

// ─── Activity ─────────────────────────────────────────────────

export interface ActivityEventDto {
  id: string;
  type: 'lesson_completed' | 'badge_earned' | 'profile_updated' | 'streak';
  studentName: string;
  description: string;
  occurredAt: string;
}

// ─── View Model (فرونت فقط) ───────────────────────────────────
/**
 * بيجمع StudentDto + StreakDto في الفرونت
 * مش بييجي من الباك مباشرة
 */
export interface StudentCardViewModel {
  student: StudentDto;
  streak: StreakDto | null;
}