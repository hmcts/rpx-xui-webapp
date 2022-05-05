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

export enum ListingStatus {
  DRAFT = 'Draft',
  PROVISIONAL = 'Provisional',
  FIXED = 'Fixed',
}

export enum LaCaseStatus {
  CASE_CREATED = 'Case Created',
  AWAITING_LISTING = 'Awaiting Listing',
  LISTED = 'Listed',
  PENDING_RELISTING = 'Pending Relisting',
  HEARING_COMPLETED = 'Hearing Completed',
  CASE_CLOSED = 'Case Closed',
  CANCELLED = 'Cancelled',
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
  HearingPriority = 'HearingPriority',
  HearingChannel = 'HearingChannel',
  HearingType = 'HearingType',
  AdditionalFacilities = 'AdditionalFacilities',
  PanelMemberType = 'PanelMemberType',
  PanelMemberSpecialism = 'PanelMemberSpecialism',
  NonStdDurationReasonCodes = 'NonStdDurationReasonCodes',
  JudgeType = 'JudgeType',
  CancelHearingReason = 'CancellationReason',
  EntityRoleCode = 'EntityRoleCode',
  AdjournHearingActualReason = 'AdjournHearingActualReason',
  CancelHearingActualReason = 'CancelHearingActualReason',
  HearingChangeReason = 'HearingChangeReason',
  LinkedHearings = 'LinkedHearings',
}

export enum HearingDateEnum {
  DisplayTime = 'HH:MM',
  DisplayMonth = 'DD MMMM YYYY',
  DefaultFormat = 'DD-MM-YYYY',
  RequestFailedDateAndTime = 'DD MMMM YYYY HH:MM:SS',
  InvalidDate = 'Invalid date'
}

export enum HearingStageEnum {
  SelectHearingStageError = 'Select a hearing stage',
}

export enum HearingPanelSelectionEnum {
  SelectionError = 'Enter panel members or roles',
  PanelRowChildError = 'Select a specialism for the panel member(s).'
}

export enum HearingInstructionsEnum {
  InstructionLength = 2000
}

export enum HearingFacilitiesEnum {
  additionSecurityError = 'Select an option for additional security.',
}

export enum HearingJudgeSelectionEnum {
  ValidNameError = 'Enter a valid name',
  SelectOneJudgeError = 'Select at least one judge type',
  SelectionError = 'Select the option that applies',
  ExcludeJudge = 'Exclude judge before continue',
  ExcludeFullNameJudge = 'Enter a full name for a specific judge, or delete the name to stop the judge being included'
}

export enum HearingLinkedSelectionEnum {
  ValidSelectionError = 'You need to select atleast one hearing',
  HearingSelection = 'Which hearings should be linked to this hearing?',
  NoHearingSelection = 'There are no hearings available to link to',
  NoLinkedCases = 'No linked Cases',
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
  WeekDayError = 'Date range must include a weekday',
  EarliestHearingDateError = 'The earliest hearing date must be before the latest hearing date',
}

export enum HearingStageResultEnum {
  HearingResultError = 'Select a hearing result',
  HearingResultReasonError = 'Select a reason for the hearing result'
}

export enum HearingErrorMessage {
  ENTER_A_VALID_LOCATION = 'Enter a valid location',
  ENTER_A_LOCATION = 'Enter a location',
}

export enum HearingDatePriorityConstEnum {
  MinHours = 0,
  MaxHours = 6,
  TotalMinMinutes = 5,
  TotalMaxMinutes = 55,
  TotalMinutes = 360,
  MinutesMuliplier = 5,
}

export enum HearingSummaryEnum {
 BackendError = 'There was a system error and your request could not be processed. Please try again.',
 RequestFailedError = 'Something went wrong and your request could not be processed. Contact your service desk quoting all the error details on this screen.'
}

export enum ACTION {
  BACK = 'BACK',
  CONTINUE = 'CONTINUE',
  SUBMIT = 'SUBMIT',
  CANCEL = 'CANCEL',
  VIEW_EDIT_REASON = 'VIEW EDIT REASON',
  VIEW_EDIT_SUBMIT = 'VIEW EDIT SUBMIT'
}

export enum ConditionOperator {
  INCLUDE = 'INCLUDE',
  NOT_INCLUDE = 'NOT INCLUDE',
}

export enum CaseFlagType {
  PARTY_FLAGS = 'Party',
  CASE_FLAG = 'Case',
  REASONABLE_ADJUSTMENT = 'Reasonable adjustment',
  NON_REASONABLE_ADJUSTMENT = 'Non reasonable adjustment',
}

export enum CancelHearingMessages {
  NOT_SELECTED_A_REASON = 'You have not selected a reason for cancelling the hearing',
  SELECT_AT_LEAST_ONE_REASON = 'Select at least one valid reason',
}

export enum HearingChangeReasonMessages {
  NOT_SELECTED_A_REASON = 'You have not selected a reason for changing the hearing',
  SELECT_AT_LEAST_ONE_REASON = 'Select at least one valid reason',
}

export enum HearingLinkMessages {
  SELECT_HEARING_LINK_OPTION = 'Please make a selection'
}

export enum AnswerSource {
  CASE_NAME,
  CASE_NUMBER,
  Type,
  TYPE_FROM_REQUEST,
  STATUS,
  ERROR_TIME_STAMP,
  DATE_REQUEST_SUBMITTED,
  DATE_RESPONSE_SUBMITTED_TIME,
  DATE_RESPONSE_SUBMITTED,
  DATE_RESPONSE_RECEIVED,
  CASE_FLAGS,
  ROOM_ID,
  ADDITIONAL_SECURITY_REQUIRED,
  ADDITIONAL_FACILITIES_REQUIRED,
  STAGE,
  HEARING_RESPONSE_STATUS,
  HOW_ATTENDANT,
  PARTICIPANT_ATTENDENCE,
  ATTENDANT_PERSON_AMOUNT,
  VENUE,
  COURT_LOCATION,
  NEED_WELSH,
  NEED_JUDGE,
  JUDGE_NAME,
  JUDICIAL_MEMBERS,
  JUDGE_TYPES,
  JUDGE_EXCLUSION,
  HEARING_PANEL,
  PANEL_INCLUSION,
  PANEL_EXCLUSION,
  PANEL_ROLES,
  HEARING_LENGTH,
  HEARING_RESPONSE_LENGTH,
  HEARING_SPECIFIC_DATE,
  HEARING_PRIORITY,
  ADDITIONAL_INSTRUCTION,
  REASON_FOR_CANCELLATION,
  LINKED_HEARINGS
}

export enum IsHiddenSource {
  WELSH_LOCATION,
  JUDGE_EXCLUSION,
  PANEL_INCLUSION,
  PANEL_EXCLUSION,
  PANEL_ROLES,
  JUDGE_TYPES,
  JUDGE_NAME,
  LISTED,
  NOT_LISTED
}

export enum Mode {
  CREATE = 'create',
  CREATE_EDIT = 'create-edit',
  VIEW = 'view',
  VIEW_EDIT = 'view-edit'
}

export enum ControlTypeEnum {
  TEXT_BOX,
  SELECT,
  RADIO_BUTTON,
  CHECK_BOX,
  TEXT_AREA
}

export enum HearingResult {
  COMPLETED = 'COMPLETED',
  ADJOURNED = 'ADJOURNED',
  CANCELLED = 'CANCELLED',
}

export enum HearingActualAddEditSummaryEnum {
  HearingResultError = 'Enter a hearing result'
}

export enum HearingTemplate {
  LISTING_INFORMATION = 'Listing information summary',
  PARTIES_TEMPLATE = 'Parties Template'
}

export enum GroupLinkType {
  ORDERED = 'Ordered',
  SAME_SLOT = 'Same Slot',
}

export enum HearingActualsTimingErrorMessages {
  VALID_TIME = 'Enter a valid time.',
  START_TIME_BEFORE_FINISH_TIME = 'Start time must be before finish time',
  PAUSE_TIME_BEFORE_RESUME_TIME = 'Pause time must be before resume time',
  PAUSE_TIME_BETWEEN_START_TIME_AND_FINISH_TIMES = 'Pause time must be between the hearing start and finish times',
  RESUME_TIME_BETWEEN_START_TIME_AND_FINISH_TIMES = 'Resume time must be between the hearing start and finish times',
}

export enum PartyRoleOnly {
  Appellant = 'appellant',
  Claimant = 'claimant',
}
