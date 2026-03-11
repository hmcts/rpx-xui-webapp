import { availableActionsList, buildTaskListMock } from '../../mocks/taskList.mock';
import { expect, test } from '../../../E2E/fixtures';
import { applyPrewarmedSessionCookies, setupTaskListBootstrapRoutes, taskListRoutePattern } from '../../helpers';

const errorStates = [400, 403, 500, 503];
const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(`Available Task List as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} sees filter errors if no services are selected`, async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(10, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await setupTaskListBootstrapRoutes(page);
      await page.route(taskListRoutePattern, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to the available tasks list page', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
      await taskListPage.waitForTaskListShellReady('available tasks tab');
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify table shows filter errors if no services are selected', async () => {
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);
      await taskListPage.clearServicesFilters();
      await taskListPage.applyCurrentFilters();
      await taskListPage.openFilterPanel();
      await expect(taskListPage.selectServicesError).toBeVisible();
      await expect(taskListPage.selectServicesError).toContainText('Select a service');
    });
  });

  test(`User ${userIdentifier} sees filter errors if no types of work are selected`, async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(10, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await setupTaskListBootstrapRoutes(page);
      await page.route(taskListRoutePattern, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to the available tasks list page', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
      await taskListPage.waitForTaskListShellReady('available tasks tab');
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify table shows filter errors if no types of work are selected', async () => {
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);
      await taskListPage.clearTypesOfWorkFilters();
      await taskListPage.applyCurrentFilters();
      await taskListPage.openFilterPanel();
      await expect(taskListPage.selectTypesOfWorksError).toBeVisible();
      await expect(taskListPage.selectTypesOfWorksError).toContainText('Select a type of work');
    });
  });

  errorStates.forEach((errorStatus) => {
    test(`User ${userIdentifier} sees the no tasks message on available tasks, if the api returns ${errorStatus}`, async ({
      taskListPage,
      page,
    }) => {
      const emptyMockResponse = {};
      await test.step('Setup route mock for empty task list', async () => {
        await setupTaskListBootstrapRoutes(page);
        await page.route(taskListRoutePattern, async (route) => {
          const body = JSON.stringify(emptyMockResponse);
          await route.fulfill({ status: errorStatus, contentType: 'application/json', body });
        });
      });
      await test.step('Navigate to the my tasks list page', async () => {
        await taskListPage.goto();
        await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
        await taskListPage.waitForTaskListShellReady('available tasks tab');
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();
      });
      await test.step('Verify table shows no results for empty mock', async () => {
        expect(await taskListPage.taskListTable.textContent()).toContain(
          'There are no available tasks. Use the location filter to view available tasks at other locations.'
        );
      });
    });
  });

  test(`User ${userIdentifier} sees the no tasks message on available tasks, if the api times out`, async ({
    taskListPage,
    page,
  }) => {
    await test.step('Setup route mock for empty task list', async () => {
      await setupTaskListBootstrapRoutes(page);
      await page.route(taskListRoutePattern, async (route) => {
        await route.abort('timedout');
      });
    });
    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
      await taskListPage.waitForTaskListShellReady('available tasks tab');
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });
    await test.step('Verify table shows no results for empty mock', async () => {
      expect(await taskListPage.taskTableFooter.textContent()).toContain(
        'There are no available tasks. Use the location filter to view available tasks at other locations.'
      );
    });
  });
});
