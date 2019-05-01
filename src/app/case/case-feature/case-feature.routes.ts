// routes
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { editorRouting } from '@hmcts/ccd-case-ui-toolkit';
import { CreateCaseComponent } from './container/create-case/create-case.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CreateCaseComponent,
        children: editorRouting
    },
];

export const caseFeatureRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
