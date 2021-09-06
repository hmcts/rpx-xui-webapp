import MockAdapter from 'axios-mock-adapter';
import { HttpMockAdapter } from '../common/httpMockAdapter';
import {
  ALL_TASKS,
  CASEWORKER_AVAILABLE_TASKS,
  CASEWORKER_MY_TASKS,
  JUDICIAL_AVAILABLE_TASKS,
  JUDICIAL_MY_TASKS,
  JUDICIAL_WORKERS
} from './constants/mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const judicialMyTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/myTasks\?view=judicial/;
  const judicialAvailableTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/availableTasks\?view=judicial/;
  const caseworkerMyTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/myTasks\?view=caseworker/;
  const caseworkerAvailableTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/availableTasks\?view=caseworker/;
  const getTaskFromIDUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/;
  const getTasksByCaseIdUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{16}/;
  const claimTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/claim/;
  const unclaimTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/unclaim/;
  const completeTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/complete/;
  const cancelTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/cancel/;
  const assignTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/assign/;
  const judicialWorkersUrl = /http:\/\/rd-judicialworker-ref-api-aat.service.core-compute-aat.internal\/judicialworkers/;
  const judicialAllTasksUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/allTasks\?view=judicial/;
  const caseworkerAllTasksUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/allTasks\?view=caseworker/;

  const locationField = 'location_id';

  mock.onPost(judicialWorkersUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      JUDICIAL_WORKERS,
    ];
  });

  // simulate some error if needed
  // mock.onGet(url).networkErrorOnce()
  mock.onPost(judicialMyTaskUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const searchConfig = body.search_parameters;
    const locationConfig = getLocationConfig(searchConfig)[0];
    const paginationConfig = body.pagination_parameters;
    const sortingConfig = body.sorting_parameters;
    const filteredTaskList = filterByFieldName(JUDICIAL_MY_TASKS.tasks, locationField, locationConfig.values);
    const taskList = sort(filteredTaskList,
      getSortName(sortingConfig[0].sort_by), (sortingConfig[0].sort_order === 'asc'));
    return [
      200,
      {
        tasks: paginate(taskList, paginationConfig.page_number, paginationConfig.page_size),
        total_records: filteredTaskList.length,
      },
    ];
  });

  // simulate some error if needed
  // mock.onGet(url).networkErrorOnce()
  mock.onPost(judicialAllTasksUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const paginationConfig = body.pagination_parameters;
    const sortingConfig = body.sorting_parameters;
    let allTasks = [...JUDICIAL_AVAILABLE_TASKS.tasks, ...JUDICIAL_MY_TASKS.tasks];
    allTasks = sort(allTasks,
      getSortName(sortingConfig[0].sort_by), (sortingConfig[0].sort_order === 'asc'));
    if (body.search_parameters && body.search_parameters.find(param => param.key === 'location')) {
      const locations = body.search_parameters.find(param => param.key === 'location').values;
      allTasks = allTasks.filter(task => locations.some(loc => task.location_id === loc));
    }
    return [
      200,
      {
        tasks: paginate(allTasks, paginationConfig.page_number, paginationConfig.page_size),
        total_records: allTasks.length,
      },
    ];
  });

  mock.onPost(judicialAvailableTaskUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const searchConfig = body.search_parameters;
    const locationConfig = getLocationConfig(searchConfig)[0];
    const paginationConfig = body.pagination_parameters;
    const sortingConfig = body.sorting_parameters;
    const filteredTaskList = filterByFieldName(JUDICIAL_AVAILABLE_TASKS.tasks, locationField, locationConfig.values);
    const taskList = sort(filteredTaskList,
      getSortName(sortingConfig[0].sort_by), (sortingConfig[0].sort_order === 'asc'));
    return [
      200,
      {
        tasks: paginate(taskList, paginationConfig.page_number, paginationConfig.page_size),
        total_records: filteredTaskList.length,
      },
    ];
  });

  mock.onPost(caseworkerMyTaskUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const searchConfig = body.search_parameters;
    const locationConfig = getLocationConfig(searchConfig)[0];
    const paginationConfig = body.pagination_parameters;
    const sortingConfig = body.sorting_parameters;
    const filteredTaskList = filterByFieldName(CASEWORKER_MY_TASKS.tasks, locationField, locationConfig.values);
    const taskList = sort(filteredTaskList,
      getSortName(sortingConfig[0].sort_by), (sortingConfig[0].sort_order === 'asc'));
    return [
      200,
      {
        tasks: paginate(taskList, paginationConfig.page_number, paginationConfig.page_size),
        total_records: filteredTaskList.length,
      },
    ];
  });

  mock.onPost(caseworkerAllTasksUrl).reply(() => {
    return [
      200,
      {
        tasks: paginate([], 0, 1),
        total_records: 0,
      },
    ];
  });

  mock.onPost(caseworkerAvailableTaskUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const searchConfig = body.search_parameters;
    const locationConfig = getLocationConfig(searchConfig)[0];
    const paginationConfig = body.pagination_parameters;
    const sortingConfig = body.sorting_parameters;
    const filteredTaskList = filterByFieldName(CASEWORKER_AVAILABLE_TASKS.tasks, locationField, locationConfig.values);
    const taskList = sort(filteredTaskList,
      getSortName(sortingConfig[0].sort_by), (sortingConfig[0].sort_order === 'asc'));
    return [
      200,
      {
        tasks: paginate(taskList, paginationConfig.page_number, paginationConfig.page_size),
        total_records: filteredTaskList.length,
      },
    ];
  });

  mock.onGet(getTaskFromIDUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const taskIDs = config.url.match(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/);
    const foundTask = ALL_TASKS.tasks.find(task => task.id === taskIDs[0]);
    return [
      200,
      foundTask,
    ];
  });

  mock.onGet(getTasksByCaseIdUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const caseId = config.url.match(/[a-fA-F0-9]{16}/);
    let tasks = ALL_TASKS.tasks.filter(task => task.case_id === caseId[0]);
    // note: added next line to ensure results returned in all circumstances
    tasks = tasks === [] ? tasks : JUDICIAL_AVAILABLE_TASKS.tasks;
    return [
      200,
      tasks,
    ];
  });

  mock.onPost(claimTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      204,
      'success',
    ];
  });

  mock.onPost(cancelTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      204,
      'success',
    ];
  });

  mock.onPost(unclaimTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      204,
      'success',
    ];
  });

  mock.onPost(completeTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      204,
      'success',
    ];
  });

  mock.onPost(assignTaskUrl).reply(config => {
    const data = JSON.parse(config.data);
    const id = data.userId.toString().substr(0, 1);
    const mod = parseInt(id, 10) % 2;
    if (mod === 0) {
      return [
        204,
        'success',
      ];
    } else {
      return [
        400,
        'failed',
      ];
    }
  });
};

export const getSortName = (sortName: string): string => {
  switch (sortName) {
    case 'caseName':
      return 'case_name';
    case 'caseCategory':
      return 'case_category';
    case 'locationName':
      return 'location_name';
    case 'taskTitle':
      return 'task_title';
    case 'assignee':
      return 'task_title';
    default:
      return sortName;
  }
};

export const getLocationConfig = (searchConfig: any[]): any[] => {
  return searchConfig.filter(config => config.key === 'location');
};

export const sort = (array: any[], sortName: string, isAsc: boolean): any[] => {
  array = array.sort((a, b) => a[sortName].localeCompare(b[sortName]));
  return isAsc ? array : array.reverse();
};

export const paginate = (array: any[], pageNumber: number, pageSize: number): any[] => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const filterByFieldName = (array: any[], fieldName: string, locations: any[]): any[] => {
  return array.filter(item => locations.includes(item[fieldName]));
};
