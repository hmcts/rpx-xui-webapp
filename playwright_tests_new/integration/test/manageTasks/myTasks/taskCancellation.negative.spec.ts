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
  `Task Cancellation negative scenarios as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    test(`User sees service down when cancel endpoint returns 500`, async ({ taskListPage, page }) => {
      const firstTask = taskListMockResponse.tasks[0];

      await test.step('Setup route mocks for list, action dependencies, and cancel 500 response', async () => {
        await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
          const body = JSON.stringify(taskListMockResponse);
          await route.fulfill({ status: 200, contentType: 'application/json', body });
        });

        await setupTaskActionEndpointMocks(page, 'cancel', {
          taskId: firstTask.id,
          caseId: firstTask.case_id,
          jurisdiction: firstTask.jurisdiction,
          caseTypeId: firstTask.case_type_id,
          assigneeId: firstTask.assignee,
        });

        await page.route(`**/workallocation/task/${firstTask.id}/cancel*`, async (route) => {
          if (route.request().method() !== 'POST') {
            await route.continue();
            return;
          }
          await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
        });
      });

      await test.step('Attempt cancel action and verify service down', async () => {
        await taskListPage.goto();
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();

        await taskListPage.openFirstManageActions('my tasks cancel 500 response');
        await expect(taskListPage.taskActionCancel).toBeVisible();
        await taskListPage.clickTaskAction(taskListPage.taskActionCancel, 'my tasks cancel 500 response');
        await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/cancel`));

        const cancelFailureResponsePromise = page.waitForResponse(
          (response) =>
            response.request().method() === 'POST' &&
            response.url().includes(`/workallocation/task/${firstTask.id}/cancel`) &&
            response.status() === 500
        );

        await taskListPage.submitActionAndWaitForRequest(
          (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${firstTask.id}/cancel`),
          'submitting my tasks cancel 500 action'
        );
        const cancelFailureResponse = await cancelFailureResponsePromise;
        expect(cancelFailureResponse.status()).toBe(500);

        await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
        await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
      });
    });

    test(`User returns to my tasks with warning when cancel endpoint returns 400`, async ({ taskListPage, page }) => {
      const firstTask = taskListMockResponse.tasks[0];

      await test.step('Setup route mocks for list, action dependencies, and cancel 400 response', async () => {
        await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
          const body = JSON.stringify(taskListMockResponse);
          await route.fulfill({ status: 200, contentType: 'application/json', body });
        });

        await setupTaskActionEndpointMocks(page, 'cancel', {
          taskId: firstTask.id,
          caseId: firstTask.case_id,
          jurisdiction: firstTask.jurisdiction,
          caseTypeId: firstTask.case_type_id,
          assigneeId: firstTask.assignee,
        });

        await page.route(`**/workallocation/task/${firstTask.id}/cancel*`, async (route) => {
          if (route.request().method() !== 'POST') {
            await route.continue();
            return;
          }
          await route.fulfill({ status: 400, contentType: 'application/json', body: '{}' });
        });
      });

      await test.step('Attempt cancel action and verify redirect to my tasks with warning alert', async () => {
        await taskListPage.goto();
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();

        await taskListPage.openFirstManageActions('my tasks cancel 400 response');
        await expect(taskListPage.taskActionCancel).toBeVisible();
        await taskListPage.clickTaskAction(taskListPage.taskActionCancel, 'my tasks cancel 400 response');
        await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/cancel`));

        const badRequestResponsePromise = page.waitForResponse(
          (response) =>
            response.request().method() === 'POST' &&
            response.url().includes(`/workallocation/task/${firstTask.id}/cancel`) &&
            response.status() === 400
        );

        await taskListPage.submitActionAndWaitForRequest(
          (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${firstTask.id}/cancel`),
          'submitting my tasks cancel 400 action'
        );
        const badRequestResponse = await badRequestResponsePromise;
        expect(badRequestResponse.status()).toBe(400);

        await expect(page).toHaveURL(MY_WORK_LIST_URL_REGEX);
        await expect(taskListPage.taskListTable).toBeVisible();
        await expect(taskListPage.exuiBodyComponent.message).toContainText(TASK_UNAVAILABLE_WARNING);
      });
    });
  }
);
