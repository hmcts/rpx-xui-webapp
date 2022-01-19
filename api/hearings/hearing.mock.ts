import MockAdapter from 'axios-mock-adapter';
import { HttpMockAdapter } from '../common/httpMockAdapter';
import { CASE_FLAG_REFERENCE_VALUES } from './data/caseFlagReference.mock.data';
import { EMPTY_HEARINGS_LIST, HEARINGS_LIST } from './data/hearings.mock.data';
import { ALL_REF_DATA } from './data/reference.mock.data';
import { SERVICE_HEARING_VALUES } from './data/serviceHearingValues.mock.data';
import { EXUISectionStatusEnum, HearingListingStatusEnum, EXUIDisplayStatusEnum, HMCStatus } from './models/hearings.enum';
import { AxiosRequestConfig } from 'axios';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getHearingsUrl = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearings\/[0-9]{16}/;

  const getRefDataUrl = /http:\/\/rd-professional-api-aat.service.core-compute-aat.internal\/refdata\/lov\/[\w]*\/[\w]*/;

  const getCaseFlagRefDataUrl = /http:\/\/rd-professional-api-aat.service.core-compute-aat.internal\/caseflagrefdata/;

  const postServiceHearingValues = /https:\/\/hearings.aat.service.core-compute-aat.internal\/serviceHearingValues/;

  const submitHearingRequest = /https:\/\/hearings.aat.service.core-compute-aat.internal\/hearing/;

  const cancelHearingRequest = /https:\/\/hearings.aat.service.core-compute-aat.internal\/cancelHearings\/[0-9]{16}/;

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

  mock.onGet(getCaseFlagRefDataUrl).reply(() => {
    return [
      200,
      CASE_FLAG_REFERENCE_VALUES,
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

  mock.onPut(cancelHearingRequest).reply((config: AxiosRequestConfig) => {
    const data = JSON.parse(config.data);
    const index = HEARINGS_LIST.caseHearings.findIndex(caseHearing => caseHearing.hearingID === data.hearingID);

    if (index) {
      HEARINGS_LIST.caseHearings[index].hearingListingStatus = HearingListingStatusEnum.CANCELLATION_REQUESTED;
      HEARINGS_LIST.caseHearings[index].hmcStatus = HMCStatus.CANCELLATION_REQUESTED;
    }

    data.hearingListingStatus = HearingListingStatusEnum.CANCELLATION_REQUESTED;
    data.exuiSectionStatus = EXUISectionStatusEnum.UPCOMING;
    data.exuiDisplayStatus = EXUIDisplayStatusEnum.CANCELLATION_REQUESTED;
    return [
      200,
      HEARINGS_LIST.caseHearings[index],
    ];
  });
};
