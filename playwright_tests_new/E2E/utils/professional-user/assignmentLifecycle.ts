import { ApiClient } from '@hmcts/playwright-common';

import type { OrganisationAssignmentMode, OrganisationAssignmentStrategy, ProfessionalUserInfo } from './types.js';

type AssignmentUserRolesResolution = {
  source: string;
  profile?: string;
  roles?: string[];
};

type AssignmentPrerequisites = {
  assignmentBearerToken: string;
  serviceToken?: string;
  headers: Record<string, string>;
  assignmentUserRoles: AssignmentUserRolesResolution;
};

export type AssertOrganisationAssignmentPreflightFlowArgs = {
  organisationId: string;
  requestedMode: OrganisationAssignmentStrategy;
  modesToTry: OrganisationAssignmentMode[];
  rdProfessionalApiPath: string;
};

type AssertOrganisationAssignmentPreflightFlowDeps = {
  resolveAssignmentPrerequisites: () => Promise<AssignmentPrerequisites>;
  parseStatusCode: (error: unknown) => number | undefined;
  shouldFallbackToAlternateAssignmentMode: (statusCode: number | undefined) => boolean;
};

export async function assertOrganisationAssignmentPreflightFlow(
  args: AssertOrganisationAssignmentPreflightFlowArgs,
  deps: AssertOrganisationAssignmentPreflightFlowDeps
): Promise<void> {
  const { headers } = await deps.resolveAssignmentPrerequisites();
  const client = new ApiClient({
    baseUrl: args.rdProfessionalApiPath,
    name: 'rd-professional-assignment-preflight',
  });

  let lastError: unknown;
  try {
    for (const mode of args.modesToTry) {
      const endpoint =
        mode === 'internal'
          ? `/refdata/internal/v1/organisations/${encodeURIComponent(args.organisationId)}/users/`
          : '/refdata/external/v1/organisations/users/';
      try {
        await client.post<Record<string, unknown>>(endpoint, {
          headers,
          data: {},
          responseType: 'json',
        });
        return;
      } catch (error) {
        lastError = error;
        const statusCode = deps.parseStatusCode(error);
        if (statusCode !== undefined && statusCode < 500 && statusCode !== 401 && statusCode !== 403) {
          return;
        }
        const hasNextMode = mode !== args.modesToTry[args.modesToTry.length - 1];
        if (hasNextMode && deps.shouldFallbackToAlternateAssignmentMode(statusCode)) {
          continue;
        }
      }
    }
  } finally {
    await client.dispose();
  }

  const statusCode = deps.parseStatusCode(lastError);
  throw new Error(
    `Organisation assignment preflight failed for organisation ${args.organisationId} (requested mode: ${args.requestedMode}, status: ${
      statusCode ?? 'unknown'
    }). Organisation can be ACTIVE in Manage Org while RD Professional assignment endpoints are unhealthy/forbidden.`
  );
}

export type CleanupOrganisationAssignmentFlowArgs = {
  user: ProfessionalUserInfo;
  userIdentifier?: string;
  organisationId?: string;
  rolesToRemove: readonly string[];
  rdProfessionalApiPath: string;
};

type CleanupOrganisationAssignmentFlowDeps = {
  resolveAssignmentPrerequisites: () => Promise<AssignmentPrerequisites>;
  resolveAssignmentUserIdentifier: (params: {
    rdProfessionalApiPath: string;
    organisationId: string;
    user: ProfessionalUserInfo;
    headers: Record<string, string>;
  }) => Promise<string | undefined>;
  resolveBearerToken: () => Promise<string>;
  ensureUserAccountActive: (params: {
    token: string;
    user: ProfessionalUserInfo;
    roleNames: readonly string[];
  }) => Promise<ProfessionalUserInfo>;
  isPlaywrightArtifactIoError: (error: unknown) => boolean;
  warn: (message: string, meta: Record<string, unknown>) => void;
};

export async function cleanupOrganisationAssignmentFlow(
  args: CleanupOrganisationAssignmentFlowArgs,
  deps: CleanupOrganisationAssignmentFlowDeps
): Promise<{ status: number; removedRoles: string[] }> {
  const { headers } = await deps.resolveAssignmentPrerequisites();
  const client = new ApiClient({
    baseUrl: args.rdProfessionalApiPath,
    name: 'rd-professional-cleanup',
  });

  const rolesToRemove = [...new Set(args.rolesToRemove)];
  const organisationId = firstNonEmpty(args.organisationId, process.env.TEST_SOLICITOR_ORGANISATION_ID);
  const userIdentifier = await deps.resolveAssignmentUserIdentifier({
    rdProfessionalApiPath: args.rdProfessionalApiPath,
    organisationId: organisationId ?? '',
    user: {
      ...args.user,
      id: firstNonEmpty(args.userIdentifier, args.user.id),
    },
    headers,
  });
  if (!userIdentifier) {
    deps.warn('Skipping organisation assignment cleanup because user identifier could not be resolved.', {
      email: args.user.email,
    });
    return {
      status: 404,
      removedRoles: rolesToRemove,
    };
  }
  const endpoint = `/refdata/external/v1/organisations/users/${encodeURIComponent(userIdentifier)}`;
  const payload = {
    email: args.user.email,
    firstName: args.user.forename,
    lastName: args.user.surname,
    idamStatus: 'ACTIVE',
    rolesDelete: rolesToRemove.map((name) => ({ name })),
  };

  try {
    let response = await client.put<Record<string, unknown>>(endpoint, {
      headers,
      data: payload,
      throwOnError: false,
      responseType: 'json',
    });
    const responseBody = isRecord(response.data) ? response.data : undefined;
    const errorDescription = readStringProperty(responseBody, 'errorDescription');
    const shouldActivateAndRetry =
      response.status === 403 && errorDescription?.toLowerCase().includes('user status must be active');

    if (shouldActivateAndRetry) {
      const token = await deps.resolveBearerToken();
      const reactivatedUser = await deps.ensureUserAccountActive({
        token,
        user: {
          ...args.user,
          id: userIdentifier,
        },
        roleNames: args.user.roleNames.length > 0 ? args.user.roleNames : rolesToRemove,
      });

      response = await client.put<Record<string, unknown>>(endpoint, {
        headers,
        data: {
          ...payload,
          email: reactivatedUser.email,
          firstName: reactivatedUser.forename,
          lastName: reactivatedUser.surname,
        },
        throwOnError: false,
        responseType: 'json',
      });
    }

    if ((response.status >= 200 && response.status < 300) || response.status === 404) {
      return {
        status: response.status,
        removedRoles: rolesToRemove,
      };
    }
    throw new Error(`Organisation assignment cleanup failed with status ${response.status}.`);
  } catch (error) {
    if (!deps.isPlaywrightArtifactIoError(error)) {
      throw error;
    }
    deps.warn('Falling back to direct HTTP organisation cleanup after Playwright artifact I/O failure.', {
      email: args.user.email,
      userIdentifier,
      error: error instanceof Error ? error.message : String(error),
    });
    return cleanupOrganisationAssignmentViaHttp(
      {
        rdProfessionalApiPath: args.rdProfessionalApiPath,
        endpoint,
        headers,
        payload,
        rolesToRemove,
        userIdentifier,
        user: args.user,
      },
      deps
    );
  } finally {
    await client.dispose();
  }
}

async function cleanupOrganisationAssignmentViaHttp(
  params: {
    rdProfessionalApiPath: string;
    endpoint: string;
    headers: Record<string, string>;
    payload: Record<string, unknown>;
    rolesToRemove: string[];
    userIdentifier: string;
    user: ProfessionalUserInfo;
  },
  deps: Pick<CleanupOrganisationAssignmentFlowDeps, 'resolveBearerToken' | 'ensureUserAccountActive'>
): Promise<{ status: number; removedRoles: string[] }> {
  const putCleanup = async (payload: Record<string, unknown>): Promise<{ status: number; body: unknown }> => {
    const response = await fetch(new URL(params.endpoint, params.rdProfessionalApiPath), {
      method: 'PUT',
      headers: {
        ...params.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return {
      status: response.status,
      body: await parseResponseBody(response),
    };
  };

  let response = await putCleanup(params.payload);
  const responseBody = isRecord(response.body) ? response.body : undefined;
  const errorDescription = readStringProperty(responseBody, 'errorDescription');
  const shouldActivateAndRetry =
    response.status === 403 && errorDescription?.toLowerCase().includes('user status must be active');

  if (shouldActivateAndRetry) {
    const token = await deps.resolveBearerToken();
    const reactivatedUser = await deps.ensureUserAccountActive({
      token,
      user: {
        ...params.user,
        id: params.userIdentifier,
      },
      roleNames: params.user.roleNames.length > 0 ? params.user.roleNames : params.rolesToRemove,
    });

    response = await putCleanup({
      ...params.payload,
      email: reactivatedUser.email,
      firstName: reactivatedUser.forename,
      lastName: reactivatedUser.surname,
    });
  }

  if ((response.status >= 200 && response.status < 300) || response.status === 404) {
    return {
      status: response.status,
      removedRoles: params.rolesToRemove,
    };
  }

  throw new Error(`Organisation assignment cleanup failed with status ${response.status}.`);
}

export type CleanupIdamAccountFlowArgs = {
  baseUrl: string;
  user: Pick<ProfessionalUserInfo, 'id' | 'email'>;
};

type CleanupIdamAccountFlowDeps = {
  resolveBearerToken: () => Promise<string>;
  isPlaywrightArtifactIoError: (error: unknown) => boolean;
  warn: (message: string, meta: Record<string, unknown>) => void;
};

export async function cleanupIdamAccountFlow(
  args: CleanupIdamAccountFlowArgs,
  deps: CleanupIdamAccountFlowDeps
): Promise<{ status: number; endpoint: string }> {
  const client = new ApiClient({
    baseUrl: args.baseUrl,
    name: 'idam-api-testing-support-cleanup',
  });
  const endpointByEmail = `/testing-support/accounts/${encodeURIComponent(args.user.email)}`;
  const deleteViaTestingSupport = async (): Promise<{
    status: number;
    endpoint: string;
  }> => {
    const response = await client.delete(endpointByEmail, {
      throwOnError: false,
    });
    if ([200, 204, 404].includes(response.status)) {
      return {
        status: response.status,
        endpoint: endpointByEmail,
      };
    }
    throw new Error(`IDAM testing-support cleanup failed with status ${response.status}.`);
  };

  try {
    try {
      return await deleteViaTestingSupport();
    } catch (testingSupportError) {
      const statusCode = parseStatusCode(testingSupportError);
      const userId = args.user.id?.trim();
      if (!userId) {
        throw testingSupportError;
      }
      if (statusCode !== 401 && statusCode !== 403 && statusCode !== 404) {
        throw testingSupportError;
      }

      const token = await deps.resolveBearerToken();
      const endpointById = `/api/v2/users/${encodeURIComponent(userId)}`;
      const response = await client.delete(endpointById, {
        headers: {
          Authorization: withBearerPrefix(token),
        },
        throwOnError: false,
      });
      if ([200, 204, 404].includes(response.status)) {
        return {
          status: response.status,
          endpoint: endpointById,
        };
      }
      throw new Error(`IDAM v2 cleanup failed with status ${response.status}.`);
    }
  } catch (error) {
    if (!deps.isPlaywrightArtifactIoError(error)) {
      throw error;
    }
    deps.warn('Falling back to direct HTTP IDAM cleanup after Playwright artifact I/O failure.', {
      email: args.user.email,
      error: error instanceof Error ? error.message : String(error),
    });
    return cleanupIdamAccountViaHttp(args, deps);
  } finally {
    await client.dispose();
  }
}

async function cleanupIdamAccountViaHttp(
  args: CleanupIdamAccountFlowArgs,
  deps: Pick<CleanupIdamAccountFlowDeps, 'resolveBearerToken'>
): Promise<{ status: number; endpoint: string }> {
  const endpointByEmail = `/testing-support/accounts/${encodeURIComponent(args.user.email)}`;
  const responseByEmail = await fetch(new URL(endpointByEmail, args.baseUrl), {
    method: 'DELETE',
  });
  if ([200, 204, 404].includes(responseByEmail.status)) {
    return {
      status: responseByEmail.status,
      endpoint: endpointByEmail,
    };
  }

  if (!args.user.id || ![401, 403, 404].includes(responseByEmail.status)) {
    throw new Error(`IDAM testing-support cleanup failed with status ${responseByEmail.status}.`);
  }

  const token = await deps.resolveBearerToken();
  const endpointById = `/api/v2/users/${encodeURIComponent(args.user.id)}`;
  const responseById = await fetch(new URL(endpointById, args.baseUrl), {
    method: 'DELETE',
    headers: {
      Authorization: withBearerPrefix(token),
    },
  });
  if ([200, 204, 404].includes(responseById.status)) {
    return {
      status: responseById.status,
      endpoint: endpointById,
    };
  }

  throw new Error(`IDAM v2 cleanup failed with status ${responseById.status}.`);
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
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

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return undefined;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
