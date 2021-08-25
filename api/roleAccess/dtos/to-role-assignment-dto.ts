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
      roleCategory: 'JUDICIAL',
      actorIdType: 'IDAM',
      actorId: allocateRoleData.allocateTo === AllocateTo.RESERVE_TO_ME ? userInfo.id : allocateRoleData.person.id,
      authorisations: ['caseworker-ia-iacjudge'],
      beginTime: allocateRoleData.period.startDate,
      endTime: allocateRoleData.period.endDate,
    }],
  };
}
