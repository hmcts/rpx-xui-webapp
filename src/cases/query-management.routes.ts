import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseResolver } from '@hmcts/ccd-case-ui-toolkit';
import { QueryManagementContainerComponent } from './containers';

export const ROUTES: Routes = [
  {
    path: 'query/:cid',
    component: QueryManagementContainerComponent,
    resolve: { case: CaseResolver },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        pathMatch: 'full'
      },
      {
        path: ':qid',
        component: QueryManagementContainerComponent
      }
    ]
  }
]

export const queryManagementRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(ROUTES);
