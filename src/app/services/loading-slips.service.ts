import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingSlipsService {
  constructor(
    private httpClient: HttpClient,
    private helperService: HelperService
  ) {}

  getLoadingSlips(filter: any) {
    let url = '/get-loading-slips';
    if (filter != null) {
      url = `/get-loading-slips?` + this.helperService.makeQueryParams(filter);
    }
    return this.httpClient.get(this.helperService.api(url));
  }
}
