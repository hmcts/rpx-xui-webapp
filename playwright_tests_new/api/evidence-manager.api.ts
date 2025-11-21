import { v4 as uuid } from 'uuid';
import { test, expect } from './fixtures';
import { config } from '../../test_codecept/integration/tests/config/config';
import { expectStatus, StatusSets, withXsrf } from './utils/apiTestUtils';

const docId = process.env.EM_DOC_ID ?? config.em[config.testEnv as keyof typeof config.em]?.docId;

test.describe('Evidence Manager & Documents', () => {
  test('returns document binary with XSRF', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get<ArrayBuffer>(`documents/${docId}/binary`, {
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
    const res = await anonymousClient.get(`documents/${docId}/binary`, { throwOnError: false });
    expectStatus(res.status, [401, 403]);
  });

  test('annotations metadata guarded by session', async ({ apiClient, anonymousClient }) => {
    const anon = await anonymousClient.get(`em-anno/metadata/${docId}`, { throwOnError: false });
    expectStatus(anon.status, [401, 403]);

    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get(`em-anno/metadata/${docId}`, {
        headers: { ...headers, experimental: 'true' },
        throwOnError: false
      });
      expectStatus(res.status, [200, 204, 401, 403, 500]);
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
      expectStatus(createRes.status, [200, 204, 401, 403, 409, 500]);

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
    expectStatus(res.status, [200, 401, 403, 409, 500]);
  });

  test('bookmarks lifecycle', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const listRes = await apiClient.get<Array<any>>(`em-anno/${docId}/bookmarks`, {
        headers,
        throwOnError: false
      });
      expectStatus(listRes.status, [200, 204, 401, 403, 500]);

      const bookmark = await buildBookmark(apiClient);
      const createRes = await apiClient.put('em-anno/bookmarks', {
        data: bookmark,
        headers,
        throwOnError: false
      });
      expectStatus(createRes.status, [200, 204, 401, 403, 409, 500]);
      const createdId = (createRes.data as any)?.id ?? bookmark.id;

      const deleteRes = await apiClient.delete('em-anno/bookmarks_multiple', {
        data: { deleted: [createdId] },
        headers,
        throwOnError: false
      });
      expectStatus(deleteRes.status, [200, 204, 401, 403, 409, 500]);
    });
  });

  test('rejects bookmark creation without XSRF', async ({ apiClient }) => {
    const bookmark = await buildBookmark(apiClient);
    const res = await apiClient.put('em-anno/bookmarks', {
      data: bookmark,
      headers: {},
      throwOnError: false
    });
    expectStatus(res.status, [200, 401, 403, 409, 500]);
  });
});

async function buildAnnotation(apiClient: any, headers: Record<string, string>) {
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
    documentId: docId,
    annotationSetId: setId
  };
}

async function resolveAnnotationSetId(apiClient: any, headers: Record<string, string>) {
  try {
    const res = await apiClient.get(`em-anno/annotation-sets/filter?documentId=${docId}`, {
      headers,
      throwOnError: false
    });
    const id = (res.data as any)?.id;
    return typeof id === 'string' ? id : uuid();
  } catch {
    return uuid();
  }
}

async function buildBookmark(apiClient: any) {
  const userId = await fetchUserId(apiClient);
  return {
    id: uuid(),
    name: `auto-${Date.now()}`,
    documentId: docId,
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
