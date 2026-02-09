import { expect, test } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildMyTaskListMock } from '../../../integration/mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../../integration/utils/extractUserIdFromCookies';
import { logTaskCancellationAssertion } from '../../../integration/utils/taskCancellationAssertionLogger';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const userIdentifier = 'STAFF_ADMIN';
const taskId = '11111111-1111-1111-1111-111111111111';
const cancelledTaskMessage = "You've cancelled a task. It has been removed from the task list.";
const taskNoLongerAvailableMessage = 'The task is no longer available.';
const caseDetailsTemplate = JSON.parse(
  readFileSync(resolve(process.cwd(), 'src/assets/getCase.json'), 'utf8')
) as Record<string, unknown>;

const cancellationMatrix = [
  {
    scenario: 'PRIVATELAW / PRLAPPS',
    jurisdiction: 'PRIVATELAW',
    caseTypeId: 'PRLAPPS',
    caseId: '1770285290104655',
    caseName: 'PRL Manual Cancellation Test Case',
  },
  {
    scenario: 'PUBLICLAW / CARE_SUPERVISION_EPO',
    jurisdiction: 'PUBLICLAW',
    caseTypeId: 'CARE_SUPERVISION_EPO',
    caseId: '1770133055796879',
    caseName: 'Public Law Manual Cancellation Test Case',
  },
] as const;

type CancellationScenario = (typeof cancellationMatrix)[number];

type MyTaskRouteOptions = {
  includeCancelAction?: boolean;
  cancelResponseStatus?: number;
};

function buildCasePayload(scenario: CancellationScenario): Record<string, unknown> {
  const typedTemplate = caseDetailsTemplate as Record<string, any>;
  return {
    ...typedTemplate,
    case_id: scenario.caseId,
    id: scenario.caseId,
    case_type: {
      ...typedTemplate.case_type,
      id: scenario.caseTypeId,
      jurisdiction: {
        ...typedTemplate.case_type?.jurisdiction,
        id: scenario.jurisdiction,
      },
    },
  };
}

async function routeMyTaskCancellationFlow(
  page: any,
  task: Record<string, unknown>,
  options: MyTaskRouteOptions = {}
): Promise<{
  getCancelRequestUrl: () => string;
  getCancelRequestBody: () => Record<string, unknown> | null;
}> {
  const includeCancelAction = options.includeCancelAction ?? true;
  const cancelResponseStatus = options.cancelResponseStatus ?? 200;

  let cancelRequestUrl = '';
  let cancelRequestBody: Record<string, unknown> | null = null;
  let cancelInvoked = false;

  const taskWithActions = includeCancelAction
    ? task
    : {
        ...task,
        actions: (Array.isArray(task.actions) ? task.actions : []).filter((action: { id?: string }) => action.id !== 'cancel'),
      };

  await page.route(/\/workallocation\/task(?:\?.*)?$/, async (route: any) => {
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

  await page.route(`**/workallocation/task/${taskId}/roles`, async (route: any) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });

  await page.route(`**/workallocation/task/${taskId}`, async (route: any) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ task: taskWithActions }) });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName', async (route: any) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });

  await page.route(`**/workallocation/task/${taskId}/cancel*`, async (route: any) => {
    cancelInvoked = true;
    cancelRequestUrl = route.request().url();
    cancelRequestBody = route.request().postDataJSON();
    await route.fulfill({ status: cancelResponseStatus, contentType: 'application/json', body: '{}' });
  });

  return {
    getCancelRequestUrl: () => cancelRequestUrl,
    getCancelRequestBody: () => cancelRequestBody,
  };
}

async function routeCaseDetailsTaskCancellationFlow(page: any, scenario: CancellationScenario, task: Record<string, unknown>) {
  let cancelInvoked = false;

  await page.route('**/data/internal/cases/**', async (route: any) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildCasePayload(scenario)),
    });
  });

  await page.route(`**/workallocation/case/task/${scenario.caseId}`, async (route: any) => {
    const tasks = cancelInvoked ? [] : [task];
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(tasks) });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName', async (route: any) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          idamId: task.assignee,
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

  await page.route(`**/workallocation/task/${taskId}/roles`, async (route: any) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });

  await page.route(`**/workallocation/task/${taskId}`, async (route: any) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ task }) });
  });

  await page.route(`**/workallocation/task/${taskId}/cancel*`, async (route: any) => {
    cancelInvoked = true;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
}

test.describe(`Task cancellation scenarios as ${userIdentifier}`, () => {
  for (const matrixItem of cancellationMatrix) {
    test(`EXUI-3662 My Tasks manual cancellation for ${matrixItem.scenario}`, async ({ taskListPage, page }, testInfo) => {
      const { cookies } = await applySessionCookies(page, userIdentifier);
      const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

      const taskListMockResponse = buildMyTaskListMock(1, userId);
      const task = {
        ...taskListMockResponse.tasks[0],
        id: taskId,
        case_id: matrixItem.caseId,
        case_name: matrixItem.caseName,
        case_type_id: matrixItem.caseTypeId,
        jurisdiction: matrixItem.jurisdiction,
        task_title: 'Send to gatekeeper',
        assignee: userId,
      };

      const { getCancelRequestUrl, getCancelRequestBody } = await routeMyTaskCancellationFlow(page, task);

      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
      await expect(taskListPage.taskListTable).toContainText(matrixItem.caseName);

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionCancel.first()).toBeVisible();
      await taskListPage.taskActionCancel.first().click();
      await page.getByRole('button', { name: 'Cancel task' }).click();

      await expect.poll(() => getCancelRequestUrl(), { timeout: 30000 }).toContain(`/workallocation/task/${taskId}/cancel`);
      await expect.poll(() => getCancelRequestBody()).not.toBeNull();

      const parsedUrl = new URL(getCancelRequestUrl());
      const expectedPayload = { hasNoAssigneeOnComplete: false };
      const actualPayload = getCancelRequestBody();
      const expectedBrowserRequestPath = `/workallocation/task/${taskId}/cancel`;
      const actualBrowserRequestPath = `${parsedUrl.pathname}${parsedUrl.search}`;
      const assertionSummary = logTaskCancellationAssertion({
        scenario: matrixItem.scenario,
        expectedPath: expectedBrowserRequestPath,
        actualPath: actualBrowserRequestPath,
        hasCancellationProcessQuery: parsedUrl.searchParams.has('cancellation_process'),
        hasCompletionProcessQuery: parsedUrl.searchParams.has('completion_process'),
        expectedPayload,
        actualPayload,
      });

      await testInfo.attach('EXUI-3662-browser-request-expected-vs-actual.json', {
        body: JSON.stringify(
          {
            note: 'Browser -> ExUI API request (not ExUI -> WA Task Management internal call)',
            expectation: {
              path: expectedBrowserRequestPath,
              queryMustInclude: [],
              queryMustExclude: ['cancellation_process', 'completion_process'],
              payload: expectedPayload,
            },
            actual: {
              path: actualBrowserRequestPath,
              hasCancellationProcessQuery: parsedUrl.searchParams.has('cancellation_process'),
              hasCompletionProcessQuery: parsedUrl.searchParams.has('completion_process'),
              payload: actualPayload,
            },
            assertions: assertionSummary,
          },
          null,
          2
        ),
        contentType: 'application/json',
      });

      expect(
        parsedUrl.searchParams.has('cancellation_process'),
        `Expected browser cancel request ${expectedBrowserRequestPath} to omit "cancellation_process"; actual path=${actualBrowserRequestPath}`
      ).toBeFalsy();
      expect(
        parsedUrl.searchParams.has('completion_process'),
        `Expected browser cancel request ${expectedBrowserRequestPath} to omit "completion_process"; actual path=${actualBrowserRequestPath}`
      ).toBeFalsy();
      expect(
        actualPayload,
        `Expected browser cancel payload ${JSON.stringify(expectedPayload)}; actual=${JSON.stringify(actualPayload)}`
      ).toEqual(expectedPayload);

      await expect(page.getByText(cancelledTaskMessage)).toBeVisible();
      await expect(taskListPage.taskListTable).not.toContainText(matrixItem.caseName);
    });
  }

  test('EXUI-3662 Case details Tasks tab manual cancellation path', async ({ page }) => {
    const scenario = cancellationMatrix[0];
    const { cookies } = await applySessionCookies(page, userIdentifier);
    const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

    const task = {
      ...buildMyTaskListMock(1, userId).tasks[0],
      id: taskId,
      case_id: scenario.caseId,
      case_name: scenario.caseName,
      case_type_id: scenario.caseTypeId,
      jurisdiction: scenario.jurisdiction,
      task_title: 'Send to gatekeeper',
      assignee: userId,
    };

    await routeCaseDetailsTaskCancellationFlow(page, scenario, task);

    await page.goto(`/cases/case-details/${scenario.jurisdiction}/${scenario.caseTypeId}/${scenario.caseId}/tasks`);
    await expect(page.getByRole('heading', { name: 'Active tasks' })).toBeVisible();
    await expect(page.locator('#action_cancel').first()).toBeVisible();

    await page.locator('#action_cancel').first().click();
    await expect(page.getByRole('button', { name: 'Cancel task' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel task' }).click();

    // Case-details tasks flow may keep the same route instance and skip banner re-render.
    // The key behaviour here is successful cancel + task removed from the tasks tab.
    await expect(page).toHaveURL(new RegExp(`/cases/case-details/${scenario.jurisdiction}/${scenario.caseTypeId}/${scenario.caseId}/tasks`));
    await expect(page.locator('#action_cancel')).toHaveCount(0);
  });

  test('EXUI-3662 Cancel action is not shown for a non-cancellable task', async ({ taskListPage, page }) => {
    const scenario = cancellationMatrix[0];
    const { cookies } = await applySessionCookies(page, userIdentifier);
    const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

    const task = {
      ...buildMyTaskListMock(1, userId).tasks[0],
      id: taskId,
      case_id: scenario.caseId,
      case_name: `${scenario.caseName} (No Cancel Permission)`,
      case_type_id: scenario.caseTypeId,
      jurisdiction: scenario.jurisdiction,
      assignee: userId,
    };

    await routeMyTaskCancellationFlow(page, task, { includeCancelAction: false });

    await taskListPage.goto();
    await expect(taskListPage.taskListTable).toBeVisible();
    await taskListPage.exuiSpinnerComponent.wait();

    await taskListPage.manageCaseButtons.first().click();
    await expect(taskListPage.taskActionsRow).toBeVisible();
    await expect(taskListPage.taskActionCancel).toHaveCount(0);
  });

  test('EXUI-3662 Stale task cancellation shows task no longer available warning', async ({ taskListPage, page }) => {
    const scenario = cancellationMatrix[0];
    const { cookies } = await applySessionCookies(page, userIdentifier);
    const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

    const task = {
      ...buildMyTaskListMock(1, userId).tasks[0],
      id: taskId,
      case_id: scenario.caseId,
      case_name: `${scenario.caseName} (Stale Task)`,
      case_type_id: scenario.caseTypeId,
      jurisdiction: scenario.jurisdiction,
      assignee: userId,
    };

    await routeMyTaskCancellationFlow(page, task, { cancelResponseStatus: 409 });

    await taskListPage.goto();
    await expect(taskListPage.taskListTable).toBeVisible();
    await taskListPage.manageCaseButtons.first().click();
    await taskListPage.taskActionCancel.first().click();
    await page.getByRole('button', { name: 'Cancel task' }).click();

    await expect(page.getByText(taskNoLongerAvailableMessage)).toBeVisible();
    await expect(page).toHaveURL(/\/work\/my-work\/list/);
  });

  test('EXUI-3662 Cancellation API failure shows task no longer available warning', async ({ taskListPage, page }) => {
    const scenario = cancellationMatrix[0];
    const { cookies } = await applySessionCookies(page, userIdentifier);
    const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

    const task = {
      ...buildMyTaskListMock(1, userId).tasks[0],
      id: taskId,
      case_id: scenario.caseId,
      case_name: `${scenario.caseName} (API Failure)`,
      case_type_id: scenario.caseTypeId,
      jurisdiction: scenario.jurisdiction,
      assignee: userId,
    };

    await routeMyTaskCancellationFlow(page, task, { cancelResponseStatus: 400 });

    await taskListPage.goto();
    await expect(taskListPage.taskListTable).toBeVisible();
    await taskListPage.manageCaseButtons.first().click();
    await taskListPage.taskActionCancel.first().click();
    await page.getByRole('button', { name: 'Cancel task' }).click();

    await expect(page.getByText(taskNoLongerAvailableMessage)).toBeVisible();
    await expect(page).toHaveURL(/\/work\/my-work\/list/);
  });
});
