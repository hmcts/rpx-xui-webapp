import { ApiClient, createLogger } from '@hmcts/playwright-common';

import type {
  OrganisationAssignmentMode,
  OrganisationAssignmentResult,
  OrganisationAssignmentStrategy,
  ProfessionalUserInfo,
} from './types.js';

type AssignmentUserRolesResolution = {
  source: string;
  profile?: string;
  roles?: string[];
};

type OrganisationInviteResult = {
  status: number;
  userIdentifier?: string;
  responseBody: unknown;
};

type AssignmentPrerequisites = {
  assignmentBearerToken: string;
  serviceToken?: string;
  rdProfessionalApiPath: string;
  headers: Record<string, string>;
  assignmentUserRoles: AssignmentUserRolesResolution;
};

type OrganisationAssignmentPayload = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  resendInvite: boolean;
};

export type AssignUserToOrganisationFlowArgs = {
  organisationId: string;
  options: {
    user: ProfessionalUserInfo;
    resendInvite?: boolean;
    requireServiceAuth?: boolean;
    assignmentBearerToken?: string;
    serviceToken?: string;
    rdProfessionalApiPath?: string;
  };
  requestedMode: OrganisationAssignmentStrategy;
  modesToTry: OrganisationAssignmentMode[];
  roles: string[];
  payload: OrganisationAssignmentPayload;
  assignmentRequestTimeoutMs: number;
};

type OrganisationAssignmentFlowDeps = {
  inviteUserViaManageOrgApi: (params: {
    user: ProfessionalUserInfo;
    roles: readonly string[];
    resendInvite: boolean;
  }) => Promise<OrganisationInviteResult>;
  isUserVisibleInOrganisationAssignment: (params: {
    organisationId: string;
    user: ProfessionalUserInfo;
    assignmentBearerToken?: string;
    serviceToken?: string;
    rdProfessionalApiPath?: string;
    requireServiceAuth?: boolean;
  }) => Promise<boolean>;
  resolveAssignmentPrerequisites: () => Promise<AssignmentPrerequisites>;
  waitForUserPropagation: (user: ProfessionalUserInfo) => Promise<{ verified: boolean; degraded: boolean; reason: string }>;
  reconcileExistingOrganisationAssignment: (params: {
    client: ApiClient;
    rdProfessionalApiPath: string;
    organisationId: string;
    user: ProfessionalUserInfo;
    roles: string[];
    headers: Record<string, string>;
  }) => Promise<{ status: number | 'skipped'; userIdentifier?: string }>;
  collectAssignmentFailureDiagnostics: (params: {
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
  }) => Promise<Record<string, unknown>>;
};

const logger = createLogger({
  serviceName: 'professional-user-org-assignment',
  format: 'pretty',
});

const EXTERNAL_ASSIGNMENT_RETRY_DELAY_MS = 2_000;
const DEFAULT_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS = 12;
const MAX_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS = 20;

type RdModeAttemptOutcome =
  | { kind: 'success'; result: OrganisationAssignmentResult }
  | { kind: 'retry' }
  | { kind: 'break-mode'; lastError: unknown };

type ModeAttemptsLoopOutcome = { kind: 'success'; result: OrganisationAssignmentResult } | { kind: 'broken'; lastError: unknown };

async function handleRetryExternalAssignment(
  args: AssignUserToOrganisationFlowArgs,
  deps: Pick<OrganisationAssignmentFlowDeps, 'waitForUserPropagation'>,
  mode: OrganisationAssignmentMode,
  attempt: number,
  modeAttempts: number,
  statusCode: number | undefined
): Promise<void> {
  const shouldLogRetry = attempt === 1 || attempt % 3 === 0 || attempt + 1 === modeAttempts;
  if (shouldLogRetry) {
    logger.warn(
      'External organisation invite returned retryable status; waiting for propagation/transient recovery and retrying.',
      {
        organisationId: args.organisationId,
        attemptedMode: mode,
        attempt,
        attempts: modeAttempts,
        statusCode,
        username: args.options.user.email,
      }
    );
  }
  const propagationOutcome = await deps.waitForUserPropagation(args.options.user);
  if (propagationOutcome.degraded) {
    logger.warn('External assignment retry is continuing after degraded propagation checks.', {
      email: args.options.user.email,
      reason: propagationOutcome.reason,
      mode,
    });
  }
  await sleep(resolveExternalAssignmentRetryDelayMs());
}

async function executeRdModeAttempt(
  params: {
    mode: OrganisationAssignmentMode;
    attempt: number;
    modeAttempts: number;
    endpoint: string;
    client: ApiClient;
    args: AssignUserToOrganisationFlowArgs;
    prereqs: AssignmentPrerequisites;
    attemptedModes: OrganisationAssignmentMode[];
  },
  deps: OrganisationAssignmentFlowDeps
): Promise<RdModeAttemptOutcome> {
  const { mode, attempt, modeAttempts, endpoint, client, args, prereqs, attemptedModes } = params;
  const { assignmentBearerToken, serviceToken, rdProfessionalApiPath, headers, assignmentUserRoles } = prereqs;
  try {
    const response = await client.post<Record<string, unknown>>(endpoint, {
      headers,
      data: args.payload,
      responseType: 'json',
      timeoutMs: args.assignmentRequestTimeoutMs,
    });
    return {
      kind: 'success',
      result: {
        organisationId: args.organisationId,
        mode,
        requestedMode: args.requestedMode,
        attemptedModes: [...attemptedModes],
        roles: args.roles,
        status: response.status,
        userIdentifier: readUserIdentifier(response.data),
        responseBody: response.data,
      },
    };
  } catch (error) {
    const statusCode = parseStatusCode(error);
    if (statusCode === 409 && mode === 'external') {
      const reconciledAssignment = await deps.reconcileExistingOrganisationAssignment({
        client,
        rdProfessionalApiPath,
        organisationId: args.organisationId,
        user: args.options.user,
        roles: args.roles,
        headers,
      });
      logger.warn('Organisation assignment returned idempotent conflict; reconciled existing assignment.', {
        organisationId: args.organisationId,
        attemptedMode: mode,
        requestedMode: args.requestedMode,
        username: args.options.user.email,
        userIdentifier: reconciledAssignment.userIdentifier,
        reconciliationStatus: reconciledAssignment.status,
      });
      return {
        kind: 'success',
        result: {
          organisationId: args.organisationId,
          mode,
          requestedMode: args.requestedMode,
          attemptedModes: [...attemptedModes],
          roles: args.roles,
          status: 409,
          userIdentifier: reconciledAssignment.userIdentifier,
          responseBody: { conflict: 'already-exists', reconciliation: reconciledAssignment },
        },
      };
    }
    const hasNextMode = attemptedModes.length < args.modesToTry.length;
    if (shouldRetryExternalAssignment(mode, statusCode) && attempt < modeAttempts) {
      await handleRetryExternalAssignment(args, deps, mode, attempt, modeAttempts, statusCode);
      return { kind: 'retry' };
    }
    if (hasNextMode && shouldFallbackToAlternateAssignmentMode(statusCode)) {
      logger.warn('Organisation assignment attempt failed; trying fallback mode.', {
        organisationId: args.organisationId,
        attemptedMode: mode,
        nextMode: args.modesToTry[attemptedModes.length],
        statusCode,
        username: args.options.user.email,
        requestedMode: args.requestedMode,
      });
      return { kind: 'break-mode', lastError: error };
    }
    const diagnostics = await deps.collectAssignmentFailureDiagnostics({
      error,
      assignmentBearerToken,
      serviceToken,
      rdProfessionalApiPath,
      endpoint,
      mode,
      organisationId: args.organisationId,
      requestedMode: args.requestedMode,
      attemptedModes: [...attemptedModes],
      user: args.options.user,
      roles: args.roles,
      headers,
      assignmentUserRoles,
    });
    logger.error('Organisation assignment failed. PRD principal and role diagnostics:', diagnostics);
    if (shouldUseManageOrgInviteFallback(error)) {
      return { kind: 'break-mode', lastError: error };
    }
    throw error;
  }
}

async function executeRdModeAttemptsLoop(
  params: {
    mode: OrganisationAssignmentMode;
    endpoint: string;
    modeAttempts: number;
    client: ApiClient;
    args: AssignUserToOrganisationFlowArgs;
    prereqs: AssignmentPrerequisites;
    attemptedModes: OrganisationAssignmentMode[];
  },
  deps: OrganisationAssignmentFlowDeps
): Promise<ModeAttemptsLoopOutcome> {
  const { mode, endpoint, modeAttempts, client, args, prereqs, attemptedModes } = params;
  for (let attempt = 1; attempt <= modeAttempts; attempt += 1) {
    const outcome = await executeRdModeAttempt(
      { mode, attempt, modeAttempts, endpoint, client, args, prereqs, attemptedModes },
      deps
    );
    if (outcome.kind === 'success') return { kind: 'success', result: outcome.result };
    if (outcome.kind === 'retry') continue;
    return { kind: 'broken', lastError: outcome.lastError };
  }
  return { kind: 'broken', lastError: undefined };
}

async function executeManageOrgFallback(
  args: AssignUserToOrganisationFlowArgs,
  deps: Pick<OrganisationAssignmentFlowDeps, 'inviteUserViaManageOrgApi'>,
  attemptedModes: OrganisationAssignmentMode[],
  logMessage: string
): Promise<OrganisationAssignmentResult> {
  const manageOrgFallback = await deps.inviteUserViaManageOrgApi({
    user: args.options.user,
    roles: args.roles,
    resendInvite: args.options.resendInvite ?? false,
  });
  logger.warn(logMessage, {
    organisationId: args.organisationId,
    requestedMode: args.requestedMode,
    attemptedModes,
    fallbackStatus: manageOrgFallback.status,
    email: args.options.user.email,
  });
  return {
    organisationId: args.organisationId,
    mode: 'external',
    requestedMode: args.requestedMode,
    attemptedModes: [...attemptedModes, 'external'],
    roles: args.roles,
    status: manageOrgFallback.status,
    userIdentifier: manageOrgFallback.userIdentifier,
    responseBody: { fallback: 'manage-org-invite', payload: manageOrgFallback.responseBody },
  };
}

async function tryManageOrgPrimary(
  args: AssignUserToOrganisationFlowArgs,
  deps: Pick<OrganisationAssignmentFlowDeps, 'inviteUserViaManageOrgApi' | 'isUserVisibleInOrganisationAssignment'>
): Promise<OrganisationAssignmentResult | null> {
  try {
    const manageOrgPrimary = await deps.inviteUserViaManageOrgApi({
      user: args.options.user,
      roles: args.roles,
      resendInvite: args.options.resendInvite ?? false,
    });
    const requiresConflictVerification = manageOrgPrimary.status === 409;
    const conflictVerified =
      !requiresConflictVerification ||
      (await deps.isUserVisibleInOrganisationAssignment({
        organisationId: args.organisationId,
        user: args.options.user,
        assignmentBearerToken: args.options.assignmentBearerToken,
        serviceToken: args.options.serviceToken,
        rdProfessionalApiPath: args.options.rdProfessionalApiPath,
        requireServiceAuth: args.options.requireServiceAuth,
      }));
    if (requiresConflictVerification && !conflictVerified) {
      logger.warn(
        'Manage-org invite returned 409, but RD Professional lookup could not confirm user assignment. Continuing with RD fallback.',
        { organisationId: args.organisationId, requestedMode: args.requestedMode, email: args.options.user.email }
      );
      return null;
    }
    logger.info('Organisation assignment succeeded via manage-org invite primary path.', {
      organisationId: args.organisationId,
      requestedMode: args.requestedMode,
      email: args.options.user.email,
      status: manageOrgPrimary.status,
    });
    return {
      organisationId: args.organisationId,
      mode: 'external',
      requestedMode: args.requestedMode,
      attemptedModes: ['external'],
      roles: args.roles,
      status: manageOrgPrimary.status,
      userIdentifier: manageOrgPrimary.userIdentifier,
      responseBody: { assignmentPath: 'manage-org-invite-primary', payload: manageOrgPrimary.responseBody },
    };
  } catch (error) {
    if (!shouldFallbackToRdAfterManageOrgFailure()) throw error;
    logger.warn('Manage-org invite primary path failed; falling back to RD Professional assignment path.', {
      organisationId: args.organisationId,
      requestedMode: args.requestedMode,
      email: args.options.user.email,
      error: getErrorMessage(error) ?? '[non-Error thrown]',
    });
    return null;
  }
}

export async function assignUserToOrganisationFlow(
  args: AssignUserToOrganisationFlowArgs,
  deps: OrganisationAssignmentFlowDeps
): Promise<OrganisationAssignmentResult> {
  const attemptedModes: OrganisationAssignmentMode[] = [];

  if (shouldUseManageOrgInvitePrimary()) {
    const primaryResult = await tryManageOrgPrimary(args, deps);
    if (primaryResult) return primaryResult;
  }

  let client: ApiClient | undefined;
  try {
    const prereqs = await deps.resolveAssignmentPrerequisites();
    client = new ApiClient({ baseUrl: prereqs.rdProfessionalApiPath, name: 'rd-professional-assignment' });
    logger.info('Resolved assignment principal roles for organisation assignment.', {
      organisationId: args.organisationId,
      requestedMode: args.requestedMode,
      source: prereqs.assignmentUserRoles.source,
      profile: prereqs.assignmentUserRoles.profile,
      roles: prereqs.assignmentUserRoles.roles,
    });

    let lastError: unknown;
    for (const mode of args.modesToTry) {
      const endpoint =
        mode === 'internal'
          ? `/refdata/internal/v1/organisations/${encodeURIComponent(args.organisationId)}/users/`
          : '/refdata/external/v1/organisations/users/';
      attemptedModes.push(mode);
      const modeAttempts = mode === 'external' ? resolveExternalAssignmentRetryAttempts() : 1;
      const modeOutcome = await executeRdModeAttemptsLoop(
        { mode, endpoint, modeAttempts, client, args, prereqs, attemptedModes },
        deps
      );
      if (modeOutcome.kind === 'success') return modeOutcome.result;
      lastError = modeOutcome.lastError;
    }

    if (shouldUseManageOrgInviteFallback(lastError)) {
      return executeManageOrgFallback(
        args,
        deps,
        attemptedModes,
        'Organisation assignment succeeded via manage-org invite fallback after RD Professional failure.'
      );
    }
    throw toError(lastError, 'Organisation assignment failed.');
  } catch (error) {
    if (shouldUseManageOrgInviteFallback(error)) {
      return executeManageOrgFallback(
        args,
        deps,
        attemptedModes,
        'Organisation assignment recovered via manage-org invite fallback after RD prerequisite failure.'
      );
    }
    throw error;
  } finally {
    if (client) {
      await client.dispose();
    }
  }
}

function resolveExternalAssignmentRetryAttempts(): number {
  const raw = firstNonEmpty(process.env.PROFESSIONAL_USER_EXTERNAL_ASSIGNMENT_MAX_ATTEMPTS);
  if (!raw) {
    return DEFAULT_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return DEFAULT_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS;
  }
  return Math.min(parsed, MAX_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS);
}

function resolveExternalAssignmentRetryDelayMs(): number {
  const raw = firstNonEmpty(process.env.PROFESSIONAL_USER_EXTERNAL_ASSIGNMENT_RETRY_DELAY_MS);
  if (!raw) {
    return EXTERNAL_ASSIGNMENT_RETRY_DELAY_MS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return EXTERNAL_ASSIGNMENT_RETRY_DELAY_MS;
  }
  return parsed;
}

function shouldFallbackToAlternateAssignmentMode(statusCode: number | undefined): boolean {
  if (statusCode === undefined) {
    return false;
  }
  return [401, 403, 404, 405, 500, 502, 503, 504].includes(statusCode);
}

function shouldRetryExternalAssignment(mode: OrganisationAssignmentMode, statusCode: number | undefined): boolean {
  return mode === 'external' && typeof statusCode === 'number' && [404, 429, 500, 502, 503, 504].includes(statusCode);
}

function shouldUseManageOrgInviteFallback(error: unknown): boolean {
  if (!resolveBooleanFlag(process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK)) {
    return false;
  }
  const statusCode = parseStatusCode(error);
  if (statusCode === undefined) {
    const message = getErrorMessage(error);
    if (!message) return false;
    const lowered = message.toLowerCase();
    return (
      lowered.includes('forbidden') ||
      lowered.includes('permission') ||
      lowered.includes('access denied') ||
      lowered.includes('token is expired')
    );
  }
  return statusCode >= 500 || statusCode === 401 || statusCode === 403 || statusCode === 404 || statusCode === 405;
}

function shouldUseManageOrgInvitePrimary(): boolean {
  return resolveBooleanFlag(process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY);
}

function shouldFallbackToRdAfterManageOrgFailure(): boolean {
  return resolveBooleanFlag(
    firstNonEmpty(
      process.env.PROFESSIONAL_USER_ENABLE_RD_FALLBACK_AFTER_MANAGE_ORG,
      process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK
    )
  );
}

function getErrorMessage(error: unknown): string | undefined {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return undefined;
}

function parseStatusCode(error: unknown): number | undefined {
  const message = getErrorMessage(error);
  if (!message) {
    return undefined;
  }
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

function readUserIdentifier(data: Record<string, unknown> | undefined): string | undefined {
  const rawValue = data?.userIdentifier;
  if (typeof rawValue === 'string' && rawValue.trim().length > 0) {
    return rawValue;
  }
  return undefined;
}

function resolveBooleanFlag(value: string | undefined): boolean {
  const rawValue = firstNonEmpty(value);
  if (!rawValue) {
    return false;
  }
  return !['0', 'false', 'no', 'off'].includes(rawValue.toLowerCase());
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

function toError(error: unknown, fallbackMessage: string): Error {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === 'string' && error.trim()) {
    return new Error(error);
  }
  return new Error(fallbackMessage);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
