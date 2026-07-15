import { expect, test } from '../../fixtures';
import { applyWorkAllocationSession, bootstrapWorkAllocationShell } from '../../utils/test-setup/workAllocationShell';

test.describe('Verify live available tasks actions appear as expected', { tag: ['@e2e', '@e2e-manage-tasks'] }, () => {
  test.beforeEach(async ({ page, taskListPage }) => {
    await bootstrapWorkAllocationShell({ page, taskListPage });
  });

  test('Verify Available tasks actions appear as expected', async ({ taskListPage, tableUtils }) => {
    await test.step('Open Available tasks and wait for live task data', async () => {
      taskListPage.clearApiCalls();
      await taskListPage.clickTaskTabAndWaitForView('Available tasks', 'AvailableTasks', 'opening live available tasks', {
        timeoutMs: 60_000,
      });
      await taskListPage.waitForTaskRowReady('live available tasks', { timeoutMs: 60_000 });
    });

    await test.step('Check available tasks has data in the table', async () => {
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(table.length).toBeGreaterThan(0);
    });

    await test.step('Verify tasks actions are shown as expected', async () => {
      await taskListPage.openManageActionsForRow(0, 'live available tasks actions');
      await expect(taskListPage.getTaskActionsRow(0)).toBeVisible();
      await expect(taskListPage.getTaskActionForRow(0, 'claim')).toBeVisible();
      await expect(taskListPage.getTaskActionForRow(0, 'claim-and-go')).toBeVisible();
    });
  });
});

test.describe('Verify live assigned my tasks actions appear as expected', { tag: ['@e2e', '@e2e-manage-tasks-assigned'] }, () => {
  test.skip(
    true,
    'Requires a seeded assigned Work Allocation task. Local AAT probes found WA-capable users but 0 assigned My Tasks.'
  );

  test.beforeEach(async ({ page, taskListPage }) => {
    await applyWorkAllocationSession(page);
    await taskListPage.goto();
    // Prefer UI readiness over brittle network waits; fall back to response when available.
    await Promise.race([
      page.waitForResponse((res) => res.url().includes('/workallocation/task') && res.ok(), { timeout: 60000 }),
      taskListPage.taskListTable.waitFor({ state: 'visible', timeout: 60000 }),
    ]).catch(async () => {
      // If neither completes, surface clearer error context by awaiting table visibility.
      await taskListPage.taskListTable.waitFor({ state: 'visible', timeout: 60000 });
    });
  });

  test('Verify My tasks actions appear as expected', async ({ taskListPage, tableUtils }) => {
    await test.step('Navigate to the task list page', async () => {
      await expect(taskListPage.taskListTable).toBeVisible();
      taskListPage.clearApiCalls();
      await taskListPage.waitForManageButton('my tasks tab', { timeoutMs: 60_000 });
    });

    await test.step('Check my available tasks has data in the table', async () => {
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(table.length).toBeGreaterThan(0);
    });

    await test.step('Verify tasks actions are shown as expected', async () => {
      await taskListPage.manageCaseButtons.nth(0).click();
      await expect(taskListPage.taskActionsRow).toBeVisible();
      await expect(taskListPage.taskActionCancel).toBeVisible();
      await expect(taskListPage.taskActionGoTo).toBeVisible();
      await expect(taskListPage.taskActionMarkAsDone).toBeVisible();
      await expect(taskListPage.taskActionReassign).toBeVisible();
      await expect(taskListPage.taskActionUnassign).toBeVisible();
    });
  });
});
