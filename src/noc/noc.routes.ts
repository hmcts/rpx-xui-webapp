import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { NocHomeComponent } from './containers/noc-home/noc-home.component';


export const ROUTES: Routes = [
    {
      path: '',
      component: NocHomeComponent,
      children: [
        {
          path: '',
          component: null,
          canActivate: [ HealthCheckGuard ],
          data: {
            title: 'HMCTS Manage Cases | Case list'
          }
        }
      ]
    },


];

export const nocRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);

