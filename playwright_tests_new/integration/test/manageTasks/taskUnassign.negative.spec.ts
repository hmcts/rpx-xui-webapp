import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildTaskListMock, myActionsList } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { setupTaskActionEndpointMocks } from '../../helpers/taskActionApiMocks.helper';

const userIdentifier = 'STAFF_ADMIN';
const SERVICE_DOWN_URL_REGEX = /\/service-down/;
const SERVICE_DOWN_HEADING_TEXT = 'Sorry, there is a problem with the service';
const MY_WORK_LIST_URL_REGEX = /\/work\/my-work\/list/;
const TASK_UNAVAILABLE_WARNING = 'The task is no longer available.';
let sessionCookies: any[] = [];
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildTaskListMock(160, userId?.toString() || '', myActionsList);
});

test.describe(`Task Unassign negative scenarios as ${userIdentifier}`, () => {
  test(`User sees service down when unassign endpoint returns 500`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for list, action dependencies, and unassign 500 response', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'unassign', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
        unassignMode: 'unclaim',
      });

      await page.route(`**/workallocation/task/${firstTask.id}/unclaim*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Attempt unassign action and verify service down', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionUnassign.click();
      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/unclaim`));

      const unassignFailureResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/unclaim`) &&
          response.status() === 500
      );

      await taskListPage.submitButton.click();
      const unassignFailureResponse = await unassignFailureResponsePromise;
      expect(unassignFailureResponse.status()).toBe(500);

      await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
      await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
    });
  });

  test(`User returns to my tasks with warning when unassign endpoint returns 400`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for list, action dependencies, and unassign 400 response', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'unassign', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
        unassignMode: 'unclaim',
      });

      await page.route(`**/workallocation/task/${firstTask.id}/unclaim*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 400, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Attempt unassign action and verify redirect to my tasks with warning alert', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionUnassign.click();
      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/unclaim`));

      const badRequestResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/unclaim`) &&
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
});
