import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { DeleteExclusionComponent } from './containers/delete-exclusion/delete-exclusion.component';
import { ExclusionHomeComponent } from './containers/exclusion/exclusion-home/exclusion-home.component';
import { RoleExclusionsResolver } from './resolvers/role-exclusions.resolver';

export const ROUTES: Routes = [
  {
    path: 'exclusion',
    component: ExclusionHomeComponent,
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
