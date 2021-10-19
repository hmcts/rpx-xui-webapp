import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { sendPost } from '../common/crudService';
import { handleGet, handlePost } from '../common/mockService';
import { getConfigValue } from '../configuration';
import {
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
  handlePostRoleAssingnments,
  handlePostSearch
} from './caseWorkerService';
import { JUDICIAL_WORKERS_LOCATIONS } from './constants/mock.data';
import { Caseworker } from './interfaces/common';
import { TaskList } from './interfaces/task';
import { checkIfCaseAllocator, refineRoleAssignments } from './roleService';
import * as roleServiceMock from './roleService.mock';
import { handleGetTasksByCaseId, handleTaskSearch } from './taskService';
import * as taskServiceMock from './taskService.mock';
import {
  assignActionsToCases,
  assignActionsToTasks,
  getCaseIdListFromRoles,
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
  prepareSearchCaseUrl,
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

/**
 * Post to search for a Case.
 */
export async function searchCase(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const searchRequest = req.body.searchRequest;
    const view = req.body.view;
    const roleAssignments = req.session.roleAssignmentResponse;
    // EUI-4579 - get list of case ids from role assignments
    // note - will need to be getting substantive roles in future
    // tslint:disable-next-line
    const caseIdList = getCaseIdListFromRoles(roleAssignments);
    let basePath = '';
    // TODO below call mock api will be replaced when real api is ready
    if (view === 'MyCases') {
      basePath = prepareSearchCaseUrl(baseWorkAllocationTaskUrl, `myCases?view=${searchRequest.search_by}`);
    } else if (view === 'AllWorkCases') {
      basePath = prepareSearchCaseUrl(baseWorkAllocationTaskUrl, `allWorkCases?view=${searchRequest.search_by}`);
    }
    const searchMap = {};
    searchRequest.search_parameters.forEach(item => {
      if (item.operator === 'EQUAL') {
        searchMap[item.key] = item.values;
      }
    });

    const postCasePath = preparePaginationUrl(req, basePath);
    const promise = await handlePost(postCasePath, searchRequest, req);

    const {status, data} = promise;
    res.status(status);
    // Assign actions to the cases on the data from the API.
    let returnData;
    if (data) {
      // @ts-ignore
      const isCaseAllocator: boolean = checkIfCaseAllocator(searchMap.jurisdiction, searchMap.location, req);
      returnData = {cases: assignActionsToCases(data.cases, req.body.view, isCaseAllocator), total_records: data.total_records};
    }

    // Send the (possibly modified) data back in the Response.
    res.send(returnData);
  } catch (error) {
    next(error);
  }
}

/**
 * Post to search for a Task.
 */
export async function searchTask(req: EnhancedRequest, res: Response, next: NextFunction) {
    try {
      const basePath: string = prepareSearchTaskUrl(baseWorkAllocationTaskUrl);
      const postTaskPath = preparePaginationUrl(req, basePath);
      const searchRequest = req.body.searchRequest;
      const { status, data } = await handleTaskSearch(postTaskPath, searchRequest, req);
      res.status(status);
      // Assign actions to the tasks on the data from the API.
      // if (data) {
      //   assignActionsToTasks(data.tasks, req.body.view);
      // }

      // Send the (possibly modified) data back in the Response.
      res.send(data);
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
  const {data} = await handlePostRoleAssingnments(roleApiPath, payload, req);
  const userIds = getUserIdsFromRoleApiResponse(data);
  const userUrl = `${baseCaseWorkerRefUrl}/refdata/case-worker/users/fetchUsersById`;
  const userResponse = await handlePostCaseWorkersRefData(userUrl, userIds, req);
  const caseWorkerReferenceData = mapCaseworkerData(userResponse.data);
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

export async function getRolesByCaseId(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const caseId = req.params.caseId;
  try {
    const basePath = `${baseRoleAssignmentUrl}/am/role-assignments/query`;
    const roleAssignmentsBody = {
      attributes: {
        caseId: [caseId],
      },
    };
    const response: AxiosResponse = await sendPost(basePath, roleAssignmentsBody, req);
    const {status, data} = response;
    const refinedData = refineRoleAssignments(data);
    return res.status(status).send(refinedData);
  } catch (e) {
    next(e);
  }
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
