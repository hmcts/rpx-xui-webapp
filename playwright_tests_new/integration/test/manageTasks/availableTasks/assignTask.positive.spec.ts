import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies } from '../../../../common/sessionCapture';
import { availableActionsList, buildTaskListMock } from '../../../mocks/taskList.mock';
import { TASK_LIST_ROUTE_REGEX } from '../../../testData';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Assign Task as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User can assign a task to themselves and see the expected notifications`, async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(3, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
      await page.route('**/claim', async (route) => {
        const body = JSON.stringify({});
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to the available tasks list page', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify the UI shows the expected layout and data, given the mock response', async () => {
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);
    });

    await test.step('Verify you can assign test', async () => {
      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionClaim).toBeVisible();
      await taskListPage.taskActionClaim.click();
      await expect(taskListPage.taskActionClaim).not.toBeVisible();
      await expect(taskListPage.exuiBodyComponent.infoMessage).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.successMessage).toContainText(
        `You've assigned yourself a task. It's available in My tasks.`
      );
      await expect(taskListPage.exuiBodyComponent.infoMessage).toContainText(`The list has been refreshed.`);
    });
  });
});
