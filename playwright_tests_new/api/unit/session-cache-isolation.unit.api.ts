import fs, * as fsNamespace from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

import { __test__ as sessionCaptureTest, loadSessionCookies } from '../../common/sessionCapture.js';
import { resolveSessionStorageKey } from '../../common/sessionIdentity.js';
import { storageStateFingerprint } from '../../common/sessionStorageState.js';
import { StorageStateCorruptedError } from '../utils/errors.js';
import { createSessionCacheHarness, syntheticSessionIdentity, syntheticSessionState } from './session-cache.mock.js';

test.describe('account-bound session cache', { tag: '@svc-internal' }, () => {
  test.describe.configure({ mode: 'default' });
  let harness: ReturnType<typeof createSessionCacheHarness>;
  const accountA = syntheticSessionIdentity('a@example.test', 'shared-session', 'ACCOUNT_A');
  const accountB = syntheticSessionIdentity('b@example.test', 'shared-session', 'ACCOUNT_B');
  const aliasA = { ...syntheticSessionIdentity(' A@EXAMPLE.TEST ', ' shared-session ', 'ALIAS_A'), password: 'changed-dummy' };
  const sessionsDir = path.join(process.cwd(), '.sessions');
  const aKey = resolveSessionStorageKey(accountA);
  const bKey = resolveSessionStorageKey(accountB);
  const aFile = path.join(sessionsDir, `${aKey}.storage.json`);
  const bFile = path.join(sessionsDir, `${bKey}.storage.json`);
  const aLock = path.join(sessionsDir, `${aKey}.lock`);
  const bLock = path.join(sessionsDir, `${bKey}.lock`);
  const aMarker = path.join(sessionsDir, `${aKey}.capture-failed.json`);
  const bMarker = path.join(sessionsDir, `${bKey}.capture-failed.json`);

  test.beforeEach(() => {
    harness = createSessionCacheHarness();
  });
  test.afterEach(() => {
    harness.dispose();
  });

  test('public loading refuses to label A-only cookies as account B', () => {
    harness.files.set(aFile, syntheticSessionState('a-v1'));
    const loadedA = loadSessionCookies(accountA);
    expect(loadedA.cookies.map((cookie) => cookie.value)).toEqual(['a-v1', 'a-v1']);
    expect(() => loadSessionCookies(accountB)).toThrow(StorageStateCorruptedError);
  });

  test('public loading returns each account own state, path and content fingerprint', () => {
    const aState = syntheticSessionState('a-v1');
    const bState = syntheticSessionState('b-v1');
    harness.files.set(aFile, aState);
    harness.files.set(bFile, bState);
    const loadedA = loadSessionCookies(accountA);
    const loadedB = loadSessionCookies(accountB);

    expect(aFile).not.toBe(bFile);
    expect(loadedA).toMatchObject({
      email: accountA.email,
      storageFile: aFile,
      storageStateFingerprint: storageStateFingerprint(aState),
    });
    expect(loadedB).toMatchObject({
      email: accountB.email,
      storageFile: bFile,
      storageStateFingerprint: storageStateFingerprint(bState),
    });
    expect(loadedA.cookies.map((cookie) => cookie.value)).toEqual(['a-v1', 'a-v1']);
    expect(loadedB.cookies.map((cookie) => cookie.value)).toEqual(['b-v1', 'b-v1']);
    expect(loadedA.storageStateFingerprint).not.toBe(loadedB.storageStateFingerprint);
  });

  for (const [name, contents] of [
    ['missing', undefined],
    ['invalid JSON', '{'],
    ['non-array cookies', '{"cookies":{}}'],
  ] as const) {
    test(`public loading fails explicitly for ${name} state`, () => {
      if (contents !== undefined) harness.files.set(aFile, contents);
      expect(() => loadSessionCookies(accountA)).toThrow(StorageStateCorruptedError);
    });
  }

  test('public loading never falls back to the ambiguous legacy explicit-key filename', () => {
    harness.files.set(path.join(sessionsDir, 'shared-session-3509cd313e3f.storage.json'), syntheticSessionState('legacy'));
    expect(() => loadSessionCookies(accountA)).toThrow(StorageStateCorruptedError);
    expect(() => loadSessionCookies(accountB)).toThrow(StorageStateCorruptedError);
  });

  test('capture failure coordinates aliases while another account can capture independently', async () => {
    let loginCount = 0;
    const deps = {
      ...harness.captureDeps,
      loginAndPersistSession: async ({ sessionPath }: { sessionPath: string }) => {
        loginCount += 1;
        if (sessionPath === aFile) throw new Error('synthetic capture rejected');
        harness.captureDeps.fs!.writeFileSync(sessionPath, syntheticSessionState('b-v1'));
      },
    };
    await expect(sessionCaptureTest.sessionCaptureWith([accountA], deps)).rejects.toThrow('synthetic capture rejected');
    const marker = harness.files.get(aMarker);
    expect(JSON.parse(marker!)).toMatchObject({ message: 'synthetic capture rejected', retryable: false });
    await expect(sessionCaptureTest.sessionCaptureWith([aliasA], deps)).rejects.toThrow('Recent session capture failed');
    expect(loginCount).toBe(1);

    await sessionCaptureTest.sessionCaptureWith([accountB], deps);
    expect(loginCount).toBe(2);
    expect(harness.events.filter((event) => event.operation === 'lock').map((event) => event.path)).toEqual([aLock, bLock]);
    expect(aLock).not.toBe(bLock);
    expect(harness.files.get(aMarker)).toBe(marker);
    expect(harness.files.has(bMarker)).toBe(false);
    expect(loadSessionCookies(accountB).cookies.map((cookie) => cookie.value)).toEqual(['b-v1', 'b-v1']);
    expect(() => loadSessionCookies(accountA)).toThrow(StorageStateCorruptedError);
  });

  test('failures for separate accounts write separate markers under separate locks', async () => {
    const deps = {
      ...harness.captureDeps,
      loginAndPersistSession: async () => {
        throw new Error('synthetic capture rejected');
      },
    };
    for (const account of [accountA, accountB]) {
      await expect(sessionCaptureTest.sessionCaptureWith([account], deps)).rejects.toThrow('synthetic capture rejected');
    }
    expect(aMarker).not.toBe(bMarker);
    expect(
      harness.events
        .filter((event) => event.operation === 'write' && event.path.endsWith('.capture-failed.json'))
        .map((event) => event.path)
    ).toEqual([aMarker, bMarker]);
    expect(harness.events.filter((event) => event.operation === 'lock').map((event) => event.path)).toEqual([aLock, bLock]);
    expect(harness.files.has(aMarker)).toBe(true);
    expect(harness.files.has(bMarker)).toBe(true);
  });

  test('same-account alias reuses captured state through freshness and authenticated reuse checks', async () => {
    let loginCount = 0;
    const deps = {
      ...harness.captureDeps,
      loginAndPersistSession: async ({ sessionPath }: { sessionPath: string }) => {
        loginCount += 1;
        harness.captureDeps.fs!.writeFileSync(sessionPath, syntheticSessionState('a-v1'));
      },
    };
    await sessionCaptureTest.sessionCaptureWith([accountA], deps);
    await sessionCaptureTest.sessionCaptureWith([aliasA], deps);
    const loaded = loadSessionCookies(aliasA);
    expect(loaded.storageFile).toBe(aFile);
    expect(loaded.cookies.map((cookie) => cookie.value)).toEqual(['a-v1', 'a-v1']);
    let validated = false;
    await sessionCaptureTest.sessionCaptureWith([aliasA], {
      ...deps,
      isSessionFresh: (file, maxAgeMs, options) =>
        maxAgeMs === Number.MAX_SAFE_INTEGER && deps.isSessionFresh!(file, maxAgeMs, options),
      validateStoredSession: async (session) => {
        expect(session.storageFile).toBe(loaded.storageFile);
        expect(session.storageStateFingerprint).toBe(loaded.storageStateFingerprint);
        validated = true;
        return 'authenticated';
      },
    });
    expect(validated).toBe(true);
    expect(loginCount).toBe(1);
    expect(harness.events.filter((event) => event.operation === 'lock').map((event) => event.path)).toEqual([aLock]);
  });
});

test('synthetic cache restores public fs functions after a failing scenario', { tag: '@svc-internal' }, () => {
  const originalRead = fs.readFileSync;
  const originalExists = fs.existsSync;
  const harness = createSessionCacheHarness();
  expect(() => {
    try {
      loadSessionCookies(syntheticSessionIdentity('missing@example.test', 'missing'));
    } finally {
      harness.dispose();
    }
  }).toThrow(StorageStateCorruptedError);
  expect(fs.readFileSync).toBe(originalRead);
  expect(fs.existsSync).toBe(originalExists);
  expect(fsNamespace.readFileSync).toBe(originalRead);
  expect(fsNamespace.existsSync).toBe(originalExists);
});
