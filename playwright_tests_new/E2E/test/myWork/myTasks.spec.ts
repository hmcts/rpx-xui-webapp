import { expect, test } from '../../fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture';
let sessionCookies: any[] = [];

test.describe('Verify the my tasks page tabs appear as expected', () => {
  test.beforeEach(async ({ page }) => {
    const { cookies } = loadSessionCookies('STAFF_ADMIN');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');
    await page.waitForResponse((res) => res.url().includes('/workallocation/task') && res.ok());
  });

  test('Verify My tasks actions appear as expected', async ({ taskListPage, tableUtils, page }) => {
    await test.step('Navigate to the task list page', async () => {
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
      await taskListPage.manageCaseButtons.nth(0).waitFor();
    });

    await test.step('Check my available tasks has data in the table', async () => {
      const table = await tableUtils.mapExuiTable(taskListPage.taskListTable);
      expect(table.length).toBeGreaterThan(0);
    });

    await test.step('Verify tasks actions are shown as expected', async () => {
      await taskListPage.manageCaseButtons.nth(0).click();
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
      const table = await tableUtils.mapExuiTable(taskListPage.taskListTable);
      expect(table.length).toBeGreaterThan(0);
    });

    await test.step('Verify tasks actions are shown as expected', async () => {
      await taskListPage.manageCaseButtons.nth(0).click();
      expect(taskListPage.taskActionClaim).toBeVisible();
      expect(taskListPage.taskActionClaimAndGo).toBeVisible();
    });
  });
});
