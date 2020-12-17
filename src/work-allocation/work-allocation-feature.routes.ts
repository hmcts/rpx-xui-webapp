import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import {
  AvailableTasksComponent,
  MyTasksComponent,
  TaskAssignmentContainerComponent,
  TaskHomeComponent,
  TaskManagerComponent,
  TaskManagerListComponent,
  WorkAllocationHomeComponent,
} from './containers';
import { Assignment, InfoMessage } from './enums';
import { WorkAllocationFeatureToggleGuard } from './guards';
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
            data: { subTitle: 'My tasks' }
          },
          {
            path: 'available',
            component: AvailableTasksComponent,
            data: { subTitle: 'Available tasks' }
          }
        ]
      },
      {
        path: 'task-manager',
        component: TaskManagerComponent,
        canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard ],
        data: {
          title: 'HMCTS Manage WorkAllocation | Task manager'
        },
        children: [
          {
            path: '',
            component: TaskManagerListComponent
          }
        ]
      },
      {
        path: ':taskId/reassign',
        component: TaskAssignmentContainerComponent,
        canActivate: [ WorkAllocationFeatureToggleGuard ],
        resolve: { task: TaskResolver },
        data: {
          verb: Assignment.Reassign,
          successMessage: InfoMessage.REASSIGNED_TASK
        }
      },
      {
        path: ':taskId/assign',
        component: TaskAssignmentContainerComponent,
        canActivate: [ WorkAllocationFeatureToggleGuard ],
        resolve: { task: TaskResolver },
        data: {
          verb: Assignment.Assign,
          successMessage: InfoMessage.ASSIGNED_TASK
        }
      }
    ]
  }
];

export const workAllocationRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
