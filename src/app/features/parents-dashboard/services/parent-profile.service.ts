import { inject, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../../../core/services/token';
import { ParentProfile } from '../models/parent-profile.model';

const STORAGE_KEY = 'mudrik_parent_profile';

interface JwtPayload {
  email?: string;
  unique_name?: string;
  name?: string;
  sub?: string;
}

@Injectable({ providedIn: 'root' })
export class ParentProfileService {
  private readonly tokenService = inject(Token);

  readonly profile = signal<ParentProfile>(this.loadProfile());

  get displayName(): string {
    return this.profile().fullName || 'ولي الأمر';
  }

  get initials(): string {
    const name = this.displayName.trim();
    return name ? name.charAt(0) : 'م';
  }

  updateProfile(data: ParentProfile): void {
    this.profile.set(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  private loadProfile(): ParentProfile {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as ParentProfile;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    return this.buildDefaultProfile();
  }

  private buildDefaultProfile(): ParentProfile {
    const fromToken = this.readTokenClaims();

    return {
      fullName: fromToken.fullName,
      email: fromToken.email,
      phoneNumber: '',
  
    };
  }

  private readTokenClaims(): { fullName: string; email: string } {
    const token = this.tokenService.getToken();
    if (!token) {
      return { fullName: 'ولي الأمر', email: '' };
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const email = decoded.email ?? '';
      const fullName =
        decoded.unique_name ??
        decoded.name ??
        (email ? email.split('@')[0] : 'ولي الأمر');

      return { fullName, email };
    } catch {
      return { fullName: 'ولي الأمر', email: '' };
    }
  }
}
