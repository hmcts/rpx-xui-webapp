export interface RoleAssignment {
  id: string;
  actorIdType?: string;
  actorId?: string;
  beginTime?: Date;
  endTime?: Date;
  roleType?: string;
  roleName?: string;
  classification?: string;
  grantType?: string;
  roleCategory?: string;
  readOnly?: boolean;
  created?: Date;
  attributes: LocationInfo;
  authorisations?: string[];
}

export interface LocationInfo {
  isNew?: boolean;
  primaryLocation?: string;
  caseId?: string;
  jurisdiction?: string;
  region?: string;
  isCaseAllocator?: boolean;
  caseType?: string;
  substantive?: string;
  notes?: Note;
  requestedRole?: string;
  roleType?: string;
}

export interface Note {
  userId?: string;
  time?: Date;
  comment?: string;
}

export interface LocationApi {
  location_id: string;
  location: string;
  is_primary: boolean;
  services: string[];
}
