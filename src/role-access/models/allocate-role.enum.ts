export enum TypeOfRole {
  LEAD_JUDGE = 'Lead Judge',
  HEARING_JUDGE = 'Hearing Judge',
  CASE_MANAGER = 'Case Manager',
}

export enum AllocateTo {
  RESERVE_TO_ME = 'Reserve to me',
  ALLOCATE_TO_ANOTHER_PERSON = 'Allocate to another person',
}

export enum DurationOfRole {
  SEVEN_DAYS = '7 days',
  INDEFINITE = 'Indefinite',
  ANOTHER_PERIOD = 'Another period',
}

export interface AnotherPeriod {
  startDate;
  endDate;
}
