import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { PageNotFoundComponent } from './extra-pages/page-not-found/page-not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
