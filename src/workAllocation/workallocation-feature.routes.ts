import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from 'src/app/shared/guards/health-check.guard';
import { TaskListComponent } from './containers/taskList/taskList.component';
import { TaskManagerComponent } from './containers/taskManager/taskManager.component';

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

export const casesRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
