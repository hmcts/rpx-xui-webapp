import { Page } from '@playwright/test';
import { Base } from '../../base';

export class SearchCasePage extends Base {
  // Locators
  readonly pageHeading = this.page.locator('main h1');
  readonly quickSearchContainer = this.page.locator('.hmcts-primary-navigation__global-search');
  readonly caseIdTextBox = this.page.locator('#exuiCaseReferenceSearch');
  readonly searchCaseFindButton = this.page.locator('button.govuk-button--secondary');
  readonly caseProgressHeading = this.page.locator('#progress_legalOfficer_updateTrib_dismissed_under_rule_31 h2').first();
  readonly caseProgressPanel = this.page.locator('#progress_legalOfficer_updateTrib_dismissed_under_rule_31');
  readonly noResultsHeading = this.page.locator('exui-no-results .govuk-heading-xl');
  readonly noResultsContainer = this.page.locator('exui-no-results');
  readonly backLink = this.page.locator('exui-no-results .govuk-back-link');

  public async searchWith16DigitCaseId(caseId: string): Promise<void> {
    if (!/^\d{16}$/.test(caseId)) {
      throw new Error(`Expected 16-digit case reference, received "${caseId}"`);
    }
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    await this.searchCaseFindButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  constructor(page: Page) {
    super(page);
  }
}
