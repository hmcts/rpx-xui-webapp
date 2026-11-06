import { EventEmitter } from 'node:events';
import { expect, test } from '@playwright/test';
import type { BrowserContext, Page, Request, Response } from '@playwright/test';

import { MediaViewerBackendMonitor } from '../../E2E/utils/test-setup/mediaViewerBackendMonitor.js';

function binaryResponse(
  page: Page,
  {
    status = 200,
    url = 'https://xui.example/documents/document-1/binary',
    method = 'GET',
    referer = 'https://xui.example/media-viewer',
  } = {}
): Response {
  const request = {
    method: () => method,
    headers: () => ({ referer }),
  } as unknown as Request;
  return {
    request: () => request,
    status: () => status,
    url: () => url,
    headers: () => ({ 'content-type': 'application/pdf' }),
    frame: () => ({ page: () => page }),
  } as unknown as Response;
}

function record(context: EventEmitter, response: Response): void {
  context.emit('request', response.request());
  context.emit('response', response);
}

test.describe('Media Viewer backend monitor', { tag: '@svc-internal' }, () => {
  const page = {} as Page;
  let context: EventEmitter;
  let monitor: MediaViewerBackendMonitor;

  test.beforeEach(() => {
    context = new EventEmitter();
    monitor = new MediaViewerBackendMonitor(context as unknown as BrowserContext);
  });

  test.afterEach(() => monitor.dispose());

  test('a prior successful load cannot satisfy a reload which receives 403', () => {
    const firstLoad = monitor.beginAction('document-1');
    record(context, binaryResponse(page));
    expect(monitor.observationsFor(firstLoad, page).map((entry) => entry.status)).toEqual([200]);

    const reload = monitor.beginAction('document-1');
    expect(monitor.observationsFor(reload, page)).toEqual([]);
    record(context, binaryResponse(page, { status: 403 }));
    expect(monitor.observationsFor(reload, page).map((entry) => entry.status)).toEqual([403]);
    expect(monitor.observationsFor(firstLoad, page).map((entry) => entry.status)).toEqual([200]);
  });

  test('excludes a request started before the action even when its response arrives later', () => {
    monitor.beginAction('document-1');
    const earlier = binaryResponse(page);
    context.emit('request', earlier.request());
    const reload = monitor.beginAction('document-1');
    context.emit('response', earlier);
    expect(monitor.observationsFor(reload, page)).toEqual([]);
  });

  test('does not borrow a successful response from another document or page', () => {
    const action = monitor.beginAction('document-1');
    record(context, binaryResponse(page, { url: 'https://xui.example/documents/other-document/binary' }));
    record(context, binaryResponse({} as Page));
    expect(monitor.observationsFor(action, page)).toEqual([]);
    record(context, binaryResponse(page, { status: 500 }));
    expect(monitor.observationsFor(action, page).map((entry) => entry.status)).toEqual([500]);
  });

  test('retains an initial navigation response until its opened page becomes available', () => {
    const action = monitor.beginAction('document-1');
    let frameAvailable = false;
    const candidate = {
      ...binaryResponse(page),
      frame: () => {
        if (!frameAvailable) throw new Error('Frame for this navigation request is not available');
        return { page: () => page };
      },
    } as unknown as Response;
    expect(() => candidate.frame()).toThrow('Frame for this navigation request is not available');
    expect(() => record(context, candidate)).not.toThrow();

    frameAvailable = true;
    expect(monitor.observationsFor(action, page)).toHaveLength(1);
    expect(monitor.observationsFor(action, page)[0]).toMatchObject({ documentId: 'document-1', status: 200 });
    expect(monitor.observationsFor(action, {} as Page)).toEqual([]);
  });

  test('does not resolve an unavailable frame for an unrelated document', () => {
    const action = monitor.beginAction('document-1');
    const unrelated = {
      ...binaryResponse(page, { url: 'https://xui.example/documents/other-document/binary' }),
      frame: () => {
        throw new Error('Unrelated navigation frame is not available');
      },
    } as unknown as Response;
    expect(() => record(context, unrelated)).not.toThrow();
    record(context, binaryResponse(page));
    expect(monitor.observationsFor(action, page)).toHaveLength(1);
    expect(monitor.observationsFor(action, page)[0].documentId).toBe('document-1');
  });

  for (const [route, gateway] of [
    ['documents', 'legacy'],
    ['documentsv2', 'v2'],
  ] as const) {
    test(`parses the ${gateway} pathname separately from case context query`, () => {
      const action = monitor.beginAction('document-1');
      record(context, binaryResponse(page, { url: `https://xui.example/${route}/document-1/binary?caseId=123` }));
      expect(monitor.observationsFor(action, page)).toEqual([
        {
          url: `https://xui.example/${route}/document-1/binary?caseId=123`,
          pathname: `/${route}/document-1/binary`,
          search: '?caseId=123',
          gateway,
          documentId: 'document-1',
          status: 200,
          contentType: 'application/pdf',
          referer: 'https://xui.example/media-viewer',
        },
      ]);
    });
  }

  test('retains the actual gateway so the spec can reject an unexpected route', () => {
    const action = monitor.beginAction('document-1');
    record(context, binaryResponse(page, { url: 'https://xui.example/documentsv2/document-1/binary' }));
    expect(monitor.observationsFor(action, page)[0].gateway).toBe('v2');
    expect(monitor.observationsFor(action, page)[0].gateway).not.toBe('legacy');
  });

  test('excludes the handoff token from diagnostic referrers', () => {
    const action = monitor.beginAction('document-1');
    record(context, binaryResponse(page, { referer: 'https://xui.example/media-viewer?mvToken=synthetic-secret' }));
    expect(monitor.observationsFor(action, page)[0].referer).toBe('https://xui.example/media-viewer');
  });

  test('ignores non-binary paths, non-GET requests and responses issued before observation', () => {
    const action = monitor.beginAction('document-1');
    record(context, binaryResponse(page, { url: 'https://xui.example/documents/document-1' }));
    record(context, binaryResponse(page, { method: 'POST' }));
    context.emit('response', binaryResponse(page));
    expect(monitor.observationsFor(action, page)).toEqual([]);
  });

  test('unsubscribes without removing other context listeners', () => {
    const unrelated = () => undefined;
    context.on('response', unrelated);
    monitor.dispose();
    expect(context.listeners('request')).toEqual([]);
    expect(context.listeners('response')).toEqual([unrelated]);
  });
});
