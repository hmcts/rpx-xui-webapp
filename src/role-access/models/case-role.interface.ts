import { SpecificRole } from '.';
import { RoleCategory } from './allocate-role.enum';

export interface CaseRole {
  name: string;
  roleCategory: RoleCategory;
  roleDefinition?: SpecificRole;
  roleName?: string;
  location: string;
  start: string;
  end: string;
  id: string;
  actorId: string;
  actions: Action[];
  email: string;
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
