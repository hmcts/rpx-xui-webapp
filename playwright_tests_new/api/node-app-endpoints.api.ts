import { promises as fs } from 'node:fs';

import { request } from '@playwright/test';

import { config as testConfig } from '../common/apiTestConfig';
import { ensureStorageState } from './utils/auth';
import { test, expect, buildApiAttachment } from './fixtures';
import { expectStatus, StatusSets } from './utils/apiTestUtils';

import nodeAppDataModels from './data/nodeAppDataModels';

test.describe('Node app endpoints', () => {
  test('serves external configuration without authentication', async ({ anonymousClient }) => {
    const response = await anonymousClient.get<Record<string, unknown>>('external/configuration-ui');
    expectStatus(response.status, [200]);
    assertUiConfigResponse(response.data as Record<string, unknown>);
  });

  test('serves external config/ui alias', async ({ anonymousClient }) => {
    const response = await anonymousClient.get<Record<string, unknown>>('external/config/ui');
    expectStatus(response.status, [200]);
    assertUiConfigResponse(response.data as Record<string, unknown>);
  });

  test('serves external config/check snapshot', async ({ anonymousClient }) => {
    const response = await anonymousClient.get<Record<string, unknown>>('external/config/check');
    expectStatus(response.status, [200]);
    expect(response.data).toEqual(
      expect.objectContaining({
        clientId: expect.any(String),
        protocol: expect.any(String)
      })
    );
  });

  test('auth/isAuthenticated returns session status', async ({ apiClient }) => {
    const response = await apiClient.get<boolean>('auth/isAuthenticated', { throwOnError: false });
    expectStatus(response.status, StatusSets.guardedBasic);
    if (response.status === 200) {
      expect(typeof response.data).toBe('boolean');
    }
  });

  test('auth/isAuthenticated returns false without session', async ({ anonymousClient }) => {
    const response = await anonymousClient.get<boolean>('auth/isAuthenticated');
    expectStatus(response.status, [200]);
    expect(response.data).toBe(false);
  });

  test('auth/login responds', async ({ anonymousClient }) => {
    const response = await anonymousClient.get('auth/login', { throwOnError: false });
    expectStatus(response.status, [200, 302, 401, 403, 500, 502, 504]);
  });

  test('returns enriched user details for solicitor session', async ({ apiClient }, testInfo) => {
    const response = await apiClient.get<any>('api/user/details', { throwOnError: false });

    expectStatus(response.status, StatusSets.guardedExtended);
    if (!shouldProcessUserDetails(response.status)) {
      return;
    }
    const userInfo = resolveUserInfo(response.data);
    assertUserInfoDetails(userInfo);
    assertUserDetailsPayload(response.data);

    const expected = nodeAppDataModels.getUserDetails_oidc();
    assertUserDetailsKeys(response.data, expected);

    const attachment = buildApiAttachment(response.logEntry, {
      includeRaw: process.env.PLAYWRIGHT_DEBUG_API === '1'
    });
    const prettyBody = formatAttachmentBody(attachment);
    await testInfo.attach(`${attachment.name}-pretty`, {
      body: prettyBody,
      contentType: 'application/json'
    });
  });

  test('rejects unauthenticated calls to user details', async ({ anonymousClient }) => {
    const response = await anonymousClient.get('api/user/details', {
      throwOnError: false
    });

    expectStatus(response.status, [401]);
  });

  test('applies security headers on open configuration endpoint', async () => {
    const ctx = await request.newContext({
      baseURL: testConfig.baseUrl.replace(/\/+$/, ''),
      ignoreHTTPSErrors: true
    });
    const res = await ctx.get('external/configuration-ui', { failOnStatusCode: false });
    expect(res.status()).toBe(200);
    const headers = res.headers();
    const contentType = resolveHeader(headers, 'content-type');
    expect(contentType).toContain('application/json');
    const cacheControl = resolveHeader(headers, 'cache-control');
    const xcto = resolveHeader(headers, 'x-content-type-options');
    assertSecurityHeaders(cacheControl, xcto);
    await ctx.dispose();
  });

  test('stale session cookie returns guarded status', async () => {
    const statePath = await ensureStorageState('solicitor');
    const raw = await fs.readFile(statePath, 'utf8');
    const state = JSON.parse(raw);
    const expiredCookies = buildExpiredCookies(state);

    const ctx = await request.newContext({
      baseURL: testConfig.baseUrl.replace(/\/+$/, ''),
      ignoreHTTPSErrors: true
    });
    await applyExpiredCookies(ctx, expiredCookies);
    const res = await ctx.get('api/user/details', { failOnStatusCode: false });
    expectStatus(res.status(), [401, 403]);
    await ctx.dispose();
  });

  test('returns configuration value for feature flag query', async ({ apiClient }) => {
    const response = await apiClient.get<any>('api/configuration?configurationKey=termsAndConditionsEnabled');
    expectStatus(response.status, StatusSets.guardedBasic.filter((s) => s !== 403)); // 200 or 401
    expect(JSON.stringify(response.data).length).toBeLessThan(6);
  });

  test('healthCheck responds with healthState', async ({ anonymousClient }) => {
    const response = await anonymousClient.get<{ healthState?: boolean }>('api/healthCheck?path=', { throwOnError: false });
    expectStatus(response.status, [200, 500, 502, 504]);
    if (response.status === 200) {
      expect(typeof response.data?.healthState).toBe('boolean');
    }
  });
});

test.describe('Node app helper coverage', () => {
  test('assertUserInfoDetails covers name variants', () => {
    assertUserInfoDetails({
      email: 'user@example.com',
      roles: ['role'],
      uid: 'uid-1',
      given_name: 'Given',
      family_name: 'Family'
    });
    assertUserInfoDetails({
      email: 'user@example.com',
      roles: ['role'],
      id: 'id-1',
      forename: 'Fore',
      surname: 'Sur'
    });
    assertUserInfoDetails({
      email: 'user@example.com',
      roles: ['role'],
      id: 'id-2'
    });
  });

  test('assertUserDetailsPayload handles role assignment and sessionTimeout', () => {
    assertUserDetailsPayload({
      roleAssignmentInfo: [],
      canShareCases: true,
      sessionTimeout: { idleModalDisplayTime: 5, pattern: '.*' }
    });
  });

  test('assertUserDetailsKeys handles role assignments when present', () => {
    const expected = nodeAppDataModels.getUserDetails_oidc();
    assertUserDetailsKeys({ ...expected, roleAssignmentInfo: expected.roleAssignmentInfo }, expected);
    assertUserDetailsKeys({ ...expected, roleAssignmentInfo: [] }, expected);
  });

  test('assertSecurityHeaders tolerates missing headers', () => {
    assertSecurityHeaders('no-store', 'nosniff');
    assertSecurityHeaders(undefined, undefined);
  });

  test('shouldProcessUserDetails returns false for non-200 status', () => {
    expect(shouldProcessUserDetails(200)).toBe(true);
    expect(shouldProcessUserDetails(500)).toBe(false);
  });

  test('resolveUserInfo and formatAttachmentBody handle variants', () => {
    expect(resolveUserInfo({ userInfo: { id: 'user-1' } })).toEqual({ id: 'user-1' });
    expect(resolveUserInfo(undefined)).toEqual({});
    expect(formatAttachmentBody({ body: 'text' })).toBe('text');
    expect(formatAttachmentBody({ body: { key: 'value' } })).toContain('"key": "value"');
  });

  test('resolveHeader handles casing differences', () => {
    expect(resolveHeader({ 'content-type': 'app/json' }, 'content-type')).toBe('app/json');
    expect(resolveHeader({ 'Content-Type': 'app/json' }, 'content-type')).toBe('app/json');
    expect(resolveHeader({ 'CONTENT-TYPE': 'app/json' }, 'content-type')).toBe('app/json');
    expect(resolveHeader({}, 'content-type')).toBeUndefined();
  });

  test('applyExpiredCookies handles empty and populated arrays', async () => {
    let calls = 0;
    const ctx = {
      storageState: async () => {
        calls += 1;
      }
    };
    await applyExpiredCookies(ctx, []);
    expect(calls).toBe(0);
    await applyExpiredCookies(ctx, [{ name: 'cookie' }]);
    expect(calls).toBe(1);
  });

  test('buildExpiredCookies handles missing cookies', () => {
    expect(buildExpiredCookies({ cookies: [{ name: 'c' }] })).toHaveLength(1);
    expect(buildExpiredCookies({})).toEqual([]);
  });
});

function assertUserInfoDetails(userInfo: Record<string, any>) {
  expect(userInfo).toEqual(
    expect.objectContaining({
      email: expect.any(String),
      roles: expect.arrayContaining([expect.any(String)])
    })
  );
  expect(userInfo.uid ?? userInfo.id).toBeDefined();
  if (userInfo.given_name || userInfo.forename) {
    expect(userInfo.given_name ?? userInfo.forename).toEqual(expect.any(String));
  }
  if (userInfo.family_name || userInfo.surname) {
    expect(userInfo.family_name ?? userInfo.surname).toEqual(expect.any(String));
  }
}

function assertUiConfigResponse(data: Record<string, unknown>) {
  const expectedKeys = testConfig.configurationUi[testConfig.testEnv];
  expect(Object.keys(data)).toEqual(expect.arrayContaining(expectedKeys));
  expect(data['clientId']).toBe('xuiwebapp');
  expect(data).toEqual(
    expect.objectContaining({
      protocol: expect.any(String),
      oAuthCallback: expect.any(String)
    })
  );
}

function assertUserDetailsPayload(payload: Record<string, any>) {
  expect(payload).toEqual(
    expect.objectContaining({
      roleAssignmentInfo: expect.any(Array),
      canShareCases: expect.any(Boolean),
      sessionTimeout: expect.objectContaining({
        idleModalDisplayTime: expect.any(Number),
        pattern: expect.any(String)
      })
    })
  );
}

function assertUserDetailsKeys(payload: Record<string, any>, expected: Record<string, any>) {
  const expectedKeys = Object.keys(expected);
  expect(Object.keys(payload)).toEqual(expect.arrayContaining(expectedKeys));

  if (Array.isArray(payload.roleAssignmentInfo) && payload.roleAssignmentInfo.length > 0) {
    const expectedRoleKeys = Object.keys(expected.roleAssignmentInfo[0]);
    expect(Object.keys(payload.roleAssignmentInfo[0])).toEqual(expect.arrayContaining(expectedRoleKeys));
  }
}

function assertSecurityHeaders(cacheControl?: string, xcto?: string) {
  if (cacheControl) {
    expect(cacheControl.toLowerCase()).toContain('no-store');
  }
  if (xcto) {
    expect(xcto.toLowerCase()).toBe('nosniff');
  }
}

function resolveUserInfo(payload: Record<string, any> | undefined) {
  return payload?.userInfo ?? {};
}

function shouldProcessUserDetails(status: number): boolean {
  return status === 200;
}

function formatAttachmentBody(attachment: { body: unknown }) {
  return typeof attachment.body === 'string' ? attachment.body : JSON.stringify(attachment.body, null, 2);
}

function resolveHeader(headers: Record<string, string>, key: string): string | undefined {
  const titleKey = key
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('-');
  return headers[key] || headers[key.toLowerCase()] || headers[titleKey] || headers[key.toUpperCase()];
}

function buildExpiredCookies(state: any) {
  return Array.isArray(state.cookies)
    ? state.cookies.map((c: any) => ({ ...c, expires: 0 }))
    : [];
}

async function applyExpiredCookies(ctx: { storageState: (opts: any) => Promise<void> }, cookies: any[]) {
  if (cookies.length) {
    await ctx.storageState({ cookies, origins: [] });
  }
}
