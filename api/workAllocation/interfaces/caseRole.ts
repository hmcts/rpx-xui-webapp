import { RoleCategory } from '@hmcts/rpx-xui-common-lib';

export interface CaseRole {
  name: string;
  roleName: string;
  roleId?: string;
  roleCategory: RoleCategory;
  location: string;
  start: string;
  end: string;
  id: string;
  actorId: string;
  actions?: Action[];
  email: string;
}

export interface Action {
  id: string;
  title: string;
}
