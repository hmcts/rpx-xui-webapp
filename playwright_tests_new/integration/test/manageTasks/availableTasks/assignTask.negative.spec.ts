import { expect, test } from '../../../../E2E/fixtures';
import {
  SERVICE_DOWN_URL_REGEX,
  SERVICE_DOWN_HEADING_TEXT,
  TASK_UNAVAILABLE_WARNING,
  TASK_LIST_ROUTE_REGEX,
} from '../../../testData';
import { applySessionCookies } from '../../../../common/sessionCapture';
import { availableActionsList, buildTaskListMock } from '../../../mocks/taskList.mock';

const userIdentifier = 'STAFF_ADMIN';
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
  taskListMockResponse = buildTaskListMock(3, '', availableActionsList);
});

test.describe(`Assign Task negative scenarios as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User sees service down when claim task endpoint returns 500`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for task list and claim 500 response', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route(`**/workallocation/task/${firstTask.id}/claim*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Navigate to page under test', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);
    });

    await test.step('Attempt claim action and verify service down', async () => {
      const claimFailureResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/claim`) &&
          response.status() === 500
      );

      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionClaim.waitFor({ state: 'visible' });
      await taskListPage.taskActionClaim.click();

      const claimFailureResponse = await claimFailureResponsePromise;
      expect(claimFailureResponse.status()).toBe(500);
      await expect(taskListPage.taskActionClaim).not.toBeVisible();

      await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
      await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
    });
  });

  test(`User sees task unavailable warning when claim endpoint returns 400`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for task list and claim 400 response', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route(`**/workallocation/task/${firstTask.id}/claim*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 400, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Navigate to page under test', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);
    });

    await test.step('Attempt claim action and verify task unavailable warning', async () => {
      const badRequestResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/claim`) &&
          response.status() === 400
      );

      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionClaim.waitFor({ state: 'visible' });
      await taskListPage.taskActionClaim.click();

      const badRequestResponse = await badRequestResponsePromise;
      expect(badRequestResponse.status()).toBe(400);

      await expect(taskListPage.taskActionClaim).not.toBeVisible();
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.warningMessage).toContainText(TASK_UNAVAILABLE_WARNING);
      await expect(taskListPage.exuiBodyComponent.infoMessage).toContainText('The list has been refreshed.');
    });
  });
});
