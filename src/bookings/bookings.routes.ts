import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsHomeComponent } from './containers/bookings-home/bookings-home.component';

export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [ ],
    children: [
      {
        path: 'home',
        component: BookingsHomeComponent,
        canActivate: [ ]
      }
    ]
  }
];

export const bookingsRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
