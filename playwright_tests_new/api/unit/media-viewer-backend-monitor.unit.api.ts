import { expect, test } from '@playwright/test';
import type { Page, Response } from '@playwright/test';

import { MediaViewerBackendMonitor } from '../../E2E/utils/test-setup/mediaViewerBackendMonitor.js';

function response({ method = 'GET', status, url }: { method?: string; status: number; url: string }): Response {
  return {
    ok: () => status >= 200 && status <= 299,
    request: () => ({
      method: () => method,
    }),
    status: () => status,
    url: () => url,
  } as Response;
}

test.describe('Media Viewer backend monitor', { tag: '@svc-internal' }, () => {
  test('records only successful document binary responses', async () => {
    const monitor = new MediaViewerBackendMonitor();

    monitor.onResponse(
      response({
        status: 500,
        url: 'https://xui.example/documents/document-1/binary',
      })
    );
    expect(monitor.lastDocumentBinaryUrl).toBe('');

    monitor.onResponse(
      response({
        status: 200,
        url: 'https://xui.example/documents/document-1/binary',
      })
    );

    expect(monitor.lastDocumentBinaryUrl).toBe('https://xui.example/documents/document-1/binary');
  });

  test('fails fast when a critical downstream 5xx is observed during an action', async () => {
    const monitor = new MediaViewerBackendMonitor();
    const action = new Promise(() => undefined);

    const result = monitor.failFastOnCriticalBackendFailure('case setup', action);
    monitor.onResponse(
      response({
        status: 500,
        url: 'https://xui.example/aggregated/caseworkers/user-1/jurisdictions',
      })
    );

    await expect(result).rejects.toThrow(/Media Viewer case setup hit a downstream 5xx/);
  });

  test('ignores non-critical 5xx responses and non-GET critical responses', () => {
    const monitor = new MediaViewerBackendMonitor();

    monitor.onResponse(
      response({
        status: 500,
        url: 'https://xui.example/api/configuration',
      })
    );
    monitor.onResponse(
      response({
        method: 'POST',
        status: 500,
        url: 'https://xui.example/data/internal/cases/1234567890123456',
      })
    );

    expect(() => monitor.failIfCriticalBackendFailure('load')).not.toThrow();
  });

  test('waits for document binary response through the supplied page', async () => {
    const monitor = new MediaViewerBackendMonitor();
    let predicateAccepted = false;
    const page = {
      waitForResponse: async (predicate: (candidate: Response) => boolean) => {
        const candidate = response({
          status: 200,
          url: 'https://xui.example/documentsv2/document-2/binary',
        });
        predicateAccepted = predicate(candidate);
        return candidate;
      },
    } as Page;

    await monitor.waitForDocumentBinaryResponse(page);

    expect(predicateAccepted).toBe(true);
    expect(monitor.lastDocumentBinaryUrl).toBe('https://xui.example/documentsv2/document-2/binary');
  });
});
