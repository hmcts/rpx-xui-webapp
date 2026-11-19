import { runInNewContext } from 'node:vm';
import type { Page, Route } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { setupQueryManagementMockRoutes } from '../../integration/helpers/queryManagementMockRoutes.helper';
import { observeQueryDocumentViewer } from '../../integration/helpers/queryDocumentMockRoutes.helper';
import { QUERY_MANAGEMENT_CONFIGURED_FLAGS } from '../../integration/mocks/queryManagement.mock';

test('query flags support SDK REPORT evaluation while events and goals retain their distinct responses', async () => {
  const routes = new Map<string, (route: Route) => Promise<void>>();
  const page = {
    addInitScript: async () => undefined,
    route: async (pattern: string, handler: (route: Route) => Promise<void>) => routes.set(String(pattern), handler),
  } as unknown as Page;
  await setupQueryManagementMockRoutes(page, { featureFlags: QUERY_MANAGEMENT_CONFIGURED_FLAGS });
  const handler = routes.get('**/*launchdarkly.com/**')!;
  const responses: Array<{ status: number; body: string }> = [];
  for (const [method, path] of [
    ['REPORT', '/sdk/evalx/test/context'],
    ['GET', '/sdk/goals/test'],
    ['POST', '/events/bulk/test'],
  ]) {
    await handler({
      request: () => ({ method: () => method, url: () => `https://clientstream.launchdarkly.com${path}` }),
      fulfill: async (response: { status: number; body: string }) => responses.push(response),
    } as unknown as Route);
  }
  expect(responses.map((response) => response.status)).toEqual([200, 200, 202]);
  expect(JSON.parse(responses[0].body)['qm-qualifying-questions'].value).toEqual(
    QUERY_MANAGEMENT_CONFIGURED_FLAGS['qm-qualifying-questions']
  );
  expect(JSON.parse(responses[1].body)).toEqual([]);
  expect(responses[2].body).toBe('');
});

test('viewer observer records only same-origin document handoffs without modifying the message', async () => {
  let record: (_source: unknown, payload: string) => void;
  let listener: (event: unknown) => void;
  const browserWindow = {
    location: { origin: 'http://localhost:4314' },
    addEventListener: (_event: string, callback: (event: unknown) => void) => {
      listener = callback;
    },
    recordQueryDocumentHandoff: (payload: string) => record({}, payload),
  };
  const page = {
    context: () => ({
      exposeBinding: async (_name: string, callback: typeof record) => {
        record = callback;
      },
      addInitScript: async (callback: () => void) => {
        runInNewContext(`(${callback.toString()})()`, { window: browserWindow });
      },
    }),
  } as unknown as Page;
  const handoffs = await observeQueryDocumentViewer(page);
  const payload = JSON.stringify({ document_filename: 'selected.pdf', document_binary_url: '/documentsv2/selected/binary' });
  listener!({ origin: 'https://unrelated.invalid', data: { type: 'MEDIA_VIEWER_HANDOFF', payload } });
  listener!({ origin: browserWindow.location.origin, data: { type: 'unrelated', payload } });
  expect(handoffs).toEqual([]);
  listener!({ origin: browserWindow.location.origin, data: { type: 'MEDIA_VIEWER_HANDOFF', payload } });
  expect(handoffs).toEqual([JSON.parse(payload)]);
});
