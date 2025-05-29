export enum TypeOfRole {
  LeadJudge = 'Lead judge',
  HearingJudge = 'Hearing judge',
  CaseManager = 'Case manager',
}

export enum AllocateTo {
  ALLOCATE_TO_ME = 'Allocate to me',
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

export interface SpecificRole {
  id: string;
  name: string;
}
