import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { ensureSessionCookies } from '../../../common/sessionCapture';

test.describe('Verify the my tasks page tabs appear as expected', () => {
  test.beforeEach(async ({ page, taskListPage }) => {
    const { cookies } = await ensureSessionCookies('STAFF_ADMIN');
    if (cookies.length) {
      await page.context().addCookies(cookies);
    }
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

  test('Verify My tasks actions appear as expected', async ({ taskListPage, tableUtils, page }) => {
    await test.step('Navigate to the task list page', async () => {
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
      await taskListPage.manageCaseButtons.nth(0).waitFor();
    });

    await test.step('Check my available tasks has data in the table', async () => {
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(table.length).toBeGreaterThan(0);
    });

    await test.step('Verify tasks actions are shown as expected', async () => {
      await taskListPage.manageCaseButtons.nth(0).click();
      await expect(taskListPage.taskActionsRow).toBeVisible();
      expect(taskListPage.taskActionCancel).toBeVisible();
      expect(taskListPage.taskActionGoTo).toBeVisible();
      expect(taskListPage.taskActionMarkAsDone).toBeVisible();
      expect(taskListPage.taskActionReassign).toBeVisible();
      expect(taskListPage.taskActionUnassign).toBeVisible();
    });
  });

  test('Verify Available tasks actions appear as expected', async ({ taskListPage, tableUtils, page }) => {
    await test.step('Navigate to the task list page', async () => {
      await taskListPage.selectWorkMenuItem('Available tasks');
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
      await taskListPage.manageCaseButtons.nth(0).waitFor();
    });

    await test.step('Check my available tasks has data in the table', async () => {
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(table.length).toBeGreaterThan(0);
    });

    await test.step('Verify tasks actions are shown as expected', async () => {
      await taskListPage.manageCaseButtons.nth(0).click();
      await expect(taskListPage.taskActionsRow).toBeVisible();
      expect(taskListPage.taskActionClaim).toBeVisible();
      expect(taskListPage.taskActionClaimAndGo).toBeVisible();
    });
  });
});
