import { expect, test } from '../../../../E2E/fixtures';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { setupTaskActionEndpointMocks, singleUsersGetByRoleMockResponse } from '../../../helpers/taskActionApiMocks.helper';
import { TASK_LIST_ROUTE_REGEX } from '../../../testData';

const userIdentifier = 'STAFF_ADMIN';
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
  taskListMockResponse = buildTaskListMock(160, userId, myActionsList);
});

test.describe(`Task Reassign as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
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

      await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(
            singleUsersGetByRoleMockResponse.map((user, index) => ({
              sidam_id: user.idamId,
              personal_code: `judicial-personal-code-${index + 1}`,
              known_as: user.firstName,
              surname: user.lastName,
              full_name: `${user.firstName} ${user.lastName}`,
              email_id: user.email,
            }))
          ),
        });
      });
    });

    await test.step('Navigate to task list and open reassign action', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.openFirstManageActions('my tasks reassign action');
      await expect(taskListPage.taskActionReassign).toBeVisible();
      await taskListPage.clickTaskAction(taskListPage.taskActionReassign, 'my tasks reassign action');

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
      const expectedReassignUserId = singleUsersGetByRoleMockResponse[0].idamId;
      const reassignRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${firstTask.id}/assign`)
      );
      const reassignResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/assign`) &&
          response.status() === 204
      );
      await taskListPage.clickButtonAndWaitForRequest(
        taskListPage.reassignButton,
        (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${firstTask.id}/assign`),
        'submitting my tasks reassign action'
      );
      const reassignRequest = await reassignRequestPromise;
      const requestBody = reassignRequest.postDataJSON() as { userId?: string };
      expect(requestBody.userId).toBe(expectedReassignUserId);
      await reassignResponsePromise;
    });

    await test.step('Verify user is returned to task list with success message', async () => {
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(`You've reassigned a task to somebody else.`);
    });
  });
});
