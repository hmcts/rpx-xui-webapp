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
import { Role } from '../roleAccess/models/roleType';
import { getAllRoles } from '../roleAccess/roleAssignmentService';
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
import {CaseList} from './interfaces/case';
import { PaginationParameter } from './interfaces/caseSearchParameter';
import { CaseworkerPayload, ServiceCaseworkerData } from './interfaces/caseworkerPayload';
import {CaseDataType, Caseworker, CaseworkersByService} from './interfaces/common';
import { SearchTaskParameter } from './interfaces/taskSearchParameter';
import { checkIfCaseAllocator } from './roleService';
import * as roleServiceMock from './roleService.mock';
import { handleTaskGet, handleTaskPost, handleTaskRolesGet, handleTaskSearch } from './taskService';
import {
  assignActionsToCases,
  assignActionsToTasks,
  constructElasticSearchQuery,
  constructRoleAssignmentQuery,
  filterByLocationId,
  getCaseIdListFromRoles,
  getCaseworkerDataForServices,
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
import {RoleAssignment} from "../user/interfaces/roleAssignment";

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
    const path: string = `${baseWorkAllocationTaskUrl}/work-types?filter-by-user=true`;
    const response = await getTypesOfWorkByUserId(path, req);
    let typesOfWork = [];
    if (response && response.work_types) {
      typesOfWork = response.work_types.map(work => ({ key: work.id, label: work.label }));
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
    const sortParam = searchRequest.sorting_parameters.find(sort => sort.sort_by === 'created_date');
    if (sortParam) {
      sortParam.sort_by = 'dueDate';
    }
    delete searchRequest.pagination_parameters;
    const { status, data } = await handleTaskSearch(postTaskPath, searchRequest, req);
    const currentUser = req.body.currentUser ? req.body.currentUser : '';
    res.status(status);
    // Assign actions to the tasks on the data from the API.
    let returnData;
    if (data) {
      // Note: TaskPermission placed in here is an example of what we could be getting (i.e. Manage permission)
      // These should be mocked as if we were getting them from the user themselves
      returnData = { tasks: assignActionsToTasks(data.tasks, req.body.view, currentUser), total_records: data.total_records };
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
    const { status, data } = await handleTaskSearch(`${basePath}`, searchRequest, req);
    const currentUser = req.body.currentUser ? req.body.currentUser : '';
    const actionedTasks = assignActionsToTasks(data.tasks, ViewType.MY_TASKS, currentUser);
    return res.send(actionedTasks).status(status);
  } catch (e) {
    next(e);
  }
}

export async function getTasksByCaseIdAndEventId(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const caseId = req.params.caseId;
  const eventId = req.params.eventId;
  try {
    const payload = { caseId, eventId };
    const { status, data } = await handlePost(`${baseWorkAllocationTaskUrl}/task/search-for-completable`, payload, req);
    return res.send(data).status(status);
  } catch (e) {
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
           assign_and_complete: true,
         },
      }
    }
    const getTaskPath: string = preparePostTaskUrlAction(baseWorkAllocationTaskUrl, req.params.taskId, req.params.action);
    const { status, data } = await handleTaskPost(getTaskPath, req.body, req);
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

/**
 * Get All CaseWorkers
 */
export async function getCaseWorkersFromServices(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const caseworkersByService: CaseworkersByService[] = await retrieveCaseWorkersForServices(req, res);
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
export async function retrieveCaseWorkersForServices(req: EnhancedRequest, res: Response): Promise<CaseworkersByService[]> {
  const roleApiPath: string = prepareRoleApiUrl(baseRoleAssignmentUrl);
  const jurisdictions = req.body.serviceIds as string [];
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
  const userIds = getUserIdsFromJurisdictionRoleResponse(data);
  if (userIds.length === 0) {
    return sessionCaseworkersByService;
  }
  const userUrl = `${baseCaseWorkerRefUrl}/refdata/case-worker/users/fetchUsersById`;
  const userResponse = await handlePostCaseWorkersRefData(userUrl, userIds, req);

  const caseWorkerReferenceData = getCaseworkerDataForServices(userResponse.data, data);
  // note have to merge any new service caseworker data for full session as well as services specified in params
  req.session.caseworkersByService = req.session && req.session.caseworkersByService ?
    [...req.session.caseworkersByService, ...caseWorkerReferenceData] : caseWorkerReferenceData;
  const fullCaseworkerByServiceInfo = [...caseWorkerReferenceData, ...sessionCaseworkersByService];
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

    const { status, data } = await handlePostSearch(postTaskPath, req.body, req);
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
    const { status, data } = await handlePostSearch(postTaskPath, reqBody, req);
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

export function getCaseListPromises(data: CaseDataType, req: EnhancedRequest): Array<Promise<CaseList>> {
  const casePromises: Array<Promise<CaseList>> = [];
  for (const jurisdiction in data) {
    if (data.hasOwnProperty(jurisdiction)) {
      for (const caseType in data[jurisdiction]) {
        if (data[jurisdiction].hasOwnProperty(caseType)) {
          const query = constructElasticSearchQuery(Array.from(data[jurisdiction][caseType]), 0, 10000);
          casePromises.push(searchCasesById(caseType, query, req));
        }
      }
    }
  }
  return casePromises;
}

export async function getMyCases(req: EnhancedRequest, res: Response): Promise<Response> {
  try {
    // const roleAssignments = req.session.roleAssignmentResponse;
    const roleAssignments = [
      {
        "attributes": {
          "substantive": "Y",
          "caseId": "1546434148507684",
          "jurisdiction": "SSCS",
          "caseType": "Benefit",
        },
      },
      {
        "attributes": {
          "substantive": "Y",
          "caseId": "1546435182187994",
          "jurisdiction": "SSCS",
          "caseType": "Benefit",
        },
      },
      {
        "attributes": {
          "substantive": "Y",
          "caseId": "1546516296364486",
          "jurisdiction": "SSCS",
          "caseType": "Benefit",
        },
      },
      {
        "attributes": {
          "substantive": "Y",
          "caseId": "1546517036278754",
          "jurisdiction": "SSCS",
          "caseType": "Benefit",
        },
      },
      {
        "attributes": {
          "substantive": "Y",
          "caseId": "1546516815889666",
          "jurisdiction": "SSCS",
          "caseType": "Benefit",
        },
      },
      {
        "id": "b774a8a3-991f-4cb7-b69a-afb6857bb2cb",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "case-manager",
        "classification": "PUBLIC",
        "grantType": "SPECIFIC",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "beginTime": "2022-02-10T00:00:00Z",
        "created": "2022-02-10T12:28:07.477467Z",
        "attributes": {
          "substantive": "Y",
          "caseId": "1547458486131483",
          "jurisdiction": "IA",
          "caseType": "Asylum",
        },
      },
      {
        "id": "501e512b-de4a-495f-ac30-be1f5b259d1f",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "case-manager",
        "classification": "PUBLIC",
        "grantType": "SPECIFIC",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "beginTime": "2022-02-09T00:00:00Z",
        "created": "2022-02-09T14:13:03.846508Z",
        "attributes": {
          "substantive": "Y",
          "caseId": "1547652071308205",
          "jurisdiction": "IA",
          "caseType": "Asylum",
        },
      },
      {
        "id": "538ea007-a710-4da8-93ed-f9d9a63ca950",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "case-manager",
        "classification": "PUBLIC",
        "grantType": "SPECIFIC",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "beginTime": "2022-02-08T00:00:00Z",
        "created": "2022-02-08T15:11:42.900264Z",
        "attributes": {
          "substantive": "Y",
          "caseId": "1637320083459991",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "a019e32d-e79a-47a5-8a53-a57cde0774e5",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "case-manager",
        "classification": "PUBLIC",
        "grantType": "SPECIFIC",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "beginTime": "2022-02-08T00:00:00Z",
        "created": "2022-02-08T15:03:13.608116Z",
        "attributes": {
          "substantive": "Y",
          "caseId": "1632416351878527",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "4304f8ad-a16a-441e-ba1b-7576fb7e3005",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "case-manager",
        "classification": "PUBLIC",
        "grantType": "SPECIFIC",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "beginTime": "2022-02-07T00:00:00Z",
        "created": "2022-02-07T14:02:34.634049Z",
        "attributes": {
          "substantive": "Y",
          "caseId": "1547653674561885",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "c360067c-ee6e-4778-91db-999678fbb8e8",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2022-02-04T14:55:26.972231Z",
        "attributes": {
          "notes": "cvbnm",
          "substantive": "N",
          "caseId": "1583164336903544",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "2a1094d8-61a9-4f1d-b841-dd616e6eec39",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2022-01-26T12:16:40.075757Z",
        "attributes": {
          "notes": "Mossa Kayad test Uday",
          "substantive": "N",
          "caseId": "1629704893555405",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "0ca51a1a-89d1-436c-b37a-12a78248841c",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2022-01-14T21:48:33.754355Z",
        "attributes": {
          "notes": "test",
          "substantive": "N",
          "caseId": "1547655745839752",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "2f002d19-cc52-435c-a2a5-2c9da0993edd",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2022-01-10T12:03:04.852755Z",
        "attributes": {
          "notes": "ALeena test",
          "substantive": "N",
          "caseId": "1576166009739484",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "e9fc7315-ea31-4af5-b14d-4cd5baf6ff79",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "case-manager",
        "classification": "PUBLIC",
        "grantType": "SPECIFIC",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "beginTime": "2021-12-29T00:00:00Z",
        "created": "2021-12-29T22:14:31.23046Z",
        "attributes": {
          "substantive": "Y",
          "caseId": "1576166009739484",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "56c10d80-072f-4df1-8698-da8190188f93",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-12-23T09:56:55.655273Z",
        "attributes": {
          "notes": "test",
          "substantive": "N",
          "caseId": "1630411367594061",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "e8db8fb1-f532-444f-9015-2a7095e2f96a",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "ORGANISATION",
        "roleName": "case-allocator",
        "classification": "PUBLIC",
        "grantType": "STANDARD",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-10T13:42:36.670007Z",
        "attributes": {
          "substantive": "N",
          "primaryLocation": "386417",
          "jurisdiction": "IA"
        }
      },
      {
        "id": "866bf8cd-1618-466a-ab41-429ff3a8f7ef",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "ORGANISATION",
        "roleName": "tribunal-caseworker",
        "classification": "PUBLIC",
        "grantType": "STANDARD",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-10T13:42:36.669981Z",
        "attributes": {
          "substantive": "N",
          "primaryLocation": "386417",
          "jurisdiction": "IA",
          "workTypes": "hearing_work, routine_work, decision_making_work, applications"
        }
      },
      {
        "id": "2b9de94d-ceb6-4fc8-a360-b97ec50c9bbd",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-12-15T11:33:11.800777Z",
        "attributes": {
          "notes": "dsfghjk",
          "substantive": "N",
          "caseId": "1547659109799271",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "04886f58-4c1b-443d-a236-ff7bb028d104",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-12-15T11:30:41.42093Z",
        "attributes": {
          "notes": "xdfghj",
          "substantive": "N",
          "caseId": "1591628107549181",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "7b1eb762-60fc-4255-9b3b-f96a3c872738",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-12-15T11:23:53.774416Z",
        "attributes": {
          "notes": "dxcghj",
          "substantive": "N",
          "caseId": "1547660549698842",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "b9159226-56a7-4365-afa6-2134fe1e72cc",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-12-15T10:49:08.067288Z",
        "attributes": {
          "notes": "hcjgffx",
          "substantive": "N",
          "caseId": "1547655501759012",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "49a64e1c-0adb-4364-80a4-c9d4ddbd0199",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-12-15T10:41:03.527652Z",
        "attributes": {
          "notes": "jyguy",
          "substantive": "N",
          "caseId": "1547632828064129",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "49bc6b91-d8e0-4fc4-b122-d4ad271ab178",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-12-14T12:04:12.965118Z",
        "attributes": {
          "notes": "Test exclusion me",
          "substantive": "N",
          "caseId": "1547659663779917",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "a6e22c2f-a200-47d9-9fa4-dce55e4eedc6",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-12-14T11:06:21.278758Z",
        "attributes": {
          "notes": "Test",
          "substantive": "N",
          "caseId": "1589888528895043",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "357463a5-3ed3-4b5b-b4c1-52d5f9dc5693",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-25T16:13:04.207797Z",
        "attributes": {
          "notes": "Demo gtrg",
          "substantive": "N",
          "caseId": "1637847524140608",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "0f43a29a-f517-4330-961a-f691982748e9",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-17T17:06:01.531866Z",
        "attributes": {
          "notes": "sfasdf",
          "substantive": "N",
          "caseId": "1611919771917689",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "5330cb92-bbf9-4fc3-a11f-b69d0f8a8a59",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-15T17:05:01.001307Z",
        "attributes": {
          "notes": "fgf",
          "substantive": "N",
          "caseId": "1586880146002444",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "cfeab2cd-2970-4b16-9979-4cb0d6be435a",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-15T17:04:34.316044Z",
        "attributes": {
          "notes": "grg",
          "substantive": "N",
          "caseId": "1586880524841314",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "091e34c3-8ea6-4301-89f9-3f4387583e9f",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-15T17:01:11.084284Z",
        "attributes": {
          "notes": "ght",
          "substantive": "N",
          "caseId": "1547635047241543",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "d0e0b6cf-6784-4c46-9e9b-8250b8421450",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-15T16:51:14.618194Z",
        "attributes": {
          "notes": "ghhgghhg",
          "substantive": "N",
          "caseId": "1634920056536726",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "82dfd538-1898-4cdf-83ee-cb8e8c4a0a47",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-15T16:47:05.774553Z",
        "attributes": {
          "notes": "jkjk",
          "substantive": "N",
          "caseId": "1632319329130270",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "64b4f16f-cea3-48e8-91e8-e884afa81a7f",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-15T16:46:37.668989Z",
        "attributes": {
          "notes": "jhjh",
          "substantive": "N",
          "caseId": "1591280413848137",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "79ed832c-13dd-4bc2-8301-f11971343819",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-15T11:46:46.593103Z",
        "attributes": {
          "notes": "Test for Marc 2",
          "substantive": "N",
          "caseId": "1547466725650882",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "41afc9c7-04ff-4475-91a3-110c67eb1988",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-15T11:40:12.296762Z",
        "attributes": {
          "notes": "Testing with Sharon",
          "substantive": "N",
          "caseId": "1547458486131483",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "c465d1ad-baa5-446a-8007-42f4a7b9bcdb",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-10T14:11:11.165537Z",
        "attributes": {
          "notes": "test",
          "substantive": "N",
          "caseId": "1602078503323954",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "d49a4c64-063d-40f0-aa2d-74dbcc76ad39",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "ORGANISATION",
        "roleName": "hmcts-legal-operations",
        "classification": "PRIVATE",
        "grantType": "BASIC",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": true,
        "created": "2021-11-10T13:42:36.670018Z",
        "attributes": {
          "substantive": "N",
          "primaryLocation": "386417"
        }
      },
      {
        "id": "fe6fdf68-4b2b-4865-841e-e69a750aa828",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "ORGANISATION",
        "roleName": "task-supervisor",
        "classification": "PUBLIC",
        "grantType": "STANDARD",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-10T13:42:36.670014Z",
        "attributes": {
          "substantive": "N",
          "primaryLocation": "386417",
          "jurisdiction": "IA"
        }
      },
      {
        "id": "19277719-ec31-4db4-951d-9071e9ff1bde",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-10T09:59:34.127473Z",
        "attributes": {
          "notes": "gtg",
          "substantive": "N",
          "caseId": "1616413322379008",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "27b14567-7f84-457b-a6e6-c89f893c49cf",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-05T16:07:41.287693Z",
        "attributes": {
          "substantive": "N",
          "caseId": "1551699977289495",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "1a13d7ee-685b-4a01-b7a5-eed67118d77b",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-04T10:33:07.354672Z",
        "attributes": {
          "substantive": "N",
          "caseId": "1547650267790517",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "a81cf956-4460-4f9e-93fb-09b0ee216d16",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-04T10:16:39.488845Z",
        "attributes": {
          "substantive": "N",
          "caseId": "1547590609729593",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
      {
        "id": "b47590d6-227f-45e1-aefa-70af01926464",
        "actorIdType": "IDAM",
        "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
        "roleType": "CASE",
        "roleName": "conflict-of-interest",
        "classification": "RESTRICTED",
        "grantType": "EXCLUDED",
        "roleCategory": "LEGAL_OPERATIONS",
        "readOnly": false,
        "created": "2021-11-03T17:18:17.058733Z",
        "attributes": {
          "substantive": "N",
          "caseId": "1576592382158119",
          "jurisdiction": "IA",
          "caseType": "Asylum"
        }
      },
];
    const cases = await getCaseIdListFromRoles(roleAssignments as RoleAssignment[], req);

    // search parameters passed in as null as there are no parameters for my cases
    const userIsCaseAllocator = checkIfCaseAllocator(null, null, req);
    let checkedRoles = roleAssignments; //req && req.session && req.session.roleAssignmentResponse ? req.session.roleAssignmentResponse : null;
    if (showFeature(FEATURE_SUBSTANTIVE_ROLE_ENABLED)) {
      checkedRoles = getSubstantiveRoles(roleAssignments as any) as any;
    }

    const result = {
      cases,
      total_records: 0,
      unique_cases: 0,
    };

    if (cases.length) {
      const mappedCases = checkedRoles ? mapCasesFromData(cases, checkedRoles as any, null) : [];
      result.total_records = mappedCases.length;
      result.unique_cases = getUniqueCasesCount(mappedCases);
      result.cases = assignActionsToCases(mappedCases, userIsCaseAllocator);
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
    searchParameters.filter(param => param.key === 'location_id').forEach(location => {
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
      unique_cases: 0,
    };

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
