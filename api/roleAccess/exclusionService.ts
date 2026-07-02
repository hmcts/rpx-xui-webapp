import { AxiosResponse } from 'axios';
import * as express from 'express';
import { NextFunction, Response } from 'express';
import { UserInfo } from '../auth/interfaces/UserInfo';
import { sendPost } from '../common/crudService';
import { getConfigValue, showFeature } from '../configuration';
import {
  FEATURE_JRD_E_LINKS_V2_ENABLED,
  SERVICES_CASE_JUDICIAL_REF_PATH,
  SERVICES_ROLE_ASSIGNMENT_API_PATH,
} from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { JudicialUserDto } from './dtos/judicial-user-dto';
import { RoleCategory } from './models/allocate-role.enum';
import { CaseRoleRequestPayload, RoleExclusion } from './models/caseRoleRequestPayload';
import { release2ContentType } from './models/release2ContentType';

const HEADER_ACCEPT_V1 = 'application/json';
const HEADER_ACCEPT_V2 = 'application/vnd.jrd.api+json;Version=2.0';
const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
const JUDICIAL_REF_URL = getConfigValue(SERVICES_CASE_JUDICIAL_REF_PATH);

export async function findExclusionsForCaseId(req: EnhancedRequest, res: Response, next: NextFunction) {
  const requestPayload = getExclusionRequestPayload(req.body.caseId, req.body.jurisdiction, req.body.caseType);
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/query`;
  const headers = setHeaders(req, release2ContentType);
  try {
    const response: AxiosResponse = await http.post(fullPath, requestPayload, { headers });
    const roleExclusions = mapResponseToExclusions(response.data.roleAssignmentResponse, req.body.exclusionId, req);
    return res.status(response.status).send(roleExclusions);
  } catch (error) {
    next(error);
  }
}

// EXUI-4758 - Added errors if required data not available
// Note - unsure where the currentUserId is required when assigning for someone else so allowed that circumstance
export async function confirmUserExclusion(req: EnhancedRequest, res: Response, next: NextFunction) {
  const body = req.body;
  const currentUser: UserInfo = req.session.passport.user.userinfo;
  const currentUserId = currentUser.id ? currentUser.id : currentUser.uid;
  let roleCategory: string | null;
  let assigneeId: string | undefined;
  try {
    if (body.exclusionOption === 'Exclude another person') {
      roleCategory = getCorrectRoleCategory(body.person.domain);
      assigneeId = body.person.id;
    } else if (currentUserId) {
      // EXUI-4758 - if the user is excluding themselves, use the first role category from the role category list
      roleCategory = currentUser.roleCategories?.[0] ?? null;
      assigneeId = currentUserId;
    } else {
      throw new Error('Current user ID is not available in the session');
    }
    if (!assigneeId) {
      throw new Error('Assignee ID is not available');
    }
    const roleAssignmentsBody = prepareExclusionBody(currentUserId, assigneeId, body, roleCategory);
    const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
    const response: AxiosResponse = await sendPost(basePath, roleAssignmentsBody, req, next);
    const { status, data } = response;
    return res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export function prepareExclusionBody(
  currentUserId: string | undefined,
  assigneeId: string,
  body: any,
  roleCategory: string | null
): any {
  return {
    roleRequest: {
      assignerId: currentUserId,
      replaceExisting: false,
    },
    requestedRoles: [
      {
        roleType: 'CASE',
        grantType: 'EXCLUDED',
        classification: 'RESTRICTED',
        attributes: {
          caseId: body.caseId,
          jurisdiction: body.jurisdiction,
          notes: body.exclusionDescription,
        },
        // roleCategory not set to array since API likely expects single value
        roleCategory,
        roleName: 'conflict-of-interest',
        actorIdType: 'IDAM',
        actorId: assigneeId,
      },
    ],
  };
}

export async function deleteUserExclusion(req: EnhancedRequest, res: Response, next: NextFunction) {
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/${req.body.roleExclusion.id}`;
  const headers = setHeaders(req);
  try {
    const response = await http.delete(fullPath, { headers });
    return res.status(response.status).send(req.body.roleExclusion);
  } catch (error) {
    next(error);
  }
}

export function mapResponseToExclusions(
  roleAssignments: RoleAssignment[],
  assignmentId: string,
  req: EnhancedRequest
): RoleExclusion[] {
  if (assignmentId) {
    roleAssignments = roleAssignments.filter((roleAssignment) => roleAssignment.id === assignmentId);
  }
  return roleAssignments.map((roleAssignment) => ({
    added: roleAssignment.created,
    actorId: roleAssignment.actorId,
    email: roleAssignment.actorId ? getEmail(roleAssignment.actorId, req) : null,
    id: roleAssignment.id,
    name: roleAssignment.actorId ? getUserName(roleAssignment.actorId, req) : null,
    type: roleAssignment.roleType,
    userType: roleAssignment.roleCategory,
    notes: roleAssignment.attributes.notes as string,
  }));
}

export function getEmail(actorId: string, req: EnhancedRequest): string {
  if (req?.session?.caseworkers) {
    const caseWorker = req.session.caseworkers.find((caseworker) => caseworker.idamId === actorId);
    if (caseWorker) {
      return caseWorker.email;
    }
  }
}

export function getUserName(actorId: string, req: EnhancedRequest): string {
  if (req?.session?.caseworkers) {
    const caseWorker = req.session.caseworkers.find((caseworker) => caseworker.idamId === actorId);
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
    case 'ADMIN':
      return RoleCategory.ADMIN;
    case 'CTSC':
      return RoleCategory.CTSC;
    case 'PROFESSIONAL':
      return RoleCategory.PROFESSIONAL;
    default:
      throw new Error('Invalid roleCategory');
  }
}

export function getCorrectRoleCategory(domain: string): RoleCategory {
  switch (domain) {
    case 'Legal Ops':
      return RoleCategory.LEGAL_OPERATIONS;
    case 'Judicial':
      return RoleCategory.JUDICIAL;
    case 'Admin':
      return RoleCategory.ADMIN;
    default:
      throw new Error('Invalid roleCategory ' + domain);
  }
}

export function getJudicialUsersFromApi(
  req: express.Request,
  ids: string[],
  serviceCode: string
): Promise<AxiosResponse<JudicialUserDto[]>> {
  // Judicial User search API version to be used depends upon the config entry FEATURE_JRD_E_LINKS_V2_ENABLED's value
  req.headers.accept = showFeature(FEATURE_JRD_E_LINKS_V2_ENABLED) ? HEADER_ACCEPT_V2 : HEADER_ACCEPT_V1;
  const headers = setHeaders(req);
  return http.post(`${JUDICIAL_REF_URL}/refdata/judicial/users`, { sidam_ids: ids, serviceCode }, { headers });
}
