import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { avilableActionsList, buildTaskListMock } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { formatUiDate } from '../../utils/tableUtils';
import { retryOnTransientFailure } from '../../../E2E/utils/transient-failure.utils';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let taskListMockResponse;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildTaskListMock(3000, '', avilableActionsList);
});

test.describe(`Available Task List as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} can view assigned tasks on the task list page`, async ({ taskListPage, page, tableUtils }) => {
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
});
