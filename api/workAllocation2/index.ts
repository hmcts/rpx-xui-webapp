import { NextFunction, Response } from 'express';
import { handleGet, handlePost } from '../common/mockService';
import { getConfigValue } from '../configuration';
import {
  SERVICES_CASE_CASEWORKER_REF_PATH,
  SERVICES_CASE_JUDICIALWORKER_REF_PATH,
  SERVICES_ROLE_ASSIGNMENT_API_PATH,
  SERVICES_WORK_ALLOCATION_TASK_API_PATH
} from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import {
  getUserIdsFromRoleApiResponse,
  handleCaseWorkerForLocation,
  handleCaseWorkerForLocationAndService,
  handleCaseWorkerForService,
  handlePostCaseWorkersRefData,
  handlePostRoleAssingnments,
  handlePostSearch
} from './caseWorkerService';
import { Caseworker, Judicialworker } from './interfaces/task';
import * as mock from './taskService.mock';
import {
  assignActionsToTasks,
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

mock.init();

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
 * Post to search for a Task.
 */
export async function searchTask(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const searchRequest = req.body.searchRequest;
    const view = req.body.view;
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
      } else if (view === 'MyCases') {
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
      returnData = {tasks: assignActionsToTasks(data.tasks, req.body.view), total_records: data.total_records};
    }

    // Send the (possibly modified) data back in the Response.
    res.send(returnData);
  } catch (error) {
    next(error);
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
    const judicialworkers: Judicialworker[] = await retrieveAllJudicialWorkers(req, res);
    res.status(200);
    res.send(judicialworkers);
  } catch (error) {
    next(error);
  }
}

export async function retrieveAllJudicialWorkers(req: EnhancedRequest, res: Response): Promise<Judicialworker[]> {
  if (req.session && req.session.judicialWorkers) {
    return req.session.judicialWorkers;
  }
  const roleApiPath: string = prepareRoleApiUrl(baseRoleAssignmentUrl);
  const payload = prepareRoleApiRequest();
  const {data} = await handlePostRoleAssingnments(roleApiPath, payload, req);
  const userIds = getUserIdsFromRoleApiResponse(data);
  const userUrl = `${baseJudicialWorkerRefUrl}/judicialworkers/`;
  // const userResponse = await handlePostJudicialWorkersRefData(userUrl, userIds, req);
  const userResponse = await handlePost(userUrl, userIds, req);
  req.session.judicialWorkers = userResponse.data;
  return userResponse.data;
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
