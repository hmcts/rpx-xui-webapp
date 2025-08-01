import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { SpecificRole } from '.';

export interface CaseRole {
  name: string;
  roleCategory: RoleCategory;
  roleDefinition?: SpecificRole;
  roleName?: string;
  roleId?: string;
  location: string;
  start: string;
  end: string;
  id: string;
  actorId: string;
  actions?: Action[];
  email: string;
  created?: string;
  notes?: string;
  requestedRole?: string;
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
