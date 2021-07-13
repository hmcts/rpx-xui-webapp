import { CASE_ALLOCATOR_ROLE } from "./constants";

export function isCurrentUserCaseAllocator(currentUserRoleAssignment: any): boolean {
  return !!currentUserRoleAssignment
   && !!currentUserRoleAssignment.authorisations && !!currentUserRoleAssignment.authorisations.includes(CASE_ALLOCATOR_ROLE);
}
