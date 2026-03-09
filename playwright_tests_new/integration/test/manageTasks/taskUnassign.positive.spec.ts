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

test.describe(`Task Unassign as ${userIdentifier}`, () => {
  test(`User can unassign one of their assigned tasks`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mock for task list and unassign action endpoints', async () => {
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
    });

    await test.step('Navigate to task list and open unassign action', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionUnassign).toBeVisible();
      await taskListPage.taskActionUnassign.click();

      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/unclaim`));
      await expect(page.locator('#action-title')).toContainText('Unassign');
    });

    await test.step('Submit unassign action and verify expected API response', async () => {
      const unassignResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/unclaim`) &&
          response.status() === 204
      );

      await taskListPage.submitButton.click();
      const unassignResponse = await unassignResponsePromise;
      expect(unassignResponse.ok()).toBeTruthy();

      await expect(page).toHaveURL(MY_WORK_LIST_URL_REGEX);
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(
        `You've unassigned a task. It's now in Available tasks.`
      );
    });
  });
});
