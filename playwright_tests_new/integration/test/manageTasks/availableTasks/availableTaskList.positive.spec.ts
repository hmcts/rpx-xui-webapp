import { expect, test } from '../../../../E2E/fixtures';
import { availableActionsList, buildTaskListMock } from '../../../mocks/taskList.mock';
import { formatUiDate } from '../../../utils/tableUtils';
import { applySessionCookies, setupManageTasksBaseRoutes } from '../../../helpers';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Available Task List as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User ${userIdentifier} can view a large number of available tasks on the task list page`, async ({
    taskListPage,
    page,
    tableUtils,
  }) => {
    const taskListMockResponse = buildTaskListMock(3000, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await setupManageTasksBaseRoutes(page, { taskListResponse: taskListMockResponse });
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
      await expect.soft(taskListPage.exuiBodyComponent.paginationPreviousButton).not.toBeVisible();
      await expect.soft(taskListPage.exuiBodyComponent.paginationNextButton).toBeVisible();
      await expect.soft(taskListPage.exuiBodyComponent.paginationEllipsisButton).toBeVisible();
      expect.soft(await taskListPage.exuiBodyComponent.paginationCurrentPage.textContent()).toContain('1');
      await taskListPage.exuiBodyComponent.paginationNextButton.click();
      expect.soft(await taskListPage.exuiBodyComponent.paginationCurrentPage.textContent()).toContain('2');
      await expect.soft(taskListPage.exuiBodyComponent.paginationPreviousButton).toBeVisible();
      expect.soft(await taskListPage.getResultsText()).toBe(`Showing 26 to 50 of ${taskListMockResponse.total_records} results`);
    });
  });

  test(`User can view a small number of assigned tasks on the task list page`, async ({ taskListPage, page, tableUtils }) => {
    const taskListMockResponse = buildTaskListMock(3, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await setupManageTasksBaseRoutes(page, { taskListResponse: taskListMockResponse });
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
      await expect(taskListPage.exuiBodyComponent.paginationControls).not.toBeVisible();
    });
  });

  test(`User sees the no tasks message if the api returns an empty response`, async ({ taskListPage, page }) => {
    const emptyMockResponse = { tasks: [], total_records: 0 };
    await test.step('Setup route mock for empty task list', async () => {
      await setupManageTasksBaseRoutes(page, { taskListResponse: emptyMockResponse });
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
      await expect(taskListPage.exuiBodyComponent.paginationControls).not.toBeVisible();
    });
  });

  test(`User can see all table sorting buttons on the table`, async ({ taskListPage, page, tableUtils }) => {
    const emptyMockResponse = { tasks: [], total_records: 0 };
    await test.step('Setup route mock for deterministic task list', async () => {
      await setupManageTasksBaseRoutes(page, { taskListResponse: emptyMockResponse });
    });
    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'Available tasks' }).first().click();
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
  });
  test(`User ${userIdentifier} can assign a task to themselves and see the expected notifications`, async ({
    taskListPage,
    page,
  }) => {
    const taskListMockResponse = buildTaskListMock(3, '', availableActionsList);
    await test.step('Setup route mock for task list', async () => {
      await setupManageTasksBaseRoutes(page, { taskListResponse: taskListMockResponse });
      await page.route('**/claim', async (route) => {
        const body = JSON.stringify({});
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
    });

    await test.step('Verify you can assign test', async () => {
      const rowIndex = 0;
      const claimAction = taskListPage.getTaskActionForRow(rowIndex, 'claim');

      await taskListPage.openManageActionsForRow(rowIndex, 'available tasks claim action');
      await expect(taskListPage.getTaskActionsRow(rowIndex)).toBeVisible();
      await expect(claimAction).toBeVisible();
      await taskListPage.clickTaskActionForRow(rowIndex, 'claim', 'available tasks claim action');
      await expect(claimAction).not.toBeVisible();
      await expect(taskListPage.exuiBodyComponent.infoMessage).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.successMessage).toContainText(
        `You've assigned yourself a task. It's available in My tasks.`
      );
      await expect(taskListPage.exuiBodyComponent.infoMessage).toContainText(`The list has been refreshed.`);
    });
  });
});
