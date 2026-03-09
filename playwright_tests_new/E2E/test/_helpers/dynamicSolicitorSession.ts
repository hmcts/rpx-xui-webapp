import { createLogger } from '@hmcts/playwright-common';
import { request, type TestInfo } from '@playwright/test';

import type {
  ProvisionedProfessionalUser,
  ProfessionalUserUtils,
  SolicitorRoleContext,
} from '../../utils/professional-user.utils';
import {
  DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES,
  DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES,
  EMPLOYMENT_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES,
} from '../../utils/professional-user.utils';
import config from '../../utils/config.utils';
import { ensureSessionCookies } from '../../../common/sessionCapture';

type DynamicSolicitorAlias =
  | 'SOLICITOR'
  | 'PROD_LIKE'
  | 'SEARCH_EMPLOYMENT_CASE'
  | 'EMPLOYMENT_DYNAMIC_CASEWORKER'
  | 'EMPLOYMENT_DYNAMIC_SOLICITOR'
  | 'USER_WITH_FLAGS';

type DynamicProvisionHandle = {
  user: ProvisionedProfessionalUser;
  cleanup: () => Promise<void>;
};

type CachedDynamicProvision = {
  user: ProvisionedProfessionalUser;
  previousUsername: string | undefined;
  previousPassword: string | undefined;
};

type DynamicProvisionAttempt = {
  attempt: number;
  durationMs: number;
  outcome: 'success' | 'failed';
  error?: string;
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

const logger = createLogger({
  serviceName: 'dynamic-solicitor-session',
  format: 'pretty',
});

const retryProvisionCache = new Map<string, CachedDynamicProvision>();
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

const USER_ENV_VARS: Record<DynamicSolicitorAlias, { username: string; password: string }> = {
  SOLICITOR: {
    username: 'SOLICITOR_USERNAME',
    password: 'SOLICITOR_PASSWORD',
  },
  PROD_LIKE: {
    username: 'PROD_LIKE_USERNAME',
    password: 'PROD_LIKE_PASSWORD',
  },
  SEARCH_EMPLOYMENT_CASE: {
    username: 'SEARCH_EMPLOYMENT_CASE_USERNAME',
    password: 'SEARCH_EMPLOYMENT_CASE_PASSWORD',
  },
  EMPLOYMENT_DYNAMIC_CASEWORKER: {
    username: 'EMPLOYMENT_DYNAMIC_CASEWORKER_USERNAME',
    password: 'EMPLOYMENT_DYNAMIC_CASEWORKER_PASSWORD',
  },
  EMPLOYMENT_DYNAMIC_SOLICITOR: {
    username: 'EMPLOYMENT_DYNAMIC_SOLICITOR_USERNAME',
    password: 'EMPLOYMENT_DYNAMIC_SOLICITOR_PASSWORD',
  },
  USER_WITH_FLAGS: {
    username: 'USER_WITH_FLAGS_USERNAME',
    password: 'USER_WITH_FLAGS_PASSWORD',
  },
};

const EMPLOYMENT_ASSIGNMENT_REQUIRED_ROLES = [
  'caseworker',
  'caseworker-employment',
  'caseworker-employment-legalrep-solicitor',
  'pui-case-manager',
] as const;

const EMPLOYMENT_INTERNAL_ASSIGNMENT_REQUIRED_ROLES = ['caseworker', 'caseworker-employment'] as const;

export const EMPLOYMENT_DYNAMIC_CASEWORKER_ROLES = ['caseworker', 'caseworker-employment', 'caseworker-employment-api'] as const;

export const EMPLOYMENT_DYNAMIC_SOLICITOR_ROLES = [...EMPLOYMENT_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES] as const;

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

export const DIVORCE_FLAGS_DYNAMIC_SOLICITOR_ROLES = [...DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES] as const;

const DYNAMIC_SOLICITOR_DISALLOWED_IDAM_ROLES = new Set<string>([
  'pui-user-manager',
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-caa',
]);

type DivorceSolicitorRoleSet = 'external-core' | 'external-noc';

function toRetryCacheKey(testInfo: TestInfo, alias: DynamicSolicitorAlias): string {
  return `${testInfo.project.name}::${testInfo.file}::${testInfo.title}::${alias}`;
}

function hasRetriesRemaining(testInfo: TestInfo): boolean {
  return testInfo.retry < testInfo.project.retries;
}

function shouldPreserveProvisionForRetry(testInfo: TestInfo): boolean {
  const failed = testInfo.status !== testInfo.expectedStatus;
  return failed && hasRetriesRemaining(testInfo);
}

function restoreEnvCredential(key: string, previousValue: string | undefined): void {
  if (typeof previousValue === 'undefined') {
    delete process.env[key];
    return;
  }
  process.env[key] = previousValue;
}

function isTruthy(value: string | undefined): boolean {
  return truthyValues.has((value ?? '').trim().toLowerCase());
}

function shouldRunEmploymentAssignmentPreflight(assertEmploymentAssignmentPayloadAccepted: boolean): boolean {
  if (!assertEmploymentAssignmentPayloadAccepted) {
    return false;
  }
  return isTruthy(process.env.PW_EMPLOYMENT_ASSIGNMENT_PREFLIGHT);
}

function parseRoleList(value: string | undefined): string[] {
  if (!value) {
    return [];
  }
  return [
    ...new Set(
      value
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
    ),
  ];
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

function normaliseDivorceSolicitorRoleSet(value: string | undefined): DivorceSolicitorRoleSet | undefined {
  if (!value) {
    return undefined;
  }

  const normalised = value.trim().toLowerCase();
  switch (normalised) {
    case 'external-core':
    case 'external_core':
    case 'core':
    case 'documented':
      return 'external-core';
    case 'external-noc':
    case 'external_noc':
    case 'noc':
    case 'notice-of-change':
    case 'notice_of_change':
      return 'external-noc';
    default:
      return undefined;
  }
}

function resolveDynamicDivorceSolicitorRoleNames(roleContext?: SolicitorRoleContext): string[] | undefined {
  const jurisdiction = roleContext?.jurisdiction?.trim().toLowerCase();
  if (jurisdiction !== 'divorce' && jurisdiction !== 'finrem') {
    return undefined;
  }

  const configuredRoleSet = normaliseDivorceSolicitorRoleSet(process.env.DYNAMIC_DIVORCE_SOLICITOR_ROLE_SET);
  if (!configuredRoleSet) {
    return undefined;
  }

  return configuredRoleSet === 'external-noc'
    ? [...DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES]
    : [...DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES];
}

function resolveJurisdictionAccesses(roleContext?: SolicitorRoleContext): Array<'read' | 'create'> {
  const accesses: Array<'read' | 'create'> = ['read'];
  if (roleContext?.testType?.trim().toLowerCase() === 'case-create') {
    accesses.push('create');
  }
  return accesses;
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
  return error instanceof Error ? error.message : String(error);
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

async function waitForExuiUserPropagation({
  alias,
  user,
  roleContext,
  testInfo,
}: {
  alias: DynamicSolicitorAlias;
  user: ProvisionedProfessionalUser;
  roleContext?: SolicitorRoleContext;
  testInfo: TestInfo;
}): Promise<void> {
  const timeoutMs = resolveDynamicSolicitorExuiReadyTimeoutMs();
  const pollIntervalMs = resolveDynamicSolicitorExuiReadyPollIntervalMs();
  const baseUrl = config.urls.baseURL || config.urls.exuiDefaultUrl || 'https://manage-case.aat.platform.hmcts.net';
  const attempts: DynamicExuiReadinessAttempt[] = [];
  const startedAt = Date.now();
  const deadline = startedAt + timeoutMs;
  const expectedJurisdiction = roleContext?.jurisdiction?.trim().toLowerCase();
  const requiredAccesses = resolveJurisdictionAccesses(roleContext);
  let attempt = 0;
  while (Date.now() < deadline) {
    attempt += 1;
    const readinessAttempt: DynamicExuiReadinessAttempt = {
      attempt,
      elapsedMs: Date.now() - startedAt,
      ready: false,
      expectedJurisdiction,
      jurisdictionAccesses: requiredAccesses,
    };

    try {
      const session = await ensureSessionCookies(alias);
      readinessAttempt.authenticated = session.cookies.length > 0;

      const apiContext = await request.newContext({
        baseURL: baseUrl,
        ignoreHTTPSErrors: true,
        storageState: session.storageFile,
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      try {
        const userDetailsResponse = await apiContext.get('/api/user/details', { failOnStatusCode: false });
        readinessAttempt.userDetailsStatus = userDetailsResponse.status();
        readinessAttempt.authStatus = userDetailsResponse.status();
        const userId =
          userDetailsResponse.status() === 200 ? toUserId(await userDetailsResponse.json().catch(() => undefined)) : undefined;
        readinessAttempt.userId = userId;

        if (!userId) {
          readinessAttempt.note = 'user-details-not-ready';
        } else {
          const probeResults: DynamicJurisdictionProbeResult[] = [];
          for (const access of requiredAccesses) {
            const jurisdictionsResponse = await apiContext.get(
              `/aggregated/caseworkers/${encodeURIComponent(userId)}/jurisdictions?access=${access}`,
              { failOnStatusCode: false }
            );
            const status = jurisdictionsResponse.status();
            const responsePayload =
              status === 200
                ? await jurisdictionsResponse.json().catch(() => undefined)
                : await jurisdictionsResponse.text().catch(() => undefined);
            const jurisdictionIds = Array.isArray(responsePayload)
              ? responsePayload
                  .map((entry) =>
                    typeof entry === 'object' && entry && 'id' in entry && typeof entry.id === 'string'
                      ? entry.id.trim().toLowerCase()
                      : ''
                  )
                  .filter(Boolean)
              : [];
            const hasExpectedJurisdiction = expectedJurisdiction ? jurisdictionIds.includes(expectedJurisdiction) : true;
            const ready = status === 200 && jurisdictionIds.length > 0 && hasExpectedJurisdiction;
            probeResults.push({
              access,
              status,
              ready,
              jurisdictionCount: jurisdictionIds.length,
              hasExpectedJurisdiction,
              note:
                status !== 200
                  ? 'jurisdictions-not-ready'
                  : jurisdictionIds.length === 0
                    ? 'jurisdictions-empty'
                    : hasExpectedJurisdiction
                      ? undefined
                      : 'expected-jurisdiction-not-ready',
              responsePreview: truncateForDiagnostics(responsePayload),
            });
          }

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
      } finally {
        await apiContext.dispose();
      }
    } catch (error) {
      readinessAttempt.authenticated = false;
      readinessAttempt.note = describeUnknownError(error);
    }

    attempts.push(readinessAttempt);
    if (readinessAttempt.ready) {
      await attachExuiReadinessAttempts(testInfo, alias, attempts);
      logger.info('Dynamic solicitor became visible to EXUI.', {
        alias,
        email: user.email,
        elapsedMs: readinessAttempt.elapsedMs,
        userId: readinessAttempt.userId,
        jurisdictionCount: readinessAttempt.jurisdictionCount,
        expectedJurisdiction,
      });
      return;
    }

    await sleep(Math.min(pollIntervalMs, Math.max(0, deadline - Date.now())));
  }

  await attachExuiReadinessAttempts(testInfo, alias, attempts);
  const lastAttempt = attempts[attempts.length - 1];
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

function hasScenarioRoleContext(roleContext?: SolicitorRoleContext): boolean {
  if (!roleContext) {
    return false;
  }

  return Boolean(roleContext.jurisdiction || roleContext.testType || roleContext.caseType?.trim());
}

function resolveAliasTemplateRoleNames(alias: DynamicSolicitorAlias): string[] | undefined {
  const fallbackTemplate = parseRoleList(process.env.ORG_USER_ASSIGNMENT_USER_ROLES);
  const explicitSolicitorTemplate = parseRoleList(process.env.DYNAMIC_SOLICITOR_TEMPLATE_ROLES);
  const explicitProdLikeTemplate = parseRoleList(process.env.DYNAMIC_PROD_LIKE_TEMPLATE_ROLES);

  if (alias === 'PROD_LIKE') {
    const resolved =
      explicitProdLikeTemplate.length > 0
        ? explicitProdLikeTemplate
        : explicitSolicitorTemplate.length > 0
          ? explicitSolicitorTemplate
          : fallbackTemplate;
    return resolved.length > 0 ? resolved : undefined;
  }

  if (alias === 'SOLICITOR') {
    return explicitSolicitorTemplate.length > 0 ? explicitSolicitorTemplate : undefined;
  }

  return undefined;
}

export function resolveProvisionRoleNamesForAlias({
  alias,
  roleContext,
  explicitRoleNames,
}: {
  alias: DynamicSolicitorAlias;
  roleContext?: SolicitorRoleContext;
  explicitRoleNames?: readonly string[];
}): string[] | undefined {
  if (explicitRoleNames && explicitRoleNames.length > 0) {
    return [...new Set(explicitRoleNames.map((entry) => entry.trim()).filter(Boolean))];
  }

  const aliasTemplateRoles = resolveAliasTemplateRoleNames(alias);
  if (aliasTemplateRoles && aliasTemplateRoles.length > 0) {
    return aliasTemplateRoles;
  }

  if (alias === 'SOLICITOR') {
    const divorceRoleSetRoles = resolveDynamicDivorceSolicitorRoleNames(roleContext);
    if (divorceRoleSetRoles && divorceRoleSetRoles.length > 0) {
      return divorceRoleSetRoles;
    }
  }

  if (hasScenarioRoleContext(roleContext)) {
    return undefined;
  }
  return undefined;
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
  const organisationId = process.env.TEST_SOLICITOR_ORGANISATION_ID?.trim();
  if (!organisationId) {
    throw new Error('Missing dynamic-user prerequisite: TEST_SOLICITOR_ORGANISATION_ID');
  }

  const envKeys = USER_ENV_VARS[alias];
  const cacheKey = toRetryCacheKey(testInfo, alias);
  const cached = retryProvisionCache.get(cacheKey);
  if (cached) {
    process.env[envKeys.username] = cached.user.email;
    process.env[envKeys.password] = cached.user.password;
    await testInfo.attach(`${alias.toLowerCase()}-dynamic-user.json`, {
      body: JSON.stringify(
        {
          alias,
          reusedFromRetryCache: true,
          email: cached.user.email,
          forename: cached.user.forename,
          surname: cached.user.surname,
          roleNames: cached.user.roleNames,
          organisationAssignment: cached.user.organisationAssignment,
        },
        null,
        2
      ),
      contentType: 'application/json',
    });
    return {
      user: cached.user,
      cleanup: async () => {
        if (shouldPreserveProvisionForRetry(testInfo)) {
          logger.info('Preserving dynamic user for next retry attempt', {
            alias,
            email: cached.user.email,
            retry: testInfo.retry,
            retriesConfigured: testInfo.project.retries,
          });
          return;
        }

        restoreEnvCredential(envKeys.username, cached.previousUsername);
        restoreEnvCredential(envKeys.password, cached.previousPassword);
        retryProvisionCache.delete(cacheKey);
      },
    };
  }

  const previousUsername = process.env[envKeys.username];
  const previousPassword = process.env[envKeys.password];
  const resolvedRoleNames = resolveProvisionRoleNamesForAlias({
    alias,
    roleContext,
    explicitRoleNames: roleNames,
  });

  if (shouldRunEmploymentAssignmentPreflight(assertEmploymentAssignmentPayloadAccepted)) {
    await runEmploymentAssignmentPreflight({
      professionalUserUtils,
      organisationId: organisationId!,
      testInfo,
    });
  } else if (assertEmploymentAssignmentPayloadAccepted) {
    logger.info('Skipping employment assignment preflight (set PW_EMPLOYMENT_ASSIGNMENT_PREFLIGHT=1 to enable).', {
      alias,
      organisationId,
    });
  }

  const provisionTimeoutMs = resolveDynamicProvisionTimeoutMs();
  const provisionMaxAttempts = resolveDynamicProvisionMaxAttempts();
  const provisionRetryDelayMs = resolveDynamicProvisionRetryDelayMs();
  const provisionAttempts: DynamicProvisionAttempt[] = [];
  let user: ProvisionedProfessionalUser | undefined;
  let lastProvisionError: unknown;

  for (let attempt = 1; attempt <= provisionMaxAttempts; attempt += 1) {
    const startedAt = Date.now();
    try {
      logger.info('Provisioning dynamic solicitor user', {
        alias,
        attempt,
        maxAttempts: provisionMaxAttempts,
        timeoutMs: provisionTimeoutMs,
        roleContext,
        roleNames: resolvedRoleNames,
        mode,
      });
      user = await withTimeout(
        professionalUserUtils.createSolicitorUserForOrganisation({
          organisationId: organisationId!,
          roleContext,
          roleNames: resolvedRoleNames,
          mode,
          resendInvite: false,
          outputCreatedUserData: process.env.PW_DYNAMIC_USER_OUTPUT_CREATED_DATA === '1',
        }),
        provisionTimeoutMs,
        `Dynamic user provisioning timed out after ${provisionTimeoutMs}ms for alias '${alias}' on attempt ${attempt}/${provisionMaxAttempts}.`
      );
      provisionAttempts.push({
        attempt,
        durationMs: Date.now() - startedAt,
        outcome: 'success',
      });
      break;
    } catch (error) {
      const errorMessage = describeUnknownError(error);
      const retryable = shouldRetryDynamicProvision(error);
      provisionAttempts.push({
        attempt,
        durationMs: Date.now() - startedAt,
        outcome: 'failed',
        error: errorMessage,
      });
      lastProvisionError = error;
      logger.warn('Dynamic solicitor provisioning attempt failed', {
        alias,
        attempt,
        maxAttempts: provisionMaxAttempts,
        retryable,
        retryDelayMs: provisionRetryDelayMs,
        error: errorMessage,
      });
      if (attempt === provisionMaxAttempts || !retryable) {
        break;
      }
      await sleep(provisionRetryDelayMs);
    }
  }

  await attachProvisionAttempts(testInfo, alias, provisionAttempts);

  if (!user) {
    const lastErrorMessage = describeUnknownError(lastProvisionError);
    throw new Error(
      `Dynamic user provisioning failed for alias '${alias}' after ${provisionAttempts.length} attempt(s). Last error: ${lastErrorMessage}`
    );
  }

  assertDynamicUserRoleContract({
    alias,
    roleContext,
    resolvedRoleNames,
    user,
  });

  process.env[envKeys.username] = user.email;
  process.env[envKeys.password] = user.password;

  await waitForExuiUserPropagation({
    alias,
    user,
    roleContext,
    testInfo,
  });
  retryProvisionCache.set(cacheKey, {
    user,
    previousUsername,
    previousPassword,
  });

  await testInfo.attach(`${alias.toLowerCase()}-dynamic-user.json`, {
    body: JSON.stringify(
      {
        alias,
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

  return {
    user,
    cleanup: async () => {
      const provision = retryProvisionCache.get(cacheKey) ?? {
        user,
        previousUsername,
        previousPassword,
      };
      if (shouldPreserveProvisionForRetry(testInfo)) {
        logger.info('Preserving dynamic user for next retry attempt', {
          alias,
          email: provision.user.email,
          retry: testInfo.retry,
          retriesConfigured: testInfo.project.retries,
        });
        return;
      }

      restoreEnvCredential(envKeys.username, provision.previousUsername);
      restoreEnvCredential(envKeys.password, provision.previousPassword);

      retryProvisionCache.delete(cacheKey);
    },
  };
}

function assertIncludesRoles(actualRoles: readonly string[], expectedRoles: readonly string[], errorContext: string): void {
  const missing = expectedRoles.filter((role) => !actualRoles.includes(role));
  if (missing.length > 0) {
    throw new Error(`${errorContext}: missing role(s): ${missing.join(', ')}. Actual roles: ${actualRoles.join(', ')}`);
  }
}

function getAliasBaselineRoles({
  alias,
  roleContext,
}: {
  alias: DynamicSolicitorAlias;
  roleContext?: SolicitorRoleContext;
}): string[] {
  if (alias === 'EMPLOYMENT_DYNAMIC_CASEWORKER') {
    return [...EMPLOYMENT_DYNAMIC_CASEWORKER_ROLES];
  }
  if (alias === 'SEARCH_EMPLOYMENT_CASE' || alias === 'EMPLOYMENT_DYNAMIC_SOLICITOR') {
    return ['caseworker-employment', 'caseworker-employment-legalrep-solicitor', 'pui-case-manager'];
  }
  if (alias === 'USER_WITH_FLAGS') {
    return [...DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES];
  }
  if (alias === 'SOLICITOR' && ['divorce', 'finrem'].includes(roleContext?.jurisdiction?.trim().toLowerCase() ?? '')) {
    return [...(resolveDynamicDivorceSolicitorRoleNames(roleContext) ?? DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES)];
  }
  return [];
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
