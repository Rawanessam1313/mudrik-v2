import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth';




type AlertType = 'error' | 'success';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
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


  constructor(
    private router: Router,
    private authService: Auth
  ) {}



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }



  onPasswordInput() {

    const val = this.password;

    this.passwordError = false;


    if (!val.length) {
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

    }
    else if (strength === 2) {

      this.passwordStrengthColor = '#F59E0B';
      this.passwordStrengthText = 'قوة كلمة المرور: متوسطة';
      this.passwordStrengthWidth = '50%';

    }
    else if (strength === 3) {

      this.passwordStrengthColor = '#3B82F6';
      this.passwordStrengthText = 'قوة كلمة المرور: جيدة';
      this.passwordStrengthWidth = '75%';

    }
    else if (strength >= 4) {

      this.passwordStrengthColor = '#10B981';
      this.passwordStrengthText = 'قوة كلمة المرور: قوية جداً';
      this.passwordStrengthWidth = '100%';

    }

  }



  onInputChange() {
    this.showAlert = false;
  }




  onSubmit() {


    this.nameError =
      this.fullName.trim().length <= 3;


    this.emailError =
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);



    this.phoneError =
      !/^01[0125][0-9]{8}$/.test(this.phone);



    this.passwordError =
      this.password.length < 8;



    this.confirmPasswordError =
      this.password !== this.confirmPassword;



    if (!this.termsAccepted) {

      this.displayAlert(
        'يجب الموافقة على الشروط والأحكام',
        'error'
      );

      return;
    }



    if (
      this.nameError ||
      this.emailError ||
      this.phoneError ||
      this.passwordError ||
      this.confirmPasswordError
    ) {
      return;
    }



    this.register();

  }




  private register() {


    this.isLoading = true;



    this.authService.register({

      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phone,
      password: this.password

    })
    .subscribe({

      next: (res) => {


        this.isLoading = false;



        this.displayAlert(
          'تم إنشاء الحساب بنجاح! جاري تحويلك لتسجيل الدخول',
          'success'
        );



        setTimeout(() => {
          this.router.navigate(['/auth/login-page']);
        }, 1000);



      },



      error: (err) => {


        this.isLoading = false;


        this.displayAlert(
          'حدث خطأ أثناء إنشاء الحساب',
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