import { UserDetails } from '@hmcts/rpx-xui-common-lib';

export interface OrganisationModel {
  orgId: string;
  orgName: string;
  users: UserDetails[];
}
