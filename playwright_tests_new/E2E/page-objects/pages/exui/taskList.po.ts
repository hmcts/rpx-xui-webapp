import { Page } from '@playwright/test';
import { Base } from "../../base";

export class TaskListPage extends Base {
  readonly taskListFilterToggle = this.page.locator(".govuk-button.hmcts-button--secondary");
  readonly selectAllServicesFilter = this.page.locator("input#checkbox_servicesservices_all");
  readonly selectAllTypesOfWorksFilter = this.page.locator("input#checkbox_types-of-worktypes_of_work_all");
  readonly applyFilterButton = this.page.locator("button#applyFilter");
  readonly taskListTable = this.page.locator(".cdk-table.govuk-table");
  readonly taskListResultsAmount = this.page.locator('[data-test="search-result-summary__text"]');

  constructor(page: Page) {
    super(page);
  }

  async applyAllFilterOptions() {
    await this.taskListFilterToggle.waitFor({state:"visible"});
    await this.taskListFilterToggle.click();
    await this.selectAllServicesFilter.waitFor({state:"visible"});
    await this.selectAllServicesFilter.check();
    await this.selectAllTypesOfWorksFilter.check();
    await this.applyFilterButton.click();
  }

  async goto() {
    await this.page.goto("/work/my-work/list");
    await this.exuiHeader.checkIsVisible();
  }

  async getResultsText() {
    return await this.taskListResultsAmount.textContent();
  }
}
