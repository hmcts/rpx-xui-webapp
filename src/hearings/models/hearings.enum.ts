export enum Actions {
  CREATE,
  READ,
  UPDATE,
  DELETE,
}

export enum HMCStatus {
  HEARING_REQUESTD = 'Hearing requested',
  AWAITING_LISTING = 'Awaiting listing',
  LISTED = 'Listed',
  UPDATE_REQUESTED = 'Update requested',
  UPDATE_SUBMITTED = 'Update submitted',
  EXCEPTION = 'Exception',
  CANCELLATION_REQUESTED = 'Cancellation requested',
  VACATED = 'Vacated',
  AWAITING_ACTUALS = 'Awaiting Actuals',
  COMPLETED = 'Completed',
  ADJOURNED = 'Adjourned',
}

export enum HearingListingStatusEnum {
  AWAITING_LISTING = 'AWAITING LISTING',
  UPDATE_REQUESTED = 'UPDATE REQUESTED',
  UPDATE_SUBMITTED = 'UPDATE SUBMITTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  LISTED = 'LISTED',
  EXCEPTION = 'EXCEPTION',
  CANCELLATION_REQUESTED = 'CANCELLATION REQUESTED',
  VACATED = 'VACATED',
  AWAITING_ACTUALS = 'AWAITING ACTUALS',
  ADJOURNED = 'ADJOURNED',
}

export enum EXUISectionStatusEnum {
  UPCOMING = 'Upcoming',
  PAST_AND_CANCELLED = 'Past and cancelled',
}

export enum EXUIDisplayStatusEnum {
  AWAITING_LISTING = 'AWAITING LISTING',
  UPDATE_REQUESTED = 'UPDATE REQUESTED',
  UPDATE_SUBMITTED = 'UPDATE SUBMITTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  LISTED = 'LISTED',
  FAILURE = 'FAILURE',
  CANCELLATION_REQUESTED = 'CANCELLATION REQUESTED',
  VACATED = 'VACATED',
  AWAITING_ACTUALS = 'AWAITING ACTUALS',
  ADJOURNED = 'ADJOURNED',
}

export enum RequirementType {
  MUSTINC = 'MUSTINC',
  OPTINC = 'OPTINC',
  EXCLUDE = 'EXCLUDE',
}

export enum PartyType {
  IND = 'IND',
  ORG = 'ORG',
}

export enum RadioOptions {
  YES = 'Yes',
  NO = 'No',
  CHOOSE_DATE_RANGE = 'Choose a date range'
}

export enum DOW {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum DOWUnavailabilityType {
  AM = 'AM',
  PM = 'PM',
  ALL = 'ALL',
}

export enum HearingCategory {
  Priority = 'Priority',
  HearingType = 'HearingType',
  FacilitiesList = 'FacilitiesList',
  HearingChannels = 'HearingChannels',
  HearingSubChannels = 'HearingSubChannels',
  PanelMemberType = 'PanelMemberType',
  PanelMemberSpecialism = 'PanelMemberSpecialism',
  CancellationReasonCodes = 'CancellationReasonCodes',
  NonStdDurationReasonCodes = 'NonStdDurationReasonCodes',
  EntityRoleCodes = 'EntityRoleCodes',
  JudgeType = 'JudgeType',
}

export enum HearingDateEnum {
  DisplayMonth = 'DD MMMM YYYY',
  DefaultFormat = 'DD-MM-YYYY'
}

export enum HearingStageEnum {
  SelectHearingStageError = 'Select a hearing stage',
}

export enum HearingJudgeSelectionEnum {
  ValidNameError = 'Please enter a valid Name',
  SelectOneJudgeError = 'Please select at least one judge type',
  SelectionError = 'Please select that applies',
  ExcludeJudge = 'Exclude judge before continue',
  ExcludeFullNameJudge = 'Enter a full name to exclude a judge, or delete the name to stop the judge being excluded.'
}

export enum HearingDatePriorityEnum {
  LengthError = 'Enter a valid hearing length',
  LengthMinutesError = 'The minutes entered must be a multiple of 5',
  TotalLengthError = 'Enter a valid length of hearing, it must be between 5 minutes and 6 hours',
  PriorityError = 'Select the priority level of the hearing',
  PriorityDateError = 'Select if the hearing needs to take place on a specific date',
  DateRangeError = 'Enter a valid date range for the hearing to take place on',
  WeekendError = 'Hearing date cannot be on the weekend',
  InValidHearingDateError = 'Enter a valid hearing date',
  DatePastError = 'The hearing dates cannot be in the past',
  EarliestHearingDateError = 'The earliest hearing date must be before the latest hearing date',
}

export enum HearingDatePriorityConstEnum {
  MinHours = 0,
  MaxHours = 6,
  TotalMinMinutes = 5,
  TotalMaxMinutes = 360,
  MinutesMuliplier = 5,
}

export enum ACTION {
  BACK = 'BACK',
  CONTINUE = 'CONTINUE',
  SUBMIT = 'SUBMIT',
  CANCEL = 'CANCEL',
}

export enum CONDITION_OPERATOR {
  INCLUDE = 'INCLUDE',
  NOT_INCLUDE = 'NOT INCLUDE',
}
