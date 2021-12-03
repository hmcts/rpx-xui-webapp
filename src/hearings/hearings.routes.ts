import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { CancelHearingComponent, ChangeHearingComponent, DatePriorityHearingComponent, RequestHearingComponent, ViewHearingComponent } from './containers';
import { LocationSearchContainerComponent } from './containers/request-hearing/location-search-container/location-search-container.component';
import { WelshHearingComponent } from './containers/request-hearing/welsh-hearing/welsh-hearing.component';
import { PriorityResolver } from './resolvers/priority/priority.resolve';

export const ROUTES: Routes = [
  {
    path: 'cancel',
    component: CancelHearingComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [HealthCheckGuard],
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
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Change Hearing'
        }
      }
    ]
  },
  {
    path: 'request',
    component: RequestHearingComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing'
        }
      },
      {
        path: 'welsh-hearing',
        component: WelshHearingComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Welsh Hearing'
        }
      },
      {
        path: 'date-priority-hearing',
        resolve: { hearingPriorities: PriorityResolver },
        component: DatePriorityHearingComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing'
        }
      },
      {
        path: 'hearing-venue',
        resolve: { hearingPriorities: PriorityResolver },
        component: LocationSearchContainerComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Hearing Venue'
        }
      },
    ]
  },
  {
    path: 'view',
    component: ViewHearingComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | View Hearing'
        }
      }
    ]
  },
];

export const hearingsRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
