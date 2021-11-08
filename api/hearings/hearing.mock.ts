import MockAdapter from 'axios-mock-adapter';
import {HttpMockAdapter} from '../common/httpMockAdapter';
import {EMPTY_HEARINGS_LIST, HEARINGS_LIST, STAGES} from './data/mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getHearingsUrl = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearings\/[0-9]{16}/;
  // const getHearingsUrl = /https:\/\/hearings.demo.service.core-compute-demo.internal\/hearings\/[0-9]{16}/;

  const getStagesUrl = /https:\/\/hearings.aat.service.core-compute-aat.internal\/stages\/[\w]*/;
  // const getStagesUrl = /https:\/\/hearings.demo.service.core-compute-demo.internal\/stages\/[\w]*/;

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

  mock.onGet(getStagesUrl).reply(config => {
    return [
      200,
      STAGES,
    ];
  });
};
