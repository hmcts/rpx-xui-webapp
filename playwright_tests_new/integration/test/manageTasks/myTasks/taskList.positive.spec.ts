import { expect, test } from '../../../../E2E/fixtures';
import { buildTaskListMock, buildDeterministicMyTasksListMock, myActionsList } from '../../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../../utils/extractUserIdFromCookies';
import { formatUiDate } from '../../../utils/tableUtils';
import { setupTaskListMockRoutes } from '../../../helpers';
import { applyPrewarmedSessionCookies, setupTaskListBootstrapRoutes, taskListRoutePattern } from '../../../helpers';

let userId: string | null;
const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applyPrewarmedSessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildTaskListMock(6, userId?.toString() || '', myActionsList);
});

test.describe(`Task List as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User ${userIdentifier} can view assigned tasks on the task list page`, async ({ taskListPage, page, tableUtils }) => {
    await setupTaskListMockRoutes(page, taskListMockResponse);

    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
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

  test(`User sees the expected message if there are no assigned tasks`, async ({ taskListPage, page }) => {
    const emptyMockResponse = { tasks: [], total_records: 0 };
    await test.step('Setup route mock for empty task list', async () => {
      await setupTaskListMockRoutes(page, emptyMockResponse);
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

  test(`User sees all priority type tasks with specific due dates`, async ({ taskListPage, page, tableUtils }) => {
    const deterministicMockResponse = buildDeterministicMyTasksListMock('deterministic-assignee');
    await test.step('Setup route mock for deterministic task list', async () => {
      await setupTaskListMockRoutes(page, deterministicMockResponse);
    });

    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify table shows deterministic priority tasks and due dates', async () => {
      expect(await taskListPage.getResultsText()).toBe(`Showing 1 to 4 of 4 results`);
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

  test(`User can see all expected table elements with a large results set`, async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(1000, userId?.toString() || '', myActionsList);
    await test.step('Setup route mock for deterministic task list', async () => {
      await setupTaskListMockRoutes(page, taskListMockResponse);
    });

    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify all table sorting buttons are visible', async () => {
      await expect(taskListPage.sortByCaseNameTableHeader).toBeVisible();
      await expect(taskListPage.sortByCaseCategoryTableHeader).toBeVisible();
      await expect(taskListPage.sortByLocationTableHeader).toBeVisible();
      await expect(taskListPage.sortByTaskTableHeader).toBeVisible();
      await expect(taskListPage.sortByDueDateTableHeader).toBeVisible();
      await expect(taskListPage.sortByHearingDateTableHeader).toBeVisible();
    });

    await test.step('Verify pagination button visibility', async () => {
      await expect(taskListPage.paginationNextButton).toBeVisible();
      await expect(taskListPage.paginationPreviousButton).not.toBeVisible();
      await expect(taskListPage.paginationEllipsisButton).toBeVisible();
    });

    await test.step('Verify the first page of results shows expected data', async () => {
      expect(await taskListPage.getResultsText()).toBe(
        `Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`
      );
      await taskListPage.paginationNextButton.click();
      await expect(taskListPage.paginationNextButton).toBeVisible();
      await expect(taskListPage.paginationPreviousButton).toBeVisible();
      await expect(taskListPage.paginationEllipsisButton).toBeVisible();
    });
    await test.step('Verify the second page of results shows expected data', async () => {
      await taskListPage.exuiSpinnerComponent.wait();
      expect(await taskListPage.getResultsText()).toBe(`Showing 26 to 50 of ${taskListMockResponse.total_records} results`);
    });
  });

  test(`Column sort persists when navigating away from and back to My tasks`, async ({ taskListPage, page }) => {
    const myTasksMockResponse = buildTaskListMock(30, userId?.toString() || '', myActionsList);
    const taskSearchRequests: unknown[] = [];
    const caseNameSortHeaderCell = taskListPage.sortByCaseNameTableHeader.locator('xpath=ancestor::th[1]');

    await test.step('Setup route mocks and capture task search request bodies', async () => {
      await setupTaskListBootstrapRoutes(page);
      await page.route(taskListRoutePattern, async (route) => {
        const request = route.request();
        if (request.method() === 'POST') {
          try {
            taskSearchRequests.push(request.postDataJSON());
          } catch {
            taskSearchRequests.push(request.postData());
          }
        }

        const body = JSON.stringify(myTasksMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Open My tasks and sort by Case name', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.sortByCaseNameTableHeader.click();
      await taskListPage.exuiSpinnerComponent.wait();
      await expect(caseNameSortHeaderCell).toHaveAttribute('aria-sort', 'ascending');
    });

    await test.step('Navigate away and return to My tasks', async () => {
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.taskTableTabs.filter({ hasText: 'My tasks' }).first().click();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify Case name sort remains selected and log the latest request body', async () => {
      await expect(caseNameSortHeaderCell).toHaveAttribute('aria-sort', 'ascending');
      const latestRequestBody = taskSearchRequests.at(-1) ?? null;
      console.log('My tasks sort persistence request body:', JSON.stringify(latestRequestBody, null, 2));
    });
  });
});
