import { test, type Page, type TestInfo } from '@playwright/test';
import { applySessionCookies } from '../../common/sessionCapture';
import type { SessionIdentityInput } from '../../common/sessionIdentity';
import { extractUserIdFromCookies } from '../utils/extractUserIdFromCookies';

type SessionCookieApplier = (
  page: Page,
  userIdentifier: SessionIdentityInput
) => Promise<{ userIdentifier?: string; cookies: Array<{ name: string; value: string }> }>;

type SessionUserOptions = {
  fallbackUserId?: string;
};

export async function resolveSessionUserId(
  page: Page,
  userIdentifier: SessionIdentityInput,
  applyCookies: SessionCookieApplier,
  options: SessionUserOptions = {},
  testInfo: Pick<TestInfo, 'annotations'> = test.info()
): Promise<string> {
  const { cookies, userIdentifier: selectedUserIdentifier } = await applyCookies(page, userIdentifier);
  const requestedUserIdentifier = typeof userIdentifier === 'string' ? userIdentifier : userIdentifier.userIdentifier;
  const hasSelectedUserAnnotation = testInfo.annotations.some(
    (annotation) => annotation.type === 'session-user' && annotation.description === selectedUserIdentifier
  );
  if (selectedUserIdentifier && selectedUserIdentifier !== requestedUserIdentifier && !hasSelectedUserAnnotation) {
    testInfo.annotations.push({ type: 'session-user', description: selectedUserIdentifier });
  }
  const userId = extractUserIdFromCookies(cookies);

  if (userId) {
    return userId;
  }

  if (options.fallbackUserId) {
    return options.fallbackUserId;
  }

  throw new Error(`Expected session for ${requestedUserIdentifier} to include __userid__ cookie.`);
}

export async function applySessionCookiesAndExtractUserId(
  page: Page,
  userIdentifier: SessionIdentityInput,
  options: SessionUserOptions = {}
): Promise<string> {
  return resolveSessionUserId(page, userIdentifier, applySessionCookies, options);
}
