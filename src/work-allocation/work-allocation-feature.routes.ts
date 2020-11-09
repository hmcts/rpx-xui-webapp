import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from 'src/app/shared/guards/health-check.guard';
import { TaskHomeComponent } from './containers/task-home/task-home.component';
import { TaskListComponent } from './containers/task-list/task-list.component';
import { TaskManagerComponent } from './containers/task-manager/task-manager.component';

export const ROUTES: Routes = [
    {
      path: '',
      component: TaskHomeComponent
    },
    // TODO: We probably don't need the following routes,
    // as these components parents should be TaskHomeComponent.
    // to discuss.
    {
      path: 'task-list',
      component: TaskListComponent
    },
    {
      path: 'task-manager',
      component: TaskManagerComponent,
      canActivate: [ HealthCheckGuard ],
      data: {
        title: 'HMCTS Manage WorkAllocation | Task Manager'
      }
    }
   ];

export const workAllocationRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
