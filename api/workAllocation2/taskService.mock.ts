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

export const filterByFieldName = (array: any[], fieldName: string, locations: any[]): any[] => {
  return array.filter(item => locations.includes(item[fieldName]));
};

export const isToday = (date: string): boolean => {
  const today = new Date();
  return new Date(date).toDateString() === today.toDateString();
};
