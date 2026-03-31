import { expect, test } from '../../../../E2E/fixtures';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { setupTaskActionEndpointMocks } from '../../../helpers/taskActionApiMocks.helper';
import { TASK_LIST_ROUTE_REGEX } from '../../../testData';

const userIdentifier = 'STAFF_ADMIN';
const MY_WORK_LIST_URL_REGEX = /\/work\/my-work\/list/;
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
  taskListMockResponse = buildTaskListMock(160, userId, myActionsList);
});

// Skipping until Master build staging issue is resolved - EXUI-4323
test.describe.skip(`Task Completion as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User can mark one of their assigned tasks as done`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mock for task list and complete action endpoints', async () => {
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
    });

    await test.step('Navigate to task list and open complete action', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.openFirstManageActions('my tasks complete action');
      await expect(taskListPage.taskActionMarkAsDone).toBeVisible();
      await taskListPage.clickTaskAction(taskListPage.taskActionMarkAsDone, 'my tasks complete action');

      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/complete`));
      await expect(page.locator('#action-title')).toHaveText('Mark the task as done');
    });

    await test.step('Submit complete action and verify request/response', async () => {
      const completeResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/complete`) &&
          response.status() === 204
      );

      const completeRequest = await taskListPage.submitActionAndWaitForRequest(
        (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${firstTask.id}/complete`),
        'submitting my tasks complete action'
      );
      expect(completeRequest.postDataJSON()).toEqual({ hasNoAssigneeOnComplete: false });
      const completeResponse = await completeResponsePromise;
      expect(completeResponse.ok()).toBeTruthy();

      await expect(page).toHaveURL(MY_WORK_LIST_URL_REGEX);
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(
        `You've marked a task as done. It has been removed from the task list.`
      );
    });
  });
});
