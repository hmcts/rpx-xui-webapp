import type { Page, TestInfo } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as lockfile from 'proper-lockfile';
import type { SessionIdentityInput } from '../../common/sessionIdentity';
import { applySessionCookies } from '../../common/sessionCapture';
import config from '../../E2E/utils/config.utils';

type SolicitorCredentialMapping = {
  userIdentifier: string;
  usernameEnv: string;
  passwordEnv: string;
};

const defaultWelshLanguageSessionMappings: readonly SolicitorCredentialMapping[] = [
  { userIdentifier: 'SOLICITOR', usernameEnv: 'SOLICITOR_USERNAME', passwordEnv: 'SOLICITOR_PASSWORD' },
  { userIdentifier: 'PRL_SOLICITOR', usernameEnv: 'PRL_SOLICITOR_USERNAME', passwordEnv: 'PRL_SOLICITOR_PASSWORD' },
  { userIdentifier: 'WA_SOLICITOR', usernameEnv: 'WA_SOLICITOR_USERNAME', passwordEnv: 'WA_SOLICITOR_PASSWORD' },
  { userIdentifier: 'NOC_SOLICITOR', usernameEnv: 'NOC_SOLICITOR_USERNAME', passwordEnv: 'NOC_SOLICITOR_PASSWORD' },
] as const;
const WELSH_LANGUAGE_LEASE_ROOT = path.join(process.cwd(), '.sessions', 'welsh-language-leases');
const WELSH_LANGUAGE_LEASE_STALE_MS = 5 * 60 * 1000;
const WELSH_LANGUAGE_LEASE_RETRY_MS = 1_000;
const WELSH_LANGUAGE_LEASE_MAX_WAIT_MS = 2 * 60 * 1000;

export type WelshLanguageSessionLease = {
  release: () => Promise<void>;
  userIdentifier: SessionIdentityInput;
};

function parseUserList(rawValue?: string): string[] {
  return Array.from(
    new Set(
      (rawValue ?? '')
        .split(',')
        .map((value) => value.trim().toUpperCase())
        .filter(Boolean)
    )
  );
}

function buildConfiguredIdentity(mapping: SolicitorCredentialMapping, env: NodeJS.ProcessEnv): SessionIdentityInput | undefined {
  const email = env[mapping.usernameEnv]?.trim();
  const password = env[mapping.passwordEnv];

  if (!email || !password) {
    return undefined;
  }

  return {
    userIdentifier: mapping.userIdentifier,
    email,
    password,
  };
}

function ensureDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getWelshLanguageLeaseKey(userIdentifier: SessionIdentityInput): string {
  const identityKey =
    typeof userIdentifier === 'string' ? userIdentifier : userIdentifier.email ?? userIdentifier.userIdentifier;
  return identityKey.toLowerCase().replace(/[^a-z0-9._-]+/g, '_');
}

async function acquireWelshLanguageLease(userIdentifier: SessionIdentityInput): Promise<() => Promise<void>> {
  ensureDirectory(WELSH_LANGUAGE_LEASE_ROOT);
  const leaseFilePath = path.join(WELSH_LANGUAGE_LEASE_ROOT, `${getWelshLanguageLeaseKey(userIdentifier)}.lock`);
  if (!fs.existsSync(leaseFilePath)) {
    fs.writeFileSync(leaseFilePath, '', 'utf8');
  }

  const startedAt = Date.now();

  while (true) {
    try {
      return await lockfile.lock(leaseFilePath, {
        retries: 0,
        stale: WELSH_LANGUAGE_LEASE_STALE_MS,
      });
    } catch (error) {
      const candidate = error as { code?: string; message?: string };
      const lockHeld =
        candidate?.code === 'ELOCKED' ||
        candidate?.message?.includes('already being held') === true ||
        candidate?.message?.includes('Lock file is already being held') === true;

      if (!lockHeld) {
        throw error;
      }

      const elapsedMs = Date.now() - startedAt;
      if (elapsedMs >= WELSH_LANGUAGE_LEASE_MAX_WAIT_MS) {
        throw new Error(`Timed out waiting for Welsh language session lease after ${elapsedMs}ms (${leaseFilePath})`);
      }

      await new Promise<void>((resolve) =>
        setTimeout(resolve, Math.min(WELSH_LANGUAGE_LEASE_RETRY_MS, WELSH_LANGUAGE_LEASE_MAX_WAIT_MS - elapsedMs))
      );
    }
  }
}

export function resolveWelshLanguageSessionUsers(env: NodeJS.ProcessEnv = process.env): SessionIdentityInput[] {
  const configuredUserFilter = parseUserList(env.PW_WELSH_LANGUAGE_SESSION_USERS);
  const mappings = defaultWelshLanguageSessionMappings.filter((mapping) => {
    return configuredUserFilter.length === 0 || configuredUserFilter.includes(mapping.userIdentifier);
  });

  const resolved = mappings
    .map((mapping) => buildConfiguredIdentity(mapping, env))
    .filter((identity): identity is Exclude<SessionIdentityInput, string> => Boolean(identity));

  const seenEmails = new Set<string>();
  const uniqueByEmail = resolved.filter((identity) => {
    const normalizedEmail = identity.email.toLowerCase();
    if (seenEmails.has(normalizedEmail)) {
      return false;
    }

    seenEmails.add(normalizedEmail);
    return true;
  });
  return uniqueByEmail.length > 0 ? uniqueByEmail : ['SOLICITOR'];
}

export function resolveWelshLanguageSessionUser(
  testInfo: Pick<TestInfo, 'workerIndex'>,
  env: NodeJS.ProcessEnv = process.env
): SessionIdentityInput {
  const users = resolveWelshLanguageSessionUsers(env);
  return users[testInfo.workerIndex % users.length];
}

export async function setupWelshLanguageSession(
  page: Page,
  testInfo: Pick<TestInfo, 'workerIndex' | 'annotations'>,
  env: NodeJS.ProcessEnv = process.env
): Promise<WelshLanguageSessionLease> {
  const userIdentifier = resolveWelshLanguageSessionUser(testInfo, env);
  const release = await acquireWelshLanguageLease(userIdentifier);

  try {
    await applySessionCookies(page, userIdentifier);
    await page.context().addCookies([
      {
        name: 'exui-preferred-language',
        value: 'en',
        url: config.urls.baseURL,
      },
    ]);
    const annotationValue = typeof userIdentifier === 'string' ? userIdentifier : userIdentifier.userIdentifier;
    testInfo.annotations.push({ type: 'session-user', description: annotationValue });
    return { release, userIdentifier };
  } catch (error) {
    await release().catch(() => undefined);
    throw error;
  }
}
