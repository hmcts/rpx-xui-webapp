import type { Page } from '@playwright/test';
import { applySessionCookies } from '../../common/sessionCapture';
import { extractUserIdFromCookies } from '../utils/extractUserIdFromCookies';

type SessionCookieApplier = (page: Page, userIdentifier: string) => Promise<{ cookies: Array<{ name: string; value: string }> }>;

type SessionUserOptions = {
  fallbackUserId?: string;
};

export async function resolveSessionUserId(
  page: Page,
  userIdentifier: string,
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

  throw new Error(`Expected session for ${userIdentifier} to include __userid__ cookie.`);
}

export async function applySessionCookiesAndExtractUserId(
  page: Page,
  userIdentifier: string,
  options: SessionUserOptions = {}
): Promise<string> {
  return resolveSessionUserId(page, userIdentifier, applySessionCookies, options);
}
