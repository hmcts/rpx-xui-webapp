import { ActionViews, TASK_ACTIONS, TaskPermission } from './constants/actions';
import { Action, Caseworker, CaseworkerApi, Location, LocationApi, Task } from './interfaces/task';

export function prepareGetTaskUrl(baseUrl: string, taskId: string): string {
  return `${baseUrl}/task/${taskId}`
}

export function preparePostTaskUrlAction(baseUrl: string, taskId: string, action: string): string {
  return `${baseUrl}/task/${taskId}/${action}`
}

export function prepareSearchTaskUrl(baseUrl: string) {
  return `${baseUrl}/task`
}

export function prepareGetLocationByIdUrl(baseUrl: string, locationId: string): string {
  return `${baseUrl}/location/${locationId}`
}

export function prepareGetLocationsUrl(baseUrl: string): string {
  return `${baseUrl}/location`
}

export function prepareRoleApiUrl(baseUrl: string) {
  return `${baseUrl}/am/role-assignments/query`
}

export function prepareCaseWorkerSearchUrl(baseUrl: string) {
  return `${baseUrl}/caseworker/search`
}

export function prepareTaskSearchForCompletable(baseUrl: string) {
  return `${baseUrl}/task/search-for-completable`
}

export function prepareCaseWorkerForLocation(baseUrl: string, locationId: string) {
  return `${baseUrl}/caseworker/location/${locationId}`
}

export function prepareCaseWorkerForService(baseUrl: string, serviceId: string) {
  return `${baseUrl}/caseworker/service/${serviceId}`
}

export function prepareCaseWorkerForLocationAndService(baseUrl: string, locationId: string, serviceId: string) {
  return `${baseUrl}/caseworker/location/${locationId}/service/${serviceId}`
}

/**
 * The below sets up actions on the tasks, though it's expected this will change
 * in the future - it should do fine for the MVP, though.
 * @param tasks The tasks to set up the actions for.
 * @param view This dictates which set of actions we should use.
 */
 export function assignActionsToTasks(tasks: any[], view: any): void {
  if (tasks) {
    for (const task of tasks) {
      switch (view) {
        case ActionViews.MY:
          task.actions = [...TASK_ACTIONS.MY];
          break;
        case ActionViews.AVAILABLE:
          task.actions = [...TASK_ACTIONS.AVAILABLE];
          break;
        case ActionViews.MANAGER:
          // Unassigned tasks have different actions to assigned ones.
          if (task.assignee) {
            task.actions = [...TASK_ACTIONS.MANAGER.ASSIGNED];
          } else {
            task.actions = [...TASK_ACTIONS.MANAGER.UNASSIGNED];
          }
          break;
        default:
          // If we don't recognise the view, just make sure we at least have an array.
          task.actions = task.actions || [];
          break;
      }
      task.dueDate = task.due_date
      task.taskName = task.name
      task.caseName = task.case_name
      task.caseCategory = task.case_category
    }
  }
}

/**
 * The below sets up actions on the tasks via the permissions the user has and the currrent view
 * @param tasks The tasks to set up the actions for
 * @param permissions The permissions the user has
 * @param view This dictates which set of actions we should use.
 */
export function assignActionsToTasksWithPermissions(tasks: any[], permissions: TaskPermission[], view: ActionViews): void {
  if (tasks) {
    for (const task of tasks) {
      let taskAssigned: boolean;
      taskAssigned = task.assignee ? true : false;
      task.actions = getWATaskActions(permissions, view, taskAssigned);
      task.dueDate = task.due_date
      task.taskName = task.name
      task.caseName = task.case_name
      task.caseCategory = task.case_category
    }
  }
}

export function mapCaseworkerData(caseWorkerData: CaseworkerApi[]): Caseworker[] {
  const caseworkers: Caseworker[] = []
  if (caseWorkerData) {
    caseWorkerData.forEach((caseWorkerApi: CaseworkerApi) => {
      const thisCaseWorker: Caseworker = {
        email: caseWorkerApi.email_id,
        firstName: caseWorkerApi.first_name,
        idamId: caseWorkerApi.id,
        lastName: caseWorkerApi.last_name,
        location: mapCaseworkerPrimaryLocation(caseWorkerApi.base_location),
      }
      caseworkers.push(thisCaseWorker)
    })
  }
  return caseworkers
}

export function mapCaseworkerPrimaryLocation(baseLocation: LocationApi[]): Location {
  let primaryLocation: Location = null
  if (baseLocation) {
    baseLocation.forEach((location: LocationApi) => {
      if (location.is_primary) {
        primaryLocation = {
          id: location.location_id,
          locationName: location.location,
          services: location.services,
        }
      }
    })
  }
  return primaryLocation
}

export function prepareRoleApiRequest(locationId?: number): any {
  const attributes: any = {
    jurisdiction: ['IA'],
  };

  const payload = {
    attributes,
    roleName: ['tribunal-caseworker', 'senior-tribunal-caseworker'],
    validAt: Date.UTC,
  }
  if (locationId) {
    payload.attributes.primaryLocation = [locationId]
  }
  return payload
}

/**
 * The below sets up actions on the tasks by directing them to respective methods
 * for each permission and concatenating any resulting lists
 * Note - Read, Refer and Owan are also permissions but currently have no respective method
 * Note - Concatenating suitable currently (might require changing if actions in few permissions)
 * @param permissions The list of permissions the user holds
 * @param view This dictates which set of actions we should use.
 * @param isTaskAssigned Dummy parameter to test change based on whether task is assigned
 */
export function getWATaskActions(permissions: TaskPermission[], view: ActionViews, isTaskAssigned: boolean): Action[] {
  let actionList: Action[] = [];
  permissions.forEach(permission => {
    switch (permission) {
      case TaskPermission.MANAGE:
        actionList = actionList.concat(getWATaskActionsForManage(view, isTaskAssigned));
        break;
      case TaskPermission.EXECUTE:
        actionList = actionList.concat(getWATaskActionsForExecute(view));
        break;
      case TaskPermission.CANCEL:
        actionList = actionList.concat(getWATaskActionsForCancel(view));
        break;
    }
  })
  return actionList;
}

export function getWATaskActionsForManage(view: ActionViews, isTaskAssigned: boolean): Action[] {
  switch (view) {
    case ActionViews.MY:
      return TASK_ACTIONS.MY;
    case ActionViews.AVAILABLE:
      return TASK_ACTIONS.AVAILABLE;
    case ActionViews.ACTIVE:
      // TODO - More logic required for Active tasks for tasks tab in case details page
      // Works in reverse i.e. if view, then check has permission (and also check if task assigned)
      return TASK_ACTIONS.ACTIVE;
    case ActionViews.ALL_WORK:
      return isTaskAssigned ? TASK_ACTIONS.ALL_WORK.ASSIGNED : TASK_ACTIONS.ALL_WORK.UNASSIGNED;
    default:
      // If we don't recognise the view, just make sure we at least have an array.
      return [];
  }
}

export function getWATaskActionsForExecute(view: ActionViews): Action[] {
  switch (view) {
    case ActionViews.ALL_WORK:
      return TASK_ACTIONS.EXECUTE;
    default:
      return [];
  }
}

export function getWATaskActionsForCancel(view: ActionViews): Action[] {
  switch (view) {
    case ActionViews.ALL_WORK:
      return TASK_ACTIONS.CANCEL;
    default:
      return [];
  }
}
