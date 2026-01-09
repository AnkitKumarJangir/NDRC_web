import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../extra-pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: 'loading-slips', loadChildren: () => import('./loading-slips/loading-slips.module').then(m => m.LoadingSlipsModule) },
  { path: 'entries', loadChildren: () => import('./entries/entries.module').then(m => m.EntriesModule) },
  { path: 'sheet', loadChildren: () => import('./sheet/sheet.module').then(m => m.SheetModule) },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'setting', loadComponent: () => import('./setting/setting.component').then(m => m.SettingComponent) },
  { path: 'subscription', loadComponent: () => import('./subscription/subscription.component').then(m => m.SubscriptionComponent) },
    {
      path: '**',
      component: PageNotFoundComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
