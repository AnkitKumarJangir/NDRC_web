import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoadingSlipsService } from '../../../services/loading-slips.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { takeWhile } from 'rxjs';
import { CustomerService } from '../../../services/customer.service';
import { CreateCustomerComponent } from '../../../shared/create-customer/create-customer.component';

@Component({
  selector: 'app-create-loading-slip',
  standalone: false,
  templateUrl: './create-loading-slip.component.html',
  styleUrl: './create-loading-slip.component.scss',
})
export class CreateLoadingSlipComponent implements OnInit {
  @Input('slipId') slipId = null;
  @Input('action') action = 'new';
  loading = false;
  ctLoader = false;
  customerList = [];
  islive = true;
  loadingSlipForm!: FormGroup;
  today = moment().format('YYYY-MM-DD');
  constructor(
    public _activateModel: NgbActiveModal,
    private _toastr: ToastrService,
    private _customer: CustomerService,
    private fb: FormBuilder,
    private _model: NgbModal,
    private _loadingslip: LoadingSlipsService
  ) { }

  ngOnInit(): void {
    this.loadingSlipForm = this.fb.group({
      s_no: [null],
      date: [this.today, Validators.required],
      customer: [null, Validators.required],
      address: [null],
      trailor_no: [null, Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
      goods: [null],
      freight: [null, Validators.required],
      p_m_t: [null],
      fine: [null],
      detain: [null],
      size: [null],
      l: [null, Validators.required],
      w: [null, Validators.required],
      h: [null, Validators.required],
      weight: [null, Validators.required],
      guarantee: [null],
      description: [null],
      advance: [null, Validators.required],
      balance: [null, Validators.required],
    });
    // this.loadingSlipForm.get('date')?.disable();
    this.loadingSlipForm.get('s_no')?.disable();
    this.loadingSlipForm.get('balance')?.disable();
    if (this.action == 'new') {
      this.getSerialNo();
    } else {
      this.getslip(this.slipId);
    }
    this.loadCustomer()

  }
  loadCustomer() {
    this._customer
      .getCustomers(null)
      .pipe(takeWhile(() => this.islive))
      .subscribe({
        next: (value: any) => {
          this.ctLoader = false;
          this.customerList = value;
        },
        error: (err) => {
          this.ctLoader = false;
          this._toastr.error(err);
        },
      });
  }
  createCustomer(id = null) {
    const ref = this._model.open(CreateCustomerComponent, {
      size: 'lg',
    });
    ref.componentInstance.customerId = id;
    ref.componentInstance.action = id != null ? 'edit' : 'new';
    ref.result.then((m) => {
      if (m.reload) {
        this.loadCustomer();
      }
    });
  }
  getslip(id) {
    this.loading = true;
    this._loadingslip
      .singleGetLoadingSlip(id)
      .pipe(takeWhile(() => this.islive))
      .subscribe(
        (res: any) => {
          if (res) {
            this.loading = false;
            const date = res.date?.split('-').reverse().join('-');

            this.loadingSlipForm.patchValue({
              ...res,
              customer: res?.customer?._id ?? null,
              date: moment(date).clone().format('YYYY-MM-DD'),
            });
          }
        },
        (err: any) => {
          this.loading = false;
          this._toastr.error(err);
        }
      );
  }

  getSerialNo() {
    this.loading = true;
    this._loadingslip
      .getSerialNumber()
      .pipe(takeWhile(() => this.islive))
      .subscribe(
        (res: any) => {
          if (res) {
            this.loading = false;
            this.loadingSlipForm.get('s_no')?.setValue(res.serial_number);
          }
        },
        (err) => {
          this._toastr.error(err);
          this.loading = false;
        }
      );
  }
  saveRating() {
    if (this.loadingSlipForm.valid) {
      this.loading = true;
      const data = {
        ...this.loadingSlipForm.getRawValue(),
        date: moment(this.loadingSlipForm.get('date').value).format(
          'DD-MM-yyyy'
        ),
      };
      if (this.action == 'new') {
        this._loadingslip.createLoadingSlip(data).subscribe(
          (res: any) => {
            if (res) {
              this._toastr.success(res.message);
              this.loading = false;
              this.closePop({ reload: true });
            }
          },
          (err) => {
            this.loading = false;
            this._toastr.error(err.statusText);
          }
        );
      } else {
        this._loadingslip.updateLoadingSlip(data, this.slipId).subscribe(
          (res: any) => {
            if (res) {
              this.loading = false;
              this._toastr.success(res.message);
              this.closePop({ reload: true });
            }
          },
          (err) => {
            this.loading = false;
            this._toastr.error(err.statusText);
          }
        );
      }
    } else {
      this._toastr.error('fields with * are required');
      this.loadingSlipForm.markAllAsTouched();
    }
  }
  calculateBal() {
    const adv = Number(this.loadingSlipForm.get('advance')?.value) || 0;
    const freight = Number(this.loadingSlipForm.get('freight')?.value) || 0;
    const detain = Number(this.loadingSlipForm.get('detain')?.value) || 0;

    let balance = freight - adv + detain;

    if (balance < 0) {
      balance = 0;
    }

    this.loadingSlipForm.get('balance')?.setValue(balance.toFixed(2), {
      emitEvent: false
    });
  }
  closePop(filter = null) {
    this._activateModel.close(filter);
  }
}
