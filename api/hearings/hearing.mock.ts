import MockAdapter from 'axios-mock-adapter';
import {HttpMockAdapter} from '../common/httpMockAdapter';
import {EMPTY_HEARINGS_LIST, HEARINGS_LIST} from './data/hearings.mock.data';
import {ALL_REF_DATA} from './data/reference.mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getHearingsUrl = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearings\/[0-9]{16}/;

  const getRefDataUrl = /http:\/\/rd-professional-api-aat.service.core-compute-aat.internal\/refdata\/lov\/[\w]*\/[\w]*/;

  mock.onGet(getHearingsUrl).reply(config => {
    const url = config.url;
    const caseIds = url.match(/[0-9]{16}/g);
    const mod = parseInt(caseIds[0], 10) % 2;
    if (mod === 1) {
      return [
        200,
        HEARINGS_LIST,
      ];
    } else {
      return [
        200,
        EMPTY_HEARINGS_LIST,
      ];
    }
  });

  mock.onGet(getRefDataUrl).reply(() => {
    return [
      200,
      ALL_REF_DATA,
    ];
  });
};
