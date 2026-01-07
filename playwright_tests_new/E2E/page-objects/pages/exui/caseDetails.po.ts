import { Page } from "@playwright/test";
import { Base } from "../../base";
import { ValidatorUtils } from "../../../utils/validator.utils";
import { TableUtils } from "@hmcts/playwright-common";

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


  constructor(page: Page) {
    super(page);
  }
  async getTableByName(tableName: string) {
    return this.page.getByRole('table', { name: tableName, exact: true })
  }

  async getCaseNumberFromAlert(): Promise<string> {
    const alertText = await this.caseAlertSuccessMessage.innerText();
    const caseNumberMatch = alertText.match(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
    return caseNumberMatch ? caseNumberMatch[0] : '';
  }

  async selectCaseAction(action: string) {
    await this.caseActionGoButton.waitFor();
    await this.caseActionsDropdown.selectOption(action);
    await this.caseActionGoButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async selectRandomRadioOption() {
    const optionCount = await this.commonRadioButtons.count();
    const randomIndex = Math.floor(Math.random() * (optionCount - 1));
    await this.commonRadioButtons.nth(randomIndex).getByRole('radio').check();
    await this.submitCaseFlagButton.click();
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
