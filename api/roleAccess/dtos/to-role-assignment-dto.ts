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
      grantType: 'BASIC', //SPECIFIC
      classification: 'PRIVATE',
      attributes: {
        caseId: allocateRoleData.caseId,
        requestedRole: allocateRoleData.requestedRole,
      },
      roleName: allocateRoleData.typeOfRole.id,
      roleCategory: allocateRoleData.roleCategory,
      actorIdType: 'IDAM',
      actorId: allocateRoleData.person.id,
      endTime: '2022-06-21T12:34:09.101Z',//new Date(new Date().setDate(new Date().getDate() + 30)),
      beginTime: null,
      //beginTime: allocateRoleData.period.startDate,
      // endTime: allocateRoleData.period.endDate
      // ? allocateRoleData.period.endDate : new Date(todayDate.setMonth(todayDate.getMonth() + 1)),
      // TODO: Include notes once we have that information
      notes: [{comment: "{\"specificReason\":\"Testing testing testing\"}",
      time: "2022-05-10T16:34:18.763Z",
      userId: allocateRoleData.person.id}],
    }
    // ,
    // {
    //   roleType: 'CASE',
    //   readOnly: true,
    //   grantType: 'SPECIFIC',
    //   classification: 'RESTRICTED',
    //   attributes: {
    //     caseId: allocateRoleData.caseId,
    //     requestedRole: allocateRoleData.requestedRole,
    //   },
    //   roleName: allocateRoleData.requestedRole,
    //   roleCategory: allocateRoleData.roleCategory,
    //   actorIdType: 'IDAM',
    //   actorId: allocateRoleData.person.id,
    //   // beginTime: allocateRoleData.period.startDate,
    //   // endTime: allocateRoleData.period.endDate,
    //   // TODO: Include notes once we have that information
    //   notes: [{comment: "{\"specificReason\":\"Testing testing testing\"}",
    //   time: "2022-05-10T16:34:18.763Z",
    //   userId: allocateRoleData.person.id}, ],
    // }
  ],
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
      endTime: allocateRoleData.period.endDate ? allocateRoleData.period.endDate
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
