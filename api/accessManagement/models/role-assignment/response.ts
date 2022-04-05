import { RequestedRole, RoleRequest } from './request';
export interface RoleAssignmentResponse {
  roleRequest: RoleRequest;
  requestedRoles: RequestedRole[];
}

export interface MainSectionResponse {
  links: {
    empty: boolean
  };
  roleAssignmentResponse: RoleAssignmentResponse;
}
