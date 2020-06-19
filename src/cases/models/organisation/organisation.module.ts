import { UserDetails } from '../user-details/user-details.module';

export interface OrganisationModule {
  orgId: string;
  orgName: string;
  users: UserDetails[];
}
