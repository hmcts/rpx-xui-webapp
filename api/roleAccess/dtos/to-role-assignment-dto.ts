/* tslint:disable:object-literal-sort-keys */
import { AllocateRoleData } from '../models/allocate-role-state-data.interface';
import { AllocateTo } from '../models/allocate-role.enum';

export function toRoleAssignmentBody(currentUserId: string, allocateRoleData: AllocateRoleData): any {
  return {
    roleRequest: {
      assignerId: currentUserId,
      replaceExisting: false,
    },
    requestedRoles: [{
      roleType: 'CASE',
      grantType: 'SPECIFIC',
      classification: 'PUBLIC',
      attributes: {
        caseId: allocateRoleData.caseId,
        jurisdiction: allocateRoleData.jurisdiction,
      },
      roleName: allocateRoleData.typeOfRole.id,
      roleCategory: allocateRoleData.roleCategory,
      actorIdType: 'IDAM',
      actorId: getActorId(currentUserId, allocateRoleData),
      beginTime: allocateRoleData.period.startDate,
      endTime: allocateRoleData.period.endDate,
    }],
  };
}

export function getActorId(currentUserId: string, allocateRoleData: AllocateRoleData): string {
  if (allocateRoleData.allocateTo === AllocateTo.RESERVE_TO_ME) {
    return currentUserId;
  } else {
    return allocateRoleData.person.id;
  }
}
