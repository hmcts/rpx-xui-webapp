import { Page } from '@playwright/test';
import { Base } from '../../base';

export class TaskListPage extends Base {
  readonly taskListFilterToggle = this.page.locator('exui-task-list-filter .govuk-button.hmcts-button--secondary');
  readonly filterPanel = this.page.locator('xuilib-generic-filter');
  readonly selectAllServicesFilter = this.filterPanel.locator('input#checkbox_servicesservices_all').first();
  readonly selectServicesError = this.filterPanel.locator('#services-error').first();
  readonly typesOfWorkCheckBoxes = this.filterPanel.locator('#types-of-work #checkbox_types-of-work .govuk-checkboxes__item');
  readonly selectAllTypesOfWorksFilter = this.filterPanel.locator('input#checkbox_types-of-worktypes_of_work_all').first();

  readonly selectTypesOfWorksError = this.page.locator('#types-of-work-error').first();
  readonly applyFilterButton = this.page.locator('button#applyFilter').first();

  readonly taskTableTabs = this.page.locator('.hmcts-sub-navigation .hmcts-sub-navigation__link');

  readonly taskListTable = this.page.locator('.cdk-table.govuk-table');
  readonly sortByCaseNameTableHeader = this.taskListTable.locator('#sort_by_caseName');
  readonly sortByCaseCategoryTableHeader = this.taskListTable.locator('#sort_by_caseCategory');
  readonly sortByLocationTableHeader = this.taskListTable.locator('#sort_by_locationName');
  readonly sortByTaskTableHeader = this.taskListTable.locator('#sort_by_taskTitle');
  readonly sortByDueDateTableHeader = this.taskListTable.locator('#sort_by_dueDate');
  readonly sortByHearingDateTableHeader = this.taskListTable.locator('#sort_by_next_hearing_date');
  readonly taskTableHeader = this.taskListTable.locator('thead');
  readonly taskTableFooter = this.taskListTable.locator('tfoot');
  readonly taskListResultsAmount = this.page.locator('#search-result-summary__text, [data-test="search-result-summary__text"]');
  readonly manageCaseButtons = this.taskListTable.getByRole('button', { name: 'Manage' });
  readonly errorPageHeading = this.page.getByRole('heading', { name: /something went wrong/i });
  readonly taskActionsRow = this.taskListTable.locator('tr.actions-row[aria-hidden="false"]');

  readonly taskActionCancel = this.taskListTable.locator('#action_cancel');
  readonly taskActionGoTo = this.taskListTable.locator('#action_go');
  readonly taskActionMarkAsDone = this.taskListTable.locator('#action_complete');
  readonly taskActionReassign = this.taskListTable.locator('#action_reassign');
  readonly taskActionUnassign = this.taskListTable.locator('#action_unclaim');
  readonly taskActionClaim = this.taskListTable.locator('#action_claim');
  readonly taskActionClaimAndGo = this.taskListTable.locator('#action_claim-and-go');
  readonly confirmCancelTaskButton = this.page.getByRole('button', { name: 'Cancel task' });
  readonly caseDetailsTaskActionCancel = this.page
    .locator('#action_cancel')
    .or(this.page.getByRole('link', { name: 'Cancel task' }));
  readonly cancelledTaskMessage = this.page.getByText("You've cancelled a task. It has been removed from the task list.");
  readonly taskNoLongerAvailableMessage = this.page.getByText('The task is no longer available.');

  readonly paginationControls = this.page.locator('.ngx-pagination');
  readonly paginationNextButton = this.paginationControls.locator('.pagination-next');
  readonly paginationEllipsisButton = this.paginationControls.locator('.ellipsis');
  readonly paginationPreviousButton = this.paginationControls.locator('.pagination-previous');
  readonly paginationCurrentPage = this.paginationControls.locator('.current');

  constructor(page: Page) {
    super(page);
  }

  async applyAllFilterOptions() {
    await this.openFilterPanel();
    await this.selectAllServicesFilter.check();
    await this.selectAllTypesOfWorksFilter.check();
    await this.applyCurrentFilters();
  }

  async goto() {
    await this.page.goto('/work/my-work/list', { waitUntil: 'domcontentloaded' });
  }

  async selectWorkMenuItem(menuItemText: string) {
    const menuItem = this.page.getByRole('link', { name: menuItemText, exact: true });
    await menuItem.click();
  }

  async getResultsText() {
    return await this.taskListResultsAmount.textContent();
  }

  async openFilterPanel() {
    await this.taskListFilterToggle.waitFor({ state: 'visible' });
    for (let attempt = 0; attempt < 2; attempt += 1) {
      if (await this.applyFilterButton.isVisible().catch(() => false)) {
        return;
      }
      await this.taskListFilterToggle.click({ force: true });
      await this.filterPanel.waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);
      if (await this.applyFilterButton.isVisible().catch(() => false)) {
        return;
      }
      await this.page.waitForTimeout(250);
    }
    await this.applyFilterButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  async applyCurrentFilters() {
    await this.openFilterPanel();
    await this.applyFilterButton.evaluate((button: HTMLButtonElement) => button.click());
  }

  async setSelectAllServicesFilter(checked: boolean) {
    await this.setFilterCheckbox(this.selectAllServicesFilter, checked);
  }

  async setSelectAllTypesOfWorksFilter(checked: boolean) {
    await this.setFilterCheckbox(this.selectAllTypesOfWorksFilter, checked);
  }

  private async setFilterCheckbox(checkbox: ReturnType<Page['locator']>, checked: boolean) {
    await this.openFilterPanel();
    const targetCheckbox = checkbox.first();
    await targetCheckbox.waitFor({ state: 'visible' });
    const isChecked = await targetCheckbox.isChecked();
    if (isChecked === checked) {
      return;
    }
    if (checked) {
      await targetCheckbox.check({ force: true });
    } else {
      await targetCheckbox.uncheck({ force: true });
    }
  }

  async confirmTaskCancellation() {
    await this.confirmCancelTaskButton.click();
  }

  async waitForManageButton(
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    const timeoutMs = options.timeoutMs ?? 60_000;
    const pollMs = options.pollMs ?? 500;
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const onServiceDownPage =
        this.page.url().includes('/service-down') || (await this.errorPageHeading.isVisible().catch(() => false));
      if (onServiceDownPage) {
        throw new Error(`Something went wrong page was displayed while waiting for Manage button (${context}).`);
      }

      const taskApi5xx = this.getApiCalls().find((call) => call.url.includes('/workallocation/task') && call.status >= 500);
      if (taskApi5xx) {
        throw new Error(
          `Task list failed while waiting for Manage button (${context}): ${taskApi5xx.method} ${taskApi5xx.url} returned HTTP ${taskApi5xx.status}`
        );
      }

      const manageButton = this.manageCaseButtons.first();
      if (await manageButton.isVisible().catch(() => false)) {
        return;
      }

      await this.page.waitForTimeout(pollMs);
    }

    const latestTaskCall = this.getApiCalls()
      .reverse()
      .find((call) => call.url.includes('/workallocation/task'));
    const latestTaskCallSummary = latestTaskCall
      ? `${latestTaskCall.method} ${latestTaskCall.url} -> HTTP ${latestTaskCall.status}`
      : 'none captured';
    throw new Error(
      `Timed out after ${timeoutMs}ms waiting for Manage button (${context}). Last /workallocation/task call: ${latestTaskCallSummary}`
    );
  }
}
