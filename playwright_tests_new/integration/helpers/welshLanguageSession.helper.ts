import type { Page, TestInfo } from '@playwright/test';
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

export async function applyWelshLanguageSessionCookies(
  page: Page,
  testInfo: Pick<TestInfo, 'workerIndex' | 'annotations'>,
  env: NodeJS.ProcessEnv = process.env
): Promise<SessionIdentityInput> {
  const userIdentifier = resolveWelshLanguageSessionUser(testInfo, env);
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
  return userIdentifier;
}
