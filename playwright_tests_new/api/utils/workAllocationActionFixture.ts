import { randomUUID } from 'node:crypto';
import { request } from '@playwright/test';
import { ApiClient } from '@hmcts/playwright-common';
import { ensureSessionCookies } from '../../common/sessionCapture';
import { FrameworkError } from '../../E2E/utils/frameworkError';
import { resolveRuntimeUserCredentialsForIdentifier } from '../../E2E/utils/runtimeUserCredentials';
import {
  createPrlHearingsCase,
  findPrlWorkAllocationCourt,
  resolvePrlHearingsCaseSetupConfig,
} from '../../E2E/utils/test-setup/prlHearingsCaseSetup';
import type { Task } from './types';

const TASK_TYPE = 'newCaseTransferredToCourt';
const REQUIRED_ACTION_PERMISSIONS = ['read', 'own', 'claim', 'unclaim', 'completeown', 'unclaimassign', 'unassignclaim'];
const CASE_PROVISION_RETRY_STATUSES = [500, 502, 504];
const CASE_PROVISION_RETRIES = 8;
const TASK_MONITOR_INITIATION_TIMEOUT_MS = 6 * 60_000;
export const WA_FIXTURE_ACTOR_CONFIG_ERROR_CODE = 'WA_FIXTURE_ACTOR_CONFIG';

/** Deterministic actor/role configuration failure: retrying the same identity cannot change the outcome. */
function actorConfigError(detail: string): FrameworkError {
  return new FrameworkError(
    WA_FIXTURE_ACTOR_CONFIG_ERROR_CODE,
    'setup',
    `${detail} This is a user/role-assignment configuration problem, not a transient failure.`
  );
}

export function isWorkAllocationActorConfigError(error: unknown): boolean {
  return error instanceof FrameworkError && error.code === WA_FIXTURE_ACTOR_CONFIG_ERROR_CODE;
}

export function requireAatUrl(value: string | undefined, label: string): string {
  const url = new URL(value ?? '');
  const publicAat = url.protocol === 'https:' && url.hostname.endsWith('.aat.platform.hmcts.net');
  const internalAat = url.protocol === 'http:' && /^[a-z0-9-]+-aat\.service\.core-compute-aat\.internal$/.test(url.hostname);
  if ((!publicAat && !internalAat) || url.username || url.password) {
    throw new Error(`Owned WA fixture requires an approved AAT ${label}.`);
  }
  return url.origin;
}

export function requireExuiUrl(value: string | undefined): string {
  const url = new URL(value ?? '');
  if (
    url.protocol === 'https:' &&
    /^xui-webapp-pr-\d+\.preview\.platform\.hmcts\.net$/.test(url.hostname) &&
    !url.username &&
    !url.password
  )
    return url.origin;
  return requireAatUrl(value, 'EXUI URL');
}

export async function resolveActionWorkflowUrl(
  override: string | undefined,
  readConfiguration: () => Promise<{ status: number; data: { waWorkflowApi?: string } }>
): Promise<string> {
  if (override?.trim()) return requireAatUrl(override, 'workflow URL');
  const configuration = await readConfiguration();
  if (configuration.status !== 200) {
    throw new Error(`WA fixture configuration lookup failed (HTTP ${configuration.status}).`);
  }
  if (!configuration.data.waWorkflowApi?.trim()) {
    throw new Error('WA fixture has no workflow URL in environment or authenticated configuration.');
  }
  return requireAatUrl(configuration.data.waWorkflowApi, 'workflow URL');
}

export function requireOwnedActionTask(task: Task, caseReference: string, taskName: string): string {
  if (!task.id || task.case_id !== caseReference || task.name !== taskName || task.type !== TASK_TYPE) {
    throw new Error('WA fixture task does not match the newly created case and task identity.');
  }
  if (task.task_state !== 'unassigned' || task.assignee) {
    throw new Error('WA fixture task must initially be unassigned.');
  }
  const permissions = (task.permissions as { values?: string[] } | undefined)?.values?.map((permission) =>
    permission.toLowerCase()
  );
  if (!permissions || REQUIRED_ACTION_PERMISSIONS.some((permission) => !permissions.includes(permission))) {
    throw new Error('WA fixture actor lacks the required advertised action permissions.');
  }
  return task.id;
}

type ProvisionDependencies = {
  createCase: () => Promise<{ caseReference: string }>;
  sendMessage: (body: unknown) => Promise<number>;
  readTasks: (caseReference: string) => Promise<Task[]>;
  wait: () => Promise<void>;
  now: () => number;
};

function isTransientCaseProvisioningError(error: unknown): boolean {
  if (isWorkAllocationActorConfigError(error)) return false;
  const message = error instanceof Error ? error.message : String(error);
  return CASE_PROVISION_RETRY_STATUSES.some((status) => message.includes(`HTTP ${status}`));
}

async function createCaseWithTransientRetry(deps: ProvisionDependencies): Promise<{ caseReference: string }> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= CASE_PROVISION_RETRIES; attempt++) {
    try {
      return await deps.createCase();
    } catch (error) {
      lastError = error;
      if (!isTransientCaseProvisioningError(error) || attempt === CASE_PROVISION_RETRIES) throw error;
      await deps.wait();
    }
  }
  throw lastError;
}

export async function provisionOwnedActionTask(deps: ProvisionDependencies) {
  const { caseReference } = await createCaseWithTransientRetry(deps);
  if (!/^\d{16}$/.test(caseReference)) throw new Error('WA fixture creation returned an invalid case reference.');
  const idempotencyKey = randomUUID();
  const taskName = `EXUI WA action ${idempotencyKey}`;
  const values = {
    idempotencyKey,
    jurisdiction: 'PRIVATELAW',
    caseId: caseReference,
    caseType: 'PRLAPPS',
    taskId: TASK_TYPE,
    delayUntil: new Date().toISOString(),
    roleCategory: 'ADMIN',
    name: taskName,
    dueDate: new Date(Date.now() + 24 * 60 * 60_000).toISOString(),
  };
  const status = await deps.sendMessage({
    messageName: 'createTaskMessage',
    processVariables: Object.fromEntries(Object.entries(values).map(([key, value]) => [key, { value, type: 'String' }])),
    correlationKeys: null,
    all: false,
  });
  if (status !== 204) throw new Error(`WA fixture workflow creation failed (HTTP ${status}).`);
  const deadline = deps.now() + TASK_MONITOR_INITIATION_TIMEOUT_MS;
  do {
    const tasks = await deps.readTasks(caseReference);
    const ownedTasks = tasks.filter((task) => task.name === taskName);
    if (ownedTasks.length > 1) throw new Error('WA fixture returned multiple tasks for its unique task identity.');
    if (ownedTasks.length === 1) {
      const taskId = requireOwnedActionTask(ownedTasks[0], caseReference, taskName);
      return { caseReference, taskId, idempotencyKey };
    }
    await deps.wait();
  } while (deps.now() < deadline);
  throw new Error('WA fixture task-monitor initiation did not produce the owned task within six minutes.');
}

export async function cleanupOwnedActionTask(
  client: Pick<ApiClient, 'get' | 'post'>,
  owned: { taskId: string; caseReference: string }
) {
  const readOwnedTask = async (): Promise<Task> => {
    const response = await client.get<{ task: Task }>(`workallocation/task/${owned.taskId}`, { throwOnError: false });
    const task = response.data.task;
    if (response.status !== 200 || task?.case_id !== owned.caseReference || task?.id !== owned.taskId) {
      throw new Error('WA fixture cleanup could not verify its owned task.');
    }
    return task;
  };

  let task = await readOwnedTask();
  if (['completed', 'cancelled'].includes(String(task.task_state))) return;

  if (task.task_state === 'unassigned') {
    const claimed = await client.post(`workallocation/task/${owned.taskId}/claim`, { data: {}, throwOnError: false });
    if (claimed.status !== 204) throw new Error(`WA fixture owned task cleanup claim failed (HTTP ${claimed.status}).`);
    task = await readOwnedTask();
  }

  if (task.task_state !== 'assigned') throw new Error(`WA fixture cleanup cannot complete task in state ${task.task_state}.`);
  const completed = await client.post(`workallocation/task/${owned.taskId}/complete`, { data: {}, throwOnError: false });
  if (completed.status !== 204) throw new Error(`WA fixture owned task cleanup complete failed (HTTP ${completed.status}).`);
  const after = await readOwnedTask();
  if (after.task_state !== 'completed') throw new Error('WA fixture cleanup did not prove the owned task was completed.');
}

type ActionUserDetails = {
  userInfo?: { id?: string; uid?: string; email?: string; roles?: string[] };
  roleAssignmentInfo?: Array<{ jurisdiction?: string; roleName?: string; primaryLocation?: string; substantive?: string }>;
};

export function requireAuthenticatedUser(userDetails: ActionUserDetails, expectedEmail: string): void {
  const actualEmail = userDetails.userInfo?.email?.trim().toLowerCase();
  if (actualEmail && actualEmail !== expectedEmail.trim().toLowerCase()) {
    // A stale or mismatched session file can be recovered by recapturing, so this is not cached as a config error.
    throw new Error(
      `WA fixture authenticated as ${actualEmail}, expected ${expectedEmail}; the stored session belongs to another user.`
    );
  }
}

function listCourtAdminCourts(userDetails: ActionUserDetails): string[] {
  if (!userDetails.userInfo?.roles?.includes('caseworker-privatelaw-courtadmin')) {
    throw actorConfigError('WA fixture actor requires the PRL court-admin IDAM role.');
  }
  const assignments = userDetails.roleAssignmentInfo ?? [];
  return [
    ...new Set(
      assignments
        .filter(
          (role) => role.jurisdiction === 'PRIVATELAW' && role.roleName === 'hearing-centre-admin' && role.substantive === 'Y'
        )
        .map((role) => role.primaryLocation?.trim())
        .filter((court): court is string => Boolean(court))
    ),
  ];
}

function listActionCourts(userDetails: ActionUserDetails): string[] {
  return listCourtAdminCourts(userDetails);
}

export function listSharedActionCourts(operatorDetails: ActionUserDetails, assigneeDetails?: ActionUserDetails): string[] {
  const operatorCourts = listActionCourts(operatorDetails);
  if (!assigneeDetails) return operatorCourts;
  const assigneeCourts = new Set(listCourtAdminCourts(assigneeDetails));
  return operatorCourts.filter((court) => assigneeCourts.has(court));
}

export function requireAssignmentTarget(userDetails: ActionUserDetails, court: string, operatorId: string): string {
  if (!listCourtAdminCourts(userDetails).includes(court))
    throw actorConfigError('WA assignment target must have access at the same PRL court.');
  const id = userDetails.userInfo?.id ?? userDetails.userInfo?.uid;
  if (!id?.trim() || id === operatorId)
    throw actorConfigError('WA unassign requires a different, identified court-admin assignee.');
  return id;
}

export type ActionActorReadiness = { actorId: string; assigneeId: string; primaryLocation: string };

type ActorReadinessDependencies = {
  actorIdentifier: string;
  expectedEmail: string;
  readActorDetails: () => Promise<ActionUserDetails>;
  readAssigneeDetails?: () => Promise<ActionUserDetails>;
  findCourt: (candidateCourts: string[]) => Promise<string>;
};

/** Resolves the actor (and optional assignee) role/court contract; deterministic gaps throw WA_FIXTURE_ACTOR_CONFIG. */
export async function resolveActionActorReadiness(deps: ActorReadinessDependencies): Promise<ActionActorReadiness> {
  const userDetails = await deps.readActorDetails();
  requireAuthenticatedUser(userDetails, deps.expectedEmail);
  const actorId = userDetails.userInfo?.id ?? userDetails.userInfo?.uid;
  if (typeof actorId !== 'string' || !actorId) throw new Error('WA fixture actor lookup returned no identity.');
  const assigneeDetails = deps.readAssigneeDetails ? await deps.readAssigneeDetails() : undefined;
  const candidateCourts = listSharedActionCourts(userDetails, assigneeDetails);
  if (candidateCourts.length === 0)
    throw actorConfigError(
      assigneeDetails
        ? `WA fixture actor ${deps.actorIdentifier} and assignment target have no shared substantive PRL court-admin court.`
        : `WA fixture actor ${deps.actorIdentifier} has no substantive PRL court-admin court.`
    );
  const primaryLocation = await deps.findCourt(candidateCourts);
  const assigneeId = assigneeDetails ? requireAssignmentTarget(assigneeDetails, primaryLocation, actorId) : actorId;
  return { actorId, assigneeId, primaryLocation };
}

const actorReadinessByKey = new Map<string, Promise<ActionActorReadiness>>();

/**
 * Runs the actor readiness check once per worker per actor/assignee pair. A configuration failure stays cached so
 * later fixtures in the worker fail immediately; any other failure is evicted so the next fixture re-checks.
 */
export function memoiseActionActorReadiness(
  key: string,
  resolve: () => Promise<ActionActorReadiness>,
  cache: Map<string, Promise<ActionActorReadiness>> = actorReadinessByKey
): Promise<ActionActorReadiness> {
  const cached = cache.get(key);
  if (cached) return cached;
  const pending = resolve();
  cache.set(key, pending);
  pending.catch((error: unknown) => {
    if (!isWorkAllocationActorConfigError(error) && cache.get(key) === pending) cache.delete(key);
  });
  return pending;
}

export async function createWorkAllocationActionFixture(assigneeUserIdentifier?: string) {
  const configuration = resolvePrlHearingsCaseSetupConfig();
  const baseUrl = requireExuiUrl(configuration.manageCaseUrl);
  const s2sUrl = new URL(configuration.s2sUrl ?? '');
  requireAatUrl(s2sUrl.toString(), 'S2S URL');
  requireAatUrl(configuration.ccdDataStoreUrl, 'CCD URL');
  requireAatUrl(configuration.prlCosApiUrl, 'PRL URL');
  const userIdentifier = 'WA_TASK_ADMIN';
  const credentials = resolveRuntimeUserCredentialsForIdentifier(userIdentifier);
  if (!credentials) throw actorConfigError(`WA fixture selected identity ${userIdentifier} has no configured credentials.`);
  const session = await ensureSessionCookies(userIdentifier);
  const xsrf = session.cookies.find((cookie) => cookie.name === 'XSRF-TOKEN')?.value;
  if (!xsrf) throw new Error('WA fixture session has no XSRF cookie.');
  const bearerToken = session.cookies.find((cookie) => cookie.name === '__auth__')?.value;
  if (!bearerToken) throw new Error('WA fixture session has no authenticated identity token.');
  const headers = { 'X-XSRF-TOKEN': xsrf, Accept: 'application/json' };
  const context = await request.newContext({ baseURL: baseUrl, storageState: session.storageFile, extraHTTPHeaders: headers });
  const serviceContext = await request.newContext();
  try {
    const workflowUrl = await resolveActionWorkflowUrl(
      process.env.SERVICES_WA_WORKFLOW_API_URL ?? process.env.WA_WORKFLOW_API_URL,
      async () => {
        const response = await context.get('/external/config/ui');
        return { status: response.status(), data: response.status() === 200 ? await response.json() : {} };
      }
    );
    const readiness = await memoiseActionActorReadiness(`${userIdentifier}->${assigneeUserIdentifier ?? 'self'}`, () =>
      resolveActionActorReadiness({
        actorIdentifier: userIdentifier,
        expectedEmail: credentials.email,
        readActorDetails: async () => {
          const userResponse = await context.get('/api/user/details?refreshRoleAssignments=true');
          if (userResponse.status() !== 200) throw new Error(`WA fixture actor lookup failed (HTTP ${userResponse.status()}).`);
          return userResponse.json();
        },
        readAssigneeDetails: assigneeUserIdentifier
          ? async () => {
              const assigneeSession = await ensureSessionCookies(assigneeUserIdentifier);
              const assigneeContext = await request.newContext({ baseURL: baseUrl, storageState: assigneeSession.storageFile });
              try {
                const response = await assigneeContext.get('/api/user/details?refreshRoleAssignments=true');
                if (response.status() !== 200) throw new Error(`WA assignment target lookup failed (HTTP ${response.status()}).`);
                return response.json();
              } finally {
                await assigneeContext.dispose();
              }
            }
          : undefined,
        findCourt: (candidateCourts) =>
          findPrlWorkAllocationCourt(candidateCourts, {
            username: credentials.email,
            password: credentials.password,
            bearerToken,
          }),
      })
    );
    const { actorId, assigneeId, primaryLocation } = readiness;
    const tokenResponse = await serviceContext.post(s2sUrl.toString(), { data: { microservice: 'xui_webapp' } });
    if (tokenResponse.status() !== 200) throw new Error(`WA fixture S2S lookup failed (HTTP ${tokenResponse.status()}).`);
    const serviceToken = (await tokenResponse.text()).trim();
    if (!serviceToken) throw new Error('WA fixture S2S lookup returned no token.');
    const owned = await provisionOwnedActionTask({
      createCase: () =>
        createPrlHearingsCase(primaryLocation, { username: credentials.email, password: credentials.password, bearerToken }),
      sendMessage: async (body) =>
        (
          await serviceContext.post(`${workflowUrl}/workflow/message`, {
            headers: { Authorization: `Bearer ${bearerToken}`, ServiceAuthorization: `Bearer ${serviceToken}` },
            data: body,
          })
        ).status(),
      readTasks: async (caseReference) => {
        const response = await context.get(`/workallocation/case/task/${caseReference}`);
        if (response.status() !== 200) throw new Error(`WA fixture owned task lookup failed (HTTP ${response.status()}).`);
        const body = await response.json();
        const tasks = Array.isArray(body) ? body : body.tasks;
        if (!Array.isArray(tasks)) throw new Error('WA fixture owned task lookup returned no task array.');
        return tasks;
      },
      wait: () => new Promise((resolve) => setTimeout(resolve, 2_000)),
      now: Date.now,
    });
    const client = new ApiClient({
      baseUrl,
      defaultHeaders: headers,
      requestFactory: async () => context,
      captureRawBodies: false,
    });
    const cleanup = () => cleanupOwnedActionTask(client, owned);
    return { ...owned, actorId, assigneeId, userIdentifier, client, headers, cleanup, dispose: () => context.dispose() };
  } catch (error) {
    await context.dispose();
    throw error;
  } finally {
    await serviceContext.dispose();
  }
}
