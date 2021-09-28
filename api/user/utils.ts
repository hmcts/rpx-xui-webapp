import { CASE_ALLOCATOR_ROLE, ORGANISATION_ROLE_TYPE } from "./constants";
import { RoleAssignment } from "./interfaces/roleAssignment";

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
