import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationResolver } from '../work-allocation/resolvers/location-resolver.service';
import { BookingHomeComponent, BookingWrapperComponent } from './containers';
import { BookingGuard } from './guards/booking-guard';

export const ROUTES: Routes = [
  {
    path: '',
    component: BookingWrapperComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: BookingHomeComponent,
        canActivate: [BookingGuard],
        resolve: {
          LocationResolver
        },
        data: {
          title: 'Booking'
        }
      }
    ]
  }
];

export const bookingRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
