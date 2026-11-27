import { expect, test } from '../../helpers/migrationTest.fixture';
import { TaskListPage } from '../../../E2E/page-objects/pages/exui/taskList.po';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationRoleConfirmation } from '../../helpers/migrationWorkRoutes.helper';
import { judicialColleagueSearchMock } from '../../mocks/multipleRoleCategories.mock';

for (const { dualCategory, expectedHeader, absentHeader } of [
  { dualCategory: false, expectedHeader: 'Due date', absentHeader: 'Task created' },
  { dualCategory: true, expectedHeader: 'Task created', absentHeader: 'Due date' },
]) {
  test(
    `reassignment review shows ${expectedHeader} for a ${dualCategory ? 'dual' : 'single'}-category user`,
    { tag: ['@integration', '@integration-govuk-migration'] },
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
      expect.soft(state.violations, 'The reached state must have no serious or critical axe violations').toEqual([]);
      expect
        .soft(state.documentWidth, 'The reassignment review should fit its viewport')
        .toBeLessThanOrEqual(state.viewportWidth + 1);

      const assignment = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${task.id}/assign`)
      );
      await tasks.reassignButton.click();
      expect((await assignment).postDataJSON()).toEqual({ userId: 'judicial-colleague' });
      await expect(tasks.exuiBodyComponent.message).toContainText("You've reassigned a task to somebody else.");
    }
  );
}

test(
  'task reassignment recovers from a missing assignee by keyboard and reaches review without assigning',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page, migrationOrigin }) => {
    const task = await setupMigrationRoleConfirmation(page, false);
    const tasks = new TaskListPage(page);
    const assignments: string[] = [];
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (
        url.origin === migrationOrigin &&
        request.method() === 'POST' &&
        /^\/workallocation\/task\/[^/]+\/assign$/.test(url.pathname)
      ) {
        assignments.push(url.pathname);
      }
    });

    await tasks.goto();
    await tasks.openFirstManageActions('migration reassignment validation');
    await tasks.clickTaskAction(tasks.taskActionReassign, 'migration reassignment validation');
    await expect(page).toHaveURL((url) => url.pathname === `/work/${task.id}/reassign`);
    await page.getByRole('radio', { name: 'Judicial', exact: true }).check();
    await tasks.continueButton.click();
    await expect(page).toHaveURL((url) => url.pathname === `/work/${task.id}/reassign/person`);
    const personUrl = page.url();
    const person = tasks.reassignUserSearchInput;
    await expect(person).toHaveValue('');

    await tasks.continueButton.press('Enter');
    const summary = page.getByRole('alert', { name: 'There is a problem' });
    const errorControl = summary.getByRole('button', { name: 'You must select a name', exact: true });
    await expect(errorControl).toBeVisible();
    expect(assignments, 'Missing assignee must not send an assignment request').toEqual([]);

    await errorControl.press('Enter');
    await expect.soft(person, 'The error summary must focus the person input').toBeFocused();
    await expect(page).toHaveURL(personUrl);
    expect(assignments, 'Activating the error summary must not send an assignment request').toEqual([]);

    const colleague = judicialColleagueSearchMock[0];
    const [search] = await Promise.all([
      page.waitForRequest(
        (request) => request.method() === 'POST' && request.url() === `${migrationOrigin}/workallocation/findPerson`
      ),
      person.fill(colleague.name),
    ]);
    expect(search.postDataJSON()).toMatchObject({ searchOptions: { userRole: 'Judicial', services: ['IA'] } });
    await tasks.selectFirstReassignUserOption();
    await tasks.continueButton.press('Enter');
    await expect(page).toHaveURL((url) => url.pathname === `/work/${task.id}/reassign/confirm`);
    const review = page
      .getByRole('table')
      .getByRole('row')
      .filter({
        has: page.getByRole('cell', { name: task.task_title, exact: true }),
      });
    await expect(review).toHaveCount(1);
    await expect(review.getByRole('cell', { name: colleague.name, exact: true })).toBeVisible();
    await expect(tasks.reassignButton).toBeEnabled();
    expect(assignments, 'Review must not send an assignment request').toEqual([]);
  }
);
