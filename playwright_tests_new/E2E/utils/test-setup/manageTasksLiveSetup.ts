import type { Page, TestInfo } from '@playwright/test';

import type { CaseDetailsPage } from '../../page-objects/pages/exui/caseDetails.po';
import type { CreateCasePage } from '../../page-objects/pages/exui/createCase.po';
import type { ProfessionalUserUtils } from '../professional-user.utils';
import type { SessionIdentity } from '../../../common/sessionIdentity';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { buildCasePayloadFromTemplate } from './payloads/registry';
import { setupCaseForJourney } from './caseSetup';
import { provisionDynamicSolicitorForAlias } from './dynamicSolicitorSession';
import { createEmploymentCase } from './journeys/employmentJourneys';
import { cleanupWaTaskRoleAssignmentsForManageTasksCase, provisionWaTaskForManageTasksCase } from './waLiveTaskProvisioning';

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

const CLAIMABLE_ACTION = 'claim';
const EMPLOYMENT_JURISDICTION = 'EMPLOYMENT';
const EMPLOYMENT_CASE_TYPE = 'ET_EnglandWales';
const CASE_ROLE_ACCESS_ENDPOINT = 'api/role-access/roles/access-get-by-caseId';
const DEFAULT_TASK_READY_TIMEOUT_MS = 120_000;
const DEFAULT_TASK_READY_POLL_INTERVAL_MS = 5_000;

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
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
    `Created Employment case ${caseNumber} did not produce a claimable WA task within ${timeoutMs}ms. ` +
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
  const { user, sessionIdentity } = await provisionDynamicSolicitorForAlias({
    alias: 'EMPLOYMENT_DYNAMIC_SOLICITOR',
    professionalUserUtils,
    roleContext: {
      jurisdiction: 'employment',
      caseType: EMPLOYMENT_CASE_TYPE,
      testType: 'case-create',
    },
    testInfo,
    mode: 'auto',
    assertEmploymentAssignmentPayloadAccepted: true,
  });

  await ensureAuthenticatedPage(page, sessionIdentity, { waitForSelector: 'exui-header' });

  const setup = await setupCaseForJourney({
    scenario: 'manage-tasks-dynamic-org-dynamic-user',
    jurisdiction: EMPLOYMENT_JURISDICTION,
    caseType: EMPLOYMENT_CASE_TYPE,
    apiEventId: 'initiateCase',
    mode: 'ui-only',
    apiPayload: buildCasePayloadFromTemplate('employment.et-england-wales.initiate-case'),
    uiCreate: () =>
      createEmploymentCase(createCasePage, EMPLOYMENT_JURISDICTION, EMPLOYMENT_CASE_TYPE, { allowDraftClaimFallback: true }),
    page,
    createCasePage,
    caseDetailsPage,
    testInfo,
  });

  const waProvisioning = await provisionWaTaskForManageTasksCase({
    user,
    caseNumber: setup.caseNumber,
    jurisdiction: EMPLOYMENT_JURISDICTION,
    caseType: EMPLOYMENT_CASE_TYPE,
    testInfo,
  });

  const cleanup = async (): Promise<void> => {
    await cleanupWaTaskRoleAssignmentsForManageTasksCase({
      roleAssignmentIds: waProvisioning.roleAssignmentIds,
      roleAssignmentReference: waProvisioning.roleAssignmentReference,
      testInfo,
    });
  };

  let task: ManageTasksLiveTask;
  try {
    task = await waitForClaimableTaskForCase({
      page,
      caseNumber: setup.caseNumber,
      testInfo,
    });
  } catch (error) {
    await cleanup();
    throw error;
  }

  const liveSetup = {
    caseNumber: setup.caseNumber,
    sessionIdentity,
    userId: user.id,
    task,
    cleanup,
  };

  await testInfo.attach('manage-tasks-live-setup.json', {
    body: JSON.stringify(
      {
        caseNumber: liveSetup.caseNumber,
        userId: liveSetup.userId,
        task: liveSetup.task,
        dynamicUser: {
          email: user.email,
          organisationId: user.organisationAssignment.organisationId,
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
  extractTasks,
  fetchRoleAccessDiagnostics,
  normalizeTask,
  summarizeRoleAccessPayload,
  waitForClaimableTaskForCase,
};
