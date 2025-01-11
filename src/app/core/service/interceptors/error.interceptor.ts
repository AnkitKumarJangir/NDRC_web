import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HelperService } from '../../../services/helper.service';
import { catchError, throwError } from 'rxjs';
import { AccountService } from '../../../services/account.service';
@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(
    private _helper: HelperService,
    private _account: AccountService
  ) {}

  makeErrorString(errorObj: any) {
    const error = errorObj.message
      ? errorObj.message || errorObj.statusText
      : this._helper.getApiResponseErrorMessage(errorObj);
    return error;
  }
  logout() {
    this._account.logout();
  }
}
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _error = inject(ErrorService);
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        _error.logout();
      }
      return throwError(_error.makeErrorString(error.error));
    })
  );
};
