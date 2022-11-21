import { CASE_ALLOCATOR_ROLE, ORGANISATION_ROLE_TYPE } from "./constants";
import { RoleAssignment } from "./interfaces/roleAssignment";

export const JUDGE_ROLE = 'judge';
export const JUDGE_ROLE_CATEGORY = 'JUDICIAL';
export const JUDGE_ROLE_NAME = 'judicial';
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
export const CTSC_ROLE = 'ctsc';
export const CTSC_ROLE_CATEGORY = 'CTSC';
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

export function getMappedRoleCategory(roles: string[], roleCategories: string[]): string {
   const roleKeywords: string[] = roles.join().split('-').join().split(',');
   if (this.roleOrCategoryExists(JUDGE_ROLE, JUDGE_ROLE_CATEGORY, roleKeywords, roleCategories)) {
      return JUDGE_ROLE_CATEGORY;
   } else if (this.roleOrCategoryExists(PROFESSIONAL_ROLE, PROFESSIONAL_ROLE_CATEGORY, roleKeywords, roleCategories)) {
      return PROFESSIONAL_ROLE_CATEGORY;
   } else if (this.roleOrCategoryExists(CITIZEN_ROLE, CITIZEN_ROLE_CATEGORY, roleKeywords, roleCategories)) {
      return CITIZEN_ROLE_CATEGORY;
   } else if (this.roleOrCategoryExists(ADMIN_ROLE, ADMIN_ROLE_CATEGORY, roleKeywords, roleCategories)) {
      return ADMIN_ROLE_CATEGORY;
   } else if (this.roleOrCategoryExists(CTSC_ROLE, CTSC_ROLE_CATEGORY, CTSC_ROLE_NAME, roleCategories)) {
      return CTSC_ROLE_CATEGORY;
   } else {
      return LEGAL_OPERATIONS_ROLE_CATEGORY;
   }
}

export function roleOrCategoryExists(roleKeyword: string,
                                     roleCategory: string,
                                     roleKeywords: string[],
                                     roleCategories: string[]): boolean {
   const categoryExists = roleCategories.indexOf(roleCategory) > -1;
   const keywordExists = roleKeywords.indexOf(roleKeyword) > -1;
   return categoryExists && keywordExists;
}
