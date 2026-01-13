/**
 * @file auth-coverage-bootstrap.api.ts
 * @description Coverage tests for auth token bootstrap flows (IDAM/S2S integration)
 * @hmcts-audit-metadata {
 *   "agent_name": "HMCTS-AI-Assistant",
 *   "version": "1.0",
 *   "audit_reference": "EXUI-4031",
 *   "reviewer": "pending",
 *   "security_review": "required",
 *   "last_audit": "2026-01-12"
 * }
 * @security-note All auth flows use MOCKED credentials only. No real secrets.
 */

import { test, expect } from '@playwright/test';

import { __test__ as authTest } from './utils/auth';
import { withEnv } from './utils/testEnv';

type AuthEnvironmentKey =
  | 'API_AUTH_MODE'
  | 'IDAM_SECRET'
  | 'IDAM_WEB_URL'
  | 'IDAM_TESTING_SUPPORT_URL'
  | 'S2S_URL';

type AuthEnvironmentConfig = Partial<Record<AuthEnvironmentKey, string>>;

test.describe.configure({ mode: 'serial' });

test.describe('Auth helper coverage - token bootstrap', () => {
  test('isTokenBootstrapEnabled respects env overrides', async () => {
    // SECURITY: Use non-sensitive mock values only - no real secrets in tests
    const mockAuthEnv: AuthEnvironmentConfig = {
      API_AUTH_MODE: 'form',
      IDAM_SECRET: 'MOCK_SECRET_FOR_TESTING',
      IDAM_WEB_URL: 'https://mock-idam.test',
      IDAM_TESTING_SUPPORT_URL: 'https://mock-support.test',
      S2S_URL: 'https://mock-s2s.test'
    };

    await withEnv(mockAuthEnv, () => {
      expect(authTest.isTokenBootstrapEnabled()).toBe(false);
    });

    await withEnv(
      { API_AUTH_MODE: 'token', ...Object.fromEntries(Object.keys(mockAuthEnv).filter(k => k !== 'API_AUTH_MODE').map(k => [k, undefined])) },
      () => {
        expect(authTest.isTokenBootstrapEnabled()).toBe(true);
      }
    );

    await withEnv(
      Object.fromEntries(Object.keys(mockAuthEnv).map(k => [k, undefined])),
      () => {
        expect(authTest.isTokenBootstrapEnabled()).toBe(false);
      }
    );

    await withEnv(
      { ...mockAuthEnv, API_AUTH_MODE: undefined },
      () => {
        expect(authTest.isTokenBootstrapEnabled()).toBe(true);
      }
    );
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
        { username: 'test-user', password: 'mock-pass' },
        'state.json',
        'solicitor',
        { requestFactory: async () => createContext(400, 200, '') as any }
      )
    ).rejects.toThrow('GET /auth/login');

    await expect(
      authTest.createStorageStateViaForm(
        { username: 'test-user', password: 'mock-pass' },
        'state.json',
        'solicitor',
        { requestFactory: async () => createContext(200, 401, '') as any }
      )
    ).rejects.toThrow('POST https://example.test/login');

    await authTest.createStorageStateViaForm(
      { username: 'test-user', password: 'mock-pass' },
      'state.json',
      'solicitor',
      { requestFactory: async () => createContext(200, 200, '<input name="_csrf" value="token">') as any }
    );

    await authTest.createStorageStateViaForm(
      { username: 'test-user', password: 'mock-pass' },
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
      { username: 'test-user', password: 'mock-pass' },
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

    // SECURITY: Mock credentials only - never use real secrets in test code
    const mockEnv = {
      IDAM_SECRET: 'MOCK_TEST_SECRET',
      IDAM_WEB_URL: 'https://mock-idam.test',
      IDAM_TESTING_SUPPORT_URL: 'https://mock-support.test',
      S2S_URL: 'https://mock-s2s.test'
    } as NodeJS.ProcessEnv;

    const success = await authTest.tryTokenBootstrap(
      'solicitor',
      { username: 'test-user', password: 'mock-pass' },
      'state.json',
      {
        env: mockEnv,
        idamUtils: { generateIdamToken: async () => 'mock-token' },
        serviceAuthUtils: { retrieveToken: async () => 'mock-service-token' },
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
      { username: 'test-user', password: 'mock-pass' },
      'state.json',
      {
        env: mockEnv,
        idamUtils: { generateIdamToken: async () => 'mock-token' },
        serviceAuthUtils: { retrieveToken: async () => 'mock-service-token' },
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
    
    // SECURITY: Mock environment - no real secrets
    const mockEnv = {
      IDAM_SECRET: 'MOCK_TEST_SECRET',
      IDAM_WEB_URL: 'https://mock-idam.test',
      IDAM_TESTING_SUPPORT_URL: 'https://mock-support.test',
      S2S_URL: 'https://mock-s2s.test'
    } as NodeJS.ProcessEnv;

    const result = await authTest.tryTokenBootstrap(
      'solicitor',
      { username: 'test-user', password: 'mock-pass' },
      'state.json',
      {
        env: mockEnv,
        idamUtils: { generateIdamToken: async () => 'mock-token' },
        serviceAuthUtils: { retrieveToken: async () => 'mock-service-token' },
        requestFactory: async () => {
          throw new Error('boom');
        },
        logger
      }
    );
    expect(result).toBe(false);
    expect(warnCalls.some((message) => message.includes('Token bootstrap failed'))).toBe(true);
  });
});
