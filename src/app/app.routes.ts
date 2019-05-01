import { Routes } from '@angular/router';


export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'create-cases',
        pathMatch: 'full',
    },
    {
        path: 'create-cases',
        loadChildren: './cases/cases-feature.module#CasesFeatureModule'
    },
    {
        path: '**',
        redirectTo: '/create-cases',
        pathMatch: 'full'
    }
];
