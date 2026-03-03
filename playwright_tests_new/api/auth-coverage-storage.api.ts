/**
 * @file auth-coverage-storage.api.ts
 * @description Coverage tests for auth storage state management (file operations, caching)
 * @security-note Tests storage mechanisms with temporary test files only
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';

import { test, expect } from '@playwright/test';

import { config } from '../common/apiTestConfig';
import { __test__ as authTest } from './utils/auth';

test.describe.configure({ mode: 'serial' });

const mockPassword = process.env.PW_MOCK_PASSWORD ?? String(Date.now());
const mockCredentials = { username: 'test-user', password: mockPassword };

test.describe('Auth helper coverage - storage operations', { tag: '@svc-auth' }, () => {
  test('tryReadState returns parsed state or undefined for invalid content', async () => {
    const tmpDir = path.join(process.cwd(), 'test-results', 'tmp-auth-state');
    await fs.mkdir(tmpDir, { recursive: true });

    const goodPath = path.join(tmpDir, 'good.json');
    await fs.writeFile(goodPath, JSON.stringify({ cookies: [] }), 'utf8');
    const good = await authTest.tryReadState(goodPath);
    expect(good).toEqual(expect.objectContaining({ cookies: [] }));

    const badPath = path.join(tmpDir, 'bad.json');
    await fs.writeFile(badPath, '{not-json', 'utf8');
    const bad = await authTest.tryReadState(badPath);
    expect(bad).toBeUndefined();

    const missing = await authTest.tryReadState(path.join(tmpDir, 'missing.json'));
    expect(missing).toBeUndefined();
  });

  test('ensureStorageStateWith caches and rebuilds when state missing', async () => {
    let createCalls = 0;
    const deps = {
      createStorageState: async () => {
        createCalls += 1;
        return createCalls === 1 ? 'state-1' : 'state-2';
      },
      tryReadState: async (path: string) => (path === 'state-2' ? { cookies: [] } : undefined),
      unlink: async () => {
        throw new Error('unlink failed');
      },
      lockfile: {
        lock: async () => async () => {}, // Mock lock that immediately returns release function
      },
    };

    const first = await authTest.ensureStorageStateWith('solicitor', deps as any);
    expect(first).toBe('state-1');
    const second = await authTest.ensureStorageStateWith('solicitor', deps as any);
    expect(second).toBe('state-2');
    expect(createCalls).toBe(2);
  });

  test('getStoredCookieWith rebuilds corrupted state and throws when still missing', async () => {
    let createCalls = 0;
    let readCalls = 0;
    const deps = {
      createStorageState: async () => {
        createCalls += 1;
        return `state-${createCalls}`;
      },
      tryReadState: async (path: string) => {
        void path;
        readCalls += 1;
        // First read: state missing, second read after create: return cookies
        if (readCalls >= 2) {
          return { cookies: [{ name: 'XSRF-TOKEN', value: 'token' }] };
        }
        return undefined;
      },
      unlink: async () => {},
      lockfile: {
        lock: async () => async () => {},
      },
    };

    const value = await authTest.getStoredCookieWith('solicitor', 'XSRF-TOKEN', deps as any);
    expect(value).toBe('token');

    const emptyDeps = {
      createStorageState: async () => 'state-1',
      tryReadState: async () => undefined,
      unlink: async () => {},
      lockfile: {
        lock: async () => async () => {},
      },
    };
    await expect(authTest.getStoredCookieWith('solicitor', 'XSRF-TOKEN', emptyDeps as any)).rejects.toThrow(
      'Unable to read storage state'
    );
  });

  test('createStorageStateWith honors token bootstrap and falls back to form login', async () => {
    const storageRoot = path.join(process.cwd(), 'test-results', 'auth-storage');
    const expectedStorageFile = `api-${config.testEnv}-solicitor.storage.json`;
    let formCalls = 0;
    const onForm = async () => {
      formCalls += 1;
    };
    const tokenSuccess = await authTest.createStorageStateWith('solicitor', {
      storageRoot,
      mkdir: async () => undefined,
      getCredentials: () => mockCredentials,
      isTokenBootstrapEnabled: () => true,
      tryTokenBootstrap: async () => true,
      createStorageStateViaForm: onForm,
    });
    expect(tokenSuccess).toContain(expectedStorageFile);
    expect(formCalls).toBe(0);

    const tokenFallback = await authTest.createStorageStateWith('solicitor', {
      storageRoot,
      mkdir: async () => undefined,
      getCredentials: () => mockCredentials,
      isTokenBootstrapEnabled: () => true,
      tryTokenBootstrap: async () => false,
      createStorageStateViaForm: onForm,
    });
    expect(tokenFallback).toContain(expectedStorageFile);
    expect(formCalls).toBe(1);
  });
});
