export interface UserInfo {
  id: string;
  forename: string;
  surname: string;
  email: string;
  active: boolean;
  roles: string[];
  uid?: string;
}

export interface LocationInfo {
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
  locationInfo?: LocationInfo[];
}

export enum UserRole {
  LegalOps = 'Legal Ops',
  Judicial = 'Judicial'
}

export enum UserRole {
  LegalOps = 'Legal Ops',
  Judicial = 'Judicial'
}
