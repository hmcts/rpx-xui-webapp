import MockAdapter from 'axios-mock-adapter';
import { HttpMockAdapter } from '../common/httpMockAdapter';
import {
  ALL_TASKS,
  ASSIGNED_CASE_TASKS,
  ASSIGNED_TASKS,
  CASEWORKER_AVAILABLE_TASKS,
  CASEWORKER_MY_TASKS,
  JUDICIAL_AVAILABLE_TASKS,
  JUDICIAL_MY_TASKS,
  JUDICIAL_WORKERS,
  UNASSIGNED_CASE_TASKS
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
    if (body.search_parameters) {
      if (body.search_parameters.find(param => param.key === 'location')) {
        const locations = body.search_parameters.find(param => param.key === 'location').values;
        allTasks = allTasks.filter(task => locations.some(loc => task.location_id === loc));
      }
      allTasks = filterByAssignee(body.search_parameters, allTasks);
      allTasks = filterByTaskField(body.search_parameters, allTasks, 'taskType', 'task_type');
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

  mock.onPost(caseworkerAllTasksUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const paginationConfig = body.pagination_parameters;
    const sortingConfig = body.sorting_parameters;
    // note as not necessary to edit all mock data, re-using changes to judicial tasks
    let allTasks = [...JUDICIAL_AVAILABLE_TASKS.tasks, ...ASSIGNED_TASKS.tasks, ...JUDICIAL_MY_TASKS.tasks];
    allTasks = sort(allTasks,
      getSortName(sortingConfig[0].sort_by), (sortingConfig[0].sort_order === 'asc'));
    if (body.search_parameters) {
      if (body.search_parameters.find(param => param.key === 'location')) {
        const locations = body.search_parameters.find(param => param.key === 'location').values;
        allTasks = allTasks.filter(task => locations.some(loc => task.location_id === loc));
      }
      allTasks = filterByAssignee(body.search_parameters, allTasks);
      allTasks = filterByTaskField(body.search_parameters, allTasks, 'taskType', 'task_type');
      allTasks = filterByPriority(body.search_parameters, allTasks);
    }
    return [
      200,
      {
        tasks: paginate(allTasks, paginationConfig.page_number, paginationConfig.page_size),
        total_records: allTasks.length,
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
    const tasks = [...ASSIGNED_CASE_TASKS.tasks, ...UNASSIGNED_CASE_TASKS.tasks];
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

export const filterByTaskField = (array: any[], taskList: any[], fieldName: string, taskFieldName: string): any[] => {
  if (array.find(param => param.key === fieldName)) {
    const fieldValue = array.find(param => param.key === fieldName).values[0];
    if (fieldValue === 'All') {
      return taskList;
    }
    return taskList.filter(task => fieldValue === task[taskFieldName]);
  }
  return taskList;
};

export const filterByAssignee = (array: any[], taskList: any[]): any[] => {
  if (array.find(param => param.key === 'taskCategory')) {
    const fieldValue = array.find(param => param.key === 'taskCategory').values[0];
    switch (fieldValue) {
      case 'All': {
        return taskList;
      }
      case 'None / Available tasks': {
        return taskList.filter(task => task.assignee === null || task.assignee === '');
      }
      case 'Specific person': {
        if (array.find(param => param.key === 'person')) {
          const personId = array.find(param => param.key === 'person').values[0].id;
          return taskList.filter(task => task.assignee === personId);
        }
      }
    }
  }
  return taskList;
};

export const filterByPriority = (array: any[], taskList: any[]): any[] => {
  if (array.find(param => param.key === 'priority')) {
    const fieldValue = array.find(param => param.key === 'priority').values[0];
    const today = new Date();
    switch (fieldValue) {
      case 'All': {
        return taskList;
      }
      case 'High': {
        return taskList.filter(task => new Date(task.dueDate) < today && !isToday(task.dueDate));
      }
      case 'Medium': {
        return taskList.filter(task => isToday(task.dueDate));
      }
      case 'Low': {
        return taskList.filter(task => new Date(task.dueDate) > today && !isToday(task.dueDate));
      }
    }
  }
  return taskList;
};

export const filterByFieldName = (array: any[], fieldName: string, locations: any[]): any[] => {
  return array.filter(item => locations.includes(item[fieldName]));
};

export const isToday = (date: string): boolean => {
  const today = new Date();
  return new Date(date).toDateString() === today.toDateString();
};
