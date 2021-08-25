import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { DeleteExclusionComponent } from './containers';
import { AddExclusionHomeComponent } from './containers/add-exclusion';
import { AllocateRoleHomeComponent } from './containers/allocate-role';
import { RoleAllocationsResolver } from './resolvers/role-allocations.resolver';
import { RoleExclusionsResolver } from './resolvers/role-exclusions.resolver';

export const ROUTES: Routes = [
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
    path: 'delete-exclusion/:caseId',
    resolve: { roleExclusions: RoleExclusionsResolver },
    component: DeleteExclusionComponent,
    canActivate: [HealthCheckGuard],
    data: {
      title: 'HMCTS Manage cases | Role and access | Delete exclusion',
    }
  },
  {
    path: 'allocate-role',
    resolve: { validRoles: RoleAllocationsResolver },
    component: AllocateRoleHomeComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Allocate a role',
        }
      }
    ]
  },
];

export const roleAccessRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
