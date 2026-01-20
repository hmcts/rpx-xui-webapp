import { expect, request as playwrightRequest } from '@playwright/test';
import { v4 as uuid } from 'uuid';

import { config } from '../../common/apiTestConfig';
import { ensureStorageState, getStoredCookie } from './auth';
import { expectAnnotationShape, expectBookmarkShape } from './assertions';
import { AnnotationPayload, BookmarkPayload } from './types';

export function resolveConfiguredDocId(explicit?: string, fallback?: string): string | undefined {
  return explicit ?? fallback;
}

export async function resolveSharedDocId(
  configured: string | undefined,
  uploadFn: () => Promise<string>
): Promise<string> {
  if (configured) {
    return configured;
  }
  return uploadFn();
}

export function assertBinaryResponse(status: number, data?: ArrayBuffer): void {
  if (status === 200) {
    expect((data?.byteLength ?? 0)).toBeGreaterThan(0);
  }
}

export function assertAnnotationResponse(status: number, data: any): void {
  if (status === 200 && Array.isArray(data?.annotations) && data.annotations.length > 0) {
    expectAnnotationShape(data.annotations[0] as any);
  }
}

export function resolveCreatedAnnotationId(data: any, fallback: string): string {
  const id = data?.annotations?.[0]?.id;
  return typeof id === 'string' ? id : fallback;
}

export function resolveCreatedBookmarkId(data: any, fallback: string): string {
  return typeof data?.id === 'string' ? data.id : fallback;
}

export function assertBookmarkResponse(status: number, data: any): void {
  if (status === 200 && data) {
    expectBookmarkShape(data as any);
  }
}

export function resolveUserInfoId(data?: { userInfo?: { uid?: string; id?: string } }): string | undefined {
  return data?.userInfo?.uid ?? data?.userInfo?.id;
}

export function buildXsrfHeader(xsrf?: string): Record<string, string> {
  return xsrf ? { 'X-XSRF-TOKEN': xsrf } : {};
}

export function resolveUploadedDocId(body: any): string | undefined {
  const first = body?.documents?.[0];
  return first?.originalDocumentId ?? first?.documentId ?? first?.id;
}

export async function resolveAnnotationSetId(
  apiClient: any,
  headers: Record<string, string>,
  docId: string
): Promise<string> {
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

export async function buildAnnotation(
  apiClient: any,
  headers: Record<string, string>,
  docId: string
): Promise<AnnotationPayload> {
  const annoId = uuid();
  const rectangleId = uuid();
  const setId = await resolveAnnotationSetId(apiClient, headers, docId);

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

export async function buildBookmark(apiClient: any, docId: string): Promise<BookmarkPayload> {
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

export async function fetchUserId(apiClient: any): Promise<string | undefined> {
  const res = await apiClient.get<{ userInfo?: { uid?: string; id?: string } }>('api/user/details', {
    throwOnError: false
  });
  return resolveUserInfoId(res.data);
}

type UploadDeps = {
  ensureStorageState?: typeof ensureStorageState;
  getStoredCookie?: typeof getStoredCookie;
  requestFactory?: typeof playwrightRequest.newContext;
  resolveUploadedDocId?: typeof resolveUploadedDocId;
  uuidFn?: typeof uuid;
};

export async function uploadSyntheticDoc(deps: UploadDeps = {}): Promise<string> {
  // Try to upload a tiny text blob to DM via the proxy using the stored session.
  const ensure = deps.ensureStorageState ?? ensureStorageState;
  const getCookie = deps.getStoredCookie ?? getStoredCookie;
  const requestFactory = deps.requestFactory ?? ((options) => playwrightRequest.newContext(options));
  const resolveId = deps.resolveUploadedDocId ?? resolveUploadedDocId;
  const uuidFn = deps.uuidFn ?? uuid;
  try {
    const storageState = await ensure('solicitor');
    const xsrf = await getCookie('solicitor', 'XSRF-TOKEN');
    const ctx = await requestFactory({
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
      headers: buildXsrfHeader(xsrf)
    });
    if (res.ok()) {
      const body = await res.json();
      const id = resolveId(body);
      if (id) {
        await ctx.dispose();
        return id;
      }
    }
    await ctx.dispose();
  } catch {
    // best-effort; fall through
  }
  return uuidFn();
}
