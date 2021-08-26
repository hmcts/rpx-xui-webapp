import { UserRole } from '../../app/models';

export interface Role {
  roleId: string;
  roleName: string;
  roleType?: UserRole;
}
