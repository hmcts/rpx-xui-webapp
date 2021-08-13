export interface CaseRole {
  name: string;
  role: RoleType;
  location: string;
  start: string;
  end: string;
  id: string;
  actions: Action[];
}

export interface Action {
  id: string;
  title: string;
}

export enum RoleType {
  LEAD_JUDGE = 'Lead Judge',
  HEARING_JUDGE = 'Hearing Judge',
  LEGAL_OPS = 'Legal Ops',
  CASE_MANAGER = 'Case Manager',
}
