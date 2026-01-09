import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionsComponent } from "../subscriptions/subscriptions.component";
import { CompanyService } from '../services/company.service';
import { takeWhile } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Cookies from 'js-cookie';
import { HelperService } from '../services/helper.service';
import { LoaderComponent } from "../shared/loader/loader.component";
import { Router } from '@angular/router';
import { emailRegx, gstRegx, mobileRegx, panRegx } from '../config';
@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SubscriptionsComponent, LoaderComponent],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent implements OnInit, OnDestroy {

  step = 1;
  companyForm!: FormGroup;
  loader = false;
  islive = true
  franchise_id = null;
  showLoader = false

  constructor(private fb: FormBuilder, private _router: Router, private _helper: HelperService, private _company: CompanyService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.franchise_id = this._helper.getFranchiseId();

    this.companyForm = this.fb.group({
      company_name: ['', Validators.required],
      sub_title: [''],
      business_type: ['', Validators.required],
      company_email: ['', [Validators.required, Validators.pattern(emailRegx)]],
      address: ['', Validators.required],
      contact: this.fb.array([this.createContact()]),
      pan_no: ['', Validators.pattern(panRegx)],
      gst_no: ['', Validators.pattern(gstRegx)],
      commission_pct: [0, Validators.required],
      serial_no: [0, Validators.required],
      sheet_no: [0, Validators.required],
    });
    if (this.franchise_id) {
      this.getCompanyDetails()
    }
  }

  getCompanyDetails() {
    this.showLoader = true
    this._company.getSingleCompayDetails(this.franchise_id).pipe(takeWhile(() => this.islive)).subscribe({
      next: (value: any) => {
        this.showLoader = false;
        this.companyForm.patchValue({ ...value });
        this.contacts.clear()
        if (value.contact.length) {
          value.contact.forEach((d) => {
            this.addContact(d)
          })
        }
      }, error: (err) => {
        this.showLoader = false;
        this._toastr.error(err);
      }
    })
  }

  createContact(data = '') {
    return this.fb.control(data, [Validators.required, Validators.pattern(mobileRegx)]);
  }

  get contacts() {
    return this.companyForm.get('contact') as FormArray;
  }

  addContact(data = '') {
    this.contacts.push(this.createContact(data));
  }

  removeContact(i: number) {
    this.contacts.removeAt(i);
  }

  next() {
    if (this.companyForm.valid || this.step < 3) {
      this.step++;
    }
  }

  prev() {
    this.step--;
  }

  skipSubscription() {
    this._router.navigateByUrl('/dashboard')
  }
  updateCompany() {
    if (this.companyForm.valid) {
      this.loader = true;
      this._company.updateCompany(this.companyForm.value).pipe(takeWhile(() => this.islive)).subscribe({
        next: (value: any) => {
          this.loader = false;
          this.step++
        }, error: (err) => {
          this.loader = false;
          this._toastr.error(err);
        }
      })
    } else {
      this.companyForm.markAllAsTouched()
    }
  }
  submit() {
    if (this.companyForm.valid) {
      this.loader = true;
      if (this.franchise_id) {
        this.updateCompany();
        return;
      }
      this._company.createCompany(this.companyForm.value).pipe(takeWhile(() => this.islive)).subscribe({
        next: (value: any) => {
          this.loader = false;
          this.franchise_id = value.data._id;
          Cookies.set('ndrc_franchise', JSON.stringify(this.franchise_id));
          this.step++
        }, error: (err) => {
          this.loader = false;
          this._toastr.error(err);
        }
      })
    } else {
      this.companyForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.islive = false;
  }
}