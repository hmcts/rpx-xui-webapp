import { AxiosResponse } from 'axios';
import { RoleAssignment } from 'user/interfaces/roleAssignment';

import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { ElasticSearchQuery } from '../searchCases/interfaces/ElasticSearchQuery';

import { TaskPermission, VIEW_PERMISSIONS_ACTIONS_MATRIX, ViewType } from './constants/actions';
import { Action, Caseworker, CaseworkerApi, Location, LocationApi } from './interfaces/common';
import { Person, PersonRole } from './interfaces/person';

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

export function mapCaseworkerData(caseWorkerData: CaseworkerApi[]): Caseworker[] {
  const caseworkers: Caseworker[] = [];
  if (caseWorkerData) {
    caseWorkerData.forEach((caseWorkerApi: CaseworkerApi) => {
      const thisCaseWorker: Caseworker = {
        email: caseWorkerApi.email_id,
        firstName: caseWorkerApi.first_name,
        idamId: caseWorkerApi.id,
        lastName: caseWorkerApi.last_name,
        location: mapCaseworkerPrimaryLocation(caseWorkerApi.base_location),
      };
      caseworkers.push(thisCaseWorker);
    });
  }
  return caseworkers;
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

/*    id: '0d22d836-b25a-11eb-a18c-f2d58a9b7bb7',
      actorId: '49db7670-09b3-49e3-b945-b98f4e5e9a99',
      actorName: 'Jamie Well',
      startDate: '2021-05-05T16:00:00.000+0000',
      endDate: '2021-05-06T16:00:00.000+0000',
      location_name: 'Birmingham',
      location_id: '231596',
      jurisdiction: 'Immigration and Asylum',
      case_id: '1620409659381330',
      case_category: 'EEA',
      role: 'Lead Judge',
      case_name: 'James Parrot',
      permissions: [Array]
      
  {
    id: 'f3a00ad9-6d4e-4970-a88d-88ec6d46be04',
    actorIdType: 'IDAM',
    actorId: '3db21928-cbbc-4364-bd91-137c7031fe17',
    roleType: 'ORGANISATION',
    roleName: 'judge',
    classification: 'PUBLIC',
    grantType: 'STANDARD',
    roleCategory: 'JUDICIAL',
    readOnly: false,
    created: '2021-09-10T15:45:06.972614Z',
    attributes: {
      primaryLocation: '231596',
      caseId: '1546883526751282',
      jurisdiction: 'IA',
      region: 'north-east'
    },
    authorisations: [ 'case-allocator-role' ]
  },


    id: 1546883526751282,
    jurisdiction: 'IA',
    state: 'appealSubmitted',
    version: null,
    case_type_id: 'Asylum',
    created_date: '2019-01-07T17:52:06.745',
    last_modified: '2020-07-23T15:16:03.595',
    last_state_modified_date: null,
    security_classification: 'PUBLIC',
    case_data: {
      appellantHasFixedAddress: 'Yes',
      legalRepReferenceNumber: '123',
      legalRepDeclaration: [Array],
      appealGroundsProtection: [Object],
      appellantDateOfBirth: '1980-01-01',
      hasOtherAppeals: 'No',
      appealGroundsHumanRights: [Object],
      appellantAddress: [Object],
      appealType: 'protection',
      appellantGivenNames: 'Jim',
      appellantTitle: 'Mr',
      appellantNationalities: [Array],
      homeOfficeDecisionDate: '1111-01-01',
      sendDirectionActionAvailable: 'No',
      hasNewMatters: 'No',
      homeOfficeReferenceNumber: 'A123456'
    },
    data_classification: {
      appellantHasFixedAddress: 'PUBLIC',
      legalRepReferenceNumber: 'PUBLIC',
      legalRepDeclaration: 'PUBLIC',
      appealGroundsProtection: [Object],
      appellantDateOfBirth: 'PUBLIC',
      hasOtherAppeals: 'PUBLIC',
      appealGroundsHumanRights: [Object],
      appellantAddress: [Object],
      appealType: 'PUBLIC',
      appellantGivenNames: 'PUBLIC',
      appellantTitle: 'PUBLIC',
      appellantNationalities: [Object],
      homeOfficeDecisionDate: 'PUBLIC',
      sendDirectionActionAvailable: 'PUBLIC',
      appellantLastName: 'PUBLIC',
      hasNewMatters: 'PUBLIC',
      homeOfficeReferenceNumber: 'PUBLIC'
    },
    supplementary_data: null,
    after_submit_callback_response: null,
    callback_response_status_code: null,
    callback_response_status: null,
    delete_draft_response_status_code: null,
    delete_draft_response_status: null,
    security_classifications: {
      appellantHasFixedAddress: 'PUBLIC',
      legalRepReferenceNumber: 'PUBLIC',
      legalRepDeclaration: 'PUBLIC',
      appealGroundsProtection: [Object],
      appellantDateOfBirth: 'PUBLIC',
      hasOtherAppeals: 'PUBLIC',
      appealGroundsHumanRights: [Object],
      appellantAddress: [Object],
      appealType: 'PUBLIC',
      appellantGivenNames: 'PUBLIC',
      appellantTitle: 'PUBLIC',
      appellantNationalities: [Object],
      homeOfficeDecisionDate: 'PUBLIC',
      sendDirectionActionAvailable: 'PUBLIC',
      appellantLastName: 'PUBLIC',
      hasNewMatters: 'PUBLIC',
      homeOfficeReferenceNumber: 'PUBLIC'
    }
  }

  }*/

export function mapCasesFromData(responseData: any[], roleAssignmentList: RoleAssignment[], paginationConfig: any): any {
  if (!responseData) {
    return [];
  }
  responseData = paginationConfig ? paginate(responseData, paginationConfig.page_number, paginationConfig.page_size): responseData;
  const mergedResponse = [];
  responseData.forEach(response => {
    const thisRoleAssignment = roleAssignmentList.find(roleAssignment => roleAssignment.attributes.caseId === response.caseId);
    const thisResponse = {...thisRoleAssignment, ...response};
    thisResponse.case_name = thisResponse.appellantNameForDisplay;
    thisResponse.case_role = thisResponse.roleName;
    thisResponse.location_id = thisResponse.attributes.primaryLocation.id;
    thisResponse.case_category = thisResponse.case_type_id; 
    thisResponse.role = thisResponse.roleName;
    thisResponse.startDate = thisResponse.startTime;
    thisResponse.endDate = thisResponse.endTime;
    thisResponse.assignee = thisResponse.actorId;
    // unsure whether endDate is conditional
    mergedResponse.push(thisResponse);
  });
  return mergedResponse;
}

export const paginate = (array: any[], pageNumber: number, pageSize: number): any[] => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
