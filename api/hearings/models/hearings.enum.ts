export enum Actions {
  Create,
  Read,
  Update,
  Delete
}

export enum HearingsSectionStatusEnum {
  UPCOMING = 'Upcoming',
  PAST_AND_CANCELLED = 'Past and cancelled'
}

export enum HearingListingStatusEnum {
  WAITING_TO_BE_LISTED = 'WAITING TO BE LISTED',
  UPDATE_REQUESTED = 'UPDATE REQUESTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  LISTED = 'LISTED',
  EXCEPTION = 'EXCEPTION',
  CANCELLATION_REQUESTED = 'CANCELLATION_REQUESTED',
  VACATED = 'VACATED',
  AWAITING_ACTUALS = 'AWAITING ACTUALS',
  ADJOURNED = 'ADJOURNED',
}

export enum HMCStatus {
  hearingRequestd = 'Hearing requested',
  awaitingListing = 'Awaiting listing',
  listed = 'Listed',
  updateRequested = 'Update requested',
  updateSubmitted = 'Update submitted',
  exception = 'Exception',
  cancellationRequested = 'Cancellation requested',
  vacated = 'Vacated',
  awaitingActuals = 'Awaiting Actuals',
  completed = 'Completed',
  adjourned = 'Adjourned'
}
