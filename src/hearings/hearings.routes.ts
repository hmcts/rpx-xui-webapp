import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { HearingRequirementsComponent } from './containers/request-hearing/hearing-requirements/hearing-requirements.component';
import { CancelHearingComponent, ChangeHearingComponent, DatePriorityHearingComponent, HearingStageComponent, RequestHearingComponent, ViewHearingComponent } from './containers';
import { LocationSearchContainerComponent } from './containers/request-hearing/location-search-container/location-search-container.component';
import { WelshHearingComponent } from './containers/request-hearing/welsh-hearing/welsh-hearing.component';
import { HearingCategory } from './models/hearings.enum';
import { RefDataResolver } from './resolvers/ref-data/ref-data-resolver.resolve';

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
        path: 'location-search',
        component: LocationSearchContainerComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing Location'
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
        resolve: { hearingPriorities: RefDataResolver },
        component: DatePriorityHearingComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing',
          category: HearingCategory.Priority
        }
      },
      {
        path: 'hearing-stage',
        resolve: { hearingStages: RefDataResolver },
        component: HearingStageComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Hearing Stage | Date Priority Hearing',
          category: HearingCategory.HearingType
        }
      },
      {
        path: 'hearing-requirements',
        resolve: { hearingPriorities: RefDataResolver },
        component: HearingRequirementsComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Hearing Requirements'
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
