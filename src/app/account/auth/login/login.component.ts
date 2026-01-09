import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { takeWhile } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLive: boolean = true;
  buttonName = 'Submit';
  loader = false;

  constructor(
    private formBuilder: FormBuilder,
    private _account: AccountService,
    private _router: Router,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loader = true;
      this._account
        .login(this.loginForm.value)
        .pipe(takeWhile(() => this.isLive))
        .subscribe({
          next: (response: { data: any; token: string }) => {
            if (response) {
              this.loader = false;
              Cookies.set('ndrc_token', response.token);
              Cookies.set('ndrc_user', JSON.stringify(response.data));
              Cookies.set('ndrc_franchise', JSON.stringify(response.data.franchise_id));
              this._toastr.success('Successfully logged In!');
              if (!response.data.franchise_id) {
                this._router.navigateByUrl('/onboarding');
                return;
              }
              this._router.navigateByUrl('/dashboard');
            }
          },
          error: (err) => {
            this.loader = false;
            this._toastr.error(err);
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this.isLive = false;
  }
}
