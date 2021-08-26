import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseRolesResolverService } from '../app/resolvers/case-roles-resolver.service';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { DeleteExclusionComponent, RemoveRoleComponent } from './containers';
import { AddExclusionHomeComponent } from './containers/add-exclusion';
import { AllocateRoleHomeComponent } from './containers/allocate-role';
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
  {
    path: 'remove/:cid/:roleId',
    component: RemoveRoleComponent,
    canActivate: [HealthCheckGuard],
    resolve: {
      roles: CaseRolesResolverService
    }
  }
];

export const roleAccessRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
