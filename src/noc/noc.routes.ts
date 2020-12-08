import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureToggleGuard } from '@hmcts/rpx-xui-common-lib';
import { AppConstants } from 'src/app/app.constants';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { NocHomeComponent } from './containers/noc-home/noc-home.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: NocHomeComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [ HealthCheckGuard, FeatureToggleGuard ],
        data: {
          title: 'HMCTS Manage Cases | Notice of Change',
          needsFeaturesEnabled: [ AppConstants.FEATURE_NAMES.noticeOfChange ],
          featureDisabledRedirect: '/'
        }
      }
    ]
  },
];

export const nocRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
