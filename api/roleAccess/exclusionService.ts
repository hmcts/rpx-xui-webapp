import { AxiosResponse } from 'axios';
import { sendPost } from '../common/crudService';
import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { RoleCategory } from './models/allocate-role.enum';
import { CaseRoleRequestPayload, RoleExclusion } from './models/caseRoleRequestPayload';
import { UserInfo } from 'auth/interfaces/UserInfo';
import { release2ContentType } from './models/release2ContentType';

const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);

export async function findExclusionsForCaseId(req: EnhancedRequest, res: Response, next: NextFunction) {
  const requestPayload = getExclusionRequestPayload(req.body.caseId, req.body.jurisdiction, req.body.caseType);
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/query`;
  const headers = setHeaders(req, release2ContentType);
  try {
    const response: AxiosResponse = await http.post(fullPath, requestPayload, {headers});
    const roleExclusions = mapResponseToExclusions(response.data.roleAssignmentResponse, req.body.exclusionId, req);
    return res.status(response.status).send(roleExclusions);
  } catch (error) {
    next(error);
  }
}

export async function confirmUserExclusion(req: EnhancedRequest, res: Response, next: NextFunction) {
  const body = req.body;
  // @ts-ignore
  const currentUser: UserInfo = req.session.passport.user.userinfo;
  const currentUserId = currentUser.id ? currentUser.id : currentUser.uid;
  let roleCategory: string;
  let assigneeId: string;
  if (body.exclusionOption === 'Exclude another person') {
    roleCategory = body.person.domain === 'Legal Ops' ? 'LEGAL_OPERATIONS' : body.person.domain;
    assigneeId = body.person.id;
  } else {
    roleCategory = currentUser.roleCategory;
    assigneeId = currentUserId;
  }

  const roleAssignmentsBody = prepareExclusionBody(currentUserId, assigneeId, body, roleCategory);
  const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
  const response: AxiosResponse = await sendPost(basePath, roleAssignmentsBody, req);
  const {status, data} = response;
  return res.status(status).send(data);
}

export function prepareExclusionBody(currentUserId: string, assigneeId: string, body: any, roleCategory: string): any {
  return {
    roleRequest: {
      assignerId: currentUserId,
      replaceExisting: false,
    },
    requestedRoles: [{
      roleType: 'CASE',
      grantType: 'EXCLUDED',
      classification: 'RESTRICTED',
      attributes: {
        caseId: body.caseId,
        jurisdiction: body.jurisdiction,
        notes: body.exclusionDescription,
      },
      roleCategory,
      roleName: 'conflict-of-interest',
      actorIdType: 'IDAM',
      actorId: assigneeId,
    }],
  };
}

export async function deleteUserExclusion(req: EnhancedRequest, res: Response, next: NextFunction) {
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/${req.body.roleExclusion.id}`;
  const headers = setHeaders(req);
  try {
    const response = await http.delete(fullPath, {headers});
    return res.status(response.status).send(req.body.roleExclusion);
  } catch (error) {
    next(error);
  }
}

export function mapResponseToExclusions(roleAssignments: RoleAssignment[],
                                        assignmentId: string,
                                        req: EnhancedRequest): RoleExclusion[] {
  if (assignmentId) {
    roleAssignments = roleAssignments.filter(roleAssignment => roleAssignment.id === assignmentId);
  }
  return roleAssignments.map(roleAssignment => ({
    added: roleAssignment.created,
    email: roleAssignment.actorId ? getEmail(roleAssignment.actorId, req) : null,
    id: roleAssignment.id,
    name: roleAssignment.actorId ? getUserName(roleAssignment.actorId, req) : null,
    type: roleAssignment.roleType,
    userType: roleAssignment.roleCategory,
    notes: roleAssignment.attributes.notes,
  }));
}

export function getEmail(actorId: string, req: EnhancedRequest): string {
  if (req && req.session && req.session.caseworkers) {
    const caseWorker = req.session.caseworkers.find(caseworker => caseworker.idamId === actorId);
    if (caseWorker) {
      return caseWorker.email;
    }
  }
}
export function getUserName(actorId: string, req: EnhancedRequest): string {
  if (req && req.session && req.session.caseworkers) {
    const caseWorker = req.session.caseworkers.find(caseworker => caseworker.idamId === actorId);
    if (caseWorker) {
      return `${caseWorker.firstName}-${caseWorker.lastName}`;
    }
  }
}

export function getExclusionRequestPayload(caseId: string, jurisdiction: string, caseType: string): CaseRoleRequestPayload {
  return {
    queryRequests: [
      {
          attributes: {
              caseId: [caseId],
              caseType: [caseType],
              jurisdiction: [jurisdiction],
            },
          grantType: ['EXCLUDED'],
      },
    ],
  };
}

export function mapRoleCategory(roleCategory: string): RoleCategory {
  switch (roleCategory) {
    case 'LEGAL_OPERATIONS':
      return RoleCategory.LEGAL_OPERATIONS;
    case 'JUDICIAL':
      return RoleCategory.JUDICIAL;
    default:
      throw new Error('Invalid roleCategory');
  }
}
