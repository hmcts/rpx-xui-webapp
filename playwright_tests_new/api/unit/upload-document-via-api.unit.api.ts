import { expect, test } from '@playwright/test';

import { uploadDocumentViaApi } from '../../E2E/utils/test-setup/uploadDocumentViaApi.js';
import { buildTestAppUrl, TEST_CASES_URL } from './testAppUrls.js';

test.describe.configure({ mode: 'serial' });

test.describe('Document upload helper unit tests', { tag: '@svc-internal' }, () => {
  test('uploadDocumentViaApi posts through browser fetch on the current app origin with the XSRF header from browser-context cookies', async () => {
    const documentsUrl = buildTestAppUrl('/documentsv2');
    const captured: {
      url?: string;
      method?: string;
      headers?: Record<string, string>;
      fileName?: string;
      mimeType?: string;
      classification?: string;
    } = {};
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
      url: () => TEST_CASES_URL,
      evaluate: async (
        _fn: unknown,
        request: {
          url: string;
          method: string;
          headers?: Record<string, string>;
          multipart?: { fileName: string; mimeType: string; classification: string };
        }
      ) => {
        if (request.method === 'GET') {
          return { ok: true, status: 200, bodyText: '' };
        }
        captured.url = request.url;
        captured.method = request.method;
        captured.headers = request.headers;
        captured.fileName = request.multipart?.fileName;
        captured.mimeType = request.multipart?.mimeType;
        captured.classification = request.multipart?.classification;
        return {
          ok: true,
          status: 200,
          bodyText: JSON.stringify({
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
    expect(captured.url).toBe(documentsUrl);
    expect(captured.method).toBe('POST');
    expect(captured.headers).toEqual({ 'X-XSRF-TOKEN': 'xsrf-token-123' });
    expect(captured.fileName).toBe('seed.pdf');
    expect(captured.mimeType).toBe('application/pdf');
    expect(captured.classification).toBe('PUBLIC');
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
      evaluate: async (_fn: unknown, request: { method: string }) =>
        request.method === 'GET'
          ? { ok: true, status: 200, bodyText: '' }
          : { ok: false, status: 403, bodyText: '{"message":"Internal Server Error"}' },
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
    let fakeNow = 1_700_000_000_000;
    const originalDateNow = Date.now;
    const requestGets: string[] = [];
    const navigations: string[] = [];
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
      goto: async (url: string) => {
        navigations.push(url);
      },
      url: () => TEST_CASES_URL,
      waitForTimeout: async (timeout: number) => {
        fakeNow += timeout;
      },
      evaluate: async (_fn: unknown, request: { url: string; method: string }) => {
        requestGets.push(`${request.method}:${request.url}`);
        return {
          ok: false,
          status: 404,
          bodyText: '',
        };
      },
    };

    Date.now = () => fakeNow;
    try {
      await expect(
        uploadDocumentViaApi({
          page: page as never,
          jurisdictionId: 'DIVORCE',
          caseTypeId: 'XUI_TEST',
          fileName: 'seed.pdf',
          mimeType: 'application/pdf',
          fileContent: '%PDF-1.4\n%%EOF',
        })
      ).rejects.toThrow(
        new RegExp(
          `Document upload setup failed: XSRF-TOKEN cookie was not available within 20000ms \\(url=${TEST_CASES_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}, cookies=none\\)`
        )
      );
    } finally {
      Date.now = originalDateNow;
    }

    expect(cookieCalls).toBeGreaterThan(1);
    expect(consentClicks).toBeGreaterThan(1);
    expect(requestGets.filter((entry) => entry.endsWith('/auth/login')).length).toBe(3);
    expect(requestGets.filter((entry) => entry.endsWith('/auth/isAuthenticated')).length).toBe(6);
    expect(navigations).toEqual([TEST_CASES_URL, TEST_CASES_URL, TEST_CASES_URL]);
  });

  test('uploadDocumentViaApi touches auth endpoints in the browser context to mint XSRF before posting', async () => {
    let cookieCalls = 0;
    const requestGets: string[] = [];
    const consentButton = {
      first: () => consentButton,
      isVisible: async () => false,
      click: async () => undefined,
    };
    const page = {
      context: () => ({
        cookies: async () => {
          cookieCalls += 1;
          if (cookieCalls < 5) {
            return [];
          }
          return [{ name: 'XSRF-TOKEN', value: 'minted-after-reload' }];
        },
      }),
      getByRole: () => consentButton,
      goto: async () => undefined,
      url: () => TEST_CASES_URL,
      waitForTimeout: async () => undefined,
      evaluate: async (
        _fn: unknown,
        request: { url: string; method: 'GET' } | { url: string; method: 'POST'; headers?: Record<string, string> }
      ) => {
        if (request.method === 'GET') {
          requestGets.push(request.url);
          return {
            ok: true,
            status: 200,
            bodyText: '',
          };
        }
        return {
          ok: true,
          status: 200,
          bodyText: JSON.stringify({
            documents: [
              {
                originalDocumentName: 'seed.pdf',
                _links: {
                  self: { href: 'https://dm/documents/1' },
                  binary: { href: 'https://dm/documents/1/binary' },
                },
              },
            ],
            headers: request.headers,
          }),
        };
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

    expect(requestGets.some((url) => url.endsWith('/auth/login'))).toBe(true);
    expect(requestGets.some((url) => url.endsWith('/auth/isAuthenticated'))).toBe(true);
    expect(uploaded.document_filename).toBe('seed.pdf');
  });

  test('uploadDocumentViaApi refreshes the current app shell before giving up on XSRF minting', async () => {
    let cookieCalls = 0;
    const navigations: string[] = [];
    const requestGets: string[] = [];
    const consentButton = {
      first: () => consentButton,
      isVisible: async () => false,
      click: async () => undefined,
    };
    const page = {
      context: () => ({
        cookies: async () => {
          cookieCalls += 1;
          if (cookieCalls < 5) {
            return [];
          }
          return [{ name: 'XSRF-TOKEN', value: 'minted-after-navigation' }];
        },
      }),
      getByRole: () => consentButton,
      goto: async (url: string) => {
        navigations.push(url);
      },
      url: () => TEST_CASES_URL,
      waitForTimeout: async () => undefined,
      evaluate: async (
        _fn: unknown,
        request: { url: string; method: 'GET' } | { url: string; method: 'POST'; headers?: Record<string, string> }
      ) => {
        if (request.method === 'GET') {
          requestGets.push(request.url);
          return {
            ok: true,
            status: 200,
            bodyText: '',
          };
        }
        return {
          ok: true,
          status: 200,
          bodyText: JSON.stringify({
            documents: [
              {
                originalDocumentName: 'seed.pdf',
                _links: {
                  self: { href: 'https://dm/documents/1' },
                  binary: { href: 'https://dm/documents/1/binary' },
                },
              },
            ],
          }),
        };
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

    expect(navigations).toEqual([TEST_CASES_URL]);
    expect(requestGets.some((url) => url.endsWith('/auth/login'))).toBe(true);
    expect(requestGets.filter((url) => url.endsWith('/auth/isAuthenticated')).length).toBeGreaterThan(1);
    expect(uploaded.document_filename).toBe('seed.pdf');
  });
});
