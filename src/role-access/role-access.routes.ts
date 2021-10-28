import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard, RoleMatching } from '@hmcts/rpx-xui-common-lib';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { DeleteExclusionComponent, RemoveRoleComponent } from './containers';
import { AddExclusionHomeComponent } from './containers/add-exclusion';
import { AllocateRoleHomeComponent } from './containers/allocate-role';
import { RoleAllocationsResolver } from './resolvers/role-allocations.resolver';

export const ROUTES: Routes = [
  {
    path: 'add-exclusion',
    component: AddExclusionHomeComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [HealthCheckGuard, RoleGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Add Exclusion',
          roleMatching: RoleMatching.ANY,
          needsRole: ['case-allocator'],
          noRoleMatchRedirect: '/cases'
        }
      }
    ]
  },
  {
    path: 'delete-exclusion',
    component: DeleteExclusionComponent,
    canActivate: [HealthCheckGuard, RoleGuard],
    data: {
      title: 'HMCTS Manage cases | Role and access | Delete exclusion',
      roleMatching: RoleMatching.ANY,
      needsRole: ['case-allocator'],
      noRoleMatchRedirect: '/cases'
    }
  },
  {
    path: 'allocate-role',
    component: null,
    children: [
      {
        path: 'allocate',
        component: AllocateRoleHomeComponent,
        resolve: { validRoles: RoleAllocationsResolver },
        canActivate: [HealthCheckGuard, RoleGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Allocate a role',
          roleMatching: RoleMatching.ANY,
          needsRole: ['case-allocator'],
          noRoleMatchRedirect: '/cases'
        }
      },
      {
        path: 'reallocate',
        component: AllocateRoleHomeComponent,
        canActivate: [HealthCheckGuard, RoleGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Reallocate a role',
          roleMatching: RoleMatching.ANY,
          needsRole: ['case-allocator'],
          noRoleMatchRedirect: '/cases'
        }
      },
      {
        path: 'remove',
        component: RemoveRoleComponent,
        canActivate: [HealthCheckGuard, RoleGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Remove a role',
          roleMatching: RoleMatching.ANY,
          needsRole: ['case-allocator'],
          noRoleMatchRedirect: '/cases'
        }
      }
    ]
  },
];

export const roleAccessRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
