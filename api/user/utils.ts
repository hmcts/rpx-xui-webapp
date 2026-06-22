import { UserInfo } from '../auth/interfaces/UserInfo';
import { allContainOnlySafeCharacters, containsDangerousCode } from '../utils';
import { CASE_ALLOCATOR_ROLE, ORGANISATION_ROLE_TYPE } from './constants';
import { RoleAssignment, RoleCategoryRule } from './interfaces/roleAssignment';

export const JUDGE_ROLE = 'judge';
export const JUDGE_ROLE_CATEGORY = 'JUDICIAL';
export const JUDGE_ROLE_NAME = 'judicial';
export const JUDICIARY_ROLE_NAME = 'judiciary';
export const ADMIN_ROLE = 'admin';
export const ADMIN_ROLE_CATEGORY = 'ADMIN';
export const ADMIN_ROLE_NAME = 'admin';
export const PROFESSIONAL_ROLE = 'solicitor';
export const PUI_CASE_MANAGER = 'pui-case-manager';
export const PUI_ORG_MANAGER = 'pui-organisation-manager';
export const PROFESSIONAL_ROLE_CATEGORY = 'PROFESSIONAL';
export const PROFESSIONAL_ROLE_NAME = 'professional';
export const LEGAL_OPERATIONS_ROLE = 'caseworker';
export const LEGAL_OPERATIONS_ROLE_CATEGORY = 'LEGAL_OPERATIONS';
export const LEGAL_OPERATIONS_ROLE_NAME = 'legal-operations';
export const TASK_SUPERVISOR = 'task-supervisor';
export const CITIZEN_ROLE = 'citizen';
export const CITIZEN_ROLE_CATEGORY = 'CITIZEN';
export const CITIZEN_ROLE_NAME = 'citizen';
export const CTSC_ROLE = 'ctsc';
export const CTSC_ROLE_CATEGORY = 'CTSC';
export const CTSC_ROLE_NAME = 'ctsc';
export const OTHER_GOV_DEPARTMENT_ROLE = 'other_gov_department';
export const OTHER_GOV_DEPARTMENT_ROLE_CATEGORY = 'OTHER_GOV_DEPARTMENT';
export const SSCS_DWP_RESPONSE_WRITER = 'caseworker-sscs-dwpresponsewriter';
export const SSCS_HMRC_RESPONSE_WRITER = 'caseworker-sscs-hmrcresponsewriter';
export const SSCS_IBCA_RESPONSE_WRITER = 'caseworker-sscs-ibcaresponsewriter';

// EXUI-4758 - Actually use RoleCateogry instead of non-capitalized name
const roleCategoryRules: RoleCategoryRule[] = [
  { matches: (roles) => hasRoleCategory(roles, CITIZEN_ROLE), result: CITIZEN_ROLE_CATEGORY },
  {
    matches: (roles) => includesRoleCategory(roles, JUDGE_ROLE) || includesRoleCategory(roles, JUDICIARY_ROLE_NAME),
    result: JUDGE_ROLE_CATEGORY,
  },
  { matches: (roles) => includesRoleCategory(roles, ADMIN_ROLE), result: ADMIN_ROLE_CATEGORY },
  { matches: (roles) => includesRoleCategory(roles, CTSC_ROLE_NAME), result: CTSC_ROLE_CATEGORY },
  {
    matches: (roles) =>
      hasRoleCategory(roles, LEGAL_OPERATIONS_ROLE_NAME) ||
      hasRoleCategory(roles, TASK_SUPERVISOR) ||
      hasRoleCategory(roles, PUI_CASE_MANAGER) ||
      hasRoleCategory(roles, PUI_ORG_MANAGER),
      // EXUI-4758 - Unsure whether this is correct but it is the current implementation.
      // Looks like legal-operations has been bundled in with solicitor
      // may just not have been noticed as is a fallback
    result: PROFESSIONAL_ROLE_CATEGORY,
  },
  {
    matches: (roles) =>
      hasRoleCategory(roles, SSCS_DWP_RESPONSE_WRITER) ||
      hasRoleCategory(roles, SSCS_HMRC_RESPONSE_WRITER) ||
      hasRoleCategory(roles, SSCS_IBCA_RESPONSE_WRITER),
    result: OTHER_GOV_DEPARTMENT_ROLE_CATEGORY,
  },
];

// Util Method takes the roleAssignment and returns true if it has case allocator
// If current jurisdiction is passed it checks if the RoleAssignment is for jurisdiction
// If current location is passed it checks if the RoleAssignment is for location
export function isCurrentUserCaseAllocator(
  currentUserRoleAssignment: RoleAssignment,
  currentJurisdiction?: string,
  currentLocation?: string
): boolean {
  return (
    !!currentUserRoleAssignment &&
    currentUserRoleAssignment?.roleType === ORGANISATION_ROLE_TYPE &&
    currentUserRoleAssignment?.roleName === CASE_ALLOCATOR_ROLE &&
    (!currentJurisdiction || currentUserRoleAssignment?.attributes?.jurisdiction === currentJurisdiction) &&
    (!currentLocation || currentUserRoleAssignment?.attributes?.baseLocation === currentLocation)
  );
}

// Returns the roles
// Of Type ORGANISATION
export function getOrganisationRoles(roleAssignments: RoleAssignment[]): string[] {
  const roles = [];
  if (roleAssignments) {
    roleAssignments.forEach((roleAssignment) => {
      if (!roles.includes(roleAssignment?.roleName) && roleAssignment?.roleType === ORGANISATION_ROLE_TYPE) {
        roles.push(roleAssignment?.roleName);
      }
    });
  }
  return roles;
}

export function getRoleCategoriesFromRoleAssignments(roleAssignments: string[]): string[] {
  const roleCategories = [JUDGE_ROLE_CATEGORY, LEGAL_OPERATIONS_ROLE_CATEGORY, CTSC_ROLE_CATEGORY, ADMIN_ROLE_CATEGORY];
  const userRoleCategories = [];
  for (const roleCategory of roleCategories) {
    if (hasRoleCategory(roleAssignments, roleCategory)) {
      userRoleCategories.push(roleCategory);
    }
  }
  return userRoleCategories;
}

// EXUI-4758 - get all unique role categories from userInfo.roles for the user, not just the first one found
export function getUserRoleCategories(roles: string[]): string[] {
  const userRoleCategories = roleCategoryRules.filter((rule) => rule.matches(roles)).map((rule) => rule.result);
  // as previous, default to legal operations if no role category found
  if (userRoleCategories.length === 0) {
    return [LEGAL_OPERATIONS_ROLE_CATEGORY];
  }
  return userRoleCategories;
}

export function userDetailsValid(userInfo: UserInfo): boolean {
  if (!userInfo) {
    // user info not present does not mean not valid
    return true;
  }
  const userInfoKeys = Object.keys(userInfo);
  const userInfoValues: string[] = [];

  for (const key of userInfoKeys) {
    if (typeof userInfo[key] === 'string' && key !== 'iss') {
      userInfoValues.push(userInfo[key]);
    }
  }
  // check all user details - Fortify safety check
  // if contains special characters, return false
  if (
    !allContainOnlySafeCharacters(userInfoValues) ||
    !allContainOnlySafeCharacters(userInfo.roles) ||
    containsDangerousCode(userInfo.iss)
  ) {
    return false;
  }
  return true;
}

export function hasRoleCategory(roles: string[], roleName: string): boolean {
  return roles.some((x) => x.toLowerCase() === roleName.toLowerCase());
}

export function includesRoleCategory(roles: string[], roleName: string): boolean {
  return roles.some((x) => x.toLowerCase().includes(roleName.toLowerCase()));
}
