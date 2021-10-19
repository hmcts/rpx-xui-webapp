export enum Actions {
  Create,
  Read,
  Update,
  Delete
}

export enum HearingsSectionStatusEnum {
  UPCOMING = 'Upcoming',
  PAST_AND_CANCELLED = 'Past_and_cancelled'
}

export enum HearingListingStatusEnum {
  WAITING_TO_BE_LISTED = 'WAITING_TO_BE_LISTED',
  UPDATE_REQUESTED = 'UPDATE_REQUESTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  LISTED = 'LISTED',
  EXCEPTION = 'EXCEPTION',
  CANCELLATION_REQUESTED = 'CANCELLATION_REQUESTED',
  VACATED = 'VACATED',
  AWAITING_ACTUALS = 'AWAITING_ACTUALS',
  ADJOURNED = 'ADJOURNED',
}

export enum HMCStatus {
  hearingRequestd = 'Hearing_Requested',
  awaitingListing = 'Awaiting_Listing',
  listed = 'Listed',
  updateRequested = 'Update_Requested',
  updateSubmitted = 'Update_Submitted',
  exception = 'Exception',
  cancellationRequested = 'Cancellation_Requested',
  vacated = 'Vacated',
  awaitingActuals = 'Awaiting_Actuals',
  completed = 'Completed',
  adjourned = 'Adjourned'
}
