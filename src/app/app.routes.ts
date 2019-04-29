import { Routes } from '@angular/router';


export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'create-case',
        pathMatch: 'full',
    },
    {
        path: 'create-case',
        loadChildren: './case/case-feature/case-feature.module#CaseFeatureModule'
    },
    {
        path: '**',
        redirectTo: '/create-case',
        pathMatch: 'full'
    }
];