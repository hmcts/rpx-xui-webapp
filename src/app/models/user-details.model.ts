export { UserInfo, UserDetails, RoleAssignmentInfo } from '@hmcts/ccd-case-ui-toolkit';

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
