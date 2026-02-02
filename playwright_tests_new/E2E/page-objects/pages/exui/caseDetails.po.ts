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
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="case-details-container" - brittle custom element selector
  readonly container = this.page.locator('exui-case-details-home');

  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="case-tab-{name}" - prefer test ID for each tab
  readonly caseDetailsTabs = this.page.locator('div[role="tab"]');

  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="case-actions-dropdown" - prefer test ID over #id
  readonly caseActionsDropdown = this.page.locator('#next-step');

  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="case-action-go-button" - brittle CSS selector
  readonly caseActionGoButton = this.page.locator('.event-trigger button');

  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="submit-case-flag-button" - brittle CSS selector
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
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="case-flag-comment-input" - prefer test ID over #id
  readonly caseFlagCommentBox = this.page.locator('#flagComments');

  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="case-flag-table" - brittle CSS class selector
  readonly caseFlagApplicantFlagTable = this.page.locator('table.govuk-table.ng-star-inserted');

  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="radio-option-{index}" - brittle CSS class selector
  readonly commonRadioButtons = this.page.locator('.govuk-radios__item');

  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="success-banner-message" - brittle CSS selector
  readonly caseAlertSuccessMessage = this.page
    .locator('.hmcts-banner--success .alert-message, .exui-alert .alert-message')
    .first();

  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="notification-banner-title" - prefer test ID over #id
  readonly caseNotificationBannerTitle = this.page.locator('#govuk-notification-banner-title');

  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="notification-banner-body" - brittle CSS selector
  readonly caseNotificationBannerBody = this.page.locator('.govuk-notification-banner__heading');

  // Table locators
  readonly caseTab1Table = this.page.locator('table.tab1');
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="documents-table" - brittle CSS class selector
  readonly caseDocumentsTable = this.page.locator('table.complex-panel-table');
  readonly someMoreDataTable = this.page.locator('table.SomeMoreData');

  constructor(page: Page) {
    super(page);
  }

  // Internal helper: obtain rows either from a selector string or a Locator
  private async _runOnRows<T>(selector: string | Locator, fn: (rows: Element[]) => T): Promise<T> {
    if (!selector) {
      return (null as unknown) as T;
    }
    if (typeof selector !== 'string') {
      // Locator: evaluate on the located rows
      return (selector as Locator).locator('tr').evaluateAll(fn as any) as unknown as T;
    }
    // Selector string: use page.$$eval to run fn in page context
    return this.page.$$eval(`${selector} tr`, fn as any) as unknown as T;
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
      const hasHeaders = await tables[i].evaluate((table) => {
        const thead = table.querySelector(':scope > thead');
        if (!thead) {
          return false;
        }
        const headerCells = Array.from(thead.querySelectorAll('th, td'))
          .map((el) => (el.textContent || '').trim());
        return headerCells.includes('Number')
          && headerCells.includes('Document Category')
          && headerCells.includes('Type of Document');
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
        const el = row as Element;
        if (el.hasAttribute && el.hasAttribute('hidden')) {
          return false;
        }
        if ('hidden' in row && (row as any).hidden) {
          return false;
        }
        const style = window.getComputedStyle(el);
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
        const cells = Array.from(row.querySelectorAll('th, td')) as HTMLElement[];
        if (cells.length < 2) {
          continue;
        }

        const rawKey = findFirstText(cells[0]).replace(/[▲▼⇧⇩⯅⯆]\s*$/g, '').trim();
        if (!rawKey) {
          continue;
        }

        const valueParts = cells.slice(1).map((c) => findFirstText(c).replace(/[▲▼⇧⇩⯅⯆]\s*$/g, '').trim()).filter(Boolean);
        const value = valueParts.join(' ').replace(/\s+/g, ' ').trim();

        out[rawKey] = value;
      }
      return out;
    };

    return this._runOnRows(selector, fn as any) as Promise<Record<string, string>>;
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
      const headers = Array.from(headerRow.querySelectorAll('th, td')).map((h) => sanitize((h as HTMLElement).innerText || ''));

      // data rows are after header; filter hidden rows
      const dataRows = Array.from(rows).slice(1).filter((row) => {
        if ((row as HTMLTableRowElement).hidden) {
          return false;
        }
        const style = window.getComputedStyle(row as Element);
        if (!style) {
          return false;
        }
        if (style.display === 'none' || style.visibility === 'hidden') {
          return false;
        }
        if ((row as Element).getClientRects().length === 0) {
          return false;
        }
        return true;
      });

      for (const row of dataRows) {
        const cells = Array.from(row.querySelectorAll('th, td')) as HTMLElement[];
        if (cells.length === 0) {
          continue;
        }
        const obj: Record<string, string> = {};
        for (let i = 0; i < cells.length; i++) {
          const key = headers[i] || `column_${i + 1}`;
          const value = sanitize(cells[i].innerText || '').replace(/\s+/g, ' ');
          obj[key] = value;
        }
        arr.push(obj);
      }
      return arr;
    };

    return this._runOnRows(selector, fn as any) as Promise<Record<string, string>[]>;
  }

  async mapHistoryTable(): Promise<Record<string, string>[]> {
    if (await this.historyTable.count() === 0) {
      throw new Error('History table not found on page');
    }
    const headers = (await this.historyTable.locator('thead tr th').allInnerTexts())
      .map((h) => h.replace(/\t.*/, ''));
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
    const caseNumberMatch = alertText.match(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
    if (!caseNumberMatch) {
      throw new Error(`Failed to extract case number from alert: "${alertText}"`);
    }
    return caseNumberMatch ? caseNumberMatch[0] : '';
  }

  async getCaseNumberFromUrl(): Promise<string> {
    const url = this.page.url();
    const pathname = new URL(url).pathname;
    const caseNumberMatch = pathname.slice(pathname.lastIndexOf('/') + 1);
    // Validate format: EXUI case numbers are typically 16 digits
    if (!caseNumberMatch || !/^\d{16}$/.test(caseNumberMatch)) {
      throw new Error(`Failed to extract valid case number from URL: "${url}" (extracted: "${caseNumberMatch}")`);
    }
    return caseNumberMatch;
  }

  async selectCaseAction(action: string) {
    await this.caseActionGoButton.waitFor({ state: 'visible' });
    await this.caseActionsDropdown.waitFor({ state: 'visible' });
    try {
      await this.caseActionsDropdown.selectOption({ label: action });
    } catch (error) {
      await this.caseActionsDropdown.selectOption(action);
    }
    await this.caseActionGoButton.click();
    try {
      await this.exuiSpinnerComponent.wait();
    } catch (error) {
      // Some pages keep the spinner element mounted but hidden; fall back to a hidden wait.
      await this.page.locator('xuilib-loading-spinner').first().waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    }
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectCaseDetailsEvent(action: string) {
    await this.selectCaseAction(action);
  }

  async selectFirstRadioOption() {
    await this.commonRadioButtons.first().getByRole('radio').check();
    await this.submitCaseFlagButton.click();
    await this.exuiSpinnerComponent.wait();
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
    if (await callbackError.isVisible().catch(() => false)) {
      throw new Error('Callback data failed validation before selecting party flag target.');
    }
    const exactLabel = this.page.getByLabel(`${target} (${target})`);
    const fallbackLabel = this.page.getByLabel(new RegExp(`${target}`, 'i'));
    try {
      await exactLabel.waitFor({ state: 'visible', timeout: 15000 });
      await exactLabel.check();
    } catch (error) {
      await fallbackLabel.waitFor({ state: 'visible', timeout: 15000 });
      await fallbackLabel.check();
    }
    await this.submitCaseFlagButton.click();
    await this.commonRadioButtons.getByLabel(flagType).waitFor({ state: 'visible' });
    await this.commonRadioButtons.getByLabel(flagType).check();
    await this.submitCaseFlagButton.click();
    await this.selectFirstRadioOption();
    await this.addFlagComment(`${flagType} ${target}`);
    await this.submitCaseFlagButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async selectCaseFlagTarget(flagType: string) {
    await this.page.getByLabel('Case level').check();
    await this.submitCaseFlagButton.click();
    await this.page.getByLabel(flagType).waitFor({ state: 'visible' });
    await this.page.getByLabel(flagType).check();
    await this.submitCaseFlagButton.click();
    await this.caseFlagCommentBox.fill(`${flagType}`);
    await this.submitCaseFlagButton.click();
    await this.submitCaseFlagButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async selectCaseDetailsTab(tabName: string) {
    const tab = this.caseDetailsTabs.filter({ hasText: tabName });
    await tab.click();
    // Wait for tab content to load
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.TAB_LOAD }).catch(() => {
      // Swallow timeout - some tabs don't trigger network activity
    });
  }
}
