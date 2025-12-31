import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingSlipsService } from '../../services/loading-slips.service';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit , OnDestroy{
  loader = false;
  islive = true;
  totalCounts = null
  constructor(private _loadingslip: LoadingSlipsService, private _toastr: ToastrService) { }
  ngOnInit(): void {
    this.loadSlips()
   }


  loadSlips(filter = null) {
    this.loader = true;
    this._loadingslip
      .getDashboard()
      .pipe(takeWhile(() => this.islive))
      .subscribe({
        next: (value: any) => {
          this.loader = false;
          this.totalCounts = value;
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
