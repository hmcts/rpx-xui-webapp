import { expect, test } from '../../../../E2E/fixtures';
import { applyPrewarmedSessionCookies, setupTaskListBootstrapRoutes, taskListRoutePattern } from '../../../helpers';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';

const userIdentifier = 'STAFF_ADMIN';

const supportedJurisdictions = ['IA', 'CIVIL'];
const supportedJurisdictionDetails = [
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
  { serviceId: 'CIVIL', serviceName: 'Civil' },
];

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(`All Work Tasks as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test('User can view all-work task table, links, and pagination', async ({ taskListPage, page, tableUtils }) => {
    const taskListMockResponse = buildTaskListMock(2000, '', myActionsList);

    await test.step('Setup route mocks for all-work tasks', async () => {
      await setupTaskListBootstrapRoutes(page, supportedJurisdictions, supportedJurisdictionDetails);
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(taskListMockResponse),
        });
      });
    });

    await test.step('Navigate to all-work tasks page', async () => {
      await taskListPage.gotoAllWorkTasks();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify expected all-work columns, data, and case link rendering', async () => {
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);

      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(Object.keys(table[0] ?? {})).toEqual(
        expect.arrayContaining(['Case name', 'Case category', 'Location', 'Task', 'Person'])
      );

      expect.soft(table[0]['Case name']).toBe(taskListMockResponse.tasks[0].case_name);
      expect.soft(table[0]['Case category']).toBe(taskListMockResponse.tasks[0].case_category);
      expect.soft(table[0]['Location']).toBe(taskListMockResponse.tasks[0].location_name);
      expect.soft(table[0]['Task']).toBe(taskListMockResponse.tasks[0].task_title);

      const firstCase = taskListMockResponse.tasks[0];
      const firstCaseLink = taskListPage.taskListTable.getByRole('link', { name: firstCase.case_name }).first();
      await expect(firstCaseLink).toBeVisible();
      await expect(firstCaseLink).toHaveAttribute(
        'href',
        `/cases/case-details/${firstCase.jurisdiction}/${firstCase.case_type_id}/${firstCase.case_id}`
      );
    });

    await test.step('Verify pagination controls are shown for multi-page all-work results', async () => {
      await expect(taskListPage.paginationNextButton).toBeVisible();
      await expect(taskListPage.paginationPreviousButton).not.toBeVisible();

      await taskListPage.paginationNextButton.click();
      await taskListPage.exuiSpinnerComponent.wait();
      await expect(taskListPage.paginationPreviousButton).toBeVisible();
      expect
        .soft(await taskListPage.getResultsText())
        .toContain(`Showing 26 to 50 of ${taskListMockResponse.total_records} results`);
    });
  });

  test('All-work Case name sort persists after navigating away and back', async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(40, '', myActionsList);
    const caseNameSortHeaderCell = taskListPage.sortByCaseNameTableHeader.locator('xpath=ancestor::th[1]');

    await test.step('Setup route mocks for all-work tasks sorting', async () => {
      await setupTaskListBootstrapRoutes(page, supportedJurisdictions, supportedJurisdictionDetails);
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(taskListMockResponse),
        });
      });
    });

    await test.step('Open all-work tasks and sort by Case name ascending', async () => {
      await taskListPage.gotoAllWorkTasks();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.sortByCaseNameTableHeader.click();
      await taskListPage.exuiSpinnerComponent.wait();
      await expect(caseNameSortHeaderCell).toHaveAttribute('aria-sort', 'ascending');
    });

    await test.step('Navigate away then return to all-work tasks', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.gotoAllWorkTasks();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify Case name sort remains selected on all-work tasks', async () => {
      await expect(caseNameSortHeaderCell).toHaveAttribute('aria-sort', 'ascending');
    });
  });

  test('All-work filter controls are visible and interactive', async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(10, '', myActionsList);

    await test.step('Setup route mocks for all-work filters', async () => {
      await setupTaskListBootstrapRoutes(page, supportedJurisdictions, supportedJurisdictionDetails);
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(taskListMockResponse),
        });
      });
    });

    await test.step('Open all-work tasks and expand filters', async () => {
      await taskListPage.gotoAllWorkTasks();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.openFilterPanel();
      await expect(taskListPage.applyFilterButton).toBeVisible();
    });

    await test.step('Verify all-work service/location/task/person filter controls are present', async () => {
      await expect(taskListPage.allWorkServiceFilter).toBeVisible();
      await expect(taskListPage.allWorkLocationAllRadio).toBeVisible();
      await expect(taskListPage.allWorkLocationSearchRadio).toBeVisible();

      await expect(taskListPage.allWorkTaskCategoryAllRadio).toBeVisible();
      await expect(taskListPage.allWorkTaskCategoryUnassignedRadio).toBeVisible();
      await expect(taskListPage.allWorkTaskCategoryAssignedToPersonRadio).toBeVisible();

      await expect(taskListPage.allWorkTasksByRoleTypeFilter).toBeVisible();
      await expect(taskListPage.allWorkPersonSearchInput).toBeVisible();
    });
  });
});
