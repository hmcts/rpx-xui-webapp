import { UserDetails } from './user-details.model';

export interface SharedCase {
  caseId: string;
  caseTitle: string;
  caseTypeId?: string;
  roles?: string[];
  sharedWith?: UserDetails[];
  pendingShares?: UserDetails[];
  pendingUnshares?: UserDetails[];
}
