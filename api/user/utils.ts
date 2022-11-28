import { CASE_ALLOCATOR_ROLE, ORGANISATION_ROLE_TYPE } from "./constants";
import { RoleAssignment } from "./interfaces/roleAssignment";

export const JUDGE_ROLE = 'judge';
export const JUDGE_ROLE_CATEGORY = 'JUDICIAL';
export const JUDGE_ROLE_NAME = 'judicial';
export const JUDICIARY_ROLE_NAME = 'judiciary';
export const ADMIN_ROLE = 'admin';
export const ADMIN_ROLE_CATEGORY = 'ADMIN';
export const ADMIN_ROLE_NAME = 'admin';
export const PROFESSIONAL_ROLE = 'solicitor';
export const PROFESSIONAL_ROLE_CATEGORY = 'PROFESSIONAL';
export const PROFESSIONAL_ROLE_NAME = 'professional';
export const LEGAL_OPERATIONS_ROLE = 'caseworker';
export const LEGAL_OPERATIONS_ROLE_CATEGORY = 'LEGAL_OPERATIONS';
export const LEGAL_OPERATIONS_ROLE_NAME = 'legal-operations';
export const CITIZEN_ROLE = 'citizen';
export const CITIZEN_ROLE_CATEGORY = 'CITIZEN';
export const CITIZEN_ROLE_NAME = 'citizen';
export const CTSC_ROLE_NAME = 'ctsc';

// Util Method takes the roleAssignment and returns true if it has case allocator
// If current jurisdiction is passed it checks if the RoleAssignment is for jurisdiction
// If current location is passed it checks if the RoleAssignment is for location
export function isCurrentUserCaseAllocator(currentUserRoleAssignment: RoleAssignment,
                                           currentJurisdiction?: string,
                                           currentLocation?: string): boolean {
  return !!currentUserRoleAssignment
   && currentUserRoleAssignment.roleType === ORGANISATION_ROLE_TYPE
   && currentUserRoleAssignment.roleName === CASE_ALLOCATOR_ROLE
   && (!currentJurisdiction || currentUserRoleAssignment.attributes.jurisdiction === currentJurisdiction)
   && (!currentLocation || currentUserRoleAssignment.attributes.primaryLocation === currentLocation);
}

// Returns the roles
// Of Type ORGANISATION
export function getOrganisationRoles(roleAssignments: RoleAssignment[]): string[] {
   const roles = [];
   if (roleAssignments) {
      roleAssignments.forEach(roleAssignment => {
         if (!roles.includes(roleAssignment.roleName) && roleAssignment.roleType === ORGANISATION_ROLE_TYPE) {
             roles.push(roleAssignment.roleName);
           }
       });
   }
   return roles;
 }

export function getUserRoleCategory(roles: string[]): string {
  if (hasRoleCategory(roles, CITIZEN_ROLE)) {
    return CITIZEN_ROLE_NAME;
  } else if (hasRoleCategory(roles, JUDGE_ROLE) || hasRoleCategory(roles, JUDICIARY_ROLE_NAME)) {
    return JUDGE_ROLE_NAME;
  } else if (hasRoleCategory(roles, PROFESSIONAL_ROLE) || hasRoleCategory(roles, PROFESSIONAL_ROLE_NAME)) {
    return PROFESSIONAL_ROLE;
  } else if (hasRoleCategory(roles, ADMIN_ROLE)) {
    return ADMIN_ROLE_NAME;
  } else if (hasRoleCategory(roles, CTSC_ROLE_NAME)) {
    return CTSC_ROLE_NAME;
  } else if (hasRoleCategory(roles, LEGAL_OPERATIONS_ROLE_NAME)) {
    return LEGAL_OPERATIONS_ROLE_NAME;
  }
}

export function hasRoleCategory(roles: string[], roleName): boolean {
  return roles.some(x => x.toLowerCase() === roleName.toLowerCase());
}
