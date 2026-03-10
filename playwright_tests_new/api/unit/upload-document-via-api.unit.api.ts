import { expect, test } from '@playwright/test';

import { uploadDocumentViaApi } from '../../E2E/utils/test-setup/uploadDocumentViaApi.js';

test.describe.configure({ mode: 'serial' });

test.describe('Document upload helper unit tests', { tag: '@svc-internal' }, () => {
  test('uploadDocumentViaApi forwards XSRF header from browser-context cookies', async () => {
    const captured: { url?: string; headers?: Record<string, string> } = {};
    const consentButton = {
      first: () => consentButton,
      isVisible: async () => false,
      click: async () => undefined,
    };
    const page = {
      context: () => ({
        cookies: async () => [{ name: 'XSRF-TOKEN', value: 'xsrf-token-123' }],
      }),
      getByRole: () => consentButton,
      request: {
        post: async (url: string, options: { headers?: Record<string, string> }) => {
          captured.url = url;
          captured.headers = options.headers;
          return {
            ok: () => true,
            text: async () =>
              JSON.stringify({
                documents: [
                  {
                    originalDocumentName: 'seed.pdf',
                    hashToken: 'hash-token',
                    _links: {
                      self: { href: 'https://dm/documents/1' },
                      binary: { href: 'https://dm/documents/1/binary' },
                    },
                  },
                ],
              }),
          };
        },
      },
    };

    const uploaded = await uploadDocumentViaApi({
      page: page as never,
      jurisdictionId: 'DIVORCE',
      caseTypeId: 'XUI_TEST',
      fileName: 'seed.pdf',
      mimeType: 'application/pdf',
      fileContent: '%PDF-1.4\n%%EOF',
    });

    expect(captured.url).toContain('/documentsv2');
    expect(captured.headers).toEqual({ 'X-XSRF-TOKEN': 'xsrf-token-123' });
    expect(uploaded).toEqual({
      document_url: 'https://dm/documents/1',
      document_binary_url: 'https://dm/documents/1/binary',
      document_filename: 'seed.pdf',
      document_hash: 'hash-token',
    });
  });

  test('uploadDocumentViaApi preserves failure details from the proxy response', async () => {
    const consentButton = {
      first: () => consentButton,
      isVisible: async () => false,
      click: async () => undefined,
    };
    const page = {
      context: () => ({
        cookies: async () => [{ name: 'XSRF-TOKEN', value: 'xsrf-token-123' }],
      }),
      getByRole: () => consentButton,
      request: {
        post: async () => ({
          ok: () => false,
          status: () => 403,
          text: async () => '{"message":"Internal Server Error"}',
        }),
      },
    };

    await expect(
      uploadDocumentViaApi({
        page: page as never,
        jurisdictionId: 'DIVORCE',
        caseTypeId: 'XUI_TEST',
        fileName: 'seed.pdf',
        mimeType: 'application/pdf',
        fileContent: '%PDF-1.4\n%%EOF',
      })
    ).rejects.toThrow('Document upload API failed with HTTP 403: {"message":"Internal Server Error"}');
  });

  test('uploadDocumentViaApi fails fast when the XSRF cookie never appears', async () => {
    let consentClicks = 0;
    let cookieCalls = 0;
    const consentButton = {
      first: () => consentButton,
      isVisible: async () => true,
      click: async () => {
        consentClicks += 1;
      },
    };
    const page = {
      context: () => ({
        cookies: async () => {
          cookieCalls += 1;
          return [];
        },
      }),
      getByRole: () => consentButton,
      waitForTimeout: async () => undefined,
      request: {
        post: async () => {
          throw new Error('post should not be called without xsrf');
        },
      },
    };

    await expect(
      uploadDocumentViaApi({
        page: page as never,
        jurisdictionId: 'DIVORCE',
        caseTypeId: 'XUI_TEST',
        fileName: 'seed.pdf',
        mimeType: 'application/pdf',
        fileContent: '%PDF-1.4\n%%EOF',
      })
    ).rejects.toThrow('Document upload setup failed: XSRF-TOKEN cookie was not available within 5000ms');

    expect(cookieCalls).toBeGreaterThan(1);
    expect(consentClicks).toBeGreaterThan(1);
  });
});
