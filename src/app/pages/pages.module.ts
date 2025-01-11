import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FilterBoxComponent } from '../shared/filter-box/filter-box.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FilterBoxComponent,
    PaginationComponent,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
