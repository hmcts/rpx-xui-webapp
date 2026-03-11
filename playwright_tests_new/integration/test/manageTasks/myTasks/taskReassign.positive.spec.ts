import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies } from '../../../../common/sessionCapture';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../../utils/extractUserIdFromCookies';
import { setupTaskActionEndpointMocks, singleUsersGetByRoleMockResponse } from '../../../helpers/taskActionApiMocks.helper';
import { TASK_LIST_ROUTE_REGEX } from '../../../testData';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildTaskListMock(160, userId?.toString() || '', myActionsList);
});

test.describe(`Task Reassign as ${userIdentifier}`, () => {
  test(`User can reassign a task from the task list`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mock for task list and reassign action endpoints', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'reassign', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });

      await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(singleUsersGetByRoleMockResponse),
        });
      });
    });

    await test.step('Navigate to task list and open reassign action', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionReassign).toBeVisible();
      await taskListPage.taskActionReassign.click();

      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/reassign`));
      await expect(page.locator('main')).toContainText('Choose a role type');
      await expect(page.locator('main')).toContainText('Reassign task');
    });

    await test.step('Navigate to task list and open reassign action', async () => {
      await taskListPage.continueButton.click();
      await taskListPage.reassignUserSearchInput.fill('test');
      await taskListPage.selectFirstReassignUserOption();
      await taskListPage.continueButton.click();
    });

    await test.step('Submit reassign action and verify expected API response', async () => {
      const reassignResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/assign`) &&
          response.status() === 204
      );
      await taskListPage.reassignButton.click();
      await reassignResponsePromise;
    });

    await test.step('Verify user is returned to task list with success message', async () => {
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(`You've reassigned a task to somebody else.`);
    });
  });
});
