import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, EMPTY, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StreakDto, XpHistoryDto } from '../models/Iparent';

@Injectable({ providedIn: 'root' })
export class GamificationService {
  private readonly http    = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/Gamification`;

  // ─── State ────────────────────────────────────────────────
  // Map: studentId → StreakDto (عشان نخزن streak كل طفل)
  readonly streaks    = signal<Map<string, StreakDto>>(new Map());
  readonly xpHistory  = signal<XpHistoryDto | null>(null);
  readonly isLoading  = signal(false);

  // ─── جيب الـ streak لطفل واحد ────────────────────────────
  loadStreak(studentId: string): void {
    // لو موجود خالص متجيبش تاني
    if (this.streaks().has(studentId)) return;

    this.http
      .get<StreakDto>(`${this.baseUrl}/streaks/${studentId}`)
      .pipe(
        tap((data) => {
          // بنضيف في الـ Map بدون ما نمسح الباقيين
          this.streaks.update((map) => new Map(map).set(studentId, data));
        }),
        catchError(() => EMPTY),
      )
      .subscribe();
  }

  // ─── جيب الـ streaks لكل الأطفال مرة واحدة ───────────────
  loadStreaksForAll(studentIds: string[]): void {
    const missing = studentIds.filter((id) => !this.streaks().has(id));
    if (!missing.length) return;

    // forkJoin بيبعت كل الـ requests مع بعض
    const requests = missing.map((id) =>
      this.http.get<StreakDto>(`${this.baseUrl}/streaks/${id}`),
    );

    forkJoin(requests)
      .pipe(
        tap((results) => {
          const updated = new Map(this.streaks());
          results.forEach((streak, i) => updated.set(missing[i], streak));
          this.streaks.set(updated);
        }),
        catchError(() => EMPTY),
      )
      .subscribe();
  }

  // ─── جيب الـ XP history لطفل ─────────────────────────────
  loadXpHistory(studentId: string): void {
    this.isLoading.set(true);

    this.http
      .get<XpHistoryDto>(`${this.baseUrl}/xp/${studentId}/history`)
      .pipe(
        tap((data) => {
          this.xpHistory.set(data);
          this.isLoading.set(false);
        }),
        catchError(() => {
          this.isLoading.set(false);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  // ─── Helper: جيب streak طفل معين من الـ Map ──────────────
  getStreak(studentId: string): StreakDto | null {
    return this.streaks().get(studentId) ?? null;
  }
}