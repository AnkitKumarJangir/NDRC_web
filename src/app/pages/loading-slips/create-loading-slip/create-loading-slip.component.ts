import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoadingSlipsService } from '../../../services/loading-slips.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { takeWhile } from 'rxjs';

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
  islive = true;
  loadingSlipForm!: FormGroup;
  today = moment().format('YYYY-MM-DD');
  constructor(
    public _activateModel: NgbActiveModal,
    private _toastr: ToastrService,
    private fb: FormBuilder,
    private _loadingslip: LoadingSlipsService
  ) {}

  ngOnInit(): void {
    this.loadingSlipForm = this.fb.group({
      s_no: [null],
      date: [this.today, Validators.required],
      party: [null, Validators.required],
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
      advance: [null, Validators.required],
      balance: [null, Validators.required],
    });
    this.loadingSlipForm.get('date')?.disable();
    this.loadingSlipForm.get('s_no')?.disable();
    if (this.action == 'new') {
      this.getSerialNo();
    } else {
      this.getslip(this.slipId);
    }
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
      this.loadingSlipForm.get('date')?.enable();
      this.loadingSlipForm.get('s_no')?.enable();
      const data = {
        ...this.loadingSlipForm.value,
        party: this.loadingSlipForm.value.party.toLowerCase(),
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
    let adv = this.loadingSlipForm.get('advance')?.value;
    let freight = this.loadingSlipForm.get('freight')?.value;
    if (adv && freight) {
      if (adv == freight || adv > freight) {
        this.loadingSlipForm.get('balance')?.setValue('0.00');
      }
      if (freight > adv) {
        const bal = freight - adv;
        this.loadingSlipForm.get('balance')?.setValue(bal);
      }
    }
  }
  closePop(filter = null) {
    this._activateModel.close(filter);
  }
}
