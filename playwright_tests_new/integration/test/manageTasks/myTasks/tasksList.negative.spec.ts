import { expect, test } from '../../../../E2E/fixtures';
import { TASK_LIST_MALFORMED_JSON_BODY } from '../../../testData';
import { applySessionCookies, setupManageTasksBaseRoutes } from '../../../helpers';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

const errorStates = [400, 403, 500, 503];
const userIdentifier = 'STAFF_ADMIN';
test.describe(`Available Task List as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  errorStates.forEach((errorStatus) => {
    test(`User ${userIdentifier} sees the no tasks message on my tasks, if the api returns ${errorStatus}`, async ({
      taskListPage,
      page,
    }) => {
      const emptyMockResponse = {};
      await test.step('Setup route mock for empty task list', async () => {
        await setupManageTasksBaseRoutes(page, {
          taskListHandler: async (route) => {
            const body = JSON.stringify(emptyMockResponse);
            await route.fulfill({ status: errorStatus, contentType: 'application/json', body });
          },
        });
      });
      await test.step('Navigate to the my tasks list page', async () => {
        await taskListPage.goto();
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();
      });
      await test.step('Verify table shows no results for empty mock', async () => {
        expect(await taskListPage.taskListTable.textContent()).toContain('You have no assigned tasks.');
      });
    });
  });

  test(`User ${userIdentifier} sees the no tasks message on my tasks, if the api times out`, async ({ taskListPage, page }) => {
    await test.step('Setup route mock for empty task list', async () => {
      await setupManageTasksBaseRoutes(page, {
        taskListHandler: async (route) => {
          await route.abort('timedout');
        },
      });
    });
    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });
    await test.step('Verify table shows no results for empty mock', async () => {
      expect(await taskListPage.taskListTable.textContent()).toContain('You have no assigned tasks.');
    });
  });

  test(`User ${userIdentifier} sees a service down message, if the api returns malformed json`, async ({
    taskListPage,
    page,
  }) => {
    await test.step('Setup route mock for malformed task list response', async () => {
      await setupManageTasksBaseRoutes(page, {
        taskListHandler: async (route) => {
          const body = JSON.stringify(TASK_LIST_MALFORMED_JSON_BODY);
          await route.fulfill({ status: 200, contentType: 'application/json', body });
        },
      });
    });
    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await taskListPage.exuiSpinnerComponent.wait();
    });
    await test.step('Verify the service down message is shown ', async () => {
      expect(await taskListPage.exuiBodyComponent.serviceDownError.textContent()).toContain(
        'Sorry, there is a problem with the service'
      );
      expect(await taskListPage.exuiBodyComponent.serviceDownError.textContent()).toContain('Try again later.');
    });
  });
});
