import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs';
import { AccountService } from '../../../services/account.service';
import { emailRegx, mobileRegx } from '../../../config';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  isLive: boolean = true;
  buttonName = 'Submit';
  loader = false;

  constructor(
    private formBuilder: FormBuilder,
    private _account: AccountService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      mobile: ['', [Validators.required,Validators.pattern(mobileRegx)]],
      email: ['', [Validators.required,Validators.pattern(emailRegx)]],
      password:['',Validators.required]
    });
  }
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.loader = true;
      this._account
        .signup(this.signupForm.value)
        .pipe(takeWhile(() => this.isLive))
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.loader = false;
              this._toastr.success('SignUp Successfully!');
              this._router.navigateByUrl('/account/auth/login');
            }
          },
          error: (err) => {
            this.loader = false;
            this._toastr.error(err);
          },
        });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this.isLive = false;
  }
}
