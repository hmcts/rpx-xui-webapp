import { EnhancedRequest } from '../lib/models';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { isCurrentUserCaseAllocator } from '../user/utils';

export function checkIfCaseAllocator(jurisdiction: string, caseLocationId: string, req: EnhancedRequest): boolean {
  const roleAssignments = req.session.roleAssignmentResponse as RoleAssignment[];
  let isCaseAllocator = false;
  if (roleAssignments) {
    const roleAssignment = roleAssignments.find(role => isCurrentUserCaseAllocator(role, jurisdiction, caseLocationId));
    isCaseAllocator = !!roleAssignment;
  }
  return isCaseAllocator;
}
