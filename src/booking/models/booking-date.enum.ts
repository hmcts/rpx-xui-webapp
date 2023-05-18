export enum BookingDateOption {
  TODAY = 'Today only (ends at midnight)',
  WEEK = 'This week (ends on Sunday at midnight)',
  DATERANGE = 'Select a date range',
  BOOKINGSTART = 'Booking start',
  BOOKINGEND = 'Booking ends'
}

export enum BookingDatePageText {
  TITLE = 'Book your time at the location',
  CAPTION = 'Work access',
}

export enum BookingDateFormErrorMessage {
  BOOKING_START_DATE_FAILED = 'Enter a valid booking start date',
  BOOKING_END_DATE_FAILED = 'Enter a valid booking end date',
  BOOKING_START_DATE_EMPTY_CHECK_FAILED = 'Enter a booking start date ',
  BOOKING_END_DATE_EMPTY_CHECK_FAILED = 'Enter a booking end date',
  BOOKING_DATE_COMPARISON_FAILED = 'The booking end date cannot be earlier than the booking start date',
  BOOKING_DATE_INPUT_CHECK_FAILED = 'Please Enter Valid Date',
  PAST_DATE_CHECK_FAILED = 'The booking start date cannot be in the past',
  BOOKING_START_DATE_EMPTY_CHECK = 'booking-start-date-empty-check',
  BOOKING_END_DATE_EMPTY_CHECK = 'booking-end-date-empty-check',
  BOOKING_BOTH_DATE_EMPTY_CHECK = 'booking-both-date-empty-check',
  BOOKING_START_DATE_CHECK = 'booking-start-date-check',
  BOOKING_END_DATE_CHECK = 'booking-end-date-check',
  BOOKING_BOTH_DATE_CHECK = 'booking-both-date-check',
  DATE_COMPARISON = 'date-comparison',
  NO_SELECTION = 'Select an option to book your time at the location',
  PAST_DATE_CHECK= 'past-date-check'
}

export enum DateFormControl {
  BOOKING_DATE_TYPE = 'dateOption',
  BOOKING_START_DAY = 'startDate_day',
  BOOKING_START_MONTH = 'startDate_month',
  BOOKING_START_YEAR = 'startDate_year',
  BOOKING_END_DAY = 'endDate_day',
  BOOKING_END_MONTH = 'endDate_month',
  BOOKING_END_YEAR = 'endDate_year'
}

