import { BookingState } from '../models';

export const bookingBackButtonVisibilityStates = [
  BookingState.LOCATION, BookingState.BOOKDATE, BookingState.CHECK
];

export const bookingHomeVisibilityStates = [BookingState.HOME];
export const bookingLocationVisibilityStates = [BookingState.LOCATION];
export const bookingDateVisibilityStates = [BookingState.BOOKDATE];
export const bookingCheckVisibilityStates = [BookingState.CHECK];
