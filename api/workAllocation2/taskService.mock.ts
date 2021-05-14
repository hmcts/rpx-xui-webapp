import MockAdapter from 'axios-mock-adapter';
import * as faker from 'faker/locale/en_GB';
import { httpMock } from '../common/httpMock';
import { CASEWORKER_AVAILABLE_TASKS,
  CASEWORKER_MY_TASKS,
  JUDICIAL_AVAILABLE_TASKS,
  JUDICIAL_MY_TASKS } from './constants/mock.data';

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
  const judicialAvailableTaskUrl =
    /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/availableTasks\?view=judicial/;
  const caseworkerMyTaskUrl = /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/myTasks\?view=caseworker/;
  const caseworkerAvailableTaskUrl =
    /http:\/\/wa-task-management-api-aat.service.core-compute-aat.internal\/availableTasks\?view=caseworker/;

  // simulate some error if needed
  // mock.onGet(url).networkErrorOnce()
  mock.onPost(judicialMyTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      JUDICIAL_MY_TASKS,
    ];
  });

  mock.onPost(judicialAvailableTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      JUDICIAL_AVAILABLE_TASKS,
    ];
  });

  mock.onPost(caseworkerMyTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      CASEWORKER_MY_TASKS,
    ];
  });

  mock.onPost(caseworkerAvailableTaskUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      CASEWORKER_AVAILABLE_TASKS,
    ];
  });
};
