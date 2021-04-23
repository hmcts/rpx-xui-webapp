import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { TaskActionConstants } from './components/constants';
import {
  AvailableTasksComponent,
  MyTasksComponent,
  TaskActionContainerComponent,
  TaskAssignmentContainerComponent,
  TaskHomeComponent,
  TaskManagerComponent,
  TaskManagerListComponent,
  WorkAllocationHomeComponent,
} from './containers';
import { WorkAllocationFeatureToggleGuard } from './guards';
import { SeniorTribunalCaseworkerGuard } from './guards/senior-tribunal-caseworker-guard';
import { TribunalCaseworkerGuard } from './guards/tribunal-caseworker-guard';
import { TaskResolver } from './resolvers';

export const ROUTES: Routes = [
  {
    path: '',
    component: WorkAllocationHomeComponent,
    canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard ],
    children: [
      {
        path: '',
        component: TaskHomeComponent,
        canActivate: [ HealthCheckGuard ],
        children: [
          {
            path: '',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: MyTasksComponent,
            data: {
              title: 'HMCTS Manage cases | My tasks', subTitle: 'My tasks'
            },
            canActivate: [ TribunalCaseworkerGuard ],
          },
          {
            path: 'available',
            component: AvailableTasksComponent,
            data: {
              title: 'HMCTS Manage cases | Available tasks', subTitle: 'Available tasks'
            },
            canActivate: [ TribunalCaseworkerGuard ],
          }
        ]
      },
      {
        path: 'task-manager',
        component: TaskManagerComponent,
        canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard, SeniorTribunalCaseworkerGuard ],
        data: {
          title: 'HMCTS Manage cases | Task manager'
        },
        children: [
          {
            path: '',
            component: TaskManagerListComponent
          }
        ]
      },
      {
        path: 'all-work',
        component: TaskManagerComponent,
        canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard ],
        data: {
          title: 'HMCTS Manage cases | Task manager'
        },
        children: [
          {
            path: '',
            component: TaskManagerListComponent
          }
        ]
      },
      {
        path: ':taskId',
        resolve: { taskAndCaseworkers: TaskResolver },
        canActivate: [ WorkAllocationFeatureToggleGuard, TribunalCaseworkerGuard ],
        children: [
          {
            path: 'assign',
            component: TaskAssignmentContainerComponent,
            data: TaskActionConstants.Assign
          },
          {
            path: 'reassign',
            component: TaskAssignmentContainerComponent,
            data: TaskActionConstants.Reassign
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
