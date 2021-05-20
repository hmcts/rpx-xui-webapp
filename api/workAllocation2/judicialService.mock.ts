import MockAdapter from 'axios-mock-adapter';
import { httpMock } from '../common/httpMock';
import { JUDICIAL_WORKERS } from './constants/mock.data';

export const init = () => {
  const mock = new MockAdapter(httpMock);
  const judicialWorkersUrl = /http:\/\/rd-judicial-ref-api-aat.service.core-compute-aat.internal\/judicialworkers/;
  mock.onPost(judicialWorkersUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      JUDICIAL_WORKERS,
    ];
  });
};
