import MockAdapter from 'axios-mock-adapter';
import {HttpMockAdapter} from '../../common/httpMockAdapter';
import {ALL_REF_DATA} from './data/lov.mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getRefDataUrl = /http:\/\/rd-professional-api-aat.service.core-compute-aat.internal\/refdata\/lov\/[\w]*\/[\w]*/;

  mock.onGet(getRefDataUrl).reply(() => {
    return [
      200,
      ALL_REF_DATA,
    ];
  });

};
