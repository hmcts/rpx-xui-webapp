import { UserDetails as ToolkitUserDetails, UserInfo as ToolkitUserInfo } from '@hmcts/ccd-case-ui-toolkit';

export { RoleAssignmentInfo } from '@hmcts/ccd-case-ui-toolkit';

export interface UserInfo extends ToolkitUserInfo {
  filterOwnerHash?: string;
}

export interface UserDetails extends ToolkitUserDetails {
  userInfo: UserInfo;
}

// This enum is used to refer to roles specifically, not role categories
export enum UserRole {
  Admin = 'admin',
  LegalOps = 'legalops',
  Judicial = 'judicial',
  Ogd = 'ogd',
  CTSC = 'ctsc',
  HearingManager = 'hearing-manager',
  HearingViewer = 'hearing-viewer',
  ListedHearingViewer = 'listed-hearing-viewer',
}
