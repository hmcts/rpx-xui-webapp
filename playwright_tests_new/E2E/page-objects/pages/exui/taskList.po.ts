import { expect, Locator, Page, Request } from '@playwright/test';
import { Base } from '../../base';

const TASK_LIST_READY_TIMEOUT_MS = 30_000;
const TASK_LIST_BLANK_DOCUMENT_RECOVERY_MS = 3_000;
const FILTER_PANEL_READY_TIMEOUT_MS = 10_000;
const FILTER_CONTROL_READY_TIMEOUT_MS = 15_000;
const FILTER_GROUP_OPERATION_TIMEOUT_MS = 30_000;
const FILTER_CHECKBOX_STATE_TIMEOUT_MS = 5_000;
const FILTER_INTERACTION_ATTEMPTS = 2;
const FILTER_APPLY_CLICK_ATTEMPTS = 3;
const TASK_LIST_NAVIGATION_ATTEMPTS = 2;
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
  readonly applyFilterButton = this.filterPanel.locator('button#applyFilter').first();

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
  readonly allWorkRoleTypeFilter = this.filterPanel.locator('select').nth(1);
  readonly allWorkTaskTypeFilter = this.filterPanel
    .locator('#taskType select, select[name="taskType"], select[id*="taskType"]')
    .first();
  readonly allWorkTasksByRoleTypeFilter = this.allWorkTaskTypeFilter;
  readonly allWorkPersonSearchInput = this.filterPanel.getByRole('combobox', { name: /select a person/i }).first();
  readonly allWorkLocationSearchInput = this.filterPanel.locator('#locations exui-search-location input').first();
  readonly allWorkLocationSearchResults = this.page.getByRole('option');
  readonly selectedLocationTags = this.filterPanel.locator(
    '#locations xuilib-find-location .location-picker-custom .location-selection a'
  );
  readonly visibleSelectedLocationTags = this.filterPanel.locator(
    '#locations xuilib-find-location .location-picker-custom .location-selection a:visible'
  );

  readonly taskTableTabs = this.page.locator('.hmcts-sub-navigation .hmcts-sub-navigation__link');

  readonly taskListTable = this.page.locator('table.govuk-table').first();
  readonly taskRows = this.taskListTable.locator('tbody > tr:not(.actions-row)');
  readonly sortByCaseNameTableHeader = this.taskListTable.locator('#sort_by_caseName');
  readonly sortByCaseNameColumnHeader = this.taskListTable.locator('th:has(#sort_by_caseName)');
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
  readonly allWorkCasesApplyPrompt = this.page.getByText('Please select filters and click Apply', { exact: true });
  readonly allWorkCasesEmptyMessage = this.page.getByText('Change your selection to view cases.', { exact: true });
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

    await this.gotoTaskListPath('/work/my-work/list', /\/work\/my-work\/list(?:\?.*)?$/, `${context} navigation`, timeoutMs);
    await this.reloadBlankTaskListDocumentIfNeeded(/\/work\/my-work\/list(?:\?.*)?$/, `${context} navigation`, timeoutMs);
    await this.waitForTaskListSpinnerToSettle(10_000);
    await this.waitForTaskListShellReadyAfterNavigation(
      /\/work\/my-work\/list(?:\?.*)?$/,
      `${context} shell bootstrap`,
      timeoutMs
    );
    await this.waitForTaskRowReady(`${context} row bootstrap`, { rowIndex, timeoutMs });
  }

  async gotoMyCases() {
    await this.navigateToTaskListView('/work/my-work/my-cases', /\/work\/my-work\/my-cases(?:\?.*)?$/, 'my cases navigation');
  }

  async gotoMyCasesExpectingServiceDown() {
    await this.navigateToTerminalTaskListView(
      '/work/my-work/my-cases',
      /\/service-down$/,
      this.serviceDownHeading,
      'my cases service down navigation'
    );
  }

  async gotoMyCasesExpectingNotAuthorised() {
    await this.navigateToTerminalTaskListView(
      '/work/my-work/my-cases',
      /\/not-authorised$/,
      this.notAuthorisedHeading,
      'my cases not authorised navigation'
    );
  }

  async gotoMyAccess() {
    await this.navigateToTaskListView('/work/my-work/my-access', /\/work\/my-work\/my-access(?:\?.*)?$/, 'my access navigation');
  }

  async gotoMyAccessExpectingServiceDown() {
    await this.navigateToTerminalTaskListView(
      '/work/my-work/my-access',
      /\/service-down$/,
      this.serviceDownHeading,
      'my access service down navigation'
    );
  }

  async gotoMyAccessExpectingNotAuthorised() {
    await this.navigateToTerminalTaskListView(
      '/work/my-work/my-access',
      /\/not-authorised$/,
      this.notAuthorisedHeading,
      'my access not authorised navigation'
    );
  }

  async gotoAllWorkTasks() {
    await this.navigateToTaskListView('/work/all-work/tasks', /\/work\/all-work\/tasks(?:\?.*)?$/, 'all work tasks navigation');
  }

  async gotoAllWorkCases() {
    await this.navigateToTaskListView('/work/all-work/cases', /\/work\/all-work\/cases(?:\?.*)?$/, 'all work cases navigation');
  }

  async selectWorkMenuItem(menuItemText: string) {
    const menuItem = this.page.getByRole('link', { name: menuItemText, exact: true });
    await menuItem.click();
  }

  async getResultsText() {
    return await this.taskListResultsAmount.textContent();
  }

  async getPaginationSummaryText(): Promise<string> {
    for (const summaryLocator of [this.taskListResultsAmount, this.myCasesResultsAmount]) {
      const summaryText = await summaryLocator
        .first()
        .innerText({ timeout: 1_000 })
        .catch(() => '');
      if (summaryText.trim()) {
        return summaryText.replace(/\s+/g, ' ').trim();
      }
    }

    return '';
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

  private async navigateToTaskListView(path: string, urlPattern: RegExp, context: string, options: { timeoutMs?: number } = {}) {
    const timeoutMs = options.timeoutMs ?? TASK_LIST_READY_TIMEOUT_MS;
    await this.gotoTaskListPath(path, urlPattern, context, timeoutMs);
    await this.waitForTaskListSpinnerToSettle(10_000);
    await this.recoverBlankTaskListDocumentAfterNavigation(urlPattern, context, timeoutMs);
    await this.waitForTaskListShellReadyAfterNavigation(urlPattern, context, timeoutMs);
  }

  private async navigateToTerminalTaskListView(
    path: string,
    urlPattern: RegExp,
    terminalHeading: Locator,
    context: string,
    timeoutMs = TASK_LIST_READY_TIMEOUT_MS
  ) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.page.waitForURL(urlPattern, { timeout: timeoutMs });
    await terminalHeading.waitFor({ state: 'visible', timeout: Math.min(10_000, timeoutMs) });
  }

  private async gotoTaskListPath(path: string, urlPattern: RegExp, context: string, timeoutMs: number): Promise<void> {
    const navigationAttemptTimeoutMs = Math.min(timeoutMs, 15_000);

    for (let attempt = 1; attempt <= TASK_LIST_NAVIGATION_ATTEMPTS; attempt += 1) {
      try {
        await this.page.goto(path, { waitUntil: 'commit', timeout: navigationAttemptTimeoutMs });
        break;
      } catch (error) {
        const navigationError = error as Error;
        if (!this.isTransientTaskListNavigationError(navigationError, urlPattern) || attempt === TASK_LIST_NAVIGATION_ATTEMPTS) {
          throw navigationError;
        }
        await this.page.waitForTimeout(500);
      }
    }

    await this.page.waitForURL(urlPattern, { timeout: timeoutMs }).catch(() => undefined);
    if (!urlPattern.test(this.page.url())) {
      throw new Error(`Task list navigation for ${context} landed on ${this.page.url()} instead of ${urlPattern}.`);
    }
  }

  private isTransientTaskListNavigationError(error: Error, urlPattern: RegExp): boolean {
    return (
      /net::ERR_NETWORK_CHANGED|net::ERR_CONNECTION_TIMED_OUT|Timeout \d+ms exceeded|chrome-error:\/\/chromewebdata/i.test(
        error.message
      ) &&
      (this.page.url() === 'about:blank' || this.page.url().startsWith('chrome-error://') || urlPattern.test(this.page.url()))
    );
  }

  private async waitForTaskListShellReadyAfterNavigation(urlPattern: RegExp, context: string, timeoutMs: number): Promise<void> {
    try {
      await this.waitForTaskListShellReady(context);
      return;
    } catch (error) {
      if (!(await this.isBlankTaskListDocument(urlPattern))) {
        throw error;
      }

      await this.reloadBlankTaskListDocumentIfNeeded(urlPattern, context, timeoutMs);
      await this.waitForTaskListSpinnerToSettle(10_000);
      await this.waitForTaskListShellReady(`${context} after blank-page reload`);
    }
  }

  private async recoverBlankTaskListDocumentAfterNavigation(
    urlPattern: RegExp,
    context: string,
    timeoutMs: number
  ): Promise<void> {
    await this.page
      .waitForLoadState('domcontentloaded', { timeout: TASK_LIST_BLANK_DOCUMENT_RECOVERY_MS })
      .catch(() => undefined);
    await this.page.waitForTimeout(250);
    await this.reloadBlankTaskListDocumentIfNeeded(urlPattern, `${context} early blank-page recovery`, timeoutMs);
  }

  private async reloadBlankTaskListDocumentIfNeeded(urlPattern: RegExp, context: string, timeoutMs: number): Promise<void> {
    if (!(await this.isBlankTaskListDocument(urlPattern))) {
      return;
    }

    this.logger.warn('TASK_LIST_BLANK_DOCUMENT_RELOAD', {
      context,
      url: this.page.url(),
    });
    await this.page.reload({ waitUntil: 'commit', timeout: 5_000 }).catch((error) => {
      this.logger.warn('TASK_LIST_BLANK_DOCUMENT_RELOAD_TIMEOUT', {
        context,
        url: this.page.url(),
        error: String(error),
      });
    });
    await this.page.waitForURL(urlPattern, { timeout: Math.min(timeoutMs, 5_000) }).catch(() => undefined);
    if (!urlPattern.test(this.page.url())) {
      throw new Error(`Task list navigation for ${context} landed on ${this.page.url()} after blank-page reload.`);
    }
  }

  private async isBlankTaskListDocument(urlPattern: RegExp): Promise<boolean> {
    if (!urlPattern.test(this.page.url())) {
      return false;
    }

    const bodyText = await this.page
      .locator('body')
      .innerText({ timeout: 500 })
      .catch(() => '');
    return bodyText.trim().length === 0;
  }

  private async assertTaskListHealthy(context: string, options: { allowServiceDown?: boolean } = {}): Promise<void> {
    if (await this.errorPageHeading.isVisible().catch(() => false)) {
      throw new Error(`Something went wrong page was displayed while ${context}.`);
    }

    const onServiceDownPage = await this.isServiceDownPage();
    if (onServiceDownPage && !options.allowServiceDown) {
      throw new Error(`Task list showed service down while ${context}.`);
    }
  }

  private async isServiceDownPage(): Promise<boolean> {
    return this.page.url().includes('/service-down') || (await this.serviceDownError.isVisible().catch(() => false));
  }

  async waitForTaskListShellReady(context: string) {
    await this.page
      .waitForURL(/\/(?:work\/(?:my-work\/(?:list|available|my-cases|my-access)|all-work\/(?:tasks|cases)))/, {
        timeout: TASK_LIST_READY_TIMEOUT_MS,
      })
      .catch(() => undefined);
    await this.waitForTaskListSpinnerToSettle(10_000);
    const bootstrapSignal = await this.waitForVisibleSignal(
      [
        ['heading', this.myWorkHeading],
        ['tabs', this.taskTableTabs.first()],
        ['filter-toggle', this.taskListFilterToggle],
        ['table', this.taskListTable],
        ['table-header', this.taskTableHeader],
        ['table-footer', this.taskTableFooter],
        ['results-summary', this.taskListResultsAmount],
        ['error-page', this.errorPageHeading],
      ],
      `task list shell (${context})`,
      TASK_LIST_READY_TIMEOUT_MS
    );

    if (bootstrapSignal === 'error-page') {
      await this.assertTaskListHealthy(`waiting for task list shell (${context})`);
    }

    await this.waitForTaskListSpinnerToSettle(5_000);
    await this.assertTaskListHealthy(`waiting for task list shell (${context})`);
  }

  private async assertTaskListInteractive(context: string): Promise<void> {
    await this.assertTaskListHealthy(context);
  }

  private async waitForVisibleSignal(
    signals: Array<[string, Locator]>,
    context: string,
    timeoutMs: number,
    pollMs = 250
  ): Promise<string> {
    const deadlineMs = Date.now() + timeoutMs;

    while (Date.now() < deadlineMs) {
      for (const [signal, locator] of signals) {
        if (await locator.isVisible().catch(() => false)) {
          return signal;
        }
      }
      await this.page.waitForTimeout(Math.min(pollMs, Math.max(0, deadlineMs - Date.now())));
    }

    const headingText = await this.page
      .locator('main h1, main h2, main h3')
      .first()
      .textContent()
      .catch(() => '');
    throw new Error(
      `No visible ${context} signal appeared within ${timeoutMs}ms. url=${this.page.url()} heading=${
        headingText?.trim() || 'unknown'
      }`
    );
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
    await this.waitForVisibleSignal(
      [
        ['apply-filter-button', this.applyFilterButton],
        ['filter-toggle', this.taskListFilterToggle],
      ],
      `filter controls (${context})`,
      timeoutMs
    ).catch(async () => {
      await this.assertTaskListInteractive(context);
      throw new Error(`Task list filter controls did not become visible within ${timeoutMs}ms.`);
    });
  }

  private async isFilterPanelOpen(): Promise<boolean> {
    return (
      (await this.filterPanel.isVisible().catch(() => false)) && (await this.applyFilterButton.isVisible().catch(() => false))
    );
  }

  private async waitForFilterCheckboxVisible(checkbox: Locator, description: string, deadlineMs?: number): Promise<Locator> {
    const targetCheckbox = checkbox.first();
    const timeoutMs = this.resolveInteractionTimeout(deadlineMs, FILTER_CONTROL_READY_TIMEOUT_MS);
    const targetDeadlineMs = Date.now() + timeoutMs;

    while (Date.now() < targetDeadlineMs) {
      this.assertFilterInteractionAlive(`waiting for checkbox "${description}"`, deadlineMs);
      if (await targetCheckbox.isVisible().catch(() => false)) {
        await expect(targetCheckbox).toBeEnabled({
          timeout: this.resolveInteractionTimeout(deadlineMs, FILTER_CHECKBOX_STATE_TIMEOUT_MS),
        });
        return targetCheckbox;
      }
      await this.assertTaskListInteractive(`waiting for ${description}`);
      await this.page.waitForTimeout(250);
    }

    await this.assertTaskListInteractive(`waiting for ${description}`);
    throw new Error(`Task list filter checkbox "${description}" did not become visible within ${timeoutMs}ms.`);
  }

  private async waitForFirstFilterOptionVisible(
    childCheckboxes: Locator,
    groupName: string,
    deadlineMs?: number
  ): Promise<Locator> {
    const timeoutMs = this.resolveInteractionTimeout(deadlineMs, FILTER_CONTROL_READY_TIMEOUT_MS);
    const targetDeadlineMs = Date.now() + timeoutMs;

    while (Date.now() < targetDeadlineMs) {
      this.assertFilterInteractionAlive(`waiting for ${groupName} filter options`, deadlineMs);
      const checkboxCount = await childCheckboxes.count().catch(() => 0);
      for (let index = 0; index < checkboxCount; index += 1) {
        const checkbox = childCheckboxes.nth(index);
        if (await checkbox.isVisible().catch(() => false)) {
          return this.waitForFilterCheckboxVisible(checkbox, `${groupName} option ${index + 1}`, deadlineMs);
        }
      }

      await this.assertTaskListInteractive(`waiting for ${groupName} filter options`);
      await this.page.waitForTimeout(250);
    }

    await this.assertTaskListInteractive(`waiting for ${groupName} filter options`);
    throw new Error(`Task list ${groupName} filter options did not become visible within ${timeoutMs}ms.`);
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
    const targetCheckbox = await this.waitForFilterCheckboxVisible(checkbox, description, deadlineMs);
    return targetCheckbox
      .isChecked({ timeout: this.resolveInteractionTimeout(deadlineMs, FILTER_CHECKBOX_STATE_TIMEOUT_MS) })
      .catch((error: Error) => {
        if (this.page.isClosed() || /Target page, context or browser has been closed/i.test(error.message)) {
          throw new Error(
            `Task list filter checkbox "${description}" state could not be read because the page or browser closed before the operation completed.`
          );
        }
        throw error;
      });
  }

  async openFilterPanel(deadlineMs?: number) {
    if (await this.isFilterPanelOpen()) {
      return;
    }
    await this.waitForTaskListSpinnerToSettle(5_000);
    this.assertFilterInteractionAlive('opening filter panel', deadlineMs);
    await this.assertTaskListInteractive('opening filter panel');
    await this.waitForFilterControls('waiting for filter controls', deadlineMs);
    if (await this.isFilterPanelOpen()) {
      return;
    }
    if (await this.filterPanel.isVisible().catch(() => false)) {
      await this.applyFilterButton.waitFor({
        state: 'visible',
        timeout: this.resolveInteractionTimeout(deadlineMs, FILTER_CONTROL_READY_TIMEOUT_MS),
      });
      return;
    }
    const panelDeadlineMs = deadlineMs ?? Date.now() + FILTER_PANEL_READY_TIMEOUT_MS;
    while (Date.now() < panelDeadlineMs) {
      this.assertFilterInteractionAlive('opening filter panel', deadlineMs);
      if (await this.isFilterPanelOpen()) {
        return;
      }
      if (await this.filterPanel.isVisible().catch(() => false)) {
        await this.applyFilterButton.waitFor({
          state: 'visible',
          timeout: this.resolveInteractionTimeout(panelDeadlineMs, FILTER_CONTROL_READY_TIMEOUT_MS),
        });
        return;
      }
      await this.taskListFilterToggle.click();
      await this.filterPanel
        .waitFor({ state: 'visible', timeout: this.resolveInteractionTimeout(panelDeadlineMs, 1_000) })
        .catch(() => undefined);
      if (await this.isFilterPanelOpen()) {
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
    const deadlineMs = Date.now() + FILTER_GROUP_OPERATION_TIMEOUT_MS;
    await this.openFilterPanel(deadlineMs);
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= FILTER_APPLY_CLICK_ATTEMPTS; attempt += 1) {
      await this.applyFilterButton.waitFor({
        state: 'visible',
        timeout: this.resolveInteractionTimeout(deadlineMs, FILTER_GROUP_OPERATION_TIMEOUT_MS),
      });
      await expect(this.applyFilterButton).toBeEnabled({ timeout: this.resolveInteractionTimeout(deadlineMs, 5_000) });

      try {
        await this.applyFilterButton.click({ timeout: this.resolveInteractionTimeout(deadlineMs, 5_000) });
        return;
      } catch (error) {
        lastError = error as Error;
        if (await this.filterPanel.isHidden().catch(() => false)) {
          return;
        }
        if (!this.isTransientFilterApplyClickError(lastError) || attempt === FILTER_APPLY_CLICK_ATTEMPTS) {
          throw lastError;
        }
        await this.page.waitForTimeout(250);
      }
    }

    throw lastError ?? new Error('Task list filter Apply click did not complete.');
  }

  private isTransientFilterApplyClickError(error: Error): boolean {
    return /element is not stable|element was detached|not attached to the DOM/i.test(error.message);
  }

  async applyAllWorkCasesPersonFilter(searchText: string, optionText: string) {
    await this.openFilterPanel();
    await this.allWorkRoleTypeFilter.selectOption({ label: 'Legal Ops' });
    await this.allWorkPersonSearchInput.waitFor({ state: 'visible', timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await expect(this.allWorkPersonSearchInput).toBeEditable({ timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await this.allWorkPersonSearchInput.fill(searchText);
    await this.page.getByRole('option', { name: optionText }).first().click();
    await expect(this.applyFilterButton).toBeEnabled({ timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await this.applyCurrentFilters();
  }

  async openPaginationPage(pageNumber: number) {
    const pageText = pageNumber.toString();
    const labelledPageControl = this.page.getByLabel(`Page ${pageText}`, { exact: true }).first();
    if (await labelledPageControl.isVisible().catch(() => false)) {
      await labelledPageControl.click();
      await this.waitForTaskListSpinnerToSettle(10_000);
      return;
    }

    const legacyPageControl = this.paginationControls.locator('a, button').filter({
      hasText: new RegExp(String.raw`^\s*${pageText}\s*$`),
    });
    await legacyPageControl.first().click();
    await this.waitForTaskListSpinnerToSettle(10_000);
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

  async expectWorkFilterControls(options: { typesOfWorkVisible?: boolean } = {}) {
    const typesOfWorkVisible = options.typesOfWorkVisible ?? true;
    const deadlineMs = Date.now() + FILTER_CONTROL_READY_TIMEOUT_MS;
    const servicesHeading = this.filterPanel.getByText('Services', { exact: true }).first();
    const locationsFilter = this.filterPanel.locator('#locations:visible').first();
    const typesOfWorkHeading = this.filterPanel.getByText('Types of work', { exact: true }).first();
    const visibleTypesOfWorkFilter = this.filterPanel.locator('#types-of-work:visible');

    while (Date.now() < deadlineMs) {
      await this.openFilterPanel(deadlineMs);

      const servicesVisible = await servicesHeading.isVisible().catch(() => false);
      const locationsVisible = await locationsFilter.isVisible().catch(() => false);
      const typeOfWorkStateMatches = typesOfWorkVisible
        ? await typesOfWorkHeading.isVisible().catch(() => false)
        : (await visibleTypesOfWorkFilter.count().catch(() => 0)) === 0;

      if (servicesVisible && locationsVisible && typeOfWorkStateMatches) {
        return;
      }

      await this.page.waitForTimeout(250);
    }

    await this.assertTaskListInteractive('waiting for work filter controls');
    await expect(servicesHeading).toBeVisible();
    await expect(locationsFilter).toBeVisible();

    if (typesOfWorkVisible) {
      await expect(typesOfWorkHeading).toBeVisible();
    } else {
      await expect(visibleTypesOfWorkFilter).toHaveCount(0);
    }
  }

  async expectAvailableTaskFilterControls() {
    await this.openFilterPanel();
    await this.waitForFilterCheckboxVisible(this.selectAllServicesFilter, 'select all services');
    await this.waitForFilterCheckboxVisible(this.selectAllTypesOfWorksFilter, 'select all types of work');
  }

  async expectAccessTasksAndCasesTextVisible() {
    await expect(this.page.getByText('Access tasks and cases.', { exact: true })).toBeVisible();
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

  async selectOnlyFirstServiceFilter(): Promise<string> {
    return this.selectOnlyFirstFilterOption('services', this.selectAllServicesFilter, this.serviceFilterCheckboxes);
  }

  async selectOnlyFirstTypeOfWorkFilter(): Promise<string> {
    return this.selectOnlyFirstFilterOption('types of work', this.selectAllTypesOfWorksFilter, this.typesOfWorkFilterCheckboxes);
  }

  async removeAllSelectedLocations() {
    await this.openFilterPanel();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const visibleSelectionCount = await this.visibleSelectedLocationTags.count();
      if (visibleSelectionCount === 0) {
        return;
      }

      await this.visibleSelectedLocationTags.first().click();
      await expect
        .poll(async () => this.visibleSelectedLocationTags.count(), { timeout: FILTER_CONTROL_READY_TIMEOUT_MS })
        .toBeLessThan(visibleSelectionCount);
    }

    await expect(this.visibleSelectedLocationTags).toHaveCount(0, {
      timeout: FILTER_CONTROL_READY_TIMEOUT_MS,
    });
  }

  async expectSelectedLocations(expectedLocations: string[]) {
    await this.openFilterPanel();
    await expect
      .poll(async () => this.getVisibleSelectedLocationTexts(), { timeout: FILTER_CONTROL_READY_TIMEOUT_MS })
      .toEqual(expectedLocations);
  }

  async expectSelectedFilterTagVisible(tagText: string) {
    await this.expectSelectedFilterTagsVisible([tagText]);
  }

  async expectSelectedFilterTagsVisible(tagTexts: string[]) {
    await this.openFilterPanel();
    await expect
      .poll(async () => {
        const visibleTagTexts = await this.filterPanel.locator('.hmcts-filter__tag').evaluateAll((tags) =>
          tags
            .filter((tag) => {
              const style = window.getComputedStyle(tag);
              const box = tag.getBoundingClientRect();
              return style.visibility !== 'hidden' && style.display !== 'none' && box.width > 0 && box.height > 0;
            })
            .map((tag) => tag.textContent?.replace(/\s+/g, ' ').trim() ?? '')
        );

        return tagTexts.every((tagText) => visibleTagTexts.some((visibleText) => visibleText.includes(tagText)));
      })
      .toBe(true);
  }

  async searchForLocation(searchText: string) {
    await this.openFilterPanel();
    await this.allWorkLocationSearchInput.waitFor({ state: 'visible', timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await expect(this.allWorkLocationSearchInput).toBeEditable({ timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
    await this.allWorkLocationSearchInput.fill(searchText);
    await expect(this.allWorkLocationSearchInput).toHaveValue(searchText, { timeout: FILTER_CONTROL_READY_TIMEOUT_MS });
  }

  private async getVisibleSelectedLocationTexts(): Promise<string[]> {
    const locationTexts = await this.selectedLocationTags.evaluateAll((tags) =>
      tags
        .filter((tag) => {
          const style = window.getComputedStyle(tag);
          const box = tag.getBoundingClientRect();
          return style.visibility !== 'hidden' && style.display !== 'none' && box.width > 0 && box.height > 0;
        })
        .map((tag) => tag.textContent?.replace(/\s+/g, ' ').trim() ?? '')
        .filter(Boolean)
    );

    return [...new Set(locationTexts)];
  }

  private async setFilterCheckbox(checkbox: Locator, checked: boolean, description: string, deadlineMs?: number) {
    await this.openFilterPanel(deadlineMs);
    for (let attempt = 0; attempt < FILTER_INTERACTION_ATTEMPTS; attempt += 1) {
      const targetCheckbox = await this.waitForFilterCheckboxVisible(checkbox, description, deadlineMs);
      const isChecked = await this.readFilterCheckboxState(targetCheckbox, description, deadlineMs);
      if (isChecked === checked) {
        return;
      }
      this.assertFilterInteractionAlive(`checkbox "${description}" update`, deadlineMs);
      await targetCheckbox.setChecked(checked);
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
    if ((await childCheckboxes.count()) === 0) {
      return;
    }
    await this.forceChildCheckboxState(childCheckboxes, false, groupName, deadlineMs);
    if (await this.groupCheckboxesMatchState(childCheckboxes, false, groupName, deadlineMs)) {
      return;
    }
    const states = await this.getCheckboxStates(childCheckboxes, groupName, deadlineMs);
    throw new Error(
      `Failed to clear ${groupName} filter group within ${FILTER_GROUP_OPERATION_TIMEOUT_MS}ms: ${states.join(', ')}`
    );
  }

  private async selectOnlyFirstFilterOption(
    groupName: string,
    selectAllCheckbox: Locator,
    childCheckboxes: Locator
  ): Promise<string> {
    const deadlineMs = Date.now() + FILTER_GROUP_OPERATION_TIMEOUT_MS;
    await this.openFilterPanel(deadlineMs);
    const firstCheckbox = await this.waitForFirstFilterOptionVisible(childCheckboxes, groupName, deadlineMs);
    const firstValue = await firstCheckbox.getAttribute('value');
    if (!firstValue) {
      throw new Error(`Task list ${groupName} first filter option did not expose a value.`);
    }
    await this.setFilterCheckbox(selectAllCheckbox, false, `${groupName} select all`, deadlineMs);
    const checkboxCount = await childCheckboxes.count();
    for (let index = 0; index < checkboxCount; index += 1) {
      const checkbox = childCheckboxes.nth(index);
      const shouldBeChecked = (await checkbox.getAttribute('value')) === firstValue;
      await this.setFilterCheckbox(checkbox, shouldBeChecked, `${groupName} option ${index + 1}`, deadlineMs);
    }
    const selectedStateMatches = await childCheckboxes.evaluateAll(
      (checkboxElements, selectedValue) =>
        checkboxElements.some((checkboxElement) => {
          const checkbox = checkboxElement as HTMLInputElement;
          return checkbox.value === selectedValue && checkbox.checked;
        }),
      firstValue
    );
    if (!selectedStateMatches) {
      throw new Error(`Task list ${groupName} first filter option was not selected.`);
    }
    return firstValue;
  }

  private async forceChildCheckboxState(childCheckboxes: Locator, checked: boolean, groupName: string, deadlineMs?: number) {
    this.assertFilterInteractionAlive(`${groupName} child checkbox update`, deadlineMs);
    await this.waitForFilterCheckboxVisible(childCheckboxes.first(), `${groupName} option 1`, deadlineMs);
    const checkboxCount = await childCheckboxes.count();
    for (let index = 0; index < checkboxCount; index += 1) {
      await this.setFilterCheckbox(childCheckboxes.nth(index), checked, `${groupName} option ${index + 1}`, deadlineMs);
    }
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

  private getLatestTaskDataCallSummary(baselineIndex = 0): string {
    const latestTaskCall = [...this.getApiCalls()]
      .slice(baselineIndex)
      .reverse()
      .find((call) => this.isTaskDataCall(call.url));
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
    const apiCallsBaseline = this.getApiCalls().length;

    while (Date.now() < deadline) {
      await this.assertTaskListInteractive(`waiting for task row (${context})`);

      const taskApi5xx = this.getApiCalls()
        .slice(apiCallsBaseline)
        .find((call) => this.isTaskDataCall(call.url) && call.status >= 500);
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
      `Timed out after ${timeoutMs}ms waiting for task row (${context}) on row ${rowIndex + 1}. rowCount=${finalRowCount}. Last /workallocation/task data call: ${this.getLatestTaskDataCallSummary(apiCallsBaseline)}`
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
      async () => {
        await manageButton.focus({ timeout: timeoutMs });
        await this.page.keyboard.press('Enter');
      },
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
    return this.taskListTable.locator('tbody > tr.actions-row').nth(rowIndex);
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
        async () => targetAction.click({ noWaitAfter: true, timeout: actionTimeoutMs }),
        async () => targetAction.click({ timeout: actionTimeoutMs }),
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

    for (let attempt = 0; attempt < 2 && Date.now() < deadline; attempt += 1) {
      const remainingMs = Math.max(1_000, deadline - Date.now());
      const actionTimeoutMs = Math.max(250, Math.min(1_500, remainingMs));
      const requestPromise = this.page.waitForRequest(requestMatcher, {
        timeout: Math.min(5_000, remainingMs),
      });
      const pageErrorPromise = this.page.waitForEvent('pageerror', {
        timeout: Math.min(2_000, remainingMs),
      });

      try {
        await targetButton.click({ noWaitAfter: true, timeout: actionTimeoutMs });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const isTransientSubmitError =
          /element is not visible/i.test(message) ||
          /element is not stable/i.test(message) ||
          /element was detached from the DOM/i.test(message) ||
          /intercepts pointer events/i.test(message);
        if (!isTransientSubmitError || attempt === 1) {
          throw error;
        }
      }

      const [observedRequest, pageError] = await Promise.all([
        requestPromise.catch(() => null),
        pageErrorPromise.catch(() => null),
      ]);
      if (observedRequest) {
        return observedRequest;
      }
      if (pageError) {
        throw new Error(`Page error while ${context}: ${pageError.message}`);
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
