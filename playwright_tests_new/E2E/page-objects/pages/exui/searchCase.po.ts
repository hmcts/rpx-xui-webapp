import { Page } from '@playwright/test';
import { Base } from '../../base';

export class SearchCasePage extends Base {
  // Locators
  readonly caseIdTextBox = this.page.locator('#exuiCaseReferenceSearch');
  readonly searchCaseFindButton = this.page.locator('button.govuk-button--secondary');
  readonly searchResultsPageHeading = this.page
    .locator('#progress_legalOfficer_updateTrib_dismissed_under_rule_31 h2')
    .first()
    .textContent();

  public async searchWith16DigitCaseId(caseId: string): Promise<void> {
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    await this.searchCaseFindButton.click();
  }

  constructor(page: Page) {
    super(page);
  }
}
