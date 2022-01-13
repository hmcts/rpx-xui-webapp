import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingErrorComponent, BookingHomeComponent, BookingWrapperComponent } from './containers';
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
        // canActivate: [BookingGuard],
        data: {
          title: 'Booking'
        }
      }
    ]
  },
  {
    path: 'error',
    component: BookingErrorComponent,
    data: {
      title: 'Sorry, due to a system error we cannot process your booking.',
      description: 'Please log out and try again. If the problem continues, contact the help desk for support.',
    }
  },
  {
    path: 'role-mapping-error',
    component: BookingErrorComponent,
    data: {
      title: 'Sorry, due to a system error when your booking was created you cannot access cases.',
      description: 'Please log out and try again by selecting your booking. If the problem continues, contact the help desk for support.',
    }
  }
];

export const bookingRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
