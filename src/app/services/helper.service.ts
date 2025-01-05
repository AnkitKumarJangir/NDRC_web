import { Injectable } from '@angular/core';
import { baseurl } from '../config';
import Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  getAuthToken() {
    const accessToken = Cookies.get('ndrc_token');
    return accessToken ? accessToken : null;
  }
  getCurrentUser() {
    const user = JSON.parse(Cookies.get('ndrc_user'));
    return user ? user : null;
  }

  api(url) {
    const api = baseurl + url;
    return api;
  }

  makeQueryParams(payload) {
    let queryParams = '';
    if (payload) {
      for (const [key, value] of Object.entries(payload)) {
        queryParams += `${key}=${value}&`;
      }
      queryParams = queryParams.slice(0, -1);
    }
    return queryParams;
  }

  getApiResponseErrorMessage = (payload: any) => {
    if (payload) {
      if (Object.keys(payload).length) {
        for (const key in payload) {
          if (key == 'isTrusted') {
            return 'Oops! there are some error.';
          } else {
            return key + ':' + payload[key];
          }
        }
      }
    }
    return 'Oops! unable to retrive the message';
  };
}
