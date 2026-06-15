export const defaultStaffAMMenuRole = 'hmcts-legal-operations';

export const staffAMMenuRoles = ['hmcts-admin', 'hmcts-ctsc', defaultStaffAMMenuRole] as const;

export const judicialAMMenuRole = 'hmcts-judiciary';

export const defaultAMSupportedJurisdictions = ['IA'];

export const defaultAMSupportedRoleCategories = ['LEGAL_OPERATIONS', 'ADMIN', 'CTSC', 'JUDICIAL'];

export const defaultAMSupportedRoleTypes = ['ORGANISATION'];

export type AMMenuRoleName = (typeof staffAMMenuRoles)[number] | typeof judicialAMMenuRole | string;

export type SupportedAMRoleAssignment = {
  isCaseAllocator: boolean;
  jurisdiction: string;
  roleCategory: string;
  roleName: AMMenuRoleName;
  roleType: string;
  substantive: string;
};

const roleCategoriesByRoleName: Record<string, string> = {
  'hmcts-admin': 'ADMIN',
  'hmcts-ctsc': 'CTSC',
  'hmcts-judiciary': 'JUDICIAL',
  'hmcts-legal-operations': 'LEGAL_OPERATIONS',
};

export function resolveAMRoleCategory(roleName: AMMenuRoleName): string {
  return roleCategoriesByRoleName[roleName] ?? 'LEGAL_OPERATIONS';
}

export function uniqueRoles(roles: string[]): string[] {
  return Array.from(new Set(roles));
}

export function buildSupportedAMRoleAssignments(
  roleNames: AMMenuRoleName[] = [defaultStaffAMMenuRole],
  jurisdictions: string[] = defaultAMSupportedJurisdictions
): SupportedAMRoleAssignment[] {
  return roleNames.flatMap((roleName) =>
    jurisdictions.map((jurisdiction) => ({
      isCaseAllocator: false,
      jurisdiction,
      roleCategory: resolveAMRoleCategory(roleName),
      roleName,
      roleType: 'ORGANISATION',
      substantive: 'Y',
    }))
  );
}

export function ensureSupportedAMRoleAssignment<T extends Record<string, unknown>>(
  roleAssignments: T[],
  roleName: AMMenuRoleName = defaultStaffAMMenuRole,
  fallbackJurisdictions: string[] = defaultAMSupportedJurisdictions
): T[] {
  if (roleAssignments.some((roleAssignment) => roleAssignment.roleName === roleName)) {
    return roleAssignments;
  }

  const existingIndex = roleAssignments.findIndex(
    (roleAssignment) => roleAssignment.roleType === 'ORGANISATION' && !roleAssignment.roleName
  );

  if (existingIndex === -1) {
    return [...roleAssignments, ...(buildSupportedAMRoleAssignments([roleName], fallbackJurisdictions) as unknown as T[])];
  }

  return roleAssignments.map((roleAssignment, index) => {
    if (index !== existingIndex) {
      return roleAssignment;
    }

    return {
      ...roleAssignment,
      roleCategory: roleAssignment.roleCategory ?? resolveAMRoleCategory(roleName),
      roleName: roleAssignment.roleName ?? roleName,
    };
  });
}
