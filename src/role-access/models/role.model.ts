import { RoleCategory } from './allocate-role.enum';

export interface Role {
  roleId: string;
  roleName: string;
  roleCategory?: RoleCategory;
}

export interface RolesByService {
  service: string;
  roles: Role[];
}
