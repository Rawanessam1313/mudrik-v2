//import { Component } from '@angular/core';
//import { CommonModule } from '@angular/common';
////import { FormsModule } from '@angular/forms';
////import { ReactiveFormsModule } from '@angular/forms';
//import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type Role = 'parent' | 'admin';
type AlertType = 'error' | 'success';

//@Component({
//  selector: 'app-login-page',
//  standalone: true,
//  imports: [CommonModule],
//  templateUrl: './login-page.component.html',
//  styleUrl: './login-page.component.css'
//})
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPageComponent {
  email = '';
  password = '';
  showPassword = false;
  currentRole: Role = 'parent';
  isLoading = false;

  alertMessage = '';
  alertType: AlertType = 'error';
  showAlert = false;

  constructor(private router: Router) { }

  selectRole(role: Role) {
    this.currentRole = role;
  }

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

    this.simulateLogin(email, this.currentRole);
  }

  private displayAlert(message: string, type: AlertType) {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
  }

  private simulateLogin(email: string, role: Role) {
    this.isLoading = true;
    this.showAlert = false;

    // TODO: replace this whole block with a real AuthService call once the API is ready
    setTimeout(() => {
      this.isLoading = false;

      if (email.includes('error')) {
        this.displayAlert('فشل تسجيل الدخول. تأكد من صحة البيانات.', 'error');
      } else {
        this.displayAlert('تم تسجيل الدخول بنجاح! جاري التحويل...', 'success');

        const redirectPath = role === 'admin' ? '/admin-dashboard' : '/parent-dashboard';

        setTimeout(() => {
          this.router.navigateByUrl(redirectPath);
        }, 1500);
      }
    }, 1200);
  }
}
