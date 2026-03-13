import { expect, test } from '../../../../E2E/fixtures';
import { SERVICE_DOWN_URL_REGEX, SERVICE_DOWN_HEADING_TEXT, TASK_LIST_ROUTE_REGEX } from '../../../testData';
import { applySessionCookies } from '../../../../common/sessionCapture';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../../utils/extractUserIdFromCookies';
import { setupTaskActionEndpointMocks } from '../../../helpers/taskActionApiMocks.helper';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildTaskListMock(160, userId?.toString() || '', myActionsList);
});

test.describe(
  `Task Reassign negative scenarios as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    [500, 400].forEach((statusCode) => {
      test(`User sees service down when reassign resolver endpoint returns ${statusCode}`, async ({ taskListPage, page }) => {
        const firstTask = taskListMockResponse.tasks[0];

        await test.step(`Setup route mocks for list, action dependencies, and task details ${statusCode} response`, async () => {
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

          await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify([]),
            });
          });

          await page.route(new RegExp(String.raw`/workallocation/task/${firstTask.id}(\?.*)?$`), async (route) => {
            if (route.request().method() !== 'GET') {
              await route.continue();
              return;
            }
            await route.fulfill({ status: statusCode, contentType: 'application/json', body: '{}' });
          });
        });

        await test.step(`Attempt reassign action and verify behavior for ${statusCode}`, async () => {
          await taskListPage.goto();
          await expect(taskListPage.taskListTable).toBeVisible();
          await taskListPage.exuiSpinnerComponent.wait();

          await taskListPage.openFirstManageActions(`my tasks reassign ${statusCode} response`);
          await expect(taskListPage.taskActionReassign).toBeVisible();

          const reassignFailureResponsePromise = page.waitForResponse(
            (response) =>
              response.request().method() === 'GET' &&
              response.url().includes(`/workallocation/task/${firstTask.id}`) &&
              !response.url().includes('/roles') &&
              response.status() === statusCode
          );

          await taskListPage.clickTaskAction(taskListPage.taskActionReassign, `my tasks reassign ${statusCode} response`);
          const reassignFailureResponse = await reassignFailureResponsePromise;
          expect(reassignFailureResponse.status()).toBe(statusCode);

          await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
          await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
        });
      });
    });
  }
);
