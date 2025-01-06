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

  getSerialNumber() {
    let url = '/loadingslips/get-loading-slips-serial-no';
    return this.httpClient.get(this.helperService.api(url));
  }
  getLoadingSlips(filter: any, isExport = false) {
    let url = '/loadingslips/get-loading-slips';
    if (filter != null) {
      url =
        `/loadingslips/get-loading-slips?` +
        this.helperService.makeQueryParams(filter);
    }
    return this.httpClient.get(this.helperService.api(url), {
      ...(isExport && {
        responseType: 'blob',
      }),
    });
  }
  singleGetLoadingSlip(id: any) {
    let url = `/loadingslips/get-single-loading-slip/${id}`;
    return this.httpClient.get(this.helperService.api(url));
  }
  createLoadingSlip(payload: any) {
    let url = '/loadingslips/create-loading-slip';
    return this.httpClient.post(this.helperService.api(url), payload);
  }
  updateLoadingSlip(payload: any, id: string) {
    let url = `/loadingslips/update-loading-slips/${id}`;
    return this.httpClient.put(this.helperService.api(url), payload);
  }
  deleteLoadingSlip(id: string) {
    let url = `/loadingslips/delete-loading-slip/${id}`;
    return this.httpClient.delete(this.helperService.api(url));
  }
}
