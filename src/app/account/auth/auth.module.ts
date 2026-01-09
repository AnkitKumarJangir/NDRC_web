import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent,SignupComponent],
  imports: [CommonModule, ReactiveFormsModule,RouterModule, AuthRoutingModule],
  providers: [ToastrService],
})
export class AuthModule {}
