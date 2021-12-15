import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConstants } from '../app/app.constants';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { NocHomeComponent } from './containers/noc-home/noc-home.component';
import { NocGuard } from './guards/noc-guard';

export const ROUTES: Routes = [
  {
    path: '',
    component: NocHomeComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [ HealthCheckGuard, NocGuard ],
        data: {
          title: 'HMCTS Manage cases | Notice of Change',
          needsFeaturesEnabled: [ AppConstants.FEATURE_NAMES.noticeOfChange ],
          featureDisabledRedirect: '/'
        }
      }
    ]
  },
];

export const nocRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
