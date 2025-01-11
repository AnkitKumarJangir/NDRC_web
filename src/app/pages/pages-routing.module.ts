import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },
  { path: 'loading-slips', loadChildren: () => import('./loading-slips/loading-slips.module').then(m => m.LoadingSlipsModule) },
  { path: 'entries', loadChildren: () => import('./entries/entries.module').then(m => m.EntriesModule) },
  { path: 'sheet', loadChildren: () => import('./sheet/sheet.module').then(m => m.SheetModule) },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
