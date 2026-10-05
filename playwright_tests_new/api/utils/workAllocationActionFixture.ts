import { randomUUID } from 'node:crypto';
import { request } from '@playwright/test';
import { ApiClient } from '@hmcts/playwright-common';
import { ensureSessionCookies } from '../../common/sessionCapture';
import { resolveRuntimeUserCredentialsForIdentifier } from '../../E2E/utils/runtimeUserCredentials';
import {
  createPrlHearingsCase,
  findPrlWorkAllocationCourt,
  resolvePrlHearingsCaseSetupConfig,
} from '../../E2E/utils/test-setup/prlHearingsCaseSetup';
import type { Task } from './types';

const TASK_TYPE = 'newCaseTransferredToCourt';
const REQUIRED_PERMISSIONS = ['read', 'own', 'claim', 'unclaim', 'assign', 'unassign', 'complete', 'cancel'];

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
  const permissions = (task.permissions as { values?: string[] } | undefined)?.values;
  if (!Array.isArray(permissions) || REQUIRED_PERMISSIONS.some((permission) => !permissions.includes(permission))) {
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

export async function provisionOwnedActionTask(deps: ProvisionDependencies) {
  const { caseReference } = await deps.createCase();
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
  const deadline = deps.now() + 3 * 60_000;
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
  throw new Error('WA fixture task-monitor initiation did not produce the owned task within three minutes.');
}

export async function cleanupOwnedActionTask(
  client: Pick<ApiClient, 'get' | 'post'>,
  owned: { taskId: string; caseReference: string }
) {
  const before = await client.get<{ task: Task }>(`workallocation/task/${owned.taskId}`, { throwOnError: false });
  if (before.status !== 200 || before.data.task?.case_id !== owned.caseReference || before.data.task?.id !== owned.taskId) {
    throw new Error('WA fixture cleanup could not verify its owned task.');
  }
  if (['completed', 'cancelled'].includes(String(before.data.task.task_state))) return;
  const cancelled = await client.post(`workallocation/task/${owned.taskId}/cancel`, { data: {}, throwOnError: false });
  if (cancelled.status !== 204) throw new Error(`WA fixture owned task cleanup failed (HTTP ${cancelled.status}).`);
  const after = await client.get<{ task: Task }>(`workallocation/task/${owned.taskId}`, { throwOnError: false });
  if (after.status !== 200 || after.data.task?.task_state !== 'cancelled') {
    throw new Error('WA fixture cleanup did not prove the owned task was cancelled.');
  }
}

type ActionUserDetails = {
  userInfo?: { id?: string; uid?: string; roles?: string[] };
  roleAssignmentInfo?: Array<{ jurisdiction?: string; roleName?: string; primaryLocation?: string; substantive?: string }>;
};

function listCourtAdminCourts(userDetails: ActionUserDetails): string[] {
  if (!userDetails.userInfo?.roles?.includes('caseworker-privatelaw-courtadmin')) {
    throw new Error('WA fixture actor requires the PRL court-admin IDAM role.');
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
  const assignments = userDetails.roleAssignmentInfo ?? [];
  return listCourtAdminCourts(userDetails).filter((court) =>
    assignments.some(
      (role) => role.jurisdiction === 'PRIVATELAW' && role.roleName === 'task-supervisor' && role.primaryLocation === court
    )
  );
}

export function requireActionCourt(userDetails: ActionUserDetails): string {
  const courts = listCourtAdminCourts(userDetails);
  if (courts.length !== 1) throw new Error('WA fixture actor requires one unambiguous substantive PRL court-admin court.');
  const court = courts[0];
  const assignments = userDetails.roleAssignmentInfo ?? [];
  if (
    !assignments.some(
      (role) => role.jurisdiction === 'PRIVATELAW' && role.roleName === 'task-supervisor' && role.primaryLocation === court
    )
  ) {
    throw new Error('WA fixture actor requires task-supervisor access at the same PRL court.');
  }
  return court;
}

export function requireAssignmentTarget(userDetails: ActionUserDetails, court: string, operatorId: string): string {
  if (!listCourtAdminCourts(userDetails).includes(court))
    throw new Error('WA assignment target must have access at the same PRL court.');
  const id = userDetails.userInfo?.id ?? userDetails.userInfo?.uid;
  if (!id?.trim() || id === operatorId) throw new Error('WA unassign requires a different, identified court-admin assignee.');
  return id;
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
  if (!credentials) throw new Error('WA fixture selected identity has no configured credentials.');
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
    const userResponse = await context.get('/api/user/details?refreshRoleAssignments=true');
    if (userResponse.status() !== 200) throw new Error(`WA fixture actor lookup failed (HTTP ${userResponse.status()}).`);
    const userDetails = await userResponse.json();
    const candidateCourts = listActionCourts(userDetails);
    if (candidateCourts.length === 0) throw new Error('WA fixture actor has no substantive PRL court-admin court.');
    const primaryLocation = await findPrlWorkAllocationCourt(candidateCourts, {
      username: credentials.email,
      password: credentials.password,
    });
    const actorId = userDetails.userInfo?.id ?? userDetails.userInfo?.uid;
    if (typeof actorId !== 'string' || !actorId) throw new Error('WA fixture actor lookup returned no identity.');
    let assigneeId = actorId;
    if (assigneeUserIdentifier) {
      const assigneeSession = await ensureSessionCookies(assigneeUserIdentifier);
      const assigneeContext = await request.newContext({ baseURL: baseUrl, storageState: assigneeSession.storageFile });
      try {
        const response = await assigneeContext.get('/api/user/details?refreshRoleAssignments=true');
        if (response.status() !== 200) throw new Error(`WA assignment target lookup failed (HTTP ${response.status()}).`);
        assigneeId = requireAssignmentTarget(await response.json(), primaryLocation, actorId);
      } finally {
        await assigneeContext.dispose();
      }
    }
    const tokenResponse = await serviceContext.post(s2sUrl.toString(), { data: { microservice: 'xui_webapp' } });
    if (tokenResponse.status() !== 200) throw new Error(`WA fixture S2S lookup failed (HTTP ${tokenResponse.status()}).`);
    const serviceToken = (await tokenResponse.text()).trim();
    if (!serviceToken) throw new Error('WA fixture S2S lookup returned no token.');
    const owned = await provisionOwnedActionTask({
      createCase: () => createPrlHearingsCase(primaryLocation, { username: credentials.email, password: credentials.password }),
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
