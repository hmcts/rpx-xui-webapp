import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model';

export interface OrganisationModel {
  orgId: string;
  orgName: string;
  users: UserDetails[];
}
