import { expect, test } from '../../../../E2E/fixtures';
import {
  MY_WORK_LIST_URL_REGEX,
  SERVICE_DOWN_HEADING_TEXT,
  SERVICE_DOWN_URL_REGEX,
  TASK_LIST_ROUTE_REGEX,
  TASK_UNAVAILABLE_WARNING,
} from '../../../testData';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { setupTaskActionEndpointMocks, singleUsersGetByRoleMockResponse } from '../../../helpers/taskActionApiMocks.helper';

const userIdentifier = 'STAFF_ADMIN';
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
  taskListMockResponse = buildTaskListMock(160, userId, myActionsList);
});

test.describe(
  `Task Reassign negative scenarios as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    [
      {
        statusCode: 500,
        title: 'User sees service down when reassign endpoint returns 500',
      },
      {
        statusCode: 400,
        title: 'User returns to my tasks with warning when reassign endpoint returns 400',
      },
    ].forEach(({ statusCode, title }) => {
      test(title, async ({ taskListPage, page }) => {
        const firstTask = taskListMockResponse.tasks[0];

        await test.step(`Setup route mocks for list, action dependencies, and reassign ${statusCode} response`, async () => {
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
            includeSubmitActionMock: false,
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

          await page.route(`**/workallocation/caseworker/getUsersByServiceName*`, async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(singleUsersGetByRoleMockResponse),
            });
          });

          await page.route(`**/workallocation/task/${firstTask.id}/assign*`, async (route) => {
            if (route.request().method() !== 'POST') {
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
          await taskListPage.clickTaskAction(taskListPage.taskActionReassign, `my tasks reassign ${statusCode} response`);
          await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/reassign`));
          await expect(page.locator('main')).toContainText('Choose a role type');
          await expect(page.locator('main')).toContainText('Reassign task');

          await taskListPage.continueButton.click();
          await taskListPage.reassignUserSearchInput.fill('test');
          await taskListPage.selectFirstReassignUserOption();
          await taskListPage.continueButton.click();

          const reassignFailureResponsePromise = page.waitForResponse(
            (response) =>
              response.request().method() === 'POST' &&
              response.url().includes(`/workallocation/task/${firstTask.id}/assign`) &&
              response.status() === statusCode
          );

          await taskListPage.clickButtonAndWaitForRequest(
            taskListPage.reassignButton,
            (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${firstTask.id}/assign`),
            `submitting my tasks reassign ${statusCode} action`
          );
          const reassignFailureResponse = await reassignFailureResponsePromise;
          expect(reassignFailureResponse.status()).toBe(statusCode);

          if (statusCode === 500) {
            await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
            await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
            return;
          }

          await expect(page).toHaveURL(MY_WORK_LIST_URL_REGEX);
          await expect(taskListPage.taskListTable).toBeVisible();
          await expect(taskListPage.exuiBodyComponent.message).toContainText(TASK_UNAVAILABLE_WARNING);
        });
      });
    });
  }
);
