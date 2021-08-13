import MockAdapter from 'axios-mock-adapter';
import { HttpMockAdapter } from '../common/httpMockAdapter';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const allocateRoleConfirmUrl = /http:\/\/am-role-assignment-service-aat.service.core-compute-aat.internal\/am\/role-assignments/;

  mock.onPost(allocateRoleConfirmUrl).reply(() => {
    // return an array in the form of [status, data, headers]
    return [
      200,
      [],
    ];
  });
  return mock;
};
