import { expect, test } from '@playwright/test';
import { TaskListPage } from '../../../E2E/page-objects/pages/exui/taskList.po';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationMyWork, setupMigrationTaskPages } from '../../helpers/migrationWorkRoutes.helper';

test(
  'My Tasks exposes usable actions and restores them after collapsing Manage',
  { tag: '@migration-sweep' },
  async ({ page }, testInfo) => {
    await setupMigrationMyWork(page);
    const tasks = new TaskListPage(page);
    await tasks.goto();
    await expect(tasks.taskRows).toHaveCount(1);
    await expect(tasks.taskRows).toContainText('Assigned migration case');
    await expect(tasks.taskRows).toContainText('Review the appeal');
    await expect(tasks.taskListResultsAmount).toHaveText('Showing 1 to 1 of 1 results');

    await tasks.openFirstManageActions('migration work actions');
    await expect(tasks.taskActionReassign).toBeVisible();
    await expect(tasks.taskActionMarkAsDone).toBeVisible();
    await expect(tasks.taskActionUnassign).toBeVisible();
    await tasks.manageCaseButtons.click();
    await expect(tasks.taskActionsRow).toHaveCount(0);
    await tasks.openFirstManageActions('migration work actions reopened');
    await expect(tasks.taskActionReassign).toBeVisible();
    await expect(tasks.taskActionCancel).toBeVisible();
    await expect(tasks.manageCaseButtons).toHaveAttribute('aria-expanded', 'true');

    const state = await captureMigrationState(page, testInfo);
    if (state.viewportWidth >= 768 || process.env.MIGRATION_STRICT_REFLOW === 'true') {
      expect.soft(state.documentWidth, 'The work page should fit its viewport').toBeLessThanOrEqual(state.viewportWidth + 1);
    }
  }
);

test(
  'empty My Tasks can navigate to an available task with claim controls',
  { tag: '@migration-sweep' },
  async ({ page }, testInfo) => {
    await setupMigrationMyWork(page, true);
    const tasks = new TaskListPage(page);
    await tasks.goto();
    await expect(tasks.taskListTable).toBeVisible();
    await expect(page.getByText('You have no assigned tasks.', { exact: true })).toBeVisible();
    await expect(tasks.manageCaseButtons).toHaveCount(0);

    const request = await tasks.clickTaskTabAndWaitForView(
      'Available tasks',
      'AvailableTasks',
      'migration empty-to-available work'
    );
    expect(request.postDataJSON()).toMatchObject({ view: 'AvailableTasks' });
    await expect(tasks.taskRows).toHaveCount(1);
    await expect(tasks.taskRows).toContainText('Available migration case');
    await expect(page.getByText('You have no assigned tasks.', { exact: true })).toHaveCount(0);
    await tasks.openFirstManageActions('migration available task actions');
    await expect(tasks.taskActionClaim).toBeVisible();
    await expect(tasks.taskActionClaimAndGo).toBeVisible();
    await expect(tasks.taskActionCancel).toHaveCount(0);

    const state = await captureMigrationState(page, testInfo);
    if (state.viewportWidth >= 768 || process.env.MIGRATION_STRICT_REFLOW === 'true') {
      expect
        .soft(state.documentWidth, 'The available-work page should fit its viewport')
        .toBeLessThanOrEqual(state.viewportWidth + 1);
    }
  }
);

test(
  'task pagination requests and renders distinct records, then restores page one',
  { tag: '@migration-sweep' },
  async ({ page }, testInfo) => {
    await setupMigrationTaskPages(page);
    const tasks = new TaskListPage(page);
    await tasks.goto();
    await expect(tasks.taskRows).toHaveCount(25);
    await expect(tasks.taskRows.first()).toContainText('Migration case 01');
    await expect(tasks.taskRows.last()).toContainText('Migration case 25');

    const next = page.waitForRequest(
      (request) =>
        new URL(request.url()).pathname.endsWith('/workallocation/task') &&
        request.method() === 'POST' &&
        request.postDataJSON()?.searchRequest?.pagination_parameters?.page_number === 2
    );
    await tasks.exuiBodyComponent.paginationNextButton.click();
    expect((await next).postDataJSON()).toMatchObject({
      view: 'MyTasks',
      searchRequest: { pagination_parameters: { page_number: 2, page_size: 25 } },
    });
    await expect(tasks.taskRows).toHaveCount(1);
    await expect(tasks.taskRows).toContainText('Migration case 26');
    await expect(tasks.taskListResultsAmount).toHaveText('Showing 26 to 26 of 26 results');
    const state = await captureMigrationState(page, testInfo, 'my-tasks-page-two');
    expect.soft(state.documentWidth, 'Task results should fit the viewport').toBeLessThanOrEqual(state.viewportWidth + 1);
    await tasks.exuiBodyComponent.paginationPreviousButton.click();
    await expect(tasks.taskRows).toHaveCount(25);
    await expect(tasks.taskRows.first()).toContainText('Migration case 01');
  }
);
