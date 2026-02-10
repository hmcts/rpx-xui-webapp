import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';
import { ValidatorUtils } from '../../../utils/validator.utils';
import { TableUtils } from '@hmcts/playwright-common';

const tableUtils = new TableUtils();
const validatorUtils = new ValidatorUtils();

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

  //Case flags
  readonly caseFlagCommentBox = this.page.locator('#flagComments');
  readonly caseFlagApplicantFlagTable = this.page.locator('table.govuk-table.ng-star-inserted');
  readonly commonRadioButtons = this.page.locator('.govuk-radios__item');
  readonly caseAlertSuccessMessage = this.page.locator('.hmcts-banner--success .alert-message');
  readonly caseNotificationBannerTitle = this.page.locator('#govuk-notification-banner-title');
  readonly caseNotificationBannerBody = this.page.locator('.govuk-notification-banner__heading');

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
    if (!selector) return null as unknown as T;
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

  async trRowsToObjectInPage(selector: string | Locator): Promise<Record<string, string>> {
    if (!selector) return {};

    const fn = (rows: Element[]) => {
      function findFirstText(node: Node | null): string {
        if (!node) return '';
        for (const child of Array.from(node.childNodes)) {
          if (child.nodeType === Node.TEXT_NODE) {
            const t = (child.textContent || '').trim();
            if (t) return t;
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const t = findFirstText(child);
            if (t) return t;
          }
        }
        return '';
      }

      const out: Record<string, string> = {};
      const dataRows = Array.from(rows).filter((row) => {
        const el = row as Element;
        if (el.hasAttribute && el.hasAttribute('hidden')) return false;
        if ('hidden' in row && (row as any).hidden) return false;
        const style = window.getComputedStyle(el);
        if (!style) return false;
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        if (el.getClientRects().length === 0) return false;
        return true;
      });

      for (const row of dataRows) {
        const cells = Array.from(row.querySelectorAll('th, td')) as HTMLElement[];
        if (cells.length < 2) continue;

        const rawKey = findFirstText(cells[0])
          .replace(/[▲▼⇧⇩⯅⯆]\s*$/g, '')
          .trim();
        if (!rawKey) continue;

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

    return this._runOnRows(selector, fn as any) as Promise<Record<string, string>>;
  }

  /**
   * Read a table and return an array of row objects where keys are header texts
   * taken from the first TR, and values are the corresponding cell text.
   * Reads the header row and skips reading any hidden rows.
   */
  async trTableToObjectsInPage(selector: string | Locator): Promise<Record<string, string>[]> {
    if (!selector) return [];

    const fn = (rows: Element[]) => {
      const arr: Record<string, string>[] = [];
      if (!rows || rows.length === 0) return arr;

      // header is first tr
      const headerRow = rows[0];
      const sanitize = (s: string) => (s || '').replace(/[▲▼⇧⇩⯅⯆]\s*$/g, '').trim();
      const headers = Array.from(headerRow.querySelectorAll('th, td')).map((h) => sanitize((h as HTMLElement).innerText || ''));

      // data rows are after header; filter hidden rows
      const dataRows = Array.from(rows)
        .slice(1)
        .filter((row) => {
          if ((row as HTMLTableRowElement).hidden) return false;
          const style = window.getComputedStyle(row as Element);
          if (!style) return false;
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          if ((row as Element).getClientRects().length === 0) return false;
          return true;
        });

      for (const row of dataRows) {
        const cells = Array.from(row.querySelectorAll('th, td')) as HTMLElement[];
        if (cells.length === 0) continue;
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
    if ((await this.historyTable.count()) === 0) {
      throw new Error('History table not found on page');
    }
    const headers = (await this.historyTable.locator('thead tr th').allInnerTexts()).map((h) => h.replace(/\t.*/, ''));
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

  async getUpdateCaseHistoryInfo(event: string): Promise<{
    updateRow: Record<string, string> | undefined;
    updateDate: string;
    updateAuthor: string;
    expectedDate: string;
  }> {
    const rows = await this.mapHistoryTable();
    const updateRow = rows.find((r) => r['Event'] === event);
    const updateDate = updateRow?.['Date'] || '';
    const updateAuthor = updateRow?.['Author'] || '';
    const expectedDate = (await this.todaysDateFormatted()).replace(/^0+/, '');

    return { updateRow, updateDate, updateAuthor, expectedDate };
  }

  async getCaseNumberFromAlert(): Promise<string> {
    const alertText = await this.caseAlertSuccessMessage.innerText();
    const caseNumberMatch = alertText.match(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
    if (!caseNumberMatch) {
      throw new Error(`Failed to extract case number from alert: "${alertText}"`);
    }
    return caseNumberMatch ? caseNumberMatch[0] : '';
  }

  async getCaseNumberFromUrl(): Promise<string> {
    const url = this.page.url();
    const caseNumberMatch = url.slice(url.lastIndexOf('/') + 1);
    if (!caseNumberMatch) {
      throw new Error(`Failed to extract case number from URL: "${url}"`);
    }
    return caseNumberMatch ? caseNumberMatch : '';
  }

  async selectCaseAction(action: string) {
    await this.caseActionGoButton.waitFor();
    await this.caseActionsDropdown.selectOption(action);
    await this.caseActionGoButton.click();
    await this.exuiSpinnerComponent.wait();
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
    await this.page.getByLabel(`${target} (${target})`).check();
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
    await this.page.getByLabel(`Case level`).check();
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
    await this.caseDetailsTabs.filter({ hasText: tabName }).click();
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
