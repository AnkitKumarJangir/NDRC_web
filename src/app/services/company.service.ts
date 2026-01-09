import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(
    private httpClient: HttpClient,
    private helperService: HelperService
  ) {}

  createCompany(payload) {
    let url = '/company/create-franchise';
    return this.httpClient.post(this.helperService.api(url),payload);
  }
  getCompany() {
    let url = '/company/get-franchise-details';
    return this.httpClient.get(this.helperService.api(url));
  }
  getSingleCompayDetails(id) {
    let url = '/company/get-single-franchise/'+id;
    return this.httpClient.get(this.helperService.api(url));
  }
  updateCompany(payload: any) {
    let url = '/company/edit-company';
    return this.httpClient.put(this.helperService.api(url), payload);
  }
}
