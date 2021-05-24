import { TaskPermission, VIEW_PERMISSIONS_ACTIONS_MATRIX } from './constants/actions';
import { Action, Caseworker, CaseworkerApi, Location, LocationApi } from './interfaces/task';

export function prepareGetTaskUrl(baseUrl: string, taskId: string): string {
  return `${baseUrl}/task/${taskId}`;
}

export function preparePostTaskUrlAction(baseUrl: string, taskId: string, action: string): string {
  return `${baseUrl}/task/${taskId}/${action}`;
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

export function prepareGetLocationsUrl(baseUrl: string): string {
  return `${baseUrl}/location`;
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

/**
 * The below sets up actions on the tasks, though it's expected this will change
 * in the future - it should do fine for the MVP, though.
 * @param tasks The tasks to set up the actions for.
 * @param view This dictates which set of actions we should use.
 */
export function assignActionsToTasks(tasks: any[], view: any): any[] {
  const tasksWithActions: any[] = [];
  if (tasks) {
    for (const task of tasks) {
      // Note: There is no current logic to determine whether assigned or unassigned
      // This was debated for EUI-3619
      // As actions can change based on whether assigned or not, there might need to be a check here
      const actions: Action[] = getActionsByPermissions(view, task.permissions);
      const taskWithAction = {...task, actions};
      tasksWithActions.push(taskWithAction);
    }
  }
  return tasksWithActions;
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
    roleName: ['tribunal-caseworker', 'senior-tribunal-caseworker'],
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
        let manageActionList = actionList.concat(VIEW_PERMISSIONS_ACTIONS_MATRIX[view][TaskPermission.MANAGE])
        actionList = !manageActionList.includes(undefined) ? manageActionList : actionList;
        break;
      case TaskPermission.EXECUTE:
        let executeActionList = actionList.concat(VIEW_PERMISSIONS_ACTIONS_MATRIX[view][TaskPermission.EXECUTE]);
        actionList = !executeActionList.includes(undefined) ? executeActionList : actionList;
        break;
      case TaskPermission.CANCEL:
        let cancelActionList = actionList.concat(VIEW_PERMISSIONS_ACTIONS_MATRIX[view][TaskPermission.CANCEL]);
        actionList = !cancelActionList.includes(undefined) ? cancelActionList : actionList;
        break;
      default:
        break;
    }
  });
  return actionList;
}
