import type { Page, Route } from '@playwright/test';

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

export async function routeMyTaskCancellationFlow(
  page: Page,
  taskId: string,
  task: TaskRecord,
  options: MyTaskRouteOptions = {}
): Promise<MyTaskCancellationRouteResult> {
  const includeCancelAction = options.includeCancelAction ?? true;
  const cancelResponseStatus = options.cancelResponseStatus ?? 200;

  let cancelRequestUrl = '';
  let cancelRequestBody: Record<string, unknown> | null = null;
  let cancelInvoked = false;

  const actions = Array.isArray(task.actions) ? task.actions : [];
  const taskWithActions = includeCancelAction
    ? task
    : {
        ...task,
        actions: actions.filter((action) => action?.id !== 'cancel'),
      };

  await page.route(/\/workallocation\/task(?:\?.*)?$/, async (route: Route) => {
    if (route.request().method() !== 'POST') {
      await route.fallback();
      return;
    }

    const tasks = cancelInvoked ? [] : [taskWithActions];
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

  await page.route(`**/workallocation/task/${taskId}/cancel*`, async (route: Route) => {
    cancelInvoked = true;
    cancelRequestUrl = route.request().url();
    const postData = route.request().postDataJSON();
    cancelRequestBody = postData && typeof postData === 'object' ? (postData as Record<string, unknown>) : null;
    await route.fulfill({ status: cancelResponseStatus, contentType: 'application/json', body: '{}' });
  });

  return {
    getCancelRequestUrl: () => cancelRequestUrl,
    getCancelRequestBody: () => cancelRequestBody,
  };
}

export async function routeCaseDetailsTaskCancellationFlow(
  page: Page,
  taskId: string,
  scenario: CancellationScenario,
  task: TaskRecord,
  caseDetailsTemplate: CaseDetailsTemplate
): Promise<void> {
  let cancelInvoked = false;

  await page.route('**/data/internal/cases/**', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildCasePayload(caseDetailsTemplate, scenario)),
    });
  });

  await page.route(`**/workallocation/case/task/${scenario.caseId}`, async (route: Route) => {
    const tasks = cancelInvoked ? [] : [task];
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(tasks) });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName', async (route: Route) => {
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

  await page.route(`**/workallocation/task/${taskId}/cancel*`, async (route: Route) => {
    cancelInvoked = true;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
}
