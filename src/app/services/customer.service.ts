import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient,
    private helperService: HelperService
  ) {}

  getCustomerList(filter: any, isExport = false) {
    let url = '/customer/customers';
    if (filter != null) {
      url = `/customer/customers?` + this.helperService.makeQueryParams(filter);
    }
    return this.httpClient.get(this.helperService.api(url), {
      ...(isExport && {
        responseType: 'blob',
      }),
    });
  }
  getCustomers(filter: any = null) {
    let url = '/customer/customers-list';
    if (filter != null) {
      url =
        `/customer/customers-list?` +
        this.helperService.makeQueryParams(filter);
    }
    return this.httpClient.get(this.helperService.api(url), {});
  }
  singleCustomer(id: any) {
    let url = `/customer/customers/${id}`;
    return this.httpClient.get(this.helperService.api(url));
  }
  createCustomer(payload: any) {
    let url = '/customer/customers';
    return this.httpClient.post(this.helperService.api(url), payload);
  }
  updateCustomer(payload: any, id: string) {
    let url = `/customer/customers/${id}`;
    return this.httpClient.put(this.helperService.api(url), payload);
  }
  deleteCustomer(id: string) {
    let url = `/customer/customers/${id}`;
    return this.httpClient.delete(this.helperService.api(url));
  }

  importCustomer(payload: FormData) {
    let url = `/customer/import-customers/`;
    return this.httpClient.post(this.helperService.api(url), payload);
  }
}
