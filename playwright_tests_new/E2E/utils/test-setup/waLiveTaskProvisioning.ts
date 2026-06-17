import { randomUUID } from 'node:crypto';

import { IdamUtils, ServiceAuthUtils } from '@hmcts/playwright-common';
import { request, type APIRequestContext, type TestInfo } from '@playwright/test';

import type { ProfessionalUserInfo } from '../professional-user/types';

type Env = NodeJS.ProcessEnv;

type RequestFactory = typeof request.newContext;

type TokenDeps = {
  env?: Env;
  idamUtils?: Pick<IdamUtils, 'generateIdamToken'>;
  serviceAuthUtils?: Pick<ServiceAuthUtils, 'retrieveToken'>;
};

type ProvisionDeps = TokenDeps & {
  newContext?: RequestFactory;
  now?: () => Date;
  uuid?: () => string;
};

export type WaRoleAssignmentCleanupResult = {
  assignmentId?: string;
  reference?: string;
  status: number | 'skipped';
  ok: boolean;
  note?: string;
};

export type WaTaskProvisioningResult = {
  attempted: boolean;
  taskId?: string;
  roleAssignmentIds: string[];
  roleAssignmentReference?: string;
  diagnostics: {
    mode: string;
    workflowApiUrl?: string;
    roleAssignmentApiUrl?: string;
    missing: string[];
    roleAssignmentStatus?: number;
    workflowStatus?: number;
    skipped?: string;
  };
};

export type WaTaskProvisioningReadiness = {
  ready: boolean;
  mode: string;
  missing: string[];
  skipped?: string;
};

type WaProvisioningInput = {
  user: Pick<ProfessionalUserInfo, 'id' | 'email' | 'password'>;
  caseNumber: string;
  jurisdiction: string;
  caseType: string;
  testInfo: TestInfo;
};

type WaTaskVariablesInput = {
  taskId: string;
  caseNumber: string;
  jurisdiction: string;
  caseType: string;
  taskName: string;
  taskType: string;
  dueDate: string;
};

type RoleAssignmentInput = {
  actorId: string;
  jurisdiction: string;
  caseType: string;
  roleNames?: readonly string[];
  beginTime: string;
  reference: string;
};

const DEFAULT_LOCATION_ID = '765324';
const DEFAULT_LOCATION_NAME = 'Taylor House';
const DEFAULT_TASK_NAME = 'Review dynamic Manage Tasks case';
const DEFAULT_TASK_TYPE = 'reviewDynamicManageTasksCase';
const DEFAULT_TASK_CATEGORY = 'Case Progression';
const DEFAULT_SECURITY_CLASSIFICATION = 'PUBLIC';
const DEFAULT_CASE_MANAGEMENT_CATEGORY = 'Protection';
const DEFAULT_ROLE_NAMES = ['tribunal-caseworker', 'task-supervisor'] as const;
const ROLE_ASSIGNMENT_PROCESS = 'playwright-manage-tasks-live-setup';

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  return values.map((value) => value?.trim()).find((value): value is string => Boolean(value));
}

function stripBearerPrefix(value: string): string {
  return value.replace(/^Bearer\s+/i, '').trim();
}

function withBearerPrefix(value: string): string {
  return /^Bearer\s+/i.test(value) ? value : `Bearer ${value}`;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function resolveProvisioningMode(env: Env = process.env): string {
  return firstNonEmpty(env.PW_E2E_MANAGE_TASKS_WA_PROVISIONING, env.PW_E2E_WA_TASK_PROVISIONING) ?? 'auto';
}

function shouldProvision(mode: string): boolean {
  return ['auto', 'workflow', 'direct', 'true', '1'].includes(mode.toLowerCase());
}

function requiresProvisioning(mode: string): boolean {
  return ['workflow', 'direct', 'true', '1'].includes(mode.toLowerCase());
}

function buildRoleAssignmentReference(caseNumber: string): string {
  return `playwright-manage-tasks-${caseNumber}`;
}

function resolveWorkflowApiUrl(env: Env = process.env): string | undefined {
  return firstNonEmpty(env.SERVICES_WA_WORKFLOW_API_URL, env.WA_WORKFLOW_API_URL, env.WA_WORKFLOW_API);
}

function resolveRoleAssignmentApiUrl(env: Env = process.env): string | undefined {
  return firstNonEmpty(env.SERVICES_ROLE_ASSIGNMENT_API, env.ROLE_ASSIGNMENT_API_URL, env.AM_ROLE_ASSIGNMENT_SERVICE_URL);
}

function resolveAdminBearerToken(env: Env = process.env): string | undefined {
  return firstNonEmpty(
    env.PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN,
    env.ORG_USER_ASSIGNMENT_BEARER_TOKEN,
    env.CREATE_USER_BEARER_TOKEN
  );
}

export function resolveWaTaskProvisioningReadiness(
  env: Env = process.env,
  options: { requireBearerToken?: boolean } = {}
): WaTaskProvisioningReadiness {
  const requireBearerToken = options.requireBearerToken ?? true;
  const mode = resolveProvisioningMode(env);
  const missing = [
    resolveWorkflowApiUrl(env) ? undefined : 'SERVICES_WA_WORKFLOW_API_URL',
    resolveRoleAssignmentApiUrl(env) ? undefined : 'SERVICES_ROLE_ASSIGNMENT_API',
    !requireBearerToken || resolveAdminBearerToken(env)
      ? undefined
      : 'ORG_USER_ASSIGNMENT_BEARER_TOKEN or PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN',
  ].filter((value): value is string => Boolean(value));

  if (!shouldProvision(mode)) {
    return {
      ready: false,
      mode,
      missing: [],
      skipped: 'WA task provisioning disabled by PW_E2E_MANAGE_TASKS_WA_PROVISIONING.',
    };
  }

  if (missing.length > 0) {
    return {
      ready: false,
      mode,
      missing,
      skipped: `WA task provisioning prerequisites missing: ${missing.join(', ')}.`,
    };
  }

  return {
    ready: true,
    mode,
    missing: [],
  };
}

function resolveClientSecret(env: Env = process.env): string | undefined {
  return firstNonEmpty(
    env.PW_E2E_MANAGE_TASKS_IDAM_SECRET,
    env.ORG_USER_ASSIGNMENT_CLIENT_SECRET,
    env.CREATE_USER_CLIENT_SECRET,
    env.IDAM_SECRET
  );
}

function resolveClientId(env: Env = process.env): string {
  return (
    firstNonEmpty(
      env.PW_E2E_MANAGE_TASKS_IDAM_CLIENT_ID,
      env.ORG_USER_ASSIGNMENT_CLIENT_ID,
      env.CREATE_USER_CLIENT_ID,
      env.IDAM_CLIENT_ID,
      env.SERVICES_IDAM_CLIENT_ID
    ) ?? 'xuiwebapp'
  );
}

function resolveRedirectUri(env: Env = process.env): string | undefined {
  return firstNonEmpty(env.IDAM_RETURN_URL, env.REDIRECT_URI);
}

function resolveScope(env: Env = process.env): string {
  return (
    firstNonEmpty(
      env.PW_E2E_MANAGE_TASKS_IDAM_SCOPE,
      env.ORG_USER_ASSIGNMENT_OAUTH2_SCOPE,
      env.CREATE_USER_SCOPE,
      env.IDAM_OAUTH2_SCOPE
    ) ?? 'openid profile roles manage-user search-user'
  );
}

async function resolveServiceToken(deps: TokenDeps = {}): Promise<string | undefined> {
  const env = deps.env ?? process.env;
  const fromEnv = firstNonEmpty(env.S2S_TOKEN);
  if (fromEnv) {
    return stripBearerPrefix(fromEnv);
  }

  const serviceAuthUtils = deps.serviceAuthUtils ?? new ServiceAuthUtils();
  const microservice = firstNonEmpty(env.S2S_MICROSERVICE_NAME, env.MICROSERVICE) ?? 'xui_webapp';
  const token = await serviceAuthUtils.retrieveToken({ microservice });
  return stripBearerPrefix(token);
}

async function resolveUserBearerToken(
  user: Pick<ProfessionalUserInfo, 'email' | 'password'>,
  deps: TokenDeps = {}
): Promise<string | undefined> {
  const env = deps.env ?? process.env;
  const clientSecret = resolveClientSecret(env);
  if (!clientSecret) {
    return undefined;
  }

  const idamUtils = deps.idamUtils ?? new IdamUtils();
  return idamUtils.generateIdamToken({
    grantType: 'password',
    clientId: resolveClientId(env),
    clientSecret,
    scope: resolveScope(env),
    username: user.email,
    password: user.password,
    redirectUri: resolveRedirectUri(env),
  });
}

function processVariable(value: string | boolean) {
  return { value };
}

export function buildWaCreateTaskMessage({
  taskId,
  caseNumber,
  jurisdiction,
  caseType,
  taskName,
  taskType,
  dueDate,
}: WaTaskVariablesInput) {
  return {
    messageName: 'createTaskMessage',
    processVariables: {
      caseId: processVariable(caseNumber),
      jurisdiction: processVariable(jurisdiction),
      caseTypeId: processVariable(caseType),
      caseType: processVariable(caseType),
      region: processVariable('1'),
      location: processVariable(DEFAULT_LOCATION_ID),
      locationName: processVariable(DEFAULT_LOCATION_NAME),
      staffLocation: processVariable(DEFAULT_LOCATION_NAME),
      securityClassification: processVariable(DEFAULT_SECURITY_CLASSIFICATION),
      name: processVariable(taskName),
      taskId: processVariable(taskId),
      taskType: processVariable(taskType),
      taskCategory: processVariable(DEFAULT_TASK_CATEGORY),
      taskState: processVariable('unconfigured'),
      dueDate: processVariable(dueDate),
      delayUntil: processVariable(''),
      workingDaysAllowed: processVariable('2'),
      hasWarnings: processVariable(false),
      warningList: processVariable(''),
      caseManagementCategory: processVariable(DEFAULT_CASE_MANAGEMENT_CATEGORY),
      description: processVariable(`Dynamic Manage Tasks E2E task for case ${caseNumber}`),
      'task-supervisor': processVariable('Read,Refer,Manage,Cancel'),
      'tribunal-caseworker': processVariable('Read,Refer,Own,Manage,Cancel'),
      'senior-tribunal-caseworker': processVariable('Read,Refer,Own,Manage,Cancel'),
    },
    caseId: caseNumber,
  };
}

export function buildWaRoleAssignmentRequest({
  actorId,
  jurisdiction,
  caseType,
  roleNames = DEFAULT_ROLE_NAMES,
  beginTime,
  reference,
}: RoleAssignmentInput) {
  return {
    roleRequest: {
      assignerId: actorId,
      process: ROLE_ASSIGNMENT_PROCESS,
      reference,
      replaceExisting: false,
    },
    requestedRoles: roleNames.map((roleName) => ({
      actorId,
      actorIdType: 'IDAM',
      classification: DEFAULT_SECURITY_CLASSIFICATION,
      grantType: 'STANDARD',
      readOnly: false,
      roleCategory: 'LEGAL_OPERATIONS',
      roleName,
      roleType: 'ORGANISATION',
      beginTime,
      attributes: {
        jurisdiction,
        caseType,
        primaryLocation: DEFAULT_LOCATION_ID,
        baseLocation: DEFAULT_LOCATION_ID,
      },
      authorisations: [jurisdiction],
    })),
  };
}

function extractRoleAssignmentIds(payload: unknown): string[] {
  if (!payload || typeof payload !== 'object') {
    return [];
  }
  const record = payload as Record<string, unknown>;
  const roleAssignmentResponse = record.roleAssignmentResponse;
  const roleAssignmentRecord =
    roleAssignmentResponse && typeof roleAssignmentResponse === 'object'
      ? (roleAssignmentResponse as Record<string, unknown>)
      : record;
  const requestedRoles = roleAssignmentRecord.requestedRoles;
  if (!Array.isArray(requestedRoles)) {
    return [];
  }
  return requestedRoles
    .map((role) => {
      if (!role || typeof role !== 'object') {
        return undefined;
      }
      const id = (role as Record<string, unknown>).id;
      return typeof id === 'string' && id.trim() ? id.trim() : undefined;
    })
    .filter((id): id is string => Boolean(id));
}

function summarizeErrorPayload(payload: unknown): string {
  if (typeof payload === 'string') {
    return payload.slice(0, 500);
  }
  try {
    return JSON.stringify(payload).slice(0, 500);
  } catch {
    return String(payload).slice(0, 500);
  }
}

async function readPayload(response: { json: () => Promise<unknown>; text: () => Promise<string> }): Promise<unknown> {
  return response.json().catch(async () => response.text().catch(() => ''));
}

async function postRoleAssignments(params: {
  context: APIRequestContext;
  actorId: string;
  jurisdiction: string;
  caseType: string;
  caseNumber: string;
  beginTime: string;
}) {
  const reference = buildRoleAssignmentReference(params.caseNumber);
  const response = await params.context.post('/am/role-assignments', {
    data: buildWaRoleAssignmentRequest({
      actorId: params.actorId,
      jurisdiction: params.jurisdiction,
      caseType: params.caseType,
      beginTime: params.beginTime,
      reference,
    }),
    failOnStatusCode: false,
  });
  const payload = await readPayload(response);
  const status = response.status();
  if (status < 200 || status >= 300) {
    throw new Error(`WA role assignment creation failed with HTTP ${status}: ${summarizeErrorPayload(payload)}`);
  }
  return {
    status,
    ids: extractRoleAssignmentIds(payload),
    reference,
  };
}

async function deleteRoleAssignments(
  context: APIRequestContext,
  roleAssignmentIds: readonly string[],
  roleAssignmentReference?: string
): Promise<WaRoleAssignmentCleanupResult[]> {
  if (roleAssignmentReference?.trim()) {
    const reference = roleAssignmentReference.trim();
    const response = await context.delete(
      `/am/role-assignments?process=${encodeURIComponent(ROLE_ASSIGNMENT_PROCESS)}&reference=${encodeURIComponent(reference)}`,
      {
        failOnStatusCode: false,
      }
    );
    const status = response.status();
    return [
      {
        reference,
        status,
        ok: status === 204 || status === 404,
        note: status === 404 ? 'already absent' : undefined,
      },
    ];
  }

  const uniqueIds = [...new Set(roleAssignmentIds.map((id) => id.trim()).filter(Boolean))];
  const results: WaRoleAssignmentCleanupResult[] = [];

  for (const assignmentId of uniqueIds) {
    const response = await context.delete(`/am/role-assignments/${encodeURIComponent(assignmentId)}`, {
      failOnStatusCode: false,
    });
    const status = response.status();
    results.push({
      assignmentId,
      status,
      ok: status === 204 || status === 404,
      note: status === 404 ? 'already absent' : undefined,
    });
  }

  return results;
}

async function attachRoleAssignmentCleanup(testInfo: TestInfo, cleanup: readonly WaRoleAssignmentCleanupResult[]): Promise<void> {
  await testInfo.attach('manage-tasks-wa-role-assignment-cleanup.json', {
    body: JSON.stringify({ cleanup }, null, 2),
    contentType: 'application/json',
  });
}

async function postWorkflowMessage(params: {
  context: APIRequestContext;
  taskId: string;
  caseNumber: string;
  jurisdiction: string;
  caseType: string;
  dueDate: string;
}) {
  const response = await params.context.post('/workflow/message', {
    data: buildWaCreateTaskMessage({
      taskId: params.taskId,
      caseNumber: params.caseNumber,
      jurisdiction: params.jurisdiction,
      caseType: params.caseType,
      taskName: DEFAULT_TASK_NAME,
      taskType: DEFAULT_TASK_TYPE,
      dueDate: params.dueDate,
    }),
    failOnStatusCode: false,
  });
  const payload = await readPayload(response);
  const status = response.status();
  if (status < 200 || status >= 300) {
    throw new Error(`WA workflow task creation failed with HTTP ${status}: ${summarizeErrorPayload(payload)}`);
  }
  return status;
}

export async function provisionWaTaskForManageTasksCase({
  user,
  caseNumber,
  jurisdiction,
  caseType,
  testInfo,
}: WaProvisioningInput): Promise<WaTaskProvisioningResult> {
  return provisionWaTaskForManageTasksCaseWithDeps(
    {
      user,
      caseNumber,
      jurisdiction,
      caseType,
      testInfo,
    },
    {}
  );
}

export async function provisionWaTaskForManageTasksCaseWithDeps(
  { user, caseNumber, jurisdiction, caseType, testInfo }: WaProvisioningInput,
  deps: ProvisionDeps
): Promise<WaTaskProvisioningResult> {
  const env = deps.env ?? process.env;
  const mode = resolveProvisioningMode(env);
  const workflowApiUrl = resolveWorkflowApiUrl(env);
  const roleAssignmentApiUrl = resolveRoleAssignmentApiUrl(env);
  const adminBearerToken = resolveAdminBearerToken(env);
  const readiness = resolveWaTaskProvisioningReadiness(env);

  const baseDiagnostics = {
    mode,
    workflowApiUrl,
    roleAssignmentApiUrl,
    missing: readiness.missing,
  };

  if (!shouldProvision(mode)) {
    const result = {
      attempted: false,
      roleAssignmentIds: [],
      diagnostics: {
        ...baseDiagnostics,
        skipped: 'WA task provisioning disabled by PW_E2E_MANAGE_TASKS_WA_PROVISIONING.',
      },
    };
    await testInfo.attach('manage-tasks-wa-provisioning.json', {
      body: JSON.stringify(result, null, 2),
      contentType: 'application/json',
    });
    return result;
  }

  if (readiness.missing.length > 0) {
    const result = {
      attempted: false,
      roleAssignmentIds: [],
      diagnostics: {
        ...baseDiagnostics,
        skipped: readiness.skipped,
      },
    };
    await testInfo.attach('manage-tasks-wa-provisioning.json', {
      body: JSON.stringify(result, null, 2),
      contentType: 'application/json',
    });
    if (requiresProvisioning(mode)) {
      throw new Error(
        `WA task provisioning is required by PW_E2E_MANAGE_TASKS_WA_PROVISIONING='${mode}', ` +
          `but prerequisites are missing: ${readiness.missing.join(', ')}.`
      );
    }
    return result;
  }

  const serviceToken = await resolveServiceToken(deps);
  if (!serviceToken) {
    throw new Error('WA task provisioning requires an S2S token. Set S2S_TOKEN or S2S service auth configuration.');
  }

  const userBearerToken = await resolveUserBearerToken(user, deps);
  if (!userBearerToken) {
    throw new Error(
      'WA task provisioning requires a password-grant token for the dynamic user. Set IDAM_SECRET or PW_E2E_MANAGE_TASKS_IDAM_SECRET.'
    );
  }

  const newContext = deps.newContext ?? request.newContext.bind(request);
  const now = deps.now?.() ?? new Date();
  const taskId = deps.uuid?.() ?? randomUUID();
  let roleContext: APIRequestContext | undefined;
  let workflowContext: APIRequestContext | undefined;
  let createdRoleAssignmentIds: string[] = [];
  let createdRoleAssignmentReference: string | undefined;

  try {
    roleContext = await newContext({
      baseURL: stripTrailingSlash(roleAssignmentApiUrl as string),
      extraHTTPHeaders: {
        Accept: 'application/json',
        Authorization: withBearerPrefix(stripBearerPrefix(adminBearerToken as string)),
        ServiceAuthorization: withBearerPrefix(serviceToken),
        'Content-Type': 'application/json',
      },
    });
    workflowContext = await newContext({
      baseURL: stripTrailingSlash(workflowApiUrl as string),
      extraHTTPHeaders: {
        Accept: 'application/json',
        Authorization: withBearerPrefix(userBearerToken),
        ServiceAuthorization: withBearerPrefix(serviceToken),
        'Content-Type': 'application/json',
      },
    });

    const roleAssignment = await postRoleAssignments({
      context: roleContext,
      actorId: user.id ?? user.email,
      jurisdiction,
      caseType,
      caseNumber,
      beginTime: now.toISOString(),
    });
    createdRoleAssignmentIds = roleAssignment.ids;
    createdRoleAssignmentReference = roleAssignment.reference;
    const workflowStatus = await postWorkflowMessage({
      context: workflowContext,
      taskId,
      caseNumber,
      jurisdiction,
      caseType,
      dueDate: addDays(now, 2).toISOString(),
    });

    const result = {
      attempted: true,
      taskId,
      roleAssignmentIds: createdRoleAssignmentIds,
      roleAssignmentReference: createdRoleAssignmentReference,
      diagnostics: {
        ...baseDiagnostics,
        roleAssignmentStatus: roleAssignment.status,
        workflowStatus,
      },
    };
    await testInfo.attach('manage-tasks-wa-provisioning.json', {
      body: JSON.stringify(result, null, 2),
      contentType: 'application/json',
    });
    return result;
  } catch (error) {
    if (roleContext && (createdRoleAssignmentIds.length > 0 || createdRoleAssignmentReference)) {
      const cleanup = await deleteRoleAssignments(roleContext, createdRoleAssignmentIds, createdRoleAssignmentReference);
      await attachRoleAssignmentCleanup(testInfo, cleanup);
      const failedCleanup = cleanup.filter((entry) => !entry.ok);
      if (failedCleanup.length > 0) {
        throw new Error(
          `${error instanceof Error ? error.message : String(error)}; ` +
            `WA role assignment cleanup failed for ${failedCleanup
              .map((entry) => entry.reference ?? entry.assignmentId)
              .join(', ')}.`
        );
      }
    }
    throw error;
  } finally {
    await roleContext?.dispose();
    await workflowContext?.dispose();
  }
}

export async function cleanupWaTaskRoleAssignmentsForManageTasksCase({
  roleAssignmentIds,
  roleAssignmentReference,
  testInfo,
}: {
  roleAssignmentIds: readonly string[];
  roleAssignmentReference?: string;
  testInfo: TestInfo;
}): Promise<WaRoleAssignmentCleanupResult[]> {
  if (roleAssignmentIds.length === 0 && !roleAssignmentReference?.trim()) {
    const cleanup = [
      {
        status: 'skipped',
        ok: true,
        note: 'no role assignments were created',
      },
    ] satisfies WaRoleAssignmentCleanupResult[];
    await attachRoleAssignmentCleanup(testInfo, cleanup);
    return cleanup;
  }

  const env = process.env;
  const roleAssignmentApiUrl = resolveRoleAssignmentApiUrl(env);
  const adminBearerToken = resolveAdminBearerToken(env);
  const missing = [
    roleAssignmentApiUrl ? undefined : 'SERVICES_ROLE_ASSIGNMENT_API',
    adminBearerToken ? undefined : 'ORG_USER_ASSIGNMENT_BEARER_TOKEN or PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN',
  ].filter((value): value is string => Boolean(value));
  if (missing.length > 0) {
    throw new Error(`WA role assignment cleanup prerequisites missing: ${missing.join(', ')}.`);
  }

  const serviceToken = await resolveServiceToken();
  if (!serviceToken) {
    throw new Error('WA role assignment cleanup requires an S2S token. Set S2S_TOKEN or S2S service auth configuration.');
  }

  const roleContext = await request.newContext({
    baseURL: stripTrailingSlash(roleAssignmentApiUrl as string),
    extraHTTPHeaders: {
      Accept: 'application/json',
      Authorization: withBearerPrefix(stripBearerPrefix(adminBearerToken as string)),
      ServiceAuthorization: withBearerPrefix(serviceToken),
      'Content-Type': 'application/json',
    },
  });

  try {
    const cleanup = await deleteRoleAssignments(roleContext, roleAssignmentIds, roleAssignmentReference);
    await attachRoleAssignmentCleanup(testInfo, cleanup);
    const failedCleanup = cleanup.filter((entry) => !entry.ok);
    if (failedCleanup.length > 0) {
      throw new Error(
        `WA role assignment cleanup failed for ${failedCleanup.map((entry) => entry.reference ?? entry.assignmentId).join(', ')}.`
      );
    }
    return cleanup;
  } finally {
    await roleContext.dispose();
  }
}

export const __test__ = {
  buildWaCreateTaskMessage,
  buildWaRoleAssignmentRequest,
  buildRoleAssignmentReference,
  deleteRoleAssignments,
  extractRoleAssignmentIds,
  requiresProvisioning,
  resolveProvisioningMode,
  resolveWorkflowApiUrl,
  resolveRoleAssignmentApiUrl,
  resolveWaTaskProvisioningReadiness,
  shouldProvision,
};
