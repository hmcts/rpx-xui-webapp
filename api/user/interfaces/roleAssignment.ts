import { Location } from "workAllocation2/interfaces/task";

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
  primaryLocation?: Location;
  caseId?: string;
  jurisdiction?: string;
  region?: string;
  isCaseAllocator?: boolean;
}
