import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingSlipsService } from '../../services/loading-slips.service';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-loading-slips',
  templateUrl: './loading-slips.component.html',
  styleUrl: './loading-slips.component.scss',
})
export class LoadingSlipsComponent implements OnInit, OnDestroy {
  loader = false;
  islive = true;
  slipList = [];
  constructor(
    private _loadingslip: LoadingSlipsService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadSlips();
  }

  loadSlips(filter = null) {
    this.loader = true;
    this._loadingslip
      .getLoadingSlips(filter)
      .pipe(takeWhile(() => this.islive))
      .subscribe({
        next: (value: any) => {
          this.loader = false;
          this.slipList = value.data;
        },
        error: (err) => {
          this.loader = false;
          this._toastr.error(err);
        },
      });
  }
  ngOnDestroy(): void {
    this.islive = false;
  }
}
