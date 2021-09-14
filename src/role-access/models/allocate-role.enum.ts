export enum TypeOfRole {
  LeadJudge = 'Lead judge',
  HearingJudge = 'Hearing judge',
  CaseManager = 'Case manager',
}

export enum RoleCategory {
  JUDICIAL = 'JUDICIAL',
  LEGAL_OPERATIONS = 'LEGAL_OPERATIONS',
  ADMIN = 'ADMIN',
}

export enum AllocateTo {
  RESERVE_TO_ME = 'Reserve to me',
  ALLOCATE_TO_ANOTHER_PERSON = 'Allocate to another person',
  REALLOCATE_TO_ANOTHER_PERSON = 'Reallocate to another person',
}

export enum DurationOfRole {
  SEVEN_DAYS = '7 days',
  INDEFINITE = 'Indefinite',
  ANOTHER_PERIOD = 'Another period',
}

export enum Actions {
  Allocate = 'allocate',
  Reallocate = 'reallocate',
  Remove = 'remove'
}

export interface Period {
  startDate: Date;
  endDate?: Date;
}
