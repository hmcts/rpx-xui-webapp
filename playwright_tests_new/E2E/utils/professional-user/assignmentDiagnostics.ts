import { ApiClient } from '@hmcts/playwright-common';

import type { OrganisationAssignmentMode, OrganisationAssignmentStrategy, ProfessionalUserInfo } from './types.js';

type AssignmentUserRolesResolution = {
  source: string;
  profile?: string;
  roles?: string[];
};

export async function collectAssignmentFailureDiagnosticsFlow(
  args: {
    error: unknown;
    assignmentBearerToken: string;
    serviceToken?: string;
    rdProfessionalApiPath: string;
    endpoint: string;
    mode: OrganisationAssignmentMode;
    requestedMode: OrganisationAssignmentStrategy;
    attemptedModes: OrganisationAssignmentMode[];
    organisationId: string;
    user: ProfessionalUserInfo;
    roles: string[];
    headers: Record<string, string>;
    assignmentUserRoles: AssignmentUserRolesResolution;
  },
  deps: {
    parseStatusCode: (error: unknown) => number | undefined;
    decodeJwtPayload: (token: string) => Record<string, unknown> | undefined;
    summarizeTokenPrincipal: (claims: Record<string, unknown> | undefined) => Record<string, unknown>;
    probePrdUsersView: (args: {
      rdProfessionalApiPath: string;
      organisationId: string;
      headers: Record<string, string>;
    }) => Promise<Record<string, unknown>>;
    probeIdamUserInfo: (assignmentBearerToken: string) => Promise<Record<string, unknown>>;
  }
): Promise<Record<string, unknown>> {
  const tokenClaims = deps.decodeJwtPayload(args.assignmentBearerToken);
  const prdProbe = await deps.probePrdUsersView({
    rdProfessionalApiPath: args.rdProfessionalApiPath,
    organisationId: args.organisationId,
    headers: args.headers,
  });
  const idamUserInfoProbe = await deps.probeIdamUserInfo(args.assignmentBearerToken);
  return {
    failure: {
      statusCode: deps.parseStatusCode(args.error),
      message: args.error instanceof Error ? args.error.message : String(args.error),
    },
    assignmentRequest: {
      endpoint: args.endpoint,
      mode: args.mode,
      requestedMode: args.requestedMode,
      attemptedModes: args.attemptedModes,
      organisationId: args.organisationId,
      roles: args.roles,
    },
    createdUser: {
      username: args.user.email,
      roleNames: args.user.roleNames,
    },
    assignmentPrincipalClaims: deps.summarizeTokenPrincipal(tokenClaims),
    assignmentUserRoles: {
      source: args.assignmentUserRoles.source,
      profile: args.assignmentUserRoles.profile,
      roles: args.assignmentUserRoles.roles,
    },
    hasServiceAuthHeader: Boolean(args.serviceToken),
    prdUsersReadProbe: prdProbe,
    idamUserInfoProbe,
  };
}

export async function probePrdUsersViewFlow(
  args: {
    rdProfessionalApiPath: string;
    organisationId: string;
    headers: Record<string, string>;
  },
  deps: {
    summarisePrdUsersResponse: (data: unknown) => unknown;
  }
): Promise<Record<string, unknown>> {
  const probeClient = new ApiClient({
    baseUrl: args.rdProfessionalApiPath,
    name: 'rd-professional-assignment-probe',
  });
  const endpoint = `/refdata/internal/v1/organisations/${encodeURIComponent(args.organisationId)}/users/`;
  try {
    const response = await probeClient.get<unknown>(endpoint, {
      headers: args.headers,
      throwOnError: false,
      responseType: 'json',
    });
    return {
      endpoint,
      status: response.status,
      body: deps.summarisePrdUsersResponse(response.data),
    };
  } catch (error) {
    return {
      endpoint,
      probeError: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await probeClient.dispose();
  }
}

export async function probeIdamUserInfoFlow(
  args: {
    assignmentBearerToken: string;
    idamWebUrl?: string;
  },
  deps: {
    summariseIdamUserInfo: (data: unknown) => unknown;
    withBearerPrefix: (token: string) => string;
  }
): Promise<Record<string, unknown>> {
  if (!args.idamWebUrl) {
    return { skipped: 'IDAM_WEB_URL not configured' };
  }
  const client = new ApiClient({
    baseUrl: args.idamWebUrl,
    name: 'idam-userinfo-probe',
  });
  try {
    const response = await client.get<unknown>('/o/userinfo', {
      headers: {
        Authorization: deps.withBearerPrefix(args.assignmentBearerToken),
      },
      throwOnError: false,
      responseType: 'json',
    });
    return {
      status: response.status,
      body: deps.summariseIdamUserInfo(response.data),
    };
  } catch (error) {
    return {
      probeError: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await client.dispose();
  }
}

export async function reconcileExistingOrganisationAssignmentFlow(
  args: {
    client: ApiClient;
    rdProfessionalApiPath: string;
    organisationId: string;
    user: ProfessionalUserInfo;
    roles: string[];
    headers: Record<string, string>;
  },
  deps: {
    resolveAssignmentUserIdentifier: (args: {
      rdProfessionalApiPath: string;
      organisationId: string;
      user: ProfessionalUserInfo;
      headers: Record<string, string>;
    }) => Promise<string | undefined>;
    resolveBearerToken: () => Promise<string>;
    ensureUserAccountActive: (args: {
      token: string;
      user: ProfessionalUserInfo;
      roleNames: readonly string[];
    }) => Promise<ProfessionalUserInfo>;
    readStringProperty: (record: Record<string, unknown> | undefined, key: string) => string | undefined;
    isRecord: (value: unknown) => value is Record<string, unknown>;
    warn: (message: string, meta: Record<string, unknown>) => void;
  }
): Promise<{ status: number | 'skipped'; userIdentifier?: string }> {
  const userIdentifier = await deps.resolveAssignmentUserIdentifier(args);
  if (!userIdentifier) {
    deps.warn('Unable to resolve user identifier for existing assignment reconciliation.', {
      organisationId: args.organisationId,
      username: args.user.email,
    });
    return {
      status: 'skipped',
    };
  }

  const endpoint = `/refdata/external/v1/organisations/users/${encodeURIComponent(userIdentifier)}`;
  const payload = {
    email: args.user.email,
    firstName: args.user.forename,
    lastName: args.user.surname,
    idamStatus: 'ACTIVE',
    rolesAdd: args.roles.map((name) => ({ name })),
  };

  const response = await args.client.put<Record<string, unknown>>(endpoint, {
    headers: args.headers,
    data: payload,
    throwOnError: false,
    responseType: 'json',
  });
  const responseBody = deps.isRecord(response.data) ? response.data : undefined;
  const errorDescription = deps.readStringProperty(responseBody, 'errorDescription');
  const shouldActivateAndRetry =
    response.status === 403 && errorDescription?.toLowerCase().includes('user status must be active');

  if (shouldActivateAndRetry) {
    try {
      const token = await deps.resolveBearerToken();
      const reactivatedUser = await deps.ensureUserAccountActive({
        token,
        user: args.user,
        roleNames: args.roles,
      });
      const retryPayload = {
        email: reactivatedUser.email,
        firstName: reactivatedUser.forename,
        lastName: reactivatedUser.surname,
        idamStatus: 'ACTIVE',
        rolesAdd: args.roles.map((name) => ({ name })),
      };
      const retryResponse = await args.client.put<Record<string, unknown>>(endpoint, {
        headers: args.headers,
        data: retryPayload,
        throwOnError: false,
        responseType: 'json',
      });
      return {
        status: retryResponse.status,
        userIdentifier,
      };
    } catch (error) {
      deps.warn('Failed to activate IDAM account before assignment reconciliation retry.', {
        organisationId: args.organisationId,
        username: args.user.email,
        userIdentifier,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  if (response.status >= 200 && response.status < 300) {
    return {
      status: response.status,
      userIdentifier,
    };
  }
  deps.warn('Existing assignment reconciliation returned non-2xx response.', {
    organisationId: args.organisationId,
    username: args.user.email,
    userIdentifier,
    status: response.status,
  });
  return {
    status: response.status,
    userIdentifier,
  };
}

export async function resolveAssignmentUserIdentifierFlow(
  args: {
    rdProfessionalApiPath: string;
    organisationId: string;
    user: ProfessionalUserInfo;
    headers: Record<string, string>;
  },
  deps: {
    findUserIdentifierByEmail: (data: unknown, email: string) => string | undefined;
  }
): Promise<string | undefined> {
  const fromUser = args.user.id?.trim();
  if (fromUser) {
    return fromUser;
  }

  const lookupClient = new ApiClient({
    baseUrl: args.rdProfessionalApiPath,
    name: 'rd-professional-assignment-lookup',
  });
  const endpoint = `/refdata/internal/v1/organisations/${encodeURIComponent(args.organisationId)}/users/`;
  try {
    const response = await lookupClient.get<unknown>(endpoint, {
      headers: args.headers,
      throwOnError: false,
      responseType: 'json',
    });
    if (response.status < 200 || response.status >= 300) {
      return undefined;
    }
    return deps.findUserIdentifierByEmail(response.data, args.user.email);
  } finally {
    await lookupClient.dispose();
  }
}

export async function isUserVisibleInOrganisationAssignmentFlow(
  args: {
    organisationId: string;
    user: ProfessionalUserInfo;
    assignmentBearerToken?: string;
    serviceToken?: string;
    rdProfessionalApiPath?: string;
    requireServiceAuth?: boolean;
  },
  deps: {
    resolveAssignmentBearerToken: (token?: string) => Promise<string>;
    resolveServiceToken: (token: string | undefined, required: boolean) => Promise<string | undefined>;
    resolveRdProfessionalApiPath: (value?: string) => string;
    resolveAssignmentUserRolesResolution: (assignmentBearerToken: string) => AssignmentUserRolesResolution;
    buildHeaders: (
      assignmentBearerToken: string,
      serviceToken?: string,
      assignmentUserRoles?: readonly string[]
    ) => Record<string, string>;
    findUserIdentifierByEmail: (data: unknown, email: string) => string | undefined;
    warn: (message: string, meta: Record<string, unknown>) => void;
  }
): Promise<boolean> {
  let client: ApiClient | undefined;
  try {
    const assignmentBearerToken = await deps.resolveAssignmentBearerToken(args.assignmentBearerToken);
    const serviceToken = await deps.resolveServiceToken(args.serviceToken, args.requireServiceAuth ?? true);
    const rdProfessionalApiPath = deps.resolveRdProfessionalApiPath(args.rdProfessionalApiPath);
    client = new ApiClient({
      baseUrl: rdProfessionalApiPath,
      name: 'rd-professional-assignment-visibility',
    });
    const assignmentUserRoles = deps.resolveAssignmentUserRolesResolution(assignmentBearerToken);
    const headers = deps.buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles);
    const endpoint = `/refdata/internal/v1/organisations/${encodeURIComponent(args.organisationId)}/users/`;
    const response = await client.get<unknown>(endpoint, {
      headers,
      throwOnError: false,
      responseType: 'json',
    });
    if (response.status < 200 || response.status >= 300) {
      return false;
    }
    return Boolean(deps.findUserIdentifierByEmail(response.data, args.user.email));
  } catch (error) {
    deps.warn('Failed to verify user visibility in organisation assignment.', {
      organisationId: args.organisationId,
      email: args.user.email,
      error: error instanceof Error ? error.message : String(error),
    });
    return false;
  } finally {
    if (client) {
      await client.dispose();
    }
  }
}
