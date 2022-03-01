import MockAdapter from 'axios-mock-adapter';
import {HttpMockAdapter} from '../common/httpMockAdapter';
import {HEARING_ACTUAL} from './data/hearing-actuals.mock.data';
import {EMPTY_HEARINGS_LIST, HEARINGS_LIST} from './data/hearingLists.mock.data';
import {HEARING_REQUEST_RESULTS} from './data/hearingRequests.mock.data';
import {SERVICE_HEARING_VALUES} from './data/serviceHearingValues.mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getHearingsUrl = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearings\/[0-9]{16}/;

  const getHearingInfoUrl = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearing\/[\w]*/;

  const postServiceHearingValues = /https:\/\/hearings.aat.service.core-compute-aat.internal\/serviceHearingValues/;

  const submitHearingRequest = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearing/;

  const updateHearingRequest = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearing/;

  const cancelHearingRequest = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearing\/[\w]*/;

  const hearingActualsUrl = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearingActuals\/[\w]*/;

  const postHearingActualsUrl = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearingActualsCompletion\/[\w]*/;

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

  mock.onGet(getHearingInfoUrl).reply(config => {
    const urlPaths: string[] = config.url.split('/');
    const hearingId = urlPaths[urlPaths.length - 1];
    const FOUND_A_HEARING = HEARING_REQUEST_RESULTS.find(hearing => hearing.caseDetails.hearingID === hearingId);
    return [
      200,
      FOUND_A_HEARING,
    ];
  });

  mock.onPost(postServiceHearingValues).reply(() => {
    return [
      200,
      SERVICE_HEARING_VALUES,
    ];
  });

  mock.onPost(submitHearingRequest).reply(() => {
    return [
      200,
      [],
    ];
  });

  mock.onPut(updateHearingRequest).reply(() => {
    return [
      200,
      [],
    ];
  });

  mock.onDelete(cancelHearingRequest).reply(() => {
    return [
      200,
      {},
    ];
  });

  mock.onGet(hearingActualsUrl).reply(() => {
    return [
      200,
      HEARING_ACTUAL,
    ];
  });

  mock.onPut(hearingActualsUrl).reply(() => {
    return [
      200,
      HEARING_ACTUAL,
    ];
  });

  mock.onPost(postHearingActualsUrl).reply(() => {
    return [
      200,
      [],
    ];
  });
};
