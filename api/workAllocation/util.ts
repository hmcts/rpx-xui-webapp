import { ActionViews, TASK_ACTIONS } from './constants/actions';

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
export function assignActionsToTasks(tasks: any[], view: any): void {
  if (tasks) {
    for (const task of tasks) {
      switch (view) {
        case ActionViews.MY:
          task.actions = [ ...TASK_ACTIONS.MY ];
          break;
        case ActionViews.AVAILABLE:
          task.actions = [ ...TASK_ACTIONS.AVAILABLE ];
          break;
        case ActionViews.MANAGER:
          // Unassigned tasks have different actions to assigned ones.
          if (task.assignee) {
            task.actions = [ ...TASK_ACTIONS.MANAGER.ASSIGNED ];
          } else {
            task.actions = [ ...TASK_ACTIONS.MANAGER.UNASSIGNED ];
          }
          break;
        default:
          // If we don't recognise the view, just make sure we at least have an array.
          task.actions = task.actions || [];
          break;
      }
      task.caseReference = task.case_id
      task.dueDate = task.due_date
      task.taskName = task.name
      task.caseName = task.case_name
      task.caseCategory = task.case_category
    }
  }
}

export function mapCaseworkerData(caseWorkerData: any[]): any[] {
  if(caseWorkerData) {
    caseWorkerData.forEach((caseWorker: any) => {
      caseWorker.idamId = caseWorker.id
      caseWorker.firstName = caseWorker.first_name
      caseWorker.lastName = caseWorker.last_name
      caseWorker.email = caseWorker.email_id
    })
  }
  return caseWorkerData
}

export function prepareRoleApiRequest(): any{
  const payload =  {
      roleName: ['tribunal-caseworker','senior-tribunal-caseworker'],
      validAt: Date.UTC,
      attributes: {
          jurisdiction: ['IA'],
          primaryLocation: ['538351']
      }
  }
  return payload
}
