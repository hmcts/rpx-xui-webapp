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
  { path: 'case/:jurisdiction/:case-type/:caseId', redirectTo: 'cases/case-details/:caseId', pathMatch: 'full' },
  { path: 'case/:caseId', redirectTo: 'cases/case-details/:caseId', pathMatch: 'full' },
  { path: 'case-details/:caseId', redirectTo: 'cases/case-details/:caseId', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
