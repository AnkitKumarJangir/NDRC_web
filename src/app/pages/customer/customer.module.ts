import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterBoxComponent } from '../../shared/filter-box/filter-box.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FilterBoxComponent,
    PaginationComponent,
    LoaderComponent,
    CustomerRoutingModule,
  ],
})
export class CustomerModule {}
