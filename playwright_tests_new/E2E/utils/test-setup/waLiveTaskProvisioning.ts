import { randomUUID } from 'node:crypto';

import { IdamUtils, ServiceAuthUtils } from '@hmcts/playwright-common';
import { request, type APIRequestContext, type TestInfo } from '@playwright/test';

import type { ProfessionalUserInfo } from '../professional-user/types';
import { DEFAULT_PASSWORD_GRANT_SCOPE } from '../professional-user/runtime.js';

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
  workflowIdempotencyKey?: string;
  roleAssignmentIds: string[];
  roleAssignmentReference?: string;
  diagnostics: {
    mode: string;
    workflowApiUrl?: string;
    taskManagementApiUrl?: string;
    camundaApiUrl?: string;
    roleAssignmentApiUrl?: string;
    roleAssignmentS2sMicroservice?: string;
    taskInitiationS2sMicroservice?: string;
    missing: string[];
    roleAssignmentStatus?: number;
    roleAssignmentVisibilityStatus?: number;
    workflowStatus?: number;
    camundaTaskVisibilityStatus?: number;
    taskInitiationStatus?: number;
    skipped?: string;
  };
};

export type WaTaskProvisioningReadiness = {
  ready: boolean;
  mode: string;
  missing: string[];
  skipped?: string;
};

type WaRoleAssignmentVisibilityAttempt = {
  attempt: number;
  elapsedMs: number;
  status: number;
  roleCount: number;
  visibleAssignmentIds: string[];
  expectedAssignmentIds: string[];
  ok: boolean;
  responsePreview?: unknown;
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

type WaWorkflowTaskMessageInput = Omit<WaTaskVariablesInput, 'taskId'> & {
  idempotencyKey: string;
  roleAssignmentId?: string;
  delayUntil: string;
};

type WaCamundaTaskVisibilityAttempt = {
  attempt: number;
  elapsedMs: number;
  status: number;
  taskCount: number;
  matchingTaskIds: string[];
  selectedTaskId?: string;
  ok: boolean;
  responsePreview?: unknown;
};

type RoleAssignmentInput = {
  actorId: string;
  jurisdiction: string;
  roleNames?: readonly string[];
  beginTime: string;
  reference: string;
};

type WaConfiguredTaskType = {
  taskType: string;
  taskName: string;
};

const DEFAULT_LOCATION_ID = '765324';
const DEFAULT_LOCATION_NAME = 'Taylor House';
const DEFAULT_REGION_ID = '1';
const DEFAULT_TASK_NAME = 'process application';
const DEFAULT_TASK_TYPE = 'processApplication';
const DEFAULT_TASK_CATEGORY = 'Case Progression';
const DEFAULT_SECURITY_CLASSIFICATION = 'PUBLIC';
const DEFAULT_CASE_MANAGEMENT_CATEGORY = 'Protection';
const DEFAULT_ROLE_CATEGORY = 'LEGAL_OPERATIONS';
const DEFAULT_WORK_TYPE = 'decision_making_work';
const DEFAULT_EXECUTION_TYPE = 'Manual';
const DEFAULT_ROLE_NAMES = ['tribunal-caseworker'] as const;
const DEFAULT_ROLE_ASSIGNMENT_READY_TIMEOUT_MS = 30_000;
const DEFAULT_ROLE_ASSIGNMENT_READY_POLL_INTERVAL_MS = 2_000;
const DEFAULT_CAMUNDA_TASK_READY_TIMEOUT_MS = 60_000;
const DEFAULT_CAMUNDA_TASK_READY_POLL_INTERVAL_MS = 1_000;
const DEFAULT_TASK_INITIATION_MAX_ATTEMPTS = 3;
const DEFAULT_TASK_INITIATION_RETRY_DELAY_MS = 1_000;
const ROLE_ASSIGNMENT_PROCESS = 'staff-organisational-role-mapping';
const ROLE_ASSIGNMENT_BEGIN_TIME = '2020-01-01T00:00:00Z';
const ROLE_ASSIGNMENT_CREATE_ACCEPT = 'application/vnd.uk.gov.hmcts.role-assignment-service.create-assignments+json';
const ROLE_ASSIGNMENT_GET_ACCEPT =
  'application/vnd.uk.gov.hmcts.role-assignment-service.get-assignments+json;charset=UTF-8;version=1.0';
const DEFAULT_TEST_ENV = 'aat';
const DEFAULT_SERVICE_AUTH_MICROSERVICE = 'xui_webapp';
const DEFAULT_ROLE_ASSIGNMENT_SERVICE_AUTH_MICROSERVICE = 'wa_task_management_api';
const DEFAULT_TASK_INITIATION_SERVICE_AUTH_MICROSERVICE = 'wa_task_management_api';

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

function ensureTrailingSlash(value: string): string {
  return `${stripTrailingSlash(value)}/`;
}

function normalizeCamundaApiUrl(value: string): string {
  const normalized = stripTrailingSlash(value);
  const engineRestUrl = /\/engine-rest(?:\/|$)/.test(normalized) ? normalized : `${normalized}/engine-rest`;
  return ensureTrailingSlash(engineRestUrl);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function padDatePart(value: number, length = 2): string {
  return value.toString().padStart(length, '0');
}

function formatCamundaDateTime(date: Date): string {
  return (
    `${date.getUTCFullYear()}-${padDatePart(date.getUTCMonth() + 1)}-${padDatePart(date.getUTCDate())}` +
    `T${padDatePart(date.getUTCHours())}:${padDatePart(date.getUTCMinutes())}:${padDatePart(date.getUTCSeconds())}` +
    `.${padDatePart(date.getUTCMilliseconds(), 3)}+0000`
  );
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

function buildRoleAssignmentReference(caseNumber: string, roleName: string): string {
  return `${caseNumber}/${roleName}/dynamic-manage-tasks`;
}

function resolvePositiveIntegerEnv(env: Env, name: string, fallback: number): number {
  const rawValue = env[name]?.trim();
  if (!rawValue) {
    return fallback;
  }
  const value = Number.parseInt(rawValue, 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function resolveRoleAssignmentReadyTimeoutMs(env: Env = process.env): number {
  return resolvePositiveIntegerEnv(
    env,
    'PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_READY_TIMEOUT_MS',
    DEFAULT_ROLE_ASSIGNMENT_READY_TIMEOUT_MS
  );
}

function resolveRoleAssignmentReadyPollIntervalMs(env: Env = process.env): number {
  return resolvePositiveIntegerEnv(
    env,
    'PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_READY_POLL_INTERVAL_MS',
    DEFAULT_ROLE_ASSIGNMENT_READY_POLL_INTERVAL_MS
  );
}

function resolveCamundaTaskReadyTimeoutMs(env: Env = process.env): number {
  return resolvePositiveIntegerEnv(
    env,
    'PW_E2E_MANAGE_TASKS_CAMUNDA_TASK_READY_TIMEOUT_MS',
    DEFAULT_CAMUNDA_TASK_READY_TIMEOUT_MS
  );
}

function resolveCamundaTaskReadyPollIntervalMs(env: Env = process.env): number {
  return resolvePositiveIntegerEnv(
    env,
    'PW_E2E_MANAGE_TASKS_CAMUNDA_TASK_READY_POLL_INTERVAL_MS',
    DEFAULT_CAMUNDA_TASK_READY_POLL_INTERVAL_MS
  );
}

function resolveTaskInitiationMaxAttempts(env: Env = process.env): number {
  return resolvePositiveIntegerEnv(env, 'PW_E2E_MANAGE_TASKS_TASK_INITIATION_MAX_ATTEMPTS', DEFAULT_TASK_INITIATION_MAX_ATTEMPTS);
}

function resolveTaskInitiationRetryDelayMs(env: Env = process.env): number {
  return resolvePositiveIntegerEnv(
    env,
    'PW_E2E_MANAGE_TASKS_TASK_INITIATION_RETRY_DELAY_MS',
    DEFAULT_TASK_INITIATION_RETRY_DELAY_MS
  );
}

function resolveHmctsEnvironment(env: Env = process.env): string {
  const configured = firstNonEmpty(env.PW_E2E_MANAGE_TASKS_ENV, env.TEST_ENV, env.ENVIRONMENT, env.HMCTS_ENV);
  if (configured) {
    return ['prod', 'production'].includes(configured.toLowerCase()) ? 'prod' : configured;
  }

  const testUrl = firstNonEmpty(env.TEST_URL);
  if (testUrl) {
    try {
      const { hostname } = new URL(testUrl);
      const manageCaseMatch = hostname.match(/^manage-case(?:-[^.]+)?(?:\.([^.]+))?\.platform\.hmcts\.net$/);
      if (manageCaseMatch) {
        return manageCaseMatch[1] ?? 'prod';
      }
      if (hostname.endsWith('.preview.platform.hmcts.net') || hostname === 'localhost') {
        return DEFAULT_TEST_ENV;
      }
    } catch {
      return DEFAULT_TEST_ENV;
    }
  }

  return DEFAULT_TEST_ENV;
}

function buildInternalServiceUrl(serviceName: string, env: Env = process.env): string {
  const hmctsEnvironment = resolveHmctsEnvironment(env);
  return `http://${serviceName}-${hmctsEnvironment}.service.core-compute-${hmctsEnvironment}.internal`;
}

function resolveWorkflowApiUrl(env: Env = process.env): string | undefined {
  return (
    firstNonEmpty(env.SERVICES_WA_WORKFLOW_API_URL, env.WA_WORKFLOW_API_URL, env.WA_WORKFLOW_API) ??
    buildInternalServiceUrl('wa-workflow-api', env)
  );
}

function resolveRoleAssignmentApiUrl(env: Env = process.env): string | undefined {
  return (
    firstNonEmpty(env.SERVICES_ROLE_ASSIGNMENT_API, env.ROLE_ASSIGNMENT_API_URL, env.AM_ROLE_ASSIGNMENT_SERVICE_URL) ??
    buildInternalServiceUrl('am-role-assignment-service', env)
  );
}

function resolveTaskManagementApiUrl(env: Env = process.env): string | undefined {
  return (
    firstNonEmpty(
      env.SERVICES_WORK_ALLOCATION_TASK_API,
      env.SERVICES_WA_TASK_MANAGEMENT_API_URL,
      env.WA_TASK_MANAGEMENT_API_URL
    ) ?? buildInternalServiceUrl('wa-task-management-api', env)
  );
}

function resolveCamundaApiUrl(env: Env = process.env): string | undefined {
  const configured = firstNonEmpty(env.CAMUNDA_URL, env.SERVICES_CAMUNDA_URL, env.WA_CAMUNDA_API_URL, env.CAMUNDA_API_URL);
  if (configured) {
    return normalizeCamundaApiUrl(configured);
  }
  return normalizeCamundaApiUrl(buildInternalServiceUrl('camunda-api', env));
}

export function resolveWaTaskProvisioningReadiness(
  env: Env = process.env,
  _options: { requireBearerToken?: boolean } = {}
): WaTaskProvisioningReadiness {
  const mode = resolveProvisioningMode(env);
  const missing = [
    resolveWorkflowApiUrl(env) ? undefined : 'SERVICES_WA_WORKFLOW_API_URL',
    resolveTaskManagementApiUrl(env) ? undefined : 'SERVICES_WORK_ALLOCATION_TASK_API',
    resolveCamundaApiUrl(env) ? undefined : 'CAMUNDA_URL',
    resolveRoleAssignmentApiUrl(env) ? undefined : 'SERVICES_ROLE_ASSIGNMENT_API',
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
  const microservice = firstNonEmpty(env.S2S_MICROSERVICE_NAME, env.MICROSERVICE) ?? DEFAULT_SERVICE_AUTH_MICROSERVICE;
  const token = await serviceAuthUtils.retrieveToken({ microservice });
  return token ? stripBearerPrefix(token) : undefined;
}

function resolveRoleAssignmentS2sMicroservice(env: Env = process.env): string {
  return (
    firstNonEmpty(env.PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_S2S_MICROSERVICE, env.WA_ROLE_ASSIGNMENT_S2S_MICROSERVICE) ??
    DEFAULT_ROLE_ASSIGNMENT_SERVICE_AUTH_MICROSERVICE
  );
}

async function resolveRoleAssignmentServiceToken(deps: TokenDeps = {}): Promise<string | undefined> {
  const env = deps.env ?? process.env;
  const fromEnv = firstNonEmpty(env.PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_S2S_TOKEN, env.WA_ROLE_ASSIGNMENT_S2S_TOKEN);
  if (fromEnv) {
    return stripBearerPrefix(fromEnv);
  }

  const serviceAuthUtils = deps.serviceAuthUtils ?? new ServiceAuthUtils();
  const microservice = resolveRoleAssignmentS2sMicroservice(env);
  const token = await serviceAuthUtils.retrieveToken({ microservice });
  return token ? stripBearerPrefix(token) : undefined;
}

function resolveTaskInitiationS2sMicroservice(env: Env = process.env): string {
  return (
    firstNonEmpty(env.PW_E2E_MANAGE_TASKS_TASK_INITIATION_S2S_MICROSERVICE, env.WA_TASK_INITIATION_S2S_MICROSERVICE) ??
    DEFAULT_TASK_INITIATION_SERVICE_AUTH_MICROSERVICE
  );
}

async function resolveTaskInitiationServiceToken(deps: TokenDeps = {}): Promise<string | undefined> {
  const env = deps.env ?? process.env;
  const fromEnv = firstNonEmpty(env.PW_E2E_MANAGE_TASKS_TASK_INITIATION_S2S_TOKEN, env.WA_TASK_INITIATION_S2S_TOKEN);
  if (fromEnv) {
    return stripBearerPrefix(fromEnv);
  }

  const serviceAuthUtils = deps.serviceAuthUtils ?? new ServiceAuthUtils();
  const microservice = resolveTaskInitiationS2sMicroservice(env);
  const token = await serviceAuthUtils.retrieveToken({ microservice });
  return token ? stripBearerPrefix(token) : undefined;
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

function resolveConfiguredTaskTypeOverride(env: Env = process.env): WaConfiguredTaskType | undefined {
  const taskType = firstNonEmpty(env.PW_E2E_MANAGE_TASKS_TASK_TYPE, env.WA_TASK_TYPE);
  if (!taskType) {
    return undefined;
  }

  return {
    taskType,
    taskName: firstNonEmpty(env.PW_E2E_MANAGE_TASKS_TASK_NAME, env.WA_TASK_NAME) ?? taskType,
  };
}

function readString(record: Record<string, unknown>, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

function extractConfiguredTaskTypes(payload: unknown): WaConfiguredTaskType[] {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const record = payload as Record<string, unknown>;
  const candidates = Array.isArray(record.task_types)
    ? record.task_types
    : Array.isArray(record.taskTypes)
      ? record.taskTypes
      : Array.isArray(record.task_types_response)
        ? record.task_types_response
        : [];

  return candidates
    .filter((candidate): candidate is Record<string, unknown> => Boolean(candidate && typeof candidate === 'object'))
    .map((candidate) => {
      const nestedTaskType = candidate.task_type;
      const source =
        nestedTaskType && typeof nestedTaskType === 'object' ? (nestedTaskType as Record<string, unknown>) : candidate;
      const taskType = readString(source, 'task_type_id', 'taskTypeId', 'taskType', 'id');
      const taskName = readString(source, 'task_type_name', 'taskTypeName', 'taskName', 'name') ?? taskType;
      return taskType && taskName ? { taskType, taskName } : undefined;
    })
    .filter((candidate): candidate is WaConfiguredTaskType => Boolean(candidate));
}

async function resolveConfiguredTaskType(params: {
  context: APIRequestContext;
  env: Env;
  jurisdiction: string;
  testInfo: TestInfo;
}): Promise<WaConfiguredTaskType> {
  const override = resolveConfiguredTaskTypeOverride(params.env);
  const response = await params.context.get(`/task/task-types?jurisdiction=${encodeURIComponent(params.jurisdiction)}`, {
    failOnStatusCode: false,
  });
  const status = response.status();
  const payload = await readPayload(response);
  const configuredTaskTypes = extractConfiguredTaskTypes(payload);
  const fallback =
    params.jurisdiction.toUpperCase() === 'WA'
      ? {
          taskType: DEFAULT_TASK_TYPE,
          taskName: DEFAULT_TASK_NAME,
        }
      : undefined;
  const selected = override
    ? (configuredTaskTypes.find((taskType) => taskType.taskType === override.taskType) ?? override)
    : (configuredTaskTypes[0] ?? fallback);
  const source = override
    ? configuredTaskTypes.some((taskType) => taskType.taskType === override.taskType)
      ? 'override-discovered'
      : 'override'
    : configuredTaskTypes.length > 0
      ? 'discovered'
      : fallback
        ? 'wa-default'
        : 'unresolved';

  await params.testInfo.attach('manage-tasks-wa-task-types.json', {
    body: JSON.stringify(
      {
        jurisdiction: params.jurisdiction,
        status,
        source,
        selected,
        override,
        configuredTaskTypes,
        responsePreview: configuredTaskTypes.length === 0 ? payload : undefined,
      },
      null,
      2
    ),
    contentType: 'application/json',
  });

  if (status < 200 || status >= 300) {
    throw new Error(`WA task type discovery failed with HTTP ${status}: ${summarizeErrorPayload(payload)}`);
  }
  if (!selected) {
    throw new Error(
      `WA task type discovery returned no configured task types for jurisdiction ${params.jurisdiction}. ` +
        'Set PW_E2E_MANAGE_TASKS_TASK_TYPE/PW_E2E_MANAGE_TASKS_TASK_NAME to a WA-configured task contract.'
    );
  }
  return selected;
}

function processVariable(value: string | boolean | number) {
  if (typeof value === 'boolean') {
    return { value, type: 'Boolean' };
  }
  if (typeof value === 'number') {
    return { value, type: 'Integer' };
  }
  return { value, type: 'String' };
}

export function buildWaCreateTaskMessage({
  idempotencyKey,
  roleAssignmentId,
  caseNumber,
  jurisdiction,
  caseType,
  taskName,
  taskType,
  dueDate,
  delayUntil,
}: WaWorkflowTaskMessageInput) {
  const processVariables: Record<string, ReturnType<typeof processVariable>> = {
    jurisdiction: processVariable(jurisdiction),
    caseTypeId: processVariable(caseType),
    caseType: processVariable(caseType),
    region: processVariable(DEFAULT_REGION_ID),
    location: processVariable(DEFAULT_LOCATION_ID),
    locationName: processVariable(DEFAULT_LOCATION_NAME),
    staffLocation: processVariable(DEFAULT_LOCATION_NAME),
    securityClassification: processVariable(DEFAULT_SECURITY_CLASSIFICATION),
    name: processVariable(taskName),
    taskId: processVariable(taskType),
    taskType: processVariable(taskType),
    taskCategory: processVariable(DEFAULT_TASK_CATEGORY),
    taskState: processVariable('unconfigured'),
    roleCategory: processVariable(DEFAULT_ROLE_CATEGORY),
    workType: processVariable(DEFAULT_WORK_TYPE),
    caseId: processVariable(caseNumber),
    idempotencyKey: processVariable(idempotencyKey),
    dueDate: processVariable(dueDate),
    delayUntil: processVariable(delayUntil),
    workingDaysAllowed: processVariable(2),
    hasWarnings: processVariable(false),
    warningList: processVariable(''),
    caseManagementCategory: processVariable(DEFAULT_CASE_MANAGEMENT_CATEGORY),
    description: processVariable(`Dynamic Manage Tasks E2E task for EXUI automated case ${caseNumber}`),
    'task-supervisor': processVariable('Read,Refer,Manage,Cancel'),
    'tribunal-caseworker': processVariable('Read,Refer,Own,Manage,Cancel'),
    'senior-tribunal-caseworker': processVariable('Read,Refer,Own,Manage,Cancel'),
  };
  if (roleAssignmentId) {
    processVariables.roleAssignmentId = processVariable(roleAssignmentId);
  }

  return {
    messageName: 'createTaskMessage',
    processVariables,
    correlationKeys: null,
    all: false,
  };
}

export function buildWaRoleAssignmentRequest({
  actorId,
  jurisdiction,
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
        region: DEFAULT_REGION_ID,
        primaryLocation: DEFAULT_LOCATION_ID,
        baseLocation: DEFAULT_LOCATION_ID,
        workTypes: DEFAULT_WORK_TYPE,
      },
      authorisations: [],
    })),
  };
}

export function buildWaTaskInitiationRequest({
  taskId,
  caseNumber,
  jurisdiction,
  caseType,
  taskName,
  taskType,
  dueDate,
}: WaTaskVariablesInput) {
  const created = formatCamundaDateTime(new Date());
  return {
    operation: 'INITIATION',
    task_attributes: {
      taskType,
      name: taskName,
      taskId,
      caseId: caseNumber,
      caseTypeId: caseType,
      caseName: `EXUI automated Manage Tasks case ${caseNumber}`,
      caseCategory: DEFAULT_CASE_MANAGEMENT_CATEGORY,
      jurisdiction,
      region: DEFAULT_REGION_ID,
      location: DEFAULT_LOCATION_ID,
      locationName: DEFAULT_LOCATION_NAME,
      securityClassification: DEFAULT_SECURITY_CLASSIFICATION,
      title: taskName,
      description: `Dynamic Manage Tasks E2E task for EXUI automated case ${caseNumber}`,
      roleCategory: DEFAULT_ROLE_CATEGORY,
      workType: DEFAULT_WORK_TYPE,
      executionType: DEFAULT_EXECUTION_TYPE,
      caseManagementCategory: DEFAULT_CASE_MANAGEMENT_CATEGORY,
      taskCategory: DEFAULT_TASK_CATEGORY,
      created,
      dueDate,
      hasWarnings: false,
      warningList: { values: [] },
      __processCategory__Protection: true,
    },
  };
}

function extractRoleAssignmentIds(payload: unknown): string[] {
  return extractRoleAssignments(payload)
    .map((role) => {
      const id = role.id;
      return typeof id === 'string' && id.trim() ? id.trim() : undefined;
    })
    .filter((id): id is string => Boolean(id));
}

function extractRoleAssignments(payload: unknown): Array<Record<string, unknown>> {
  if (!payload || typeof payload !== 'object') {
    return [];
  }
  const record = payload as Record<string, unknown>;
  const roleAssignmentResponse = record.roleAssignmentResponse;
  if (Array.isArray(roleAssignmentResponse)) {
    return roleAssignmentResponse.filter((role): role is Record<string, unknown> => Boolean(role && typeof role === 'object'));
  }

  const roleAssignmentRecord =
    roleAssignmentResponse && typeof roleAssignmentResponse === 'object'
      ? (roleAssignmentResponse as Record<string, unknown>)
      : record;
  const requestedRoles = roleAssignmentRecord.requestedRoles;
  if (!Array.isArray(requestedRoles)) {
    return [];
  }
  return requestedRoles.filter((role): role is Record<string, unknown> => Boolean(role && typeof role === 'object'));
}

function summarizeErrorPayload(payload: unknown): string {
  if (typeof payload === 'string') {
    return payload.slice(0, 2000);
  }
  try {
    return JSON.stringify(payload).slice(0, 2000);
  } catch {
    return String(payload).slice(0, 2000);
  }
}

async function readPayload(response: { json: () => Promise<unknown>; text: () => Promise<string> }): Promise<unknown> {
  const text = await response.text().catch(() => '');
  if (!text) {
    return '';
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function isWaDatabaseConflict(status: number, payload: unknown): boolean {
  if (status !== 503 || !payload || typeof payload !== 'object') {
    return false;
  }
  const record = payload as Record<string, unknown>;
  return record.type === 'https://github.com/hmcts/wa-task-management-api/problem/database-conflict';
}

async function postRoleAssignments(params: {
  context: APIRequestContext;
  actorId: string;
  jurisdiction: string;
  caseType: string;
  caseNumber: string;
  beginTime: string;
}) {
  const reference = buildRoleAssignmentReference(params.caseNumber, DEFAULT_ROLE_NAMES[0]);
  const response = await params.context.post('/am/role-assignments', {
    data: buildWaRoleAssignmentRequest({
      actorId: params.actorId,
      jurisdiction: params.jurisdiction,
      beginTime: params.beginTime,
      reference,
    }),
    headers: {
      Accept: ROLE_ASSIGNMENT_CREATE_ACCEPT,
    },
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

function summarizeVisibleRole(role: Record<string, unknown>): Record<string, unknown> {
  return {
    id: role.id,
    actorId: role.actorId,
    roleName: role.roleName,
    roleType: role.roleType,
    grantType: role.grantType,
    roleCategory: role.roleCategory,
    classification: role.classification,
    attributes: role.attributes,
  };
}

async function waitForRoleAssignmentsVisible(params: {
  context: APIRequestContext;
  actorId: string;
  roleAssignmentIds: readonly string[];
  env: Env;
  testInfo: TestInfo;
}): Promise<WaRoleAssignmentVisibilityAttempt> {
  const expectedAssignmentIds = [...new Set(params.roleAssignmentIds.map((id) => id.trim()).filter(Boolean))];
  if (expectedAssignmentIds.length === 0) {
    throw new Error('WA role assignment creation did not return assignment ids; cannot prove actor role visibility.');
  }

  const timeoutMs = resolveRoleAssignmentReadyTimeoutMs(params.env);
  const pollIntervalMs = resolveRoleAssignmentReadyPollIntervalMs(params.env);
  const startedAt = Date.now();
  const deadline = startedAt + timeoutMs;
  const attempts: WaRoleAssignmentVisibilityAttempt[] = [];
  let lastAttempt: WaRoleAssignmentVisibilityAttempt | undefined;

  for (let attempt = 1; Date.now() < deadline; attempt += 1) {
    const response = await params.context.get(`/am/role-assignments/actors/${encodeURIComponent(params.actorId)}`, {
      headers: {
        Accept: ROLE_ASSIGNMENT_GET_ACCEPT,
      },
      failOnStatusCode: false,
    });
    const status = response.status();
    const payload = await readPayload(response);
    const visibleRoles = extractRoleAssignments(payload);
    const visibleAssignmentIds = extractRoleAssignmentIds(payload);
    const ok = status >= 200 && status < 300 && expectedAssignmentIds.every((id) => visibleAssignmentIds.includes(id));
    lastAttempt = {
      attempt,
      elapsedMs: Date.now() - startedAt,
      status,
      roleCount: visibleRoles.length,
      visibleAssignmentIds,
      expectedAssignmentIds,
      ok,
      responsePreview: {
        roles: visibleRoles.slice(0, 10).map(summarizeVisibleRole),
      },
    };
    attempts.push(lastAttempt);

    if (ok) {
      await params.testInfo.attach('manage-tasks-wa-role-assignment-readiness.json', {
        body: JSON.stringify({ actorId: params.actorId, attempts, selectedAttempt: lastAttempt }, null, 2),
        contentType: 'application/json',
      });
      return lastAttempt;
    }

    const remainingMs = deadline - Date.now();
    await new Promise((resolve) => setTimeout(resolve, Math.min(pollIntervalMs, Math.max(0, remainingMs))));
  }

  await params.testInfo.attach('manage-tasks-wa-role-assignment-readiness.json', {
    body: JSON.stringify({ actorId: params.actorId, attempts, selectedAttempt: lastAttempt }, null, 2),
    contentType: 'application/json',
  });

  throw new Error(
    `WA role assignment was created but was not visible to actor ${params.actorId} within ${timeoutMs}ms. ` +
      `Expected assignment ids: ${expectedAssignmentIds.join(', ')}. ` +
      `Last AM status: ${lastAttempt?.status ?? 'none'}, visible roles: ${lastAttempt?.roleCount ?? 0}.`
  );
}

function extractCamundaTasks(payload: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(payload)) {
    return payload.filter((task): task is Record<string, unknown> => Boolean(task && typeof task === 'object'));
  }
  if (!payload || typeof payload !== 'object') {
    return [];
  }
  const record = payload as Record<string, unknown>;
  const embeddedTasks = record.tasks ?? record.data ?? record.results;
  return Array.isArray(embeddedTasks)
    ? embeddedTasks.filter((task): task is Record<string, unknown> => Boolean(task && typeof task === 'object'))
    : [];
}

function summarizeCamundaTask(task: Record<string, unknown>): Record<string, unknown> {
  return {
    id: task.id,
    name: task.name,
    taskDefinitionKey: task.taskDefinitionKey,
    processInstanceId: task.processInstanceId,
  };
}

async function waitForCamundaTaskVisible(params: {
  context: APIRequestContext;
  caseNumber: string;
  taskName: string;
  taskType: string;
  env: Env;
  testInfo: TestInfo;
}): Promise<WaCamundaTaskVisibilityAttempt> {
  const timeoutMs = resolveCamundaTaskReadyTimeoutMs(params.env);
  const pollIntervalMs = resolveCamundaTaskReadyPollIntervalMs(params.env);
  const startedAt = Date.now();
  const deadline = startedAt + timeoutMs;
  const attempts: WaCamundaTaskVisibilityAttempt[] = [];
  let lastAttempt: WaCamundaTaskVisibilityAttempt | undefined;
  const filter = `task?processVariables=caseId_eq_${encodeURIComponent(params.caseNumber)}`;

  for (let attempt = 1; Date.now() < deadline; attempt += 1) {
    const response = await params.context.get(filter, {
      failOnStatusCode: false,
    });
    const status = response.status();
    const payload = await readPayload(response);
    const tasks = extractCamundaTasks(payload);
    const matchingTasks = tasks.filter((task) => {
      const name = readString(task, 'name');
      const taskDefinitionKey = readString(task, 'taskDefinitionKey', 'task_type', 'taskType');
      return name === params.taskName || taskDefinitionKey === params.taskType;
    });
    const matchingTaskIds = matchingTasks.map((task) => readString(task, 'id')).filter((id): id is string => Boolean(id));
    const selectedTaskId = matchingTaskIds.length === 1 ? matchingTaskIds[0] : undefined;
    lastAttempt = {
      attempt,
      elapsedMs: Date.now() - startedAt,
      status,
      taskCount: tasks.length,
      matchingTaskIds,
      selectedTaskId,
      ok: status >= 200 && status < 300 && Boolean(selectedTaskId),
      responsePreview: {
        tasks: tasks.slice(0, 10).map(summarizeCamundaTask),
      },
    };
    attempts.push(lastAttempt);

    if (lastAttempt.ok) {
      await params.testInfo.attach('manage-tasks-wa-camunda-task-readiness.json', {
        body: JSON.stringify({ caseNumber: params.caseNumber, attempts, selectedAttempt: lastAttempt }, null, 2),
        contentType: 'application/json',
      });
      return lastAttempt;
    }

    const remainingMs = deadline - Date.now();
    await new Promise((resolve) => setTimeout(resolve, Math.min(pollIntervalMs, Math.max(0, remainingMs))));
  }

  await params.testInfo.attach('manage-tasks-wa-camunda-task-readiness.json', {
    body: JSON.stringify({ caseNumber: params.caseNumber, attempts, selectedAttempt: lastAttempt }, null, 2),
    contentType: 'application/json',
  });

  throw new Error(
    `WA workflow created no unique Camunda task for case ${params.caseNumber} within ${timeoutMs}ms. ` +
      `Expected task '${params.taskName}' (${params.taskType}). ` +
      `Last Camunda status: ${lastAttempt?.status ?? 'none'}, tasks: ${lastAttempt?.taskCount ?? 0}, ` +
      `matching ids: ${lastAttempt?.matchingTaskIds.join(', ') || 'none'}.`
  );
}

async function deleteRoleAssignments(
  context: APIRequestContext,
  roleAssignmentIds: readonly string[],
  roleAssignmentReference?: string
): Promise<WaRoleAssignmentCleanupResult[]> {
  const uniqueIds = [...new Set(roleAssignmentIds.map((id) => id.trim()).filter(Boolean))];
  const results: WaRoleAssignmentCleanupResult[] = [];

  if (uniqueIds.length === 0) {
    return [
      {
        reference: roleAssignmentReference?.trim(),
        status: 0,
        ok: false,
        note: 'No role assignment ids were returned by AM; cleanup by reference is not a supported AM delete contract',
      },
    ];
  }

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
  idempotencyKey: string;
  roleAssignmentId?: string;
  caseNumber: string;
  jurisdiction: string;
  caseType: string;
  taskName: string;
  taskType: string;
  dueDate: string;
  delayUntil: string;
}) {
  const response = await params.context.post('/workflow/message', {
    data: buildWaCreateTaskMessage({
      idempotencyKey: params.idempotencyKey,
      roleAssignmentId: params.roleAssignmentId,
      caseNumber: params.caseNumber,
      jurisdiction: params.jurisdiction,
      caseType: params.caseType,
      taskName: params.taskName,
      taskType: params.taskType,
      dueDate: params.dueDate,
      delayUntil: params.delayUntil,
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

async function postTaskInitiation(params: {
  context: APIRequestContext;
  env: Env;
  taskId: string;
  caseNumber: string;
  jurisdiction: string;
  caseType: string;
  taskName: string;
  taskType: string;
  dueDate: string;
  testInfo: TestInfo;
}) {
  const requestPayload = buildWaTaskInitiationRequest({
    taskId: params.taskId,
    caseNumber: params.caseNumber,
    jurisdiction: params.jurisdiction,
    caseType: params.caseType,
    taskName: params.taskName,
    taskType: params.taskType,
    dueDate: params.dueDate,
  });
  const maxAttempts = resolveTaskInitiationMaxAttempts(params.env);
  const retryDelayMs = resolveTaskInitiationRetryDelayMs(params.env);
  const attempts: Array<{ attempt: number; status: number; retryable: boolean; response: unknown }> = [];

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await params.context.post(`/task/${encodeURIComponent(params.taskId)}/initiation`, {
      data: requestPayload,
      failOnStatusCode: false,
    });
    const payload = await readPayload(response);
    const status = response.status();
    const retryable = isWaDatabaseConflict(status, payload) && attempt < maxAttempts;
    attempts.push({ attempt, status, retryable, response: payload });

    if (status >= 200 && status < 300) {
      if (attempts.length > 1) {
        await params.testInfo.attach('manage-tasks-wa-task-initiation-attempts.json', {
          body: JSON.stringify({ taskId: params.taskId, attempts }, null, 2),
          contentType: 'application/json',
        });
      }
      return status;
    }

    if (retryable) {
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      continue;
    }

    await params.testInfo.attach('manage-tasks-wa-task-initiation-failure.json', {
      body: JSON.stringify(
        {
          taskId: params.taskId,
          status,
          request: requestPayload,
          response: payload,
          attempts,
        },
        null,
        2
      ),
      contentType: 'application/json',
    });
    throw new Error(`WA task initiation failed with HTTP ${status}: ${summarizeErrorPayload(payload)}`);
  }

  throw new Error(`WA task initiation did not complete after ${maxAttempts} attempts for task ${params.taskId}.`);
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
  const taskManagementApiUrl = resolveTaskManagementApiUrl(env);
  const camundaApiUrl = resolveCamundaApiUrl(env);
  const roleAssignmentApiUrl = resolveRoleAssignmentApiUrl(env);
  const readiness = resolveWaTaskProvisioningReadiness(env);

  const baseDiagnostics = {
    mode,
    workflowApiUrl,
    taskManagementApiUrl,
    camundaApiUrl,
    roleAssignmentApiUrl,
    roleAssignmentS2sMicroservice: resolveRoleAssignmentS2sMicroservice(env),
    taskInitiationS2sMicroservice: resolveTaskInitiationS2sMicroservice(env),
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

  const roleAssignmentServiceToken = await resolveRoleAssignmentServiceToken(deps);
  if (!roleAssignmentServiceToken) {
    throw new Error(
      'WA role assignment provisioning requires a WA role-assignment S2S token. Set ' +
        'PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_S2S_TOKEN or configure S2S for ' +
        `${resolveRoleAssignmentS2sMicroservice(env)}.`
    );
  }

  const taskInitiationServiceToken = await resolveTaskInitiationServiceToken(deps);
  if (!taskInitiationServiceToken) {
    throw new Error(
      'WA task initiation requires an exclusive WA S2S token. Set PW_E2E_MANAGE_TASKS_TASK_INITIATION_S2S_TOKEN ' +
        `or configure S2S for ${resolveTaskInitiationS2sMicroservice(env)}.`
    );
  }

  const userBearerToken = await resolveUserBearerToken(user, deps);
  if (!userBearerToken) {
    throw new Error(
      'WA task provisioning requires a password-grant token for the dynamic user. Set IDAM_SECRET or PW_E2E_MANAGE_TASKS_IDAM_SECRET.'
    );
  }

  const newContext = deps.newContext ?? request.newContext.bind(request);
  const now = deps.now?.() ?? new Date();
  const workflowIdempotencyKey = deps.uuid?.() ?? randomUUID();
  let roleContext: APIRequestContext | undefined;
  let workflowContext: APIRequestContext | undefined;
  let taskManagementContext: APIRequestContext | undefined;
  let camundaContext: APIRequestContext | undefined;
  let taskTypeContext: APIRequestContext | undefined;
  let createdRoleAssignmentIds: string[] = [];
  let createdRoleAssignmentReference: string | undefined;
  const actorId = user.id ?? user.email;

  try {
    roleContext = await newContext({
      baseURL: stripTrailingSlash(roleAssignmentApiUrl as string),
      extraHTTPHeaders: {
        Authorization: withBearerPrefix(userBearerToken),
        ServiceAuthorization: withBearerPrefix(roleAssignmentServiceToken),
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
    taskTypeContext = await newContext({
      baseURL: stripTrailingSlash(taskManagementApiUrl as string),
      extraHTTPHeaders: {
        Accept: 'application/json',
        Authorization: withBearerPrefix(userBearerToken),
        ServiceAuthorization: withBearerPrefix(serviceToken),
        'Content-Type': 'application/json',
      },
    });
    camundaContext = await newContext({
      baseURL: ensureTrailingSlash(camundaApiUrl as string),
      extraHTTPHeaders: {
        Accept: 'application/json',
        ServiceAuthorization: withBearerPrefix(taskInitiationServiceToken),
        'Content-Type': 'application/json',
      },
    });
    taskManagementContext = await newContext({
      baseURL: stripTrailingSlash(taskManagementApiUrl as string),
      extraHTTPHeaders: {
        Accept: 'application/json',
        ServiceAuthorization: withBearerPrefix(taskInitiationServiceToken),
        'Content-Type': 'application/json',
      },
    });

    const roleAssignment = await postRoleAssignments({
      context: roleContext,
      actorId,
      jurisdiction,
      caseType,
      caseNumber,
      beginTime: ROLE_ASSIGNMENT_BEGIN_TIME,
    });
    createdRoleAssignmentIds = roleAssignment.ids;
    createdRoleAssignmentReference = roleAssignment.reference;
    const roleAssignmentVisibility = await waitForRoleAssignmentsVisible({
      context: roleContext,
      actorId,
      roleAssignmentIds: createdRoleAssignmentIds,
      env,
      testInfo,
    });
    const dueDate = formatCamundaDateTime(addDays(now, 2));
    const delayUntil = formatCamundaDateTime(now);
    const taskTypeSelection = await resolveConfiguredTaskType({
      context: taskTypeContext,
      env,
      jurisdiction,
      testInfo,
    });
    const workflowStatus = await postWorkflowMessage({
      context: workflowContext,
      idempotencyKey: workflowIdempotencyKey,
      roleAssignmentId: createdRoleAssignmentIds[0],
      caseNumber,
      jurisdiction,
      caseType,
      taskName: taskTypeSelection.taskName,
      taskType: taskTypeSelection.taskType,
      dueDate,
      delayUntil,
    });
    const camundaTaskVisibility = await waitForCamundaTaskVisible({
      context: camundaContext,
      caseNumber,
      taskName: taskTypeSelection.taskName,
      taskType: taskTypeSelection.taskType,
      env,
      testInfo,
    });
    const taskId = camundaTaskVisibility.selectedTaskId as string;
    const taskInitiationStatus = await postTaskInitiation({
      context: taskManagementContext,
      env,
      taskId,
      caseNumber,
      jurisdiction,
      caseType,
      taskName: taskTypeSelection.taskName,
      taskType: taskTypeSelection.taskType,
      dueDate,
      testInfo,
    });

    const result = {
      attempted: true,
      taskId,
      workflowIdempotencyKey,
      roleAssignmentIds: createdRoleAssignmentIds,
      roleAssignmentReference: createdRoleAssignmentReference,
      diagnostics: {
        ...baseDiagnostics,
        taskName: taskTypeSelection.taskName,
        taskType: taskTypeSelection.taskType,
        roleAssignmentStatus: roleAssignment.status,
        roleAssignmentVisibilityStatus: roleAssignmentVisibility.status,
        workflowStatus,
        camundaTaskVisibilityStatus: camundaTaskVisibility.status,
        taskInitiationStatus,
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
    await taskManagementContext?.dispose();
    await camundaContext?.dispose();
    await taskTypeContext?.dispose();
  }
}

export async function cleanupWaTaskRoleAssignmentsForManageTasksCase({
  roleAssignmentIds,
  roleAssignmentReference,
  user,
  testInfo,
}: {
  roleAssignmentIds: readonly string[];
  roleAssignmentReference?: string;
  user: Pick<ProfessionalUserInfo, 'id' | 'email' | 'password'>;
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
  const missing = [roleAssignmentApiUrl ? undefined : 'SERVICES_ROLE_ASSIGNMENT_API'].filter((value): value is string =>
    Boolean(value)
  );
  if (missing.length > 0) {
    throw new Error(`WA role assignment cleanup prerequisites missing: ${missing.join(', ')}.`);
  }

  const roleAssignmentServiceToken = await resolveRoleAssignmentServiceToken();
  if (!roleAssignmentServiceToken) {
    throw new Error(
      'WA role assignment cleanup requires a WA role-assignment S2S token. Set ' +
        `PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_S2S_TOKEN or configure S2S for ${resolveRoleAssignmentS2sMicroservice()}.`
    );
  }

  const userBearerToken = await resolveUserBearerToken(user);
  if (!userBearerToken) {
    throw new Error(
      'WA role assignment cleanup requires a password-grant token for the dynamic user. Set IDAM_SECRET or PW_E2E_MANAGE_TASKS_IDAM_SECRET.'
    );
  }

  const roleContext = await request.newContext({
    baseURL: stripTrailingSlash(roleAssignmentApiUrl as string),
    extraHTTPHeaders: {
      Authorization: withBearerPrefix(userBearerToken),
      ServiceAuthorization: withBearerPrefix(roleAssignmentServiceToken),
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
  buildWaTaskInitiationRequest,
  buildWaRoleAssignmentRequest,
  buildRoleAssignmentReference,
  deleteRoleAssignments,
  extractConfiguredTaskTypes,
  extractCamundaTasks,
  extractRoleAssignmentIds,
  extractRoleAssignments,
  requiresProvisioning,
  resolveConfiguredTaskTypeOverride,
  resolveConfiguredTaskType,
  resolveHmctsEnvironment,
  resolveProvisioningMode,
  resolveRoleAssignmentReadyPollIntervalMs,
  resolveRoleAssignmentReadyTimeoutMs,
  resolveCamundaApiUrl,
  resolveCamundaTaskReadyPollIntervalMs,
  resolveCamundaTaskReadyTimeoutMs,
  resolveRoleAssignmentS2sMicroservice,
  resolveWorkflowApiUrl,
  resolveRoleAssignmentApiUrl,
  resolveTaskManagementApiUrl,
  resolveTaskInitiationS2sMicroservice,
  resolveWaTaskProvisioningReadiness,
  waitForCamundaTaskVisible,
  waitForRoleAssignmentsVisible,
  shouldProvision,
};
