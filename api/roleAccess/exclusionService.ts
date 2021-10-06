import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { CaseRoleRequestPayload, RoleExclusion } from './models/caseRoleRequestPayload';

export async function findExclusionsForCaseId(req: EnhancedRequest, res: Response, next: NextFunction) {
  const requestPayload = getRequestPayload(req.body.caseId, req.body.jurisdiction, req.body.caseType);
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/query`;
  const headers = setHeaders(req);
  try {
    const response: AxiosResponse = await http.post(fullPath, requestPayload, {headers});
    const roleExclusions = mapResponseToExclusions(response.data.roleAssignmentResponse);
    return res.status(200).send(roleExclusions);
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
  return res.status(200).send(req.body.roleExclusion);
}

export function mapResponseToExclusions(roleAssignments: RoleAssignment[]): RoleExclusion[] {
  return roleAssignments.map(roleAssignment => ({
    added: roleAssignment.created,
    id: roleAssignment.id,
    name: roleAssignment.roleName,
    type: roleAssignment.roleType,
    userType: roleAssignment.roleCategory,
  }));
}

export function getRequestPayload(caseId: string, jurisdiction: string, caseType: string): CaseRoleRequestPayload {
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
