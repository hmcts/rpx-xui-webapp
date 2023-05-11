export interface RoleRequestPayload {
  roleRequest: RoleRequest;
  requestedRoles: RequestedRole[];
}

export interface RequestedRole {
  actorIdType: 'IDAM';
  actorId: string;
  roleType: RoleType;
  roleName: string;
  classification: RoleClassification;
  grantType: RoleGrantTypeCategory;
  roleCategory: RoleCategory;
  readOnly?: boolean;
  beginTime: Date;
  endTime: Date;
  authorisations?: string[];
  attributes: object;
  notes: RequestedRoleNote[];
}

export interface RoleRequest {
  assignerId: string;
  process: string;
  replaceExisting: boolean;
  reference: string;
}

export interface RequestedRoleNote {
  userId: string;
  time: Date;
  comment: string;
}

export type RoleCategory = 'JUDICIAL' | 'LEGAL_OPERATIONS' | 'ADMIN' | 'PROFESSIONAL' | 'CITIZEN';

export type RoleGrantTypeCategory = 'BASIC' | 'STANDARD' | 'SPECIFIC' | 'CHALLENGED' | 'EXCLUDED';

export type RoleClassification = 'PUBLIC' | 'PRIVATE' | 'RESTRICTED';

export type RoleType = 'ORGANISATION' | 'CASE';
