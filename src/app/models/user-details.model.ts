export interface UserInfo {
  id: string;
  forename: string;
  surname: string;
  email: string;
  active: boolean;
  roles: string[];
  uid?: string;
}

export interface UserDetails {
  sessionTimeout: {
    idleModalDisplayTime: number,
    totalIdleTime: number,
  };
  canShareCases: boolean;
  userInfo: UserInfo;
}

export enum UserRole {
  LegalOps = 'Legal Ops',
  Judicial = 'Judicial'
}
