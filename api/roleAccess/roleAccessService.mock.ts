import MockAdapter from 'axios-mock-adapter';
import { HttpMockAdapter } from '../common/httpMockAdapter';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const allocateRoleConfirmUrl = /http:\/\/am-role-assignment-service-aat.service.core-compute-aat.internal\/am\/role-assignments/;

  mock.onPost(allocateRoleConfirmUrl).reply(config => {
    const payload = JSON.parse(config.data);
    const durationOfRole = payload.durationOfRole;
    if (durationOfRole === '7 days') {
      return [
        500,
        payload,
      ];
    }
    return [
      200,
      payload,
    ];
  });
};
