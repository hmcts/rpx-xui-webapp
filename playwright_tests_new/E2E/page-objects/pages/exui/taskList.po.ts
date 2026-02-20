import { Page } from '@playwright/test';
import { Base } from '../../base';

export class TaskListPage extends Base {
  readonly taskListFilterToggle = this.page.locator('exui-task-list-filter .govuk-button.hmcts-button--secondary');
  readonly selectAllServicesFilter = this.page.locator('input#checkbox_servicesservices_all');
  readonly selectServicesError = this.page.locator('#services-error');
  readonly selectAllTypesOfWorksFilter = this.page.locator('input#checkbox_types-of-worktypes_of_work_all');
  readonly selectTypesOfWorksError = this.page.locator('#types-of-work-error');
  readonly applyFilterButton = this.page.locator('button#applyFilter');
  readonly taskListTable = this.page.locator('.cdk-table.govuk-table');
  readonly taskListResultsAmount = this.page.locator('#search-result-summary__text, [data-test="search-result-summary__text"]');
  readonly manageCaseButtons = this.taskListTable.getByRole('button', { name: 'Manage' });
  readonly taskActionsRow = this.taskListTable.locator('tr.actions-row[aria-hidden="false"]');
  readonly taskTableTabs = this.page.locator('.hmcts-sub-navigation .hmcts-sub-navigation__link');

  readonly taskActionCancel = this.taskListTable.locator('#action_cancel');
  readonly taskActionGoTo = this.taskListTable.locator('#action_go');
  readonly taskActionMarkAsDone = this.taskListTable.locator('#action_complete');
  readonly taskActionReassign = this.taskListTable.locator('#action_reassign');
  readonly taskActionUnassign = this.taskListTable.locator('#action_unclaim');
  readonly taskActionClaim = this.taskListTable.locator('#action_claim');
  readonly taskActionClaimAndGo = this.taskListTable.locator('#action_claim-and-go');

  readonly sortByCaseNameTableHeader = this.taskListTable.locator('#sort_by_caseName');
  readonly sortByCaseCategoryTableHeader = this.taskListTable.locator('#sort_by_caseCategory');
  readonly sortByLocationTableHeader = this.taskListTable.locator('#sort_by_locationName');
  readonly sortByTaskTableHeader = this.taskListTable.locator('#sort_by_taskTitle');
  readonly sortByDueDateTableHeader = this.taskListTable.locator('#sort_by_dueDate');
  readonly sortByHearingDateTableHeader = this.taskListTable.locator('#sort_by_next_hearing_date');

  readonly paginationControls = this.page.locator('.ngx-pagination');
  readonly paginationNextButton = this.paginationControls.locator('.pagination-next');
  readonly paginationEllipsisButton = this.paginationControls.locator('.ellipsis');
  readonly paginationPreviousButton = this.paginationControls.locator('.pagination-previous');
  readonly paginationCurrentPage = this.paginationControls.locator('.current');

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

  async getResultsText(timeoutMs = 15000) {
    const summary = this.taskListResultsAmount.first();
    await summary.waitFor({ state: 'visible', timeout: timeoutMs });
    return await summary.textContent();
  }
}
