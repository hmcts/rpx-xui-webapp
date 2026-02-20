import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { availableActionsList, buildTaskListMock } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { formatUiDate } from '../../utils/tableUtils';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
});

test.describe(`Available Task List as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} can view a large number of available tasks on the task list page`, async ({
    taskListPage,
    page,
    tableUtils,
  }) => {
    const taskListMockResponse = buildTaskListMock(3000, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await page.route('**/workallocation/task*', async (route) => {
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

    await test.step('Verify the UI shows the expected layout and data, given the mock response', async () => {
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      for (let i = 0; i < table.length; i++) {
        const expectedCaseName = taskListMockResponse.tasks[i].case_name;
        expect.soft(table[i]['Case name']).toBe(expectedCaseName);
        // Check additional columns
        expect.soft(table[i]['Case category']).toBe(taskListMockResponse.tasks[i].case_category);
        expect.soft(table[i]['Location']).toBe(taskListMockResponse.tasks[i].location_name);
        expect.soft(table[i]['Task']).toBe(taskListMockResponse.tasks[i].task_title);
        expect.soft(table[i]['Due date']).toBe(formatUiDate(taskListMockResponse.tasks[i].due_date));
        // Hearing date: allow empty string or null
        const expectedHearingDate = taskListMockResponse.tasks[i].next_hearing_date || '';
        expect.soft(table[i]['Hearing date']).toBe(formatUiDate(expectedHearingDate));
      }
    });

    await test.step('Verify the pagination controls behave and display as expected for large result sets', async () => {
      await expect.soft(taskListPage.paginationPreviousButton).not.toBeVisible();
      await expect.soft(taskListPage.paginationNextButton).toBeVisible();
      await expect.soft(taskListPage.paginationEllipsisButton).toBeVisible();
      expect.soft(await taskListPage.paginationCurrentPage.textContent()).toContain('1');
      await taskListPage.paginationNextButton.click();
      expect.soft(await taskListPage.paginationCurrentPage.textContent()).toContain('2');
      await expect.soft(taskListPage.paginationPreviousButton).toBeVisible();
      expect.soft(await taskListPage.getResultsText()).toBe(`Showing 26 to 50 of ${taskListMockResponse.total_records} results`);
    });
  });

  test(`User ${userIdentifier} can view a small number of assigned tasks on the task list page`, async ({
    taskListPage,
    page,
    tableUtils,
  }) => {
    const taskListMockResponse = buildTaskListMock(3, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await page.route('**/workallocation/task*', async (route) => {
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

    await test.step('Verify the UI shows the expected layout and data, given the mock response', async () => {
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      for (let i = 0; i < table.length; i++) {
        const expectedCaseName = taskListMockResponse.tasks[i].case_name;
        expect.soft(table[i]['Case name']).toBe(expectedCaseName);
        expect.soft(table[i]['Case category']).toBe(taskListMockResponse.tasks[i].case_category);
        expect.soft(table[i]['Location']).toBe(taskListMockResponse.tasks[i].location_name);
        expect.soft(table[i]['Task']).toBe(taskListMockResponse.tasks[i].task_title);
        expect.soft(table[i]['Due date']).toBe(formatUiDate(taskListMockResponse.tasks[i].due_date));
        const expectedHearingDate = taskListMockResponse.tasks[i].next_hearing_date || '';
        expect.soft(table[i]['Hearing date']).toBe(formatUiDate(expectedHearingDate));
      }
      await expect(taskListPage.paginationControls).not.toBeVisible();
    });
  });

  test(`User ${userIdentifier} sees the no tasks message if the api returns an empty response`, async ({
    taskListPage,
    page,
  }) => {
    const emptyMockResponse = { tasks: [], total_records: 0 };
    await test.step('Setup route mock for empty task list', async () => {
      await page.route('**/workallocation/task*', async (route) => {
        const body = JSON.stringify(emptyMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });
    await test.step('Navigate to the available tasks list page', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });
    await test.step('Verify table shows no results for empty mock', async () => {
      expect(await taskListPage.taskListTable.textContent()).toContain(
        'There are no available tasks. Use the location filter to view available tasks at other locations.'
      );
      await expect(taskListPage.paginationControls).not.toBeVisible();
    });
  });

  test(`User ${userIdentifier} sees filter errors if no services are selected`, async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(10, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await page.route('**/workallocation/task*', async (route) => {
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
});
