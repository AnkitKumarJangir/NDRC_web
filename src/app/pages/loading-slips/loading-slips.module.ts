import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSlipsRoutingModule } from './loading-slips-routing.module';
import { LoadingSlipsComponent } from './loading-slips.component';


@NgModule({
  declarations: [
    LoadingSlipsComponent
  ],
  imports: [
    CommonModule,
    LoadingSlipsRoutingModule
  ]
})
export class LoadingSlipsModule { }
