export interface RoleAssignment {
  id: string;
  actorIdType?: string;
  actorId?: string;
  roleType?: string;
  roleName?: string;
  classification?: string;
  grantType?: string;
  roleCategory?: string;
  readOnly?: boolean;
  created?: string;
  attributes: LocationInfo
  authorisations?: string[]
}

export interface LocationInfo {
  primaryLocation?: LocationApi;
  caseId?: string;
  jurisdiction?: string;
  region?: string;
  isCaseAllocator?: boolean;
}

export interface LocationApi {
  location_id: string;
  location: string;
  is_primary: boolean;
  services: string[];
}
