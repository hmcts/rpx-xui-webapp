import MockAdapter from 'axios-mock-adapter';
import * as faker from 'faker/locale/en_GB';
import { httpMock } from '../common/httpMock';
import { ActionViews } from './constants/actions';
import { AVAILABLE_TASKS, MY_TASKS, TASK_MANAGER } from './constants/mock.data';

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

  const postMyTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/task/;

  // simulate some error if needed
  // mock.onGet(url).networkErrorOnce()
  mock.onPost(postMyTaskUrl).reply(config => {
    // return an array in the form of [status, data, headers]
    const body = JSON.parse(config.data);
    const paginationConfig = body.searchRequest.pagination_parameters;
    switch (body.view) {
      case ActionViews.MY:
        return [
          200,
          {
            tasks: paginate(MY_TASKS.tasks, paginationConfig.page_number, paginationConfig.page_size),
            total_records: MY_TASKS.tasks.length,
          },
        ];
      case ActionViews.AVAILABLE:
        return [
          200,
          {
            tasks: paginate(AVAILABLE_TASKS.tasks, paginationConfig.page_number, paginationConfig.page_size),
            total_records: AVAILABLE_TASKS.tasks.length,
          },
        ];
      case ActionViews.MANAGER:
        return [
          200,
          {
            tasks: paginate(TASK_MANAGER.tasks, paginationConfig.page_number, paginationConfig.page_size),
            total_records: TASK_MANAGER.tasks.length,
          },
        ];
      default:
        return [
          200,
          [],
        ];
    }
  });

};

export const paginate = (array: any[], pageNumber: number, pageSize: number): any[] => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
