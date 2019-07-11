import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full'
  },
  {
    path: 'cases',
    canActivate: [AuthGuard],
    loadChildren: '../cases/cases.module#CasesModule'
  },
  {
    path: '**',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
