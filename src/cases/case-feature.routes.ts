// routes
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { editorRouting } from '@hmcts/ccd-case-ui-toolkit';
import { CasesCreateComponent } from './containers/cases-create/cases-create.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CasesCreateComponent,
        // children: editorRouting
    },
];

export const casesRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
