// routes
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { editorRouting } from '@hmcts/ccd-case-ui-toolkit';
import { CaseListComponent } from './containers/case-list/case-list.component';
import { CaseFilterComponent } from './containers/case-filter/case-filter.component';
import { CaseCreateComponent } from './containers';
import { CaseSearchComponent } from './containers/case-search/case-search.component';

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
      component: CaseCreateComponent,
      children: editorRouting
    },
    {
      path: 'case-search',
      component: CaseSearchComponent,
      children: editorRouting
    }

];

export const casesRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
