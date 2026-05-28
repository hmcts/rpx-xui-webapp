import { RequestedRole } from './role-request.model';
import { RoleRequest } from './role-request.model';

export interface RoleAssignmentResponse {
  roleRequest: RoleRequest;
  requestedRoles: RequestedRole[];
}
