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

  getCompany() {
    let url = '/company/get-franchise-details';
    return this.httpClient.get(this.helperService.api(url));
  }
  updateCompany(payload: any) {
    let url = '/company/edit-company';
    return this.httpClient.put(this.helperService.api(url), payload);
  }
}
