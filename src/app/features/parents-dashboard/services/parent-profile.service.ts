import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, EMPTY } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Auth } from '../../../core/services/auth';
import { jwtDecode } from 'jwt-decode';
import { ParentProfileDto, ParentViewModel, UpdateParentProfileDto } from '../models/Iparent';

@Injectable({ providedIn: 'root' })
export class ParentProfileService {
  private readonly http   = inject(HttpClient);
  private readonly auth   = inject(Auth);
  private readonly apiUrl = `${environment.apiUrl}/parent/profile`;

  // ─── Raw state ───────────────────────────────────────────
  readonly profileDto = signal<ParentProfileDto | null>(null);
  readonly isLoading  = signal(false);
  readonly error      = signal<string | null>(null);

  // ─── View model — يجمع الـ DTO + الـ email من الـ JWT ────

  readonly currentUserEmail = computed<string | null>(() => {
  const token = this.auth.getToken(); // الـ method موجودة بالفعل
  if (!token) return null;
  try {
    const decoded = jwtDecode<{ email?: string }>(token);
    return decoded.email ?? null;
  } catch {
    return null;
  }
});
readonly profile = computed<ParentViewModel | null>(() => {

  const dto = this.profileDto();

  if (!dto) return null;


  return {

    fullName: dto.fullName,

    phoneNumber: dto.phoneNumber,

    consentGiven: dto.consentGiven,

    createdAt: dto.createdAt,
    // لو الباك رجع email استخدمه
    // لو لا استخدم JWT مؤقتاً
    email:
      dto.email ??
      this.currentUserEmail() ??
      ''

  };

});

  // ─── Computed helpers ─────────────────────────────────────
  readonly displayName = computed(() => this.profile()?.fullName ?? '');

  readonly initials = computed(() => {
    const name = this.displayName();
    if (!name) return '';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word: string) => word[0])
      .join('')
      .toUpperCase();
  });

 
// this  just for test 
  loadProfile(): void {

  if (this.profileDto() || this.isLoading()) return;


  this.isLoading.set(true);
  this.error.set(null);


  setTimeout(() => {

    this.profileDto.set({
        fullName: 'Rawan Essam',

        phoneNumber: '01066408148',

        consentGiven: true,

        createdAt: new Date().toISOString(),
        id: '',
        userId: ''
    });


    this.isLoading.set(false);


  }, 700);

}
 // ─── Load profile من الـ API   ──────────────────────────────
//   loadProfile(): void {
//     // منع double-fetch لو البيانات موجودة
//     if (this.profileDto() || this.isLoading()) return;

//     this.isLoading.set(true);
//     this.error.set(null);

//     this.http
//       .get<ParentProfileDto>(this.apiUrl)
//       .pipe(
//         tap((dto) => {
//           this.profileDto.set(dto);
//           this.isLoading.set(false);
//         }),
//         catchError((err) => {
//           this.isLoading.set(false);
//           this.error.set(this.parseError(err));
//           return EMPTY;
//         }),
//       )
//       .subscribe();
//   }

  // ─── Update profile ───────────────────────────────────────
  updateProfile(dto: UpdateParentProfileDto) {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http
      .put<ParentProfileDto>(this.apiUrl, dto)
      .pipe(
        tap((updated) => {
          this.profileDto.set(updated);
          this.isLoading.set(false);
        }),
        catchError((err) => {
          this.isLoading.set(false);
          this.error.set(this.parseError(err));
          return EMPTY;
        }),
      );
  }

  // ─── Parse HTTP error ─────────────────────────────────────
  private parseError(err: unknown): string {
    const e = err as { error?: { message?: string }; status?: number };
    if (e?.status === 404) return 'لم يتم العثور على الملف الشخصي';
    if (e?.status === 401) return 'انتهت جلستك، يرجى تسجيل الدخول مجدداً';
    return e?.error?.message ?? 'حدث خطأ في الاتصال بالخادم';
  }
}