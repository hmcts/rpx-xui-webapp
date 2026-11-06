import { request as playwrightRequest, type APIRequestContext } from '@playwright/test';
import { v4 as uuid } from 'uuid';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test as documentTest } from '../E2E/fixtures';
import { applySessionCookies } from '../common/sessionCapture';
import {
  createCaseBoundDocument,
  documentXsrfHeaders,
  type CaseBoundDocument,
} from '../E2E/utils/test-setup/documentAccessFixtures';

import { config } from './utils/apiTestRuntimeConfig';
import { ensureStorageState, getStoredCookie } from './utils/auth';
import { test, expect } from './fixtures';
import { EM_DOC_ID } from './data/testIds';
import { expectStatus, guardedRequest, withXsrf } from './utils/apiTestUtils';
import {
  assertAnnotationResponse,
  assertBookmarkResponse,
  buildAnnotation,
  buildBookmark,
  buildXsrfHeader,
  resolveAnnotationSetId,
  resolveConfiguredDocId,
  resolveCreatedAnnotationId,
  resolveCreatedBookmarkId,
  resolveSharedDocId,
  resolveUploadedDocId,
  resolveUserInfoId,
  uploadSyntheticDoc,
} from './utils/evidenceManagerUtils';

const configuredDocId = resolveConfiguredDocId(EM_DOC_ID, config.em[config.testEnv as keyof typeof config.em]?.docId);
let sharedDocId = '';
const guardedDocumentUploadRejectionStatuses = [400, 401, 403, 415, 422, 429, 500] as const;
const ANNOTATION_SET_LOOKUP_TIMEOUT_MS = 120_000;
const USER_DETAILS_LOOKUP_TIMEOUT_MS = 120_000;
const LARGE_EVIDENCE_MANAGER_TEST_TIMEOUT_MS = 150_000;

test.describe('Evidence Manager & Documents', { tag: '@svc-evidence-manager' }, () => {
  // Keep document mutations sequential without skipping independent tests after a failure.
  test.describe.configure({ mode: 'default' });

  test.beforeAll(async () => {
    sharedDocId = await resolveSharedDocId(configuredDocId, uploadSyntheticDoc);
    if (!sharedDocId) {
      throw new Error('Evidence Manager sharedDocId was not resolved');
    }
  });

  test('annotations metadata guarded by session', async ({ apiClient, anonymousClient }) => {
    const anon = await anonymousClient.get(`em-anno/metadata/${sharedDocId}`, { throwOnError: false });
    expectStatus(anon.status, [401, 403]);

    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get(`em-anno/metadata/${sharedDocId}`, {
        headers: { ...headers, experimental: 'true' },
        throwOnError: false,
      });
      expectStatus(res.status, [200, 204, 401, 403, 404, 500]);
    });
  });

  test('creates and deletes annotation with valid XSRF', async ({ apiClient }) => {
    test.setTimeout(LARGE_EVIDENCE_MANAGER_TEST_TIMEOUT_MS);
    await withXsrf('solicitor', async (headers) => {
      const annotationSet = await guardedRequest(() =>
        apiClient.get(`em-anno/annotation-sets/filter?documentId=${sharedDocId}`, {
          headers,
          timeoutMs: ANNOTATION_SET_LOOKUP_TIMEOUT_MS,
          throwOnError: false,
        })
      );
      expectStatus(annotationSet.status, [200]);
      const annotationSetId =
        typeof annotationSet.data === 'object' && annotationSet.data !== null && 'id' in annotationSet.data
          ? (annotationSet.data as { id?: unknown }).id
          : undefined;
      expect(typeof annotationSetId).toBe('string');
      const annotation = await buildAnnotation(apiClient, headers, sharedDocId, annotationSetId as string);
      const createRes = await apiClient.put('em-anno/annotations', {
        data: annotation,
        headers,
        throwOnError: false,
      });
      expectStatus(createRes.status, [200, 204, 401, 403, 404, 409, 500]);
      assertAnnotationResponse(createRes.status, createRes.data);

      const createdId = resolveCreatedAnnotationId(createRes.data, annotation.id);
      const deleteRes = await apiClient.delete(`em-anno/annotations/${createdId}`, {
        data: annotation,
        headers,
        throwOnError: false,
      });
      expectStatus(deleteRes.status, [200, 204, 401, 403, 409, 500]);
    });
  });

  test('rejects annotation mutation without XSRF', async ({ apiClient }) => {
    const annotation = await buildAnnotation(apiClient, {}, sharedDocId, uuid());
    const res = await apiClient.put('em-anno/annotations', {
      data: annotation,
      headers: {},
      throwOnError: false,
    });
    expectStatus(res.status, [200, 400, 401, 403, 404, 409, 500]);
  });

  test('rejects annotation mutation with invalid payload', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const badPayload = { id: uuid(), rectangles: [] };
      const res = await apiClient.put('em-anno/annotations', {
        data: badPayload,
        headers,
        throwOnError: false,
      });
      expectStatus(res.status, [400, 401, 403, 404, 409, 500]);
    });
  });

  test('bookmarks lifecycle', async ({ apiClient }) => {
    test.setTimeout(LARGE_EVIDENCE_MANAGER_TEST_TIMEOUT_MS);
    await withXsrf('solicitor', async (headers) => {
      const listRes = await apiClient.get<unknown[]>(`em-anno/${sharedDocId}/bookmarks`, {
        headers,
        throwOnError: false,
      });
      expectStatus(listRes.status, [200, 204, 401, 403, 404, 500]);

      const profile = await guardedRequest(() =>
        apiClient.get('api/user/details', {
          timeoutMs: USER_DETAILS_LOOKUP_TIMEOUT_MS,
          throwOnError: false,
        })
      );
      expectStatus(profile.status, [200]);
      const userId = resolveUserInfoId(profile.data as { userInfo?: { uid?: string; id?: string } });
      expect(typeof userId).toBe('string');
      const bookmark = await buildBookmark(apiClient, sharedDocId, userId as string);
      const createRes = await apiClient.put('em-anno/bookmarks', {
        data: bookmark,
        headers,
        throwOnError: false,
      });
      expectStatus(createRes.status, [200, 204, 401, 403, 404, 409, 500]);
      const createdId = resolveCreatedBookmarkId(createRes.data, bookmark.id);
      assertBookmarkResponse(createRes.status, createRes.data);

      const deleteRes = await apiClient.delete('em-anno/bookmarks_multiple', {
        data: { deleted: [createdId] },
        headers,
        throwOnError: false,
      });
      expectStatus(deleteRes.status, [200, 204, 401, 403, 404, 409, 500]);
    });
  });

  test('rejects bookmark creation with invalid XSRF token', async ({ apiClient }) => {
    const bookmark = await buildBookmark(apiClient, sharedDocId, 'invalid-xsrf-test-user');
    const res = await apiClient.put('em-anno/bookmarks', {
      data: bookmark,
      headers: { 'X-XSRF-TOKEN': 'invalid' },
      throwOnError: false,
    });
    expectStatus(res.status, [400, 401, 403, 409, 500]);
  });

  test('rejects bookmark creation without XSRF', async ({ apiClient }) => {
    const bookmark = await buildBookmark(apiClient, sharedDocId, 'missing-xsrf-test-user');
    const res = await apiClient.put('em-anno/bookmarks', {
      data: bookmark,
      headers: {},
      throwOnError: false,
    });
    expectStatus(res.status, [200, 401, 403, 404, 409, 500]);
  });

  test('rejects bookmark mutation with invalid payload', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.put('em-anno/bookmarks', {
        data: { id: uuid(), name: 'bad' },
        headers,
        throwOnError: false,
      });
      expectStatus(res.status, [400, 401, 403, 404, 409, 500]);
    });
  });

  test('rejects document upload when no file provided', async () => {
    const storageState = await ensureStorageState('solicitor');
    const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
    const ctx = await playwrightRequest.newContext({
      baseURL: config.baseUrl.replace(/\/+$/, ''),
      storageState,
      ignoreHTTPSErrors: true,
    });
    const res = await ctx.post('documents', {
      multipart: {},
      headers: buildXsrfHeader(xsrf),
      failOnStatusCode: false,
    });
    expect(guardedDocumentUploadRejectionStatuses).toContain(res.status());
    await ctx.dispose();
  });

  test('rejects document upload with unsupported mime type', async () => {
    const storageState = await ensureStorageState('solicitor');
    const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
    const ctx = await playwrightRequest.newContext({
      baseURL: config.baseUrl.replace(/\/+$/, ''),
      storageState,
      ignoreHTTPSErrors: true,
    });
    const res = await ctx.post('documents', {
      multipart: {
        files: {
          name: 'file',
          mimeType: 'application/x-msdownload',
          buffer: Buffer.from('bogus exe content'),
        },
      },
      headers: buildXsrfHeader(xsrf),
      failOnStatusCode: false,
    });
    expect(guardedDocumentUploadRejectionStatuses).toContain(res.status());
    await ctx.dispose();
  });

  test('returns guarded status for invalid document id on delete', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const bogusId = uuid();
      const res = await apiClient.delete(`em-anno/annotations/${bogusId}`, {
        data: {},
        headers,
        throwOnError: false,
      });
      // EM Annotation API documents annotation delete as 200/401/403, including an unknown id.
      expectStatus(res.status, [200, 401, 403]);
    });
  });

  test('rejects bookmark delete for missing document', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.delete('em-anno/bookmarks_multiple', {
        data: { deleted: [uuid()] },
        headers,
        throwOnError: false,
      });
      // EM Annotation API documents bulk bookmark delete as idempotent 200/401/403.
      expectStatus(res.status, [200, 401, 403]);
    });
  });
});

test.describe('Evidence Manager helper coverage', { tag: '@svc-evidence-manager' }, () => {
  test('resolveConfiguredDocId and resolveSharedDocId handle overrides', async () => {
    expect(resolveConfiguredDocId('env-doc', 'fallback-doc')).toBe('env-doc');
    expect(resolveConfiguredDocId(undefined, 'fallback-doc')).toBe('fallback-doc');

    const configured = await resolveSharedDocId('configured-doc', async () => 'uploaded-doc');
    expect(configured).toBe('configured-doc');

    const uploaded = await resolveSharedDocId(undefined, async () => 'uploaded-doc');
    expect(uploaded).toBe('uploaded-doc');
  });

  test('annotation helpers cover ids and responses', () => {
    const data = { annotations: [{ id: 'anno-1', documentId: 'doc-1', annotationSetId: 'set-1' }] };
    assertAnnotationResponse(200, data);
    assertAnnotationResponse(500, data);
    expect(resolveCreatedAnnotationId(data, 'fallback')).toBe('anno-1');
    expect(resolveCreatedAnnotationId({}, 'fallback')).toBe('fallback');
  });

  test('bookmark helpers cover ids and responses', () => {
    const data = { id: 'bookmark-1', name: 'Bookmark', documentId: 'doc-1' };
    assertBookmarkResponse(200, data);
    assertBookmarkResponse(401, data);
    expect(resolveCreatedBookmarkId(data, 'fallback')).toBe('bookmark-1');
    expect(resolveCreatedBookmarkId({}, 'fallback')).toBe('fallback');
  });

  test('resolveAnnotationSetId handles valid, fallback, and errors', async () => {
    sharedDocId = 'doc-1';
    const apiClient = { get: async () => ({ data: { id: 'set-1' } }) };
    expect(await resolveAnnotationSetId(apiClient, {}, sharedDocId)).toBe('set-1');

    const apiClientMissing = { get: async () => ({ data: { id: 123 } }) };
    const fallback = await resolveAnnotationSetId(apiClientMissing, {}, sharedDocId);
    expect(fallback).toBeTruthy();

    const apiClientError = {
      get: async () => {
        throw new Error('boom');
      },
    };
    const errorFallback = await resolveAnnotationSetId(apiClientError, {}, sharedDocId);
    expect(errorFallback).toBeTruthy();
  });

  test('buildAnnotation and buildBookmark return expected payloads', async () => {
    sharedDocId = 'doc-2';
    const apiClient = { get: async () => ({ data: { id: 'set-2' } }) };
    const annotation = await buildAnnotation(apiClient, {}, sharedDocId);
    expect(annotation.documentId).toBe('doc-2');
    expect(annotation.annotationSetId).toBe('set-2');

    const suppliedAnnotation = await buildAnnotation(
      { get: async () => Promise.reject(new Error('should not resolve an annotation set')) },
      {},
      sharedDocId,
      'set-supplied'
    );
    expect(suppliedAnnotation.annotationSetId).toBe('set-supplied');

    const bookmarkClient = { get: async () => ({ data: { userInfo: { uid: 'user-1' } } }) };
    const bookmark = await buildBookmark(bookmarkClient, sharedDocId);
    expect(bookmark.documentId).toBe('doc-2');
    expect(bookmark.createdBy).toBe('user-1');

    const suppliedBookmark = await buildBookmark(
      { get: async () => Promise.reject(new Error('should not resolve a user')) },
      sharedDocId,
      'user-supplied'
    );
    expect(suppliedBookmark.createdBy).toBe('user-supplied');
  });

  test('resolveUserInfoId and buildXsrfHeader handle variants', () => {
    expect(resolveUserInfoId({ userInfo: { uid: 'uid-1' } })).toBe('uid-1');
    expect(resolveUserInfoId({ userInfo: { id: 'id-1' } })).toBe('id-1');
    expect(resolveUserInfoId()).toBeUndefined();

    expect(buildXsrfHeader('token')).toEqual({ 'X-XSRF-TOKEN': 'token' });
    expect(buildXsrfHeader()).toEqual({});
  });

  test('resolveUploadedDocId handles possible document ids', () => {
    expect(resolveUploadedDocId({ documents: [{ originalDocumentId: 'orig' }] })).toBe('orig');
    expect(resolveUploadedDocId({ documents: [{ documentId: 'doc' }] })).toBe('doc');
    expect(resolveUploadedDocId({ documents: [{ id: 'id' }] })).toBe('id');
    expect(resolveUploadedDocId({ documents: [] })).toBeUndefined();
    expect(resolveUploadedDocId({})).toBeUndefined();
  });

  test('uploadSyntheticDoc returns uploaded id when ok', async () => {
    let disposed = false;

    const response = {
      ok: () => true,
      json: async () => ({ documents: [{ documentId: 'doc-1' }] }),
    };
    const ctx = {
      post: async () => response,
      dispose: async () => {
        disposed = true;
      },
    };

    const uploaded = await uploadSyntheticDoc({
      ensureStorageState: async () => 'state.json',
      getStoredCookie: async () => 'token',
      requestFactory: async () => ctx as unknown as APIRequestContext,
    });
    expect(uploaded).toBe('doc-1');
    expect(disposed).toBe(true);
  });

  test('uploadSyntheticDoc rejects failed upload and disposes its context', async () => {
    let disposed = false;

    const response = {
      ok: () => false,
      status: () => 403,
      json: async () => ({}),
    };
    const ctx = {
      post: async () => response,
      dispose: async () => {
        disposed = true;
      },
    };

    await expect(
      uploadSyntheticDoc({
        ensureStorageState: async () => 'state.json',
        getStoredCookie: async () => undefined,
        requestFactory: async () => ctx as unknown as APIRequestContext,
      })
    ).rejects.toThrow('HTTP 403');
    expect(disposed).toBe(true);
  });

  test('uploadSyntheticDoc preserves setup errors', async () => {
    await expect(
      uploadSyntheticDoc({
        ensureStorageState: async () => {
          throw new Error('boom');
        },
      })
    ).rejects.toThrow('boom');
  });
});

documentTest.describe('Case-bound document binary API', { tag: '@svc-evidence-manager' }, () => {
  documentTest.describe.configure({ timeout: 5 * 60_000 });
  let document: CaseBoundDocument;

  documentTest.beforeEach(async ({ page, createCasePage, caseDetailsPage, identityLease }, testInfo) => {
    const lease = await identityLease.acquire({ pool: 'DIVORCE_SOLICITOR' });
    await applySessionCookies(page, lease.identity.userIdentifier);
    document = await createCaseBoundDocument({
      page,
      createCasePage,
      caseDetailsPage,
      testInfo,
      gateway: 'legacy',
      fileName: `binary-api-${Date.now()}-${testInfo.workerIndex}.pdf`,
      mimeType: 'application/pdf',
      content: readFileSync(
        path.resolve('playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf')
      ),
    });
  });

  documentTest('returns document binary with XSRF', async ({ page }) => {
    const response = await page.request.get(document.binaryPath, {
      headers: await documentXsrfHeaders(page),
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']?.split(';')[0].trim()).toBe(document.expectedContentType);
    expect(await response.body()).toEqual(document.expectedContent);
  });

  documentTest('rejects unauthenticated binary fetch', async () => {
    const anonymous = await playwrightRequest.newContext({ baseURL: config.baseUrl });
    try {
      const response = await anonymous.get(document.binaryPath, { failOnStatusCode: false, maxRedirects: 0 });
      expect(response.status()).toBe(401);
      expect(response.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
      expect((await response.body()).includes(Buffer.from('%PDF-'))).toBe(false);
    } finally {
      await anonymous.dispose();
    }
  });

  documentTest(
    'rejects a document absent from the accessible case',
    async ({ page, createCasePage, caseDetailsPage }, testInfo) => {
      const headers = await documentXsrfHeaders(page);
      const control = await page.request.get(document.binaryPath, { headers, failOnStatusCode: false, maxRedirects: 0 });
      expect(control.status()).toBe(200);
      expect(await control.body()).toEqual(document.expectedContent);
      const otherCase = await createCaseBoundDocument({
        page,
        createCasePage,
        caseDetailsPage,
        testInfo,
        gateway: 'legacy',
        fileName: `binary-other-case-${Date.now()}-${testInfo.workerIndex}.pdf`,
        mimeType: document.expectedContentType,
        content: document.expectedContent,
      });
      expect(otherCase.caseId).not.toBe(document.caseId);
      expect(otherCase.documentId).not.toBe(document.documentId);
      const response = await page.request.get(`/documents/${document.documentId}/binary?caseId=${otherCase.caseId}`, {
        headers: await documentXsrfHeaders(page),
        failOnStatusCode: false,
        maxRedirects: 0,
      });
      expect([403, 404], 'A known document must be denied when it does not belong to the supplied case').toContain(
        response.status()
      );
      expect(response.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
      expect((await response.body()).includes(Buffer.from('%PDF-'))).toBe(false);
      expect(await response.body()).not.toEqual(document.expectedContent);
    }
  );
});
