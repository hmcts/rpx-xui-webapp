import {Routes} from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'organisation',
    pathMatch: 'full',
  },
  {
    path: 'organisation',
    loadChildren: '../../projects/exui-organisation/src/lib/exui-organisation.module#OrganisationModule'
  }
]
