import { BookingCheckComponent } from './booking-check/booking-check.component';
import { BookingDateComponent } from './booking-date/booking-date.component';
import { BookingErrorComponent } from './booking-error/booking-error.component';
import { BookingHomeComponent } from './booking-home/booking-home.component';
import { BookingLocationComponent } from './booking-location/booking-location.component';
import { BookingWrapperComponent } from './booking-wrapper/booking-wrapper.component';

export const containers: any[] = [
  BookingCheckComponent,
  BookingDateComponent,
  BookingHomeComponent,
  BookingLocationComponent,
  BookingWrapperComponent,
  BookingErrorComponent
];

export * from './booking-check/booking-check.component';
export * from './booking-date/booking-date.component';
export * from './booking-home/booking-home.component';
export * from './booking-location/booking-location.component';
export * from './booking-wrapper/booking-wrapper.component';
export * from './booking-error/booking-error.component';
