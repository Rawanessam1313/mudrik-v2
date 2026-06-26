import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';
import { Auth } from '../../../../core/services/auth';
import { Token } from '../../../../core/services/token';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPageComponent implements OnDestroy {
  email = '';
  password = '';
  showPassword = false;
  isLoading = false;
  alertMessage = '';
  alertType: 'error' | 'success' = 'error';
  showAlert = false;
  private subscription?: Subscription;

  constructor(
    private router: Router,
    private authService: Auth,
    private tokenService: Token
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onInputChange() {
    this.showAlert = false;
  }

  onSubmit() {
    const email = this.email.trim();
    const password = this.password;

    if (!email || !password) {
      this.displayAlert('الرجاء إدخال البريد الإلكتروني وكلمة المرور', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.displayAlert('الرجاء إدخال بريد إلكتروني صحيح', 'error');
      return;
    }

    this.login(email, password);
  }

 private login(email: string, password: string) {
  this.isLoading = true;
  this.showAlert = false;

  this.subscription = this.authService.login({ email, password }).subscribe({
    next: () => {
      this.isLoading = false;
      this.displayAlert('تم تسجيل الدخول بنجاح! جاري التحويل...', 'success');

      setTimeout(() => {
        const role = this.tokenService.getRole(); // 'Admin' أو 'User' أو null
        let route = '/home'; // افتراضي
        if (role === 'Admin') {
          route = '/admin-dashboard';
        } else if (role === 'User') {
          route = '/parent-dashboard';
        }
        this.router.navigate([route]);
      }, 1000);
    },
    error: (err) => {
      this.isLoading = false;
      const message = err.error?.message || 'فشل تسجيل الدخول. تأكد من البيانات';
      this.displayAlert(message, 'error');
      console.error(err);
    }
  });
}
  private displayAlert(message: string, type: 'error' | 'success') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}