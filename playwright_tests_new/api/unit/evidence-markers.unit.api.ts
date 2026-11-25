import { expect, test } from '@playwright/test';

import {
  annotateIdentityLeaseWait,
  attachServiceFailures,
  buildServiceFailureRecords,
  downstreamServiceForPath,
  IDENTITY_LEASE_WAIT_ANNOTATION,
  SERVICE_FAILURE_ATTACHMENT,
} from '../../E2E/utils/evidenceMarkers.js';

const realFailure = (url: string, status: number, method = 'GET') => ({ url, method, status, servedByNetwork: true });

test.describe('CI evidence markers', { tag: '@svc-internal' }, () => {
  test('names only downstream pass-through routes, never XUI node routes', () => {
    expect(downstreamServiceForPath('/workallocation/task')).toBe('work-allocation');
    expect(downstreamServiceForPath('/data/internal/cases/:id')).toBe('ccd-data-store');
    expect(downstreamServiceForPath('/aggregated/caseworkers/:id/jurisdictions')).toBe('ccd-data-store');
    expect(downstreamServiceForPath('/caseworkers/:id/profile')).toBe('ccd-data-store');
    expect(downstreamServiceForPath('/api/user/details')).toBeUndefined();
    expect(downstreamServiceForPath('/auth/isAuthenticated')).toBeUndefined();
  });

  test('keeps real downstream 5xx and drops 4xx, mocked, unknown-origin and unnamed failures', () => {
    const records = buildServiceFailureRecords([
      realFailure('https://xui.example/workallocation/task', 504, 'post'),
      realFailure('https://xui.example/data/internal/cases/:id', 404),
      { ...realFailure('https://xui.example/data/internal/cases/:id', 500), servedByNetwork: false },
      { url: 'https://xui.example/data/internal/cases/:id', method: 'GET', status: 502 },
      realFailure('https://xui.example/api/user/details', 500),
      realFailure('not a url', 500),
    ]);

    expect(records).toEqual([{ service: 'work-allocation', method: 'POST', url_path: '/workallocation/task', status: 504 }]);
  });

  test('de-duplicates repeated failures and bounds the record count', () => {
    const repeated = Array.from({ length: 3 }, () => realFailure('https://xui.example/data/cases/:id', 503));
    const distinct = Array.from({ length: 8 }, (_, index) => realFailure(`https://xui.example/data/route${index}/x`, 500));

    expect(buildServiceFailureRecords(repeated)).toHaveLength(1);
    expect(buildServiceFailureRecords(distinct)).toHaveLength(5);
  });

  test('drops paths the harness would reject as oversized', () => {
    const longPath = `/data/${'a'.repeat(240)}`;
    expect(buildServiceFailureRecords([realFailure(`https://xui.example${longPath}`, 500)])).toEqual([]);
  });

  test('attaches each record as a JSON service-failure attachment', async () => {
    const attachments: Array<{ name: string; body?: string; contentType?: string }> = [];
    const testInfo = {
      attach: async (name: string, options: { body?: string; contentType?: string } = {}) => {
        attachments.push({ name, body: options.body, contentType: options.contentType });
      },
    };

    await attachServiceFailures(testInfo, [
      realFailure('https://xui.example/data/internal/cases/:id', 502),
      realFailure('https://xui.example/api/user/details', 500),
    ]);

    expect(attachments).toEqual([
      {
        name: SERVICE_FAILURE_ATTACHMENT,
        contentType: 'application/json',
        body: JSON.stringify({ service: 'ccd-data-store', method: 'GET', url_path: '/data/internal/cases/:id', status: 502 }),
      },
    ]);
  });

  test('records a contended identity-lease wait and the resulting timeout', () => {
    const testInfo = { annotations: [] as Array<{ type: string; description?: string }> };

    annotateIdentityLeaseWait(testInfo, 1234.6, 300_000);

    expect(testInfo.annotations).toEqual([
      { type: IDENTITY_LEASE_WAIT_ANNOTATION, description: 'waited_ms=1235 timeout_ms=300000' },
    ]);
  });

  test('does not annotate an uncontended identity-lease acquire', () => {
    const testInfo = { annotations: [] as Array<{ type: string; description?: string }> };

    annotateIdentityLeaseWait(testInfo, 0, 180_000);
    annotateIdentityLeaseWait(testInfo, 999, 180_000);
    annotateIdentityLeaseWait(testInfo, -5, 180_000);
    annotateIdentityLeaseWait(testInfo, Number.NaN, 180_000);

    expect(testInfo.annotations).toEqual([]);
  });

  test('records short identity-lease acquisition only when capacity capture is enabled', () => {
    const testInfo = { annotations: [] as Array<{ type: string; description?: string }> };

    annotateIdentityLeaseWait(testInfo, 125, 180_000, true);

    expect(testInfo.annotations).toEqual([
      { type: IDENTITY_LEASE_WAIT_ANNOTATION, description: 'waited_ms=125 timeout_ms=180000' },
    ]);
  });
});
