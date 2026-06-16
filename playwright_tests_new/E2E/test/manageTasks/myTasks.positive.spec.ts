import { expect, test } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import type { ManageTasksLiveSetup, ManageTasksLiveTask } from '../../utils/test-setup/manageTasksLiveSetup';
import { setupClaimableManageTasksCase } from '../../utils/test-setup/manageTasksLiveSetup';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';

const MANAGE_TASKS_DYNAMIC_E2E_TIMEOUT_MS = 420_000;

function normalizeText(value: string | undefined): string {
  return (value ?? '').replaceAll(/\s+/g, ' ').trim().toLowerCase();
}

function findTaskRowIndex(rows: Array<Record<string, string>>, task: ManageTasksLiveTask): number {
  const expectedCaseName = normalizeText(task.caseName);
  const expectedTaskTitle = normalizeText(task.taskTitle);

  return rows.findIndex((row) => {
    return normalizeText(row['Case name']).includes(expectedCaseName) && normalizeText(row.Task).includes(expectedTaskTitle);
  });
}

async function expectCreatedTaskRow({
  rows,
  task,
  viewName,
}: {
  rows: Array<Record<string, string>>;
  task: ManageTasksLiveTask;
  viewName: string;
}): Promise<number> {
  const rowIndex = findTaskRowIndex(rows, task);
  expect(
    rowIndex,
    `${viewName} should show created case task "${task.taskTitle}" for case "${task.caseName}". ` +
      `Visible rows: ${JSON.stringify(rows.slice(0, 5))}`
  ).toBeGreaterThanOrEqual(0);
  return rowIndex;
}

test.describe('Manage Tasks with dynamic organisation and user', { tag: ['@e2e', '@e2e-manage-tasks'] }, () => {
  test.setTimeout(MANAGE_TASKS_DYNAMIC_E2E_TIMEOUT_MS);

  test('created case task is visible and claimable in Available tasks, then actionable in My tasks', async ({
    page,
    createCasePage,
    caseDetailsPage,
    professionalUserUtils,
    taskListPage,
    tableUtils,
  }, testInfo) => {
    let liveSetup: ManageTasksLiveSetup | undefined;

    await test.step('Create a dynamic organisation, solicitor, case, and claimable WA task', async () => {
      liveSetup = await setupClaimableManageTasksCase({
        page,
        createCasePage,
        caseDetailsPage,
        professionalUserUtils,
        testInfo,
      });
      await applySessionCookies(page, liveSetup.sessionIdentity);
      await taskListPage.goto();
      await taskListPage.taskListTable.waitFor({ state: 'visible', timeout: 60_000 });
    });

    if (!liveSetup) {
      throw new Error('Manage Tasks live setup did not complete.');
    }

    await test.step('Open Available tasks and verify the created case task is claimable', async () => {
      await retryOnTransientFailure(
        async () => {
          taskListPage.clearApiCalls();
          await taskListPage.clickTaskTabAndWaitForView(
            'Available tasks',
            'AvailableTasks',
            'opening dynamic case available task',
            {
              timeoutMs: 60_000,
            }
          );
          await taskListPage.waitForTaskRowReady('dynamic case available task', { timeoutMs: 60_000 });
        },
        {
          maxAttempts: 2,
          onRetry: async () => {
            await taskListPage.goto();
          },
        }
      );

      const rows = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      const rowIndex = await expectCreatedTaskRow({
        rows,
        task: liveSetup.task,
        viewName: 'Available tasks',
      });

      await taskListPage.openManageActionsForRow(rowIndex, 'dynamic case available task');
      await expect(taskListPage.getTaskActionForRow(rowIndex, 'claim')).toBeVisible();
      await expect(taskListPage.getTaskActionForRow(rowIndex, 'claim-and-go')).toBeVisible();
    });

    await test.step('Claim the created task and verify the success message', async () => {
      const rows = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      const rowIndex = await expectCreatedTaskRow({
        rows,
        task: liveSetup.task,
        viewName: 'Available tasks before claim',
      });

      await taskListPage.openManageActionsForRow(rowIndex, 'dynamic case claim task');
      await Promise.all([
        page.waitForResponse(
          (response) => response.url().includes(`/workallocation/task/${liveSetup.task.id}/claim`) && response.ok(),
          { timeout: 60_000 }
        ),
        taskListPage.clickTaskActionForRow(rowIndex, 'claim', 'dynamic case claim task', { timeoutMs: 30_000 }),
      ]);

      await expect(taskListPage.exuiBodyComponent.successMessage).toContainText(
        `You've assigned yourself a task. It's available in My tasks.`
      );
      await expect(taskListPage.exuiBodyComponent.infoMessage).toContainText('The list has been refreshed.');
    });

    await test.step('Open My tasks and verify the claimed task is actionable', async () => {
      await retryOnTransientFailure(
        async () => {
          taskListPage.clearApiCalls();
          await taskListPage.clickTaskTabAndWaitForView('My tasks', 'MyTasks', 'opening dynamic case claimed task', {
            timeoutMs: 60_000,
          });
          await taskListPage.waitForTaskRowReady('dynamic case claimed task', { timeoutMs: 60_000 });
        },
        {
          maxAttempts: 2,
          onRetry: async () => {
            await taskListPage.goto();
          },
        }
      );

      const rows = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      const rowIndex = await expectCreatedTaskRow({
        rows,
        task: liveSetup.task,
        viewName: 'My tasks',
      });

      await taskListPage.openManageActionsForRow(rowIndex, 'dynamic case my task');
      await expect(taskListPage.getTaskActionForRow(rowIndex, 'go')).toBeVisible();
    });
  });
});
