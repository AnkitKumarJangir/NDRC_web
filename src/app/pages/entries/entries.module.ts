import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesComponent } from './entries.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterBoxComponent } from '../../shared/filter-box/filter-box.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { LoadingSlipsRoutingModule } from '../loading-slips/loading-slips-routing.module';
import { LoaderComponent } from '../../shared/loader/loader.component';


@NgModule({
  declarations: [
    EntriesComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    NgSelectModule,
    FilterBoxComponent,
    LoaderComponent,
    LoadingSlipsRoutingModule,
    PaginationComponent,
  ]
})
export class EntriesModule { }
