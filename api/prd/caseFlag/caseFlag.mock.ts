import MockAdapter from 'axios-mock-adapter';
import {HttpMockAdapter} from '../../common/httpMockAdapter';
import {CASE_FLAG_REFERENCE_VALUES} from './data/caseFlagReference.mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getCaseFlagRefDataUrl = /http:\/\/rd-professional-api-aat.service.core-compute-aat.internal\/caseflagrefdata/;

  mock.onGet(getCaseFlagRefDataUrl).reply(() => {
    return [
      200,
      CASE_FLAG_REFERENCE_VALUES,
    ];
  });

};
