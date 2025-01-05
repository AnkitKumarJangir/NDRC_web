import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingSlipsComponent } from './loading-slips.component';

const routes: Routes = [{ path: '', component: LoadingSlipsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingSlipsRoutingModule { }
