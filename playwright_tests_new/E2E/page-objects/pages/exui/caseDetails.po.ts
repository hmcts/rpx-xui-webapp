/* eslint-disable unicorn/prefer-string-replace-all */
// Note: Using replace() with global regex instead of replaceAll() for ES2020 compatibility
import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';
import { ValidatorUtils } from '../../../utils/validator.utils';
import { TableUtils } from '@hmcts/playwright-common';
import { TIMEOUTS } from '../../../test/documentUpload/constants';

const validatorUtils = new ValidatorUtils();
const tableUtils = new TableUtils();

export interface CaseFlagItem {
  flagType: string;
  comments: string;
  creationDate: string;
  lastModified: string;
  status: string;
}

export class CaseDetailsPage extends Base {
  readonly container = this.page.locator('exui-case-details-home');

  readonly caseDetailsTabs = this.page.locator('div[role="tab"]');

  readonly caseActionsDropdown = this.page.locator('#next-step');

  readonly caseActionGoButton = this.page.locator('.event-trigger button');

  readonly submitCaseFlagButton = this.page.locator('.button[type="submit"]');
  readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
  readonly eventTable = this.page.locator('EventLogTable');
  readonly firstNameCell = this.page.locator('tr:has-text("First Name") + td');
  readonly lastNameCell = this.page.locator('tr:has-text("Last Name") + td');
  readonly updateCase = this.page.getByText('Update case', { exact: true });
  readonly historyTable = this.page.locator('table.EventLogTable');
  readonly historyDetailsTable = this.page.locator('table.EventLogDetails');

  // Case flags
  readonly caseFlagCommentBox = this.page.locator('#flagComments');

  readonly caseFlagApplicantFlagTable = this.page.locator('table.govuk-table.ng-star-inserted');

  readonly commonRadioButtons = this.page.locator('.govuk-radios__item');

  readonly caseAlertSuccessMessage = this.page
    .locator('.hmcts-banner--success .alert-message, .exui-alert .alert-message')
    .first();

  readonly caseNotificationBannerTitle = this.page.locator('#govuk-notification-banner-title');

  readonly caseNotificationBannerBody = this.page.locator('.govuk-notification-banner__heading');

  readonly eventCreationErrorHeading = this.page.getByRole('heading', { name: 'The event could not be created' });

  // Table locators
  readonly caseTab1Table = this.page.locator('table.tab1');
  readonly caseDocumentsTable = this.page.locator('table.complex-panel-table');
  readonly someMoreDataTable = this.page.locator('table.SomeMoreData');

  // Task List tab
  readonly taskListContainer = this.page.locator('exui-tasks-container');
  readonly taskItem = this.taskListContainer.locator('exui-case-task');
  readonly taskKeyPairRow = this.taskItem.locator('.govuk-summary-list__row');
  readonly taskTitle = this.taskItem.locator('p.govuk-body');

  constructor(page: Page) {
    super(page);
  }

  // Internal helper: obtain rows either from a selector string or a Locator
  private async _runOnRows<T>(selector: string | Locator, fn: (rows: Element[]) => T): Promise<T> {
    if (typeof selector !== 'string') {
      // Locator: evaluate on the located rows
      return selector.locator('tr').evaluateAll(fn);
    }
    // Validate selector to prevent injection - only allow safe characters
    if (!/^[a-zA-Z0-9._#[\]="'\s:>+~-]+$/.test(selector)) {
      throw new Error('Invalid CSS selector: contains potentially unsafe characters');
    }
    // Selector string: use page.$$eval to run fn in page context
    return this.page.$$eval(`${selector} tr`, fn);
  }

  async getTableByName(tableName: string) {
    return this.page.getByRole('table', { name: tableName, exact: true });
  }

  /**
   * Parse CCD key-value table (case details tabs)
   * @param selector - CSS selector string or Playwright Locator
   * @returns Object with key-value pairs from the table
   */
  async parseKeyValueTable(selector: string | Locator): Promise<Record<string, string>> {
    return tableUtils.parseKeyValueTable(selector, this.page);
  }

  /**
   * Parse data table with headers (collections, documents, flags)
   * @param selector - CSS selector string or Playwright Locator
   * @returns Array of row objects
   */
  async parseDataTable(selector: string | Locator): Promise<Array<Record<string, string>>> {
    return tableUtils.parseDataTable(selector, this.page);
  }

  /**
   * Get case details tab data as key-value pairs
   * @param tabClass - CSS class name for the tab table (e.g., 'tab1')
   */
  async getCaseDetailsTabData(tabClass: string): Promise<Record<string, string>> {
    const tableLocator = this.page.locator('.case-viewer-container').locator(`table.${tabClass}`);
    try {
      await tableLocator.waitFor({ state: 'visible', timeout: TIMEOUTS.TABLE_VISIBLE });
      return this.parseKeyValueTable(tableLocator);
    } catch (error) {
      // Primary table not found, fall back to generic tabpanel table
      this.logger.error(`Table with class '${tabClass}' not found, using fallback selector`, error);
      const fallbackTable = this.page
        .locator('[role="tabpanel"]')
        .filter({ has: this.page.locator('table') })
        .first()
        .locator('table')
        .first();
      await fallbackTable.waitFor({ state: 'visible', timeout: TIMEOUTS.TABLE_VISIBLE });
      return this.parseKeyValueTable(fallbackTable);
    }
  }

  /**
   * Get documents list from documents table
   */
  async getDocumentsList(): Promise<Array<Record<string, string>>> {
    const tables = await this.page.locator('table').elementHandles();
    let targetIndex = -1;

    for (let i = 0; i < tables.length; i++) {
      const hasHeaders = await tables[i].evaluate((table: Element) => {
        const thead = table.querySelector(':scope > thead');
        if (!thead) {
          return false;
        }
        const headerCells = new Set(Array.from(thead.querySelectorAll('th, td')).map((el) => (el.textContent || '').trim()));
        return headerCells.has('Number') && headerCells.has('Document Category') && headerCells.has('Type of Document');
      });
      if (hasHeaders) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex >= 0) {
      const documentsTable = this.page.locator('table').nth(targetIndex);
      await documentsTable.waitFor({ state: 'visible', timeout: TIMEOUTS.TABLE_VISIBLE });
      return this.parseDataTable(documentsTable);
    }

    const fallbackTable = this.caseDocumentsTable.first();
    await fallbackTable.waitFor({ state: 'visible', timeout: TIMEOUTS.TABLE_VISIBLE });
    return this.parseDataTable(fallbackTable);
  }

  async trRowsToObjectInPage(selector: string | Locator): Promise<Record<string, string>> {
    if (!selector) {
      return {};
    }

    const fn = (rows: Element[]) => {
      function findFirstText(node: Node | null): string {
        if (!node) {
          return '';
        }
        for (const child of Array.from(node.childNodes)) {
          if (child.nodeType === Node.TEXT_NODE) {
            const t = (child.textContent || '').trim();
            if (t) {
              return t;
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const t = findFirstText(child);
            if (t) {
              return t;
            }
          }
        }
        return '';
      }

      const out: Record<string, string> = {};
      const dataRows = Array.from(rows).filter((row) => {
        const el = row;
        if (el.hasAttribute?.('hidden')) {
          return false;
        }
        if (row instanceof HTMLElement && row.hidden) {
          return false;
        }
        const style = globalThis.getComputedStyle(el);
        if (!style) {
          return false;
        }
        if (style.display === 'none' || style.visibility === 'hidden') {
          return false;
        }
        if (el.getClientRects().length === 0) {
          return false;
        }
        return true;
      });

      for (const row of dataRows) {
        const cells = Array.from(row.querySelectorAll('th, td'));
        if (cells.length < 2) {
          continue;
        }

        const rawKey = findFirstText(cells[0])
          .replace(/[▲▼⇧⇩⯅⯆]\s*$/g, '')
          .trim();
        if (!rawKey) {
          continue;
        }

        const valueParts = cells
          .slice(1)
          .map((c) =>
            findFirstText(c)
              .replace(/[▲▼⇧⇩⯅⯆]\s*$/g, '')
              .trim()
          )
          .filter(Boolean);
        const value = valueParts.join(' ').replace(/\s+/g, ' ').trim();

        out[rawKey] = value;
      }
      return out;
    };

    return this._runOnRows(selector, fn);
  }

  /**
   * Read a table and return an array of row objects where keys are header texts
   * taken from the first TR, and values are the corresponding cell text.
   * Reads the header row and skips reading any hidden rows.
   */
  async trTableToObjectsInPage(selector: string | Locator): Promise<Record<string, string>[]> {
    if (!selector) {
      return [];
    }

    const fn = (rows: Element[]) => {
      const arr: Record<string, string>[] = [];
      if (!rows || rows.length === 0) {
        return arr;
      }

      // header is first tr
      const headerRow = rows[0];
      const sanitize = (s: string) => (s || '').replace(/[▲▼⇧⇩⯅⯆]\s*$/g, '').trim();
      const headers = Array.from(headerRow.querySelectorAll('th, td')).map((h) => sanitize(h.textContent || ''));

      // data rows are after header; filter hidden rows
      const dataRows = Array.from(rows)
        .slice(1)
        .filter((row) => {
          if (row instanceof HTMLTableRowElement && row.hidden) {
            return false;
          }
          const style = globalThis.getComputedStyle(row);
          if (!style) {
            return false;
          }
          if (style.display === 'none' || style.visibility === 'hidden') {
            return false;
          }
          if (row.getClientRects().length === 0) {
            return false;
          }
          return true;
        });

      for (const row of dataRows) {
        const cells = Array.from(row.querySelectorAll('th, td'));
        if (cells.length === 0) {
          continue;
        }
        const obj: Record<string, string> = {};
        for (let i = 0; i < cells.length; i++) {
          const key = headers[i] || `column_${i + 1}`;
          const cellText = cells[i].textContent || '';
          const value = sanitize(cellText).replace(/\s+/g, ' ');
          obj[key] = value;
        }
        arr.push(obj);
      }
      return arr;
    };

    return this._runOnRows(selector, fn);
  }

  async mapHistoryTable(): Promise<Record<string, string>[]> {
    if ((await this.historyTable.count()) === 0) {
      throw new Error('History table not found on page');
    }
    const headers = (await this.historyTable.locator('thead tr th').allInnerTexts()).map((h) => h.replace(/\t.*/g, ''));
    const rows = this.historyTable.locator('tbody tr');
    const rowCount = await rows.count();
    const data: Record<string, string>[] = [];

    for (let i = 0; i < rowCount; i++) {
      const cells = await rows.nth(i).locator('th, td').allInnerTexts();
      const row: Record<string, string> = {};

      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = cells[j] ?? '';
      }

      data.push(row);
    }

    return data;
  }

  async getUpdateCaseHistoryInfo(): Promise<{
    updateRow: Record<string, string> | undefined;
    updateDate: string;
    updateAuthor: string;
    expectedDate: string;
  }> {
    const rows = await this.mapHistoryTable();
    const updateRow = rows.find((r) => r.Event === 'Update case');
    const updateDate = updateRow?.Date || '';
    const updateAuthor = updateRow?.Author || '';
    const expectedDate = await this.todaysDateFormatted();

    return { updateRow, updateDate, updateAuthor, expectedDate };
  }

  async getCaseNumberFromAlert(): Promise<string> {
    await this.caseAlertSuccessMessage.waitFor({ state: 'visible', timeout: TIMEOUTS.ALERT_VISIBLE });
    const alertText = await this.caseAlertSuccessMessage.innerText();
    const caseNumberMatch = validatorUtils.DIVORCE_CASE_NUMBER_REGEX.exec(alertText);
    if (!caseNumberMatch) {
      this.logger.error('Failed to extract case number from alert', { alertLength: alertText?.length });
      throw new Error('Failed to extract case number from alert');
    }
    return caseNumberMatch[0];
  }

  async getCaseNumberFromUrl(): Promise<string> {
    const url = this.page.url();
    const pathname = new URL(url).pathname;
    const caseNumberMatch = pathname.slice(pathname.lastIndexOf('/') + 1);
    // Validate format: EXUI case numbers are typically 16 digits
    if (!caseNumberMatch || !/^\d{16}$/.test(caseNumberMatch)) {
      this.logger.error('Failed to extract valid case number from URL', {
        pathnameLength: pathname.length,
        extractedLength: caseNumberMatch?.length,
      });
      throw new Error('Failed to extract valid case number from URL');
    }
    return caseNumberMatch;
  }

  async selectCaseAction(
    action: string,
    options: {
      expectedLocator?: Locator;
      timeoutMs?: number;
      retry?: boolean;
    } = {}
  ) {
    await this.caseActionGoButton.waitFor({ state: 'visible' });
    await this.caseActionsDropdown.waitFor({ state: 'visible' });
    try {
      await this.caseActionsDropdown.selectOption({ label: action });
    } catch (error) {
      // Fallback: some dropdowns don't support label selector, use value directly
      this.logger.warn('Failed to select option by label, falling back to value selector', { error });
      await this.caseActionsDropdown.selectOption(action);
    }
    await this.caseActionGoButton.click();
    await this.waitForSpinnerToComplete('after selecting case action');
    await this.page.waitForLoadState('domcontentloaded');
    if (!options.expectedLocator) {
      return;
    }
    const timeoutMs = options.timeoutMs ?? 30000;
    const waitForExpected = async () => {
      await options.expectedLocator?.waitFor({ state: 'visible', timeout: timeoutMs });
    };
    try {
      await waitForExpected();
    } catch (error) {
      const eventErrorVisible = await this.eventCreationErrorHeading.isVisible().catch(() => false);
      if (eventErrorVisible) {
        throw new Error(`Case event failed after selecting "${action}": The event could not be created.`);
      }
      if (options.retry === false) {
        throw error;
      }
      this.logger.warn('Expected locator not visible after case action; retrying action', { action });
      try {
        await this.caseActionsDropdown.selectOption({ label: action });
      } catch (retryError) {
        this.logger.warn('Retry: failed to select option by label, falling back to value selector', { retryError });
        await this.caseActionsDropdown.selectOption(action);
      }
      await this.caseActionGoButton.click();
      await this.waitForSpinnerToComplete('after retrying case action');
      await this.page.waitForLoadState('domcontentloaded');
      await waitForExpected();
    }
  }

  private async waitForSpinnerToComplete(context: string, timeoutMs?: number) {
    const effectiveTimeoutMs = timeoutMs ?? this.getRecommendedTimeoutMs();
    const spinner = this.page.locator('xuilib-loading-spinner').first();
    try {
      await spinner.waitFor({ state: 'hidden', timeout: effectiveTimeoutMs });
    } catch (error) {
      const stillVisible = await spinner.isVisible().catch(() => false);
      if (stillVisible) {
        throw new Error(`Spinner still visible ${context}`);
      }
      this.logger.warn('Spinner hidden wait failed, proceeding because spinner not visible', { context, error });
    }
  }

  async selectCaseDetailsEvent(action: string) {
    await this.selectCaseAction(action);
  }

  async selectFirstRadioOption() {
    await this.commonRadioButtons.first().getByRole('radio').check();
    await this.submitCaseFlagButton.click();
    await this.waitForSpinnerToComplete('after selecting first radio option');
  }

  async todaysDateFormatted(): Promise<string> {
    return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  // Case flag methods
  async addFlagComment(comment: string) {
    await this.caseFlagCommentBox.fill(comment);
    await this.submitCaseFlagButton.click();
  }

  async selectPartyFlagTarget(target: string, flagType: string) {
    const callbackError = this.page.getByText('callback data failed validation', { exact: false });
    if (await callbackError.isVisible({ timeout: 1000 }).catch(() => false)) {
      throw new Error('Callback data failed validation before selecting party flag target.');
    }
    const exactLabel = this.page.getByLabel(`${target} (${target})`);
    // Escape regex special characters to prevent unintended matches
    const escapedTarget = target.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    const fallbackLabel = this.page.getByLabel(new RegExp(escapedTarget, 'i'));
    try {
      await exactLabel.waitFor({ state: 'visible', timeout: 15000 });
      await exactLabel.check();
    } catch (error) {
      // Exact label format not found, use case-insensitive fallback
      this.logger.warn('Exact label not found, using regex fallback', { error });
      await fallbackLabel.waitFor({ state: 'visible', timeout: 15000 });
      await fallbackLabel.check();
    }
    await this.submitCaseFlagButton.click();
    await this.waitForSpinnerToComplete('after selecting party flag target');
    await this.commonRadioButtons.getByLabel(flagType).waitFor({ state: 'visible', timeout: this.getRecommendedTimeoutMs() });
    await this.commonRadioButtons.getByLabel(flagType).check();
    await this.submitCaseFlagButton.click();
    await this.waitForSpinnerToComplete('after selecting party flag type');
    await this.selectFirstRadioOption();
    await this.addFlagComment(`${flagType} ${target}`);
    await this.submitCaseFlagButton.click();
    await this.waitForSpinnerToComplete('after submitting party flag');
  }

  async selectCaseFlagTarget(flagType: string) {
    await this.page.getByLabel('Case level').check();
    await this.submitCaseFlagButton.click();
    await this.waitForSpinnerToComplete('after selecting case level');
    await this.page.getByLabel(flagType).waitFor({ state: 'visible', timeout: this.getRecommendedTimeoutMs() });
    await this.page.getByLabel(flagType).check();
    await this.submitCaseFlagButton.click();
    await this.waitForSpinnerToComplete('after selecting case flag type');
    await this.caseFlagCommentBox.fill(`${flagType}`);
    await this.submitCaseFlagButton.click();
    await this.waitForSpinnerToComplete('after submitting case flag comment');
    await this.submitCaseFlagButton.click();
    await this.waitForSpinnerToComplete('after final case flag submit');
  }

  async selectCaseDetailsTab(tabName: string) {
    const tab = this.caseDetailsTabs.filter({ hasText: tabName });
    await tab.click();
    // Wait for tab content to load
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.TAB_LOAD }).catch(() => {
      // Swallow timeout - some tabs don't trigger network activity
    });
  }

  /**
   * Returns task key/value rows for each task as an array of objects.
   * Each object maps row label -> row value for a single task.
   */
  async getTaskKeyValueRows(): Promise<Record<string, string>[]> {
    const taskCount = await this.taskItem.count();
    if (taskCount === 0) {
      return [];
    }

    await this.taskItem.first().waitFor({ state: 'visible' });

    const results: Record<string, string>[] = [];

    for (let i = 0; i < taskCount; i++) {
      const task = this.taskItem.nth(i);
      const title = (await task.locator('p.govuk-body').innerText()).replace(/\s+/g, ' ').trim();
      const rows = task.locator('.govuk-summary-list__row');
      const rowCount = await rows.count();
      const taskData: Record<string, string> = {};

      if (title) {
        taskData['Title'] = title;
      }

      for (let j = 0; j < rowCount; j++) {
        const row = rows.nth(j);
        const key = (await row.locator('.govuk-summary-list__key .row-padding').innerText()).trim();
        const valueEl = row.locator('.govuk-summary-list__value');
        const rawText = (await valueEl.innerText()).replace(/\s+/g, ' ').trim();
        // Also capture the rendered HTML so tests can assert on links and markdown output
        const rawHtml = (await valueEl.evaluate((el: HTMLElement) => el.innerHTML || '')).trim();
        // If markdown rendered as headings, prefer returning value starting with the first heading
        let value = rawText;
        // Prefer a rendered heading if present; use evaluate to avoid locator timeouts
        const heading = await valueEl.evaluate((el: HTMLElement) => {
          const h = el.querySelector('h1,h2,h3') as HTMLElement | null;
          return h ? (h.textContent || '').trim() : '';
        });
        if (heading) {
          if (!value.startsWith(heading)) {
            value = `${heading}${value ? ' ' + value : ''}`.trim();
          }
        }
        if (key) {
          taskData[key] = value;
          // expose HTML for assertions (e.g. verify anchor hrefs rendered from markdown)
          taskData[`${key} HTML`] = rawHtml;
        }
      }

      if (Object.keys(taskData).length > 0) {
        results.push(taskData);
      }
    }

    return results;
  }
}
