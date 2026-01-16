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

  async getTableContentsByTabName(className: string) {
    return this.trRowsToObjectInPage(`table.${className}`);
  }

  async trRowsToObjectInPage(selector: string): Promise<Record<string, string>> {
    return this.page.evaluate((sel) => {
      if (!sel) return {};
      const root = document.querySelector(sel);
      if (!root) return {};

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

      const table = (root instanceof HTMLTableElement) ? root : (root.querySelector('table') ?? root);
      const rows = Array.from(table.querySelectorAll('tr'));
      const out: Record<string, string> = {};

      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('th, td')) as HTMLElement[];
        if (cells.length < 2) continue;

        const rawKey = findFirstText(cells[0]).trim();
        if (!rawKey) continue;

        const valueParts = cells.slice(1).map(c => findFirstText(c).trim()).filter(Boolean);
        const value = valueParts.join(' ').replace(/\s+/g, ' ').trim();

        out[rawKey] = value;
      }

      return out;
    }, selector);
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
    await this.caseDetailsTabs.filter({ hasText: tabName }).click()
  }
}
