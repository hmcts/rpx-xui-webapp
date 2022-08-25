import { EnhancedRequest } from '../lib/models';
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

export function checkIfCaseAllocator(jurisdiction: string, caseLocationId: string, req: EnhancedRequest): boolean {
  const roleAssignments = req.session.roleAssignmentResponse as RoleAssignment[];
  let isCaseAllocator = false;
  if (roleAssignments) {
    const roleAssignment = roleAssignments.find(role => isCurrentUserCaseAllocator(role, jurisdiction, caseLocationId));
    isCaseAllocator = !!roleAssignment;
  }
  return isCaseAllocator;
}
