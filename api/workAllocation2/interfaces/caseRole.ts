export enum TypeOfRole {
  LEAD_JUDGE = 'Lead judge',
  HEARING_JUDGE = 'Hearing judge',
  CASE_MANAGER = 'Case manager',
}

export interface CaseRole {
  name: string;
  role: TypeOfRole;
  location: string;
  start: string;
  end: string;
  id: string;
  actions: Action[];
  email: string;
}

export interface Action {
  id: string;
  title: string;
}
