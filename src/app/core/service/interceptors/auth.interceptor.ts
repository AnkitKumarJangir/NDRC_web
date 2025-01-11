import { HttpInterceptorFn } from '@angular/common/http';
import Cookies from 'js-cookie';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const Access = Cookies.get('ndrc_token');
  if (Access) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${Access}`,
      },
    });
  }

  return next(req);
};
