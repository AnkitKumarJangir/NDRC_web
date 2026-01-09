import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
@Injectable({ providedIn: 'root' })
export class AuthGaurd {
  constructor(private _heler: HelperService, private _router: Router) { }

  canActivate(): boolean {
    const accessToken = this._heler.getAuthToken();
    const franchise_id = this._heler.getFranchiseId()
    if (!franchise_id) {
      this._router.navigateByUrl('/onboarding');
      return false;
    }
    if (accessToken) {
      return true;
    } else {
      this._router.navigateByUrl('/account/auth/login');
      return false;
    }
  }
}
export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGaurd).canActivate();
};
