import { availableActionsList, buildTaskListMock } from '../../../mocks/taskList.mock';
import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies } from '../../../../common/sessionCapture';
import { TASK_LIST_ROUTE_REGEX } from '../../../testData';

const errorStates = [400, 403, 500, 503];
const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Available Task List as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User ${userIdentifier} sees filter errors if no services are selected`, async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(10, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to the available tasks list page', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify table shows filter errors if no services are selected', async () => {
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);
      await taskListPage.taskListFilterToggle.click();
      expect.soft(await taskListPage.selectAllServicesFilter.isChecked()).toBeTruthy();
      await taskListPage.selectAllServicesFilter.click();
      await taskListPage.applyFilterButton.click();
      expect(await taskListPage.selectServicesError.textContent()).toContain('Select a service');
    });

    await test.step('Verify table shows filter errors if no types of work are selected', async () => {
      await taskListPage.selectAllTypesOfWorksFilter.click();
      await taskListPage.applyFilterButton.click();
      expect(await taskListPage.selectTypesOfWorksError.textContent()).toContain('Select a type of work');
      await expect(taskListPage.exuiHeader.errorHeader).toBeVisible();
      expect(await taskListPage.exuiHeader.errorHeaderTitle.textContent()).toContain('There is a problem');
      expect(await taskListPage.exuiHeader.errorHeaderListItems.nth(0).textContent()).toContain('Select a service');
      expect(await taskListPage.exuiHeader.errorHeaderListItems.nth(1).textContent()).toContain('Select a type of work');
    });
  });

  errorStates.forEach((errorStatus) => {
    test(`User sees the no tasks message on available tasks, if the api returns ${errorStatus}`, async ({
      taskListPage,
      page,
    }) => {
      const emptyMockResponse = {};
      await test.step('Setup route mock for empty task list', async () => {
        await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
          const body = JSON.stringify(emptyMockResponse);
          await route.fulfill({ status: errorStatus, contentType: 'application/json', body });
        });
      });
      await test.step('Navigate to the my tasks list page', async () => {
        await taskListPage.goto();
        await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
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

  test(`User sees the no tasks message on available tasks, if the api times out`, async ({ taskListPage, page }) => {
    await test.step('Setup route mock for empty task list', async () => {
      await page.route(TASK_LIST_ROUTE_REGEX, async (route) => {
        await route.abort('timedout');
      });
    });
    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
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
