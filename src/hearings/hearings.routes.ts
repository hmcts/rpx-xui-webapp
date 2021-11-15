import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchLocationComponent } from '@hmcts/rpx-xui-common-lib';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { CancelHearingComponent, ChangeHearingComponent, RequestHearingComponent, ViewHearingComponent } from './containers';
import { LocationSearchContainerComponent } from './containers/request-hearing/location-search-container/location-search-container.component';

export const ROUTES: Routes = [
  {
    path: 'cancel',
    component: CancelHearingComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [ HealthCheckGuard ],
        data: {
          title: 'HMCTS Manage cases | Cancel Hearing'
        }
      }
    ]
  },
  {
    path: 'change',
    component: ChangeHearingComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [ HealthCheckGuard ],
        data: {
          title: 'HMCTS Manage cases | Change Hearing'
        }
      }
    ]
  },
  {
    path: 'request',
    component: null,
    children: [
      {
        path: '',
        component: null,
        canActivate: [ HealthCheckGuard ],
        data: {
          title: 'HMCTS Manage cases | Request Hearing'
        }
      },
      {
        path: 'locationSearch',
        component: LocationSearchContainerComponent,
        canActivate: [ HealthCheckGuard ],
        data: {
          title: 'HMCTS Hearings | Request Hearing Location'
        }
      }
    ]
  },
  {
    path: 'view',
    component: ViewHearingComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [ HealthCheckGuard ],
        data: {
          title: 'HMCTS Manage cases | View Hearing'
        }
      }
    ]
  },
];

export const hearingsRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
