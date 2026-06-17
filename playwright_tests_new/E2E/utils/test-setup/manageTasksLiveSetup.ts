import type { Page, TestInfo } from '@playwright/test';

import type { CaseDetailsPage } from '../../page-objects/pages/exui/caseDetails.po';
import type { CreateCasePage } from '../../page-objects/pages/exui/createCase.po';
import type { ProfessionalUserUtils } from '../professional-user.utils';
import type { SessionIdentity } from '../../../common/sessionIdentity';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { setupCaseForJourney } from './caseSetup';
import { provisionDynamicSolicitorForAlias } from './dynamicSolicitorSession';
import {
  cleanupWaTaskRoleAssignmentsForManageTasksCase,
  provisionWaTaskForManageTasksCase,
  resolveWaTaskProvisioningReadiness,
} from './waLiveTaskProvisioning';

export type ManageTasksLiveTask = {
  id: string;
  caseId: string;
  caseName: string;
  taskTitle: string;
  state: string;
  actions: string[];
};

export type ManageTasksLiveSetup = {
  caseNumber: string;
  sessionIdentity: SessionIdentity;
  userId?: string;
  task: ManageTasksLiveTask;
  cleanup: () => Promise<void>;
};

type CaseRoleDiagnostic = {
  id?: string;
  actorId?: string;
  roleName?: string;
  roleCategory?: string;
};

type CaseRoleAccessDiagnostic = {
  status?: number;
  roleCount: number;
  roles: CaseRoleDiagnostic[];
  error?: string;
};

type ManageTasksSetupRequest = {
  page: Page;
  createCasePage: CreateCasePage;
  caseDetailsPage: CaseDetailsPage;
  professionalUserUtils: ProfessionalUserUtils;
  testInfo: TestInfo;
};

type CaseTaskPollAttempt = {
  attempt: number;
  elapsedMs: number;
  status?: number;
  taskCount?: number;
  claimableTaskCount?: number;
  note?: string;
};

type ManageTasksCleanupStep = {
  name: string;
  action: () => Promise<void>;
};

const CLAIMABLE_ACTION = 'claim';
const WA_JURISDICTION = 'WA';
const WA_CASE_TYPE = 'WaCaseType';
const MANAGE_TASKS_WA_CASEWORKER_ROLES = ['caseworker', 'caseworker-wa', 'caseworker-wa-task-configuration'] as const;
const CASE_ROLE_ACCESS_ENDPOINT = 'api/role-access/roles/access-get-by-caseId';
const XSRF_COOKIE_NAME = 'XSRF-TOKEN';
const TASK_CANCEL_ENDPOINT_SUFFIX = 'cancel';
const DEFAULT_TASK_READY_TIMEOUT_MS = 90_000;
const DEFAULT_TASK_READY_POLL_INTERVAL_MS = 2_000;
const ACCEPTED_TASK_CLEANUP_STATUSES = new Set([200, 204, 404, 409]);

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function buildManageTasksWaCasePayload(): { fieldValues: Record<string, unknown> } {
  return {
    fieldValues: {
      TextField: 'EXUI automated Manage Tasks case',
      caseAccessCategory: 'categoryA,categoryC',
      appellantGivenNames: 'EXUI',
      appellantFamilyName: 'Automated',
      appealType: 'protection',
      nextHearingId: 'exui-auto-next-hearing',
      nextHearingDate: new Date(Date.now() + 2 * 24 * 60 * 60_000).toISOString(),
      urgent: 'Yes',
    },
  };
}

function resolveTaskReadyTimeoutMs(): number {
  return parsePositiveInteger(process.env.PW_E2E_MANAGE_TASKS_TASK_READY_TIMEOUT_MS, DEFAULT_TASK_READY_TIMEOUT_MS);
}

function resolveTaskReadyPollIntervalMs(): number {
  return parsePositiveInteger(process.env.PW_E2E_MANAGE_TASKS_TASK_READY_POLL_INTERVAL_MS, DEFAULT_TASK_READY_POLL_INTERVAL_MS);
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || undefined;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return undefined;
}

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function buildSetupFailureWithCleanupFailure(setupError: unknown, cleanupError: unknown): Error {
  return new Error(
    `Manage Tasks live setup failed before cleanup completed. ` +
      `Setup failure: ${describeError(setupError)}. Cleanup failure: ${describeError(cleanupError)}.`,
    { cause: setupError }
  );
}

function normalizeActions(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return [
    ...new Set(
      value
        .map((entry) => {
          if (typeof entry === 'string') {
            return entry.trim();
          }
          return asTrimmedString(asRecord(entry)?.id);
        })
        .filter((entry): entry is string => Boolean(entry))
    ),
  ];
}

function extractTasks(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }
  const record = asRecord(payload);
  const tasks = record?.tasks;
  return Array.isArray(tasks) ? tasks : [];
}

function sanitizeRoleDiagnostic(value: unknown): CaseRoleDiagnostic | undefined {
  const role = asRecord(value);
  if (!role) {
    return undefined;
  }

  return {
    id: asTrimmedString(role.id),
    actorId: asTrimmedString(role.actorId),
    roleName: asTrimmedString(role.roleName),
    roleCategory: asTrimmedString(role.roleCategory),
  };
}

function summarizeRoleAccessPayload(status: number, payload: unknown): CaseRoleAccessDiagnostic {
  const roles = (Array.isArray(payload) ? payload : [])
    .map(sanitizeRoleDiagnostic)
    .filter((role): role is CaseRoleDiagnostic => Boolean(role));

  return {
    status,
    roleCount: roles.length,
    roles,
  };
}

function normalizeTask(value: unknown): ManageTasksLiveTask | undefined {
  const task = asRecord(value);
  if (!task) {
    return undefined;
  }

  const id = asTrimmedString(task.id);
  const caseId = asTrimmedString(task.case_id) ?? asTrimmedString(task.caseId);
  const caseName = asTrimmedString(task.case_name) ?? asTrimmedString(task.caseName);
  const taskTitle = asTrimmedString(task.task_title) ?? asTrimmedString(task.name);

  if (!id || !caseId || !caseName || !taskTitle) {
    return undefined;
  }

  return {
    id,
    caseId,
    caseName,
    taskTitle,
    state: asTrimmedString(task.task_state) ?? asTrimmedString(task.state) ?? 'unknown',
    actions: normalizeActions(task.actions),
  };
}

async function fetchRoleAccessDiagnostics(page: Page, caseNumber: string): Promise<CaseRoleAccessDiagnostic> {
  const response = await page.request.post(CASE_ROLE_ACCESS_ENDPOINT, {
    data: { caseId: caseNumber },
    failOnStatusCode: false,
  });

  const status = response.status();
  const payload = await response.json().catch(async () => {
    const text = await response.text().catch(() => '');
    return { error: text.slice(0, 500) };
  });

  if (status < 200 || status >= 300) {
    return {
      status,
      roleCount: 0,
      roles: [],
      error: JSON.stringify(payload).slice(0, 500),
    };
  }

  return summarizeRoleAccessPayload(status, payload);
}

async function fetchTasksForCase(page: Page, caseNumber: string): Promise<{ status: number; tasks: ManageTasksLiveTask[] }> {
  const response = await page.request.post(`workallocation/case/task/${encodeURIComponent(caseNumber)}`, {
    data: { refined: true },
    failOnStatusCode: false,
  });

  if (response.status() < 200 || response.status() >= 300) {
    return {
      status: response.status(),
      tasks: [],
    };
  }

  const payload = await response.json().catch(() => []);
  return {
    status: response.status(),
    tasks: extractTasks(payload)
      .map(normalizeTask)
      .filter((task): task is ManageTasksLiveTask => Boolean(task)),
  };
}

async function readResponsePreview(response: { json: () => Promise<unknown>; text: () => Promise<string> }): Promise<unknown> {
  return response.json().catch(async () => response.text().catch(() => ''));
}

async function buildXsrfHeadersFromPage(page: Page): Promise<Record<string, string>> {
  const currentUrl = page.url();
  const cookies = currentUrl.startsWith('http') ? await page.context().cookies(currentUrl) : await page.context().cookies();
  const xsrf = cookies.find((cookie) => cookie.name === XSRF_COOKIE_NAME)?.value?.trim();
  return xsrf ? { 'X-XSRF-TOKEN': xsrf } : {};
}

async function runManageTasksCleanupSteps(steps: ManageTasksCleanupStep[]): Promise<void> {
  const failures: Array<{ name: string; error: Error }> = [];

  for (const step of steps) {
    try {
      await step.action();
    } catch (error) {
      failures.push({ name: step.name, error: error instanceof Error ? error : new Error(String(error)) });
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `Manage Tasks live cleanup failed: ${failures.map((failure) => `${failure.name}: ${failure.error.message}`).join('; ')}`
    );
  }
}

async function cleanupWaTaskForManageTasksCase({
  page,
  taskId,
  testInfo,
}: {
  page: Page;
  taskId?: string;
  testInfo: TestInfo;
}): Promise<void> {
  if (!taskId?.trim()) {
    await testInfo.attach('manage-tasks-wa-task-cleanup.json', {
      body: JSON.stringify({ status: 'skipped', ok: true, note: 'no WA task id was created' }, null, 2),
      contentType: 'application/json',
    });
    return;
  }

  const endpoint = `workallocation/task/${encodeURIComponent(taskId)}/${TASK_CANCEL_ENDPOINT_SUFFIX}`;
  const requestPayload = { hasNoAssigneeOnComplete: false };
  const headers = await buildXsrfHeadersFromPage(page);
  const response = await page.request.post(endpoint, {
    data: requestPayload,
    headers,
    failOnStatusCode: false,
  });
  const status = response.status();
  const cleanup = {
    taskId,
    endpoint,
    action: TASK_CANCEL_ENDPOINT_SUFFIX,
    requestPayload,
    hasXsrfToken: Boolean(headers['X-XSRF-TOKEN']),
    status,
    ok: ACCEPTED_TASK_CLEANUP_STATUSES.has(status),
    responsePreview: await readResponsePreview(response),
  };

  await testInfo.attach('manage-tasks-wa-task-cleanup.json', {
    body: JSON.stringify(cleanup, null, 2),
    contentType: 'application/json',
  });

  if (!cleanup.ok) {
    throw new Error(`WA task cleanup failed for ${taskId}: cancel returned HTTP ${status}.`);
  }
}

async function waitForClaimableTaskForCase({
  page,
  caseNumber,
  testInfo,
}: {
  page: Page;
  caseNumber: string;
  testInfo: TestInfo;
}): Promise<ManageTasksLiveTask> {
  const timeoutMs = resolveTaskReadyTimeoutMs();
  const pollIntervalMs = resolveTaskReadyPollIntervalMs();
  const startedAt = Date.now();
  const deadline = startedAt + timeoutMs;
  const attempts: CaseTaskPollAttempt[] = [];
  let lastTasks: ManageTasksLiveTask[] = [];

  for (let attempt = 1; Date.now() < deadline; attempt += 1) {
    const result = await fetchTasksForCase(page, caseNumber);
    const matchingCaseTasks = result.tasks.filter((task) => task.caseId === caseNumber);
    const claimableTask = matchingCaseTasks.find((task) => task.actions.includes(CLAIMABLE_ACTION));
    lastTasks = matchingCaseTasks;
    attempts.push({
      attempt,
      elapsedMs: Date.now() - startedAt,
      status: result.status,
      taskCount: matchingCaseTasks.length,
      claimableTaskCount: matchingCaseTasks.filter((task) => task.actions.includes(CLAIMABLE_ACTION)).length,
    });

    if (claimableTask) {
      await testInfo.attach('manage-tasks-live-task-poll.json', {
        body: JSON.stringify({ caseNumber, attempts, selectedTask: claimableTask }, null, 2),
        contentType: 'application/json',
      });
      return claimableTask;
    }

    const remainingMs = deadline - Date.now();
    await page.waitForTimeout(Math.min(pollIntervalMs, Math.max(0, remainingMs)));
  }

  attempts.push({
    attempt: attempts.length + 1,
    elapsedMs: Date.now() - startedAt,
    taskCount: lastTasks.length,
    claimableTaskCount: lastTasks.filter((task) => task.actions.includes(CLAIMABLE_ACTION)).length,
    note: 'timed out waiting for a case task with claim action',
  });

  const roleAccess = await fetchRoleAccessDiagnostics(page, caseNumber).catch((error: Error) => ({
    roleCount: 0,
    roles: [],
    error: error.message,
  }));

  await testInfo.attach('manage-tasks-live-task-poll.json', {
    body: JSON.stringify({ caseNumber, attempts, lastTasks, roleAccess }, null, 2),
    contentType: 'application/json',
  });

  await testInfo.attach('manage-tasks-live-role-access.json', {
    body: JSON.stringify({ caseNumber, roleAccess }, null, 2),
    contentType: 'application/json',
  });

  throw new Error(
    `Created WA case ${caseNumber} did not produce a claimable WA task within ${timeoutMs}ms. ` +
      `Last tasks: ${JSON.stringify(lastTasks)}. ` +
      `Role access status: ${roleAccess.status ?? 'unknown'}, roles visible: ${roleAccess.roleCount}.`
  );
}

export async function setupClaimableManageTasksCase({
  page,
  createCasePage,
  caseDetailsPage,
  professionalUserUtils,
  testInfo,
}: ManageTasksSetupRequest): Promise<ManageTasksLiveSetup> {
  const waReadiness = resolveWaTaskProvisioningReadiness(process.env);
  if (!waReadiness.ready) {
    throw new Error(`Manage Tasks live E2E requires WA task provisioning. ${waReadiness.skipped}`);
  }

  const { user: caseCreator, sessionIdentity: caseCreatorSessionIdentity } = await provisionDynamicSolicitorForAlias({
    alias: 'WA_DYNAMIC_SOLICITOR',
    professionalUserUtils,
    roleNames: MANAGE_TASKS_WA_CASEWORKER_ROLES,
    roleContext: {
      jurisdiction: WA_JURISDICTION,
      caseType: WA_CASE_TYPE,
      testType: 'case-create',
    },
    testInfo,
    mode: 'auto',
  });

  await ensureAuthenticatedPage(page, caseCreatorSessionIdentity, { waitForSelector: 'exui-header' });

  const setup = await setupCaseForJourney({
    scenario: 'manage-tasks-dynamic-org-dynamic-user',
    jurisdiction: WA_JURISDICTION,
    caseType: WA_CASE_TYPE,
    apiEventId: 'CREATE',
    mode: 'api-required',
    apiPayload: buildManageTasksWaCasePayload(),
    page,
    createCasePage,
    caseDetailsPage,
    testInfo,
  });

  const { user: taskActor, sessionIdentity: taskActorSessionIdentity } = await provisionDynamicSolicitorForAlias({
    alias: 'WA_DYNAMIC_CASEWORKER',
    professionalUserUtils,
    roleNames: MANAGE_TASKS_WA_CASEWORKER_ROLES,
    roleContext: {
      jurisdiction: WA_JURISDICTION,
      caseType: WA_CASE_TYPE,
    },
    testInfo,
    mode: 'auto',
  });

  await ensureAuthenticatedPage(page, taskActorSessionIdentity, { waitForSelector: 'exui-header' });

  const waProvisioning = await provisionWaTaskForManageTasksCase({
    user: taskActor,
    caseNumber: setup.caseNumber,
    jurisdiction: WA_JURISDICTION,
    caseType: WA_CASE_TYPE,
    testInfo,
  });

  if (!waProvisioning.attempted) {
    throw new Error(
      `Manage Tasks live E2E requires WA task provisioning for case ${setup.caseNumber}. ` +
        `${waProvisioning.diagnostics.skipped ?? 'Provisioning was not attempted.'}`
    );
  }

  const cleanup = async (): Promise<void> => {
    await runManageTasksCleanupSteps([
      {
        name: 'wa-task-cancel',
        action: () =>
          cleanupWaTaskForManageTasksCase({
            page,
            taskId: waProvisioning.taskId,
            testInfo,
          }),
      },
      {
        name: 'wa-role-assignment-delete',
        action: () =>
          cleanupWaTaskRoleAssignmentsForManageTasksCase({
            roleAssignmentIds: waProvisioning.roleAssignmentIds,
            roleAssignmentReference: waProvisioning.roleAssignmentReference,
            testInfo,
          }),
      },
    ]);
  };

  let task: ManageTasksLiveTask;
  try {
    task = await waitForClaimableTaskForCase({
      page,
      caseNumber: setup.caseNumber,
      testInfo,
    });
  } catch (error) {
    try {
      await cleanup();
    } catch (cleanupError) {
      throw buildSetupFailureWithCleanupFailure(error, cleanupError);
    }
    throw error;
  }

  const liveSetup = {
    caseNumber: setup.caseNumber,
    sessionIdentity: taskActorSessionIdentity,
    userId: taskActor.id,
    task,
    cleanup,
  };

  await testInfo.attach('manage-tasks-live-setup.json', {
    body: JSON.stringify(
      {
        caseNumber: liveSetup.caseNumber,
        userId: liveSetup.userId,
        task: liveSetup.task,
        dynamicCaseCreator: {
          email: caseCreator.email,
          organisationId: caseCreator.organisationAssignment.organisationId,
        },
        dynamicTaskActor: {
          email: taskActor.email,
          organisationId: taskActor.organisationAssignment.organisationId,
        },
      },
      null,
      2
    ),
    contentType: 'application/json',
  });

  return liveSetup;
}

export const __test__ = {
  buildXsrfHeadersFromPage,
  buildSetupFailureWithCleanupFailure,
  cleanupWaTaskForManageTasksCase,
  describeError,
  extractTasks,
  fetchRoleAccessDiagnostics,
  normalizeTask,
  runManageTasksCleanupSteps,
  summarizeRoleAccessPayload,
  waitForClaimableTaskForCase,
};
