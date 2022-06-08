/* tslint:disable:object-literal-sort-keys */
import { AllocateRoleData } from '../models/allocate-role-state-data.interface';
import { AllocateTo, RoleCategory } from '../models/allocate-role.enum';

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

export function toSARoleAssignmentBody(currentUserId: string, allocateRoleData: AllocateRoleData): any {
  const todayDate = new Date();
  return {
    roleRequest: {
      assignerId: currentUserId,
      replaceExisting: true,
      process: 'specific-access',
      reference: `${allocateRoleData.caseId}/${allocateRoleData.requestedRole}/${allocateRoleData.person.id}`,
    },
    requestedRoles: [{
      roleType: 'CASE',
      readOnly: true,
      grantType: 'BASIC',
      classification: 'PUBLIC',
      attributes: {
        caseId: allocateRoleData.caseId,
        requestedRole: allocateRoleData.requestedRole,
      },
      roleName: allocateRoleData.typeOfRole.id,
      roleCategory: allocateRoleData.roleCategory,
      actorIdType: 'IDAM',
      actorId: allocateRoleData.person.id,
      beginTime: allocateRoleData.period.startDate,
      endTime: allocateRoleData.period.endDate
      ? allocateRoleData.period.endDate : new Date(todayDate.setMonth(todayDate.getMonth() + 1)),
      // TODO: Include notes once we have that information
      notes: [{comment: "{\"specificReason\":\"Testing testing testing\"}",
      time: "2022-05-10T16:34:18.763Z",
      userId: allocateRoleData.person.id}],
    },
    {
      roleType: 'CASE',
      readOnly: true,
      grantType: 'SPECIFIC',
      classification: 'RESTRICTED',
      attributes: {
        caseId: allocateRoleData.caseId,
        requestedRole: allocateRoleData.requestedRole,
      },
      roleName: allocateRoleData.requestedRole,
      roleCategory: allocateRoleData.roleCategory,
      actorIdType: 'IDAM',
      actorId: allocateRoleData.person.id,
      beginTime: allocateRoleData.period.startDate,
      endTime: allocateRoleData.period.endDate,
      // TODO: Include notes once we have that information
      notes: [{comment: "{\"specificReason\":\"Testing testing testing\"}",
      time: "2022-05-10T16:34:18.763Z",
      userId: allocateRoleData.person.id}, ],
    }],
  };
}

export function toDenySARoleAssignmentBody(currentUserId: string, allocateRoleData: AllocateRoleData): any {


  let requestedrole;
  switch( allocateRoleData.roleCategory){
    case RoleCategory.JUDICIAL:
      requestedrole = 'specific-access-judiciary';
      break;
    case RoleCategory.LEGAL_OPERATIONS:
      requestedrole = 'specific-access-legal-ops';
      break;
    case RoleCategory.ADMIN:
      requestedrole = 'specific-access-admin';
      break;
    default:
        break;
  }
  debugger;
  return {
    roleRequest: {
      assignerId: currentUserId,
      replaceExisting: true,
      process: 'specific-access',
      reference: `${allocateRoleData.caseId}/${requestedrole}/${allocateRoleData.assigneeId}`//'1651226677430150/specific-access-legal-ops/c9f16661-a551-48ae-b255-5372fb63bec3'//`${allocateRoleData.caseId}/${allocateRoleData.requestedRole}/${allocateRoleData.requestId}`,//
    },
    requestedRoles: [{
      roleType: 'CASE',
      readOnly: true,
      grantType: 'BASIC',
      classification: 'PRIVATE',
      attributes: {
        caseId: allocateRoleData.caseId,
        requestedRole: requestedrole//allocateRoleData.requestedRole,//'specific-access-legal-ops'//allocateRoleData.requestedRole
      },
      roleName: 'specific-access-denied',//allocateRoleData.typeOfRole.id,
      roleCategory: allocateRoleData.roleCategory,
      actorIdType: 'IDAM',
      actorId: allocateRoleData.assigneeId,
      endTime: new Date(new Date().setDate(new Date().getDate() + 14)),
      //beginTime: new Date(),
      notes: [{comment: allocateRoleData.comment,
      time: "2022-05-10T16:34:18.763Z",
      userId: currentUserId}],
      // originalRequestDate: allocateRoleData.requestCreated,
      // originalRequestJustification:  allocateRoleData.originalRequestJustification,
    },
  ],
  };
}
export function toDenySADletionRequestedRoleBody(requestId: string): any {
  return {
      pathVariables: {
        process: 'staff-organisational-role-mapping',
        reference: requestId,
      },
      queryParams: null,
      body: {
        userIds: [ requestId ],
      },
      multipart: false,
    };
}

export function toSARequestRoleAssignmentBody(allocateRoleData: AllocateRoleData): any {
  const todayDate = new Date();
  return {
    roleRequest: {
      assignerId: allocateRoleData.person.id,
      replaceExisting: true,
      process: 'specific-access',
      reference: `${allocateRoleData.caseId}/${allocateRoleData.requestedRole}/${allocateRoleData.person.id}`,
    },
    requestedRoles: [{
      roleType: 'CASE',
      readOnly: true,
      grantType: 'BASIC',
      classification: 'PRIVATE',
      attributes: {
        caseId: allocateRoleData.caseId,
        requestedRole: allocateRoleData.requestedRole,
      },
      roleName: 'specific-access-requested',
      roleCategory: allocateRoleData.roleCategory,
      actorIdType: 'IDAM',
      actorId: allocateRoleData.person.id,
      beginTime: new Date(),
      endTime: allocateRoleData.period && allocateRoleData.period.endDate ? allocateRoleData.period.endDate
       : new Date(todayDate.setMonth(todayDate.getMonth() + 1)),
      // TODO: Include notes once we have that information
      notes: [{comment: "{\"specificReason\":\"Testing testing testing\"}",
      time: "2022-05-10T16:34:18.763Z",
      userId: allocateRoleData.person.id}],
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
