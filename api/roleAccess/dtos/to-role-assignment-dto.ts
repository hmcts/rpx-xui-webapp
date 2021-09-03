/* tslint:disable:object-literal-sort-keys */
import { UserInfo } from '../../auth/interfaces/UserInfo';
import { AllocateRoleData } from '../models/allocate-role-state-data.interface';
import { AllocateTo } from '../models/allocate-role.enum';

export function toRoleAssignmentBody(userInfo: UserInfo, allocateRoleData: AllocateRoleData): any {
  return {
    roleRequest: {
      assignerId: userInfo.id,
      replaceExisting: false,
    },
    requestedRoles: [{
      roleType: 'CASE',
      grantType: 'SPECIFIC',
      classification: 'PUBLIC',
      attributes: {
        caseId: allocateRoleData.caseId,
        jurisdiction: 'IA',
      },
      roleName: 'judge',
      roleCategory: allocateRoleData.roleCategory,
      actorIdType: 'IDAM',
      actorId: getActorId(userInfo, allocateRoleData),
      beginTime: allocateRoleData.period.startDate,
      endTime: allocateRoleData.period.endDate,
    }],
  };
}

export function getActorId(userInfo: UserInfo, allocateRoleData: AllocateRoleData): string {
  if (allocateRoleData.action === 'reallocate') {
    return allocateRoleData.person.id;
  } else {
    if (allocateRoleData.allocateTo === AllocateTo.RESERVE_TO_ME) {
      return userInfo.id;
    } else {
      return allocateRoleData.person.id;
    }
  }
}
