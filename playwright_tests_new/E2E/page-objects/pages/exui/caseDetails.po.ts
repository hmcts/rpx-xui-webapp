import { Locator, Page } from "@playwright/test";
import { Base } from "../../base";
import { ValidatorUtils } from "../../../utils/validator.utils";
import { TableUtils } from "@hmcts/playwright-common";
import { TIMEOUTS } from "../../../test/documentUpload/constants";

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
  readonly container = this.page.locator("exui-case-details-home");
  readonly caseDetailsTabs = this.page.locator('div[role="tab"]');
  readonly caseActionsDropdown = this.page.locator('#next-step');
  readonly caseActionGoButton = this.page.locator('.event-trigger button');
  readonly submitCaseFlagButton = this.page.locator('.button[type="submit"]');

  //Case flags
  readonly caseFlagCommentBox = this.page.locator('#flagComments');
  readonly caseFlagApplicantFlagTable = this.page.locator('table.govuk-table.ng-star-inserted');

  readonly commonRadioButtons = this.page.locator('.govuk-radios__item');
  readonly caseAlertSuccessMessage = this.page.locator('.hmcts-banner--success .alert-message');
  readonly caseNotificationBannerTitle = this.page.locator('#govuk-notification-banner-title');
  readonly caseNotificationBannerBody = this.page.locator('.govuk-notification-banner__heading');
  readonly caseDocumentsTable = this.page.locator('table.complex-panel-table');

  constructor(page: Page) {
    super(page);
  }

  async getTableByName(tableName: string) {
    return this.page.getByRole('table', { name: tableName, exact: true })
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
          .map(el => (el.textContent || '').trim());
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
    const caseNumberMatch = url.slice(url.lastIndexOf('/') + 1);
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
    await this.exuiSpinnerComponent.wait();
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
    const tab = this.caseDetailsTabs.filter({ hasText: tabName });
    await tab.click();
    // Wait for tab content to load
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.TAB_LOAD }).catch(() => {
      // Swallow timeout - some tabs don't trigger network activity
    });
  }
}
