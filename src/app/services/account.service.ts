import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private httpClient: HttpClient,
    private helperService: HelperService,
    private _router: Router,
    private _cookiesService: CookieService
  ) { }

  login(payload: any) {
    let url = '/auth/login';
    return this.httpClient.post(this.helperService.api(url), payload);
  }
  signup(payload: any) {
    let url = '/auth/signup';
    return this.httpClient.post(this.helperService.api(url), payload);
  }


  sendOtp(payload: any) {
    let url = `/auth/send-otp`;
    return this.httpClient.post(this.helperService.api(url), payload);
  }
  verifyOTP(payload: any) {
    let url = `/auth/verify-otp`;
    return this.httpClient.post(this.helperService.api(url), payload);
  }
  resetPassword(payload: any) {
    let url = `/auth/rest-password`;
    return this.httpClient.post(this.helperService.api(url), payload);
  }

  getUserDetails() {
    let url = '/loadingslips/get-user-details'
    return this.httpClient.get(this.helperService.api(url));
  }

  updateUser(payload: any) {
    let url = `/auth/update-user-profile`;
    return this.httpClient.post(this.helperService.api(url), payload);
  }

  logout() {
    this._cookiesService.delete('ndrc_token');
    this._cookiesService.delete('ndrc_user');
    this._cookiesService.delete('ndrc_franchise');
    this._router.navigate(['/account/auth/login']);
  }
}
