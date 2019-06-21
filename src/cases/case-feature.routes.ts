// routes
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CaseListComponent } from './containers/case-list/case-list.component';
import { CaseFilterComponent } from './containers/case-filter/case-filter.component';

import { CaseSearchComponent } from './containers/case-search/case-search.component';
import {CasesCreateComponent} from './containers';
import {editorRouting} from '@hmcts/ccd-case-ui-toolkit';
import {CaseDetailsComponent} from './containers/case-details/case-details.component';


export const ROUTES: Routes = [
    {
      path: '',
      component: CaseListComponent,
    },
    {
      path: 'case-filter',
      component: CaseFilterComponent,
    },
    {
      path: 'case-create',
      component: CasesCreateComponent,
      children: editorRouting
    },
    {
      path: 'case-search',
      component: CaseSearchComponent,
      children: editorRouting
    },
    {
      path: 'case-details/:caseId',
      component: CaseDetailsComponent
    }

];

export const casesRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
