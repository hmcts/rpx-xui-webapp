import { createHash } from 'node:crypto';
import * as fs from 'node:fs';

import { createLogger } from '@hmcts/playwright-common';
import type { BrowserContext } from '@playwright/test';
import { CookieUtils } from '../E2E/utils/cookie.utils.js';
import type { Cookie } from 'playwright-core';

import type { ApiSessionStorageState } from './apiSessionBootstrap.js';
import { StorageStateCorruptedError } from '../api/utils/errors';

const logger = createLogger({ serviceName: 'session-capture', format: 'pretty' });

const AUTH_COOKIE_MIN_REMAINING_SECONDS = 60;

export interface LoadedSession {
  userIdentifier?: string;
  email: string;
  cookies: Cookie[];
  storageFile: string;
  storageStateFingerprint?: string;
}

export type StorageStateContext = Pick<BrowserContext, 'addCookies' | 'storageState'>;

export type PersistSessionDeps = {
  cookieUtils?: CookieUtils;
  fs?: typeof fs;
  signal?: AbortSignal;
  assertLockOwned?: () => void;
};

type SessionStorageIdentity = {
  userIdentifier: string;
  email: string;
};
type SessionFreshnessDeps = { fs?: typeof fs; now?: () => number; targetUrl?: string; idamUrl?: string };

function parseCookieDomain(domain: string | undefined): { host: string; includesSubdomains: boolean } | null {
  const value = domain?.trim().toLowerCase();
  if (!value) return null;
  return { host: value.replace(/^\./, ''), includesSubdomains: value.startsWith('.') };
}

export function resolveTargetHost(targetUrl: string | undefined): string | null {
  if (!targetUrl?.trim()) return null;
  try {
    return new URL(targetUrl).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isCookieCompatibleWithHost(cookie: Cookie, targetHost: string): boolean {
  const cookieDomain = parseCookieDomain(cookie.domain);
  return Boolean(
    cookieDomain &&
    (targetHost === cookieDomain.host || (cookieDomain.includesSubdomains && targetHost.endsWith(`.${cookieDomain.host}`)))
  );
}

function isCookieUsable(cookie: Cookie, nowSeconds: number): boolean {
  return (
    typeof cookie.value === 'string' &&
    cookie.value.trim().length > 0 &&
    Number.isFinite(cookie.expires) &&
    (cookie.expires <= 0 || cookie.expires > nowSeconds + AUTH_COOKIE_MIN_REMAINING_SECONDS)
  );
}

export function hasReusableAuthCookies(
  cookies: Cookie[],
  targetUrl: string | undefined,
  idamUrl: string | undefined,
  nowSeconds = Math.floor(Date.now() / 1_000)
): boolean {
  const targetHost = resolveTargetHost(targetUrl);
  const idamHost = resolveTargetHost(idamUrl);
  const hasUsableCookie = (name: 'Idam.Session' | '__auth__', expectedHost: string | null) =>
    cookies.some(
      (cookie) =>
        cookie.name === name &&
        isCookieUsable(cookie, nowSeconds) &&
        (!expectedHost || isCookieCompatibleWithHost(cookie, expectedHost))
    );

  return hasUsableCookie('Idam.Session', idamHost) && hasUsableCookie('__auth__', targetHost);
}

export function storageStateFingerprint(contents: string): string {
  return createHash('sha256').update(contents).digest('hex');
}

export function readStorageStateFingerprint(fsApi: typeof fs, storageFile: string): string | undefined {
  try {
    return storageStateFingerprint(fsApi.readFileSync(storageFile, 'utf8'));
  } catch {
    return undefined;
  }
}

export function loadStoredSession(identity: SessionStorageIdentity, storageFile: string, fsApi: typeof fs = fs): LoadedSession {
  if (!fsApi.existsSync(storageFile)) {
    logger.warn('Storage file does not exist', {
      userIdentifier: identity.userIdentifier,
      storageFile,
      operation: 'load-session',
    });
    throw new StorageStateCorruptedError(`Failed parsing storage file for ${identity.userIdentifier}`, storageFile, {
      userIdentifier: identity.userIdentifier,
    });
  }

  try {
    const storageStateContents = fsApi.readFileSync(storageFile, 'utf8');
    const state: unknown = JSON.parse(storageStateContents);
    if (!state || typeof state !== 'object' || !Array.isArray((state as { cookies?: unknown }).cookies)) {
      throw new TypeError('Storage state must contain a cookies array');
    }
    const cookies = (state as { cookies: Cookie[] }).cookies;
    logger.info('Loaded session cookies', {
      userIdentifier: identity.userIdentifier,
      email: identity.email,
      cookieCount: cookies.length,
      operation: 'load-session',
    });
    return {
      userIdentifier: identity.userIdentifier,
      email: identity.email,
      cookies,
      storageFile,
      storageStateFingerprint: storageStateFingerprint(storageStateContents),
    };
  } catch (error) {
    logger.error('Failed parsing storage state', {
      userIdentifier: identity.userIdentifier,
      storageFile,
      error: (error as Error).message,
      operation: 'load-session',
    });
    throw new StorageStateCorruptedError(
      `Storage file corrupted for ${identity.userIdentifier}. A fresh session will replace it under the identity lock.`,
      storageFile,
      { userIdentifier: identity.userIdentifier },
      error as Error
    );
  }
}

export function isStoredSessionFresh(sessionPath: string, maxAgeMs: number, deps: SessionFreshnessDeps = {}): boolean {
  const fsApi = deps.fs ?? fs;
  const now = deps.now ?? Date.now;
  try {
    if (!fsApi.existsSync(sessionPath)) return false;
    if (now() - fsApi.statSync(sessionPath).mtimeMs >= maxAgeMs) return false;

    const state = JSON.parse(fsApi.readFileSync(sessionPath, 'utf8'));
    const cookies = Array.isArray(state.cookies) ? state.cookies : [];
    return cookies.length > 0 && hasReusableAuthCookies(cookies, deps.targetUrl, deps.idamUrl, Math.floor(now() / 1_000));
  } catch (error) {
    logger.warn('Failed to stat session file', {
      sessionPath,
      error: (error as Error).message,
      operation: 'check-session-freshness',
    });
    return false;
  }
}

export async function persistSession(
  localSessionPath: string,
  localCookies: Cookie[],
  context: StorageStateContext,
  userIdentifier: string,
  deps: PersistSessionDeps = {}
): Promise<void> {
  const cookieUtils = deps.cookieUtils ?? new CookieUtils();
  const fsApi = deps.fs ?? fs;
  const stagingPath = `${localSessionPath}.${process.pid}.${Date.now()}.tmp`;
  const assertNotAborted = () => {
    if (deps.signal?.aborted) {
      const error = new Error(`Session persistence aborted for ${userIdentifier}`);
      error.name = 'AbortError';
      throw error;
    }
  };

  try {
    assertNotAborted();
    cookieUtils.writeManageCasesSession(stagingPath, localCookies);
    assertNotAborted();
    const augmented = JSON.parse(fsApi.readFileSync(stagingPath, 'utf8')).cookies;
    await context.addCookies(augmented);
    assertNotAborted();
    await context.storageState({ path: stagingPath });
    assertNotAborted();
    deps.assertLockOwned?.();
    fsApi.renameSync(stagingPath, localSessionPath);
    logger.info('Stored storage state', {
      userIdentifier,
      sessionPath: localSessionPath,
      cookieCount: augmented.length,
      operation: 'persist-session',
    });
  } catch (error) {
    logger.error('Failed to persist storage state', {
      userIdentifier,
      sessionPath: localSessionPath,
      error: (error as Error).message,
      operation: 'persist-session',
    });
    throw error;
  } finally {
    if (fsApi.existsSync(stagingPath)) fsApi.rmSync(stagingPath, { force: true });
  }
}

export function persistApiSessionState(
  localSessionPath: string,
  storageState: ApiSessionStorageState,
  userIdentifier: string,
  fsApi: typeof fs,
  assertLockOwned: () => void
): void {
  const stagingPath = `${localSessionPath}.${process.pid}.${Date.now()}.api.tmp`;
  try {
    assertLockOwned();
    fsApi.writeFileSync(stagingPath, JSON.stringify(storageState), { encoding: 'utf8', mode: 0o600 });
    assertLockOwned();
    fsApi.renameSync(stagingPath, localSessionPath);
    logger.info('Stored API-bootstrapped storage state', {
      userIdentifier,
      sessionPath: localSessionPath,
      cookieCount: storageState.cookies.length,
      operation: 'persist-api-session',
    });
  } finally {
    if (fsApi.existsSync(stagingPath)) fsApi.rmSync(stagingPath, { force: true });
  }
}
