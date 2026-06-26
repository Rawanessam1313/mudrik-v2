import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse, ForgotPasswordRequest, ForgotPasswordResponse, GoogleLoginRequest, LoginRequest, RegisterRequest, ResetPasswordRequest } from '../models/iauth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { Token } from './token';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly baseUrl = `${environment.apiUrl}/api/Auth`;

  private tokenService = inject(Token);

  isAuthenticated = signal<boolean>(this.tokenService.isValid());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // تسجيل حساب جديد
  register(data: RegisterRequest) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/register`, data)
      .pipe(
        tap(res => {
          this.tokenService.setToken(res.token);
          this.tokenService.setRole(res.role);
          this.isAuthenticated.set(true);
        })
      );
  }

  // تسجيل الدخول
  login(credentials: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(res => {
          this.tokenService.setToken(res.token);
          this.tokenService.setRole(res.role);
          this.isAuthenticated.set(true);
        })
      );
  }

  // جوجل لوجن
  googleLogin(data: GoogleLoginRequest) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/google-login`, data)
      .pipe(
        tap(res => {
          this.tokenService.setToken(res.token);
          this.tokenService.setRole(res.role);
          this.isAuthenticated.set(true);
        })
      );
  }

  // نسيت كلمة المرور
  forgotPassword(data: ForgotPasswordRequest) {
    return this.http
      .post<ForgotPasswordResponse>(`${this.baseUrl}/forget-password`, data);
  }

  // إعادة تعيين كلمة المرور
  resetPassword(data: ResetPasswordRequest) {
    return this.http
      .post<void>(`${this.baseUrl}/reset-password`, data);
  }

  // تسجيل الخروج
  logout(): void {
    this.tokenService.clearAll();
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login-page']);
  }

  // تجديد التوكن
  refreshToken() {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/refresh-token`, {})
      .pipe(
        tap(res => {
          this.tokenService.setToken(res.token);
          this.tokenService.setRole(res.role);
          this.isAuthenticated.set(true);
        })
      );
  }

  // حكم الرول
  getRole(): string | null {
    return this.tokenService.getRole();
  }

  // قراءة التوكن
  getToken(): string | null {
    return this.tokenService.getToken();
  }
}
