import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from 'src/app/shared/guards/health-check.guard';

import { AvailableTasksComponent } from './containers/available-tasks/available-tasks.component';
import { MyTasksComponent } from './containers/my-tasks/my-tasks.component';
import { TaskAssignmentContainerComponent } from './containers/task-assignment/task-assignment-container.component';
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
          },
          {
            path: 'unavailable',
            component: AvailableTasksComponent,
            data: { subTitle: 'Available tasks (but with errors)', operator: 'unavailable' }
          }
        ]
      },
      {
        path: 'task-manager',
        component: TaskManagerComponent,
        canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard ],
        data: {
          title: 'HMCTS Manage WorkAllocation | Task Manager'
        }
      },
      {
        path: 'reassign/:taskId',
        component: TaskAssignmentContainerComponent,
        canActivate: [ WorkAllocationFeatureToggleGuard ],
        resolve: {
          task: TaskResolver
        }
      }
    ]
  }
];

export const workAllocationRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
