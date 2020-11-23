import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from 'src/app/shared/guards/health-check.guard';

import { TaskAssignmentContainerComponent } from './containers';
import { TaskHomeComponent } from './containers/task-home/task-home.component';
import { TaskManagerComponent } from './containers/task-manager/task-manager.component';
import { WorkAllocationHomeComponent } from './containers/work-allocation-home/work-allocation-home.component';
import { WorkAllocationFeatureToggleGuard } from './guards/work-allocation-feature-toggle.guard';
import { TaskResolver } from './resolvers/task.resolver';

export const ROUTES: Routes = [
  {
    path: '',
    component: WorkAllocationHomeComponent,
    canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard ],
    children: [
      {
        path: '',
        component: TaskHomeComponent,
        canActivate: [ HealthCheckGuard ]
      },
      {
        path: 'available',
        component: TaskHomeComponent,
        canActivate: [ HealthCheckGuard ]
      },
      {
        path: 'task-list/reassign/:taskId',
        component: TaskAssignmentContainerComponent,
        canActivate: [WorkAllocationFeatureToggleGuard],
        resolve: {
          task: TaskResolver
        }
      },
      {
        path: 'task-manager',
        component: TaskManagerComponent,
        canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard ],
        data: {
          title: 'HMCTS Manage WorkAllocation | Task Manager'
        }
      }
    ]
  }
];

export const workAllocationRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
