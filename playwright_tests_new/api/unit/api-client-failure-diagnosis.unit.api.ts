import { expect, test } from '@playwright/test';
import type { ApiClientError, ApiLogEntry } from '@hmcts/playwright-common';

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

  test('classifies an unavailable login route before treating it as a downstream API failure', () => {
    expect(fixturesTest.classifyFailure('AuthenticationError: GET /auth/login responded with 503', [], [], [], false)).toBe(
      'AUTHENTICATION_ROUTE_UNAVAILABLE'
    );
  });

  test('prioritises a transport timeout over its slow-call symptom', () => {
    expect(
      fixturesTest.classifyFailure('', [], [], [{ url: 'https://example.test/route', duration: 20_000, method: 'GET' }], true)
    ).toBe('NETWORK_TIMEOUT');
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

  test('retains a transport failure for the report attachment', () => {
    const entries: ApiLogEntry[] = [];
    const error = {
      status: 0,
      elapsedMs: 30_000,
      logEntry: {
        method: 'POST',
        url: 'https://manage-case.aat.platform.hmcts.net/api/globalSearch/results',
        correlationId: 'correlation-id',
        error: 'Request timed out after 30000ms',
      },
      message: 'Request failed',
    };

    fixturesTest.recordApiClientFailure(entries, error as ApiClientError);

    expect(entries).toEqual([error.logEntry]);
    expect(error.message).toContain('correlationId: correlation-id');
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

  test('redacts ANSI-formatted session headers from Playwright request-context errors', () => {
    expect(
      fixturesTest.redactRequestContextDetails(
        '\u001B[2m    - cookie: xui-webapp=session\u001B[22m\n\u001B[2m    - X-XSRF-TOKEN: secret\u001B[22m'
      )
    ).toBe('    - cookie: [REDACTED]\n    - X-XSRF-TOKEN: [REDACTED]');
  });
});
