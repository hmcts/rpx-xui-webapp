import { NextFunction, Response } from 'express';
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
import { getWASupportedJurisdictionsList } from '../waSupportedJurisdictions';
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
import { PaginationParameter } from './interfaces/caseSearchParameter';
import { Caseworker } from './interfaces/common';
import { TaskList } from './interfaces/task';
import { SearchTaskParameter } from './interfaces/taskSearchParameter';
import { checkIfCaseAllocator } from './roleService';
import * as roleServiceMock from './roleService.mock';
import { handleTaskGet, handleTaskPost, handleTaskRolesGet, handleTaskSearch } from './taskService';
import {
  assignActionsToCases,
  assignActionsToTasks,
  constructElasticSearchQuery,
  constructRoleAssignmentCaseAllocatorQuery,
  constructRoleAssignmentQuery,
  filterByLocationId,
  getCaseIdListFromRoles,
  getCaseTypesFromRoleAssignments,
  getRoleAssignmentsByQuery,
  getSubstantiveRoles,
  getTypesOfWorkByUserId,
  getUniqueCasesCount,
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
  prepareTaskSearchForCompletable,
  removeEmptyValues,
  searchCasesById
} from './util';

caseServiceMock.init();
roleServiceMock.init();

export const baseWorkAllocationTaskUrl = getConfigValue(SERVICES_WORK_ALLOCATION_TASK_API_PATH);
export const baseCaseWorkerRefUrl = getConfigValue(SERVICES_CASE_CASEWORKER_REF_PATH);
export const baseJudicialWorkerRefUrl = getConfigValue(SERVICES_CASE_JUDICIALWORKER_REF_PATH);
export const baseRoleAssignmentUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
export const baseUrl: string = 'http://localhost:8080';

const logger: JUILogger = log4jui.getLogger('workallocation2');

/**
 * getTask
 */
export async function getTask(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const getTaskPath: string = prepareGetTaskUrl(baseWorkAllocationTaskUrl, req.params.taskId);

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
    const path: string = `${baseWorkAllocationTaskUrl}/work-types?filter-by-user=false`;
    const response = await getTypesOfWorkByUserId(path, req);
    let typesOfWork = [];
    if (response && response.work_types) {
      typesOfWork = response.work_types.map(work => ({key: work.id, label: work.label}));
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
    const {status, data} = await handleTaskRolesGet(path, req);
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
    const searchRequest = {
      ...req.body.searchRequest, search_parameters: removeEmptyValues(req.body.searchRequest.search_parameters),
    };
    // filter out task type from search parameters as not currently available until release 2.1
    searchRequest.search_parameters = searchRequest.search_parameters.filter(
      searchParam => searchParam.key !== 'taskType'
    );
    const sortParam = searchRequest.sorting_parameters.find(sort => sort.sort_by === 'created_date');
    if (sortParam) {
      sortParam.sort_by = 'dueDate';
    }
    delete searchRequest.pagination_parameters;
    const {status, data} = await handleTaskSearch(postTaskPath, searchRequest, req);
    const currentUser = req.body.currentUser ? req.body.currentUser : '';
    res.status(status);
    // Assign actions to the tasks on the data from the API.
    let returnData;
    if (data) {
      // Note: TaskPermission placed in here is an example of what we could be getting (i.e. Manage permission)
      // These should be mocked as if we were getting them from the user themselves
      returnData = {tasks: assignActionsToTasks(data.tasks, req.body.view, currentUser), total_records: data.total_records};
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
          caseId,
        ],
      },
      {
        key: 'state',
        operator: 'IN',
        values: [
          'assigned',
          'unassigned',
        ],
      },
    ],
    sorting_parameters: [
      {
        sort_by: 'due_date',
        sort_order: 'asc',
      },
    ],
    search_by: 'caseworker',
  };
  try {
    const {status, data} = await handleTaskSearch(`${basePath}`, searchRequest, req);
    return res.send(data.tasks as TaskList).status(status);
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
    const {status, data} = await handleTaskPost(getTaskPath, req.body, req);
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
    const caseworkers: Caseworker[] = await retrieveAllCaseWorkers(req);
    res.status(200);
    res.send(caseworkers);
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
  const {data} = await handlePostRoleAssignments(roleApiPath, payload, req);
  const userIds = getUserIdsFromRoleApiResponse(data);
  const userUrl = `${baseCaseWorkerRefUrl}/refdata/case-worker/users/fetchUsersById`;
  const userResponse = await handlePostCaseWorkersRefData(userUrl, userIds, req);
  const caseWorkerReferenceData = mapCaseworkerData(userResponse.data, data.roleAssignmentResponse);
  req.session.caseworkers = caseWorkerReferenceData;
  return caseWorkerReferenceData;
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

export async function getRolesCategory(req: EnhancedRequest, res: Response) {
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

export async function getMyCases(req: EnhancedRequest, res: Response) {
  const roleAssignments = req.session.roleAssignmentResponse;
  const caseTypes: string = getCaseTypesFromRoleAssignments(roleAssignments);
  const queryParams = caseTypes && caseTypes.length ? caseTypes : 'Asylum';
  const caseIdList = getCaseIdListFromRoles(roleAssignments);
  const query = constructElasticSearchQuery(caseIdList, 0, 10000);

  try {
    const result = await searchCasesById(queryParams, query, req);
    if (result && result.cases) {
      const caseData = result.cases;
      // search parameters passed in as null as there are no parameters for my cases
      const userIsCaseAllocator = checkIfCaseAllocator(null, null, req);
      let checkedRoles = req && req.session && req.session.roleAssignmentResponse ? req.session.roleAssignmentResponse : null;
      if (showFeature(FEATURE_SUBSTANTIVE_ROLE_ENABLED)) {
        checkedRoles = getSubstantiveRoles(req.session.roleAssignmentResponse);
      }
      const mappedCases = checkedRoles ? mapCasesFromData(caseData, checkedRoles, null) : [];
      result.total_records = mappedCases.length;
      result.unique_cases = getUniqueCasesCount(mappedCases);
      // amount of unique cases already given by case id
      // result.unique_cases = caseIdList.length;
      result.cases = assignActionsToCases(mappedCases, userIsCaseAllocator);
      return res.send(result).status(200);
    } else {
      return res.send([]).status(200);
    }
  } catch (e) {
    console.log(e);
    return res.send(null).status(500);
  }
}

export async function getCases(req: EnhancedRequest, res: Response, next: NextFunction) {
  const searchParameters = req.body.searchRequest.search_parameters as SearchTaskParameter[];
  const pagination = req.body.searchRequest.pagination_parameters as PaginationParameter;

  logger.info('getting all work cases', searchParameters);

  try {

    // get users case allocations
    const caseAllocatorQuery = constructRoleAssignmentCaseAllocatorQuery(searchParameters, req);
    logger.info('case-allocator query', JSON.stringify(caseAllocatorQuery, null, 2));
    // get case allocator locations
    const locations = [];
    searchParameters.filter(param => param.key === 'location_id').forEach(location => {
      if (location.values !== '') {
        locations.push(location.values);
      }
    });

    // get all role assignments
    const query = constructRoleAssignmentQuery(searchParameters);
    logger.info('cases query', JSON.stringify(query, null, 2));
    const roleAssignmentResult = await getRoleAssignmentsByQuery(query, req);

    const caseTypes: string = getCaseTypesFromRoleAssignments(roleAssignmentResult.roleAssignmentResponse);
    const queryParams = caseTypes.length ? caseTypes : 'Asylum';

    logger.info('caseTypes', queryParams);

    // get the case ids from the role assignments
    const caseIdList = getCaseIdListFromRoles(roleAssignmentResult.roleAssignmentResponse);
    const esQuery = constructElasticSearchQuery(caseIdList, 0, 10000);

    logger.info('esQuery', JSON.stringify(esQuery, null, 2));

    const result = await searchCasesById(queryParams, esQuery, req);
    logger.info('elastic search results length ', result.cases.length);
    const caseData = filterByLocationId(result.cases, locations);
    logger.info('results filtered by location id', caseData.length);

    const userIsCaseAllocator = checkIfCaseAllocator(null, null, req);
    let checkedRoles = roleAssignmentResult.roleAssignmentResponse;
    if (showFeature(FEATURE_SUBSTANTIVE_ROLE_ENABLED)) {
      checkedRoles = getSubstantiveRoles(roleAssignmentResult.roleAssignmentResponse);
    }
    const mappedCases = checkedRoles ? mapCasesFromData(caseData, checkedRoles, pagination) : [];
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
