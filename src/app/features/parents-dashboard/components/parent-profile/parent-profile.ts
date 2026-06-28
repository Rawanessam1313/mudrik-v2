import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ParentProfileService
} from '../../services/parent-profile.service';

import {
  UpdateParentProfileDto
} from '../../models/Iparent';

import {
  Auth
} from '../../../../core/services/auth';



@Component({
  selector: 'app-parent-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './parent-profile.html',
  styleUrl: './parent-profile.css'
})
export class ParentProfile implements OnInit {


  private readonly service =
    inject(ParentProfileService);


  private readonly fb =
    inject(FormBuilder);


  private readonly auth =
    inject(Auth);



  profile =
    this.service.profile;


  initials =
    this.service.initials;


  isLoading =
    this.service.isLoading;


  serverError =
    this.service.error;



  editMode =
    signal(false);


  saveSuccess =
    signal(false);





  form = this.fb.nonNullable.group({

    fullName: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],


    phoneNumber: [
      ''
    ],


    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ]

  });





  ngOnInit() {

    this.service.loadProfile();

  }






  startEdit() {

    const user =
      this.profile();


    if (!user)
      return;



    this.form.patchValue({

      fullName: user.fullName,

      phoneNumber: user.phoneNumber,

      email: user.email

    });


    this.editMode.set(true);

  }







  cancelEdit() {

    this.editMode.set(false);

  }







  saveProfile() {


    if (
      this.form.invalid ||
      this.isLoading()
    )
      return;



    const oldEmail =
      this.profile()?.email ?? '';



    const value =
      this.form.getRawValue();




    const dto: UpdateParentProfileDto = {

      fullName: value.fullName,

      phoneNumber: value.phoneNumber,

      email: value.email

    };




    this.service
      .updateProfile(dto)
      .subscribe({

        next: () => {


          this.editMode.set(false);


          this.saveSuccess.set(true);



          // لو غير الإيميل
          if (
            oldEmail !== value.email
          ) {

            this.auth.logout();

            return;

          }



          setTimeout(() => {

            this.saveSuccess.set(false);

          }, 3000);


        },


        error: () => {

          this.saveSuccess.set(false);

        }


      });


  }



}