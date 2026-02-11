import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildMyTaskListMock, buildDeterministicMyTasksListMock } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { formatUiDate } from '../../utils/tableUtils';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let taskListMockResponse;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildMyTaskListMock(160, userId?.toString() || '');
});

test.describe(`Task List as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} can view assigned tasks on the task list page`, async ({ taskListPage, page, tableUtils }) => {
    await test.step('Setup route mock for task list', async () => {
      const userId = extractUserIdFromCookies(sessionCookies);
      taskListMockResponse = buildMyTaskListMock(160, userId?.toString());
      await page.route('**/workallocation/task*', async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify user can see a list shows the expected layout and data, given the mock response', async () => {
      expect(await taskListPage.taskListResultsAmount.textContent()).toBe(
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

  test(`User ${userIdentifier} sees the no tasks message if there are no assigned tasks`, async ({ taskListPage, page }) => {
    const emptyMockResponse = { tasks: [], total_records: 0 };
    await test.step('Setup route mock for empty task list', async () => {
      await page.route('**/workallocation/task*', async (route) => {
        const body = JSON.stringify(emptyMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
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

  test(`User ${userIdentifier} sees all types of priority tasks with specific due dates`, async ({
    taskListPage,
    page,
    tableUtils,
  }) => {
    const deterministicMockResponse = buildDeterministicMyTasksListMock('deterministic-assignee');
    await test.step('Setup route mock for deterministic task list', async () => {
      await page.route('**/workallocation/task*', async (route) => {
        const body = JSON.stringify(deterministicMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });
    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });
    await test.step('Verify table shows deterministic priority tasks and due dates', async () => {
      expect(await taskListPage.taskListResultsAmount.textContent()).toBe(`Showing 1 to 4 of 4 results`);
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(table.length).toBe(4);
      for (let i = 0; i < table.length; i++) {
        const expected = deterministicMockResponse.tasks[i];
        expect(table[i]['Case name']).toBe(expected.case_name);
        expect(table[i]['Case category']).toBe(expected.case_category);
        expect(table[i]['Location']).toBe(expected.location_name);
        expect(table[i]['Task']).toBe(expected.task_title);
        expect(table[i]['Due date']).toBe(formatUiDate(expected.due_date));
        const actualPriority = table[i]['Priority']?.toLowerCase() ?? '';
        const expectedPriority = String(expected.priority_field ?? '').toLowerCase();
        expect(actualPriority).toBe(expectedPriority);
      }
    });
  });
});
