import { expect, test } from '@playwright/test';
import type { Response } from '@playwright/test';

import {
  assertDocumentUploadRuntimeAliasConfigured,
  createDocumentUploadUpdateEventTracker,
  resolveDocumentUploadTranslatedLabel,
} from '../../E2E/utils/test-setup/documentUploadLiveSupport.js';
import { RuntimeUserAlias } from '../../E2E/utils/runtimeUserCredentials.js';

function response({
  method = 'POST',
  status,
  url,
  body,
}: {
  method?: string;
  status: number;
  url: string;
  body?: unknown;
}): Response {
  return {
    json: async () => body,
    request: () => ({
      method: () => method,
    }),
    status: () => status,
    url: () => url,
  } as Response;
}

test.describe('Document upload live support', { tag: '@svc-internal' }, () => {
  test('accepts configured runtime aliases and rejects unknown aliases', () => {
    expect(() => assertDocumentUploadRuntimeAliasConfigured(RuntimeUserAlias.DIVORCE_SOLICITOR)).not.toThrow();
    expect(() => assertDocumentUploadRuntimeAliasConfigured('UNKNOWN_ALIAS')).toThrow(
      "Document upload tests require runtime alias 'UNKNOWN_ALIAS' to be configured."
    );
  });

  test('resolves translated labels and falls back to the source label', async () => {
    await expect(
      resolveDocumentUploadTranslatedLabel(
        response({
          status: 200,
          url: 'https://xui.example/api/translation/cy',
          body: {
            translations: {
              'Cancel upload': {
                translation: 'Canslo uwchlwytho',
              },
            },
          },
        }),
        'Cancel upload'
      )
    ).resolves.toBe('Canslo uwchlwytho');

    await expect(
      resolveDocumentUploadTranslatedLabel(
        response({
          status: 200,
          url: 'https://xui.example/api/translation/cy',
          body: {
            translations: {},
          },
        }),
        'Cancel upload'
      )
    ).resolves.toBe('Cancel upload');
  });

  test('counts only successful update event posts for the target case', () => {
    const tracker = createDocumentUploadUpdateEventTracker('1781696492810435');

    tracker.onResponse(
      response({
        method: 'GET',
        status: 200,
        url: 'https://xui.example/data/cases/1781696492810435/events',
      })
    );
    tracker.onResponse(
      response({
        status: 500,
        url: 'https://xui.example/data/cases/1781696492810435/events',
      })
    );
    tracker.onResponse(
      response({
        status: 201,
        url: 'https://xui.example/data/cases/1111111111111111/events',
      })
    );
    tracker.onResponse(
      response({
        status: 201,
        url: 'https://xui.example/data/cases/1781696492810435/events?ignore-warning=true',
      })
    );

    expect(tracker.successfulPosts()).toBe(1);
  });
});
