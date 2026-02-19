import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildDeterministicMyTasksListMock, buildAvailableTasksListMock } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { formatUiDate } from '../../utils/tableUtils';
import { retryOnTransientFailure } from '../../../E2E/utils/transient-failure.utils';

const errorStates = [400, 401, 403, 404, 500, 502, 503];
const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let taskListMockResponse;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildAvailableTasksListMock(160);
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
      expect(await taskListPage.getResultsText()).toBe(
        `Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`
      );
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      for (let i = 0; i < table.length; i++) {
        const expectedCaseName = taskListMockResponse.tasks[i].case_name;
        expect(table[i]['Case name']).toBe(expectedCaseName);
        // Check additional columns
        expect(table[i]['Case category']).toBe(taskListMockResponse.tasks[i].case_category);
        expect(table[i]['Location']).toBe(taskListMockResponse.tasks[i].location_name);
        expect(table[i]['Task']).toBe(taskListMockResponse.tasks[i].task_title);
        expect(table[i]['Due date']).toBe(formatUiDate(taskListMockResponse.tasks[i].due_date));
        // Hearing date: allow empty string or null
        const expectedHearingDate = taskListMockResponse.tasks[i].next_hearing_date || '';
        expect(table[i]['Hearing date']).toBe(formatUiDate(expectedHearingDate));
      }
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
    });
  });
});
