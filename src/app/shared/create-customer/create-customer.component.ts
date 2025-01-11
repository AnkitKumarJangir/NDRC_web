import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { ExportService } from '../../services/import-export.service';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss',
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  @Input('customerId') customerId = null;
  @Input('action') action = 'new';
  loading = false;
  islive = true;
  customerForm!: FormGroup;
  constructor(
    public _activateModel: NgbActiveModal,
    private _toastr: ToastrService,
    private fb: FormBuilder,
    private _customer: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null],
      description: [null],
      address_line_1: [null],
      address_line_2: [null],
      mobile: [null, Validators.required],
    });
    if (this.action != 'new') {
      this.getSingleCustomer(this.customerId);
    }
  }

  getSingleCustomer(id) {
    this.loading = true;
    this._customer
      .singleCustomer(id)
      .pipe(takeWhile(() => this.islive))
      .subscribe(
        (res: any) => {
          if (res) {
            this.loading = false;
            this.customerForm.patchValue({
              ...res,
            });
          }
        },
        (err: any) => {
          this.loading = false;
          this._toastr.error(err);
        }
      );
  }

  saveRating() {
    if (this.customerForm.valid) {
      this.loading = true;
      const data = {
        ...this.customerForm.value,
      };
      if (this.action == 'new') {
        this._customer.createCustomer(data).subscribe(
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
        this._customer.updateCustomer(data, this.customerId).subscribe(
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
      this.customerForm.markAllAsTouched();
    }
  }

  closePop(filter = null) {
    this._activateModel.close(filter);
  }
  ngOnDestroy(): void {
    this.islive = false;
  }
}
