import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs';
import { emailRegx, panRegx, gstRegx, mobileRegx } from '../../config';
import { CompanyService } from '../../services/company.service';
import { HelperService } from '../../services/helper.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {
  companyForm: FormGroup;
  isAdmin = this._helper.getCurrentUser().is_admin;
  showLoader = false
  islive = true;
  franchise_id = null;
  logoPreview = false;
  loader = false;
  companyDetails = null
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
    this.companyForm.get('serial_no').disable()
    this.companyForm.get('sheet_no').disable()
    this.companyForm.get('commission_pct').disable()
    if (this.franchise_id) {
      this.getCompanyDetails()
    }
  }

  getCompanyDetails() {
    this.showLoader = true
    this._company.getSingleCompayDetails(this.franchise_id).pipe(takeWhile(() => this.islive)).subscribe({
      next: (value: any) => {
        this.showLoader = false;
        this.companyDetails = value;
        this.companyForm.patchValue({ ...value });
        this.contacts.clear()
        if (value.contact.length) {
          value.contact.forEach((d) => {
            this.addContact(d)
          })
        }
        if(!this.isAdmin) this.companyForm.disable()
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
   updateCompany() {
    if (this.companyForm.valid) {
      const value = this.companyForm.getRawValue()
      this.loader = true;
      this._company.updateCompany(value).pipe(takeWhile(() => this.islive)).subscribe({
        next: (value: any) => {
          this.loader = false;
          this._toastr.success('Updated Successfully!');
          this.getCompanyDetails()
        }, error: (err) => {
          this.loader = false;
          this._toastr.error(err);
        }
      })
    } else {
      this.companyForm.markAllAsTouched()
    }
  }
}
