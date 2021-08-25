import { TypeOfRole } from './allocate-role.enum';

export interface CaseRole {
  email: string;
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

export enum RemoveAllocationNavigationEvent {
  BACK,
  CANCEL,
  CONTINUE,
  REMOVE_ROLE_ALLOCATION
}
