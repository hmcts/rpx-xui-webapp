import { Locator, Page, Request } from '@playwright/test';
import { Base } from '../../base';

const TASK_LIST_READY_TIMEOUT_MS = 30_000;
const FILTER_PANEL_READY_TIMEOUT_MS = 10_000;
const FILTER_CONTROL_READY_TIMEOUT_MS = 15_000;
const FILTER_GROUP_OPERATION_TIMEOUT_MS = 10_000;
const FILTER_INTERACTION_ATTEMPTS = 2;
const PRIORITY_LIMIT_URGENT = 2000;
const PRIORITY_LIMIT_HIGH = 5000;

export class TaskListPage extends Base {
  readonly myWorkHeading = this.page.getByRole('heading', { name: /my work/i }).first();
  readonly taskListFilterToggle = this.page.locator('exui-task-list-filter .govuk-button.hmcts-button--secondary').first();
  readonly filterPanel = this.page.locator('xuilib-generic-filter');
  readonly selectAllServicesFilter = this.filterPanel.locator('input#checkbox_servicesservices_all').first();
  readonly serviceFilterCheckboxes = this.filterPanel.locator(
    '#services .govuk-checkboxes__input:not(#checkbox_servicesservices_all)'
  );
  readonly selectServicesError = this.filterPanel.locator('#services-error').first();
  readonly typesOfWorkCheckBoxes = this.filterPanel.locator('#types-of-work #checkbox_types-of-work .govuk-checkboxes__item');
  readonly selectAllTypesOfWorksFilter = this.filterPanel.locator('input#checkbox_types-of-worktypes_of_work_all').first();
  readonly typesOfWorkFilterCheckboxes = this.filterPanel.locator(
    '#types-of-work .govuk-checkboxes__input:not(#checkbox_types-of-worktypes_of_work_all)'
  );

  readonly selectTypesOfWorksError = this.filterPanel.locator('#types-of-work-error').first();
  readonly applyFilterButton = this.page.locator('button#applyFilter').first();

  readonly allWorkServiceFilter = this.filterPanel
    .locator('select[name="service"], select#service, [id*="service"] select')
    .first();
  readonly allWorkLocationAllRadio = this.filterPanel.getByRole('radio', { name: /^All$/ }).first();
  readonly allWorkLocationSearchRadio = this.filterPanel.getByRole('radio', { name: 'Search for a location' }).first();
  readonly allWorkTaskCategoryAllRadio = this.filterPanel.getByRole('radio', { name: /^All$/ }).nth(1);
  readonly allWorkTaskCategoryUnassignedRadio = this.filterPanel.getByRole('radio', { name: 'Unassigned' }).first();
  readonly allWorkTaskCategoryAssignedToPersonRadio = this.filterPanel
    .getByRole('radio', { name: 'Assigned to a person' })
    .first();
  readonly allWorkTaskTypeFilter = this.filterPanel.getByRole('combobox', { name: /select a role type|task type/i }).first();
  readonly allWorkTasksByRoleTypeFilter = this.filterPanel
    .locator('h3:has-text("Tasks by role type")')
    .locator('xpath=following::select[1]')
    .first();
  readonly allWorkPersonSearchInput = this.filterPanel.getByRole('combobox', { name: /select a person/i }).first();
  readonly allWorkLocationSearchInput = this.filterPanel.locator('input[name="location"], input[id*="location"]').first();

  readonly taskTableTabs = this.page.locator('.hmcts-sub-navigation .hmcts-sub-navigation__link');

  readonly taskListTable = this.page.locator('table.govuk-table').first();
  readonly taskRows = this.taskListTable.locator('tbody > tr:not(.actions-row)');
  readonly sortByCaseNameTableHeader = this.taskListTable.locator('#sort_by_caseName');
  readonly sortByCaseCategoryTableHeader = this.taskListTable.locator('#sort_by_caseCategory');
  readonly sortByLocationTableHeader = this.taskListTable.locator('#sort_by_locationName');
  readonly sortByTaskTableHeader = this.taskListTable.locator('#sort_by_taskTitle');
  readonly sortByDueDateTableHeader = this.taskListTable.locator('#sort_by_dueDate');
  readonly sortByHearingDateTableHeader = this.taskListTable.locator('#sort_by_next_hearing_date');
  readonly taskTableHeader = this.taskListTable.locator('thead');
  readonly taskTableFooter = this.taskListTable.locator('tfoot');
  readonly taskListResultsAmount = this.page.locator('#search-result-summary__text, [data-test="search-result-summary__text"]');
  readonly myCasesResultsAmount = this.page.locator('.pagination-top');
  readonly uniqueCasesSummary = this.page.locator('.second-line');
  readonly myAccessNewCasesBadge = this.page.locator('.xui-alert-link__number');
  readonly manageCaseButtons = this.taskListTable.getByRole('button', { name: 'Manage' });
  readonly errorPageHeading = this.page.getByRole('heading', { name: /something went wrong/i });
  readonly serviceDownError = this.exuiBodyComponent.serviceDownError;
  readonly serviceDownHeading = this.page.getByRole('heading', { name: 'Sorry, there is a problem with the service' });
  readonly notAuthorisedHeading = this.page.getByRole('heading', {
    name: "Sorry, you're not authorised to perform this action",
  });
  readonly taskActionsRow = this.taskListTable.locator('tr.actions-row[aria-hidden="false"]');

  readonly taskActionCancel = this.taskActionsRow.locator('#action_cancel');
  readonly taskActionGoTo = this.taskActionsRow.locator('#action_go');
  readonly taskActionMarkAsDone = this.taskActionsRow.locator('#action_complete');
  readonly taskActionReassign = this.taskActionsRow.locator('#action_reassign');
  readonly taskActionUnassign = this.taskActionsRow.locator('#action_unclaim');
  readonly taskActionClaim = this.taskActionsRow.locator('#action_claim');
  readonly taskActionClaimAndGo = this.taskActionsRow.locator('#action_claim-and-go');
  readonly reallocateAction = this.taskActionsRow.locator('#action_reallocate');
  readonly removeAllocationAction = this.taskActionsRow.locator('#action_remove');
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

  readonly submitButton = this.page.locator('#submit-button');
  readonly continueButton = this.page.locator('.govuk-button').filter({ hasText: 'Continue' });

  readonly reassignUserSearchInput = this.page.locator('#inputSelectPerson');
  readonly reassignUserAutocompleteOverlay = this.page.locator('.cdk-overlay-pane');
  readonly reassignUserAutocompleteFirstOption = this.page.getByRole('option').first();
  readonly reassignButton = this.page.getByRole('button', { name: 'Reassign' });

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
    await this.navigateToTaskListView('/work/my-work/list', /\/work\/my-work\/list(?:\?.*)?$/, 'task list navigation');
  }

  async gotoAndWaitForTaskRow(
    context: string,
    options: {
      rowIndex?: number;
      timeoutMs?: number;
    } = {}
  ) {
    const rowIndex = options.rowIndex ?? 0;
    const timeoutMs = options.timeoutMs ?? TASK_LIST_READY_TIMEOUT_MS;

    await this.page.goto('/work/my-work/list', { waitUntil: 'domcontentloaded' });
    await this.page.waitForURL(/\/work\/my-work\/list(?:\?.*)?$/, { timeout: timeoutMs }).catch(() => undefined);
    await this.waitForExuiAppShell(context, timeoutMs);
    await this.waitForTaskListSpinnerToSettle(10_000);

    await Promise.any([
      this.waitForTaskListShellReady(`${context} shell bootstrap`),
      this.waitForTaskRowReady(`${context} row bootstrap`, { rowIndex, timeoutMs }),
    ]);
  }

  async gotoMyCases() {
    await this.navigateToTaskListView('/work/my-work/my-cases', /\/work\/my-work\/my-cases(?:\?.*)?$/, 'my cases navigation');
  }

  async gotoMyAccess() {
    await this.navigateToTaskListView('/work/my-work/my-access', /\/work\/my-work\/my-access(?:\?.*)?$/, 'my access navigation');
  }

  async gotoAllWorkTasks() {
    await this.navigateToTaskListView('/work/all-work/tasks', /\/work\/all-work\/tasks(?:\?.*)?$/, 'all work tasks navigation');
  }

  async selectWorkMenuItem(menuItemText: string) {
    const menuItem = this.page.getByRole('link', { name: menuItemText, exact: true });
    await menuItem.click();
  }

  async getResultsText() {
    return await this.taskListResultsAmount.textContent();
  }

  getExpectedPriorityLabel(majorPriority?: number | string, priorityDate?: string | Date, currentDate: Date = new Date()) {
    const resolvedMajorPriority = this.parsePriorityValue(majorPriority);

    if (resolvedMajorPriority === null) {
      return '';
    }

    if (resolvedMajorPriority === PRIORITY_LIMIT_HIGH) {
      return this.getExpectedHighThresholdPriorityLabel(priorityDate, currentDate);
    }

    if (resolvedMajorPriority <= PRIORITY_LIMIT_URGENT) {
      return 'URGENT';
    }

    if (resolvedMajorPriority > PRIORITY_LIMIT_HIGH) {
      return 'LOW';
    }

    return 'HIGH';
  }

  private parsePriorityValue(majorPriority?: number | string): number | null {
    if (majorPriority === undefined || majorPriority === null) {
      return null;
    }

    const resolvedMajorPriority = typeof majorPriority === 'number' ? majorPriority : Number.parseInt(String(majorPriority), 10);

    return Number.isNaN(resolvedMajorPriority) ? null : resolvedMajorPriority;
  }

  private getExpectedHighThresholdPriorityLabel(priorityDate?: string | Date, currentDate: Date = new Date()) {
    const resolvedPriorityDate = this.parsePriorityDate(priorityDate);

    if (!resolvedPriorityDate) {
      return 'HIGH';
    }

    if (currentDate.getTime() > resolvedPriorityDate.getTime()) {
      return 'HIGH';
    }

    const hoursBetweenDates = Math.abs(resolvedPriorityDate.getTime() - currentDate.getTime()) / (60 * 60 * 1000);
    return hoursBetweenDates <= 24 ? 'MEDIUM' : 'LOW';
  }

  private parsePriorityDate(priorityDate?: string | Date): Date | null {
    if (priorityDate === undefined || priorityDate === null) {
      return null;
    }

    const resolvedPriorityDate = priorityDate instanceof Date ? priorityDate : new Date(priorityDate);
    return Number.isNaN(resolvedPriorityDate.getTime()) ? null : resolvedPriorityDate;
  }

  private async waitForTaskListSpinnerToSettle(timeoutMs: number): Promise<void> {
    await this.page
      .waitForFunction(() => document.querySelectorAll('xuilib-loading-spinner').length === 0, undefined, { timeout: timeoutMs })
      .catch(() => undefined);
  }

  private async navigateToTaskListView(
    path: string,
    urlPattern: RegExp,
    context: string,
    timeoutMs = TASK_LIST_READY_TIMEOUT_MS
  ) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.page.waitForURL(urlPattern, { timeout: timeoutMs }).catch(() => undefined);
    await this.waitForExuiAppShell(context, timeoutMs);
    await this.waitForTaskListSpinnerToSettle(10_000);
    await this.waitForTaskListShellReady(context);
  }

  private async waitForExuiAppShell(context: string, timeoutMs: number): Promise<void> {
    const shellTimeoutMs = Math.max(1_000, Math.min(10_000, timeoutMs));

    await Promise.any([
      this.exuiHeader.appHeaderLink.waitFor({ state: 'attached', timeout: shellTimeoutMs }),
      this.errorPageHeading.waitFor({ state: 'visible', timeout: shellTimeoutMs }),
      this.serviceDownError.waitFor({ state: 'visible', timeout: shellTimeoutMs }),
    ]).catch(async () => {
      await this.assertTaskListHealthy(`waiting for EXUI app shell (${context})`, { allowServiceDown: true });
    });
  }

  private async assertTaskListHealthy(context: string, options: { allowServiceDown?: boolean } = {}): Promise<void> {
    if (await this.errorPageHeading.isVisible().catch(() => false)) {
      throw new Error(`Something went wrong page was displayed while ${context}.`);
    }

    const onServiceDownPage =
      this.page.url().includes('/service-down') || (await this.serviceDownError.isVisible().catch(() => false));
    if (onServiceDownPage && !options.allowServiceDown) {
      throw new Error(`Task list showed service down while ${context}.`);
    }
  }

  async waitForTaskListShellReady(context: string) {
    const findVisibleShellSignal = async () => {
      const signals: Array<[string, Locator]> = [
        ['heading', this.myWorkHeading],
        ['tabs', this.taskTableTabs.first()],
        ['filter-toggle', this.taskListFilterToggle],
        ['table', this.taskListTable],
        ['table-header', this.taskTableHeader],
        ['table-footer', this.taskTableFooter],
        ['results-summary', this.taskListResultsAmount],
        ['error-page', this.errorPageHeading],
        ['service-down', this.serviceDownError],
      ];

      for (const [signal, locator] of signals) {
        if (await locator.isVisible().catch(() => false)) {
          return signal;
        }
      }

      return null;
    };

    await this.page
      .waitForURL(/\/(?:work\/(?:my-work\/(?:list|available|my-cases|my-access)|all-work\/(?:tasks|cases))|service-down)/, {
        timeout: TASK_LIST_READY_TIMEOUT_MS,
      })
      .catch(() => undefined);
    await this.waitForTaskListSpinnerToSettle(10_000);
    const immediateSignal = await findVisibleShellSignal();
    if (immediateSignal) {
      if (immediateSignal === 'error-page') {
        await this.assertTaskListHealthy(`waiting for task list shell (${context})`);
      }

      if (immediateSignal !== 'service-down') {
        await this.waitForTaskListSpinnerToSettle(5_000);
        await this.assertTaskListHealthy(`waiting for task list shell (${context})`, { allowServiceDown: true });
      }

      return;
    }

    const bootstrapSignal = await Promise.any([
      this.myWorkHeading.waitFor({ state: 'visible', timeout: TASK_LIST_READY_TIMEOUT_MS }).then(() => 'heading'),
      this.taskTableTabs
        .first()
        .waitFor({ state: 'visible', timeout: TASK_LIST_READY_TIMEOUT_MS })
        .then(() => 'tabs'),
      this.taskListFilterToggle.waitFor({ state: 'visible', timeout: TASK_LIST_READY_TIMEOUT_MS }).then(() => 'filter-toggle'),
      this.taskListTable.waitFor({ state: 'visible', timeout: TASK_LIST_READY_TIMEOUT_MS }).then(() => 'table'),
      this.taskTableHeader.waitFor({ state: 'visible', timeout: TASK_LIST_READY_TIMEOUT_MS }).then(() => 'table-header'),
      this.taskTableFooter.waitFor({ state: 'visible', timeout: TASK_LIST_READY_TIMEOUT_MS }).then(() => 'table-footer'),
      this.taskListResultsAmount.waitFor({ state: 'visible', timeout: TASK_LIST_READY_TIMEOUT_MS }).then(() => 'results-summary'),
      this.errorPageHeading.waitFor({ state: 'visible', timeout: TASK_LIST_READY_TIMEOUT_MS }).then(() => 'error-page'),
      this.serviceDownError.waitFor({ state: 'visible', timeout: TASK_LIST_READY_TIMEOUT_MS }).then(() => 'service-down'),
    ]).catch(async () => {
      const lateSignal = await findVisibleShellSignal();
      if (lateSignal) {
        return lateSignal;
      }
      const headingText = await this.page
        .locator('main h1, main h2, main h3')
        .first()
        .textContent()
        .catch(() => '');
      throw new Error(
        `Task list shell did not become ready within ${TASK_LIST_READY_TIMEOUT_MS}ms (${context}). url=${this.page.url()} heading=${
          headingText?.trim() || 'unknown'
        }`
      );
    });

    if (bootstrapSignal === 'error-page') {
      await this.assertTaskListHealthy(`waiting for task list shell (${context})`);
    }

    if (bootstrapSignal === 'service-down') {
      return;
    }

    await this.waitForTaskListSpinnerToSettle(5_000);
    await this.assertTaskListHealthy(`waiting for task list shell (${context})`, { allowServiceDown: true });
  }

  private async assertTaskListInteractive(context: string): Promise<void> {
    await this.assertTaskListHealthy(context);
  }

  private resolveInteractionTimeout(deadlineMs: number | undefined, fallbackMs: number): number {
    if (!deadlineMs) {
      return fallbackMs;
    }
    this.assertFilterInteractionAlive('deadline check', deadlineMs);
    return Math.max(250, Math.min(fallbackMs, deadlineMs - Date.now()));
  }

  private async waitForFilterControls(context: string, deadlineMs?: number): Promise<void> {
    const timeoutMs = this.resolveInteractionTimeout(deadlineMs, FILTER_CONTROL_READY_TIMEOUT_MS);
    await Promise.any([
      this.applyFilterButton.waitFor({ state: 'visible', timeout: timeoutMs }),
      this.taskListFilterToggle.waitFor({ state: 'visible', timeout: timeoutMs }),
    ]).catch(async () => {
      await this.assertTaskListInteractive(context);
      throw new Error(`Task list filter controls did not become visible within ${timeoutMs}ms.`);
    });
  }

  private async waitForFilterCheckboxVisible(checkbox: Locator, description: string, deadlineMs?: number): Promise<Locator> {
    const targetCheckbox = checkbox.first();
    const timeoutMs = this.resolveInteractionTimeout(deadlineMs, FILTER_CONTROL_READY_TIMEOUT_MS);
    await targetCheckbox.waitFor({ state: 'visible', timeout: timeoutMs }).catch(async () => {
      await this.assertTaskListInteractive(`waiting for ${description}`);
      throw new Error(`Task list filter checkbox "${description}" did not become visible within ${timeoutMs}ms.`);
    });
    return targetCheckbox;
  }

  private assertFilterInteractionAlive(context: string, deadlineMs?: number): void {
    if (this.page.isClosed()) {
      throw new Error(
        `Task list filter ${context} was interrupted because the page or browser closed before the operation completed.`
      );
    }
    if (deadlineMs && Date.now() > deadlineMs) {
      throw new Error(`Task list filter ${context} did not complete within ${FILTER_GROUP_OPERATION_TIMEOUT_MS}ms.`);
    }
  }

  private async readFilterCheckboxState(checkbox: Locator, description: string, deadlineMs?: number): Promise<boolean> {
    this.assertFilterInteractionAlive(`checkbox "${description}" state read`, deadlineMs);
    return checkbox.isChecked().catch((error: Error) => {
      if (this.page.isClosed() || /Target page, context or browser has been closed/i.test(error.message)) {
        throw new Error(
          `Task list filter checkbox "${description}" state could not be read because the page or browser closed before the operation completed.`
        );
      }
      throw error;
    });
  }

  async openFilterPanel(deadlineMs?: number) {
    if (await this.applyFilterButton.isVisible().catch(() => false)) {
      return;
    }
    await this.waitForTaskListSpinnerToSettle(5_000);
    this.assertFilterInteractionAlive('opening filter panel', deadlineMs);
    await this.assertTaskListInteractive('opening filter panel');
    await this.waitForFilterControls('waiting for filter controls', deadlineMs);
    if (await this.applyFilterButton.isVisible().catch(() => false)) {
      return;
    }
    const panelDeadlineMs = deadlineMs ?? Date.now() + FILTER_PANEL_READY_TIMEOUT_MS;
    while (Date.now() < panelDeadlineMs) {
      this.assertFilterInteractionAlive('opening filter panel', deadlineMs);
      if (await this.applyFilterButton.isVisible().catch(() => false)) {
        return;
      }
      await this.taskListFilterToggle.click({ force: true });
      await this.filterPanel
        .waitFor({ state: 'visible', timeout: this.resolveInteractionTimeout(panelDeadlineMs, 1_000) })
        .catch(() => undefined);
      if (await this.applyFilterButton.isVisible().catch(() => false)) {
        return;
      }
      await this.page.waitForTimeout(250);
    }
    await this.assertTaskListInteractive('opening filter panel');
    throw new Error(
      `Task list filter panel did not become ready within ${
        deadlineMs ? FILTER_GROUP_OPERATION_TIMEOUT_MS : FILTER_PANEL_READY_TIMEOUT_MS
      }ms.`
    );
  }

  async applyCurrentFilters() {
    await this.openFilterPanel();
    await this.applyFilterButton.evaluate((button: HTMLButtonElement) => button.click());
  }

  async waitForAllWorkFilterControlsReady() {
    await this.openFilterPanel();
    await this.allWorkServiceFilter.waitFor({ state: 'visible', timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await this.allWorkLocationAllRadio.waitFor({ state: 'visible', timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await this.allWorkLocationSearchRadio.waitFor({ state: 'visible', timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await this.allWorkTaskCategoryAllRadio.waitFor({ state: 'visible', timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await this.allWorkTaskCategoryUnassignedRadio.waitFor({ state: 'visible', timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await this.allWorkTaskCategoryAssignedToPersonRadio.waitFor({
      state: 'visible',
      timeout: FILTER_CONTROL_READY_TIMEOUT_MS,
    });
    await this.allWorkTasksByRoleTypeFilter.waitFor({ state: 'visible', timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await this.allWorkPersonSearchInput.waitFor({ state: 'visible', timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
  }

  async setSelectAllServicesFilter(checked: boolean) {
    await this.setFilterCheckbox(this.selectAllServicesFilter, checked, 'select all services');
  }

  async setSelectAllTypesOfWorksFilter(checked: boolean) {
    await this.setFilterCheckbox(this.selectAllTypesOfWorksFilter, checked, 'select all types of work');
  }

  async clearServicesFilters() {
    await this.clearFilterGroup('services', this.selectAllServicesFilter, this.serviceFilterCheckboxes);
  }

  async clearTypesOfWorkFilters() {
    await this.clearFilterGroup('types of work', this.selectAllTypesOfWorksFilter, this.typesOfWorkFilterCheckboxes);
  }

  private async setFilterCheckbox(checkbox: Locator, checked: boolean, description: string, deadlineMs?: number) {
    await this.openFilterPanel(deadlineMs);
    const targetCheckbox = await this.waitForFilterCheckboxVisible(checkbox, description, deadlineMs);
    for (let attempt = 0; attempt < FILTER_INTERACTION_ATTEMPTS; attempt += 1) {
      const isChecked = await this.readFilterCheckboxState(targetCheckbox, description, deadlineMs);
      if (isChecked === checked) {
        return;
      }
      this.assertFilterInteractionAlive(`checkbox "${description}" update`, deadlineMs);
      await targetCheckbox.setChecked(checked, { force: true });
      await this.page.waitForTimeout(250);
      if ((await this.readFilterCheckboxState(targetCheckbox, description, deadlineMs)) === checked) {
        return;
      }
    }
    throw new Error(
      `Task list filter checkbox "${description}" did not become interactive for ${
        checked ? 'checked' : 'unchecked'
      } state after ${FILTER_INTERACTION_ATTEMPTS} attempts.`
    );
  }

  private async clearFilterGroup(groupName: string, selectAllCheckbox: Locator, childCheckboxes: Locator) {
    const deadlineMs = Date.now() + FILTER_GROUP_OPERATION_TIMEOUT_MS;
    await this.openFilterPanel(deadlineMs);
    this.assertFilterInteractionAlive(`${groupName} filter group clear`, deadlineMs);
    await this.setFilterCheckbox(selectAllCheckbox, false, `${groupName} select all`, deadlineMs);
    await this.forceChildCheckboxState(childCheckboxes, false, groupName, deadlineMs);
    if (await this.groupCheckboxesMatchState(childCheckboxes, false, groupName, deadlineMs)) {
      return;
    }
    const states = await this.getCheckboxStates(childCheckboxes, groupName, deadlineMs);
    throw new Error(
      `Failed to clear ${groupName} filter group within ${FILTER_GROUP_OPERATION_TIMEOUT_MS}ms: ${states.join(', ')}`
    );
  }

  private async forceChildCheckboxState(childCheckboxes: Locator, checked: boolean, groupName: string, deadlineMs?: number) {
    const checkboxCount = await childCheckboxes.count();
    for (let index = 0; index < checkboxCount; index += 1) {
      this.assertFilterInteractionAlive(`${groupName} child checkbox update`, deadlineMs);
      const checkbox = childCheckboxes.nth(index);
      if ((await this.readFilterCheckboxState(checkbox, `${groupName} option ${index + 1}`, deadlineMs)) !== checked) {
        await checkbox.setChecked(checked, { force: true });
      }
    }
    await this.page.waitForTimeout(250);
  }

  private async groupCheckboxesMatchState(childCheckboxes: Locator, checked: boolean, groupName: string, deadlineMs?: number) {
    const states = await this.getCheckboxStates(childCheckboxes, groupName, deadlineMs);
    return states.length > 0 && states.every((state) => state === checked);
  }

  private async getCheckboxStates(childCheckboxes: Locator, groupName: string, deadlineMs?: number) {
    const checkboxCount = await childCheckboxes.count();
    const states: boolean[] = [];
    for (let index = 0; index < checkboxCount; index += 1) {
      this.assertFilterInteractionAlive(`${groupName} checkbox state collection`, deadlineMs);
      states.push(await this.readFilterCheckboxState(childCheckboxes.nth(index), `${groupName} option ${index + 1}`, deadlineMs));
    }
    return states;
  }

  async confirmTaskCancellation() {
    await this.confirmCancelTaskButton.click();
  }

  async selectFirstReassignUserOption() {
    await this.reassignUserAutocompleteOverlay.waitFor({ state: 'visible' });
    await this.reassignUserAutocompleteFirstOption.click();
  }

  async waitForManageButton(
    context: string,
    options: {
      rowIndex?: number;
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    await this.waitForTaskRowReady(context, options);
  }

  private isTaskDataCall(url: string): boolean {
    return url.includes('/workallocation/task') && !url.includes('/types-of-work');
  }

  private getLatestTaskDataCallSummary(): string {
    const latestTaskCall = [...this.getApiCalls()].reverse().find((call) => this.isTaskDataCall(call.url));
    return latestTaskCall ? `${latestTaskCall.method} ${latestTaskCall.url} -> HTTP ${latestTaskCall.status}` : 'none captured';
  }

  async waitForTaskRowReady(
    context: string,
    options: {
      rowIndex?: number;
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    const rowIndex = options.rowIndex ?? 0;
    const timeoutMs = options.timeoutMs ?? 60_000;
    const pollMs = options.pollMs ?? 500;
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      await this.assertTaskListInteractive(`waiting for task row (${context})`);

      const taskApi5xx = this.getApiCalls().find((call) => this.isTaskDataCall(call.url) && call.status >= 500);
      if (taskApi5xx) {
        throw new Error(
          `Task list failed while waiting for task row (${context}): ${taskApi5xx.method} ${taskApi5xx.url} returned HTTP ${taskApi5xx.status}`
        );
      }

      const rowCount = await this.taskRows.count().catch(() => 0);
      if (rowCount > rowIndex) {
        const targetRow = this.getTaskRow(rowIndex);
        const rowVisible = await targetRow.isVisible().catch(() => false);
        const manageVisible = await this.getManageButtonForRow(rowIndex)
          .isVisible()
          .catch(() => false);

        if (rowVisible && manageVisible) {
          return;
        }
      }

      await this.page.waitForTimeout(pollMs);
    }

    const finalRowCount = await this.taskRows.count().catch(() => 0);
    throw new Error(
      `Timed out after ${timeoutMs}ms waiting for task row (${context}) on row ${rowIndex + 1}. rowCount=${finalRowCount}. Last /workallocation/task data call: ${this.getLatestTaskDataCallSummary()}`
    );
  }

  async waitForTaskActionsRowReady(
    rowIndex: number,
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    const timeoutMs = options.timeoutMs ?? 8_000;
    const pollMs = options.pollMs ?? 250;
    const deadline = Date.now() + timeoutMs;
    const taskActionsRow = this.getTaskActionsRow(rowIndex);

    while (Date.now() < deadline) {
      await this.assertTaskListInteractive(`waiting for task actions row (${context})`);

      const rowVisible = await taskActionsRow.isVisible().catch(() => false);
      const ariaHidden = await taskActionsRow.getAttribute('aria-hidden').catch(() => null);
      if (rowVisible && ariaHidden !== 'true') {
        return taskActionsRow;
      }

      await this.page.waitForTimeout(pollMs);
    }

    const finalAriaHidden = await taskActionsRow.getAttribute('aria-hidden').catch(() => 'unknown');
    throw new Error(
      `Timed out after ${timeoutMs}ms waiting for task actions row (${context}) on row ${rowIndex + 1}. aria-hidden=${finalAriaHidden}. url=${this.page.url()}`
    );
  }

  private async waitForManageButtonExpanded(
    rowIndex: number,
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    const timeoutMs = options.timeoutMs ?? 4_000;
    const pollMs = options.pollMs ?? 250;
    const deadline = Date.now() + timeoutMs;
    const manageButton = this.getManageButtonForRow(rowIndex);

    while (Date.now() < deadline) {
      await this.assertTaskListInteractive(`waiting for Manage button expansion (${context})`);

      const ariaExpanded = await manageButton.getAttribute('aria-expanded').catch(() => null);
      if (ariaExpanded === 'true') {
        return;
      }

      await this.page.waitForTimeout(pollMs);
    }

    const finalAriaExpanded = await manageButton.getAttribute('aria-expanded').catch(() => 'unknown');
    throw new Error(
      `Timed out after ${timeoutMs}ms waiting for Manage button expansion (${context}) on row ${rowIndex + 1}. aria-expanded=${finalAriaExpanded}. url=${this.page.url()}`
    );
  }

  async waitForTaskActionForRow(
    rowIndex: number,
    actionId: string,
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    const timeoutMs = options.timeoutMs ?? 8_000;
    const pollMs = options.pollMs ?? 250;
    const deadline = Date.now() + timeoutMs;
    const taskAction = this.getTaskActionForRow(rowIndex, actionId);
    let attempt = 0;

    while (Date.now() < deadline) {
      await this.assertTaskListInteractive(`waiting for task action (${context})`);

      if (await taskAction.isVisible().catch(() => false)) {
        return taskAction;
      }

      await this.openManageActions(rowIndex, `${context} reopen ${attempt + 1}`, {
        timeoutMs: Math.max(1_000, Math.min(4_000, deadline - Date.now())),
        pollMs,
      }).catch(() => undefined);

      if (await taskAction.isVisible().catch(() => false)) {
        return taskAction;
      }

      attempt += 1;

      await this.page.waitForTimeout(pollMs);
    }

    throw new Error(
      `Timed out after ${timeoutMs}ms waiting for action "${actionId}" (${context}) on row ${rowIndex + 1}. url=${this.page.url()}`
    );
  }

  private async clickManageButtonForRow(
    rowIndex: number,
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    const timeoutMs = options.timeoutMs ?? 3_000;
    const pollMs = options.pollMs ?? 250;
    const manageButton = this.getManageButtonForRow(rowIndex);
    await manageButton.scrollIntoViewIfNeeded().catch(() => undefined);

    const clickStrategies = [
      async () => manageButton.click({ timeout: timeoutMs }),
      async () => manageButton.click({ force: true, timeout: timeoutMs }),
      async () => {
        await manageButton.focus({ timeout: timeoutMs });
        await this.page.keyboard.press('Enter');
      },
      async () => manageButton.evaluate((element: HTMLButtonElement) => element.click()),
      async () => manageButton.dispatchEvent('click'),
    ];

    let lastError: Error | null = null;
    for (const clickStrategy of clickStrategies) {
      try {
        await clickStrategy();
        await this.waitForManageButtonExpanded(rowIndex, `${context} expanded`, {
          timeoutMs: Math.max(1_000, timeoutMs),
          pollMs,
        });
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
      }
    }

    throw new Error(
      `Failed to click Manage button (${context}) on row ${rowIndex + 1}: ${lastError?.message || 'unknown error'}`
    );
  }

  private async openManageActions(
    rowIndex: number,
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    const timeoutMs = options.timeoutMs ?? 15_000;
    const pollMs = options.pollMs ?? 500;
    const deadline = Date.now() + timeoutMs;
    let attempt = 0;

    while (Date.now() < deadline) {
      await this.waitForManageButton(`${context} row ${rowIndex + 1} attempt ${attempt + 1}`, {
        rowIndex,
        timeoutMs: Math.max(1_500, Math.min(8_000, deadline - Date.now())),
        pollMs,
      });

      await this.clickManageButtonForRow(rowIndex, `${context} open row ${rowIndex + 1}`, {
        timeoutMs: Math.max(1_000, Math.min(2_500, deadline - Date.now())),
        pollMs,
      });

      const expanded = await this.waitForTaskActionsRowReady(rowIndex, `${context} actions row`, {
        timeoutMs: Math.max(1_000, Math.min(4_000, deadline - Date.now())),
        pollMs,
      })
        .then(() => true)
        .catch(() => false);

      if (expanded) {
        return;
      }

      await this.assertTaskListInteractive(`opening Manage actions (${context}) for row ${rowIndex + 1}`);
      attempt += 1;
      await this.page.waitForTimeout(Math.min(pollMs, Math.max(0, deadline - Date.now())));
    }

    throw new Error(
      `Timed out after ${timeoutMs}ms opening Manage actions (${context}) for row ${rowIndex + 1}. url=${this.page.url()}`
    );
  }

  async openFirstManageActions(
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    await this.openManageActions(0, context, options);
  }

  private getTaskRow(rowIndex: number): Locator {
    return this.taskRows.nth(rowIndex);
  }

  private getManageButtonForRow(rowIndex: number): Locator {
    return this.getTaskRow(rowIndex).getByRole('button', { name: 'Manage' }).first();
  }

  getTaskActionsRow(rowIndex: number): Locator {
    return this.getTaskRow(rowIndex).locator('xpath=following-sibling::tr[contains(@class,"actions-row")][1]').first();
  }

  getTaskActionForRow(rowIndex: number, actionId: string): Locator {
    return this.getTaskActionsRow(rowIndex).locator(`#action_${actionId}`).first();
  }

  async openManageActionsForRow(
    rowIndex: number,
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    await this.openManageActions(rowIndex, context, options);
  }

  private async clickTaskActionWithRetry(
    actionResolver: () => Locator,
    reopenManageActions: (retryContext: string, retryOptions: { timeoutMs: number; pollMs: number }) => Promise<void>,
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    const timeoutMs = options.timeoutMs ?? 15_000;
    const pollMs = options.pollMs ?? 500;
    const deadline = Date.now() + timeoutMs;
    let attempt = 0;

    while (Date.now() < deadline) {
      await this.assertTaskListInteractive(`clicking task action (${context})`);
      const targetAction = actionResolver().first();

      const visible = await targetAction
        .waitFor({ state: 'visible', timeout: Math.max(1_000, Math.min(2_500, deadline - Date.now())) })
        .then(() => true)
        .catch(() => false);

      if (!visible) {
        await reopenManageActions(`${context} reopen ${attempt + 1}`, {
          timeoutMs: Math.max(1_000, Math.min(5_000, deadline - Date.now())),
          pollMs,
        });
        attempt += 1;
        continue;
      }

      await targetAction.scrollIntoViewIfNeeded().catch(() => undefined);

      const actionTimeoutMs = Math.max(1_000, Math.min(2_500, deadline - Date.now()));
      const clickStrategies = [
        async () => targetAction.click({ force: true, noWaitAfter: true, timeout: actionTimeoutMs }),
        async () => targetAction.click({ force: true, timeout: actionTimeoutMs }),
        async () => {
          await targetAction.focus({ timeout: actionTimeoutMs });
          await this.page.keyboard.press('Enter');
        },
      ];

      let lastTransientError: Error | null = null;
      for (const clickStrategy of clickStrategies) {
        try {
          await clickStrategy();
          return;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          const isTransientActionRefresh =
            /Timeout \d+ms exceeded/i.test(message) ||
            /element was detached from the DOM/i.test(message) ||
            /element is not visible/i.test(message) ||
            /element is not stable/i.test(message) ||
            /intercepts pointer events/i.test(message);

          if (!isTransientActionRefresh) {
            throw error;
          }

          lastTransientError = error instanceof Error ? error : new Error(message);
        }
      }

      if (lastTransientError) {
        await reopenManageActions(`${context} retry ${attempt + 1}`, {
          timeoutMs: Math.max(1_000, Math.min(5_000, deadline - Date.now())),
          pollMs,
        });
        attempt += 1;
        await this.page.waitForTimeout(Math.min(pollMs, Math.max(0, deadline - Date.now())));
      }
    }

    throw new Error(`Timed out after ${timeoutMs}ms clicking task action (${context}). url=${this.page.url()}`);
  }

  async clickTaskAction(
    action: Locator,
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    await TaskListPage.prototype.clickTaskActionWithRetry.call(
      this,
      () => action,
      (retryContext, retryOptions) => this.openFirstManageActions(retryContext, retryOptions),
      context,
      options
    );
  }

  async clickTaskActionForRow(
    rowIndex: number,
    actionId: string,
    context: string,
    options: {
      timeoutMs?: number;
      pollMs?: number;
    } = {}
  ) {
    await TaskListPage.prototype.clickTaskActionWithRetry.call(
      this,
      () => this.getTaskActionForRow(rowIndex, actionId),
      (retryContext, retryOptions) => this.openManageActionsForRow(rowIndex, retryContext, retryOptions),
      `${context} for row ${rowIndex + 1}`,
      options
    );
  }

  async submitActionAndWaitForRequest(
    requestMatcher: (request: Request) => boolean,
    context: string,
    options: {
      timeoutMs?: number;
    } = {}
  ): Promise<Request> {
    return this.clickButtonAndWaitForRequest(this.submitButton.first(), requestMatcher, context, options);
  }

  async clickButtonAndWaitForRequest(
    button: Locator,
    requestMatcher: (request: Request) => boolean,
    context: string,
    options: {
      timeoutMs?: number;
    } = {}
  ): Promise<Request> {
    const timeoutMs = options.timeoutMs ?? 15_000;
    const deadline = Date.now() + timeoutMs;
    const targetButton = button.first();

    await targetButton.waitFor({ state: 'visible', timeout: Math.max(1_000, Math.min(5_000, timeoutMs)) });
    await targetButton.scrollIntoViewIfNeeded({ timeout: Math.max(250, Math.min(1_500, timeoutMs)) }).catch(() => undefined);

    for (let attempt = 0; attempt < 5 && Date.now() < deadline; attempt += 1) {
      const remainingMs = Math.max(1_000, deadline - Date.now());
      const actionTimeoutMs = Math.max(250, Math.min(1_500, remainingMs));
      const requestPromise = this.page.waitForRequest(requestMatcher, {
        timeout: Math.min(5_000, remainingMs),
      });
      const pageErrorPromise = this.page.waitForEvent('pageerror', {
        timeout: Math.min(2_000, remainingMs),
      });

      try {
        if (attempt === 0) {
          await targetButton.click({ noWaitAfter: true, timeout: actionTimeoutMs });
        } else if (attempt === 1) {
          await targetButton.click({ noWaitAfter: true, force: true, timeout: actionTimeoutMs });
        } else if (attempt === 2) {
          await targetButton.dispatchEvent('click');
        } else if (attempt === 3) {
          await targetButton.evaluate((buttonElement: HTMLButtonElement) => buttonElement.click());
        } else {
          await targetButton.focus();
          await this.page.keyboard.press('Enter');
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const isTransientSubmitError =
          /element is not visible/i.test(message) ||
          /element is not stable/i.test(message) ||
          /element was detached from the DOM/i.test(message) ||
          /intercepts pointer events/i.test(message);
        if (!isTransientSubmitError || attempt === 4) {
          throw error;
        }
      }

      const pageError = await pageErrorPromise.catch(() => null);
      if (pageError) {
        throw new Error(`Page error while ${context}: ${pageError.message}`);
      }

      const observedRequest = await requestPromise.catch(() => null);
      if (observedRequest) {
        return observedRequest;
      }
    }

    const submitDiagnostics = await targetButton
      .evaluate((buttonElement: HTMLButtonElement) => ({
        disabled: buttonElement.disabled,
        text: buttonElement.textContent?.trim() || '',
        ariaDisabled: buttonElement.getAttribute('aria-disabled'),
      }))
      .catch(() => ({ disabled: 'unknown', text: 'unknown', ariaDisabled: 'unknown' }));

    throw new Error(
      `No submit request was observed while ${context}. url=${this.page.url()} submit=${JSON.stringify(submitDiagnostics)}`
    );
  }

  async clickTaskTabAndWaitForRequest(
    tabText: string,
    requestMatcher: (request: Request) => boolean,
    context: string,
    options: {
      timeoutMs?: number;
    } = {}
  ): Promise<Request> {
    return this.clickButtonAndWaitForRequest(
      this.taskTableTabs.filter({ hasText: tabText }).first(),
      requestMatcher,
      context,
      options
    );
  }

  async clickTaskTabAndWaitForView(
    tabText: string,
    view: 'MyTasks' | 'AvailableTasks' | 'AllWork',
    context: string,
    options: {
      timeoutMs?: number;
    } = {}
  ): Promise<Request> {
    return this.clickTaskTabAndWaitForRequest(
      tabText,
      (request) => {
        if (!request.url().includes('/workallocation/task') || request.method() !== 'POST') {
          return false;
        }

        try {
          const requestBody = request.postDataJSON() as {
            view?: string;
            searchRequest?: { request_context?: string };
          };
          return requestBody.view === view || requestBody.searchRequest?.request_context === view.toUpperCase();
        } catch {
          return false;
        }
      },
      context,
      options
    );
  }
}
