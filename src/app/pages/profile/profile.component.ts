import { Component, OnDestroy, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { AccountService } from '../../services/account.service';
import { takeWhile } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailRegx, mobileRegx } from '../../config';
import  Cookies from 'js-cookie'
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  loader = false;
  islive = true;
  user = null;

  form:FormGroup;
  constructor(private _fb:FormBuilder,private _account:AccountService,private _toastr:ToastrService){}



  ngOnInit(): void {
     this.form = this._fb.group({
      first_name:[null,Validators.required],
      last_name:[null,Validators.required],
      email:[null,[Validators.required,Validators.pattern(emailRegx)]],
      mobile:[null,[Validators.required,Validators.pattern(mobileRegx)]],
     })
     this.loadUserDetails()
  }

  loadUserDetails(){
    this._account.getUserDetails().pipe(takeWhile(()=>this.islive)).subscribe({
      next : (value) =>{
        this.user = value;
        this.form.patchValue(value);
      },error : (err) =>{
        this._toastr.error(err);
      }
    })
  }

  updateProfile(){
    this.loader = true;
    this._account.updateUser(this.form.value).pipe(takeWhile(()=>this.islive)).subscribe({
      next : (value:any) =>{
        this.loader = false;
        this._toastr.success(value?.message);
        Cookies.set('ndrc_user', JSON.stringify(value.data));
        location.reload()
      },error : (err) =>{
        this._toastr.error(err);
        this.loader = false;
      }
    })
 
  }
   
  ngOnDestroy(): void {
    
  }
}
