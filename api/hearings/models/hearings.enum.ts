export enum Actions {
  CREATE,
  READ,
  UPDATE,
  DELETE,
}

export enum HMCStatus {
  HEARING_REQUESTED = 'HEARING_REQUESTED',
  AWAITING_LISTING = 'AWAITING_LISTING',
  LISTED = 'LISTED',
  UPDATE_REQUESTED = 'UPDATE_REQUESTED',
  UPDATE_SUBMITTED = 'UPDATE_SUBMITTED',
  EXCEPTION = 'EXCEPTION',
  CANCELLATION_REQUESTED = 'CANCELLATION_REQUESTED',
  VACATED = 'VACATED',
  AWAITING_ACTUALS = 'AWAITING_ACTUALS',
  COMPLETED = 'COMPLETED',
  ADJOURNED = 'ADJOURNED',
}

export enum LaCaseStatus {
  CASE_CREATED = 'Case Created',
  AWAITING_LISTING = 'Awaiting Listing',
  LISTED = 'Listed',
  PENDING_RELISTING = 'Pending Relisting',
  HEARING_COMPLETED = 'Hearing Completed',
  CASE_CLOSED = 'Case Closed',
  CANCELLED = 'Cancelled',
  EXCEPTION = 'Request failure',
}

export enum ListingStatus {
  DRAFT = 'Draft',
  PROVISIONAL = 'Provisional',
  FIXED = 'Fixed',
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
  UPCOMING = 'Current and upcoming',
  PAST_AND_CANCELLED = 'Past and cancelled',
}

export enum EXUIDisplayStatusEnum {
  AWAITING_LISTING = 'WAITING TO BE LISTED',
  UPDATE_REQUESTED = 'UPDATE REQUESTED',
  UPDATE_SUBMITTED = 'UPDATE SUBMITTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  LISTED = 'LISTED',
  FAILURE = 'REQUEST FAILURE',
  CANCELLATION_REQUESTED = 'CANCELLATION REQUESTED',
  VACATED = 'VACATED',
  AWAITING_ACTUALS = 'AWAITING HEARING DETAILS',
  ADJOURNED = 'ADJOURNED',
}

export enum HMCLocationType {
  COURT = 'court',
  CLUSTER = 'cluster',
  REGION = 'region',
}

export enum UnavailabilityType {
  AM = 'AM',
  PM = 'PM',
  ALL_DAY = 'All Day',
}

export enum RequirementType {
  MUSTINC = 'MUSTINC',
  OPTINC = 'OPTINC',
  EXCLUDE = 'EXCLUDE',
}

export enum CategoryType {
  CaseType = 'caseType',
  CaseSubType = 'caseSubType',
}

export enum MemberType {
  JUDGE = 'JUDGE',
  PANEL_MEMBER = 'PANEL_MEMBER',
}

export enum PartyType {
  IND = 'IND',
  ORG = 'ORG',
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

export enum HearingResult {
  COMPLETED = 'COMPLETED',
  ADJOURNED = 'ADJOURNED',
  CANCELLED = 'CANCELLED',
}

export enum GroupLinkType {
  ORDERED = 'Ordered',
  SAME_SLOT = 'Same Slot',
}
