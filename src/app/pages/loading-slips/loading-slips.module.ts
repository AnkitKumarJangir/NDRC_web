import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSlipsRoutingModule } from './loading-slips-routing.module';
import { LoadingSlipsComponent } from './loading-slips.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CreateLoadingSlipComponent } from './create-loading-slip/create-loading-slip.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingSlipsComponent, CreateLoadingSlipComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    NgbModule,
    LoadingSlipsRoutingModule,
  ],
})
export class LoadingSlipsModule {}
