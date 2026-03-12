import { expect, test } from '../../../../E2E/fixtures';
import {
  SERVICE_DOWN_URL_REGEX,
  SERVICE_DOWN_HEADING_TEXT,
  MY_WORK_LIST_URL_REGEX,
  TASK_UNAVAILABLE_WARNING,
  TASK_LIST_ROUTE_REGEX,
} from '../../../testData';
import { applySessionCookies } from '../../../../common/sessionCapture';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../../utils/extractUserIdFromCookies';
import { setupTaskActionEndpointMocks } from '../../../helpers/taskActionApiMocks.helper';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildTaskListMock(160, userId?.toString() || '', myActionsList);
});

test.describe(
  `Task Completion negative scenarios as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
  test(`User sees service down when complete endpoint returns 500`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for list, action dependencies, and complete 500 response', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'complete', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });

      await page.route(`**/workallocation/task/${firstTask.id}/complete*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Attempt complete action and verify service down', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionMarkAsDone.click();
      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/complete`));

      const completeFailureResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/complete`) &&
          response.status() === 500
      );

      await taskListPage.submitButton.click();
      const completeFailureResponse = await completeFailureResponsePromise;
      expect(completeFailureResponse.status()).toBe(500);

      await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
      await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
    });
  });

  test(`User returns to my tasks with warning when complete endpoint returns 400`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for list, action dependencies, and complete 400 response', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'complete', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });

      await page.route(`**/workallocation/task/${firstTask.id}/complete*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 400, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Attempt complete action and verify redirect to my tasks with warning alert', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionMarkAsDone.click();
      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/complete`));

      const badRequestResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/complete`) &&
          response.status() === 400
      );

      await taskListPage.submitButton.click();
      const badRequestResponse = await badRequestResponsePromise;
      expect(badRequestResponse.status()).toBe(400);

      await expect(page).toHaveURL(MY_WORK_LIST_URL_REGEX);
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(TASK_UNAVAILABLE_WARNING);
    });
  });
  }
);
