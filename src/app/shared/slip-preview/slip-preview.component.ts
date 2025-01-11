import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingSlipsService } from '../../services/loading-slips.service';
import { CompanyService } from '../../services/company.service';
import { takeWhile } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { ExportService } from '../../services/import-export.service';

@Component({
  selector: 'app-slip-preview',
  standalone: true,
  imports: [CommonModule, LoaderComponent, NgbModule],
  templateUrl: './slip-preview.component.html',
  styleUrl: './slip-preview.component.scss',
})
export class SlipPreviewComponent implements OnInit, OnDestroy {
  @Input('id') id = null;
  loadingData = null;
  companyData = null;
  loading = false;
  islive = true;

  constructor(
    public _activateModel: NgbActiveModal,
    private _toastr: ToastrService,
    private _export: ExportService,
    private _loadingslip: LoadingSlipsService,
    private _company: CompanyService
  ) {}
  ngOnInit(): void {
    if (this.id != null) {
      this.loadSlip(this.id);
    }
    this.loadCompanyDetails();
  }
  loadCompanyDetails() {
    this._company
      .getCompany()
      .pipe(takeWhile(() => this.islive))
      .subscribe(
        (res) => {
          if (res) {
            this.companyData = res;
          }
        },
        (err) => {
          this.loading = false;
        }
      );
  }
  loadSlip(id: any) {
    this.loading = true;
    this._loadingslip
      .singleGetLoadingSlip(id)
      .pipe(takeWhile(() => this.islive))
      .subscribe(
        (res: any) => {
          if (res) {
            this.loadingData = res;
            this.loadingData['balance'] =
              this.loadingData?.balance?.toLocaleString('en-IN');
            this.loadingData['advance'] =
              this.loadingData?.advance?.toLocaleString('en-IN');
            this.loadingData['freight'] =
              this.loadingData?.freight?.toLocaleString('en-IN');
            this.loading = false;
          }
        },
        (err: any) => {
          this.loading = false;
          this._toastr.error(err);
        }
      );
  }
  printSlip() {
    const element: Element = document.getElementById('PrintInvoice');
    this._export.generatePDF(element.innerHTML);
  }
  closePop() {
    this._activateModel.close();
  }
  ngOnDestroy(): void {
    this.islive = false;
  }
}
