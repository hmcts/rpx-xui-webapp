import { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HttpMockAdapter } from '../common/httpMockAdapter';
import {
  ALL_TASKS,
  ASSIGNED_CASE_TASKS,
  JUDICIAL_WORKERS,
  UNASSIGNED_CASE_TASKS
} from './constants/mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getTaskFromIDUrl = /http:\/\/wa-task-management-api-(demo|aat).service.core-compute-(demo|aat).internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/;
  const getTasksByCaseIdUrl = /http:\/\/wa-task-management-api-(demo|aat).service.core-compute-(demo|aat).internal\/task\/[a-fA-F0-9]{16}/;
  const claimTaskUrl = /http:\/\/wa-task-management-api-(demo|aat).service.core-compute-(demo|aat).internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12,13}\/claim/;
  const unclaimTaskUrl = /http:\/\/wa-task-management-api-(demo|aat).service.core-compute-(demo|aat).internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/unclaim/;
  const completeTaskUrl = /http:\/\/wa-task-management-api-(demo|aat).service.core-compute-(demo|aat).internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/complete/;
  const cancelTaskUrl = /http:\/\/wa-task-management-api-(demo|aat).service.core-compute-(demo|aat).internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/cancel/;
  const assignTaskUrl = /http:\/\/wa-task-management-api-(demo|aat).service.core-compute-(demo|aat).internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/assign/;
  const judicialWorkersUrl = /http:\/\/rd-judicialworker-ref-api-(demo|aat).service.core-compute-(demo|aat).internal\/judicialworkers/;

  mock.onPost(judicialWorkersUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      JUDICIAL_WORKERS,
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

  mock.onPost(claimTaskUrl).reply((config: AxiosRequestConfig) => {
    // return an array in the form of [status, data, headers]
    // error
    if (config.url.includes('0d22d836-b25a-11eb-a18c-f2d58a9b7bc18')) {
      return [
        400,
        'error',
      ];
    }
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
