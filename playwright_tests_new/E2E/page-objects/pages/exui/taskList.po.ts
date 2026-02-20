import { Page } from '@playwright/test';
import { Base } from '../../base';

export class TaskListPage extends Base {
  readonly taskListFilterToggle = this.page.locator('.govuk-button.hmcts-button--secondary');
  readonly selectAllServicesFilter = this.page.locator('input#checkbox_servicesservices_all');
  readonly selectAllTypesOfWorksFilter = this.page.locator('input#checkbox_types-of-worktypes_of_work_all');
  readonly applyFilterButton = this.page.locator('button#applyFilter');
  readonly taskListTable = this.page.locator('.cdk-table.govuk-table');
  readonly taskListResultsAmount = this.page.locator('#search-result-summary__text, [data-test="search-result-summary__text"]');
  readonly manageCaseButtons = this.taskListTable.getByRole('button', { name: 'Manage' });
  readonly errorPageHeading = this.page.getByRole('heading', { name: /something went wrong/i });
  readonly taskActionsRow = this.taskListTable.locator('tr.actions-row[aria-hidden="false"]');
  // Action links have stable IDs: action_{taskActionId}
  readonly taskActionCancel = this.taskListTable.locator('#action_cancel');
  readonly taskActionGoTo = this.taskListTable.locator('#action_go');
  readonly taskActionMarkAsDone = this.taskListTable.locator('#action_complete');
  readonly taskActionReassign = this.taskListTable.locator('#action_reassign');
  readonly taskActionUnassign = this.taskListTable.locator('#action_unclaim');
  readonly taskActionClaim = this.taskListTable.locator('#action_claim');
  readonly taskActionClaimAndGo = this.taskListTable.locator('#action_claim-and-go');

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
      .filter((call) => call.url.includes('/workallocation/task'))
      .at(-1);
    const latestTaskCallSummary = latestTaskCall
      ? `${latestTaskCall.method} ${latestTaskCall.url} -> HTTP ${latestTaskCall.status}`
      : 'none captured';
    throw new Error(
      `Timed out after ${timeoutMs}ms waiting for Manage button (${context}). Last /workallocation/task call: ${latestTaskCallSummary}`
    );
  }
}
