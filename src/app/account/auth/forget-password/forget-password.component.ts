import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { takeWhile } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterModule,CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit, OnDestroy{
  inputType1: string = 'password';
  inputType2: string = 'password';
  forgetPassword:FormGroup;
  islive = true;
  userEmail = null;
  loaderShow = false;
  email_Sent = false;
  otp = null;
  loading = false;
  otp_verified = false;
  constructor(private _fb:FormBuilder,private router:Router,private authService:AccountService,private toaster:ToastrService){

  }

  ngOnInit(): void {
      this.forgetPassword = this._fb.group({
         new_password: ['', Validators.required],
         confirm: ['', Validators.required],
      })
  }

    sendOTP() {
    if (this.userEmail) {
      this.loaderShow = true;
      const data = {
        email: this.userEmail,
      };
      this.authService
        .sendOtp(data)
        .pipe(takeWhile(() => this.islive))
        .subscribe(
          (res: any) => {
            if (res) {
              this.loaderShow = false;
              this.email_Sent = true;
              this.otp_verified = false;
              this.toaster.success('OTP sent successfully');
            }
          },
          (err) => {
            if (err) {
              this.loaderShow = false;
              this.email_Sent = false;
              this.toaster.error(err.error.message);
            }
          }
        );
    }
  }
  verifyOTP() {

    if (this.userEmail && this.otp) {
      this.loading = true;
      const data = {
        email: this.userEmail,
        otp: this.otp,
      };
      this.authService
        .verifyOTP(data)
        .pipe(takeWhile(() => this.islive))
        .subscribe(
          (res: any) => {
            if (res) {
              this.loading = false;
              this.otp_verified = true;
              this.toaster.success('OTP verified successfully');
            }
          },
          (err) => {
            if (err) {
              this.loading = false;
              this.otp = null;
              this.otp_verified = false;
              this.toaster.error(err.error.message);
            }
          }
        );
    }
  }
  back() {
    this.router.navigateByUrl('/account/auth/login');
  }
  save() {
    if (this.forgetPassword?.valid) {
      if (
        this.forgetPassword.value.new_password !=
        this.forgetPassword.value.confirm
      ) {
        this.toaster.error('Password must be match confirm password');
        return;
      } else {
        this.loading = true;
        console.log(this.userEmail);

        const data = {
          ...this.forgetPassword.value,
          email: this.userEmail,
        };
        delete data['confirm'];
        console.log(data);
        this.authService
          .resetPassword(data)
          .pipe(takeWhile(() => this.islive))
          .subscribe(
            (res) => {
              if (res) {
                this.loading = false;
                this.forgetPassword.reset();
                this.toaster.success('password changed successfully');
                this.router.navigateByUrl('/login');
              }
            },
            (err) => {
              if (err) {
                this.loading = false;
                this.toaster.error(err.error.message);
              }
            }
          );
      }
    } else {
      this.toaster.error('All fields are required!');
      this.forgetPassword?.markAllAsTouched();
    }
  }
  showPass(ac: string) {
    if (ac == 'new') {
      if (this.inputType1 == 'password') {
        this.inputType1 = 'text';
      } else {
        this.inputType1 = 'password';
      }
    } else {
      if (this.inputType2 == 'password') {
        this.inputType2 = 'text';
      } else {
        this.inputType2 = 'password';
      }
    }
  }

  ngOnDestroy(): void {
       this.islive = false;
  }
}
