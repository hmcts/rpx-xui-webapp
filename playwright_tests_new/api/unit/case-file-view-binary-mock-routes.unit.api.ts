import { expect, test, type Page, type Route } from '@playwright/test';
import { setupCaseFileViewDocumentBinaryMockRoutes } from '../../integration/helpers/caseFileViewMockRoutes.helper';
import { setupMediaViewerHandoffAnnotationRoutes } from '../../integration/helpers/mediaViewerHandoff.helper';
import {
  CASE_FILE_VIEW_BINARY_FAILURE_RESPONSE,
  CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF,
} from '../../integration/mocks/caseFileView.mock';

test.describe('case file view binary mock routes', { tag: '@svc-internal' }, () => {
  test('mocks only the accepted document annotation GETs and leaves mutations to the closure', async () => {
    const routes = new Map<string, (route: Route) => Promise<void>>();
    const page = {
      route: async (url: string, handler: (route: Route) => Promise<void>) => {
        routes.set(url, handler);
      },
    } as unknown as Page;
    const prefix = 'https://xui.example/em-anno';
    const documentId = '11111111-1111-1111-1111-111111111111';
    await setupMediaViewerHandoffAnnotationRoutes(page, 'https://xui.example');
    const expectedResponses = new Map<string, unknown>([
      [
        `${prefix}/annotation-sets/filter?documentId=${documentId}`,
        { id: 'fictional-annotation-set', documentId, annotations: [] },
      ],
      [`${prefix}/${documentId}/bookmarks`, []],
      [`${prefix}/metadata/${documentId}`, { documentId, rotationAngle: 0 }],
    ]);
    expect([...routes.keys()]).toEqual([...expectedResponses.keys()]);

    for (const [url, handler] of routes) {
      let fulfilled: unknown;
      let fellBack = false;
      for (const method of ['GET', 'POST']) {
        await handler({
          request: () => ({ method: () => method }),
          fulfill: async (response: unknown) => {
            fulfilled = response;
          },
          fallback: async () => {
            fellBack = true;
          },
        } as unknown as Route);
        if (method === 'GET') {
          expect(fulfilled).toEqual({ status: 200, json: expectedResponses.get(url) });
          expect(fellBack).toBe(false);
          fulfilled = undefined;
        } else {
          expect(fulfilled).toBeUndefined();
          expect(fellBack).toBe(true);
        }
      }
    }
  });

  test('captures full legacy and v2 URLs including query context and referring case', async () => {
    let matches: ((url: URL) => boolean) | undefined;
    let handle: ((route: Route) => Promise<void>) | undefined;
    const page = {
      route: async (matcher: (url: URL) => boolean, handler: (route: Route) => Promise<void>) => {
        matches = matcher;
        handle = handler;
      },
    } as unknown as Page;
    const observations: { url: string; referer: string }[] = [];
    await setupCaseFileViewDocumentBinaryMockRoutes(page, (url, referer) => observations.push({ url, referer }));
    for (const gateway of ['documents', 'documentsv2']) {
      const url = `https://xui.example/${gateway}/document-a/binary?caseId=case-a`;
      let fulfilled: unknown;
      expect(matches?.(new URL(url))).toBe(true);
      await handle?.({
        request: () => ({ url: () => url, headerValue: async () => 'https://xui.example/cases/case-details/J/C/case-a' }),
        fulfill: async (response: unknown) => {
          fulfilled = response;
        },
      } as unknown as Route);
      expect(observations.at(-1)).toEqual({ url, referer: 'https://xui.example/cases/case-details/J/C/case-a' });
      expect(fulfilled).toEqual({ status: 200, contentType: 'application/pdf', body: CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF });
    }
    expect(matches?.(new URL('https://xui.example/documents/a/metadata'))).toBe(false);
    expect(matches?.(new URL('https://xui.example/not-documents/a/binary'))).toBe(false);
    expect(matches?.(new URL('https://xui.example/documents/a/binary/extra'))).toBe(false);
  });

  test('returns the supplied binary fault without replacing it with successful PDF bytes', async () => {
    let handle: ((route: Route) => Promise<void>) | undefined;
    const page = {
      route: async (_matcher: unknown, handler: (route: Route) => Promise<void>) => {
        handle = handler;
      },
    } as unknown as Page;
    await setupCaseFileViewDocumentBinaryMockRoutes(page, undefined, CASE_FILE_VIEW_BINARY_FAILURE_RESPONSE);
    let fulfilled: unknown;
    await handle?.({
      request: () => ({ url: () => 'https://xui.example/documents/document-a/binary', headerValue: async () => '' }),
      fulfill: async (response: unknown) => {
        fulfilled = response;
      },
    } as unknown as Route);
    expect(fulfilled).toEqual(CASE_FILE_VIEW_BINARY_FAILURE_RESPONSE);
  });
});
