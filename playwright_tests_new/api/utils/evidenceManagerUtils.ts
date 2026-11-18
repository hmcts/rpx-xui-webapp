import { request as playwrightRequest } from '@playwright/test';
import { v4 as uuid } from 'uuid';

import { config } from './apiTestRuntimeConfig';
import { ensureStorageState, getStoredCookie } from './auth';
import { expectAnnotationShape, expectBookmarkShape } from './assertions';
import { AnnotationPayload, BookmarkPayload } from './types';

type ApiClient = {
  get: (path: string, options?: { headers?: Record<string, string>; throwOnError?: boolean }) => Promise<{ data?: unknown }>;
};

export function resolveConfiguredDocId(explicit?: string, fallback?: string): string | undefined {
  return explicit ?? fallback;
}

export async function resolveSharedDocId(configured: string | undefined, uploadFn: () => Promise<string>): Promise<string> {
  if (configured) {
    return configured;
  }
  return uploadFn();
}

export function assertAnnotationResponse(status: number, data: unknown): void {
  const annotations = getAnnotations(data);
  if (status === 200 && annotations.length > 0) {
    expectAnnotationShape(annotations[0]);
  }
}

export function resolveCreatedAnnotationId(data: unknown, fallback: string): string {
  const annotations = getAnnotations(data);
  if (annotations.length === 0) {
    return fallback;
  }
  const first = annotations[0];
  if (typeof first === 'object' && first !== null && 'id' in first) {
    const id = (first as { id?: unknown }).id;
    return typeof id === 'string' ? id : fallback;
  }
  return fallback;
}

export function resolveCreatedBookmarkId(data: unknown, fallback: string): string {
  if (typeof data === 'object' && data !== null && 'id' in data) {
    const id = (data as { id?: unknown }).id;
    return typeof id === 'string' ? id : fallback;
  }
  return fallback;
}

export function assertBookmarkResponse(status: number, data: unknown): void {
  if (status === 200 && data) {
    expectBookmarkShape(data);
  }
}

export function resolveUserInfoId(data?: { userInfo?: { uid?: string; id?: string } }): string | undefined {
  return data?.userInfo?.uid ?? data?.userInfo?.id;
}

export function buildXsrfHeader(xsrf?: string): Record<string, string> {
  return xsrf ? { 'X-XSRF-TOKEN': xsrf } : {};
}

export function resolveUploadedDocId(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null) {
    return undefined;
  }
  const payload = body as { documents?: unknown; _embedded?: { documents?: unknown } };
  const documents = payload._embedded?.documents ?? payload.documents;
  if (!Array.isArray(documents) || documents.length === 0) {
    return undefined;
  }
  const first = documents[0];
  if (typeof first !== 'object' || first === null) {
    return undefined;
  }
  const doc = first as {
    originalDocumentId?: unknown;
    documentId?: unknown;
    id?: unknown;
    _links?: { self?: { href?: string } };
  };
  const candidate = doc.originalDocumentId ?? doc.documentId ?? doc.id;
  if (typeof candidate === 'string' && candidate.trim()) return candidate;
  const href = doc._links?.self?.href;
  if (!href) return undefined;
  try {
    return new URL(href).pathname.match(/^\/documents\/([^/]+)\/?$/)?.[1];
  } catch {
    return undefined;
  }
}

export async function resolveAnnotationSetId(
  apiClient: ApiClient,
  headers: Record<string, string>,
  docId: string
): Promise<string> {
  try {
    const res = await apiClient.get(`em-anno/annotation-sets/filter?documentId=${docId}`, {
      headers,
      throwOnError: false,
    });
    const payload = res.data;
    const id = typeof payload === 'object' && payload !== null && 'id' in payload ? (payload as { id?: unknown }).id : undefined;
    return typeof id === 'string' ? id : uuid();
  } catch {
    return uuid();
  }
}

export async function buildAnnotation(
  apiClient: ApiClient,
  headers: Record<string, string>,
  docId: string,
  annotationSetId?: string
): Promise<AnnotationPayload & { id: string }> {
  const annoId = uuid();
  const rectangleId = uuid();
  const setId = annotationSetId ?? (await resolveAnnotationSetId(apiClient, headers, docId));

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
        height: 18,
      },
    ],
    type: 'highlight',
    documentId: docId,
    annotationSetId: setId,
  };
}

export async function buildBookmark(
  apiClient: ApiClient,
  docId: string,
  createdBy?: string
): Promise<BookmarkPayload & { id: string }> {
  const userId = createdBy ?? (await fetchUserId(apiClient));
  return {
    id: uuid(),
    name: `auto-${Date.now()}`,
    documentId: docId,
    createdBy: userId,
    pageNumber: 1,
    xCoordinate: 1,
    yCoordinate: 1,
    parent: null,
    previous: null,
  };
}

export async function fetchUserId(apiClient: ApiClient): Promise<string | undefined> {
  const res = await apiClient.get('api/user/details', {
    throwOnError: false,
  });
  return resolveUserInfoId(res.data as { userInfo?: { uid?: string; id?: string } });
}

type UploadDeps = {
  ensureStorageState?: typeof ensureStorageState;
  getStoredCookie?: typeof getStoredCookie;
  requestFactory?: typeof playwrightRequest.newContext;
  resolveUploadedDocId?: typeof resolveUploadedDocId;
};

export async function uploadSyntheticDoc(deps: UploadDeps = {}): Promise<string> {
  const ensure = deps.ensureStorageState ?? ensureStorageState;
  const getCookie = deps.getStoredCookie ?? getStoredCookie;
  const requestFactory = deps.requestFactory ?? ((options) => playwrightRequest.newContext(options));
  const resolveId = deps.resolveUploadedDocId ?? resolveUploadedDocId;
  const storageState = await ensure('solicitor');
  const xsrf = await getCookie('solicitor', 'XSRF-TOKEN');
  const ctx = await requestFactory({
    baseURL: config.baseUrl.replace(/\/+$/, ''),
    storageState,
    ignoreHTTPSErrors: true,
  });
  try {
    const res = await ctx.post('documents', {
      multipart: {
        files: {
          name: 'evidence-manager-fixture.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('synthetic evidence-manager upload'),
        },
      },
      headers: buildXsrfHeader(xsrf),
      failOnStatusCode: false,
    });
    if (!res.ok()) throw new Error(`Evidence Manager fixture upload failed with HTTP ${res.status()}.`);
    const id = resolveId(await res.json());
    if (!id) throw new Error('Evidence Manager fixture upload returned no document ID.');
    return id;
  } finally {
    await ctx.dispose();
  }
}

function getAnnotations(data: unknown): unknown[] {
  if (typeof data !== 'object' || data === null || !('annotations' in data)) {
    return [];
  }
  const annotations = (data as { annotations?: unknown }).annotations;
  return Array.isArray(annotations) ? annotations : [];
}
