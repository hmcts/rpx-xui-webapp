import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '@shared/guards/health-check.guard';
import { TaskAssignmentContainerComponent } from './containers';
import { TaskHomeComponent } from './containers/task-home/task-home.component';
import { TaskListComponent } from './containers/task-list/task-list.component';
import { TaskManagerComponent } from './containers/task-manager/task-manager.component';
import { WorkAllocationFeatureToggleGuard } from './guards/work-allocation-feature-toggle.guard';
import { TaskResolver } from './resolvers/task.resolver';

export const ROUTES: Routes = [
    {
      path: '',
      component: TaskHomeComponent,
      canActivate: [ HealthCheckGuard, WorkAllocationFeatureToggleGuard ],
    },
    // TODO: We probably don't need the following routes,
    // as these components parents should be TaskHomeComponent.
    // to discuss.
    {
      path: 'task-list',
      component: TaskListComponent,
      canActivate: [WorkAllocationFeatureToggleGuard]
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
      },
    }
   ];

export const workAllocationRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
