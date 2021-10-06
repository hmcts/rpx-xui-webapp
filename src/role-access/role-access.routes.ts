import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseResolver } from '@hmcts/ccd-case-ui-toolkit';
import { CaseRolesResolverService } from '../app/resolvers/case-roles-resolver.service';
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
    canActivate: [HealthCheckGuard],
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
        resolve: { validRoles: RoleAllocationsResolver },
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Allocate a role',
        }
      },
      {
        path: 'reallocate',
        component: AllocateRoleHomeComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Role and access | Reallocate a role',
        }
      },
      {
        path: 'remove',
        component: RemoveRoleComponent,
        canActivate: [HealthCheckGuard],
        resolve: {
          roles: CaseRolesResolverService
        },
        data: {
          title: 'HMCTS Manage cases | Role and access | Remove a role',
        }
      }
    ]
  },
];

export const roleAccessRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
