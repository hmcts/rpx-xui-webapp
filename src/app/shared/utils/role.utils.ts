export const SPECIFIC_ACCESS_APPROVER_ROLE_PREFIX = 'specific-access-approver-';

export function getUserRolesExcludingSpecificAccessApprover(userRoles: string[] = []): string[] {
  const roles = userRoles ?? [];
  return roles.filter((role) => !role.startsWith(SPECIFIC_ACCESS_APPROVER_ROLE_PREFIX));
}
