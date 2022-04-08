import { ActorType, Classification, GrantType, RequestType, RoleCategory, RoleType, Status } from './enums';
import { Attributes, Note } from './shared';

export interface RoleRequest {
  assignerId: string;
  process?: string;
  reference?: string;
  replaceExisting: boolean;
  id?: string;
  clientId?: string;
  authenticatedUserId?: string;
  correlationId?: string;
  requestType?: RequestType;
  roleAssignmentId?: string;
  status?: Status;
  created?: string;
  log?: string;
  byPassOrgDroolRule?: boolean;
}

export interface RequestedRole {
  actorIdType: ActorType;
  actorId: string;
  roleType: RoleType;
  roleName: string;
  classification: Classification;
  grantType: GrantType;
  roleCategory: RoleCategory;
  readOnly: boolean;
  beginTime: string;
  endTime: string;
  authorisations?: string[];
  attributes?: Attributes;
  notes?: Note[];
  status?: Status;
  log?: string;
  process?: string;
  reference?: string;
  statusSequence?: number;
}

export interface MainSectionRequest {
  roleRequest: RoleRequest;
  requestedRoles: RequestedRole[];
}
