import { RoleCategory } from './allocate-role.enum';

export interface Role {
  roleId: string;
  roleName: string;
  roleCategory?: RoleCategory;
}
