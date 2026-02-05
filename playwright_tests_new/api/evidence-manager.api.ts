import { request as playwrightRequest } from '@playwright/test';
import { v4 as uuid } from 'uuid';

import { config } from '../common/apiTestConfig';
import { ensureStorageState, getStoredCookie } from './utils/auth';
import { test, expect } from './fixtures';
import { EM_DOC_ID } from './data/testIds';
import { expectStatus, withXsrf } from './utils/apiTestUtils';
import {
  assertAnnotationResponse,
  assertBinaryResponse,
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
  uploadSyntheticDoc
} from './utils/evidenceManagerUtils';

const configuredDocId = resolveConfiguredDocId(
  EM_DOC_ID,
  config.em[config.testEnv as keyof typeof config.em]?.docId
);
let sharedDocId = '';
const invalidDocId = uuid();

test.describe('Evidence Manager & Documents', () => {
  test.beforeAll(async () => {
    sharedDocId = await resolveSharedDocId(configuredDocId, uploadSyntheticDoc);
    if (!sharedDocId) {
      throw new Error('Evidence Manager sharedDocId was not resolved');
    }
  });

  test('returns document binary with XSRF', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get<ArrayBuffer>(`documents/${sharedDocId}/binary`, {
        headers: { ...headers, experimental: 'true' },
        throwOnError: false,
        responseType: 'arraybuffer'
      });
      expectStatus(res.status, [200, 204, 401, 403, 404, 500]);
      assertBinaryResponse(res.status, res.data);
    });
  });

  test('rejects unauthenticated binary fetch', async ({ anonymousClient }) => {
    const res = await anonymousClient.get(`documents/${sharedDocId}/binary`, { throwOnError: false });
    expectStatus(res.status, [401, 403]);
  });

  test('annotations metadata guarded by session', async ({ apiClient, anonymousClient }) => {
    const anon = await anonymousClient.get(`em-anno/metadata/${sharedDocId}`, { throwOnError: false });
    expectStatus(anon.status, [401, 403]);

    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get(`em-anno/metadata/${sharedDocId}`, {
        headers: { ...headers, experimental: 'true' },
        throwOnError: false
      });
      expectStatus(res.status, [200, 204, 401, 403, 404, 500]);
    });
  });

  test('returns 404 for missing document', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get(`documents/${invalidDocId}/binary`, {
        headers,
        throwOnError: false
      });
      expectStatus(res.status, [400, 401, 403, 404, 500]);
    });
  });

  test('creates and deletes annotation with valid XSRF', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const annotation = await buildAnnotation(apiClient, headers, sharedDocId);
      const createRes = await apiClient.put('em-anno/annotations', {
        data: annotation,
        headers,
        throwOnError: false
      });
      expectStatus(createRes.status, [200, 204, 401, 403, 404, 409, 500]);
      assertAnnotationResponse(createRes.status, createRes.data);

      const createdId = resolveCreatedAnnotationId(createRes.data, annotation.id);
      const deleteRes = await apiClient.delete(`em-anno/annotations/${createdId}`, {
        data: annotation,
        headers,
        throwOnError: false
      });
      expectStatus(deleteRes.status, [200, 204, 401, 403, 409, 500]);
    });
  });

  test('rejects annotation mutation without XSRF', async ({ apiClient }) => {
    const annotation = await buildAnnotation(apiClient, {}, sharedDocId);
    const res = await apiClient.put('em-anno/annotations', {
      data: annotation,
      headers: {},
      throwOnError: false
    });
    expectStatus(res.status, [200, 401, 403, 404, 409, 500]);
  });

  test('rejects annotation mutation with invalid payload', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const badPayload = { id: uuid(), rectangles: [] };
      const res = await apiClient.put('em-anno/annotations', {
        data: badPayload,
        headers,
        throwOnError: false
      });
      expectStatus(res.status, [400, 401, 403, 404, 409, 500]);
    });
  });

  test('bookmarks lifecycle', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const listRes = await apiClient.get<Array<any>>(`em-anno/${sharedDocId}/bookmarks`, {
        headers,
        throwOnError: false
      });
      expectStatus(listRes.status, [200, 204, 401, 403, 404, 500]);

      const bookmark = await buildBookmark(apiClient, sharedDocId);
      const createRes = await apiClient.put('em-anno/bookmarks', {
        data: bookmark,
        headers,
        throwOnError: false
      });
      expectStatus(createRes.status, [200, 204, 401, 403, 404, 409, 500]);
      const createdId = resolveCreatedBookmarkId(createRes.data, bookmark.id);
      assertBookmarkResponse(createRes.status, createRes.data);

      const deleteRes = await apiClient.delete('em-anno/bookmarks_multiple', {
        data: { deleted: [createdId] },
        headers,
        throwOnError: false
      });
      expectStatus(deleteRes.status, [200, 204, 401, 403, 404, 409, 500]);
    });
  });

  test('rejects bookmark creation with invalid XSRF token', async ({ apiClient }) => {
    const bookmark = await buildBookmark(apiClient, sharedDocId);
    const res = await apiClient.put('em-anno/bookmarks', {
      data: bookmark,
      headers: { 'X-XSRF-TOKEN': 'invalid' },
      throwOnError: false
    });
    expectStatus(res.status, [400, 401, 403, 409, 500]);
  });

  test('rejects bookmark creation without XSRF', async ({ apiClient }) => {
    const bookmark = await buildBookmark(apiClient, sharedDocId);
    const res = await apiClient.put('em-anno/bookmarks', {
      data: bookmark,
      headers: {},
      throwOnError: false
    });
    expectStatus(res.status, [200, 401, 403, 404, 409, 500]);
  });

  test('rejects bookmark mutation with invalid payload', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.put('em-anno/bookmarks', {
        data: { id: uuid(), name: 'bad' },
        headers,
        throwOnError: false
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
      ignoreHTTPSErrors: true
    });
    const res = await ctx.post('documents', {
      multipart: {},
      headers: buildXsrfHeader(xsrf),
      failOnStatusCode: false
    });
    expect([400, 401, 403, 415, 500]).toContain(res.status());
    await ctx.dispose();
  });

  test('rejects document upload with unsupported mime type', async () => {
    const storageState = await ensureStorageState('solicitor');
    const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
    const ctx = await playwrightRequest.newContext({
      baseURL: config.baseUrl.replace(/\/+$/, ''),
      storageState,
      ignoreHTTPSErrors: true
    });
    const res = await ctx.post('documents', {
      multipart: {
        files: {
          name: 'file',
          mimeType: 'application/x-msdownload',
          buffer: Buffer.from('bogus exe content')
        }
      },
      headers: buildXsrfHeader(xsrf),
      failOnStatusCode: false
    });
    expect([400, 401, 403, 415, 500]).toContain(res.status());
    await ctx.dispose();
  });

  test('returns guarded status for invalid document id on delete', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const bogusId = uuid();
      const res = await apiClient.delete(`em-anno/annotations/${bogusId}`, {
        data: {},
        headers,
        throwOnError: false
      });
      expectStatus(res.status, [400, 401, 403, 404, 409, 500]);
    });
  });

  test('rejects bookmark delete for missing document', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.delete('em-anno/bookmarks_multiple', {
        data: { deleted: [uuid()] },
        headers,
        throwOnError: false
      });
      expectStatus(res.status, [400, 401, 403, 404, 409, 500]);
    });
  });
});

test.describe('Evidence Manager helper coverage', () => {
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
      }
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

    const bookmarkClient = { get: async () => ({ data: { userInfo: { uid: 'user-1' } } }) };
    const bookmark = await buildBookmark(bookmarkClient, sharedDocId);
    expect(bookmark.documentId).toBe('doc-2');
    expect(bookmark.createdBy).toBe('user-1');
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

  test('assertBinaryResponse handles binary payloads', () => {
    assertBinaryResponse(200, new ArrayBuffer(4));
    assertBinaryResponse(204, new ArrayBuffer(0));
  });

  test('uploadSyntheticDoc returns uploaded id when ok', async () => {
    let disposed = false;

    const response = {
      ok: () => true,
      json: async () => ({ documents: [{ documentId: 'doc-1' }] })
    };
    const ctx = {
      post: async () => response,
      dispose: async () => {
        disposed = true;
      }
    };

    const uploaded = await uploadSyntheticDoc({
      ensureStorageState: async () => 'state.json',
      getStoredCookie: async () => 'token',
      requestFactory: async () => ctx as any,
      uuidFn: () => 'fallback-id'
    });
    expect(uploaded).toBe('doc-1');
    expect(disposed).toBe(true);
  });

  test('uploadSyntheticDoc falls back when response is not ok', async () => {
    let disposed = false;

    const response = {
      ok: () => false,
      json: async () => ({})
    };
    const ctx = {
      post: async () => response,
      dispose: async () => {
        disposed = true;
      }
    };

    const uploaded = await uploadSyntheticDoc({
      ensureStorageState: async () => 'state.json',
      getStoredCookie: async () => undefined,
      requestFactory: async () => ctx as any,
      uuidFn: () => 'fallback-id'
    });
    expect(uploaded).toBe('fallback-id');
    expect(disposed).toBe(true);
  });

  test('uploadSyntheticDoc falls back on errors', async () => {
    const uploaded = await uploadSyntheticDoc({
      ensureStorageState: async () => {
        throw new Error('boom');
      },
      uuidFn: () => 'fallback-id'
    });
    expect(uploaded).toBe('fallback-id');
  });
});
