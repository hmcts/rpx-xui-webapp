import { expect, test } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import type { ManageTasksLiveSetup } from '../../utils/test-setup/manageTasksLiveSetup';
import { setupClaimableManageTasksCase } from '../../utils/test-setup/manageTasksLiveSetup';
import {
  buildManageTasksLiveTaskRowFailureMessage,
  findManageTasksLiveTaskRowIndex,
} from '../../utils/test-setup/manageTasksLiveTaskRows';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';

const MANAGE_TASKS_DYNAMIC_E2E_TIMEOUT_MS =
  Number.parseInt(process.env.PW_E2E_MANAGE_TASKS_DYNAMIC_TIMEOUT_MS ?? '', 10) || 300_000;
const TASK_LIST_VIEW_TIMEOUT_MS = 30_000;

test.describe('Manage Tasks with dynamic organisation and user', { tag: ['@e2e', '@e2e-manage-tasks'] }, () => {
  test.describe.configure({ retries: 0 });
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

    try {
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
        await taskListPage.taskListTable.waitFor({ state: 'visible', timeout: TASK_LIST_VIEW_TIMEOUT_MS });
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
                timeoutMs: TASK_LIST_VIEW_TIMEOUT_MS,
              }
            );
            await taskListPage.waitForTaskRowReady('dynamic case available task', { timeoutMs: TASK_LIST_VIEW_TIMEOUT_MS });
          },
          {
            maxAttempts: 2,
            onRetry: async () => {
              await taskListPage.goto();
            },
          }
        );

        const rows = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
        const rowIndex = findManageTasksLiveTaskRowIndex(rows, liveSetup.task);
        expect(
          rowIndex,
          buildManageTasksLiveTaskRowFailureMessage({ rows, task: liveSetup.task, viewName: 'Available tasks' })
        ).toBeGreaterThanOrEqual(0);

        await taskListPage.openManageActionsForRow(rowIndex, 'dynamic case available task');
        await expect(taskListPage.getTaskActionForRow(rowIndex, 'claim')).toBeVisible();
        await expect(taskListPage.getTaskActionForRow(rowIndex, 'claim-and-go')).toBeVisible();
      });

      await test.step('Claim the created task and verify the success message', async () => {
        const rows = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
        const rowIndex = findManageTasksLiveTaskRowIndex(rows, liveSetup.task);
        expect(
          rowIndex,
          buildManageTasksLiveTaskRowFailureMessage({ rows, task: liveSetup.task, viewName: 'Available tasks before claim' })
        ).toBeGreaterThanOrEqual(0);

        await taskListPage.openManageActionsForRow(rowIndex, 'dynamic case claim task');
        await Promise.all([
          page.waitForResponse(
            (response) => response.url().includes(`/workallocation/task/${liveSetup.task.id}/claim`) && response.ok(),
            {
              timeout: TASK_LIST_VIEW_TIMEOUT_MS,
            }
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
              timeoutMs: TASK_LIST_VIEW_TIMEOUT_MS,
            });
            await taskListPage.waitForTaskRowReady('dynamic case claimed task', { timeoutMs: TASK_LIST_VIEW_TIMEOUT_MS });
          },
          {
            maxAttempts: 2,
            onRetry: async () => {
              await taskListPage.goto();
            },
          }
        );

        const rows = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
        const rowIndex = findManageTasksLiveTaskRowIndex(rows, liveSetup.task);
        expect(
          rowIndex,
          buildManageTasksLiveTaskRowFailureMessage({ rows, task: liveSetup.task, viewName: 'My tasks' })
        ).toBeGreaterThanOrEqual(0);

        await taskListPage.openManageActionsForRow(rowIndex, 'dynamic case my task');
        await expect(taskListPage.getTaskActionForRow(rowIndex, 'go')).toBeVisible();
      });
    } finally {
      await liveSetup?.cleanup();
    }
  });
});
