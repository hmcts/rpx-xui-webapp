import { Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full'
  },
  {
    path: 'cases',
    canActivate: [AuthService],
    loadChildren: '../cases/cases.module#CasesModule'
  },
  {
    path: '**',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
