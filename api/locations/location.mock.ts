import MockAdapter from 'axios-mock-adapter';
import {HttpMockAdapter} from '../common/httpMockAdapter';
import {EMPTY_HEARINGS_LIST, HEARINGS_LIST} from './data/mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getHearingsUrl = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearings\/[0-9]{16}/;

  mock.onGet(getHearingsUrl).reply(() => {
    return [
      200,
      HEARINGS_LIST,
    ];
  });

};
