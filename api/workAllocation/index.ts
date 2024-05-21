import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { UserInfo } from '../auth/interfaces/UserInfo';
import { getConfigValue, showFeature } from '../configuration';
import {
  FEATURE_SUBSTANTIVE_ROLE_ENABLED,
  SERVICES_CASE_CASEWORKER_REF_PATH,
  SERVICES_CASE_JUDICIALWORKER_REF_PATH,
  SERVICES_ROLE_ASSIGNMENT_API_PATH,
  SERVICES_WORK_ALLOCATION_TASK_API_PATH
} from '../configuration/references';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { Role } from '../roleAccess/models/roleType';
import { getAllRoles } from '../roleAccess/roleAssignmentService';
import { refreshRoleAssignmentForUser } from '../user';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { getWASupportedJurisdictionsList } from '../waSupportedJurisdictions';
import * as caseServiceMock from './caseService.mock';
import {
  getUserIdsFromJurisdictionRoleResponse,
  getUserIdsFromRoleApiResponse,
  handleCaseWorkerForLocation,
  handleCaseWorkerForLocationAndService,
  handleCaseWorkerForService,
  handleCaseWorkersForServicesPost,
  handlePostCaseWorkersRefData,
  handlePostRoleAssignments,
  handlePostSearch
} from './caseWorkerService';
import { ViewType } from './constants/actions';
import { CaseList } from './interfaces/case';
import { PaginationParameter } from './interfaces/caseSearchParameter';
import { CaseworkerPayload, ServiceCaseworkerData } from './interfaces/caseworkerPayload';
import { CaseDataType, Caseworker, CaseworkersByService } from './interfaces/common';
import { SearchTaskParameter } from './interfaces/taskSearchParameter';
import { checkIfCaseAllocator } from './roleService';
import * as roleServiceMock from './roleService.mock';
import { handleTaskGet, handleTaskPost, handleTaskRolesGet, handleTaskSearch } from './taskService';
import {
  assignActionsToCases,
  assignActionsToUpdatedTasks,
  constructElasticSearchQuery,
  constructRoleAssignmentQuery,
  filterByLocationId,
  getCaseIdListFromRoles,
  getCaseworkerDataForServices,
  getMyAccessMappedCaseList,
  getRoleAssignmentsByQuery,
  getSessionCaseworkerInfo,
  getSubstantiveRoles,
  getTypesOfWorkByUserId,
  getUniqueCasesCount,
  handlePost,
  mapCasesFromData,
  mapCaseworkerData,
  paginate,
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
  prepareServiceRoleApiRequest,
  prepareTaskSearchForCompletable,
  searchCasesById
} from './util';
import { trackTrace } from '../lib/appInsights';

caseServiceMock.init();
roleServiceMock.init();

export const baseWorkAllocationTaskUrl = getConfigValue(SERVICES_WORK_ALLOCATION_TASK_API_PATH);
export const baseCaseWorkerRefUrl = getConfigValue(SERVICES_CASE_CASEWORKER_REF_PATH);
export const baseJudicialWorkerRefUrl = getConfigValue(SERVICES_CASE_JUDICIALWORKER_REF_PATH);
export const baseRoleAssignmentUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
export const baseUrl: string = 'http://localhost:8080';

const logger: JUILogger = log4jui.getLogger('workallocation');

/**
 * getTask
 */
export async function getTask(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const getTaskPath: string = prepareGetTaskUrl(baseWorkAllocationTaskUrl, req.params.taskId);
    // Adding log in app insights for task completion journey
    trackTrace(`get task Id: ${req.params.taskId}`, { functionCall: 'getTask' });
    const jsonResponse = await handleTaskGet(getTaskPath, req);
    if (jsonResponse && jsonResponse.task && jsonResponse.task.due_date) {
      jsonResponse.task.dueDate = jsonResponse.task.due_date;
    }
    res.status(200);
    res.send(jsonResponse);
  } catch (error) {
    next(error);
  }
}

/**
 * getTask
 */
export async function getTypesOfWork(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const path: string = `${baseWorkAllocationTaskUrl}/work-types?filter-by-user=true`;
    const response = await getTypesOfWorkByUserId(path, req);
    let typesOfWork = [];
    if (response && response.work_types) {
      typesOfWork = response.work_types.map((work) => ({ key: work.id, label: work.label }));
    }
    res.status(200);
    res.send(typesOfWork);
  } catch (error) {
    next(error);
  }
}

/**
 * getTask
 */
export async function getTaskRoles(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const taskId = req.params.taskId;
    const path = `${baseWorkAllocationTaskUrl}/task/${taskId}/roles`;
    const { status, data } = await handleTaskRolesGet(path, req);
    res.status(status);
    res.send(data.roles);
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
    // determines whether should use release 3 or release 4 permission logic
    searchRequest.sorting_parameters.find((sort, index) => {
      if (sort.sort_by === 'priority') {
        searchRequest.sorting_parameters.splice(index, 1);
      }
    });
    const sortParam = searchRequest.sorting_parameters.find((sort) => sort.sort_by === 'created_date');
    if (sortParam) {
      sortParam.sort_by = 'dueDate';
    }
    delete searchRequest.pagination_parameters;
    delete searchRequest.search_by;

    const { status, data } = await handleTaskSearch(postTaskPath, searchRequest, req);
    const currentUser = req.body.currentUser ? req.body.currentUser : '';
    res.status(status);
    // Assign actions to the tasks on the data from the API.
    let returnData;
    if (data) {
      returnData = {
        tasks: assignActionsToUpdatedTasks(data.tasks, req.body.view, currentUser),
        total_records: data.total_records
      };
    }
    res.send(returnData);
  } catch (error) {
    next(error);
  }
}

export async function getTasksByCaseId(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const caseId = req.params.caseId;
  const basePath: string = prepareSearchTaskUrl(baseWorkAllocationTaskUrl);
  const searchRequest = {
    search_parameters: [
      {
        key: 'caseId',
        operator: 'IN',
        values: [
          caseId
        ]
      },
      {
        key: 'state',
        operator: 'IN',
        values: [
          'assigned',
          'unassigned'
        ]
      }
    ],
    sorting_parameters: [
      {
        sort_by: 'due_date',
        sort_order: 'asc'
      }
    ]
  };
  try {
    const { status, data } = await handleTaskSearch(`${basePath}`, searchRequest, req);
    const currentUser: UserInfo = req.session.passport.user.userinfo;
    const currentUserId = currentUser.id ? currentUser.id : currentUser.uid;
    const actionedTasks = assignActionsToUpdatedTasks(data.tasks, ViewType.ACTIVE_TASKS, currentUserId);
    return res.send(actionedTasks).status(status);
  } catch (e) {
    next(e);
  }
}

export async function getTasksByCaseIdAndEventId(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const caseId = req.params.caseId;
  const eventId = req.params.eventId;
  const caseType = req.params.caseType;
  const jurisdiction = req.params.jurisdiction;
  const traceProps = { functionCall: 'getTasksByCaseIdAndEventId' };
  try {
    const payload = { case_id: caseId, event_id: eventId, case_jurisdiction: jurisdiction, case_type: caseType };
    const jurisdictions = getWASupportedJurisdictionsList();
    // Adding log in app insights for task completion journey
    trackTrace(`Search for completable task of eventId and caseId: ${eventId} ${caseId}`, traceProps);
    const { status, data } = jurisdictions.includes(jurisdiction)
      ? await handlePost(`${baseWorkAllocationTaskUrl}/task/search-for-completable`, payload, req)
      : { status: 200, data: [] };
    return res.status(status).send(data);
  } catch (e) {
    trackTrace(`Error calling /task/search-for-completable ${e.toString()}`, traceProps);
    next(e);
  }
}

/**
 * Post to invoke an action on a Task.
 */
export async function postTaskAction(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    // Additional setting to mark unassigned tasks as done - need to assign task before completing
    if (req.body.hasNoAssigneeOnComplete === true) {
      req.body = {
        completion_options: {
          assign_and_complete: true
        }
      };
    } else {
      delete req.body.hasNoAssigneeOnComplete;
    }
    const getTaskPath: string = preparePostTaskUrlAction(baseWorkAllocationTaskUrl, req.params.taskId, req.params.action);

    trackTrace(`${req.params.action} of task Id: ${req.params.taskId} ${req.params.action}`, { functionCall: 'postTaskAction' });
    const { status, data } = await handleTaskPost(getTaskPath, req.body, req);
    res.status(status);
    res.send(data);
  } catch (error) {
    // 5528 - removed error handling for 403 errors
    next(error);
  }
}

/**
 * Post to invoke an action on a Task.
 */
export async function postTaskCompletionForAccess(req: EnhancedRequest, res: Response, next: NextFunction): Promise<AxiosResponse> {
  try {
    // Additional setting to mark unassigned tasks as done - need to assign task before completing
    const newRequest = {
      completion_options: {
        assign_and_complete: true
      }
    };
    // line added as requests are different for approval/rejection
    const taskId = req.body.specificAccessStateData ? req.body.specificAccessStateData.taskId : req.body.taskId;
    const getTaskPath: string =
      preparePostTaskUrlAction(baseWorkAllocationTaskUrl, taskId, 'complete');
    return await handleTaskPost(getTaskPath, newRequest, req);
  } catch (error) {
    next(error);
    return error;
  }
}

/**
 * Get All CaseWorkers
 */
export async function getAllCaseWorkers(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const caseworkers: Caseworker[] = await retrieveAllCaseWorkers(req);
    res.status(200);
    res.send(caseworkers);
  } catch (error) {
    next(error);
  }
}

/**
 * Get All CaseWorkers
 */
export async function getCaseWorkersFromServices(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const caseworkersByService: CaseworkersByService[] = await retrieveCaseWorkersForServices(req);
    res.status(200);
    res.send(caseworkersByService);
  } catch (error) {
    next(error);
  }
}

export async function retrieveAllCaseWorkers(req: EnhancedRequest): Promise<Caseworker[]> {
  if (req.session && req.session.caseworkers) {
    return req.session.caseworkers;
  }
  const roleApiPath: string = prepareRoleApiUrl(baseRoleAssignmentUrl);
  const jurisdictions = getWASupportedJurisdictionsList();
  const payload = prepareRoleApiRequest(jurisdictions);
  const { data } = await handlePostRoleAssignments(roleApiPath, payload, req);
  const userIds = getUserIdsFromRoleApiResponse(data);
  const userUrl = `${baseCaseWorkerRefUrl}/refdata/case-worker/users/fetchUsersById`;
  const userResponse = await handlePostCaseWorkersRefData(userUrl, userIds, req);
  const caseWorkerReferenceData = mapCaseworkerData(userResponse.data, data.roleAssignmentResponse);
  req.session.caseworkers = caseWorkerReferenceData;
  return caseWorkerReferenceData;
}

// similar as above but checks services
export async function retrieveCaseWorkersForServices(req: EnhancedRequest): Promise<CaseworkersByService[]> {
  const roleApiPath: string = prepareRoleApiUrl(baseRoleAssignmentUrl);
  const jurisdictions = req.body.serviceIds as string[];
  // will need to check specific jurisdiction have caseworkers in session
  let newJurisdictions: string[];
  let sessionCaseworkersByService: CaseworkersByService[] = [];
  if (req.session && req.session.caseworkersByService) {
    const sessionCaseworkerInfo = getSessionCaseworkerInfo(jurisdictions, req.session.caseworkersByService);
    newJurisdictions = sessionCaseworkerInfo[0];
    sessionCaseworkersByService = sessionCaseworkerInfo[1];
  }
  if (!newJurisdictions) {
    // if there is no new jurisdictions array then there is no session - use given jurisdictions to get caseworker data
    newJurisdictions = jurisdictions;
  } else if (newJurisdictions.length === 0) {
    // if the array is empty then all services are in the session - use session data
    return sessionCaseworkersByService;
  }
  const roleResponse = await getAllRoles(req); // get the roles from the endpoint
  const roles: Role[] = roleResponse.data;
  const payloads: CaseworkerPayload[] = prepareServiceRoleApiRequest(newJurisdictions, roles);
  const data: ServiceCaseworkerData[] = await handleCaseWorkersForServicesPost(roleApiPath, payloads, req);
  const userIdsByJurisdiction = getUserIdsFromJurisdictionRoleResponse(data);
  if (userIdsByJurisdiction.length === 0) {
    return sessionCaseworkersByService;
  }
  const userUrl = `${baseCaseWorkerRefUrl}/refdata/case-worker/users/fetchUsersById`;
  const fullCaseworkerByServiceInfo = [];
  const userResponse = await handlePostCaseWorkersRefData(userUrl, userIdsByJurisdiction, req);
  userResponse.forEach((userList) => {
    const jurisdictionData = data.find((caseworkerData) => caseworkerData.jurisdiction === userList.jurisdiction);
    const caseWorkerReferenceData = getCaseworkerDataForServices(userList.data, jurisdictionData);
    // note have to merge any new service caseworker data for full session as well as services specified in params
    fullCaseworkerByServiceInfo.push(caseWorkerReferenceData);
  });
  req.session.caseworkersByService = req.session && req.session.caseworkersByService ?
    [...req.session.caseworkersByService, ...fullCaseworkerByServiceInfo] : fullCaseworkerByServiceInfo;
  return fullCaseworkerByServiceInfo;
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
    const getCaseWorkerPath: string = prepareCaseWorkerForService(baseCaseWorkerRefUrl, req.params.serviceId);
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
    const { status, data } = await handlePostSearch(postTaskPath, req.body, req);
    res.status(status);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

export async function postTaskSearchForCompletable(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const jurisdictions = getWASupportedJurisdictionsList();
    const postTaskPath: string = prepareTaskSearchForCompletable(baseWorkAllocationTaskUrl);
    const reqBody = {
      'case_id': req.body.searchRequest.ccdId,
      'case_jurisdiction': req.body.searchRequest.jurisdiction,
      'case_type': req.body.searchRequest.caseTypeId,
      'event_id': req.body.searchRequest.eventId
    };
    const { status, data } = jurisdictions.includes(req.body.searchRequest.jurisdiction)
      ? await handlePostSearch(postTaskPath, reqBody, req)
      : { status: 200, data: [] };
    res.status(status);
    res.send(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getRolesCategory(req: EnhancedRequest, res: Response) {
  const personRoles = [
    { roleId: 'judicial', roleName: 'Judicial' },
    { roleId: 'legalOps', roleName: 'Legal Ops' },
    { roleId: 'admin', roleName: 'Admin' }];
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

export function getCaseListPromises(data: CaseDataType, req: EnhancedRequest): Promise<CaseList>[] {
  const casePromises: Promise<CaseList>[] = [];
  for (const jurisdiction in data) {
    if (data.hasOwnProperty(jurisdiction)) {
      for (const caseType in data[jurisdiction]) {
        if (data[jurisdiction].hasOwnProperty(caseType)) {
          const queries = constructElasticSearchQuery(Array.from(data[jurisdiction][caseType]), 0, 10000);
          queries.forEach((query) => {
            casePromises.push(searchCasesById(caseType, query, req));
          });
        }
      }
    }
  }
  return casePromises;
}

export async function getMyAccess(req: EnhancedRequest, res: Response): Promise<Response> {
  await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);

  const roleAssignments = req.session.roleAssignmentResponse as RoleAssignment[];
  const mappedCases = await getMyAccessMappedCaseList(roleAssignments, req);

  const result = {
    cases: mappedCases,
    total_records: 0,
    unique_cases: 0
  };
  return res.send(result).status(200);
}

export async function getMyCases(req: EnhancedRequest, res: Response): Promise<Response> {
  try {
    const roleAssignments: RoleAssignment[] = req.session.roleAssignmentResponse;

    // get 'service' and 'location' filters from search_parameters on request
    const { search_parameters } = req.body.searchRequest;
    const services = search_parameters.find((searchParam) => searchParam.key === 'services');
    const locations = search_parameters.find((searchParam) => searchParam.key === 'locations');

    let serviceIds = [];
    let locationIds = [];
    if (services && services.hasOwnProperty('values')) {
      serviceIds = services.values;
    }
    if (locations && locations.hasOwnProperty('values')) {
      locationIds = locations.values;
    }

    // filter role assignments by service id(s)
    const filteredRoleAssignments = roleAssignments.filter((roleAssignment) =>
      serviceIds.includes(roleAssignment.attributes.jurisdiction)
    );

    // get cases using either filteredRoleAssignments array or roleAssignments array if no serviceId filters are applied
    const cases = await getCaseIdListFromRoles(!serviceIds.length ? roleAssignments : filteredRoleAssignments, req);

    // search parameters passed in as null as there are no parameters for my cases
    const userIsCaseAllocator = checkIfCaseAllocator(null, null, req);
    let checkedRoles = req && req.session && req.session.roleAssignmentResponse ? req.session.roleAssignmentResponse : null;
    if (showFeature(FEATURE_SUBSTANTIVE_ROLE_ENABLED)) {
      checkedRoles = getSubstantiveRoles(roleAssignments as any) as any;
    }

    const result = {
      cases,
      total_records: 0,
      unique_cases: 0
    };

    // filter cases by locationIds
    const caseData = filterByLocationId(result.cases, locationIds);
    logger.info('results filtered by location id', caseData.length, locationIds);

    if (caseData) {
      const mappedCases = checkedRoles ? mapCasesFromData(caseData, checkedRoles as any) : [];
      result.total_records = mappedCases.length;
      result.unique_cases = getUniqueCasesCount(mappedCases);
      const sortedCaseList = mappedCases.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
      result.cases = assignActionsToCases(sortedCaseList, userIsCaseAllocator);
    }
    return res.send(result).status(200);
  } catch (e) {
    console.log(e);
    return res.send(null).status(500);
  }
}

export async function getCases(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const searchParameters = req.body.searchRequest.search_parameters as SearchTaskParameter[];
  const pagination = req.body.searchRequest.pagination_parameters as PaginationParameter;

  logger.info('getting all work cases', searchParameters);

  try {
    // get case allocator locations
    const locations = [];
    searchParameters.filter((param) => param.key === 'location_id').forEach((location) => {
      if (location.values !== '') {
        locations.push(location.values);
      }
    });

    // get all role assignments
    const query = constructRoleAssignmentQuery(searchParameters);
    logger.info('cases query', JSON.stringify(query, null, 2));
    const roleAssignmentResult = await getRoleAssignmentsByQuery(query, req);

    const cases = await getCaseIdListFromRoles(roleAssignmentResult.roleAssignmentResponse, req);

    const result = {
      cases,
      total_records: 0,
      unique_cases: 0
    };

    const caseData = filterByLocationId(result.cases, locations);
    logger.info('results filtered by location id', caseData.length);

    const userIsCaseAllocator = checkIfCaseAllocator(null, null, req);
    let checkedRoles = roleAssignmentResult.roleAssignmentResponse;
    if (showFeature(FEATURE_SUBSTANTIVE_ROLE_ENABLED)) {
      checkedRoles = getSubstantiveRoles(roleAssignmentResult.roleAssignmentResponse);
    }
    const mappedCases = checkedRoles ? mapCasesFromData(caseData, checkedRoles) : [];
    result.total_records = mappedCases.length;
    result.unique_cases = getUniqueCasesCount(mappedCases);
    const roleCaseList = pagination ? paginate(mappedCases, pagination.page_number, pagination.page_size) : mappedCases;
    result.cases = assignActionsToCases(roleCaseList, userIsCaseAllocator);
    return res.send(result).status(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getTaskNames(req: EnhancedRequest, res: Response): Promise<Response> {
  const service = req.body.service;
  const response = await handleTaskGet(`${baseWorkAllocationTaskUrl}/task/task-types?jurisdiction=${service}`, req);

  return res.send(response.task_types).status(200);
}
