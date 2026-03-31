import { expect, test } from '../../../../E2E/fixtures';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import {
  expectValidUnassignSubmission,
  setupTaskActionEndpointMocks,
  setupUnassignSubmissionCapture,
} from '../../../helpers/taskActionApiMocks.helper';
import { TASK_LIST_ROUTE_REGEX } from '../../../testData';

const userIdentifier = 'STAFF_ADMIN';
const MY_WORK_LIST_URL_REGEX = /\/work\/my-work\/list/;
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
  taskListMockResponse = buildTaskListMock(160, userId, myActionsList);
});

test.describe(`Task Unassign as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User can unassign one of their assigned tasks`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mock for task list and unassign action endpoints', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
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
        includeSubmitActionMock: false,
      });
    });

    await test.step('Navigate to task list and open unassign action', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.openFirstManageActions('my tasks unassign action');
      await expect(taskListPage.taskActionUnassign).toBeVisible();
      await taskListPage.clickTaskAction(taskListPage.taskActionUnassign, 'my tasks unassign action');

      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/unclaim`));
      await expect(page.locator('#action-title')).toContainText('Unassign');
    });

    await test.step('Submit unassign action and verify expected API response', async () => {
      const { submissionPromise: unassignResponsePromise } = await setupUnassignSubmissionCapture(page, {
        taskId: firstTask.id,
        status: 204,
      });

      await taskListPage.submitActionAndWaitForRequest(
        (request) =>
          request.method() === 'POST' &&
          (request.url().includes(`/workallocation/task/${firstTask.id}/unclaim`) ||
            request.url().includes(`/workallocation/task/${firstTask.id}/assign`)),
        'submitting my tasks unassign action'
      );
      const unassignResponse = await unassignResponsePromise;
      expect(unassignResponse.status).toBe(204);
      expect(['unclaim', 'assign-null']).toContain(unassignResponse.mode);
      expectValidUnassignSubmission(unassignResponse);

      await expect(page).toHaveURL(MY_WORK_LIST_URL_REGEX);
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(
        `You've unassigned a task. It's now in Available tasks.`
      );
    });
  });
});
