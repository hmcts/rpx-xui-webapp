import { expect } from '@playwright/test';

export function assertUserInfoDetails(userInfo: Record<string, any>) {
  expect(userInfo).toEqual(
    expect.objectContaining({
      email: expect.any(String),
      roles: expect.arrayContaining([expect.any(String)]),
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

export function assertUiConfigResponse(data: Record<string, unknown>, expectedKeys: string[]) {
  expect(Object.keys(data)).toEqual(expect.arrayContaining(expectedKeys));
  expect(data.clientId).toBe('xuiwebapp');
  expect(data).toEqual(
    expect.objectContaining({
      protocol: expect.any(String),
      oAuthCallback: expect.any(String),
    })
  );
}

export function assertUserDetailsPayload(payload: Record<string, any>) {
  expect(payload).toEqual(
    expect.objectContaining({
      roleAssignmentInfo: expect.any(Array),
      canShareCases: expect.any(Boolean),
      sessionTimeout: expect.objectContaining({
        idleModalDisplayTime: expect.any(Number),
        pattern: expect.any(String),
      }),
    })
  );
}

export function assertUserDetailsKeys(payload: Record<string, any>, expected: Record<string, any>) {
  const expectedKeys = Object.keys(expected);
  expect(Object.keys(payload)).toEqual(expect.arrayContaining(expectedKeys));

  if (Array.isArray(payload.roleAssignmentInfo) && payload.roleAssignmentInfo.length > 0) {
    const expectedRoleKeys = Object.keys(expected.roleAssignmentInfo[0]);
    expect(Object.keys(payload.roleAssignmentInfo[0])).toEqual(expect.arrayContaining(expectedRoleKeys));
  }
}

export function assertSecurityHeaders(cacheControl?: string, xcto?: string) {
  if (cacheControl) {
    expect(cacheControl.toLowerCase()).toContain('no-store');
  }
  if (xcto) {
    expect(xcto.toLowerCase()).toBe('nosniff');
  }
}

export function resolveUserInfo(payload: Record<string, any> | undefined) {
  return payload?.userInfo ?? {};
}

export function shouldProcessUserDetails(status: number): boolean {
  return status === 200;
}

export function formatAttachmentBody(attachment: { body: unknown }) {
  return typeof attachment.body === 'string' ? attachment.body : JSON.stringify(attachment.body, null, 2);
}

export function resolveHeader(headers: Record<string, string>, key: string): string | undefined {
  const titleKey = key
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('-');
  return headers[key] || headers[key.toLowerCase()] || headers[titleKey] || headers[key.toUpperCase()];
}

export function buildExpiredCookies(state: any) {
  return Array.isArray(state.cookies) ? state.cookies.map((c: any) => ({ ...c, expires: 0 })) : [];
}

export async function applyExpiredCookies(ctx: { storageState: (opts: any) => Promise<void> }, cookies: any[]) {
  if (cookies.length) {
    await ctx.storageState({ cookies, origins: [] });
  }
}
