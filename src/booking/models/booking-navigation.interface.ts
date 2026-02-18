import { BookingNavigationEvent } from './booking-navigation-event.enum';

export interface BookingNavigation {
  event: BookingNavigationEvent;
  timestamp: number;
}
