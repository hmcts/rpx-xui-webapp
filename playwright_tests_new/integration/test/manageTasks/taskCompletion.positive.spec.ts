import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildTaskListMock, myActionsList } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { setupTaskActionEndpointMocks } from '../../helpers/taskActionApiMocks.helper';

const userIdentifier = 'STAFF_ADMIN';
const MY_WORK_LIST_URL_REGEX = /\/work\/my-work\/list/;
let sessionCookies: any[] = [];
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildTaskListMock(160, userId?.toString() || '', myActionsList);
});

test.describe(`Task Completion as ${userIdentifier}`, () => {
  test(`User can mark one of their assigned tasks as done`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mock for task list and complete action endpoints', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
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

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionMarkAsDone).toBeVisible();
      await taskListPage.taskActionMarkAsDone.click();

      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/complete`));
      await expect(page.locator('#action-title')).toHaveText('Mark the task as done');
    });

    await test.step('Submit complete action and verify request/response', async () => {
      const completeRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${firstTask.id}/complete`)
      );
      const completeResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/complete`) &&
          response.status() === 204
      );

      await taskListPage.submitButton.click();
      const completeRequest = await completeRequestPromise;
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
