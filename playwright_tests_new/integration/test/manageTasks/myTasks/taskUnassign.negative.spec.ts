import { expect, test } from '../../../../E2E/fixtures';
import {
  SERVICE_DOWN_URL_REGEX,
  SERVICE_DOWN_HEADING_TEXT,
  MY_WORK_LIST_URL_REGEX,
  TASK_UNAVAILABLE_WARNING,
  TASK_LIST_ROUTE_REGEX,
} from '../../../testData';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import {
  expectValidUnassignSubmission,
  setupTaskActionEndpointMocks,
  setupUnassignSubmissionCapture,
} from '../../../helpers/taskActionApiMocks.helper';

const userIdentifier = 'STAFF_ADMIN';
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
  taskListMockResponse = buildTaskListMock(160, userId, myActionsList);
});

test.describe(
  `Task Unassign negative scenarios as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    test(`User sees service down when unassign endpoint returns 500`, async ({ taskListPage, page }) => {
      const firstTask = taskListMockResponse.tasks[0];

      await test.step('Setup route mocks for list, action dependencies, and unassign 500 response', async () => {
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

      await test.step('Attempt unassign action and verify service down', async () => {
        await taskListPage.goto();
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();

        await taskListPage.openFirstManageActions('my tasks unassign 500 response');
        await expect(taskListPage.taskActionUnassign).toBeVisible();
        await taskListPage.clickTaskAction(taskListPage.taskActionUnassign, 'my tasks unassign 500 response');
        await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/unclaim`));

        const { submissionPromise: unassignFailureResponsePromise } = await setupUnassignSubmissionCapture(page, {
          taskId: firstTask.id,
          status: 500,
        });

        await taskListPage.submitActionAndWaitForRequest(
          (request) =>
            request.method() === 'POST' &&
            (request.url().includes(`/workallocation/task/${firstTask.id}/unclaim`) ||
              request.url().includes(`/workallocation/task/${firstTask.id}/assign`)),
          'submitting my tasks unassign 500 action'
        );
        const unassignFailureResponse = await unassignFailureResponsePromise;
        expect(unassignFailureResponse.status).toBe(500);
        expect(['unclaim', 'assign-null']).toContain(unassignFailureResponse.mode);
        expectValidUnassignSubmission(unassignFailureResponse);

        await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
        await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
      });
    });

    test(`User returns to my tasks with warning when unassign endpoint returns 400`, async ({ taskListPage, page }) => {
      const firstTask = taskListMockResponse.tasks[0];

      await test.step('Setup route mocks for list, action dependencies, and unassign 400 response', async () => {
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

      await test.step('Attempt unassign action and verify redirect to my tasks with warning alert', async () => {
        await taskListPage.goto();
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();

        await taskListPage.openFirstManageActions('my tasks unassign 400 response');
        await expect(taskListPage.taskActionUnassign).toBeVisible();
        await taskListPage.clickTaskAction(taskListPage.taskActionUnassign, 'my tasks unassign 400 response');
        await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/unclaim`));

        const { submissionPromise: badRequestResponsePromise } = await setupUnassignSubmissionCapture(page, {
          taskId: firstTask.id,
          status: 400,
        });

        await taskListPage.submitActionAndWaitForRequest(
          (request) =>
            request.method() === 'POST' &&
            (request.url().includes(`/workallocation/task/${firstTask.id}/unclaim`) ||
              request.url().includes(`/workallocation/task/${firstTask.id}/assign`)),
          'submitting my tasks unassign 400 action'
        );
        const badRequestResponse = await badRequestResponsePromise;
        expect(badRequestResponse.status).toBe(400);
        expect(['unclaim', 'assign-null']).toContain(badRequestResponse.mode);
        expectValidUnassignSubmission(badRequestResponse);

        await expect(page).toHaveURL(MY_WORK_LIST_URL_REGEX);
        await expect(taskListPage.taskListTable).toBeVisible();
        await expect(taskListPage.exuiBodyComponent.message).toContainText(TASK_UNAVAILABLE_WARNING);
      });
    });
  }
);
