import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '',
    component: LayoutComponent,

    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
];
