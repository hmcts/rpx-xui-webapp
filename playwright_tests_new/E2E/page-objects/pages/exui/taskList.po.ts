import { Page } from '@playwright/test';
import { Base } from "../../base";

export class TaskListPage extends Base {
  readonly taskListTable = this.page.locator(".cdk-table.govuk-table");
  readonly taskListResultsAmount = this.page.locator(".search-result-summary__text");

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/work/my-work/list");
  }

  async getResultsText() {
    return await this.taskListResultsAmount.textContent();
  }
}
