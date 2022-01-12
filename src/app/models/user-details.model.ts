export interface UserInfo {
  id: string;
  forename: string;
  surname: string;
  email: string;
  active: boolean;
  roles: string[];
  uid?: string;
  roleCategory?: string;
}

export interface RoleAssignmentInfo {
  primaryLocation: string;
  jurisdiction: string;
  isCaseAllocator: boolean;
}

export interface UserDetails {
  sessionTimeout: {
    idleModalDisplayTime: number,
    totalIdleTime: number,
  };
  canShareCases: boolean;
  userInfo: UserInfo;
  roleAssignmentInfo?: RoleAssignmentInfo[];
}

export enum UserRole {
  Admin = 'admin',
  LegalOps = 'legalops',
  Judicial = 'judicial',
}
