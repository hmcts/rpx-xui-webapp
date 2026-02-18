import { RoleCategory } from '@hmcts/rpx-xui-common-lib';

export interface Role {
  roleId: string;
  roleName: string;
  roleCategory?: RoleCategory;
}

export interface RolesByService {
  service: string;
  roles: Role[];
}
