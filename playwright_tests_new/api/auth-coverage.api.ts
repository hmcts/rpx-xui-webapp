import { promises as fs } from 'node:fs';
import path from 'node:path';

import { test, expect } from '@playwright/test';

import { config } from '../common/apiTestConfig';
import { __test__ as authTest } from './auth';

type EnvMap = Record<string, string | undefined>;

async function withEnv(vars: EnvMap, fn: () => Promise<void> | void) {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(vars)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
  try {
    await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test.describe.configure({ mode: 'serial' });

test.describe('Auth helper coverage', () => {
  test('extractCsrf parses token and returns undefined when missing', () => {
    expect(authTest.extractCsrf('<input name="_csrf" value="token">')).toBe('token');
    expect(authTest.extractCsrf('<html></html>')).toBeUndefined();
  });

  test('stripTrailingSlash removes trailing slashes', () => {
    expect(authTest.stripTrailingSlash('https://example.com///')).toBe('https://example.com');
  });

  test('getCacheKey includes test environment', () => {
    expect(authTest.getCacheKey('solicitor')).toBe(`${config.testEnv}-solicitor`);
  });

  test('isTokenBootstrapEnabled respects env overrides', async () => {
    await withEnv(
      {
        API_AUTH_MODE: 'form',
        IDAM_SECRET: 'secret',
        IDAM_WEB_URL: 'https://idam',
        IDAM_TESTING_SUPPORT_URL: 'https://support',
        S2S_URL: 'https://s2s'
      },
      () => {
        expect(authTest.isTokenBootstrapEnabled()).toBe(false);
      }
    );

    await withEnv(
      {
        API_AUTH_MODE: 'token',
        IDAM_SECRET: undefined,
        IDAM_WEB_URL: undefined,
        IDAM_TESTING_SUPPORT_URL: undefined,
        S2S_URL: undefined
      },
      () => {
        expect(authTest.isTokenBootstrapEnabled()).toBe(true);
      }
    );

    await withEnv(
      {
        API_AUTH_MODE: undefined,
        IDAM_SECRET: undefined,
        IDAM_WEB_URL: undefined,
        IDAM_TESTING_SUPPORT_URL: undefined,
        S2S_URL: undefined
      },
      () => {
        expect(authTest.isTokenBootstrapEnabled()).toBe(false);
      }
    );

    await withEnv(
      {
        API_AUTH_MODE: undefined,
        IDAM_SECRET: 'secret',
        IDAM_WEB_URL: 'https://idam',
        IDAM_TESTING_SUPPORT_URL: 'https://support',
        S2S_URL: 'https://s2s'
      },
      () => {
        expect(authTest.isTokenBootstrapEnabled()).toBe(true);
      }
    );
  });

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
    const storagePromises = new Map<string, Promise<string>>();
    let createCalls = 0;
    const deps = {
      storagePromises,
      createStorageState: async () => {
        createCalls += 1;
        return createCalls === 1 ? 'state-1' : 'state-2';
      },
      tryReadState: async (path: string) => (path === 'state-2' ? { cookies: [] } : undefined),
      unlink: async () => {
        throw new Error('unlink failed');
      }
    };

    const first = await authTest.ensureStorageStateWith('solicitor', deps as any);
    expect(first).toBe('state-2');
    const second = await authTest.ensureStorageStateWith('solicitor', deps as any);
    expect(second).toBe('state-2');
    expect(createCalls).toBe(2);
  });

  test('getStoredCookieWith rebuilds corrupted state and throws when still missing', async () => {
    const storagePromises = new Map<string, Promise<string>>();
    let createCalls = 0;
    const deps = {
      storagePromises,
      createStorageState: async () => {
        createCalls += 1;
        return `state-${createCalls}`;
      },
      tryReadState: async (path: string) => {
        if (path === 'state-2') {
          return { cookies: [{ name: 'XSRF-TOKEN', value: 'token' }] };
        }
        return undefined;
      },
      unlink: async () => {}
    };

    const value = await authTest.getStoredCookieWith('solicitor', 'XSRF-TOKEN', deps as any);
    expect(value).toBe('token');

    const emptyDeps = {
      storagePromises: new Map<string, Promise<string>>(),
      createStorageState: async () => 'state-1',
      tryReadState: async () => undefined,
      unlink: async () => {}
    };
    await expect(authTest.getStoredCookieWith('solicitor', 'XSRF-TOKEN', emptyDeps as any)).rejects.toThrow(
      'Unable to read storage state'
    );
  });

  test('createStorageStateWith honors token bootstrap and falls back to form login', async () => {
    const storageRoot = path.join(process.cwd(), 'test-results', 'auth-storage');
    let formCalls = 0;
    const onForm = () => {
      formCalls += 1;
    };
    const tokenSuccess = await authTest.createStorageStateWith('solicitor', {
      storageRoot,
      mkdir: async () => {},
      getCredentials: () => ({ username: 'user', password: 'pass' }),
      isTokenBootstrapEnabled: () => true,
      tryTokenBootstrap: async () => true,
      createStorageStateViaForm: onForm
    });
    expect(tokenSuccess).toContain(path.join(config.testEnv, 'solicitor.json'));
    expect(formCalls).toBe(0);

    const tokenFallback = await authTest.createStorageStateWith('solicitor', {
      storageRoot,
      mkdir: async () => {},
      getCredentials: () => ({ username: 'user', password: 'pass' }),
      isTokenBootstrapEnabled: () => true,
      tryTokenBootstrap: async () => false,
      createStorageStateViaForm: onForm
    });
    expect(tokenFallback).toContain(path.join(config.testEnv, 'solicitor.json'));
    expect(formCalls).toBe(1);
  });

  test('createStorageStateViaForm handles csrf and login errors', async () => {
    const createContext = (loginStatus: number, postStatus: number, html: string) => {
      const loginPage = {
        status: () => loginStatus,
        url: () => 'https://example.test/login',
        text: async () => html
      };
      return {
        get: async (url: string) => {
          if (url === 'auth/login') {
            return loginPage;
          }
          return { status: () => 200 };
        },
        post: async () => ({ status: () => postStatus }),
        storageState: async () => {},
        dispose: async () => {}
      };
    };

    await expect(
      authTest.createStorageStateViaForm(
        { username: 'user', password: 'pass' },
        'state.json',
        'solicitor',
        { requestFactory: async () => createContext(400, 200, '') as any }
      )
    ).rejects.toThrow('GET /auth/login');

    await expect(
      authTest.createStorageStateViaForm(
        { username: 'user', password: 'pass' },
        'state.json',
        'solicitor',
        { requestFactory: async () => createContext(200, 401, '') as any }
      )
    ).rejects.toThrow('POST https://example.test/login');

    await authTest.createStorageStateViaForm(
      { username: 'user', password: 'pass' },
      'state.json',
      'solicitor',
      { requestFactory: async () => createContext(200, 200, '<input name="_csrf" value="token">') as any }
    );

    await authTest.createStorageStateViaForm(
      { username: 'user', password: 'pass' },
      'state.json',
      'solicitor',
      { requestFactory: async () => createContext(200, 200, '<html></html>') as any }
    );
  });

  test('tryTokenBootstrap covers env and response branches', async () => {
    const warnCalls: string[] = [];
    const logger = { warn: (message: string) => warnCalls.push(message) } as any;

    const missingEnv = await authTest.tryTokenBootstrap(
      'solicitor',
      { username: 'user', password: 'pass' },
      'state.json',
      { env: {} as NodeJS.ProcessEnv }
    );
    expect(missingEnv).toBe(false);

    const context = {
      get: async (url: string) => {
        if (url.includes('isAuthenticated')) {
          return { status: () => 200, json: async () => true };
        }
        return { status: () => 200 };
      },
      storageState: async () => {},
      dispose: async () => {}
    };

    const success = await authTest.tryTokenBootstrap(
      'solicitor',
      { username: 'user', password: 'pass' },
      'state.json',
      {
        env: {
          IDAM_SECRET: 'secret',
          IDAM_WEB_URL: 'https://idam',
          IDAM_TESTING_SUPPORT_URL: 'https://support',
          S2S_URL: 'https://s2s'
        } as NodeJS.ProcessEnv,
        idamUtils: { generateIdamToken: async () => 'token' },
        serviceAuthUtils: { retrieveToken: async () => 'service-token' },
        requestFactory: async () => context as any,
        logger,
        readState: async () => ({ cookies: [{ name: 'a' }] })
      }
    );
    expect(success).toBe(true);

    const authFailContext = {
      get: async () => ({ status: () => 401, json: async () => true }),
      storageState: async () => {},
      dispose: async () => {}
    };
    const failure = await authTest.tryTokenBootstrap(
      'solicitor',
      { username: 'user', password: 'pass' },
      'state.json',
      {
        env: {
          IDAM_SECRET: 'secret',
          IDAM_WEB_URL: 'https://idam',
          IDAM_TESTING_SUPPORT_URL: 'https://support',
          S2S_URL: 'https://s2s'
        } as NodeJS.ProcessEnv,
        idamUtils: { generateIdamToken: async () => 'token' },
        serviceAuthUtils: { retrieveToken: async () => 'service-token' },
        requestFactory: async () => authFailContext as any,
        logger,
        readState: async () => ({ cookies: [{ name: 'a' }] })
      }
    );
    expect(failure).toBe(false);
    expect(warnCalls.length).toBeGreaterThan(0);
  });

  test('tryTokenBootstrap logs and returns false on request failures', async () => {
    const warnCalls: string[] = [];
    const logger = { warn: (message: string) => warnCalls.push(message) } as any;
    const result = await authTest.tryTokenBootstrap(
      'solicitor',
      { username: 'user', password: 'pass' },
      'state.json',
      {
        env: {
          IDAM_SECRET: 'secret',
          IDAM_WEB_URL: 'https://idam',
          IDAM_TESTING_SUPPORT_URL: 'https://support',
          S2S_URL: 'https://s2s'
        } as NodeJS.ProcessEnv,
        idamUtils: { generateIdamToken: async () => 'token' },
        serviceAuthUtils: { retrieveToken: async () => 'service-token' },
        requestFactory: async () => {
          throw new Error('boom');
        },
        logger
      }
    );
    expect(result).toBe(false);
    expect(warnCalls.some((message) => message.includes('Token bootstrap failed'))).toBe(true);
  });

  test('getCredentials returns configured users and errors on unknown roles', () => {
    const creds = authTest.getCredentials('solicitor');
    expect(creds.username).toContain('@');
    expect(creds.password).toBeTruthy();
    expect(() => authTest.getCredentials('unknown' as any)).toThrow('No credentials configured');
  });
});
