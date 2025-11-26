export interface TaskSearchOptions {
  userIds?: string[];
  locations?: string[];
  jurisdictions?: string[];
  taskTypes?: string[];
  states?: string[];
  pageNumber?: number;
  pageSize?: number;
  searchBy?: string;
}

export type WaUserRole = 'solicitor' | 'caseOfficer_r1' | 'caseManager';

/**
 * Builds the payload expected by /workallocation/task.
 * Mirrors the legacy TaskRequestBody helper but in a typed form.
 */
export function buildTaskSearchRequest(
  view: 'MyTasks' | 'AvailableTasks' | 'AllWork',
  options: TaskSearchOptions = {}
) {
  const {
    userIds = [],
    locations = [],
    jurisdictions = [],
    taskTypes = [],
    states = [],
    pageNumber = 1,
    pageSize = 25,
    searchBy = 'caseworker'
  } = options;

  const searchParameters: Array<{ key: string; operator: 'IN'; values: string[] }> = [];

  if (userIds.length) {
    searchParameters.push({ key: 'user', operator: 'IN', values: userIds });
  }
  if (locations.length) {
    searchParameters.push({ key: 'location', operator: 'IN', values: locations });
  }
  if (jurisdictions.length) {
    searchParameters.push({ key: 'jurisdiction', operator: 'IN', values: jurisdictions });
  }
  if (taskTypes.length) {
    searchParameters.push({ key: 'taskType', operator: 'IN', values: taskTypes });
  }
  if (states.length) {
    searchParameters.push({ key: 'state', operator: 'IN', values: states });
  }

  return {
    searchRequest: {
      search_by: searchBy,
      sorting_parameters: [{ sort_by: 'dueDate', sort_order: 'asc' }],
      search_parameters: searchParameters,
      pagination_parameters: { page_number: pageNumber, page_size: pageSize }
    },
    view
  };
}

export interface SeededTaskResult {
  id: string;
  type: 'assigned' | 'unassigned';
}

export interface SeededTasks {
  assigned?: string;
  unassigned?: string;
}

export const UNASSIGNED_TASK_CANDIDATES = [
  process.env.WA_SAMPLE_TASK_ID,
  '29e16124-cad0-11f0-be47-66ba1a42d2a4',
  '402e09a7-a1c6-11ef-8ee5-723cf3e52aef'
].filter(Boolean) as string[];

async function findTaskByStateAnyService(
  apiClient: any,
  states: string[],
  view: 'MyTasks' | 'AvailableTasks' | 'AllWork',
  locationId?: string
): Promise<string | undefined> {
  const body = buildTaskSearchRequest(view, {
    locations: locationId ? [locationId] : [],
    states,
    searchBy: 'caseworker',
    pageSize: 50
  });
  const res = (await apiClient.post('workallocation/task', {
    data: body,
    throwOnError: false
  })) as { status: number; data?: TaskListResponse };
  if (res.status !== 200 || !Array.isArray(res.data?.tasks)) {
    return undefined;
  }
  const hit = res.data.tasks.find((t) => states.includes((t.task_state ?? t.state ?? '').toLowerCase()) || states.length === 0);
  return hit?.id;
}

async function findTaskByState(
  apiClient: any,
  states: string[],
  view: 'MyTasks' | 'AvailableTasks',
  locationId?: string
): Promise<string | undefined> {
  const body = buildTaskSearchRequest(view, {
    locations: locationId ? [locationId] : [],
    states,
    searchBy: 'caseworker',
    pageSize: 20
  });
  const res = (await apiClient.post('workallocation/task', {
    data: body,
    throwOnError: false
  })) as { status: number; data?: TaskListResponse };
  const first = res.status === 200 && Array.isArray(res.data?.tasks) ? res.data.tasks[0] : undefined;
  return first?.id;
}

/**
 * Attempts to fetch a deterministic task id for tests.
 * Falls back to undefined if no task is found.
 */
export async function seedTaskId(apiClient: any, locationId?: string): Promise<SeededTaskResult | undefined> {
  const candidateStates: Array<{ type: SeededTaskResult['type']; states: string[]; view: 'MyTasks' | 'AvailableTasks' }> = [
    { type: 'assigned', states: ['assigned'], view: 'MyTasks' },
    { type: 'unassigned', states: ['unassigned'], view: 'AvailableTasks' }
  ];

  for (const candidate of candidateStates) {
    const body = buildTaskSearchRequest(candidate.view, {
      locations: locationId ? [locationId] : [],
      states: candidate.states,
      searchBy: 'caseworker',
      pageSize: 5
    });
    const response = (await apiClient.post('workallocation/task', {
      data: body,
      throwOnError: false
    })) as { data?: TaskListResponse; status: number };
    if (response.status === 200 && Array.isArray(response.data?.tasks) && response.data.tasks.length > 0) {
      const id = response.data.tasks[0]?.id;
      if (id) {
        return { id, type: candidate.type };
      }
    }
  }
  return undefined;
}

/**
 * Attempts to fetch both an assigned and an unassigned task id (best effort).
 */
export async function seedTasksForActions(apiClient: any, locationId?: string): Promise<SeededTasks> {
  const result: SeededTasks = {};
  // Try direct search by state for determinism
  result.assigned = await findTaskByState(apiClient, ['assigned'], 'MyTasks', locationId);
  result.unassigned = await findTaskByState(apiClient, ['unassigned'], 'AvailableTasks', locationId);

  // Fallback to legacy seedTaskId if still missing
  if (!result.assigned || !result.unassigned) {
    const seeded = await seedTaskId(apiClient, locationId);
    if (seeded?.id) {
      if (!result.assigned && seeded.type === 'assigned') {
        result.assigned = seeded.id;
      }
      if (!result.unassigned && seeded.type === 'unassigned') {
        result.unassigned = seeded.id;
      }
    }
  }
  return result;
}

/**
 * Attempts to get deterministic assigned/unassigned task ids using broader search.
 */
export async function seedTasksFromCcd(apiClient: any, locationId?: string): Promise<SeededTasks> {
  const result: SeededTasks = {};
  result.assigned = await findTaskByStateAnyService(apiClient, ['assigned'], 'AllWork', locationId);
  result.unassigned = await findTaskByStateAnyService(apiClient, ['unassigned'], 'AllWork', locationId);
  return result;
}
