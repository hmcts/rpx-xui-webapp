export enum TypeOfRole {
  LEAD_JUDGE = 'Lead judge',
  HEARING_JUDGE = 'Hearing judge',
  CASE_MANAGER = 'Case manager',
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

export interface Period {
  startDate: Date;
  endDate?: Date;
}
