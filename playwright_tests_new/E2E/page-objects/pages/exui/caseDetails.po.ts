import { Page } from "@playwright/test";
import { Base } from "../../base";
import { ValidatorUtils } from "../../../utils/validator.utils";
import { TableUtils } from "@hmcts/playwright-common";
import { expect } from '@playwright/test';


const tableUtils = new TableUtils();
const validatorUtils = new ValidatorUtils();

export interface CaseFlagItem {
  flagType: string;
  comments: string;
  creationDate: string;
  lastModified: string;
  status: string;
  Locator: string;
}

export class CaseDetailsPage extends Base {

  readonly container = this.page.locator("exui-case-details-home");
  readonly caseDetailsTabs = this.page.locator('div[role="tab"]');
  readonly caseActionsDropdown = this.page.locator('#next-step');
  readonly caseActionGoButton = this.page.locator('.event-trigger button');
  readonly submitCaseFlagButton = this.page.locator('.button[type="submit"]');
  readonly continueButton = this.page.getByRole("button", { name: "Continue" });
  readonly submitButton = this.page.getByRole("button", { name: "Submit" });
  readonly eventTable = this.page.locator("EventLogTable");
  readonly someMoreDataTab = this.page.locator('table.complex-panel-table');
  readonly firstNameCell = this.page.locator('tr:has-text("First Name") + td');
  readonly lastNameCell = this.page.locator('tr:has-text("Last Name") + td');
  readonly updateCase = this.page.getByText('Update case', { exact: true });
  readonly historyTab = this.page.getByRole('tab', { name: 'History', exact: true });
  readonly historyTable = this.page.locator('table.EventLogTable');
  readonly historyDetailsTable = this.page.locator('table.EventLogDetails');

  //Case flags
  readonly caseFlagCommentBox = this.page.locator('#flagComments');
  readonly caseFlagApplicantFlagTable = this.page.locator('table.govuk-table.ng-star-inserted');
  readonly commonRadioButtons = this.page.locator('.govuk-radios__item');
  readonly caseAlertSuccessMessage = this.page.locator('.hmcts-banner--success .alert-message');
  readonly caseNotificationBannerTitle = this.page.locator('#govuk-notification-banner-title');
  readonly caseNotificationBannerBody = this.page.locator('.govuk-notification-banner__heading');

  constructor(page: Page) {
    super(page);

  }
  async getTableByName(tableName: string) {
    return this.page.getByRole('table', { name: tableName, exact: true })
  }

  async openHistoryTab(tabName: string) {
    const tab = this.page.getByRole('tab', { name: tabName, exact: true });
    await tab.click();

  }

  async mapHistoryTable(): Promise<Record<string, string>[]> {
    const headers = (await this.historyTable.locator('thead tr th').allInnerTexts())
      .map(h => h.replace(/\t.*/, '').trim());
    const rows = this.historyTable.locator('tbody tr');
    const rowCount = await rows.count();
    const data: Record<string, string>[] = [];

    for (let i = 0; i < rowCount; i++) {
      const cells = await rows.nth(i).locator('th, td').allInnerTexts();
      const trimmed = cells.map(t => t.trim());
      const row: Record<string, string> = {};

      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = trimmed[j] ?? '';
      }

      data.push(row);
    }

    return data;
  }

  async getDetailField(label: string): Promise<string> {
    const valueCell = this.historyDetailsTable.locator(`tr:has(th:has-text("${label}")) td`).first();
    await expect(valueCell).toBeVisible();
    const text = (await valueCell.textContent())?.trim() || '';
    return label === 'Date' ? text.split(',')[0] : text;
  }

  async FirstAndLastNameVisibleOnSomeMoredata(): Promise<void> {
    const labels = ['First Name', 'Last Name'];

    for (const label of labels) {
      const row = this.page.locator('tr', {
        has: this.page.locator(`th:has-text("${label}")`)
      });
    }

  }
  async getCaseNumberFromAlert(): Promise<string> {
    const alertText = await this.caseAlertSuccessMessage.innerText();
    const caseNumberMatch = alertText.match(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
    if (!caseNumberMatch) {
      throw new Error(`Failed to extract case number from alert: "${alertText}"`);
    }
    return caseNumberMatch ? caseNumberMatch[0] : '';
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
    await this.caseDetailsTabs.filter({ hasText: tabName }).click()

  }

}