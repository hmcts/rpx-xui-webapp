import fs from 'node:fs';
import path from 'node:path';

import { IdamPage } from '@hmcts/playwright-common';
import { chromium, request, type BrowserContext, type Page } from '@playwright/test';

import config from './config.utils.js';
import { resolveUiStoragePathForUser } from './storage-state.utils.js';
import { UserUtils } from './user.utils.js';

type EnsureStorageOptions = {
  strict?: boolean;
  baseUrl?: string;
};

const resolveStorageTtlMs = (): number => {
  const raw = process.env.PW_UI_STORAGE_TTL_MIN;
  if (!raw) {
    return 15 * 60_000;
  }
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) {
    return 15 * 60_000;
  }
  return Math.max(0, parsed) * 60_000;
};

const resolveLoginTimeoutMs = (): number => {
  const raw = process.env.PW_UI_LOGIN_TIMEOUT_MS;
  if (!raw) {
    return 60_000;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? 60_000 : Math.max(5_000, parsed);
};

const hasRequiredAuthCookies = (cookies: { name: string }[]) => {
  const names = new Set(cookies.map((cookie) => cookie.name));
  return names.has('Idam.Session') && names.has('__auth__');
};

const hasExpiredAuthCookies = (cookies: { name: string; expires?: number }[]) => {
  const nowSeconds = Math.floor(Date.now() / 1000);
  return cookies.some((cookie) => {
    if (!['Idam.Session', '__auth__'].includes(cookie.name)) {
      return false;
    }
    if (!cookie.expires || cookie.expires <= 0) {
      return false;
    }
    return cookie.expires <= nowSeconds;
  });
};

const shouldRefreshStorageState = async (
  storagePath: string,
  baseUrl: string,
  options?: {
    ignoreTtl?: boolean;
    validateAuthenticatedState?: (storagePath: string, baseUrl: string) => Promise<boolean>;
  }
): Promise<boolean> => {
  if (!fs.existsSync(storagePath)) {
    return true;
  }

  try {
    const state = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
    const cookies = Array.isArray(state.cookies) ? state.cookies : [];
    if (!hasRequiredAuthCookies(cookies)) {
      return true;
    }
    if (hasExpiredAuthCookies(cookies)) {
      return true;
    }
  } catch {
    return true;
  }

  if (options?.ignoreTtl) {
    const stillAuthenticated = await (options.validateAuthenticatedState ?? isStorageStateAuthenticated)(storagePath, baseUrl);
    return !stillAuthenticated;
  }

  const ttlMs = resolveStorageTtlMs();
  if (ttlMs <= 0) {
    return true;
  }

  const ageMs = Date.now() - fs.statSync(storagePath).mtimeMs;
  if (ageMs <= ttlMs) {
    return false;
  }

  const stillAuthenticated = await isStorageStateAuthenticated(storagePath, baseUrl);
  return !stillAuthenticated;
};

const waitForIdamLogin = async (page: Page) => {
  const usernameInput = page.locator(
    'input#username, input[name="username"], input[type="email"], input#email, input[name="email"], input[name="emailAddress"], input[autocomplete="email"]'
  );
  const passwordInput = page.locator('input#password, input[name="password"], input[type="password"]');
  const submitButton = page.locator('[name="save"], button[type="submit"]');
  const appReady = page.locator('exui-header, exui-case-home');
  const timeoutMs = resolveLoginTimeoutMs();

  const outcome = await Promise.race([
    usernameInput
      .first()
      .waitFor({ state: 'visible', timeout: timeoutMs })
      .then(() => 'login'),
    appReady
      .first()
      .waitFor({ state: 'visible', timeout: timeoutMs })
      .then(() => 'app'),
  ]).catch(() => null);

  if (outcome === 'app') {
    return null;
  }

  if (outcome !== 'login') {
    throw new Error(`Login page did not render. URL=${page.url()}`);
  }

  return { usernameInput, passwordInput, submitButton };
};

const waitForAuthCookies = async (
  context: BrowserContext,
  timeoutMs = resolveLoginTimeoutMs()
): Promise<{ ok: boolean; reason?: string }> => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const cookies = await context.cookies();
    if (hasRequiredAuthCookies(cookies)) {
      return { ok: true };
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return { ok: false, reason: 'Required auth cookies were not observed before timeout' };
};

const isStorageStateAuthenticated = async (storagePath: string, baseUrl: string): Promise<boolean> => {
  const requestContext = await request.newContext({
    baseURL: baseUrl,
    storageState: storagePath,
    ignoreHTTPSErrors: true,
  });
  try {
    const response = await requestContext.get('/api/user/details', {
      failOnStatusCode: false,
    });
    return response.ok();
  } catch {
    return false;
  } finally {
    await requestContext.dispose();
  }
};

const closeContextSafely = async (context: BrowserContext): Promise<void> => {
  try {
    await context.close();
  } catch {
    // no-op
  }
};

export async function ensureUiStorageStateForUser(userIdentifier: string, options?: EnsureStorageOptions): Promise<string> {
  const storagePath = resolveUiStoragePathForUser(userIdentifier);
  const baseUrl =
    options?.baseUrl ?? config.urls.baseURL ?? config.urls.exuiDefaultUrl ?? 'https://manage-case.aat.platform.hmcts.net';
  const strict = options?.strict ?? false;

  const shouldRefresh = await shouldRefreshStorageState(storagePath, baseUrl, {
    ignoreTtl: strict,
  });
  if (!shouldRefresh) {
    return storagePath;
  }

  fs.mkdirSync(path.dirname(storagePath), { recursive: true });

  const userUtils = new UserUtils();
  const credentials = userUtils.getUserCredentials(userIdentifier);

  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  try {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    const loginLocators = await waitForIdamLogin(page);
    if (loginLocators) {
      await loginLocators.usernameInput.fill(credentials.email);
      await loginLocators.passwordInput.fill(credentials.password);
      await loginLocators.submitButton.first().click();
      const idamPage = new IdamPage(page);
      if (typeof (idamPage as unknown as { waitForSpinner?: () => Promise<void> }).waitForSpinner === 'function') {
        await (idamPage as unknown as { waitForSpinner: () => Promise<void> }).waitForSpinner();
      } else {
        await page.waitForLoadState('networkidle', { timeout: resolveLoginTimeoutMs() }).catch(() => undefined);
      }
    }

    const authCookies = await waitForAuthCookies(context);
    if (!authCookies.ok) {
      throw new Error(`UI login failed for ${userIdentifier}: ${authCookies.reason ?? 'unknown reason'}`);
    }

    await context.storageState({ path: storagePath });
  } finally {
    await closeContextSafely(context);
    await browser.close();
  }

  if (strict) {
    const authenticated = await isStorageStateAuthenticated(storagePath, baseUrl);
    if (!authenticated) {
      throw new Error(`Storage state validation failed for ${userIdentifier} at ${baseUrl}`);
    }
  }

  return storagePath;
}

export const __test__ = {
  shouldRefreshStorageState,
};
