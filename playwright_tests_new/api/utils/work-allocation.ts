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
