import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type AlertType = 'error' | 'success';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPageComponent {
  fullName = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  termsAccepted = false;
  showPassword = false;

  passwordStrengthWidth = '0%';
  passwordStrengthColor = '';
  passwordStrengthText = '';
  showStrengthMeter = false;

  alertMessage = '';
  alertType: AlertType = 'error';
  showAlert = false;

  nameError = false;
  emailError = false;
  phoneError = false;
  passwordError = false;
  confirmPasswordError = false;

  isLoading = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPasswordInput() {
    const val = this.password;
    this.passwordError = false;

    if (val.length === 0) {
      this.showStrengthMeter = false;
      return;
    }

    this.showStrengthMeter = true;

    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    if (strength === 1) {
      this.passwordStrengthColor = '#EF4444';
      this.passwordStrengthText = 'قوة كلمة المرور: ضعيفة';
      this.passwordStrengthWidth = '25%';
    } else if (strength === 2) {
      this.passwordStrengthColor = '#F59E0B';
      this.passwordStrengthText = 'قوة كلمة المرور: متوسطة';
      this.passwordStrengthWidth = '50%';
    } else if (strength === 3) {
      this.passwordStrengthColor = '#3B82F6';
      this.passwordStrengthText = 'قوة كلمة المرور: جيدة';
      this.passwordStrengthWidth = '75%';
    } else if (strength >= 4) {
      this.passwordStrengthColor = '#10B981';
      this.passwordStrengthText = 'قوة كلمة المرور: قوية جداً';
      this.passwordStrengthWidth = '100%';
    }
  }

  onInputChange() {
    this.showAlert = false;
  }

  onSubmit() {
    // Validate all fields
    this.nameError = this.fullName.trim().length <= 3;
    this.emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    this.phoneError = !/^01[0125][0-9]{8}$/.test(this.phone);
    this.passwordError = this.password.length < 8;
    this.confirmPasswordError = this.confirmPassword !== this.password;

    if (!this.termsAccepted) {
      this.displayAlert('يجب الموافقة على الشروط والأحكام للمتابعة', 'error');
      return;
    }

    if (this.nameError || this.emailError || this.phoneError || this.passwordError || this.confirmPasswordError) {
      return;
    }

    this.simulateSubmit();
  }

  private displayAlert(message: string, type: AlertType) {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
  }

  private simulateSubmit() {
    this.isLoading = true;

    // TODO: replace with real AuthService call once API is ready
    setTimeout(() => {
      this.isLoading = false;
      this.displayAlert('تم إنشاء الحساب بنجاح! جاري تحويلك...', 'success');

      setTimeout(() => {
        this.router.navigateByUrl('/parent-dashboard');
      }, 2000);
    }, 1500);
  }
}