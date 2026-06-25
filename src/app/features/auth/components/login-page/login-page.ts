import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { Token } from '../../../../core/services/token';




type AlertType = 'error' | 'success';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPageComponent {


  email = '';
  password = '';

  showPassword = false;
  isLoading = false;

  alertMessage = '';
  alertType: AlertType = 'error';
  showAlert = false;


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
      this.displayAlert(
        'الرجاء إدخال البريد الإلكتروني وكلمة المرور',
        'error'
      );
      return;
    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.displayAlert(
        'الرجاء إدخال بريد إلكتروني صحيح',
        'error'
      );
      return;
    }


    this.login(email, password);
  }



  private login(email: string, password: string) {

    this.isLoading = true;
    this.showAlert = false;


    this.authService.login({
      email,
      password
    })
    .subscribe({

      next: (res) => {

        this.isLoading = false;


        // حفظ التوكن
        this.tokenService.setToken(res.token)


        // الباك بيرجع:
        // "role": "User"
        this.tokenService.setRole(res.role);


        this.displayAlert(
          'تم تسجيل الدخول بنجاح! جاري التحويل...',
          'success'
        );

        const role = res.role?.toLowerCase();
        const redirectPath = role === 'admin'
          ? '/admin-dashboard'
          : role === 'parent'
            ? '/parent-dashboard'
            : '/home';

        setTimeout(() => {
          this.router.navigate([redirectPath]);
        }, 1000);

      },


      error: (err) => {

        this.isLoading = false;

        this.displayAlert(
          'فشل تسجيل الدخول. تأكد من البيانات',
          'error'
        );

        console.log(err);
      }

    });

  }



  private displayAlert(
    message: string,
    type: AlertType
  ) {

    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

  }

}