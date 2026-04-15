import { expect, test } from '@playwright/test';
import { getChallengedAccessReasonDetails } from '../../integration/helpers/challengedAccessRequest.helper.js';

test.describe('challenged access request helper', { tag: '@svc-internal' }, () => {
  test('parses access-reason details from the AM payload envelope', () => {
    expect(
      getChallengedAccessReasonDetails({
        requestedRoles: [
          {
            attributes: {
              accessReason: JSON.stringify({
                reason: 3,
                otherReason: 'Urgent safeguarding review required before hearing.',
              }),
            },
          },
        ],
      })
    ).toEqual({
      reason: 3,
      otherReason: 'Urgent safeguarding review required before hearing.',
    });
  });

  test('falls back to an empty object when the AM payload omits accessReason details', () => {
    expect(getChallengedAccessReasonDetails({})).toEqual({});
  });
});
