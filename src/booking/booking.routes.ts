import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        // it will be activated in later stages
        // canActivate: [BookingGuard],
        data: {
          title: 'Booking'
        }
      }
    ]
  }
];

export const bookingRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
