import { AxiosResponse } from 'axios';
import { http } from '../lib/http';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';

const logger: JUILogger = log4jui.getLogger('caseworker-service');

export async function handleUsersGet(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('getting users for', path);
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(path, { headers });
  return response.data;
}

export async function handleNewUsersGet(path: string, headers: any): Promise<any> {
  logger.info('getting users for', path);
  const response: AxiosResponse = await http.get(path, { headers });
  return response.data;
}

export async function handleCaseWorkerGetAll(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('getting all caseworkers for', path);
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(path, { headers });
  return response.data;
}

export async function handleCaseWorkerForLocation(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('get caseworkers for Location', path);
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(path, { headers });
  return response.data;
}

export async function handleCaseWorkerForService(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('get caseworkers for Service', path);
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(path, { headers });
  return response.data;
}

export async function handleCaseWorkerForLocationAndService(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('get caseworkers for Location and Service', path);
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(path, { headers });
  return response.data;
}

export async function handleCaseWorkerDetails(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('get caseworkers Details', path);
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(path, { headers });
  return response.data;
}

export async function handlePostSearch(path: string, payload: string | any, req: EnhancedRequest): Promise<any> {
  logger.info('post search', payload);
  const headers = setHeaders(req);
  return await http.post(path, payload, { headers });
}

export async function handlePostRoleAssignments(path: string, payload: any, headers: any): Promise<any> {
  const response: AxiosResponse = await http.post(path, payload, { headers });
  return response.data.roleAssignmentResponse;
}

export async function handlePostCaseWorkersRefData(path: string, userIdsByJurisdiction: any, req: EnhancedRequest): Promise<any> {
  const data = new Array<any>();
  for (const userIdList of userIdsByJurisdiction) {
    if (userIdList.userIds && userIdList.userIds.length > 0) {
      const payload = {
        userIds: userIdList.userIds
      };
      const headers = setHeaders(req);
      const response: AxiosResponse = await http.post(path, payload, { headers });
      const userListByService = { jurisdiction: userIdList.jurisdiction, data: response.data };
      data.push(userListByService);
    } else {
      console.warn('Jurisdiction ' + userIdList.jurisdiction + ' user list is empty');
    }
  }
  return data;
}

export async function handlePostJudicialWorkersRefData(path: string, userIds: any, req: EnhancedRequest): Promise<any> {
  const payload = {
    userIds
  };
  const headers = setHeaders(req);
  return await http.post(path, payload, { headers });
}

export function getUserIdsFromRoleApiResponse(response: any): string [] {
  let userIds = new Array<string>();
  if (response && response.roleAssignmentResponse) {
    response.roleAssignmentResponse.forEach((roleAssignment) => {
      userIds = [...userIds, roleAssignment.actorId];
    });
  }
  return userIds;
}

export function getUserIdsFromJurisdictionRoleResponse(response: any): any [] {
  let userIdsByJurisdiction = [];
  response.forEach((jurisdictionRoleResponse) => {
    let userIds = [];
    jurisdictionRoleResponse.data.roleAssignmentResponse.forEach((roleAssignment) => {
      userIds = [...userIds, roleAssignment.actorId];
    });
    userIdsByJurisdiction = userIdsByJurisdiction.concat({ jurisdiction: jurisdictionRoleResponse.jurisdiction, userIds });
  });
  return userIdsByJurisdiction;
}
