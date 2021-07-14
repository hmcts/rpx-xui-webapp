import { CASE_ALLOCATOR_ROLE } from "./constants";
import { RoleAssignment } from "./interfaces/roleAssignment";

export function isCurrentUserCaseAllocator(currentUserRoleAssignment: RoleAssignment): boolean {
  return !!currentUserRoleAssignment
   && !!currentUserRoleAssignment.authorisations && !!currentUserRoleAssignment.authorisations.includes(CASE_ALLOCATOR_ROLE);
}
