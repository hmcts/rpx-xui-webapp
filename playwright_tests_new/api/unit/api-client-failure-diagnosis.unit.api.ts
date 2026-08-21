import { expect, test } from '@playwright/test';

import { __test__ as fixturesTest } from '../fixtures';

test.describe('Node API client failure diagnosis', { tag: '@svc-internal' }, () => {
  test('identifies the XUI external configuration route in a thrown client error', () => {
    const message = fixturesTest.formatApiClientFailure({
      status: 503,
      elapsedMs: 42,
      logEntry: {
        method: 'GET',
        url: 'https://manage-case.aat.platform.hmcts.net/external/config/ui?cacheBust=1',
        correlationId: 'correlation-id',
      },
    });

    expect(message).toBe(
      'GET https://manage-case.aat.platform.hmcts.net/external/config/ui responded with 503 (target: XUI external UI configuration route; correlationId: correlation-id; elapsed: 42ms)'
    );
  });

  test('does not mislabel XUI authentication routes as downstream services', () => {
    expect(fixturesTest.describeApiTarget('https://manage-case.aat.platform.hmcts.net/auth/login')).toBe(
      'XUI authentication route'
    );
  });

  test('identifies a Work Allocation timeout without exposing transport details', () => {
    const message = fixturesTest.formatApiClientFailure({
      status: 0,
      elapsedMs: 15_000,
      logEntry: {
        method: 'GET',
        url: 'https://manage-case.aat.platform.hmcts.net/workallocation/my-work/myaccess',
        error: 'apiRequestContext.get: Timeout 15000ms exceeded.',
      },
    });

    expect(message).toBe(
      'GET https://manage-case.aat.platform.hmcts.net/workallocation/my-work/myaccess responded with 0 (target: Work Allocation API route /workallocation/my-work/myaccess; transport: timeout; elapsed: 15000ms)'
    );
  });

  test('redacts session headers from Playwright request-context errors', () => {
    expect(
      fixturesTest.redactRequestContextDetails(
        'Call log:\n  - → GET https://manage-case.aat.platform.hmcts.net/data/internal/profile\n    - X-XSRF-TOKEN: secret\n    - cookie: xui-webapp=session\n    - accept: */*'
      )
    ).toBe(
      'Call log:\n  - → GET https://manage-case.aat.platform.hmcts.net/data/internal/profile\n    - X-XSRF-TOKEN: [REDACTED]\n    - cookie: [REDACTED]\n    - accept: */*'
    );
  });
});
