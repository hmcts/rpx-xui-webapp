import { TypeOfRole } from '../../../src/role-access/models';

export interface CaseRole {
  name: string;
  role: TypeOfRole;
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
