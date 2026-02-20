import type { TaskListResponse } from './types';

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

/**
 * Builds the payload expected by /workallocation/task.
 * Mirrors the legacy TaskRequestBody helper but in a typed form.
 */
export function buildTaskSearchRequest(view: 'MyTasks' | 'AvailableTasks' | 'AllWork', options: TaskSearchOptions = {}) {
  const {
    userIds = [],
    locations = [],
    jurisdictions = [],
    taskTypes = [],
    states = [],
    pageNumber = 1,
    pageSize = 25,
    searchBy = 'caseworker',
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
      pagination_parameters: { page_number: pageNumber, page_size: pageSize },
    },
    view,
  };
}

export interface SeededTaskResult {
  id: string;
  type: 'assigned' | 'unassigned';
}

/**
 * Attempts to fetch a deterministic task id for tests.
 * Falls back to undefined if no task is found.
 */
export async function seedTaskId(
  apiClient: {
    post: (
      endpoint: string,
      options: { data: unknown; throwOnError: boolean }
    ) => Promise<{ data?: TaskListResponse; status: number }>;
  },
  locationId?: string
): Promise<SeededTaskResult | undefined> {
  const candidateStates: Array<{ type: SeededTaskResult['type']; states: string[]; view: 'MyTasks' | 'AvailableTasks' }> = [
    { type: 'assigned', states: ['assigned'], view: 'MyTasks' },
    { type: 'unassigned', states: ['unassigned'], view: 'AvailableTasks' },
  ];

  for (const candidate of candidateStates) {
    const body = buildTaskSearchRequest(candidate.view, {
      locations: locationId ? [locationId] : [],
      states: candidate.states,
      searchBy: 'caseworker',
      pageSize: 5,
    });
    const response = (await apiClient.post('workallocation/task', {
      data: body,
      throwOnError: false,
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
