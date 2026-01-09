import { Injectable } from '@angular/core';
import { baseurl } from '../config';
import Cookies from 'js-cookie';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private _http: HttpClient) {}

  getAuthToken() {
    const accessToken = Cookies.get('ndrc_token');
    return accessToken ? accessToken : null;
  }
  getCurrentUser() {
    const user = JSON.parse(Cookies.get('ndrc_user'));
    return user ? user : null;
  }
  getFranchiseId() {
    const id = JSON.parse(Cookies.get('ndrc_franchise') || '{}');
    return id ? id : null;
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

  pagination(link) {
    return this._http.get(link);
  }
}
