import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { TaskActionConstants } from './components/constants';
import {
  AllWorkHomeComponent,
  AllWorkTaskComponent,
  AllWorkCaseComponent,
  AvailableTasksComponent,
  MyTasksComponent,
  TaskActionContainerComponent,
  TaskAssignmentConfirmComponent,
  TaskAssignmentContainerComponent,
  TaskHomeComponent,
  WorkAllocationHomeComponent,
} from './containers';
import { MyCasesComponent } from './containers/my-cases/my-cases.component';
import { WorkAllocationFeatureToggleGuard } from './guards';
import { TaskResolver } from './resolvers';
import { LocationResolver } from './resolvers/location-resolver.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: WorkAllocationHomeComponent,
    canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard ],
    children: [
      {
        path: 'my-work',
        component: TaskHomeComponent,
        canActivate: [ HealthCheckGuard ],
        resolve: {
          location: LocationResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: MyTasksComponent,
            data: {
              title: 'HMCTS Manage cases | My work | My tasks', subTitle: 'My tasks'
            }
          },
          {
            path: 'available',
            component: AvailableTasksComponent,
            data: {
              title: 'HMCTS Manage cases | My work | Available tasks', subTitle: 'Available tasks'
            }
          },
          {
            path: 'my-cases',
            component: MyCasesComponent,
            data: {
              title: 'HMCTS Manage cases | My work | My cases', subTitle: 'My cases'
            }
          }
        ]
      },
      {
        path: 'all-work',
        component: AllWorkHomeComponent,
        canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard ],
        data: {
          title: 'HMCTS Manage cases | Task manager'
        },
        children: [
          {
            path: '',
            redirectTo: 'tasks'
          },
          {
            path: 'tasks',
            component: AllWorkTaskComponent,
            data: {
              title: 'HMCTS Manage cases | All work | Tasks', subTitle: 'Tasks'
            }
          },
          {
            path: 'cases',
            component: AllWorkCaseComponent,
            data: {
              title: 'HMCTS Manage cases | All work | Cases', subTitle: 'Cases'
            }
          }
        ]
      },
      {
        path: ':taskId',
        resolve: { taskAndCaseworkers: TaskResolver },
        canActivate: [ WorkAllocationFeatureToggleGuard ],
        children: [
          {
            path: 'assign',
            children: [
              {
                path: 'confirm',
                component: TaskAssignmentConfirmComponent,
                data: TaskActionConstants.Assign
              },
              {
                path: '',
                component: TaskAssignmentContainerComponent,
                data: TaskActionConstants.Assign
              }
            ]
          },
          {
            path: 'reassign',
            children: [
              {
                path: 'confirm',
                component: TaskAssignmentConfirmComponent,
                data: TaskActionConstants.Reassign
              },
              {
                path: '',
                component: TaskAssignmentContainerComponent,
                data: TaskActionConstants.Reassign
              }
            ]
          },
          {
            path: 'cancel',
            component: TaskActionContainerComponent,
            data: TaskActionConstants.Cancel
          },
          {
            path: 'complete',
            component: TaskActionContainerComponent,
            data: TaskActionConstants.MarkAsDone
          },
          {
            path: 'unclaim',
            children: [
              {
                path: 'manager',
                component: TaskActionContainerComponent,
                data: TaskActionConstants.Unassign
              },
              {
                path: '',
                component: TaskActionContainerComponent,
                data: TaskActionConstants.UnassignNonManager
              }
            ]
          }
        ]
      }
    ]
  }
];

export const workAllocationRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
