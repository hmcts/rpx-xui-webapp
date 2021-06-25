import MockAdapter from 'axios-mock-adapter';
import * as faker from 'faker/locale/en_GB';
import { httpMock } from '../common/httpMock';
import {
  ALL_TASKS,
  CASEWORKER_AVAILABLE_TASKS,
  CASEWORKER_MY_TASKS,
  JUDICIAL_AVAILABLE_TASKS,
  JUDICIAL_MY_TASKS, JUDICIAL_WORKERS
} from './constants/mock.data';

// random generator
export const generator = (schema, min = 1, max) => {
  max = max || min;
  return Array.from({
    length: faker.random.number({
      min,
      // tslint:disable-next-line:object-literal-sort-keys
      max,
    }),
  }).map(() => {
    const innerGen = anySchema => Object.keys(anySchema).reduce((entity, key) => {
      if (anySchema[key] instanceof Array || anySchema[key] === null) {
        entity[key] = anySchema[key];
        return entity;
      }
      if (Object.prototype.toString.call(anySchema[key]) === '[object Object]') {
        entity[key] = innerGen(anySchema[key]);
        return entity;
      }
      entity[key] = faker.fake(anySchema[key]);
      return entity;
    }, {});

    return innerGen(schema);
  });
};

export const init = () => {
  const mock = new MockAdapter(httpMock);

  const judicialMyTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/myTasks\?view=judicial/;
  // tslint:disable-next-line:max-line-length
  const judicialAvailableTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/availableTasks\?view=judicial/;
  const caseworkerMyTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/myTasks\?view=caseworker/;
  // tslint:disable-next-line:max-line-length
  const caseworkerAvailableTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/availableTasks\?view=caseworker/;
  // tslint:disable-next-line:max-line-length
  const getTaskFromIDUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/;
  // tslint:disable-next-line:max-line-length
  const claimTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/claim/;
  // tslint:disable-next-line:max-line-length
  const unclaimTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/unclaim/;
  // tslint:disable-next-line:max-line-length
  const assignTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/assign/;

  const judicialWorkersUrl = /http:\/\/rd-judicialworker-ref-api-aat.service.core-compute-aat.internal\/judicialworkers/;
  // tslint:disable-next-line:max-line-length
  const judicialAllTasksUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/allTasks\?view=judicial/;
  // tslint:disable-next-line:max-line-length
  const caseworkerAllTasksUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/allTasks\?view=caseworker/;

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
    const paginationConfig = body.pagination_parameters;
    return [
      200,
      {
        tasks: paginate(JUDICIAL_MY_TASKS.tasks, paginationConfig.page_number, paginationConfig.page_size),
        total_records: JUDICIAL_MY_TASKS.tasks.length,
      },
    ];
  });

    // simulate some error if needed
  // mock.onGet(url).networkErrorOnce()
  mock.onPost(judicialAllTasksUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const paginationConfig = body.pagination_parameters;
    return [
      200,
      {
        tasks: paginate(JUDICIAL_MY_TASKS.tasks, paginationConfig.page_number, paginationConfig.page_size),
        total_records: JUDICIAL_MY_TASKS.tasks.length,
      },
    ];
  });

  mock.onPost(judicialAvailableTaskUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const paginationConfig = body.pagination_parameters;
    return [
      200,
      {
        tasks: paginate(JUDICIAL_AVAILABLE_TASKS.tasks, paginationConfig.page_number, paginationConfig.page_size),
        total_records: JUDICIAL_AVAILABLE_TASKS.tasks.length,
      },
    ];
  });

  mock.onPost(caseworkerMyTaskUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const paginationConfig = body.pagination_parameters;
    return [
      200,
      {
        tasks: paginate(CASEWORKER_MY_TASKS.tasks, paginationConfig.page_number, paginationConfig.page_size),
        total_records: CASEWORKER_MY_TASKS.tasks.length,
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
    const paginationConfig = body.pagination_parameters;
    return [
      200,
      {
        tasks: paginate(CASEWORKER_AVAILABLE_TASKS.tasks, paginationConfig.page_number, paginationConfig.page_size),
        total_records: CASEWORKER_AVAILABLE_TASKS.tasks.length,
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

  mock.onPost(claimTaskUrl).reply(() => {
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

  mock.onPost(assignTaskUrl).reply(config => {
    const data = JSON.parse(config.data);
    const id = data.userId.toString().replace(/[^0-9.]/g, '');
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

export const paginate = (array: any[], pageNumber: number, pageSize: number): any[] => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
