import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from '../../services/import-export.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-import-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-file.component.html',
  styleUrl: './import-file.component.scss',
})
export class ImportFileComponent implements OnInit {
  file = null;
  loader = false;
  constructor(
    public _activatedModel: NgbActiveModal,
    private _importExport: ExportService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._importExport.uploading.subscribe((loader) => (this.loader = loader));
  }

  onUploadfile($event) {
    const file = $event.target.files[0];
    if (
      file.type !=
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      this._toastr.error('Please upload a valid file.');
      return;
    }

    this.file = file;
  }
  upload() {
    this.file && this._importExport.files.next(this.file);
    this._importExport.uploading.next(true);
  }
  closePop() {
    this._activatedModel.close();
  }
}
