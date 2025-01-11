import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs';
import Swal from 'sweetalert2';
import { ExportService } from '../../services/import-export.service';
import { LoadingSlipsService } from '../../services/loading-slips.service';
import { SlipPreviewComponent } from '../../shared/slip-preview/slip-preview.component';
import { CreateLoadingSlipComponent } from '../loading-slips/create-loading-slip/create-loading-slip.component';
import { CustomerService } from '../../services/customer.service';
import { CreateCustomerComponent } from '../../shared/create-customer/create-customer.component';
import { ImportFileComponent } from '../../shared/import-file/import-file.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit, OnDestroy {
  loader = false;
  islive = true;
  customerList = [];
  pagination = null;
  constructor(
    private _customer: CustomerService,
    private _toastr: ToastrService,
    private _export: ExportService,
    private _model: NgbModal
  ) {}
  ngOnInit(): void {
    this.loadCustomers();
    this._export.files.pipe(takeWhile(() => this.islive)).subscribe({
      next: (value) => {
        if (value) {
          this.uploadfile(value);
        }
      },
    });
  }
  filterApplied($event) {
    this.loadCustomers($event);
  }
  loadCustomers(filter = null, isExport = false) {
    this.loader = true;
    this._customer
      .getCustomerList(filter, isExport)
      .pipe(takeWhile(() => this.islive))
      .subscribe({
        next: (value: any) => {
          this.loader = false;
          if (isExport) {
            this._export.saveAsFile(value, 'customers.xlsx', 'xlsx');
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
    this.customerList = value.results;
  }

  createCustomer(id = null) {
    const ref = this._model.open(CreateCustomerComponent, {
      size: 'lg',
    });
    ref.componentInstance.customerId = id;
    ref.componentInstance.action = id != null ? 'edit' : 'new';
    ref.result.then((m) => {
      if (m.reload) {
        this.loadCustomers();
      }
    });
  }

  deleteCustomer(id) {
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
        this._customer
          .deleteCustomer(id)
          .pipe(takeWhile(() => this.islive))
          .subscribe({
            next: (value) => {
              Swal.fire('Deleted!', 'Event has been deleted.', 'success');
              this.loadCustomers();
            },
            error: (err) => {
              this._toastr.error(err);
            },
          });
      }
    });
  }
  export() {
    this.loadCustomers({ export: 'yes' }, true);
  }
  import() {
    const Ref = this._model.open(ImportFileComponent, {
      size: 'md',
    });
  }
  uploadfile(file) {
    let formData = new FormData();
    formData.append('file', file);
    this._customer
      .importCustomer(formData)
      .pipe(takeWhile(() => this.islive))
      .subscribe({
        next: (value: any) => {
          this._toastr.success(value?.message);
          this._export.uploading.next(false);
        },
        error: (err) => {
          this._toastr.success(err);
          this._export.uploading.next(false);
        },
      });
  }
  ngOnDestroy(): void {
    this.islive = false;
  }
}
