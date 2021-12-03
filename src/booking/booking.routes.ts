import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingHomeComponent, BookingWrapperComponent } from './containers';

export const ROUTES: Routes = [
  {
    path: '',
    component: BookingWrapperComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: BookingHomeComponent,
        canActivate: [],
        data: {
          title: 'Booking'
        }
      }
    ]
  }
];

export const bookingRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
