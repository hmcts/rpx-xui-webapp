import type { Page, Route } from '@playwright/test';
import { setupTaskListBootstrapRoutes, taskListRoutePattern } from '../helpers';

export type CancellationScenario = {
  scenario: string;
  jurisdiction: string;
  caseTypeId: string;
  caseId: string;
  caseName: string;
};

export type MyTaskRouteOptions = {
  includeCancelAction?: boolean;
  cancelResponseStatus?: number;
};

export type MyTaskActionRouteOptions = {
  actionId?: string;
  includeAction?: boolean;
  actionResponseStatus?: number;
};

type TaskAction = { id?: string };

export type TaskRecord = Record<string, unknown> & {
  actions?: TaskAction[];
  assignee?: string;
};

export type CaseDetailsTemplate = {
  case_id?: string;
  id?: string;
  case_type?: {
    id?: string;
    jurisdiction?: {
      id?: string;
    };
  };
  [key: string]: unknown;
};

export function buildCasePayload(template: CaseDetailsTemplate, scenario: CancellationScenario): CaseDetailsTemplate {
  return {
    ...template,
    case_id: scenario.caseId,
    id: scenario.caseId,
    case_type: {
      ...template.case_type,
      id: scenario.caseTypeId,
      jurisdiction: {
        ...template.case_type?.jurisdiction,
        id: scenario.jurisdiction,
      },
    },
  };
}

type MyTaskCancellationRouteResult = {
  getCancelRequestUrl: () => string;
  getCancelRequestBody: () => Record<string, unknown> | null;
};

type MyTaskActionRouteResult = {
  getActionRequestUrl: () => string;
  getActionRequestBody: () => Record<string, unknown> | null;
};

export async function routeMyTaskActionFlow(
  page: Page,
  taskId: string,
  task: TaskRecord,
  options: MyTaskActionRouteOptions = {}
): Promise<MyTaskActionRouteResult> {
  const actionId = options.actionId ?? 'cancel';
  const includeAction = options.includeAction ?? true;
  const actionResponseStatus = options.actionResponseStatus ?? 200;

  let actionRequestUrl = '';
  let actionRequestBody: Record<string, unknown> | null = null;
  let actionInvoked = false;

  const actions = Array.isArray(task.actions) ? task.actions : [];
  const taskWithActions = includeAction
    ? task
    : {
        ...task,
        actions: actions.filter((action) => action?.id !== actionId),
      };

  await setupTaskListBootstrapRoutes(page);

  await page.route(taskListRoutePattern, async (route: Route) => {
    if (route.request().method() !== 'POST') {
      await route.fallback();
      return;
    }

    const tasks = actionInvoked ? [] : [taskWithActions];
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ tasks, total_records: tasks.length }),
    });
  });

  await page.route(`**/workallocation/task/${taskId}/roles*`, async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });

  await page.route(`**/workallocation/task/${taskId}*`, async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ task: taskWithActions }) });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName', async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });

  await page.route(`**/workallocation/task/${taskId}/${actionId}*`, async (route: Route) => {
    actionInvoked = true;
    actionRequestUrl = route.request().url();
    const postData = route.request().postDataJSON();
    actionRequestBody = postData && typeof postData === 'object' ? (postData as Record<string, unknown>) : null;
    await route.fulfill({ status: actionResponseStatus, contentType: 'application/json', body: '{}' });
  });

  return {
    getActionRequestUrl: () => actionRequestUrl,
    getActionRequestBody: () => actionRequestBody,
  };
}

export async function routeMyTaskCancellationFlow(
  page: Page,
  taskId: string,
  task: TaskRecord,
  options: MyTaskRouteOptions = {}
): Promise<MyTaskCancellationRouteResult> {
  const { getActionRequestUrl, getActionRequestBody } = await routeMyTaskActionFlow(page, taskId, task, {
    actionId: 'cancel',
    includeAction: options.includeCancelAction,
    actionResponseStatus: options.cancelResponseStatus,
  });

  return {
    getCancelRequestUrl: getActionRequestUrl,
    getCancelRequestBody: getActionRequestBody,
  };
}

export type CaseDetailsTaskActionRouteOptions = {
  actionId?: string;
  actionResponseStatus?: number;
};

export async function routeCaseDetailsTaskActionFlow(
  page: Page,
  taskId: string,
  scenario: CancellationScenario,
  task: TaskRecord,
  caseDetailsTemplate: CaseDetailsTemplate,
  options: CaseDetailsTaskActionRouteOptions = {}
): Promise<void> {
  const actionId = options.actionId ?? 'cancel';
  const actionResponseStatus = options.actionResponseStatus ?? 200;
  let actionInvoked = false;

  await page.route('**/data/internal/cases/**', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildCasePayload(caseDetailsTemplate, scenario)),
    });
  });

  // Case-details task loading has drifted across GET/POST and optional query/proxy prefixes in different builds.
  // Keep the interceptor broad so this test stays focused on task-action behavior, not transport shape.
  await page.route(`**/workallocation/case/task/${scenario.caseId}*`, async (route: Route) => {
    const tasks = actionInvoked ? [] : [task];
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(tasks) });
  });

  await page.route(`**/api/workallocation/case/task/${scenario.caseId}*`, async (route: Route) => {
    const tasks = actionInvoked ? [] : [task];
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(tasks) });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route: Route) => {
    const assignee = typeof task.assignee === 'string' ? task.assignee : '';
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          idamId: assignee,
          firstName: 'Test',
          lastName: 'User',
          email: 'test.user@justice.gov.uk',
          roleCategory: 'LEGAL_OPERATIONS',
          services: [scenario.jurisdiction],
          locations: [],
        },
      ]),
    });
  });

  await page.route(`**/workallocation/task/${taskId}/roles*`, async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });

  await page.route(`**/workallocation/task/${taskId}*`, async (route: Route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ task }) });
  });

  await page.route(`**/workallocation/task/${taskId}/${actionId}*`, async (route: Route) => {
    actionInvoked = true;
    await route.fulfill({ status: actionResponseStatus, contentType: 'application/json', body: '{}' });
  });
}

export async function routeCaseDetailsTaskCancellationFlow(
  page: Page,
  taskId: string,
  scenario: CancellationScenario,
  task: TaskRecord,
  caseDetailsTemplate: CaseDetailsTemplate
): Promise<void> {
  await routeCaseDetailsTaskActionFlow(page, taskId, scenario, task, caseDetailsTemplate, { actionId: 'cancel' });
}
