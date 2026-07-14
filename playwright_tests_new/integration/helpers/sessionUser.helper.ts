import type { Page } from '@playwright/test';
import { applySessionCookies } from '../../common/sessionCapture';
import type { SessionIdentityInput } from '../../common/sessionIdentity';
import { extractUserIdFromCookies } from '../utils/extractUserIdFromCookies';

type SessionCookieApplier = (
  page: Page,
  userIdentifier: SessionIdentityInput
) => Promise<{ cookies: Array<{ name: string; value: string }> }>;

type SessionUserOptions = {
  fallbackUserId?: string;
};

export async function resolveSessionUserId(
  page: Page,
  userIdentifier: SessionIdentityInput,
  applyCookies: SessionCookieApplier,
  options: SessionUserOptions = {}
): Promise<string> {
  const { cookies } = await applyCookies(page, userIdentifier);
  const userId = extractUserIdFromCookies(cookies);

  if (userId) {
    return userId;
  }

  if (options.fallbackUserId) {
    return options.fallbackUserId;
  }

  const identityLabel = typeof userIdentifier === 'string' ? userIdentifier : userIdentifier.userIdentifier;
  throw new Error(`Expected session for ${identityLabel} to include __userid__ cookie.`);
}

export async function applySessionCookiesAndExtractUserId(
  page: Page,
  userIdentifier: SessionIdentityInput,
  options: SessionUserOptions = {}
): Promise<string> {
  return resolveSessionUserId(page, userIdentifier, applySessionCookies, options);
}
