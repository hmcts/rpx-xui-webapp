import { getUserRoleAssignments } from '../user';
import { EnhancedRequest } from '../lib/models';
import { isCurrentUserCaseAllocator } from '../user/utils';
import { RoleAssignment } from 'user/interfaces/roleAssignment';

export function checkIfCaseAllocator(jurisdiction: string, caseLocationId: string, req: EnhancedRequest): boolean {
  const userInfo = req.session.passport.user.userinfo;
  let roleAssignments: RoleAssignment[];
  getUserRoleAssignments(userInfo, req).then((assignments) => {
    roleAssignments = assignments;
  });
  // const roleAssignments = req.session.roleAssignmentResponse as RoleAssignment[];
  let isCaseAllocator = false;
  if (roleAssignments) {
    const roleAssignment = roleAssignments.find((role) => isCurrentUserCaseAllocator(role, jurisdiction, caseLocationId));
    isCaseAllocator = !!roleAssignment;
  }
  return isCaseAllocator;
}
