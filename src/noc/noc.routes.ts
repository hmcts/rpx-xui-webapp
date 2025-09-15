import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureToggleGuard } from '@hmcts/rpx-xui-common-lib';
import { NocHomeComponent } from './containers/noc-home/noc-home.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: NocHomeComponent,
    children: [
      {
        path: '',
        component: null,
        data: {
          title: 'HMCTS Manage cases | Notice of Change',
          featureDisabledRedirect: '/'
        }
      }
    ]
  }
];

export const nocRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(ROUTES);
