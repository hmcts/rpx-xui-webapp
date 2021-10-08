import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { HearingsRequestComponent } from './containers';

export const ROUTES: Routes = [
  {
    path: '',
    component: HearingsRequestComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [ HealthCheckGuard ],
        data: {
          title: 'HMCTS Manage cases | Hearings'
        }
      }
    ]
  },
];

export const hearingsRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
