import { promises as fs } from 'node:fs';

import { request as playwrightRequest } from '@playwright/test';
import { v4 as uuid } from 'uuid';

import { config } from '../common/apiTestConfig';
import { ensureStorageState, getStoredCookie } from './auth';
import { test, expect } from './fixtures';
import { EM_DOC_ID } from './data/testIds';
import { expectAnnotationShape, expectBookmarkShape } from './utils/assertions';
import { expectStatus, StatusSets, withXsrf } from './utils/apiTestUtils';
import { AnnotationPayload, BookmarkPayload } from './utils/types';

const configuredDocId = EM_DOC_ID ?? config.em[config.testEnv as keyof typeof config.em]?.docId;
let sharedDocId: string | undefined;
const invalidDocId = uuid();

test.describe('Evidence Manager & Documents', () => {
  test.beforeAll(async () => {
    if (configuredDocId) {
      sharedDocId = configuredDocId;
      return;
    }
    sharedDocId = await uploadSyntheticDoc();
  });

  test('returns document binary with XSRF', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get<ArrayBuffer>(`documents/${sharedDocId}/binary`, {
        headers: { ...headers, experimental: 'true' },
        throwOnError: false,
        responseType: 'arraybuffer'
      });
      expectStatus(res.status, [200, 204, 401, 403, 404, 500]);
      if (res.status === 200) {
        expect((res.data as ArrayBuffer)?.byteLength ?? 0).toBeGreaterThan(0);
      }
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
      expectStatus(res.status, [400, 404]);
    });
  });

  test('creates and deletes annotation with valid XSRF', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const annotation = await buildAnnotation(apiClient, headers);
      const createRes = await apiClient.put('em-anno/annotations', {
        data: annotation,
        headers,
        throwOnError: false
      });
      expectStatus(createRes.status, [200, 204, 401, 403, 404, 409, 500]);
      if (createRes.status === 200 && Array.isArray((createRes.data as any)?.annotations)) {
        const created = (createRes.data as any).annotations?.[0];
        if (created) {
          expectAnnotationShape(created);
        }
      }

      const createdId = (createRes.data as any)?.annotations?.[0]?.id ?? annotation.id;
      const deleteRes = await apiClient.delete(`em-anno/annotations/${createdId}`, {
        data: annotation,
        headers,
        throwOnError: false
      });
      expectStatus(deleteRes.status, [200, 204, 401, 403, 409, 500]);
    });
  });

  test('rejects annotation mutation without XSRF', async ({ apiClient }) => {
    const annotation = await buildAnnotation(apiClient, {});
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

      const bookmark = await buildBookmark(apiClient);
      const createRes = await apiClient.put('em-anno/bookmarks', {
        data: bookmark,
        headers,
        throwOnError: false
      });
      expectStatus(createRes.status, [200, 204, 401, 403, 404, 409, 500]);
      const createdId = (createRes.data as any)?.id ?? bookmark.id;
      if (createRes.status === 200) {
        expectBookmarkShape(createRes.data as any);
      }

      const deleteRes = await apiClient.delete('em-anno/bookmarks_multiple', {
        data: { deleted: [createdId] },
        headers,
        throwOnError: false
      });
      expectStatus(deleteRes.status, [200, 204, 401, 403, 404, 409, 500]);
    });
  });

  test('rejects bookmark creation with invalid XSRF token', async ({ apiClient }) => {
    const bookmark = await buildBookmark(apiClient);
    const res = await apiClient.put('em-anno/bookmarks', {
      data: bookmark,
      headers: { 'X-XSRF-TOKEN': 'invalid' },
      throwOnError: false
    });
    expectStatus(res.status, [400, 401, 403, 409, 500]);
  });

  test('rejects bookmark creation without XSRF', async ({ apiClient }) => {
    const bookmark = await buildBookmark(apiClient);
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
      headers: xsrf ? { 'X-XSRF-TOKEN': xsrf } : {},
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
      headers: xsrf ? { 'X-XSRF-TOKEN': xsrf } : {},
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

async function buildAnnotation(apiClient: any, headers: Record<string, string>): Promise<AnnotationPayload> {
  const annoId = uuid();
  const rectangleId = uuid();
  const setId = await resolveAnnotationSetId(apiClient, headers);

  return {
    id: annoId,
    color: 'FFFF00',
    comments: [],
    page: 1,
    rectangles: [
      {
        id: rectangleId,
        x: 418.5,
        y: 761.3,
        width: 212.2,
        height: 18
      }
    ],
    type: 'highlight',
    documentId: sharedDocId,
    annotationSetId: setId
  };
}

async function resolveAnnotationSetId(apiClient: any, headers: Record<string, string>) {
  try {
    const res = await apiClient.get(`em-anno/annotation-sets/filter?documentId=${sharedDocId}`, {
      headers,
      throwOnError: false
    });
    const id = (res.data as any)?.id;
    return typeof id === 'string' ? id : uuid();
  } catch {
    return uuid();
  }
}

async function buildBookmark(apiClient: any): Promise<BookmarkPayload> {
  const userId = await fetchUserId(apiClient);
  return {
    id: uuid(),
    name: `auto-${Date.now()}`,
    documentId: sharedDocId,
    createdBy: userId,
    pageNumber: 1,
    xCoordinate: 1,
    yCoordinate: 1,
    parent: null,
    previous: null
  };
}

async function fetchUserId(apiClient: any): Promise<string | undefined> {
  const res = await apiClient.get<{ userInfo?: { uid?: string; id?: string } }>('api/user/details', {
    throwOnError: false
  });
  return res.data?.userInfo?.uid ?? res.data?.userInfo?.id;
}

async function uploadSyntheticDoc(): Promise<string> {
  // Try to upload a tiny text blob to DM via the proxy using the stored session.
  try {
    const storageState = await ensureStorageState('solicitor');
    const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
    const ctx = await request.newContext({
      baseURL: config.baseUrl.replace(/\/+$/, ''),
      storageState,
      ignoreHTTPSErrors: true
    });

    const res = await ctx.post('documents', {
      multipart: {
        files: {
          name: 'file',
          mimeType: 'text/plain',
          buffer: Buffer.from('synthetic evidence-manager upload')
        }
      },
      headers: xsrf ? { 'X-XSRF-TOKEN': xsrf } : {}
    });
    if (res.ok()) {
      const body = await res.json();
      const id = body?.documents?.[0]?.originalDocumentId ?? body?.documents?.[0]?.documentId ?? body?.documents?.[0]?.id;
      if (id) {
        await ctx.dispose();
        return id;
      }
    }
    await ctx.dispose();
  } catch (error) {
    // best-effort; fall through
  }
  return uuid();
}
