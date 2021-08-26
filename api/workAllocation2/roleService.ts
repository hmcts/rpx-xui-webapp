import { AxiosInstance } from 'axios';
import { HttpMock } from '../common/httpMock';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { isCurrentUserCaseAllocator } from '../user/utils';

export function refineRoleAssignments(rawPayload: any): any {
  const rawRoleAssignments: [] = rawPayload.roleAssignmentResponse;
  return rawRoleAssignments.map(rawAssignment => toRefinedRoleAssignments(rawAssignment));
}

export function toRefinedRoleAssignments(rawRoleAssignment: any): any {
  return {
    actions: [
      {'id': 'reallocate', 'title': 'Reallocate'},
      {'id': 'remove', 'title': 'Remove Allocation'},
    ],
    actorId: rawRoleAssignment.actorId,
    email: 'Kuda.Nyamainashe@mail.com',
    end: rawRoleAssignment.endTime,
    id: rawRoleAssignment.id,
    location: rawRoleAssignment.attributes.primaryLocation,
    name: rawRoleAssignment.id,
    roleCategory: rawRoleAssignment.roleCategory,
    roleName: rawRoleAssignment.roleName,
    start: rawRoleAssignment.beginTime,
  };
}

export function handleShowAllocatorLinkByCaseId(jurisdiction: string, caseLocationId: string, req: EnhancedRequest): boolean {
  const roleAssignments = req.session.roleAssignmentResponse as RoleAssignment[];
  let isCaseAllocator = false;
  if (roleAssignments) {
    const roleAssignment = roleAssignments.find(role => isCurrentUserCaseAllocator(role, jurisdiction, caseLocationId));
    isCaseAllocator = !!roleAssignment;
  }
  return isCaseAllocator;
}
