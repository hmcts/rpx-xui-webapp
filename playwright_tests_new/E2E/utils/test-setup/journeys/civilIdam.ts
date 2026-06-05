import { faker } from '@faker-js/faker';
import type { Page } from '@playwright/test';

import {
  createUniqueRunId,
  firstNonEmpty,
  resolveCivilApiRequestTimeoutMs,
  resolveCivilGeneratedAccountPassword,
} from './civilConfig';
import type { CivilApiConfig, CivilApiUser, JsonRecord } from './civilTypes';

const DEFAULT_CIVIL_COURT_STAFF_ROLES = [
  'caseworker',
  'caseworker-civil',
  'caseworker-civil-staff',
  'caseworker-civil-admin',
  'wlu-admin',
  'pui-case-manager',
];

export async function createCivilCourtStaffAccountViaApi(page: Page, config: CivilApiConfig): Promise<CivilApiUser> {
  const password = resolveCivilGeneratedAccountPassword();
  const generatedEmailDomain = firstNonEmpty(process.env.PW_CIVIL_COURT_STAFF_EMAIL_DOMAIN) ?? 'example.com';
  const email =
    firstNonEmpty(process.env.CIVIL_COURT_STAFF_USERNAME, process.env.PW_CIVIL_COURT_STAFF_EMAIL) ??
    `civilcourtstaff-${createUniqueRunId()}@${generatedEmailDomain}`;
  const forename = faker.person.firstName();
  const surname = faker.person.lastName();
  const roles =
    firstNonEmpty(process.env.PW_CIVIL_COURT_STAFF_ROLES)
      ?.split(',')
      .map((role) => role.trim())
      .filter(Boolean) ?? DEFAULT_CIVIL_COURT_STAFF_ROLES;

  const response = await postIdamAccountWithRetry(page, config, {
    email,
    forename,
    password,
    roles,
    surname,
    userGroup: 'caseworker',
  });

  if (!response.ok() && response.status() !== 409) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `Failed to create Civil court staff account '${email}' through IDAM testing support ` +
        `(HTTP ${response.status()}). Roles='${roles.join(',')}'. Body='${body.slice(0, 500)}'. ` +
        "Use a Civil admin role set that IDAM burner users accept, for example 'caseworker,caseworker-civil,caseworker-civil-admin,pui-case-manager'."
    );
  }

  return { email, password };
}

export function withGeneratedCivilCitizenUsers(config: CivilApiConfig): CivilApiConfig {
  const password = resolveCivilGeneratedAccountPassword();

  const runId = createUniqueRunId();
  return {
    ...config,
    claimantUser: {
      email: `claimant-civil-${runId}@example.com`,
      password,
    },
    defendantUser: {
      email: `defendant-civil-${runId}@example.com`,
      password,
    },
    createClaimantAccount: true,
    createDefendantAccount: true,
  };
}

export async function createIdamCitizenAccount(page: Page, config: CivilApiConfig, user: CivilApiUser): Promise<void> {
  const response = await postIdamCitizenAccountWithRetry(page, config, user);

  if (response.ok() || response.status() === 409) {
    return;
  }

  const body = await response.text().catch(() => '');
  const fallbackError = await createIdamCitizenAccountViaLegacyEndpoint(page, config, user);
  if (fallbackError) {
    throw new Error(
      `Failed to create Civil citizen account '${user.email}' through IDAM testing-support/accounts ` +
        `(HTTP ${response.status()}). Body='${body.slice(0, 500)}'. Legacy fallback: ${fallbackError.message}`
    );
  }
}

export async function createCivilApiTokens(
  page: Page,
  config: CivilApiConfig,
  getCivilS2sToken: (page: Page, config: CivilApiConfig) => Promise<string>
): Promise<{
  claimantIdamToken: string;
  defendantIdamToken: string;
  s2sToken: string;
}> {
  const [claimantIdamToken, defendantIdamToken, s2sToken] = await Promise.all([
    getIdamAccessToken(page, config, config.claimantUser),
    getIdamAccessToken(page, config, config.defendantUser),
    getCivilS2sToken(page, config),
  ]);

  return {
    claimantIdamToken,
    defendantIdamToken,
    s2sToken,
  };
}

export async function getIdamUserId(page: Page, config: CivilApiConfig, idamToken: string): Promise<string> {
  const response = await page.request.get(`${config.idamApiUrl}/o/userinfo`, {
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${idamToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    timeout: resolveCivilApiRequestTimeoutMs(),
  });

  if (!response.ok()) {
    const body = await response.text().catch(() => '');
    throw new Error(`Failed to get Civil IDAM userinfo (HTTP ${response.status()}). Body='${body.slice(0, 500)}'`);
  }

  const body = (await response.json()) as { uid?: string };
  if (!body.uid) {
    throw new Error('Civil IDAM userinfo response did not include uid.');
  }
  return body.uid;
}

async function postIdamCitizenAccountWithRetry(page: Page, config: CivilApiConfig, user: CivilApiUser) {
  return postIdamAccountWithRetry(page, config, {
    email: user.email,
    forename: 'Civil',
    password: user.password,
    roles: ['citizen'],
    surname: 'Citizen',
    userGroup: 'citizen',
  });
}

async function postIdamAccountWithRetry(
  page: Page,
  config: CivilApiConfig,
  account: {
    email: string;
    forename: string;
    password: string;
    roles: string[];
    surname: string;
    userGroup: string;
  }
) {
  let lastError: unknown;
  let lastResponse: Awaited<ReturnType<Page['request']['post']>> | undefined;
  const accountCreationTargets = resolveIdamAccountCreationTargets(config, account);
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    for (const target of accountCreationTargets) {
      try {
        const response = await page.request.post(target.url, {
          data: target.data,
          failOnStatusCode: false,
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: resolveCivilApiRequestTimeoutMs(),
        });
        lastResponse = response;
        if (response.ok() || response.status() === 409) {
          return response;
        }
        if (!isRetryableIdamAccountCreationStatus(response.status())) {
          return response;
        }
      } catch (error) {
        lastError = error;
      }
    }
    await page.waitForTimeout(5_000);
  }

  if (lastResponse) {
    return lastResponse;
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function isRetryableIdamAccountCreationStatus(status: number): boolean {
  return [401, 403, 404, 409, 429, 500, 502, 503, 504].includes(status);
}

function resolveIdamAccountCreationTargets(
  config: CivilApiConfig,
  account: {
    email: string;
    forename: string;
    password: string;
    roles: string[];
    surname: string;
    userGroup: string;
  }
): Array<{ data: JsonRecord; url: string }> {
  const accountPayload = {
    email: account.email,
    forename: account.forename,
    surname: account.surname,
    password: account.password,
    roles: account.roles.map((code) => ({ code })),
    userGroup: {
      code: account.userGroup,
    },
  };
  const userPayload = {
    password: account.password,
    user: {
      email: account.email,
      forename: account.forename,
      surname: account.surname,
      displayName: `${account.forename} ${account.surname}`,
      roleNames: account.roles,
    },
  };

  return [
    ...(config.idamTestSupportApiUrl
      ? [
          { url: `${config.idamTestSupportApiUrl}/test/idam/users`, data: userPayload },
          { url: `${config.idamTestSupportApiUrl}/test/idam/burner/users`, data: accountPayload },
          { url: `${config.idamTestSupportApiUrl}/testing-support/accounts`, data: accountPayload },
        ]
      : []),
    ...(config.idamApiUrl ? [{ url: `${config.idamApiUrl}/testing-support/accounts`, data: accountPayload }] : []),
  ];
}

async function createIdamCitizenAccountViaLegacyEndpoint(
  page: Page,
  config: CivilApiConfig,
  user: CivilApiUser
): Promise<Error | undefined> {
  if (!config.idamTestSupportApiUrl) {
    return new Error('IDAM_TEST_SUPPORT_API_URL or IDAM_TESTING_SUPPORT_URL is not configured.');
  }

  const adminEmail = firstNonEmpty(process.env.PW_CIVIL_IDAM_ADMIN_EMAIL);
  const adminPassword = firstNonEmpty(process.env.PW_CIVIL_IDAM_ADMIN_PASSWORD);
  if (!adminEmail || !adminPassword) {
    return new Error('PW_CIVIL_IDAM_ADMIN_EMAIL/PW_CIVIL_IDAM_ADMIN_PASSWORD are not configured.');
  }

  try {
    const adminToken = await getIdamAccessToken(page, config, {
      email: adminEmail,
      password: adminPassword,
    });
    const response = await page.request.post(`${config.idamTestSupportApiUrl}/test/idam/users`, {
      data: {
        password: user.password,
        user: {
          email: user.email,
          forename: 'Civil',
          surname: 'Citizen',
          displayName: 'Civil Citizen',
          roleNames: ['citizen'],
        },
      },
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      timeout: resolveCivilApiRequestTimeoutMs(),
    });

    if (response.ok() || response.status() === 409) {
      return undefined;
    }

    const body = await response.text().catch(() => '');
    return new Error(`HTTP ${response.status()}. Body='${body.slice(0, 500)}'`);
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

async function getIdamAccessToken(page: Page, config: CivilApiConfig, user: CivilApiUser): Promise<string> {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const response = await page.request.post(`${config.idamApiUrl}/loginUser`, {
        failOnStatusCode: false,
        form: {
          username: user.email,
          password: user.password,
        },
        timeout: resolveCivilApiRequestTimeoutMs(),
      });

      if (response.ok()) {
        const body = (await response.json()) as { access_token?: string };
        if (!body.access_token) {
          throw new Error(`IDAM token response for '${user.email}' did not include access_token.`);
        }
        return body.access_token;
      }

      const body = await response.text().catch(() => '');
      lastError = new Error(
        `Failed to get IDAM token for '${user.email}' (HTTP ${response.status()}). Body='${body.slice(0, 500)}'`
      );
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    await page.waitForTimeout(3_000);
  }

  throw lastError ?? new Error(`Failed to get IDAM token for '${user.email}'.`);
}
