import { expect, test } from '@playwright/test';
import { TaskListPage } from '../../../E2E/page-objects/pages/exui/taskList.po';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationRoleConfirmation } from '../../helpers/migrationWorkRoutes.helper';

for (const { dualCategory, expectedHeader, absentHeader } of [
  { dualCategory: false, expectedHeader: 'Due date', absentHeader: 'Task created' },
  { dualCategory: true, expectedHeader: 'Task created', absentHeader: 'Due date' },
]) {
  test(
    `reassignment review shows ${expectedHeader} for a ${dualCategory ? 'dual' : 'single'}-category user`,
    { tag: '@migration-sweep' },
    async ({ page }, testInfo) => {
      const task = await setupMigrationRoleConfirmation(page, dualCategory);
      const tasks = new TaskListPage(page);
      await tasks.goto();
      await tasks.openFirstManageActions('migration judicial reassignment');
      await tasks.clickTaskAction(tasks.taskActionReassign, 'migration judicial reassignment');
      await expect(page).toHaveURL(new RegExp(`/work/${task.id}/reassign`));
      await page.getByRole('radio', { name: 'Judicial', exact: true }).check();
      await tasks.continueButton.click();
      const search = page.waitForRequest((request) => request.url().endsWith('/workallocation/findPerson'));
      await tasks.reassignUserSearchInput.fill('Judicial');
      expect((await search).postDataJSON()).toMatchObject({ searchOptions: { userRole: 'Judicial', services: ['IA'] } });
      await tasks.selectFirstReassignUserOption();
      await tasks.continueButton.click();

      await expect(page.getByRole('columnheader', { name: expectedHeader, exact: true })).toBeVisible();
      await expect(page.getByRole('columnheader', { name: absentHeader, exact: true })).toHaveCount(0);
      await expect(page.getByRole('cell', { name: 'Review the appeal', exact: true })).toBeVisible();
      await expect(tasks.reassignButton).toBeEnabled();
      const state = await captureMigrationState(page, testInfo);
      if (state.viewportWidth >= 768 || process.env.MIGRATION_STRICT_REFLOW === 'true') {
        expect
          .soft(state.documentWidth, 'The reassignment review should fit its viewport')
          .toBeLessThanOrEqual(state.viewportWidth + 1);
      }

      const assignment = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${task.id}/assign`)
      );
      await tasks.reassignButton.click();
      expect((await assignment).postDataJSON()).toEqual({ userId: 'judicial-colleague' });
      await expect(tasks.exuiBodyComponent.message).toContainText("You've reassigned a task to somebody else.");
    }
  );
}
