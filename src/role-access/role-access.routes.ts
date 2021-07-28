import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { AddExclusionHomeComponent } from './containers/add-exclusion/add-exclusion-home/add-exclusion-home.component';
import { DeleteExclusionComponent } from './containers/delete-exclusion/delete-exclusion.component';
import { ExclusionHomeComponent } from './containers/exclusion/exclusion-home/exclusion-home.component';
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
          title: 'HMCTS Manage cases | Role and access | Exclusion',
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
  }
];

export const roleAccessRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
