import { Page } from '@playwright/test';
import { Base } from '../../base';

export class TaskListPage extends Base {
  readonly taskListFilterToggle = this.page.locator('.govuk-grid-column-full .govuk-button.hmcts-button--secondary');
  readonly selectAllServicesFilter = this.page.locator('input#checkbox_servicesservices_all');
  readonly selectAllTypesOfWorksFilter = this.page.locator('input#checkbox_types-of-worktypes_of_work_all');
  readonly applyFilterButton = this.page.locator('#applyFilter');
  readonly taskListTable = this.page.locator('.cdk-table.govuk-table');
  readonly taskListResultsAmount = this.page.locator('[data-test="search-result-summary__text"]');
  readonly manageCaseButtons = this.page.locator('.xui-manage-button');

  readonly workMenuItems = this.page.locator('.hmcts-sub-navigation');

  readonly taskActionCancel = this.page.locator('#action_cancel');
  readonly taskActionMarkAsDone = this.page.locator('#action_complete');
  readonly taskActionGoTo = this.page.locator('#action_go');
  readonly taskActionReassign = this.page.locator('#action_reassign');
  readonly taskActionUnassign = this.page.locator('#action_unclaim');
  readonly taskActionClaim = this.page.locator('#action_claim');
  readonly taskActionClaimAndGo = this.page.locator('#action_claim-and-go');

  constructor(page: Page) {
    super(page);
  }

  async selectWorkMenuItem(itemName: string) {
    await this.workMenuItems.getByRole('link', { name: itemName }).click();
  }

  async applyAllFilterOptions() {
    await this.taskListFilterToggle.waitFor({ state: 'visible' });
    await this.taskListFilterToggle.click();
    await this.selectAllServicesFilter.waitFor({ state: 'visible' });
    await this.selectAllServicesFilter.check();
    await this.selectAllTypesOfWorksFilter.check();
    await this.applyFilterButton.waitFor({ state: 'visible' });
    await this.applyFilterButton.click();
  }

  async getResultsText() {
    return await this.taskListResultsAmount.textContent();
  }
}
