import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSlipsRoutingModule } from './loading-slips-routing.module';
import { LoadingSlipsComponent } from './loading-slips.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CreateLoadingSlipComponent } from './create-loading-slip/create-loading-slip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { FilterBoxComponent } from '../../shared/filter-box/filter-box.component';
import { NgSelectModule } from "@ng-select/ng-select"
@NgModule({
  declarations: [LoadingSlipsComponent, CreateLoadingSlipComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    NgbModule,
    NgSelectModule,
    FilterBoxComponent,
    LoadingSlipsRoutingModule,
    PaginationComponent,
  ],
})
export class LoadingSlipsModule {}
