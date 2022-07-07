import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { sendDelete, sendPost } from '../common/crudService';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { getServiceRefDataMappingList } from '../serviceRefData';
import { refreshRoleAssignmentForUser } from '../user';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { CaseRole } from '../workAllocation2/interfaces/caseRole';
import { toRoleAssignmentBody } from './dtos/to-role-assignment-dto';
import { getEmail, getJudicialUsersFromApi, getUserName, mapRoleCategory } from './exclusionService';
import { CaseRoleRequestPayload } from './models/caseRoleRequestPayload';
import { release2ContentType } from './models/release2ContentType';
import { getSubstantiveRoles } from './roleAssignmentService';

const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);

export async function getRolesByCaseId(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const requestPayload = getLegalAndJudicialRequestPayload(req.body.caseId, req.body.jurisdiction, req.body.caseType);
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/query`;
  const headers = setHeaders(req, release2ContentType);
  try {
    const response: AxiosResponse = await http.post(fullPath, requestPayload, { headers });
    const judicialAndLegalOps: CaseRole[] = mapResponseToCaseRoles(
      response.data.roleAssignmentResponse,
      req.body.exclusionId,
      req
    );
    const substantiveRoles = await getSubstantiveRoles(req);
    const finalRoles = [];
    judicialAndLegalOps.forEach(unknownRole => {
      const substantiveRole = substantiveRoles.find(role => role.roleId === unknownRole.roleName);
      if (substantiveRole) {
        const currentRoleId = unknownRole.roleName;
        unknownRole.roleName = substantiveRole.roleName;
        unknownRole.roleId = currentRoleId;
        finalRoles.push(unknownRole);
      }
    });
    return res.status(response.status).send(finalRoles);
  } catch (error) {
    next(error);
  }
}

export async function getJudicialUsers(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const userIds = req.body.userIds;
  const services = req.body.services ? req.body.services : userIds;
  const serviceCodes: string[] = [];
  const serviceRefDataMapping = getServiceRefDataMappingList();
  // add the service refernces in order to search by service
  serviceRefDataMapping.forEach(serviceRef => {
    if (services.includes(Object.keys(serviceRef)[0])) {
      serviceCodes.push(Object.values(serviceRef)[0] as string);
    }
  })
  try {
    let searchResult: any[] = [];
    for (const serviceCode of serviceCodes) {
      const response = await getJudicialUsersFromApi(req, userIds, serviceCode);
      searchResult = response.data ? [...response.data, ...searchResult] : searchResult;
    }
    return res.status(200).send(searchResult);
  } catch (error) {
    next(error);
  }
}

export function mapResponseToCaseRoles(
  roleAssignments: RoleAssignment[],
  assignmentId: string,
  req: EnhancedRequest
): CaseRole[] {
  if (assignmentId) {
    roleAssignments = roleAssignments.filter(roleAssignment => roleAssignment.id === assignmentId);
  }
  return roleAssignments.map(roleAssignment => ({
    actions: [
      { 'id': 'reallocate', 'title': 'Reallocate' },
      { 'id': 'remove', 'title': 'Remove Allocation' },
    ],
    actorId: roleAssignment.actorId,
    email: roleAssignment.actorId ? getEmail(roleAssignment.actorId, req) : null,
    end: roleAssignment.endTime ? roleAssignment.endTime.toString() : null,
    id: roleAssignment.id,
    roleId: null,
    location: null,
    name: roleAssignment.actorId ? getUserName(roleAssignment.actorId, req) : null,
    roleCategory: mapRoleCategory(roleAssignment.roleCategory),
    roleName: roleAssignment.roleName,
    start: roleAssignment.beginTime ? roleAssignment.beginTime.toString() : null,
  }));
}

export async function confirmAllocateRole(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const body = req.body;
    // @ts-ignore
    const currentUser = req.session.passport.user.userinfo;
    const currentUserId = currentUser.id ? currentUser.id : currentUser.uid;
    const roleAssignmentsBody = toRoleAssignmentBody(currentUserId, body);
    const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
    const response: AxiosResponse = await sendPost(basePath, roleAssignmentsBody, req);
    await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);
    const { status, data } = response;
    return res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export async function reallocateRole(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const body = req.body;
    const assigmentId = req.body.assignmentId;
    const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
    const deletePath = `${basePath}/${assigmentId}`;
    const deleteResponse: AxiosResponse = await sendDelete(deletePath, body, req);
    const { status, data } = deleteResponse;
    if (status >= 200 && status <= 204) {
      // @ts-ignore
      const currentUser = req.session.passport.user.userinfo;
      const currentUserId = currentUser.id ? currentUser.id : currentUser.uid;
      const roleAssignmentsBody = toRoleAssignmentBody(currentUserId, body);
      const postResponse: AxiosResponse = await sendPost(basePath, roleAssignmentsBody, req);
      await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);
      return res.status(postResponse.status).send(postResponse.data);
    } else {
      return res.status(status).send(data);
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteRoleByCaseAndRoleId(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
  const body = req.body;
  const assigmentId = req.body.assigmentId;
  try {
    const { status } = await sendDelete(`${basePath}/${assigmentId}`, body, req);
    await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);
    return res.send().status(status);
  } catch (e) {
    next(e);
  }
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
        roleCategory: ['LEGAL_OPERATIONS', 'JUDICIAL'],
      },
    ],
  };
}
