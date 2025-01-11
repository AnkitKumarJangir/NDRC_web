import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ExportService {
  files = new BehaviorSubject<File>(null);
  uploading = new BehaviorSubject<boolean>(false);
  constructor() {}

  saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    saveAs(data, fileName);
  }
  generatePDF(innerHtml) {
    let myWindows = window.open('', 'PRINT', 'height=400,with=600');
    var cssFile =
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    var html =
      "<!DOCTYPE html><html><head><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
      "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
      '<link rel="stylesheet" href="' +
      cssFile +
      '"/>' +
      '<style>table { td { border: 1px solid black;}} @media print{@page { size: Tabloid; }},</style>' +
      '</head><body>' +
      `${innerHtml}` +
      '</body></html>';

    myWindows.document.body.innerHTML = html;
    myWindows.print();
  }
}
