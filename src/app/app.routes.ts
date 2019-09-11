import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { ServiceDownComponent } from './components';

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
  { path: 'case/:jurisdiction/:case-type/:cid', redirectTo: 'cases/case-details/:cid', pathMatch: 'full' },
  { path: 'case/:cid', redirectTo: 'cases/case-details/:cid', pathMatch: 'full' },
  { path: 'case-details/:cid', redirectTo: 'cases/case-details/:cid', pathMatch: 'full' },
  { path: 'service-down', component: ServiceDownComponent },
  {
    path: '**',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
