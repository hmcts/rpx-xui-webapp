import { getUserRoleAssignments } from '../user';
import { EnhancedRequest } from '../lib/models';
import { isCurrentUserCaseAllocator } from '../user/utils';

export async function checkIfCaseAllocator(jurisdiction: string, caseLocationId: string, req: EnhancedRequest): Promise<boolean> {
  const userInfo = req.session.passport.user.userinfo;
  const roleAssignments = await getUserRoleAssignments(userInfo, req);

  const isCaseAllocator = roleAssignments.some((role) =>
    isCurrentUserCaseAllocator(role, jurisdiction, caseLocationId)
  );

  return isCaseAllocator;
}
