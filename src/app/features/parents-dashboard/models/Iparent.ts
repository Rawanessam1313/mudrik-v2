// ─── يتطابق مع Mudrik.Domain.Models.ParentProfile ───────────

/** ريسبونس GET /api/parent/profile — لما الـ endpoint يتكتب */
export interface ParentProfileDto {
  id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  consentGiven: boolean;
  createdAt: string; // ISO string
}

/** البودي اللي بيتبعت في PUT /api/parent/profile */
export interface UpdateParentProfileDto {
  fullName: string;
  phoneNumber: string;
  email: string;
}

/**
 * الـ view model اللي بيستخدمه الـ frontend —
 * بيجمع بيانات الـ ParentProfile + الـ email من الـ JWT claim
 */
export interface ParentViewModel {
  fullName: string;
  email: string;       // من الـ JWT — مش من الـ API
  phoneNumber: string;
  consentGiven: boolean;
  createdAt: string;
}