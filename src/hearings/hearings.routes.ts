import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
<<<<<<< HEAD
=======
import { LocationSearchContainerComponent } from './containers/request-hearing/location-search-container/location-search-container.component';
>>>>>>> 7d4f2f8065770c1f4115e24f760a882004dc445c
import { CancelHearingComponent, ChangeHearingComponent, RequestHearingComponent, ViewHearingComponent } from './containers';
import { LocationSearchContainerComponent } from './containers/request-hearing/location-search-container/location-search-container.component';
import { WelshHearingComponent } from './containers/request-hearing/welsh-hearing/welsh-hearing.component';

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
      },
      {
        path: 'welsh-hearing',
        component: WelshHearingComponent,
        canActivate: [ HealthCheckGuard ],
        data: {
          title: 'HMCTS Manage cases | Request Hearing'
        }
      },
      {
        path: 'welsh-hearing',
        component: WelshHearingComponent,
        canActivate: [ HealthCheckGuard ],
        data: {
          title: 'HMCTS Manage cases | Request Hearing'
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
