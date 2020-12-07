import { TaskFieldType, TaskService, TaskSort, TaskView } from '../enums';
import { Location } from '../models/dtos';
import { Task, TaskFieldConfig, TaskServiceConfig } from '../models/tasks';
import { Caseworker } from './../../../api/workAllocation/interfaces/task';

const LOCATION_A: Location = { id: 'a', locationName: 'Taylor House', services: [ 'a' ] };
const LOCATION_B: Location = { id: 'b', locationName: 'Taylor Swift', services: [ 'a', 'b' ] };
export function getMockLocations(): Location[] {
  return [ LOCATION_A, LOCATION_B ];
};

export function getMockCaseworkers(): Caseworker[] {
  return [
    {
      firstName: 'John',
      lastName: 'Smith',
      idamId: '1',
      location: LOCATION_A
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      idamId: '2',
      location: LOCATION_B
    }
  ];
};

/**
 * Mock tasks
 */
export function getMockTasks(): Task[] {
  return [
    {
      id: '1549476532065586',
      caseReference: '1549 4765 3206 5586',
      caseName: 'Kili Muso',
      caseCategory: 'Protection',
      location: 'Taylor House',
      taskName: 'Review respondent evidence',
      dueDate: new Date(628021800000),
      actions: [
        {
          id: 'actionId1',
          title: 'Reassign task',
        },
        {
          id: 'actionId2',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '1549476532065587',
      caseReference: '1549 4765 3206 5587',
      caseName: 'Mankai Lit',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(628021800000),
      actions: [
        {
          id: 'actionId2',
          title: 'Release this task',
        }
      ]
    }
  ];
}

/**
 * Mock fields
 */
export function getMockTaskFieldConfig(): TaskFieldConfig[] {
  return [
    {
      name: 'caseReference',
      type: TaskFieldType.STRING,
      columnLabel: 'Case reference',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'caseName',
      type: TaskFieldType.STRING,
      columnLabel: 'Case name',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'caseCategory',
      type: TaskFieldType.STRING,
      columnLabel: 'Case category',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'location',
      type: TaskFieldType.STRING,
      columnLabel: 'Location',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'taskName',
      type: TaskFieldType.STRING,
      columnLabel: 'Task',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'dueDate',
      type: TaskFieldType.STRING,
      columnLabel: 'Due Dated',
      views: TaskView.TASK_LIST,
    }
  ];
}

/**
 * Mock TaskServiceConfig.
 */
export function getMockTaskServiceConfig(): TaskServiceConfig {
  return {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.ASC,
    defaultSortFieldName: 'dueDate',
    fields: getMockTaskFieldConfig()
  };
}
