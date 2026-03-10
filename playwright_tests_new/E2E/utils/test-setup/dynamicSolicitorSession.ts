import { createLogger } from '@hmcts/playwright-common';
import { request, type TestInfo } from '@playwright/test';

import { type SolicitorRoleContext } from '../professional-user/roleStrategy.js';
import type { ProvisionedProfessionalUser } from '../professional-user/types.js';
import type { ProfessionalUserUtils } from '../professional-user.utils';
import type { SessionIdentity } from '../../../common/sessionIdentity.js';
import config from '../config.utils';
import { ensureSessionCookies } from '../../../common/sessionCapture';
import { provisionUserWithRetries } from './dynamicProvisioningFlow.js';
import type { DynamicProvisionAttempt } from './dynamicProvisioningFlow.js';
import {
  getAliasBaselineRoles,
  resolveProvisionRoleNamesForAlias,
  type DynamicSolicitorAlias,
} from './provisionRoleResolution.js';
export {
  DIVORCE_FLAGS_DYNAMIC_SOLICITOR_ROLES,
  EMPLOYMENT_DYNAMIC_CASEWORKER_ROLES,
  EMPLOYMENT_DYNAMIC_SOLICITOR_ROLES,
  resolveProvisionRoleNamesForAlias,
} from './provisionRoleResolution.js';

type DynamicProvisionHandle = {
  user: ProvisionedProfessionalUser;
  sessionIdentity: SessionIdentity;
};

type DynamicExuiReadinessAttempt = {
  attempt: number;
  elapsedMs: number;
  authStatus?: number;
  authenticated?: boolean;
  userDetailsStatus?: number;
  userId?: string;
  jurisdictionsStatus?: number;
  jurisdictionCount?: number;
  ready: boolean;
  note?: string;
  expectedJurisdiction?: string;
  jurisdictionAccesses?: string[];
  probeResults?: DynamicJurisdictionProbeResult[];
};

type DynamicJurisdictionProbeResult = {
  access: 'read' | 'create';
  status: number;
  ready: boolean;
  jurisdictionCount?: number;
  hasExpectedJurisdiction?: boolean;
  note?: string;
  responsePreview?: unknown;
};

type ProvisionDynamicSolicitorArgs = {
  alias: DynamicSolicitorAlias;
  professionalUserUtils: ProfessionalUserUtils;
  roleContext?: SolicitorRoleContext;
  roleNames?: readonly string[];
  testInfo: TestInfo;
  mode?: 'internal' | 'external' | 'auto';
  assertEmploymentAssignmentPayloadAccepted?: boolean;
};

type ExuiApiContext = Awaited<ReturnType<typeof request.newContext>>;

type WaitForExuiUserPropagationDeps = {
  resolveTimeoutMs: () => number;
  resolvePollIntervalMs: () => number;
  resolveBaseUrl: () => string;
  ensureSessionCookies: typeof ensureSessionCookies;
  createApiContext: (params: { baseURL: string; storageState: string }) => Promise<ExuiApiContext>;
  attachAttempts: (
    testInfo: TestInfo,
    alias: DynamicSolicitorAlias,
    attempts: readonly DynamicExuiReadinessAttempt[]
  ) => Promise<void>;
  sleep: (ms: number) => Promise<void>;
  info: (message: string, meta: Record<string, unknown>) => void;
};

type ProvisionDynamicSolicitorFlowDeps = {
  shouldRunEmploymentAssignmentPreflight: (flag: boolean) => boolean;
  runEmploymentAssignmentPreflight: (params: {
    professionalUserUtils: ProfessionalUserUtils;
    organisationId: string;
    testInfo: TestInfo;
  }) => Promise<void>;
  provisionUserWithRetries: typeof provisionUserWithRetries;
  resolveProvisionTimeoutMs: () => number;
  resolveProvisionMaxAttempts: () => number;
  resolveProvisionRetryDelayMs: () => number;
  withTimeout: typeof withTimeout;
  shouldRetryDynamicProvision: (error: unknown) => boolean;
  describeUnknownError: (error: unknown) => string;
  sleep: (ms: number) => Promise<void>;
  now: () => number;
  outputCreatedUserData: boolean;
  attachProvisionAttempts: (
    testInfo: TestInfo,
    alias: DynamicSolicitorAlias,
    attempts: readonly DynamicProvisionAttempt[]
  ) => Promise<void>;
  assertDynamicUserRoleContract: (params: {
    alias: DynamicSolicitorAlias;
    roleContext?: SolicitorRoleContext;
    resolvedRoleNames?: readonly string[];
    user: ProvisionedProfessionalUser;
  }) => void;
  waitForExuiUserPropagation: (params: {
    alias: DynamicSolicitorAlias;
    user: ProvisionedProfessionalUser;
    sessionIdentity: SessionIdentity;
    roleContext?: SolicitorRoleContext;
    testInfo: TestInfo;
  }) => Promise<void>;
  attachDynamicUser: (testInfo: TestInfo, alias: DynamicSolicitorAlias, user: ProvisionedProfessionalUser) => Promise<void>;
  info: (message: string, meta: Record<string, unknown>) => void;
  warn: (message: string, meta: Record<string, unknown>) => void;
};

const logger = createLogger({
  serviceName: 'dynamic-solicitor-session',
  format: 'pretty',
});

const truthyValues = new Set(['1', 'true', 'yes', 'on']);
const DEFAULT_DYNAMIC_SOLICITOR_PROVISION_TIMEOUT_MS = 120_000;
const DEFAULT_DYNAMIC_SOLICITOR_PROVISION_MAX_ATTEMPTS = 2;
const DEFAULT_DYNAMIC_SOLICITOR_PROVISION_RETRY_DELAY_MS = 5_000;
const DEFAULT_DYNAMIC_SOLICITOR_EXUI_READY_TIMEOUT_MS = 90_000;
const DEFAULT_DYNAMIC_SOLICITOR_EXUI_READY_POLL_INTERVAL_MS = 3_000;
const DYNAMIC_PROVISION_RETRY_PATTERNS: RegExp[] = [
  /timed out after \d+ms/i,
  /timeout/i,
  /ETIMEDOUT/i,
  /ECONNRESET/i,
  /ECONNABORTED/i,
  /EAI_AGAIN/i,
  /status\s+429/i,
  /status\s+5\d\d/i,
  /\b5\d\d\b/,
  /rate limit/i,
  /gateway/i,
  /temporar/i,
];

const EMPLOYMENT_ASSIGNMENT_REQUIRED_ROLES = [
  'caseworker',
  'caseworker-employment',
  'caseworker-employment-legalrep-solicitor',
  'pui-case-manager',
] as const;

const EMPLOYMENT_INTERNAL_ASSIGNMENT_REQUIRED_ROLES = ['caseworker', 'caseworker-employment'] as const;

const EMPLOYMENT_ASSIGNMENT_ROLES_UNFILTERED = [
  'caseworker',
  'caseworker-employment',
  'caseworker-employment-api',
  'caseworker-employment-englandwales',
  'caseworker-employment-leeds',
  'caseworker-employment-manchester',
  'caseworker-employment-scotland',
  'ccd-import',
  'caseworker-employment-legalrep-solicitor',
  'pui-case-manager',
] as const;

const EMPLOYMENT_FILTERED_ASSIGNMENT_ROLES = [
  'caseworker-employment-api',
  'caseworker-employment-englandwales',
  'caseworker-employment-leeds',
  'caseworker-employment-manchester',
  'caseworker-employment-scotland',
  'ccd-import',
] as const;

const DYNAMIC_SOLICITOR_DISALLOWED_IDAM_ROLES = new Set<string>([
  'pui-user-manager',
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-caa',
]);

function isTruthy(value: string | undefined): boolean {
  return truthyValues.has((value ?? '').trim().toLowerCase());
}

function shouldRunEmploymentAssignmentPreflight(assertEmploymentAssignmentPayloadAccepted: boolean): boolean {
  if (!assertEmploymentAssignmentPayloadAccepted) {
    return false;
  }
  return isTruthy(process.env.PW_EMPLOYMENT_ASSIGNMENT_PREFLIGHT);
}

function truncateForDiagnostics(value: unknown, maxLength = 300): unknown {
  if (typeof value === 'string') {
    return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
  }
  if (Array.isArray(value)) {
    return value.slice(0, 5).map((entry) => truncateForDiagnostics(entry, maxLength));
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .slice(0, 8)
        .map(([key, entryValue]) => [key, truncateForDiagnostics(entryValue, maxLength)])
    );
  }
  return value;
}

function resolveJurisdictionAccesses(roleContext?: SolicitorRoleContext): Array<'read' | 'create'> {
  const accesses: Array<'read' | 'create'> = ['read'];
  if (roleContext?.testType?.trim().toLowerCase() === 'case-create') {
    accesses.push('create');
  }
  return accesses;
}

function buildDynamicSessionIdentity(
  alias: DynamicSolicitorAlias,
  user: ProvisionedProfessionalUser
): SessionIdentity {
  const stableSuffix = user.id?.trim() || user.email.trim().toLowerCase();
  return {
    userIdentifier: alias,
    email: user.email,
    password: user.password,
    sessionKey: `dynamic-${alias.toLowerCase()}-${stableSuffix}`,
  };
}

function resolveDynamicProvisionTimeoutMs(): number {
  const raw = process.env.PW_DYNAMIC_SOLICITOR_PROVISION_TIMEOUT_MS?.trim();
  if (!raw) {
    return DEFAULT_DYNAMIC_SOLICITOR_PROVISION_TIMEOUT_MS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_DYNAMIC_SOLICITOR_PROVISION_TIMEOUT_MS;
  }
  return parsed;
}

function resolveDynamicProvisionMaxAttempts(): number {
  const raw = process.env.PW_DYNAMIC_SOLICITOR_PROVISION_MAX_ATTEMPTS?.trim();
  if (!raw) {
    return DEFAULT_DYNAMIC_SOLICITOR_PROVISION_MAX_ATTEMPTS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return DEFAULT_DYNAMIC_SOLICITOR_PROVISION_MAX_ATTEMPTS;
  }
  return parsed;
}

function resolveDynamicProvisionRetryDelayMs(): number {
  const raw = process.env.PW_DYNAMIC_SOLICITOR_PROVISION_RETRY_DELAY_MS?.trim();
  if (!raw) {
    return DEFAULT_DYNAMIC_SOLICITOR_PROVISION_RETRY_DELAY_MS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return DEFAULT_DYNAMIC_SOLICITOR_PROVISION_RETRY_DELAY_MS;
  }
  return parsed;
}

function resolveDynamicSolicitorExuiReadyTimeoutMs(): number {
  const raw = process.env.PW_DYNAMIC_SOLICITOR_EXUI_READY_TIMEOUT_MS?.trim();
  if (!raw) {
    return DEFAULT_DYNAMIC_SOLICITOR_EXUI_READY_TIMEOUT_MS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_DYNAMIC_SOLICITOR_EXUI_READY_TIMEOUT_MS;
  }
  return parsed;
}

function resolveDynamicSolicitorExuiReadyPollIntervalMs(): number {
  const raw = process.env.PW_DYNAMIC_SOLICITOR_EXUI_READY_POLL_INTERVAL_MS?.trim();
  if (!raw) {
    return DEFAULT_DYNAMIC_SOLICITOR_EXUI_READY_POLL_INTERVAL_MS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_DYNAMIC_SOLICITOR_EXUI_READY_POLL_INTERVAL_MS;
  }
  return parsed;
}

async function withTimeout<T>(operation: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      operation,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
}

function describeUnknownError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return JSON.stringify(error);
}

function shouldRetryDynamicProvision(error: unknown): boolean {
  const message = describeUnknownError(error);
  return DYNAMIC_PROVISION_RETRY_PATTERNS.some((pattern) => pattern.test(message));
}

async function sleep(ms: number): Promise<void> {
  if (ms <= 0) {
    return;
  }
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function attachProvisionAttempts(
  testInfo: TestInfo,
  alias: DynamicSolicitorAlias,
  attempts: readonly DynamicProvisionAttempt[]
): Promise<void> {
  await testInfo.attach(`${alias.toLowerCase()}-dynamic-user-provision-attempts.json`, {
    body: JSON.stringify({ alias, attempts }, null, 2),
    contentType: 'application/json',
  });
}

async function attachExuiReadinessAttempts(
  testInfo: TestInfo,
  alias: DynamicSolicitorAlias,
  attempts: readonly DynamicExuiReadinessAttempt[]
): Promise<void> {
  await testInfo.attach(`${alias.toLowerCase()}-dynamic-user-exui-readiness.json`, {
    body: JSON.stringify({ alias, attempts }, null, 2),
    contentType: 'application/json',
  });
}

function toUserId(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }
  const userInfo = (payload as { userInfo?: { uid?: unknown; id?: unknown } }).userInfo;
  const uid = typeof userInfo?.uid === 'string' ? userInfo.uid.trim() : '';
  if (uid) {
    return uid;
  }
  const id = typeof userInfo?.id === 'string' ? userInfo.id.trim() : '';
  return id || undefined;
}

const DEFAULT_WAIT_FOR_EXUI_PROPAGATION_DEPS: WaitForExuiUserPropagationDeps = {
  resolveTimeoutMs: resolveDynamicSolicitorExuiReadyTimeoutMs,
  resolvePollIntervalMs: resolveDynamicSolicitorExuiReadyPollIntervalMs,
  resolveBaseUrl: () => config.urls.baseURL || config.urls.exuiDefaultUrl || 'https://manage-case.aat.platform.hmcts.net',
  ensureSessionCookies,
  createApiContext: ({ baseURL, storageState }) =>
    request.newContext({
      baseURL,
      ignoreHTTPSErrors: true,
      storageState,
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
  attachAttempts: attachExuiReadinessAttempts,
  sleep,
  info: (message, meta) => logger.info(message, meta),
};

function parseJurisdictionIds(responsePayload: unknown): string[] {
  if (!Array.isArray(responsePayload)) return [];
  return responsePayload
    .map((entry: unknown) => {
      if (typeof entry === 'object' && entry !== null && 'id' in entry) {
        const id = (entry as { id: unknown }).id;
        return typeof id === 'string' ? id.trim().toLowerCase() : '';
      }
      return '';
    })
    .filter(Boolean);
}

function resolveJurisdictionProbeNote(
  status: number,
  jurisdictionCount: number,
  hasExpectedJurisdiction: boolean
): string | undefined {
  if (status !== 200) return 'jurisdictions-not-ready';
  if (jurisdictionCount === 0) return 'jurisdictions-empty';
  if (!hasExpectedJurisdiction) return 'expected-jurisdiction-not-ready';
  return undefined;
}

function applyProbeResultsToAttempt(
  readinessAttempt: DynamicExuiReadinessAttempt,
  probeResults: DynamicJurisdictionProbeResult[]
): void {
  readinessAttempt.probeResults = probeResults;
  const readProbe = probeResults.find((probe) => probe.access === 'read');
  readinessAttempt.jurisdictionsStatus = readProbe?.status;
  readinessAttempt.jurisdictionCount = readProbe?.jurisdictionCount;
  readinessAttempt.ready = probeResults.every((probe) => probe.ready);
  if (!readinessAttempt.ready) {
    readinessAttempt.note =
      probeResults.map((probe) => `${probe.access}:${probe.note ?? 'ok'}:${probe.status}`).join(', ') ||
      'jurisdictions-not-ready';
  }
}

async function probeJurisdictionAccess(
  apiContext: ExuiApiContext,
  userId: string,
  access: 'read' | 'create',
  expectedJurisdiction: string | undefined
): Promise<DynamicJurisdictionProbeResult> {
  const jurisdictionsResponse = await apiContext.get(
    `/aggregated/caseworkers/${encodeURIComponent(userId)}/jurisdictions?access=${access}`,
    { failOnStatusCode: false }
  );
  const status = jurisdictionsResponse.status();
  const responsePayload =
    status === 200
      ? await jurisdictionsResponse.json().catch(() => undefined)
      : await jurisdictionsResponse.text().catch(() => undefined);
  const jurisdictionIds = parseJurisdictionIds(responsePayload);
  const hasExpectedJurisdiction = expectedJurisdiction ? jurisdictionIds.includes(expectedJurisdiction) : true;
  const ready = status === 200 && jurisdictionIds.length > 0 && hasExpectedJurisdiction;
  return {
    access,
    status,
    ready,
    jurisdictionCount: jurisdictionIds.length,
    hasExpectedJurisdiction,
    note: resolveJurisdictionProbeNote(status, jurisdictionIds.length, hasExpectedJurisdiction),
    responsePreview: truncateForDiagnostics(responsePayload),
  };
}

async function probeJurisdictionsForUser(
  apiContext: ExuiApiContext,
  userId: string,
  requiredAccesses: Array<'read' | 'create'>,
  expectedJurisdiction: string | undefined
): Promise<DynamicJurisdictionProbeResult[]> {
  const probeResults: DynamicJurisdictionProbeResult[] = [];
  for (const access of requiredAccesses) {
    probeResults.push(await probeJurisdictionAccess(apiContext, userId, access, expectedJurisdiction));
  }
  return probeResults;
}

async function runApiReadinessChecks(
  apiContext: ExuiApiContext,
  readinessAttempt: DynamicExuiReadinessAttempt,
  requiredAccesses: Array<'read' | 'create'>,
  expectedJurisdiction: string | undefined
): Promise<void> {
  const userDetailsResponse = await apiContext.get('/api/user/details', { failOnStatusCode: false });
  readinessAttempt.userDetailsStatus = userDetailsResponse.status();
  readinessAttempt.authStatus = userDetailsResponse.status();
  const userId =
    userDetailsResponse.status() === 200 ? toUserId(await userDetailsResponse.json().catch(() => undefined)) : undefined;
  readinessAttempt.userId = userId;
  if (userId) {
    const probeResults = await probeJurisdictionsForUser(apiContext, userId, requiredAccesses, expectedJurisdiction);
    applyProbeResultsToAttempt(readinessAttempt, probeResults);
  } else {
    readinessAttempt.note = 'user-details-not-ready';
  }
}

async function runReadinessCheck(
  {
    sessionIdentity,
    baseUrl,
    expectedJurisdiction,
    requiredAccesses,
    attempt,
    startedAt,
  }: {
    sessionIdentity: SessionIdentity;
    baseUrl: string;
    expectedJurisdiction: string | undefined;
    requiredAccesses: Array<'read' | 'create'>;
    attempt: number;
    startedAt: number;
  },
  deps: WaitForExuiUserPropagationDeps
): Promise<DynamicExuiReadinessAttempt> {
  const readinessAttempt: DynamicExuiReadinessAttempt = {
    attempt,
    elapsedMs: Date.now() - startedAt,
    ready: false,
    expectedJurisdiction,
    jurisdictionAccesses: requiredAccesses,
  };
  try {
    const session = await deps.ensureSessionCookies(sessionIdentity);
    readinessAttempt.authenticated = session.cookies.length > 0;
    const apiContext = await deps.createApiContext({ baseURL: baseUrl, storageState: session.storageFile });
    try {
      await runApiReadinessChecks(apiContext, readinessAttempt, requiredAccesses, expectedJurisdiction);
    } finally {
      await apiContext.dispose();
    }
  } catch (error) {
    readinessAttempt.authenticated = false;
    readinessAttempt.note = describeUnknownError(error);
  }
  return readinessAttempt;
}

async function waitForExuiUserPropagation(
  {
    alias,
    user,
    sessionIdentity,
    roleContext,
    testInfo,
  }: {
    alias: DynamicSolicitorAlias;
    user: ProvisionedProfessionalUser;
    sessionIdentity: SessionIdentity;
    roleContext?: SolicitorRoleContext;
    testInfo: TestInfo;
  },
  deps: WaitForExuiUserPropagationDeps = DEFAULT_WAIT_FOR_EXUI_PROPAGATION_DEPS
): Promise<void> {
  const timeoutMs = deps.resolveTimeoutMs();
  const pollIntervalMs = deps.resolvePollIntervalMs();
  const baseUrl = deps.resolveBaseUrl();
  const attempts: DynamicExuiReadinessAttempt[] = [];
  const startedAt = Date.now();
  const deadline = startedAt + timeoutMs;
  const expectedJurisdiction = roleContext?.jurisdiction?.trim().toLowerCase();
  const requiredAccesses = resolveJurisdictionAccesses(roleContext);
  let attempt = 0;
  while (Date.now() < deadline) {
    attempt += 1;
    const readinessAttempt = await runReadinessCheck(
      { sessionIdentity, baseUrl, expectedJurisdiction, requiredAccesses, attempt, startedAt },
      deps
    );
    attempts.push(readinessAttempt);
    if (readinessAttempt.ready) {
      await deps.attachAttempts(testInfo, alias, attempts);
      deps.info('Dynamic solicitor became visible to EXUI.', {
        alias,
        email: user.email,
        elapsedMs: readinessAttempt.elapsedMs,
        userId: readinessAttempt.userId,
        jurisdictionCount: readinessAttempt.jurisdictionCount,
        expectedJurisdiction,
      });
      return;
    }
    await deps.sleep(Math.min(pollIntervalMs, Math.max(0, deadline - Date.now())));
  }
  await deps.attachAttempts(testInfo, alias, attempts);
  const lastAttempt = attempts.at(-1);
  const probeSummary =
    lastAttempt?.probeResults?.map((probe) => `${probe.access}=${probe.status}/${probe.note ?? 'ok'}`).join(', ') ?? 'none';
  throw new Error(
    `Dynamic user EXUI propagation timed out after ${timeoutMs}ms for alias '${alias}'. Last observed statuses: auth=${
      lastAttempt?.authStatus ?? 'unknown'
    }, authenticated=${String(lastAttempt?.authenticated)}, userDetails=${
      lastAttempt?.userDetailsStatus ?? 'unknown'
    }, jurisdictions=${lastAttempt?.jurisdictionsStatus ?? 'unknown'}, userId=${
      lastAttempt?.userId ?? 'unresolved'
    }, note=${lastAttempt?.note ?? 'none'}, probes=${probeSummary}.`
  );
}

export async function provisionDynamicSolicitorForAlias({
  alias,
  professionalUserUtils,
  roleContext,
  roleNames,
  testInfo,
  mode = 'auto',
  assertEmploymentAssignmentPayloadAccepted = false,
}: ProvisionDynamicSolicitorArgs): Promise<DynamicProvisionHandle> {
  return provisionDynamicSolicitorForAliasFlow(
    {
      alias,
      professionalUserUtils,
      roleContext,
      roleNames,
      testInfo,
      mode,
      assertEmploymentAssignmentPayloadAccepted,
    },
    {
      shouldRunEmploymentAssignmentPreflight,
      runEmploymentAssignmentPreflight,
      provisionUserWithRetries,
      resolveProvisionTimeoutMs: resolveDynamicProvisionTimeoutMs,
      resolveProvisionMaxAttempts: resolveDynamicProvisionMaxAttempts,
      resolveProvisionRetryDelayMs: resolveDynamicProvisionRetryDelayMs,
      withTimeout,
      shouldRetryDynamicProvision,
      describeUnknownError,
      sleep,
      now: () => Date.now(),
      outputCreatedUserData: process.env.PW_DYNAMIC_USER_OUTPUT_CREATED_DATA === '1',
      attachProvisionAttempts,
      assertDynamicUserRoleContract,
      waitForExuiUserPropagation,
      attachDynamicUser: async (info, currentAlias, user) => {
        await info.attach(`${currentAlias.toLowerCase()}-dynamic-user.json`, {
          body: JSON.stringify(
            {
              alias: currentAlias,
              email: user.email,
              forename: user.forename,
              surname: user.surname,
              roleNames: user.roleNames,
              organisationAssignment: user.organisationAssignment,
            },
            null,
            2
          ),
          contentType: 'application/json',
        });
      },
      info: (message, meta) => logger.info(message, meta),
      warn: (message, meta) => logger.warn(message, meta),
    }
  );
}

async function provisionDynamicSolicitorForAliasFlow(
  {
    alias,
    professionalUserUtils,
    roleContext,
    roleNames,
    testInfo,
    mode = 'auto',
    assertEmploymentAssignmentPayloadAccepted = false,
  }: ProvisionDynamicSolicitorArgs,
  deps: ProvisionDynamicSolicitorFlowDeps
): Promise<DynamicProvisionHandle> {
  const organisationId = process.env.TEST_SOLICITOR_ORGANISATION_ID?.trim();
  if (!organisationId) {
    throw new Error('Missing dynamic-user prerequisite: TEST_SOLICITOR_ORGANISATION_ID');
  }
  const resolvedRoleNames = resolveProvisionRoleNamesForAlias({
    alias,
    roleContext,
    explicitRoleNames: roleNames,
  });

  if (deps.shouldRunEmploymentAssignmentPreflight(assertEmploymentAssignmentPayloadAccepted)) {
    await deps.runEmploymentAssignmentPreflight({
      professionalUserUtils,
      organisationId: organisationId,
      testInfo,
    });
  } else if (assertEmploymentAssignmentPayloadAccepted) {
    deps.info('Skipping employment assignment preflight (set PW_EMPLOYMENT_ASSIGNMENT_PREFLIGHT=1 to enable).', {
      alias,
      organisationId,
    });
  }

  const provisionTimeoutMs = deps.resolveProvisionTimeoutMs();
  const provisionMaxAttempts = deps.resolveProvisionMaxAttempts();
  const provisionRetryDelayMs = deps.resolveProvisionRetryDelayMs();
  const { user, attempts: provisionAttempts } = await deps.provisionUserWithRetries(
    {
      alias,
      organisationId,
      roleContext,
      roleNames: resolvedRoleNames,
      mode,
      timeoutMs: provisionTimeoutMs,
      maxAttempts: provisionMaxAttempts,
      retryDelayMs: provisionRetryDelayMs,
    },
    {
      createSolicitorUserForOrganisation: (params) => professionalUserUtils.createSolicitorUserForOrganisation(params),
      withTimeout: deps.withTimeout,
      shouldRetry: deps.shouldRetryDynamicProvision,
      describeError: deps.describeUnknownError,
      sleep: deps.sleep,
      now: deps.now,
      info: deps.info,
      warn: deps.warn,
      outputCreatedUserData: deps.outputCreatedUserData,
    }
  );
  await deps.attachProvisionAttempts(testInfo, alias, provisionAttempts);

  deps.assertDynamicUserRoleContract({
    alias,
    roleContext,
    resolvedRoleNames,
    user,
  });

  const sessionIdentity = buildDynamicSessionIdentity(alias, user);

  await deps.waitForExuiUserPropagation({
    alias,
    user,
    sessionIdentity,
    roleContext,
    testInfo,
  });

  await deps.attachDynamicUser(testInfo, alias, user);

  return {
    user,
    sessionIdentity,
  };
}

function assertIncludesRoles(actualRoles: readonly string[], expectedRoles: readonly string[], errorContext: string): void {
  const missing = expectedRoles.filter((role) => !actualRoles.includes(role));
  if (missing.length > 0) {
    throw new Error(`${errorContext}: missing role(s): ${missing.join(', ')}. Actual roles: ${actualRoles.join(', ')}`);
  }
}

function assertDynamicUserRoleContract({
  alias,
  roleContext,
  resolvedRoleNames,
  user,
}: {
  alias: DynamicSolicitorAlias;
  roleContext?: SolicitorRoleContext;
  resolvedRoleNames?: readonly string[];
  user: ProvisionedProfessionalUser;
}): void {
  if (resolvedRoleNames && resolvedRoleNames.length > 0) {
    const expectedRoles = resolvedRoleNames.filter((role) => !DYNAMIC_SOLICITOR_DISALLOWED_IDAM_ROLES.has(role));
    assertIncludesRoles(user.roleNames, expectedRoles, `Dynamic ${alias} IDAM role contract mismatch`);
  }

  const baselineRoles = getAliasBaselineRoles({ alias, roleContext });
  if (baselineRoles.length > 0) {
    assertIncludesRoles(user.roleNames, baselineRoles, `Dynamic ${alias} baseline IDAM role contract mismatch`);
  }

  if (alias === 'SEARCH_EMPLOYMENT_CASE' || alias === 'EMPLOYMENT_DYNAMIC_SOLICITOR') {
    assertIncludesRoles(
      user.organisationAssignment.roles,
      EMPLOYMENT_ASSIGNMENT_REQUIRED_ROLES,
      `Dynamic ${alias} assignment role contract mismatch`
    );
    for (const filteredRole of EMPLOYMENT_FILTERED_ASSIGNMENT_ROLES) {
      if (user.organisationAssignment.roles.includes(filteredRole)) {
        throw new Error(
          `Dynamic ${alias} assignment role contract mismatch: filtered role '${filteredRole}' was present in assignment payload.`
        );
      }
    }
  }

  if (alias === 'EMPLOYMENT_DYNAMIC_CASEWORKER') {
    assertIncludesRoles(
      user.organisationAssignment.roles,
      EMPLOYMENT_INTERNAL_ASSIGNMENT_REQUIRED_ROLES,
      `Dynamic ${alias} assignment role contract mismatch`
    );
    for (const filteredRole of EMPLOYMENT_FILTERED_ASSIGNMENT_ROLES) {
      if (user.organisationAssignment.roles.includes(filteredRole)) {
        throw new Error(
          `Dynamic ${alias} assignment role contract mismatch: filtered role '${filteredRole}' was present in assignment payload.`
        );
      }
    }
  }
}

async function runEmploymentAssignmentPreflight({
  professionalUserUtils,
  organisationId,
  testInfo,
}: {
  professionalUserUtils: ProfessionalUserUtils;
  organisationId: string;
  testInfo: TestInfo;
}): Promise<void> {
  const preflight = await professionalUserUtils.createSolicitorUserForOrganisation({
    organisationId,
    roleNames: EMPLOYMENT_ASSIGNMENT_ROLES_UNFILTERED,
    roleContext: {
      jurisdiction: 'employment',
      testType: 'case-create',
    },
    mode: 'external',
    resendInvite: false,
    outputCreatedUserData: false,
  });

  await testInfo.attach('employment-assignment-preflight.json', {
    body: JSON.stringify(
      {
        email: preflight.email,
        status: preflight.organisationAssignment.status,
        mode: preflight.organisationAssignment.mode,
        requestedRoles: EMPLOYMENT_ASSIGNMENT_ROLES_UNFILTERED,
        assignedRoles: preflight.organisationAssignment.roles,
      },
      null,
      2
    ),
    contentType: 'application/json',
  });

  const status = preflight.organisationAssignment.status;
  if (![200, 201, 202, 409].includes(status)) {
    throw new Error(`Employment assignment preflight failed: unexpected assignment status ${status}.`);
  }
  if (preflight.organisationAssignment.mode !== 'external') {
    throw new Error(
      `Employment assignment preflight failed: expected external mode, got ${preflight.organisationAssignment.mode}.`
    );
  }
  for (const filteredRole of EMPLOYMENT_FILTERED_ASSIGNMENT_ROLES) {
    if (preflight.organisationAssignment.roles.includes(filteredRole)) {
      throw new Error(`Employment assignment preflight failed: filtered role '${filteredRole}' present in assignment payload.`);
    }
  }
}

export const __test__ = {
  waitForExuiUserPropagation: (
    params: {
      alias: DynamicSolicitorAlias;
      user: ProvisionedProfessionalUser;
      sessionIdentity: SessionIdentity;
      roleContext?: SolicitorRoleContext;
      testInfo: TestInfo;
    },
    deps: WaitForExuiUserPropagationDeps
  ) => waitForExuiUserPropagation(params, deps),
  provisionDynamicSolicitorForAliasFlow: (args: ProvisionDynamicSolicitorArgs, deps: ProvisionDynamicSolicitorFlowDeps) =>
    provisionDynamicSolicitorForAliasFlow(args, deps),
  assertDynamicUserRoleContract: (args: {
    alias: DynamicSolicitorAlias;
    roleContext?: SolicitorRoleContext;
    resolvedRoleNames?: readonly string[];
    user: ProvisionedProfessionalUser;
  }) => assertDynamicUserRoleContract(args),
};
