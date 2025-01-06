import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingSlipsService } from '../../services/loading-slips.service';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SlipPreviewComponent } from '../../shared/slip-preview/slip-preview.component';
import Swal from 'sweetalert2';
import { CreateLoadingSlipComponent } from './create-loading-slip/create-loading-slip.component';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-loading-slips',
  templateUrl: './loading-slips.component.html',
  styleUrl: './loading-slips.component.scss',
})
export class LoadingSlipsComponent implements OnInit, OnDestroy {
  loader = false;
  islive = true;
  slipList = [];
  pagination = null;
  constructor(
    private _loadingslip: LoadingSlipsService,
    private _toastr: ToastrService,
    private _export: ExportService,
    private _model: NgbModal
  ) {}
  ngOnInit(): void {
    this.loadSlips();
  }
  filterApplied($event) {
    this.loadSlips($event);
  }
  loadSlips(filter = null, isExport = false) {
    this.loader = true;
    this._loadingslip
      .getLoadingSlips(filter, isExport)
      .pipe(takeWhile(() => this.islive))
      .subscribe({
        next: (value: any) => {
          this.loader = false;
          if (isExport) {
            this._export.saveAsFile(value, 'loading-slips.xlsx', 'xlsx');
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
  viewSlip(id) {
    const ref = this._model.open(SlipPreviewComponent, {
      size: 'md',
    });
    ref.componentInstance.id = id;
  }
  createSlip(id = null) {
    const ref = this._model.open(CreateLoadingSlipComponent, {
      size: 'lg',
    });
    ref.componentInstance.slipId = id;
    ref.componentInstance.action = id != null ? 'edit' : 'new';
    ref.result.then((m) => {
      if (m.reload) {
        this.loadSlips();
      }
    });
  }

  deleteSlip(id) {
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
        this._loadingslip
          .deleteLoadingSlip(id)
          .pipe(takeWhile(() => this.islive))
          .subscribe({
            next: (value) => {
              Swal.fire('Deleted!', 'Event has been deleted.', 'success');
              this.loadSlips();
            },
            error: (err) => {
              this._toastr.error(err);
            },
          });
      }
    });
  }
  export() {
    this.loadSlips({ export: 'yes' }, true);
  }
  ngOnDestroy(): void {
    this.islive = false;
  }
}
