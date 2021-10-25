import { AxiosResponse } from 'axios';
import { RoleAssignment } from 'user/interfaces/roleAssignment';

import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { ElasticSearchQuery } from '../searchCases/interfaces/ElasticSearchQuery';

import { TaskPermission, VIEW_PERMISSIONS_ACTIONS_MATRIX, ViewType } from './constants/actions';
import { Case } from './interfaces/case';
import { PaginationParameter } from './interfaces/caseSearchParameter';
import { Action, Caseworker, CaseworkerApi, Location, LocationApi } from './interfaces/common';
import { Person, PersonRole } from './interfaces/person';
import { RoleCaseData } from './interfaces/roleCaseData';

export function prepareGetTaskUrl(baseUrl: string, taskId: string): string {
  return `${baseUrl}/task/${taskId}`;
}

export function preparePostTaskUrlAction(baseUrl: string, taskId: string, action: string): string {
  return `${baseUrl}/task/${taskId}/${action}`;
}

export function prepareSearchCaseUrl(baseUrl: string, subPath?: string) {
  if (subPath) {
    return `${baseUrl}/${subPath}`;
  }
  return `${baseUrl}/case`;
}

export function prepareSearchTaskUrl(baseUrl: string, subPath?: string) {
  if (subPath) {
    return `${baseUrl}/${subPath}`;
  }
  return `${baseUrl}/task`;
}

export function prepareGetLocationByIdUrl(baseUrl: string, locationId: string): string {
  return `${baseUrl}/location/${locationId}`;
}

export function prepareGetLocationsUrl(baseUrl: string, serviceCode: string = 'BFA1'): string {
  return `${baseUrl}/refdata/location/court-venues/services?service_code=${serviceCode}`;
}

export function prepareRoleApiUrl(baseUrl: string) {
  return `${baseUrl}/am/role-assignments/query`;
}

export function prepareCaseWorkerSearchUrl(baseUrl: string) {
  return `${baseUrl}/caseworker/search`;
}

export function prepareTaskSearchForCompletable(baseUrl: string) {
  return `${baseUrl}/task/search-for-completable`;
}

export function prepareCaseWorkerForLocation(baseUrl: string, locationId: string) {
  return `${baseUrl}/caseworker/location/${locationId}`;
}

export function prepareCaseWorkerForService(baseUrl: string, serviceId: string) {
  return `${baseUrl}/caseworker/service/${serviceId}`;
}

export function prepareCaseWorkerForLocationAndService(baseUrl: string, locationId: string, serviceId: string) {
  return `${baseUrl}/caseworker/location/${locationId}/service/${serviceId}`;
}

export function preparePaginationUrl(req: EnhancedRequest, postPath: string): string {
  if (req.body && req.body.searchRequest && req.body.searchRequest.pagination_parameters) {
    const paginationConfig = req.body.searchRequest.pagination_parameters;
    const pageNumber = paginationConfig.page_number;
    const pageSize = paginationConfig.page_size;
    const firstResult = (pageNumber - 1) * pageSize;
    return `${postPath}?first_result=${firstResult}&max_results=${pageSize}`;
  }
  return postPath;
}

/**
 * The below sets up actions on the tasks, though it's expected this will change
 * in the future - it should do fine for the MVP, though.
 * @param tasks The tasks to set up the actions for.
 * @param view This dictates which set of actions we should use.
 */
export function assignActionsToTasks(tasks: any[], view: any, currentUser: string): any[] {
  const allWorkView = ViewType.ALL_WORK;
  const activeTasksView = ViewType.ACTIVE_TASKS;
  const tasksWithActions: any[] = [];
  if (tasks) {
    for (const task of tasks) {
      let thisView = view;
      if (view === allWorkView) {
        thisView = task.assignee ? ViewType.ALL_WORK_ASSIGNED : ViewType.ALL_WORK_UNASSIGNED;
      }
      if (view === activeTasksView) {
        thisView = ViewType.ACTIVE_TASKS_UNASSIGNED;
        if (task.assignee) {
          thisView = currentUser === task.assignee ?
            ViewType.ACTIVE_TASKS_ASSIGNED_CURRENT : ViewType.ACTIVE_TASKS_ASSIGNED_OTHER;
        }
      }
      const actions: Action[] = getActionsByPermissions(thisView, task.permissions);
      const taskWithAction = {...task, actions};
      tasksWithActions.push(taskWithAction);
    }
  }
  return tasksWithActions;
}

/**
 * NOTE: These comments are copied from the assignActionsToTasks method
 * The below sets up actions on the cases, though it's expected this will change
 * in the future - it should do fine for the MVP, though.
 * @param cases The cases to set up the actions for.
 * @param view This dictates which set of actions we should use.
 */
export function assignActionsToCases(cases: any[], view: any, isAllocator: boolean): any[] {
  const casesWithActions: any[] = [];
  if (cases) {
    for (const item of cases) {
      const actions: Action[] = getActionsFromAllocatorRole(isAllocator);
      const caseWithAction = {...item, actions};
      casesWithActions.push(caseWithAction);
    }
  }
  return casesWithActions;
}

export function mapCaseworkerData(caseWorkerData: CaseworkerApi[], roleAssignments: RoleAssignment[]): Caseworker[] {
  const caseworkers: Caseworker[] = [];
  if (caseWorkerData) {
    caseWorkerData.forEach((caseWorkerApi: CaseworkerApi) => {
      const thisCaseWorker: Caseworker = {
        email: caseWorkerApi.email_id,
        firstName: caseWorkerApi.first_name,
        idamId: caseWorkerApi.id,
        lastName: caseWorkerApi.last_name,
        location: mapCaseworkerPrimaryLocation(caseWorkerApi.base_location),
        roleCategory: getRoleCategory(roleAssignments, caseWorkerApi),
      };
      caseworkers.push(thisCaseWorker);
    });
  }
  return caseworkers;
}

export function getRoleCategory(roleAssignments: RoleAssignment[], caseWorkerApi: CaseworkerApi): string {
  const roleAssignment = roleAssignments.find(roleAssign => roleAssign.actorId === caseWorkerApi.id);
  return roleAssignment ? roleAssignment.roleCategory : null;
}

export function mapCaseworkerPrimaryLocation(baseLocation: LocationApi[]): Location {
  let primaryLocation: Location = null;
  if (baseLocation) {
    baseLocation.forEach((location: LocationApi) => {
      if (location.is_primary) {
        primaryLocation = {
          id: location.location_id,
          locationName: location.location,
          services: location.services,
        };
      }
    });
  }
  return primaryLocation;
}

export function prepareRoleApiRequest(locationId?: number): any {
  const attributes: any = {
    jurisdiction: ['IA'],
  };

  const payload = {
    attributes,
    roleName: ['hearing-centre-admin', 'case-manager', 'ctsc', 'tribunal-caseworker',
               'hmcts-legal-operations', 'task-supervisor', 'hmcts-admin',
               'national-business-centre', 'senior-tribunal-caseworker', 'case-allocator'],
    validAt: Date.UTC,
  };
  if (locationId) {
    payload.attributes.primaryLocation = [locationId];
  }
  return payload;
}

/**
 * Aggregate permissions from the View Permissions Actions Matrix defined by business.
 * @param view This dictates which set of actions we should use.
 * @param permissions The list of permissions the user holds.
 * @return actionList:Action[] the list of total actions user holds.
 */
export function getActionsByPermissions(view, permissions: TaskPermission[]): Action[] {
  let actionList: Action[] = [];
  permissions.forEach(permission => {
    switch (permission) {
      case TaskPermission.MANAGE:
        const manageActionList = actionList.concat(VIEW_PERMISSIONS_ACTIONS_MATRIX[view][TaskPermission.MANAGE]);
        actionList = !manageActionList.includes(undefined) ? manageActionList : actionList;
        break;
      case TaskPermission.EXECUTE:
        // if on active tasks and there is no manage permission do not add execute actions
        if (view.includes(ViewType.ACTIVE_TASKS) && !permissions.includes(TaskPermission.MANAGE)) {
          break;
        }
        const executeActionList = actionList.concat(VIEW_PERMISSIONS_ACTIONS_MATRIX[view][TaskPermission.EXECUTE]);
        actionList = !executeActionList.includes(undefined) ? executeActionList : actionList;
        break;
      case TaskPermission.CANCEL:
        const cancelActionList = actionList.concat(VIEW_PERMISSIONS_ACTIONS_MATRIX[view][TaskPermission.CANCEL]);
        actionList = !cancelActionList.includes(undefined) ? cancelActionList : actionList;
        break;
      default:
        break;
    }
  });
  // Note sorting is implemented to order all possible action lists the same
  // Currently sorting by id but can be changed
  return actionList.sort((a, b) => a.id.localeCompare(b.id));
}

export function getActionsFromAllocatorRole(isAllocator: boolean): Action[] {
  let actionList: Action[] = [];
  if (isAllocator) {
    actionList = (VIEW_PERMISSIONS_ACTIONS_MATRIX.AllCases.Manage);
  }
  return actionList;
}

export function applySearchFilter(person: Person, domain: string, searchTerm: any): boolean {
  if (domain === PersonRole.ALL) {
    return person && person.name.toLowerCase().includes(searchTerm.toLowerCase());
  }
  return person && person.domain === domain && person.name.toLowerCase().includes(searchTerm.toLowerCase());
}

export async function handlePost(path: string, payload: any, req: EnhancedRequest): Promise<any> {
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.post(path, payload, {headers});
  // Return the whole response, not just the data, so we can
  // see what the status of the response is.
  return response;
}

export function getCaseIdListFromRoles(roleAssignmentList: RoleAssignment[]): string[] {
  const caseIdList = [];
  if (!roleAssignmentList) {
    return [];
  }
  roleAssignmentList.forEach(roleAssignment => {
    if (roleAssignment.attributes) {
      const caseId = roleAssignment.attributes.caseId;
      if (caseId && !caseIdList.includes(caseId)) {
        caseIdList.push(caseId);
      }
    }
  });
  return caseIdList;
}

export function constructElasticSearchQuery(caseIds: any[], page: number, size: number): ElasticSearchQuery {
  return {
    native_es_query: {
      query: {
        terms: {
          reference: caseIds,
        },
      },
      size,
    },
    supplementary_data: ['*'],
  };
}

export function mapCasesFromData(
  caseDetails: Case[],
  roleAssignmentList: RoleAssignment[],
  paginationConfig: PaginationParameter
): RoleCaseData[] {
  if (!caseDetails) {
    return [];
  }
  // Note: Might have to change where paginate is called if want role data before separating - line 392
  caseDetails = paginationConfig ? paginate(caseDetails, paginationConfig.page_number, paginationConfig.page_size) : caseDetails;
  const roleCaseList = [];
  caseDetails.forEach(caseDetail => {
    const roleAssignment = roleAssignmentList.find(
      role => role.attributes && role.attributes.caseId === caseDetail.id.toString()
    );
    const roleCase = mapRoleCaseData(roleAssignment, caseDetail);
    roleCaseList.push(roleCase);
  });
  return roleCaseList;
}

export function mapRoleCaseData(roleAssignment: RoleAssignment, caseDetail: Case): RoleCaseData {
  const roleCaseData: RoleCaseData = {
    assignee: roleAssignment.actorId,
    case_category: caseDetail.case_type_id,
    // TODO: case_name: caseDetail.hmctsCaseNameInternal (when services have made this available)
    case_id: caseDetail.id,
    case_name: caseDetail.case_data && caseDetail.case_data.caseName ? caseDetail.case_data.caseName : caseDetail.id,
    case_role: roleAssignment.roleName,
    endDate: roleAssignment.endTime,
    id: roleAssignment.id,
    jurisdiction: caseDetail.jurisdiction,
    location_id: roleAssignment.attributes.primaryLocation,
    startDate: roleAssignment.beginTime,
  };
  return roleCaseData;
}

export function getCaseTypesFromRoleAssignments(roleAssignments: RoleAssignment[]): string {
  const caseTypes = roleAssignments
    .filter((roleAssignment: RoleAssignment) => roleAssignment.attributes && roleAssignment.attributes.caseType)
    .map((roleAssignment: RoleAssignment) => roleAssignment.attributes.caseType)
    .reduce((query: string, caseType: string) => {
      return query.includes(caseType) ? query : `${query}${caseType},`;
    }, '');
  return caseTypes[caseTypes.length - 1] === ',' ? caseTypes.slice(0, caseTypes.length - 1) : caseTypes;
}

export function getSubstantiveRoles(roleAssignments: RoleAssignment[]): RoleAssignment[] {
  return roleAssignments
    .filter((roleAssignment: RoleAssignment) => roleAssignment.attributes && roleAssignment.attributes.substantive === 'Y');
}

// Note: array type may need to be changed depending on where pagination called
export const paginate = (array: Case[], pageNumber: number, pageSize: number): any[] => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
