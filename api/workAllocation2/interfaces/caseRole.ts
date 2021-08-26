import { RoleCategory, TypeOfRole } from '../../roleAccess/models/allocate-role.enum';

export interface CaseRole {
  name: string;
  roleName: TypeOfRole;
  roleCategory: RoleCategory;
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
