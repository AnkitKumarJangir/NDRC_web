import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheetRoutingModule } from './sheet-routing.module';
import { SheetComponent } from './sheet.component';


@NgModule({
  declarations: [
    SheetComponent
  ],
  imports: [
    CommonModule,
    SheetRoutingModule
  ]
})
export class SheetModule { }
