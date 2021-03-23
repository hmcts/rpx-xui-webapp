import { ActionViews, TASK_ACTIONS } from './constants/actions';
import { Caseworker, CaseworkerApi, Location, LocationApi } from './interfaces/task';

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
 * TODO: "Make this more cleverer" (AndyW)
 * The below sets up actions on the tasks, though it's expected this will change
 * in the future - it should do fine for the MVP, though.
 * @param tasks The tasks to set up the actions for.
 * @param view This dictates which set of actions we should use.
 */
export function assignActionsToTasks(tasks: any[], view: any, caseworkers: Caseworker[]): void {
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
      if (caseworkers) {
        task.assigneeName = getAssigneeName(task, caseworkers);
      }
    }
  }
}

function getAssigneeName(task: any, caseworkers: Caseworker[]): string {
  if (task.assignee && caseworkers.some(cw => cw.idamId === task.assignee)) {
    const assignedCW = caseworkers.filter(cw => cw.idamId === task.assignee)[0];
    return `${assignedCW.firstName} ${assignedCW.lastName}`;
  }
  return null
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
