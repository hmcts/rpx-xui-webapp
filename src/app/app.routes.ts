import { Routes } from '@angular/router';


export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'create-cases',
        pathMatch: 'full',
    },
    {
        path: 'create-cases',
        loadChildren: '../cases/cases.module#CasesModule'
    },
    {
        path: '**',
        redirectTo: '/create-cases',
        pathMatch: 'full'
    }
];
