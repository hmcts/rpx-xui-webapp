import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { RoleCategory } from './models/allocate-role.enum';
import { CaseRoleRequestPayload, RoleExclusion } from './models/caseRoleRequestPayload';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { CaseRole } from '../workAllocation2/interfaces/caseRole';

export const release2ContentType =
  'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'

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
  const exclusion = [
    {
      added: Date.UTC(2021, 7, 1),
      name: 'Judge ABCDE',
      notes: 'this case been remitted from Upper Tribunal and required different judge',
      type: 'Other',
      userType: 'Judicial',
    },
  ];
  const errorCodes: string[] = ['400', '401', '402', '403', '500', '503'];
  const value: string = req.body.exclusionDescription;
  if (errorCodes.indexOf(value) !== -1) {
    return res.status(parseInt(value, 10)).send(`{status: ${value}}`);
  }
  return res.status(200).send(exclusion);
}

export async function deleteUserExclusion(req: EnhancedRequest, res: Response, next: NextFunction) {
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/${req.body.roleExclusion.id}`;
  const headers = setHeaders(req);
  try {
    const response = await http.delete(fullPath, {headers})
    return res.status(response.status).send(req.body.roleExclusion);
  } catch (error) {
    next(error)
  }
}

export function mapResponseToExclusions(roleAssignments: RoleAssignment[], assignmentId: string, req: EnhancedRequest): RoleExclusion[] {
  if (assignmentId) {
    roleAssignments = roleAssignments.filter(roleAssignment => roleAssignment.id === assignmentId);
  }
  return roleAssignments.map(roleAssignment => ({
    added: roleAssignment.created,
    id: roleAssignment.id,
    name: roleAssignment.roleName,
    type: roleAssignment.roleType,
    userType: roleAssignment.roleCategory,
    email: roleAssignment.actorId ? getEmail(roleAssignment.actorId, req) : null
  }));
}

export function getEmail(actorId: string, req: EnhancedRequest): string {
  console.log(req.session.caseworkers);
  if(req.session.caseworkers) {
    const caseWorker = req.session.caseworkers.find(caseworker => caseworker.idamId === actorId);
    if(caseWorker) {
      return caseWorker.email;
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

export function getLegalAndJudicialRequestPayload(caseId: string,
                                                  jurisdiction: string,
                                                  caseType: string): CaseRoleRequestPayload {
  return {
    queryRequests: [
      {
          attributes: {
              caseId: [caseId],
              caseType: [caseType],
              jurisdiction: [jurisdiction],
            },
          roleCategory: ['LEGAL_OPERATIONS'],
      },
    ],
  };
}

export async function getRolesByCaseId(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const requestPayload = getLegalAndJudicialRequestPayload(req.body.caseId, req.body.jurisdiction, req.body.caseType);
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/query`;
  const headers = setHeaders(req, release2ContentType);
  try {
    const response: AxiosResponse = await http.post(fullPath, requestPayload, {headers});
    const roleExclusions = mapResponseToCaseRoles(response.data.roleAssignmentResponse, req.body.exclusionId, req);
    return res.status(response.status).send(roleExclusions);
  } catch (error) {
    next(error);
  }
}

export function mapResponseToCaseRoles(roleAssignments: RoleAssignment[], assignmentId: string, req: EnhancedRequest): CaseRole[] {
  if (assignmentId) {
    roleAssignments = roleAssignments.filter(roleAssignment => roleAssignment.id === assignmentId);
  }
  return roleAssignments.map(roleAssignment => ({
    actions: [
      {'id': 'reallocate', 'title': 'Reallocate'},
      {'id': 'remove', 'title': 'Remove Allocation'},
    ],
    actorId: roleAssignment.actorId,
    email: roleAssignment.actorId ? getEmail(roleAssignment.actorId, req) : null,
    end: roleAssignment.endTime ? roleAssignment.endTime.toString() : null,
    id: roleAssignment.id,
    location: null,
    name: roleAssignment.roleName,
    roleCategory: mapRoleCategory(roleAssignment.roleCategory),
    roleName: roleAssignment.roleName,
    start: roleAssignment.beginTime ? roleAssignment.beginTime.toString() : null,
  }));
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
