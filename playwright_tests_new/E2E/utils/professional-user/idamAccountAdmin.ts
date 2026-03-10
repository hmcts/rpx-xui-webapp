import { ApiClient, type IdamUtils } from '@hmcts/playwright-common';

import type { ProfessionalUserInfo } from './types.js';

type ProvisionedIdentity = {
  email: string;
  forename: string;
  surname: string;
};

export async function updateExistingUserFlow(
  args: {
    token: string;
    secret: string;
    identity: ProvisionedIdentity;
    roleNames: readonly string[];
  },
  deps: Pick<IdamUtils, 'getUserInfo' | 'updateUser'>
): Promise<ProfessionalUserInfo> {
  const existing = await deps.getUserInfo({
    bearerToken: args.token,
    email: args.identity.email,
  });

  const updated = await deps.updateUser({
    id: existing.id,
    bearerToken: args.token,
    password: args.secret,
    user: {
      email: args.identity.email,
      forename: args.identity.forename,
      surname: args.identity.surname,
      roleNames: [...args.roleNames],
    },
  });

  return {
    id: updated.id,
    email: updated.email,
    password: args.secret,
    forename: args.identity.forename,
    surname: args.identity.surname,
    roleNames: [...args.roleNames],
  };
}

export async function createUserViaSidamAccountsFlow(args: {
  baseUrl: string;
  bearerToken: string;
  password: string;
  identity: ProvisionedIdentity;
  roleNames: readonly string[];
}): Promise<ProfessionalUserInfo> {
  const client = new ApiClient({
    baseUrl: args.baseUrl,
    name: 'idam-api-testing-support',
  });
  const payload = {
    email: args.identity.email,
    forename: args.identity.forename,
    surname: args.identity.surname,
    password: args.password,
    roles: args.roleNames.map((code) => ({ code })),
    userGroup: {
      code: firstNonEmpty(process.env.IDAM_TEST_USER_GROUP, 'test'),
    },
  };

  const sidamCreateTargets = [
    {
      endpoint: '/testing-support/accounts',
      payload,
      allowAnonymous: true,
    },
    {
      endpoint: '/test/idam/burner/users',
      payload,
      allowAnonymous: true,
    },
    {
      endpoint: '/api/v2/users',
      payload: {
        password: args.password,
        user: {
          email: args.identity.email,
          forename: args.identity.forename,
          surname: args.identity.surname,
          roleNames: [...args.roleNames],
          accountStatus: 'ACTIVE',
          recordType: 'LIVE',
        },
      },
      allowAnonymous: false,
    },
  ] as const;

  const executeCreate = (target: (typeof sidamCreateTargets)[number], includeAuth: boolean) =>
    client.post<Record<string, unknown>>(target.endpoint, {
      headers: includeAuth
        ? {
            Authorization: withBearerPrefix(args.bearerToken),
            'Content-Type': 'application/json',
          }
        : {
            'Content-Type': 'application/json',
          },
      data: target.payload,
      responseType: 'json',
    });

  try {
    let response: Awaited<ReturnType<typeof executeCreate>> | undefined;
    let lastError: unknown;

    const fallbackStatuses = new Set([404, 500, 502, 503, 504]);
    for (const target of sidamCreateTargets) {
      try {
        if (target.allowAnonymous) {
          response = await executeCreate(target, false);
          break;
        }
      } catch (error) {
        const status = parseStatusCode(error);
        if (target.allowAnonymous && (status === 401 || status === 403) && args.bearerToken.trim().length > 0) {
          try {
            response = await executeCreate(target, true);
            break;
          } catch (authenticatedError) {
            const authenticatedStatus = parseStatusCode(authenticatedError);
            if (authenticatedStatus !== undefined && fallbackStatuses.has(authenticatedStatus)) {
              lastError = authenticatedError;
              continue;
            }
            throw authenticatedError;
          }
        }

        if (status !== undefined && fallbackStatuses.has(status)) {
          lastError = error;
          continue;
        }
        throw error;
      }

      if (args.bearerToken.trim().length > 0) {
        try {
          response = await executeCreate(target, true);
          break;
        } catch (authenticatedError) {
          const authenticatedStatus = parseStatusCode(authenticatedError);
          if (authenticatedStatus !== undefined && fallbackStatuses.has(authenticatedStatus)) {
            lastError = authenticatedError;
            continue;
          }
          throw authenticatedError;
        }
      }
    }

    if (!response) {
      throw lastError ?? new Error('SIDAM user creation failed');
    }

    const account = response.data;
    return {
      id: readStringProperty(account, 'id'),
      email: readStringProperty(account, 'email') ?? args.identity.email,
      password: args.password,
      forename: readStringProperty(account, 'forename') ?? args.identity.forename,
      surname: readStringProperty(account, 'surname') ?? args.identity.surname,
      roleNames: readRoleCodes(account) ?? [...args.roleNames],
    };
  } finally {
    await client.dispose();
  }
}

export async function ensureUserAccountActiveFlow(
  args: {
    token: string;
    user: ProfessionalUserInfo;
    roleNames: readonly string[];
  },
  deps: Pick<IdamUtils, 'getUserInfo' | 'updateUser'>
): Promise<ProfessionalUserInfo> {
  const userId =
    args.user.id ??
    (
      await deps.getUserInfo({
        bearerToken: args.token,
        email: args.user.email,
      })
    ).id;
  const updated = await deps.updateUser({
    id: userId,
    bearerToken: args.token,
    password: args.user.password,
    user: {
      email: args.user.email,
      forename: args.user.forename,
      surname: args.user.surname,
      roleNames: [...args.roleNames],
    },
  });
  return {
    id: updated.id,
    email: updated.email,
    password: args.user.password,
    forename: updated.forename,
    surname: updated.surname,
    roleNames: [...args.roleNames],
  };
}

function parseStatusCode(error: unknown): number | undefined {
  const message = error instanceof Error ? error.message : String(error);
  const explicit = /Status Code:\s*(\d{3})/i.exec(message);
  if (explicit) {
    const parsed = Number.parseInt(explicit[1], 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  const generic = /status(?:\s+code)?\s*(\d{3})/i.exec(message);
  if (!generic) {
    return undefined;
  }
  const parsed = Number.parseInt(generic[1], 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function readStringProperty(record: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = record?.[key];
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }
  return undefined;
}

function readRoleCodes(record: Record<string, unknown> | undefined): string[] | undefined {
  const rawRoles = record?.roles;
  const rawRoleNames = record?.roleNames;
  let source: unknown[] | undefined;
  if (Array.isArray(rawRoles)) {
    source = rawRoles;
  } else if (Array.isArray(rawRoleNames)) {
    source = rawRoleNames;
  }
  if (!source) {
    return undefined;
  }
  const roleNames = source
    .map((entry) => {
      if (typeof entry === 'string') {
        const value = entry.trim();
        return value.length > 0 ? value : undefined;
      }
      if (!entry || typeof entry !== 'object') {
        return undefined;
      }
      const maybeCode = (entry as { code?: unknown }).code;
      return typeof maybeCode === 'string' ? maybeCode.trim() : undefined;
    })
    .filter((code): code is string => Boolean(code));
  if (roleNames.length === 0) {
    return undefined;
  }
  return [...new Set(roleNames)];
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const candidate of values) {
    const normalized = candidate?.trim();
    if (normalized) {
      return normalized;
    }
  }
  return undefined;
}

function withBearerPrefix(token: string): string {
  const normalized = token.trim();
  return /^bearer\s+/i.test(normalized) ? normalized : `Bearer ${normalized}`;
}
