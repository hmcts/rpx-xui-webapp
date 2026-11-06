import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const payload = JSON.stringify({
  document_binary_url: '/documents/document-a/binary',
  document_filename: 'document-a.pdf',
  content_type: 'application/pdf',
  case_id: '1111111111111111',
});

function bootstrap(pathname = '/media-viewer', search = '?mvToken=handoff-token', hasOpener = true) {
  const script = readFileSync('src/index.html', 'utf8').match(
    /<script\b[^>]*id="media-viewer-bootstrap-handoff"[^>]*>([\s\S]*?)<\/script>/
  );
  expect(script, 'The receiver must execute in the HTML before Angular modules load').not.toBeNull();
  const listeners = new Set<(event: unknown) => void>();
  const stored = new Map<string, string>();
  const acknowledgements: unknown[] = [];
  const cleanedUrls: unknown[] = [];
  let failStorage = false;
  const opener = { postMessage: (...args: unknown[]) => acknowledgements.push(args) };
  const window = {
    location: { pathname, search, origin: 'https://xui.example' },
    opener: hasOpener ? opener : null,
    sessionStorage: {
      setItem(key: string, value: string) {
        if (failStorage) throw new Error('Storage unavailable');
        stored.set(key, value);
      },
    },
    history: { replaceState: (...args: unknown[]) => cleanedUrls.push(args) },
    addEventListener: (_type: string, listener: (event: unknown) => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: (event: unknown) => void) => listeners.delete(listener),
    __exuiTakeMediaViewerHandoff: undefined as undefined | (() => boolean),
  };
  runInNewContext(script![1], { window, document: { title: 'Manage cases' }, URLSearchParams });
  return {
    window,
    stored,
    acknowledgements,
    cleanedUrls,
    failStorage: (value: boolean) => (failStorage = value),
    send(
      data: { type?: unknown; token?: unknown; payload?: unknown } = {},
      origin = window.location.origin,
      source: unknown = opener
    ) {
      for (const listener of listeners) {
        listener({ origin, source, data: { type: 'MEDIA_VIEWER_HANDOFF', token: 'handoff-token', payload, ...data } });
      }
    },
  };
}

test.describe('Media viewer bootstrap handoff', { tag: '@svc-internal' }, () => {
  test('persists metadata before acknowledging and transfers consumed ownership to Angular', () => {
    const receiver = bootstrap();
    receiver.send();
    expect(receiver.stored.get('media-viewer-info')).toBe(payload);
    expect(receiver.acknowledgements).toEqual([
      [{ type: 'MEDIA_VIEWER_HANDOFF_RECEIVED', token: 'handoff-token' }, 'https://xui.example'],
    ]);
    expect(receiver.cleanedUrls).toEqual([[{}, 'Manage cases', '/media-viewer']]);
    expect(receiver.window.__exuiTakeMediaViewerHandoff?.()).toBe(true);
    receiver.send({ payload: payload.replace('document-a', 'document-b') });
    expect(receiver.stored.get('media-viewer-info')).toBe(payload);
    expect(receiver.acknowledgements).toHaveLength(1);
  });

  test('detaches without consuming when Angular becomes ready first', () => {
    const receiver = bootstrap();
    expect(receiver.window.__exuiTakeMediaViewerHandoff?.()).toBe(false);
    receiver.send();
    expect(receiver.stored.size).toBe(0);
    expect(receiver.acknowledgements).toHaveLength(0);
  });

  for (const invalid of [
    { name: 'wrong type', data: { type: 'OTHER' } },
    { name: 'wrong token', data: { token: 'wrong' } },
    { name: 'non-string payload', data: { payload: {} } },
    { name: 'malformed JSON', data: { payload: '{' } },
    { name: 'missing metadata', data: { payload: '{}' } },
    { name: 'null metadata', data: { payload: 'null' } },
    { name: 'invalid binary URL', data: { payload: JSON.stringify({ ...JSON.parse(payload), document_binary_url: 1 }) } },
    { name: 'invalid filename', data: { payload: JSON.stringify({ ...JSON.parse(payload), document_filename: 1 }) } },
    { name: 'invalid content type', data: { payload: JSON.stringify({ ...JSON.parse(payload), content_type: 1 }) } },
  ]) {
    test(`rejects ${invalid.name} without consuming the valid handoff`, () => {
      const receiver = bootstrap();
      receiver.send(invalid.data);
      expect(receiver.stored.size).toBe(0);
      expect(receiver.acknowledgements).toHaveLength(0);
      expect(receiver.cleanedUrls).toHaveLength(0);
      receiver.send();
      expect(receiver.stored.get('media-viewer-info')).toBe(payload);
    });
  }

  test('rejects a wrong origin or source', () => {
    const receiver = bootstrap();
    receiver.send({}, 'https://other.example');
    receiver.send({}, 'https://xui.example', {});
    expect(receiver.stored.size).toBe(0);
    expect(receiver.acknowledgements).toHaveLength(0);
    receiver.send();
    expect(receiver.stored.get('media-viewer-info')).toBe(payload);
  });

  test('rejects a null source after the opener is detached', () => {
    const receiver = bootstrap();
    receiver.window.opener = null;
    receiver.send({}, 'https://xui.example', null);
    expect(receiver.stored.size).toBe(0);
    expect(receiver.acknowledgements).toHaveLength(0);
  });

  for (const inactive of [
    { name: 'another route', path: '/cases', search: '?mvToken=handoff-token', opener: true },
    { name: 'missing token', path: '/media-viewer', search: '', opener: true },
    { name: 'empty token', path: '/media-viewer', search: '?mvToken=', opener: true },
    { name: 'missing opener', path: '/media-viewer', search: '?mvToken=handoff-token', opener: false },
  ]) {
    test(`does not register for ${inactive.name}`, () => {
      const receiver = bootstrap(inactive.path, inactive.search, inactive.opener);
      receiver.send();
      expect(receiver.window.__exuiTakeMediaViewerHandoff).toBeUndefined();
      expect(receiver.stored.size).toBe(0);
    });
  }

  test('does not acknowledge or consume when persistence fails', () => {
    const receiver = bootstrap();
    receiver.failStorage(true);
    receiver.send();
    expect(receiver.stored.size).toBe(0);
    expect(receiver.acknowledgements).toHaveLength(0);
    expect(receiver.cleanedUrls).toHaveLength(0);
    receiver.failStorage(false);
    receiver.send();
    expect(receiver.stored.get('media-viewer-info')).toBe(payload);
    expect(receiver.acknowledgements).toHaveLength(1);
  });
});
