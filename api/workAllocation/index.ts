import { getConfigValue } from '../configuration';
import { NextFunction, Response } from 'express';

import { EnhancedRequest } from '../lib/models';
import {
  handleCaseWorkerForLocation,
  handleCaseWorkerForLocationAndService,
  handleCaseWorkerForService,
  handlePostRoleAssingnments,
  handlePostSearch,
  handlePostCaseWorkersRefData,
  getUserIdsFromRoleApiResponse
} from './caseWorkerService';
import { handleTaskGet, handleTaskPost, handleTaskSearch } from './taskService';
import {
  assignActionsToTasks,
  prepareCaseWorkerForLocation,
  prepareCaseWorkerForLocationAndService,
  prepareCaseWorkerForService,
  prepareCaseWorkerSearchUrl,
  prepareRoleApiUrl,
  prepareRoleApiRequest,
  prepareGetTaskUrl,
  preparePostTaskUrlAction,
  prepareSearchTaskUrl,
  mapCaseworkerData
} from './util';
import { SERVICES_WORK_ALLOCATION_TASK_API_PATH, SERVICES_ROLE_ASSIGNMENT_API_PATH, SERVICES_CASE_CASEWORKER_REF_PATH } from '../configuration/references'

export const baseUrl: string = 'http://localhost:8080'

/**
 * getTask
 */
export async function getTask(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getTaskPath: string = prepareGetTaskUrl(baseUrl, req.params.taskId)

    const jsonResponse = await handleTaskGet(getTaskPath, req)
    res.status(200)
    res.send(jsonResponse)
  } catch (error) {
    next(error)
  }
}

/**
 * Post to search for a Task.
 */
export async function searchTask(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const url = getConfigValue(SERVICES_WORK_ALLOCATION_TASK_API_PATH)
    const postTaskPath: string = prepareSearchTaskUrl(url);
    const searchRequest = req.body.searchRequest;
    const { status, data } = await handleTaskSearch(postTaskPath, searchRequest, req);
    res.status(status);

     // Assign actions to the tasks on the data from the API.
    if (data) {
      assignActionsToTasks(data.tasks, req.body.view);
    }

    // Send the (possibly modified) data back in the Response.
    res.send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * Post to invoke an action on a Task.
 */
export async function postTaskAction(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getTaskPath: string = preparePostTaskUrlAction(baseUrl, req.params.taskId, req.params.action)

    const { status, data } = await handleTaskPost(getTaskPath, req.body, req)
    res.status(status)
    res.send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * Get All CaseWorkers
 */
export async function getAllCaseWorkers(req: EnhancedRequest, res: Response, next: NextFunction) {  
  try {
    const roleApiBaseUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH)
    const roleApiPath: string = prepareRoleApiUrl(roleApiBaseUrl)
    const payload = prepareRoleApiRequest()
    const { status, data } = await handlePostRoleAssingnments(roleApiPath, payload, req)
    const userIds = getUserIdsFromRoleApiResponse(data)
    const caseWorkerRefBaseUrl = getConfigValue(SERVICES_CASE_CASEWORKER_REF_PATH)
    const userUrl = `${caseWorkerRefBaseUrl}refdata/case-worker/users/fetchUsersById`
    const userResponse = await handlePostCaseWorkersRefData(userUrl, userIds, req)
    const caseWorkerReferenceData = mapCaseworkerData(userResponse.data)
    res.status(userResponse.status)
    res.send(caseWorkerReferenceData)
  } catch (error) {
    next(error)
  }
}

/**
 * Get CaseWorkers for Location
 */
export async function getAllCaseWorkersForLocation(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getCaseWorkerPath: string = prepareCaseWorkerForLocation(baseUrl, req.params.locationId)

    const jsonResponse = await handleCaseWorkerForLocation(getCaseWorkerPath, req)
    res.status(200)
    res.send(jsonResponse)
  } catch (error) {
    next(error)
  }
}

/**
 * Get CaseWorkers for Service
 */
export async function getCaseWorkersForService(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getCaseWorkerPath: string = prepareCaseWorkerForService(baseUrl, req.params.serviceId)

    const jsonResponse = await handleCaseWorkerForService(getCaseWorkerPath, req)
    res.status(200)
    res.send(jsonResponse)
  } catch (error) {
    next(error)
  }
}

/**
 * Get CaseWorkers for Location and Service
 */
export async function getCaseWorkersForLocationAndService(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getCaseWorkerPath: string = prepareCaseWorkerForLocationAndService(baseUrl, req.params.locationId, req.params.serviceId)

    const jsonResponse = await handleCaseWorkerForLocationAndService(getCaseWorkerPath, req)
    res.status(200)
    res.send(jsonResponse)
  } catch (error) {
    next(error)
  }
}

/**
 * Post to search for a Caseworker.
 */
export async function searchCaseWorker(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const postTaskPath: string = prepareCaseWorkerSearchUrl(baseUrl)

    const { status, data } = await handlePostSearch(postTaskPath, req.body, req)
    res.status(status)
    res.send(data)
  } catch (error) {
    next(error)
  }
}
