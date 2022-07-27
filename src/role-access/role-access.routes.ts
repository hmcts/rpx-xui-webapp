import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseAllocatorGuard } from '../app/guards/case-allocator.guard';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { UserNotAssignableComponent } from './components';
import { DeleteExclusionComponent, RemoveRoleComponent } from './containers';
import { AddExclusionHomeComponent } from './containers/add-exclusion';
import { AllocateRoleHomeComponent } from './containers/allocate-role';
import { SpecificAccessHomeComponent } from './containers/specific-access';
import { TaskRoleAccessResolver } from './resolvers/task-role-access-resolver';

export const ROUTES: Routes = [
  { path: 'user-not-assignable', component: UserNotAssignableComponent },
  {
    path: ':taskId/assignment/:assignmentId',
    resolve: { taskAndRole: TaskRoleAccessResolver},
    children: [
    {
      path: 'specific-access',
      component: SpecificAccessHomeComponent,
      children: [
        {
          path: '',
          component: null,
          // canActivate: [HealthCheckGuard],
          data: {
            title: 'HMCTS Manage cases | Role and access | Specific access',
          }
        }
      ]
    }]
  },
  {
    path: 'add-exclusion',
    component: AddExclusionHomeComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Add Exclusion',
        }
      }
    ]
  },
  {
    path: 'delete-exclusion',
    component: DeleteExclusionComponent,
    canActivate: [HealthCheckGuard, CaseAllocatorGuard],
    data: {
      title: 'HMCTS Manage cases | Role and access | Delete exclusion',
    }
  },
  {
    path: 'allocate-role',
    component: null,
    children: [
      {
        path: 'allocate',
        component: AllocateRoleHomeComponent,
        canActivate: [HealthCheckGuard, CaseAllocatorGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Allocate a role',
        }
      },
      {
        path: 'reallocate',
        component: AllocateRoleHomeComponent,
        canActivate: [HealthCheckGuard, CaseAllocatorGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Reallocate a role',
        }
      },
      {
        path: 'remove',
        component: RemoveRoleComponent,
        canActivate: [HealthCheckGuard, CaseAllocatorGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Remove a role',
        }
      }
    ]
  },
];

export const roleAccessRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
