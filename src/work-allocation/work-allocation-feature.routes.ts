import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from 'src/app/shared/guards/health-check.guard';
import { TaskListComponent } from './containers/task-list/task-list.component';
import { TaskManagerComponent } from './containers/task-manager/task-manager.component';

export const ROUTES: Routes = [
    {
      path: '',
      component: TaskListComponent
    },
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
