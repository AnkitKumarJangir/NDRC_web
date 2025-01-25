import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntriesService } from '../../services/entries.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeWhile } from 'rxjs';
import Swal from 'sweetalert2';
import { ExportService } from '../../services/import-export.service';
import { CreateEntriesComponent } from '../../shared/create-entries/create-entries.component';
import { SlipPreviewComponent } from '../../shared/slip-preview/slip-preview.component';
import { CreateLoadingSlipComponent } from '../loading-slips/create-loading-slip/create-loading-slip.component';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss'
})
export class EntriesComponent implements OnInit, OnDestroy {
  loader = false;
  islive = true;
  slipList = [];
  pagination = null;
  constructor(
    private _entries: EntriesService,
    private _toastr: ToastrService,
    private _export: ExportService,
    private _model: NgbModal
  ) {}
  ngOnInit(): void {
    this.loadEntries();
  }
  filterApplied($event) {
    this.loadEntries($event);
  }
  loadEntries(filter = null, isExport = false) {
    this.loader = true;
    this._entries
      .getEntries(filter, isExport)
      .pipe(takeWhile(() => this.islive))
      .subscribe({
        next: (value: any) => {
          this.loader = false;
          if (isExport) {
            this._export.saveAsFile(value, 'entries.xlsx', 'xlsx');
          } else {
            this.setData(value);
          }
        },
        error: (err) => {
          this.loader = false;
          this._toastr.error(err);
        },
      });
  }
  setData(value) {
    this.pagination = value;
    this.slipList = value.results;
  }

  createEntries(entry = null) {
    const ref = this._model.open(CreateEntriesComponent, {
      size: 'xl',
    });
    ref.componentInstance.loadingId = entry?.loading_id?._id
    ref.componentInstance.entry = entry
    ref.componentInstance.action = entry == null ? 'new' :'edit'

    ref.result.then((d)=>{
      this.loadEntries()
    })

  }
  deleteEntires(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this._entries
          .deleteEntries(id)
          .pipe(takeWhile(() => this.islive))
          .subscribe({
            next: (value) => {
              Swal.fire('Deleted!', 'Event has been deleted.', 'success');
              this.loadEntries();
            },
            error: (err) => {
              this._toastr.error(err);
            },
          });
      }
    });
  }
  export() {
    this.loadEntries({ export: 'yes' }, true);
  }
  ngOnDestroy(): void {
    this.islive = false;
  }
}
