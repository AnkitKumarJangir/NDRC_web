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
  ) {}

  login(payload: any) {
    let url = '/auth/login';
    return this.httpClient.post(this.helperService.api(url), payload);
  }

  logout() {
    this._cookiesService.delete('ndrc_token');
    this._cookiesService.delete('ndrc_user');
    this._router.navigate(['/account/auth/login']);
  }
}
