import MockAdapter from 'axios-mock-adapter';
import * as faker from 'faker/locale/en_GB';
import { httpMock } from '../common/httpMock';
import { AVAILABLE_TASKS, MY_TASKS } from './constants/mock.data';

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
  const postAvailableTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/availableTasks/;

  // simulate some error if needed
  // mock.onGet(url).networkErrorOnce()
  mock.onPost(postMyTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      MY_TASKS,
    ];
  });

  mock.onPost(postAvailableTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      AVAILABLE_TASKS,
    ];
  });
};
