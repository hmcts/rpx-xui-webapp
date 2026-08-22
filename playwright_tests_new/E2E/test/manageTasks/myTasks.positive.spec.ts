import { expect, test } from '../../fixtures';
import { bootstrapWorkAllocationShell, resolveWorkAllocationUser } from '../../utils/test-setup/workAllocationShell';
import { reconcileClaimedTask } from '../../utils/test-setup/workAllocationTaskClaim';

test.describe(
  'Verify live task actions appear as expected',
  {
    tag: ['@e2e', '@e2e-manage-tasks', '@e2e-manage-tasks-assigned'],
  },
  () => {
    test.beforeEach(async ({ page, taskListPage, identityLease }) => {
      const selectedIdentity = resolveWorkAllocationUser();
      const lease = await identityLease.acquireForSession(selectedIdentity, {
        pool: 'WORK_ALLOCATION_CASEOFFICER',
        tags: ['e2e', 'work-allocation', 'caseworker'],
        role: 'caseworker',
        organisation: 'work-allocation',
        jurisdictions: ['IA'],
      });
      await bootstrapWorkAllocationShell({ page, taskListPage, identity: lease.sessionIdentity });
    });

    test('Verify Available and My tasks actions appear as expected', async ({ page, taskListPage, tableUtils }) => {
      let claimedTaskId: string | undefined;
      let claimAttempted = false;
      let claimConfirmed = false;

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
        claimedTaskId = await taskListPage.getTaskIdForRow(0);
        await taskListPage.openManageActionsForRow(0, 'live available tasks actions');
        await expect(taskListPage.getTaskActionsRow(0)).toBeVisible();
        await expect(taskListPage.getTaskActionForRow(0, 'claim')).toBeVisible();
        await expect(taskListPage.getTaskActionForRow(0, 'claim-and-go')).toBeVisible();
      });

      if (!claimedTaskId) {
        throw new Error('Available task identity was not captured before claim.');
      }

      try {
        await test.step('Claim the selected available task and open My tasks', async () => {
          const claimResponse = page.waitForResponse(
            (response) =>
              response.request().method() === 'POST' && response.url().includes(`/workallocation/task/${claimedTaskId}/claim`),
            { timeout: 30_000 }
          );
          void claimResponse.catch(() => undefined);
          claimAttempted = true;
          await taskListPage.clickTaskActionForRowOnce(0, 'claim', `claiming task ${claimedTaskId}`, { timeoutMs: 30_000 });
          const response = await claimResponse;
          expect(response.status(), `Work Allocation claim failed: ${response.url()}`).toBeLessThan(400);
          claimConfirmed = true;

          await taskListPage.clickTaskTabAndWaitForView('My tasks', 'MyTasks', 'opening claimed My tasks', {
            timeoutMs: 60_000,
          });
          await taskListPage.waitForTaskRowReady('claimed My tasks', { timeoutMs: 60_000 });
        });

        await test.step('Check My tasks contains the exact claimed task', async () => {
          const claimedRowIndex = await taskListPage.waitForTaskRowById(claimedTaskId!, 'claimed My tasks', {
            timeoutMs: 60_000,
          });
          const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
          expect(table.length).toBeGreaterThan(claimedRowIndex);
        });

        await test.step('Verify assigned task actions', async () => {
          const claimedRowIndex = await taskListPage.waitForTaskRowById(claimedTaskId!, 'assigned task actions');
          await taskListPage.openManageActionsForRow(claimedRowIndex, 'claimed My tasks actions');
          await expect(taskListPage.getTaskActionForRow(claimedRowIndex, 'cancel')).toBeVisible();
          await expect(taskListPage.getTaskActionForRow(claimedRowIndex, 'go')).toBeVisible();
          await expect(taskListPage.getTaskActionForRow(claimedRowIndex, 'complete')).toBeVisible();
          await expect(taskListPage.getTaskActionForRow(claimedRowIndex, 'reassign')).toBeVisible();
          await expect(taskListPage.getTaskActionForRow(claimedRowIndex, 'unclaim')).toBeVisible();
        });
      } finally {
        await test.step('Release the exact claimed task', async () => {
          await reconcileClaimedTask({
            claimAttempted,
            claimConfirmed,
            taskId: claimedTaskId!,
            findClaimedTask: async () => {
              if (!page.url().includes('/work/my-work/list')) {
                await taskListPage.goto();
              }
              const apiCallsBaseline = taskListPage.getApiCalls().length;
              await taskListPage.clickTaskTabAndWaitForView('My tasks', 'MyTasks', 'opening My tasks for cleanup', {
                timeoutMs: 60_000,
              });
              await taskListPage.waitForTaskDataResponse('claimed task cleanup', apiCallsBaseline, { timeoutMs: 60_000 });
              const claimedRowIndex = claimConfirmed
                ? await taskListPage.waitForTaskRowById(claimedTaskId!, 'confirmed claimed task cleanup', {
                    timeoutMs: 60_000,
                  })
                : await taskListPage.findTaskRowIndexById(claimedTaskId!);
              return claimedRowIndex >= 0 ? claimedRowIndex : undefined;
            },
            releaseClaimedTask: async (claimedRowIndex) => {
              await taskListPage.openManageActionsForRow(claimedRowIndex, 'claimed task cleanup actions');
              await taskListPage.clickTaskActionForRowOnce(claimedRowIndex, 'unclaim', `opening unclaim for ${claimedTaskId}`, {
                timeoutMs: 30_000,
              });
              await expect(page).toHaveURL(new RegExp(`/work/${claimedTaskId}/unclaim`));
              const unclaimResponse = page.waitForResponse(
                (response) =>
                  response.request().method() === 'POST' &&
                  response.url().includes(`/workallocation/task/${claimedTaskId}/unclaim`),
                { timeout: 30_000 }
              );
              await taskListPage.submitActionOnceAndWaitForRequest(
                (request) =>
                  request.method() === 'POST' && request.url().includes(`/workallocation/task/${claimedTaskId}/unclaim`),
                `submitting unclaim for ${claimedTaskId}`,
                { timeoutMs: 30_000 }
              );
              expect((await unclaimResponse).status()).toBeLessThan(400);
            },
          });
        });
      }
    });
  }
);
