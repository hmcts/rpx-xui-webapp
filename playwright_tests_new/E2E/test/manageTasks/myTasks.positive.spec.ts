import { expect, test } from '../../fixtures';
import { bootstrapWorkAllocationShell } from '../../utils/test-setup/workAllocationShell';

test.describe('Verify live available task actions appear as expected', { tag: ['@e2e', '@e2e-manage-tasks'] }, () => {
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
