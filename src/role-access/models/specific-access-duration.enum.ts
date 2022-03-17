export enum SpecificAccessDurationOption {
  SEVEN_DAYS = '7 days',
  INDEFINITE = 'Indefinite',
  DATE_RANGE = 'Another period'
}

export enum SpecificAccessDurationPageText {
  TITLE = 'How long do you want to give access to this case for?',
  CAPTION = 'Approve specific access request',
}

export enum SpecificAccessDurationFormErrorMessage {
  START_DATE_FAILED = 'Enter a valid access start date',
  END_DATE_FAILED = 'Enter a valid access end date',
  START_DATE_EMPTY_CHECK_FAILED = 'Enter an access start date ',
  END_DATE_EMPTY_CHECK_FAILED = 'Enter an access end date',
  DATE_COMPARISON_FAILED = 'The access end date cannot be earlier than the access start date',
  DATE_INPUT_CHECK_FAILED = 'Please enter valid date',
  PAST_DATE_CHECK_FAILED = 'The access start date cannot be in the past',
  START_DATE_EMPTY_CHECK = 'access-start-date-empty-check',
  END_DATE_EMPTY_CHECK = 'access-end-date-empty-check',
  BOTH_DATE_EMPTY_CHECK = 'access-both-date-empty-check',
  START_DATE_CHECK = 'access-start-date-check',
  END_DATE_CHECK = 'access-end-date-check',
  BOTH_DATE_CHECK = 'access-both-date-check',
  DATE_COMPARISON = 'date-comparison',
  NO_SELECTION = 'Select an option to book your time at the location',
  PAST_DATE_CHECK = 'past-date-check'
}

export enum SpecificAccessDurationFormControl {
  DATE_TYPE = 'dateOption',
  START_DAY = 'startDate_day',
  START_MONTH = 'startDate_month',
  START_YEAR = 'startDate_year',
  END_DAY = 'endDate_day',
  END_MONTH = 'endDate_month',
  END_YEAR = 'endDate_year'
}
