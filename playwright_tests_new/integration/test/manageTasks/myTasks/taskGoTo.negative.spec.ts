import { expect, test } from '../../../../E2E/fixtures';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { setupTaskActionEndpointMocks } from '../../../helpers/taskActionApiMocks.helper';
import { TASK_LIST_ROUTE_REGEX } from '../../../testData';

const userIdentifier = 'STAFF_ADMIN';
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
  taskListMockResponse = buildTaskListMock(160, userId, myActionsList);
});

// EXUI-4318 - Skipped until the related bug is resolved, and the expected behaviour can be tested reliably
test.describe.skip(
  `Task Go To negative scenarios as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    [500, 400].forEach((statusCode) => {
      test(`User still reaches case details when go endpoint returns ${statusCode}`, async ({ taskListPage, page }) => {
        const firstTask = taskListMockResponse.tasks[0];

        await test.step(`Setup route mocks for list, go dependencies, and case task ${statusCode} response`, async () => {
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

          await page.route(`**/workallocation/case/task/${firstTask.case_id}*`, async (route) => {
            if (route.request().method() !== 'POST') {
              await route.continue();
              return;
            }
            await route.fulfill({ status: statusCode, contentType: 'application/json', body: '{}' });
          });

          await page.route(`**/data/internal/cases/${firstTask.case_id}*`, async (route) => {
            const body = JSON.stringify({
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
            });
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

        await test.step(`Attempt go action and verify behavior for ${statusCode}`, async () => {
          await taskListPage.goto();
          await expect(taskListPage.taskListTable).toBeVisible();
          await taskListPage.exuiSpinnerComponent.wait();

          await taskListPage.openFirstManageActions(`my tasks go to ${statusCode} response`);
          await expect(taskListPage.taskActionGoTo).toBeVisible();

          const goFailureResponsePromise = page.waitForResponse(
            (response) =>
              response.request().method() === 'POST' &&
              response.url().includes(`/workallocation/case/task/${firstTask.case_id}`) &&
              response.status() === statusCode
          );

          await taskListPage.clickTaskAction(taskListPage.taskActionGoTo, `my tasks go to ${statusCode} response`);
          const goFailureResponse = await goFailureResponsePromise;
          expect(goFailureResponse.status()).toBe(statusCode);

          await expect(page).toHaveURL(/\/cases\/case-details\//);
          await expect(page.getByRole('heading', { name: 'Active tasks' })).toBeVisible();
          await expect(page.getByText('There was a problem loading the task details. Please try again.')).toBeVisible();
        });
      });
    });
  }
);
