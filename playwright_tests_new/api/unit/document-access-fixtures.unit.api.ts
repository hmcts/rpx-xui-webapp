import { expect, test, type Page } from '@playwright/test';
import {
  assignmentIncludesUser,
  createCaseBoundDocument,
  documentIdFromMetadata,
  documentXsrfHeaders,
  legacyDocumentFromUpload,
  revokeDocumentCase,
  savedDocumentFromCase,
  shareDocumentCase,
  uploadLegacyDocument,
  type CaseBoundDocument,
} from '../../E2E/utils/test-setup/documentAccessFixtures';
import { resolveUploadedDocId, uploadSyntheticDoc } from '../utils/evidenceManagerUtils';
import type { CcdDocumentValue } from '../../E2E/utils/test-setup/uploadDocumentViaApi';

const document: CcdDocumentValue = {
  document_url: 'https://dm.example.test/documents/document-a',
  document_binary_url: 'https://dm.example.test/documents/document-a/binary',
  document_filename: 'known.pdf',
};
const uploaded = {
  originalDocumentName: document.document_filename,
  _links: { self: { href: document.document_url }, binary: { href: document.document_binary_url } },
};
const expectedContent = Buffer.from('%PDF-1.4 known fixture');

test.describe('Document access fixture support', { tag: '@svc-internal' }, () => {
  for (const scenario of [
    { name: 'a navigated page', pageUrl: 'https://xui.example.test/cases', applicationUrl: undefined },
    { name: 'an API-only blank page', pageUrl: 'about:blank', applicationUrl: 'https://xui.example.test/' },
  ]) {
    test(`XSRF headers use the application origin for ${scenario.name}`, async () => {
      const lookups: string[] = [];
      const page = {
        url: () => scenario.pageUrl,
        context: () => ({
          cookies: async (url: string) => {
            lookups.push(url);
            return new URL(url).origin === 'https://xui.example.test' ? [{ name: 'XSRF-TOKEN', value: 'synthetic-token' }] : [];
          },
        }),
      } as unknown as Page;
      expect(await documentXsrfHeaders(page, scenario.applicationUrl)).toEqual({ 'X-XSRF-TOKEN': 'synthetic-token' });
      expect(lookups).toEqual(['https://xui.example.test']);
    });
  }

  for (const cookieOrigin of [undefined, 'https://other.example.test']) {
    test(`XSRF headers reject ${cookieOrigin ? "another origin's" : 'missing'} cookie for an API-only page`, async () => {
      const lookups: string[] = [];
      const page = {
        url: () => 'about:blank',
        context: () => ({
          cookies: async (url: string) => {
            lookups.push(url);
            return url === cookieOrigin ? [{ name: 'XSRF-TOKEN', value: 'foreign-token' }] : [];
          },
        }),
      } as unknown as Page;
      await expect(documentXsrfHeaders(page, 'https://xui.example.test/')).rejects.toThrow('XSRF cookie');
      expect(lookups).toEqual(['https://xui.example.test']);
    });
  }

  test('legacy metadata uses the genuine service links in both supported envelopes', () => {
    expect(legacyDocumentFromUpload({ _embedded: { documents: [uploaded] } })).toEqual(document);
    expect(legacyDocumentFromUpload({ documents: [uploaded] })).toEqual(document);
    expect(resolveUploadedDocId({ _embedded: { documents: [uploaded] } })).toBe('document-a');
  });

  test('rejects missing, mismatched and rewritten legacy metadata', () => {
    expect(() => legacyDocumentFromUpload({ documents: [{ documentId: 'fabricated' }] })).toThrow('genuine CCD');
    expect(() =>
      documentIdFromMetadata({ ...document, document_binary_url: 'https://dm.example.test/documents/other/binary' })
    ).toThrow('matching genuine');
    expect(() => documentIdFromMetadata({ ...document, document_url: 'https://dm.example.test/documentsv2/document-a' })).toThrow(
      'matching genuine'
    );
    expect(() =>
      documentIdFromMetadata({ ...document, document_binary_url: 'https://other.example.test/documents/document-a/binary' })
    ).toThrow('matching genuine');
  });

  test('case readback proves the saved case, binary link and filename', () => {
    expect(
      savedDocumentFromCase(
        { case_id: 'case-a', tabs: [{ fields: [{ id: 'DocumentUrl', value: document }] }] },
        'case-a',
        document
      )
    ).toEqual(document);
    for (const payload of [
      { case_id: 'case-b', tabs: [{ fields: [{ id: 'DocumentUrl', value: document }] }] },
      { case_id: 'case-a', tabs: [] },
      { case_id: 'case-a', tabs: [{ fields: [{ id: 'DocumentUrl', value: { ...document, document_filename: 'other.pdf' } }] }] },
      {
        case_id: 'case-a',
        tabs: [
          {
            fields: [
              {
                id: 'DocumentUrl',
                value: { ...document, document_binary_url: 'https://dm.example.test/documents/other/binary' },
              },
            ],
          },
        ],
      },
    ]) {
      expect(() => savedDocumentFromCase(payload, 'case-a', document)).toThrow(/membership|requested CCD case view/);
    }
  });

  test('legacy upload preserves endpoint, multipart content and XSRF without retries', async () => {
    const calls: Array<{ url: string; options: unknown }> = [];
    const page = {
      url: () => 'https://xui.example.test/cases',
      context: () => ({ cookies: async () => [{ name: 'XSRF-TOKEN', value: 'synthetic-token' }] }),
      request: {
        post: async (url: string, options: unknown) => {
          calls.push({ url, options });
          return { ok: () => true, json: async () => ({ _embedded: { documents: [uploaded] } }) };
        },
      },
    } as unknown as Page;
    expect(
      await uploadLegacyDocument({ page, fileName: 'known.pdf', mimeType: 'application/pdf', content: expectedContent })
    ).toEqual(document);
    expect(calls).toEqual([
      {
        url: 'https://xui.example.test/documents',
        options: {
          headers: { 'X-XSRF-TOKEN': 'synthetic-token' },
          multipart: {
            classification: 'PUBLIC',
            files: { name: 'known.pdf', mimeType: 'application/pdf', buffer: expectedContent },
          },
          failOnStatusCode: false,
        },
      },
    ]);
  });

  test('legacy upload opens the application shell before using a blank session page', async () => {
    const calls: string[] = [];
    let currentUrl = 'about:blank';
    const page = {
      url: () => currentUrl,
      goto: async (url: string) => {
        calls.push(url);
        currentUrl = 'https://xui.example.test/cases';
      },
      context: () => ({ cookies: async () => [{ name: 'XSRF-TOKEN', value: 'synthetic-token' }] }),
      request: {
        post: async (url: string) => {
          calls.push(url);
          return { ok: () => true, json: async () => ({ _embedded: { documents: [uploaded] } }) };
        },
      },
    } as unknown as Page;
    await uploadLegacyDocument({ page, fileName: 'known.pdf', mimeType: 'application/pdf', content: expectedContent });
    expect(calls).toEqual(['/cases', 'https://xui.example.test/documents']);
  });

  test('legacy upload fails before posting when its application session has no XSRF cookie', async () => {
    let posts = 0;
    const page = {
      url: () => 'https://xui.example.test/cases',
      context: () => ({ cookies: async () => [] }),
      request: {
        post: async () => {
          posts++;
        },
      },
    } as unknown as Page;
    await expect(
      uploadLegacyDocument({ page, fileName: 'known.pdf', mimeType: 'application/pdf', content: expectedContent })
    ).rejects.toThrow('XSRF cookie');
    expect(posts).toBe(0);
  });

  for (const status of [403, 429, 500]) {
    test(`legacy upload fails on HTTP ${status} without inventing metadata`, async () => {
      let posts = 0;
      const page = {
        url: () => 'https://xui.example.test/cases',
        context: () => ({ cookies: async () => [{ name: 'XSRF-TOKEN', value: 'synthetic-token' }] }),
        request: {
          post: async () => {
            posts++;
            return { ok: () => false, status: () => status };
          },
        },
      } as unknown as Page;
      await expect(
        uploadLegacyDocument({ page, fileName: 'known.pdf', mimeType: 'application/pdf', content: expectedContent })
      ).rejects.toThrow(`HTTP ${status}`);
      expect(posts).toBe(1);
    });
  }

  for (const gateway of ['legacy', 'v2'] as const) {
    test(`${gateway} fixture attaches upload metadata and verifies readback`, async () => {
      const calls: string[] = [];
      const page = {
        request: {
          get: async (url: string) => {
            calls.push(url);
            return {
              status: () => 200,
              json: async () => ({ case_id: 'case-a', tabs: [{ fields: [{ id: 'DocumentUrl', value: document }] }] }),
            };
          },
        },
      } as unknown as Page;
      const fixture = await createCaseBoundDocument(
        {
          page,
          gateway,
          fileName: 'known.pdf',
          mimeType: 'application/pdf',
          content: expectedContent,
          createCasePage: {} as never,
          caseDetailsPage: {} as never,
        },
        {
          uploadLegacyDocument: async () => {
            calls.push('legacy');
            return document;
          },
          uploadDocumentViaApi: async () => {
            calls.push('v2');
            return document;
          },
          setupCaseForJourney: async (options) => {
            calls.push('createCase');
            expect(options.mode).toBe('api-required');
            expect(options.apiPayload?.fieldValues).toMatchObject({ DocumentUrl: document });
            return { caseNumber: 'case-a', mode: 'api' };
          },
        }
      );
      expect(calls).toEqual([gateway, 'createCase', '/data/internal/cases/case-a']);
      expect(fixture.binaryPath).toBe(`/${gateway === 'legacy' ? 'documents' : 'documentsv2'}/document-a/binary?caseId=case-a`);
      expect(fixture.expectedContent).toEqual(expectedContent);
    });
  }

  test('fixture does not hide an upload failure behind the other gateway', async () => {
    let creates = 0;
    let v2Uploads = 0;
    await expect(
      createCaseBoundDocument(
        {
          page: {} as Page,
          gateway: 'legacy',
          fileName: 'known.pdf',
          mimeType: 'application/pdf',
          content: expectedContent,
          createCasePage: {} as never,
          caseDetailsPage: {} as never,
        },
        {
          uploadLegacyDocument: async () => {
            throw new Error('legacy unavailable');
          },
          uploadDocumentViaApi: async () => {
            v2Uploads++;
            return document;
          },
          setupCaseForJourney: async () => {
            creates++;
            return { caseNumber: 'case-a', mode: 'api' };
          },
        }
      )
    ).rejects.toThrow('legacy unavailable');
    expect([creates, v2Uploads]).toEqual([0, 0]);
  });

  test('assignment evidence rejects pending, wrong-case and wrong-user entries', () => {
    expect(
      assignmentIncludesUser([{ caseId: 'case-b', sharedWith: [{ idamId: 'u2' }], pendingShares: [] }], 'case-b', 'u2')
    ).toBe(true);
    for (const payload of [
      [{ caseId: 'case-b', sharedWith: [{ idamId: 'u2' }], pendingShares: [{ idamId: 'u2' }] }],
      [{ caseId: 'case-a', sharedWith: [{ idamId: 'u2' }] }],
      [{ caseId: 'case-b', sharedWith: [{ idamId: 'u1' }] }],
      {},
    ])
      expect(assignmentIncludesUser(payload, 'case-b', 'u2')).toBe(false);
  });

  test('HTTP 201 with a failed assignment cannot establish the access matrix', async () => {
    let readbacks = 0;
    const page = {
      url: () => 'https://xui.example.test/cases',
      context: () => ({ cookies: async () => [{ name: 'XSRF-TOKEN', value: 'synthetic-token' }] }),
      request: {
        get: async () => {
          readbacks++;
          return { status: () => 200, json: async () => [{ idamId: 'u2' }] };
        },
        post: async () => ({
          status: () => 201,
          json: async () => [{ caseId: 'case-b', sharedWith: [], pendingShares: [{ idamId: 'u2' }] }],
        }),
      },
    } as unknown as Page;
    await expect(
      shareDocumentCase(page, { caseId: 'case-b', caseTypeId: 'xuiTestCaseType' } as CaseBoundDocument, 'u2')
    ).rejects.toThrow('remained pending');
    expect(readbacks).toBe(1);
  });

  test('revocation removes the saved user roles and confirms persisted removal without changing other users', async () => {
    const retainedUser = { idamId: 'u1', caseRoles: ['[CREATOR]'] };
    const revokedUser = { idamId: 'u2', caseRoles: ['[SOLICITOR]', '[APPLICANT]'] };
    let sharedWith = [retainedUser, revokedUser];
    const calls: Array<{ method: string; url: string; options: unknown }> = [];
    const page = {
      url: () => 'https://xui.example.test/cases',
      context: () => ({ cookies: async () => [{ name: 'XSRF-TOKEN', value: 'synthetic-token' }] }),
      request: {
        get: async (url: string, options: unknown) => {
          calls.push({ method: 'GET', url, options });
          return { status: () => 200, json: async () => [{ caseId: 'case-b', sharedWith }] };
        },
        post: async (url: string, options: unknown) => {
          calls.push({ method: 'POST', url, options });
          sharedWith = [retainedUser];
          return {
            status: () => 201,
            json: async () => [{ caseId: 'case-b', sharedWith, pendingUnshares: [] }],
          };
        },
      },
    } as unknown as Page;
    await revokeDocumentCase(page, { caseId: 'case-b', caseTypeId: 'PRLAPPS' } as CaseBoundDocument, 'u2');
    expect(calls).toEqual([
      {
        method: 'GET',
        url: '/api/caseshare/case-assignments?case_ids=case-b',
        options: { headers: { 'X-XSRF-TOKEN': 'synthetic-token' }, failOnStatusCode: false, maxRedirects: 0 },
      },
      {
        method: 'POST',
        url: '/api/caseshare/case-assignments',
        options: {
          headers: { 'X-XSRF-TOKEN': 'synthetic-token' },
          failOnStatusCode: false,
          maxRedirects: 0,
          data: {
            sharedCases: [
              {
                caseId: 'case-b',
                caseTypeId: 'PRLAPPS',
                sharedWith: [retainedUser, revokedUser],
                pendingShares: [],
                pendingUnshares: [{ idamId: 'u2', caseRoles: ['[SOLICITOR]', '[APPLICANT]'] }],
              },
            ],
          },
        },
      },
      {
        method: 'GET',
        url: '/api/caseshare/case-assignments?case_ids=case-b',
        options: { headers: { 'X-XSRF-TOKEN': 'synthetic-token' }, failOnStatusCode: false, maxRedirects: 0 },
      },
    ]);
  });

  for (const scenario of [
    { name: 'failed assignment read', status: 503, payload: [] },
    { name: 'missing assignment', status: 200, payload: [] },
    { name: 'another case assignment', status: 200, payload: [{ caseId: 'case-a', sharedWith: [{ idamId: 'u2' }] }] },
    { name: 'missing user', status: 200, payload: [{ caseId: 'case-b', sharedWith: [] }] },
    { name: 'missing roles', status: 200, payload: [{ caseId: 'case-b', sharedWith: [{ idamId: 'u2' }] }] },
    { name: 'empty roles', status: 200, payload: [{ caseId: 'case-b', sharedWith: [{ idamId: 'u2', caseRoles: [] }] }] },
  ]) {
    test(`revocation rejects ${scenario.name} before sending a removal`, async () => {
      let posts = 0;
      const page = {
        url: () => 'https://xui.example.test/cases',
        context: () => ({ cookies: async () => [{ name: 'XSRF-TOKEN', value: 'synthetic-token' }] }),
        request: {
          get: async () => ({ status: () => scenario.status, json: async () => scenario.payload }),
          post: async () => {
            posts++;
          },
        },
      } as unknown as Page;
      await expect(
        revokeDocumentCase(page, { caseId: 'case-b', caseTypeId: 'PRLAPPS' } as CaseBoundDocument, 'u2')
      ).rejects.toThrow(/assignment|roles/);
      expect(posts).toBe(0);
    });
  }

  for (const scenario of [
    { name: 'failed removal', postStatus: 422, postBody: [], readback: [], reads: 1 },
    {
      name: 'pending removal',
      postStatus: 201,
      postBody: [{ caseId: 'case-b', sharedWith: [], pendingUnshares: [{ idamId: 'u2' }] }],
      readback: [],
      reads: 1,
    },
    {
      name: 'user retained in the removal response',
      postStatus: 201,
      postBody: [{ caseId: 'case-b', sharedWith: [{ idamId: 'u2' }], pendingUnshares: [] }],
      readback: [],
      reads: 1,
    },
    {
      name: 'missing removal result',
      postStatus: 201,
      postBody: [],
      readback: [],
      reads: 1,
    },
    {
      name: 'user retained in persisted assignments',
      postStatus: 201,
      postBody: [{ caseId: 'case-b', sharedWith: [], pendingUnshares: [] }],
      readback: [{ caseId: 'case-b', sharedWith: [{ idamId: 'u2' }] }],
      reads: 2,
    },
    {
      name: 'missing case in persisted assignments',
      postStatus: 201,
      postBody: [{ caseId: 'case-b', sharedWith: [], pendingUnshares: [] }],
      readback: [],
      reads: 2,
    },
    {
      name: 'another case in persisted assignments',
      postStatus: 201,
      postBody: [{ caseId: 'case-b', sharedWith: [], pendingUnshares: [] }],
      readback: [{ caseId: 'case-a', sharedWith: [] }],
      reads: 2,
    },
    {
      name: 'failed persisted assignment read',
      postStatus: 201,
      postBody: [{ caseId: 'case-b', sharedWith: [], pendingUnshares: [] }],
      readback: [{ caseId: 'case-b', sharedWith: [] }],
      readbackStatus: 503,
      reads: 2,
    },
  ]) {
    test(`revocation fails on ${scenario.name} without retrying`, async () => {
      let reads = 0;
      let posts = 0;
      const page = {
        url: () => 'https://xui.example.test/cases',
        context: () => ({ cookies: async () => [{ name: 'XSRF-TOKEN', value: 'synthetic-token' }] }),
        request: {
          get: async () => {
            reads++;
            return {
              status: () => (reads > 1 && 'readbackStatus' in scenario ? scenario.readbackStatus : 200),
              json: async () =>
                reads === 1
                  ? [{ caseId: 'case-b', sharedWith: [{ idamId: 'u2', caseRoles: ['[SOLICITOR]'] }] }]
                  : scenario.readback,
            };
          },
          post: async () => {
            posts++;
            return { status: () => scenario.postStatus, json: async () => scenario.postBody };
          },
        },
      } as unknown as Page;
      await expect(
        revokeDocumentCase(page, { caseId: 'case-b', caseTypeId: 'PRLAPPS' } as CaseBoundDocument, 'u2')
      ).rejects.toThrow(/removal|revocation/);
      expect(reads).toBe(scenario.reads);
      expect(posts).toBe(1);
    });
  }

  test('synthetic upload rejects missing IDs and always disposes after a bad body', async () => {
    let disposed = 0;
    await expect(
      uploadSyntheticDoc({
        ensureStorageState: async () => 'state.json',
        getStoredCookie: async () => 'synthetic-token',
        requestFactory: async () =>
          ({
            post: async () => ({ ok: () => true, json: async () => ({ documents: [] }) }),
            dispose: async () => {
              disposed++;
            },
          }) as never,
      })
    ).rejects.toThrow('no document ID');
    expect(disposed).toBe(1);
  });
});
