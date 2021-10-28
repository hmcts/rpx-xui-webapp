import { NextFunction, Response } from 'express';
import { handleGet, handlePost } from '../common/mockService';
import { getConfigValue, showFeature } from '../configuration';
import {
  FEATURE_SUBSTANTIVE_ROLE_ENABLED,
  SERVICES_CASE_CASEWORKER_REF_PATH,
  SERVICES_CASE_JUDICIALWORKER_REF_PATH,
  SERVICES_ROLE_ASSIGNMENT_API_PATH,
  SERVICES_WORK_ALLOCATION_TASK_API_PATH
} from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import * as caseServiceMock from './caseService.mock';
import {
  getUserIdsFromRoleApiResponse,
  handleCaseWorkerForLocation,
  handleCaseWorkerForLocationAndService,
  handleCaseWorkerForService,
  handlePostCaseWorkersRefData,
  handlePostRoleAssignments,
  handlePostSearch
} from './caseWorkerService';

import { JUDICIAL_WORKERS_LOCATIONS } from './constants/mock.data';
import { PaginationParameter } from './interfaces/caseSearchParameter';
import { Caseworker } from './interfaces/common';
import { TaskList } from './interfaces/task';
import { SearchTaskParameter } from './interfaces/taskSearchParameter';
import { checkIfCaseAllocator } from './roleService';
import * as roleServiceMock from './roleService.mock';
import { handleGetTasksByCaseId } from './taskService';
import * as taskServiceMock from './taskService.mock';
import {
  assignActionsToCases,
  assignActionsToTasks,
  constructElasticSearchQuery,
  constructRoleAssignmentQuery,
  getCaseIdListFromRoles,
  getCaseTypesFromRoleAssignments,
  getRoleAssignmentsByQuery,
  getSubstantiveRoles,
  mapCasesFromData,
  mapCaseworkerData,
  prepareCaseWorkerForLocation,
  prepareCaseWorkerForLocationAndService,
  prepareCaseWorkerForService,
  prepareCaseWorkerSearchUrl,
  prepareGetTaskUrl,
  preparePaginationUrl,
  preparePostTaskUrlAction,
  prepareRoleApiRequest,
  prepareRoleApiUrl,
  prepareSearchTaskUrl,
  prepareTaskSearchForCompletable
} from './util';

taskServiceMock.init();
caseServiceMock.init();
roleServiceMock.init();

export const baseWorkAllocationTaskUrl = getConfigValue(SERVICES_WORK_ALLOCATION_TASK_API_PATH);
export const baseCaseWorkerRefUrl = getConfigValue(SERVICES_CASE_CASEWORKER_REF_PATH);
export const baseJudicialWorkerRefUrl = getConfigValue(SERVICES_CASE_JUDICIALWORKER_REF_PATH);
export const baseRoleAssignmentUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
export const baseUrl: string = 'http://localhost:8080';

/**
 * getTask
 */
export async function getTask(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getTaskPath: string = prepareGetTaskUrl(baseWorkAllocationTaskUrl, req.params.taskId);

    const jsonResponse = await handleGet(getTaskPath, req);

    res.status(200);
    res.send(jsonResponse);
  } catch (error) {
    next(error);
  }
}

export function handleMyCasesRewriteUrl(path: string, req: any): string {
  const roleAssignments = req.session.roleAssignmentResponse;
  const caseTypes: string = getCaseTypesFromRoleAssignments(roleAssignments);
  const queryParams = caseTypes && caseTypes.length ? caseTypes : 'Asylum';
  return path.replace('/workallocation2/my-cases', `/searchCases?ctid=${queryParams}`);
}

export async function handleCasesRewriteUrl(path: string, req: any): Promise<string> {
  const searchParameters = req.body.searchRequest.search_parameters as SearchTaskParameter[];
  const pagination = req.body.searchRequest.pagination_parameters as PaginationParameter;

  /*
    // get users case allocations
    const caseAllocatorQuery = constructRoleAssignmentCaseAllocatorQuery(searchParameters, req);
    const caseAllocatorResult = await getRoleAssignmentsByQuery(caseAllocatorQuery, req);
    // get case allocator locations
    const locations = caseAllocatorResult.roleAssignmentResponse
      ? getCaseAllocatorLocations(caseAllocatorResult.roleAssignmentResponse)
      : [];
  */

  // get all role assignments
  const query = constructRoleAssignmentQuery(searchParameters, []);
  const result = await getRoleAssignmentsByQuery(query, req);

  // temporary save the role assignments to the session
  req.session.casesRoleAssignments = result ? result.roleAssignmentResponse : [];
  req.session.casesPagination = pagination;

  // get the case ids from the role assignments
  const caseTypes: string = getCaseTypesFromRoleAssignments(req.session.casesRoleAssignments);
  const queryParams = caseTypes.length ? caseTypes : 'Asylum';
  return path.replace('/workallocation2/cases', `/searchCases?ctid=${queryParams}`);
}

export function handleGetMyCasesRequest(proxyReq, req): void {
  const roleAssignments = req.session.roleAssignmentResponse;
  // EUI-4579 - get list of case ids from role assignments
  // note - will need to be getting substantive roles in future
  const caseIdList = getCaseIdListFromRoles(roleAssignments);
  const query = constructElasticSearchQuery(caseIdList, 0, 10000);
  const body = JSON.stringify(query);

  proxyReq.setHeader('content-type', 'application/json');
  proxyReq.setHeader('content-length', body.length);

  proxyReq.write(body);
  delete req.body;
  proxyReq.end();
}

export function handleGetCasesRequest(proxyReq, req): void {
  const roleAssignments = req.session.casesRoleAssignments;
  // EUI-4579 - get list of case ids from role assignments
  // note - will need to be getting substantive roles in future
  const caseIdList = getCaseIdListFromRoles(roleAssignments);
  const query = constructElasticSearchQuery(caseIdList, 0, 10000);
  const body = JSON.stringify(query, null, 2);

  proxyReq.setHeader('content-type', 'application/json');
  proxyReq.setHeader('content-length', body.length);

  proxyReq.write(body);
  delete req.body;
  proxyReq.end();
}

export function handleGetMyCasesResponse(proxyRes, req, res, json): any {
  // note: body not currently being passed in as function only used for my cases
  const caseData = json.cases;
  json.total_records = json.cases.length;
  // search parameters passed in as null as there are no parameters for my cases
  const userIsCaseAllocator = checkIfCaseAllocator(null, null, req);
  let checkedRoles = req && req.session && req.session.roleAssignmentResponse ? req.session.roleAssignmentResponse : null;
  if (showFeature(FEATURE_SUBSTANTIVE_ROLE_ENABLED)) {
    checkedRoles = getSubstantiveRoles(req.session.roleAssignmentResponse);
  }
  const mappedCases = checkedRoles ? mapCasesFromData(caseData, checkedRoles, null) : [];
  json.cases = assignActionsToCases(mappedCases, userIsCaseAllocator, true);
  return json;
}

export function handleGetCasesResponse(proxyRes, req, res, json): any {
  // note: body not currently being passed in as function only used for my cases
  const caseData = json.cases;
  json.total_records = json.cases.length;
  // search parameters passed in as null as there are no parameters for my cases
  const userIsCaseAllocator = checkIfCaseAllocator(null, null, req);
  let checkedRoles = req && req.session && req.session.casesRoleAssignments ? req.session.casesRoleAssignments : null;
  if (showFeature(FEATURE_SUBSTANTIVE_ROLE_ENABLED)) {
    checkedRoles = getSubstantiveRoles(req.session.casesRoleAssignments);
  }
  const mappedCases = checkedRoles ? mapCasesFromData(caseData, checkedRoles, req.session.casesPagination) : [];
  json.cases = assignActionsToCases(mappedCases, userIsCaseAllocator, true);
  return json;
}

/**
 * Post to search for a Task.
 */
export async function searchTask(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const searchRequest = req.body.searchRequest;
    const view = req.body.view;
    const currentUser = req.body.currentUser ? req.body.currentUser : '';
    let promise;
    if (searchRequest.search_by === 'judge') {
      // TODO below call mock api will be replaced when real api is ready
      if (view === 'MyTasks') {
        const basePath = prepareSearchTaskUrl(baseWorkAllocationTaskUrl, 'myTasks?view=judicial');
        const postTaskPath = preparePaginationUrl(req, basePath);
        promise = await handlePost(postTaskPath, searchRequest, req);
      } else if (view === 'AvailableTasks') {
        const basePath = prepareSearchTaskUrl(baseWorkAllocationTaskUrl, 'availableTasks?view=judicial');
        const postTaskPath = preparePaginationUrl(req, basePath);
        promise = await handlePost(postTaskPath, searchRequest, req);
      } else {
        const basePath = prepareSearchTaskUrl(baseWorkAllocationTaskUrl, 'allTasks?view=judicial');
        const postTaskPath = preparePaginationUrl(req, basePath);
        promise = await handlePost(postTaskPath, searchRequest, req);
      }
    } else {
      if (view === 'MyTasks') {
        const basePath = prepareSearchTaskUrl(baseWorkAllocationTaskUrl, 'myTasks?view=caseworker');
        const postTaskPath = preparePaginationUrl(req, basePath);
        promise = await handlePost(postTaskPath, searchRequest, req);
      } else if (view === 'AvailableTasks') {
        const basePath = prepareSearchTaskUrl(baseWorkAllocationTaskUrl, 'availableTasks?view=caseworker');
        const postTaskPath = preparePaginationUrl(req, basePath);
        promise = await handlePost(postTaskPath, searchRequest, req);
      } else {
        const basePath = prepareSearchTaskUrl(baseWorkAllocationTaskUrl, 'allTasks?view=caseworker');
        const postTaskPath = preparePaginationUrl(req, basePath);
        promise = await handlePost(postTaskPath, searchRequest, req);
      }
    }
    const {status, data} = promise;
    res.status(status);
    // Assign actions to the tasks on the data from the API.
    let returnData;
    if (data) {
      // Note: TaskPermission placed in here is an example of what we could be getting (i.e. Manage permission)
      // These should be mocked as if we were getting them from the user themselves
      returnData = {tasks: assignActionsToTasks(data.tasks, req.body.view, currentUser), total_records: data.total_records};
    }

    // Send the (possibly modified) data back in the Response.
    res.send(returnData);
  } catch (error) {
    next(error);
  }
}

export async function getTasksByCaseId(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const caseId = req.params.caseId;
  try {
    const {status, data} = await handleGetTasksByCaseId(`${baseWorkAllocationTaskUrl}/task/${caseId}`, req);
    return res.send(data as TaskList).status(status);
  } catch (e) {
    next(e);
  }
}

/**
 * Post to invoke an action on a Task.
 */
export async function postTaskAction(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getTaskPath: string = preparePostTaskUrlAction(baseWorkAllocationTaskUrl, req.params.taskId, req.params.action);
    const {status, data} = await handlePost(getTaskPath, req.body, req);
    res.status(status);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * Get All CaseWorkers
 */
export async function getAllCaseWorkers(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const caseworkers: Caseworker[] = await retrieveAllCaseWorkers(req, res);
    res.status(200);
    res.send(caseworkers);
  } catch (error) {
    next(error);
  }
}

export async function retrieveAllCaseWorkers(req: EnhancedRequest, res: Response): Promise<Caseworker[]> {
  if (req.session && req.session.caseworkers) {
    return req.session.caseworkers;
  }
  const roleApiPath: string = prepareRoleApiUrl(baseRoleAssignmentUrl);
  const payload = prepareRoleApiRequest();
  const {data} = await handlePostRoleAssignments(roleApiPath, payload, req);
  const userIds = getUserIdsFromRoleApiResponse(data);
  const userUrl = `${baseCaseWorkerRefUrl}/refdata/case-worker/users/fetchUsersById`;
  const userResponse = await handlePostCaseWorkersRefData(userUrl, userIds, req);
  const caseWorkerReferenceData = mapCaseworkerData(userResponse.data, data.roleAssignmentResponse);
  req.session.caseworkers = caseWorkerReferenceData;
  return caseWorkerReferenceData;
}

/**
 * Get All JudicialWorkers
 */
export async function getAllJudicialWorkers(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const judicialWorkers: any[] = await retrieveAllJudicialWorkers();
    res.status(200);
    res.send(judicialWorkers);
  } catch (error) {
    next(error);
  }
}

export async function retrieveAllJudicialWorkers(): Promise<any[]> {
  return new Promise<any[]>(resolve => {
    setTimeout(() => {
      resolve(JUDICIAL_WORKERS_LOCATIONS);
    }, 0);
  });
}

/**
 * Get CaseWorkers for Location
 */
export async function getAllCaseWorkersForLocation(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getCaseWorkerPath: string = prepareCaseWorkerForLocation(baseCaseWorkerRefUrl, req.params.locationId);

    const jsonResponse = await handleCaseWorkerForLocation(getCaseWorkerPath, req);
    res.status(200);
    res.send(jsonResponse);
  } catch (error) {
    next(error);
  }
}

/**
 * Get CaseWorkers for Service
 */
export async function getCaseWorkersForService(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getCaseWorkerPath: string = prepareCaseWorkerForService(baseUrl, req.params.serviceId);

    const jsonResponse = await handleCaseWorkerForService(getCaseWorkerPath, req);
    res.status(200);
    res.send(jsonResponse);
  } catch (error) {
    next(error);
  }
}

/**
 * Get CaseWorkers for Location and Service
 */
export async function getCaseWorkersForLocationAndService(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    // tslint:disable-next-line:max-line-length
    const getCaseWorkerPath: string = prepareCaseWorkerForLocationAndService(baseUrl, req.params.locationId, req.params.serviceId);
    const jsonResponse = await handleCaseWorkerForLocationAndService(getCaseWorkerPath, req);
    res.status(200);
    res.send(jsonResponse);
  } catch (error) {
    next(error);
  }
}

/**
 * Post to search for a Caseworker.
 */
export async function searchCaseWorker(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const postTaskPath: string = prepareCaseWorkerSearchUrl(baseUrl);

    const {status, data} = await handlePostSearch(postTaskPath, req.body, req);
    res.status(status);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

export async function postTaskSearchForCompletable(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const postTaskPath: string = prepareTaskSearchForCompletable(baseWorkAllocationTaskUrl);
    const reqBody = {
      'case_id': req.body.searchRequest.ccdId,
      'case_jurisdiction': req.body.searchRequest.jurisdiction,
      'case_type': req.body.searchRequest.caseTypeId,
      'event_id': req.body.searchRequest.eventId,
    };
    const {status, data} = await handlePostSearch(postTaskPath, reqBody, req);
    res.status(status);
    res.send(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getRolesCategory(req: EnhancedRequest, res: Response, next: NextFunction) {
  const personRoles = [
    {roleId: 'judicial', roleName: 'Judicial'},
    {roleId: 'legalOps', roleName: 'Legal Ops'},
    {roleId: 'admin', roleName: 'Admin'}];
  return res.send(personRoles).status(200);
}

export async function showAllocateRoleLink(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const jurisdiction = req.params.jurisdiction;
  const caseLocationId = req.params.caseLocationId;
  try {
    const result: boolean = checkIfCaseAllocator(jurisdiction, caseLocationId, req);
    return res.send(result).status(200);
  } catch (e) {
    next(e);
  }
}
