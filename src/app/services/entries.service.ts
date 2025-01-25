import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

 constructor(
    private httpClient: HttpClient,
    private helperService: HelperService
  ) {}

  createEntries(payload) {
    let url = '/entries/get-entries';
    return this.httpClient.post(this.helperService.api(url), payload);
  }
  updateEntries(payload,id) {
    let url = `/entries/get-entries/${id}`;
    return this.httpClient.put(this.helperService.api(url), payload);
  }
  getEntries(filter: any, isExport = false) {
    let url = '/entries/get-entries';
    if (filter != null) {
      url =
        `/entries/get-entries?` +
        this.helperService.makeQueryParams(filter);
    }
    return this.httpClient.get(this.helperService.api(url), {
      ...(isExport && {
        responseType: 'blob',
      }),
    });
  }
  deleteEntries(id: string) {
    let url = `/entries/get-entries/${id}`;
    return this.httpClient.delete(this.helperService.api(url));
  }
}
