import { Page } from '@playwright/test';
import { Base } from '../../base';

export class TaskListPage extends Base {
  readonly taskListFilterToggle = this.page.locator('.govuk-button.hmcts-button--secondary');
  readonly selectAllServicesFilter = this.page.locator('input#checkbox_servicesservices_all');
  readonly selectAllTypesOfWorksFilter = this.page.locator('input#checkbox_types-of-worktypes_of_work_all');
  readonly applyFilterButton = this.page.locator('button#applyFilter');
  readonly taskListTable = this.page.locator('.cdk-table.govuk-table');
  readonly taskListResultsAmount = this.page.locator('[data-test="search-result-summary__text"]');
  readonly manageCaseButtons = this.taskListTable.getByRole('button', { name: 'Manage' });
  // No stable test IDs on task action links; they render as <a> without href, so role=link isn't exposed.
  readonly taskActionCancel = this.taskListTable.locator('.task-action .action', { hasText: /cancel/i });
  readonly taskActionGoTo = this.taskListTable.locator('.task-action .action', { hasText: /go to/i });
  readonly taskActionMarkAsDone = this.taskListTable.locator('.task-action .action', { hasText: /mark as done/i });
  readonly taskActionReassign = this.taskListTable.locator('.task-action .action', { hasText: /reassign/i });
  readonly taskActionUnassign = this.taskListTable.locator('.task-action .action', { hasText: /unassign/i });
  readonly taskActionClaim = this.taskListTable.locator('.task-action .action', { hasText: /^claim$/i });
  readonly taskActionClaimAndGo = this.taskListTable.locator('.task-action .action', { hasText: /claim and go/i });

  constructor(page: Page) {
    super(page);
  }

  async applyAllFilterOptions() {
    await this.taskListFilterToggle.waitFor({ state: 'visible' });
    await this.taskListFilterToggle.click();
    await this.selectAllServicesFilter.waitFor({ state: 'visible' });
    await this.selectAllServicesFilter.check();
    await this.selectAllTypesOfWorksFilter.check();
    await this.applyFilterButton.click();
  }

  async goto() {
    await this.page.goto('/work/my-work/list');
  }

  async selectWorkMenuItem(menuItemText: string) {
    const menuItem = this.page.getByRole('link', { name: menuItemText, exact: true });
    await menuItem.click();
  }

  async getResultsText() {
    return await this.taskListResultsAmount.textContent();
  }
}
