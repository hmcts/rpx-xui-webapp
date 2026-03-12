import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies } from '../../../../common/sessionCapture';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../../utils/extractUserIdFromCookies';
import { setupTaskActionEndpointMocks } from '../../../helpers/taskActionApiMocks.helper';
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

test.describe(`Task Go To as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User can use Go to task action from task list to view the task in case details`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];
    const caseMockResponse = {
      case_id: firstTask.case_id,
      case_type: {
        id: firstTask.case_type_id,
        name: firstTask.case_type_id,
        jurisdiction: {
          id: firstTask.jurisdiction,
          name: firstTask.jurisdiction,
        },
      },
      tabs: [],
      triggers: [],
      events: [],
      channels: [],
      metadataFields: [],
      state: {
        id: 'CaseCreated',
        name: 'Case created',
      },
    };

    await test.step('Setup route mock for task list and go action dependencies', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'go', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });

      await page.route(`**/data/internal/cases/${firstTask.case_id}*`, async (route) => {
        const body = JSON.stringify(caseMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
        const body = JSON.stringify([
          {
            email: 'test@example.com',
            firstName: 'Test',
            idamId: firstTask.assignee,
            lastName: 'User',
            location: {
              id: 227101,
              locationName: 'Newport (South Wales) Immigration and Asylum Tribunal',
            },
            roleCategory: 'LEGAL_OPERATIONS',
            service: 'IA',
          },
        ]);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to task list and click Go to task', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionGoTo).toBeVisible();

      const caseTasksResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/case/task/${firstTask.case_id}`) &&
          response.status() === 200
      );

      await taskListPage.taskActionGoTo.click();
      const caseTasksResponse = await caseTasksResponsePromise;
      expect(caseTasksResponse.ok()).toBeTruthy();

      await expect(page.getByRole('heading', { name: 'Active tasks' })).toBeVisible();
    });
  });
});
