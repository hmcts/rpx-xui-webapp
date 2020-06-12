import {UserDetails} from '../user-details/user-details.module';

export class SharedCase {
  caseTitle: string;
  caseId: string;
  roles?: string[];
  sharedWith?: UserDetails[];
  pendingShares?: UserDetails[];
  pendingUnshares?: UserDetails[];
}
