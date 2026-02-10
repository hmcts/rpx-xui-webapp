import { Page } from '@playwright/test';
import { Base } from '../../base';

export class GlobalSearchPage extends Base {
  // Locators
  readonly pageHeading = this.page.locator('main h1');
  readonly searchForm = this.page.locator('main form');
  readonly servicesOption = this.page.locator('#servicesList');
  readonly searchLinkOnMenuBar = this.page.locator('.hmcts-primary-navigation__link:has-text("Search")');
  readonly searchButton = this.page.locator('main button[type="submit"]');
  readonly clearSearchButton = this.page.locator('main button[type="reset"]');
  readonly caseIdTextBox = this.page.locator('input#caseRef');
  readonly globalSearchInput = this.page.locator('input#searchTerm');
  readonly viewLink = this.page.locator('.govuk-table a.govuk-link').first();
  readonly changeSearchLink = this.page.locator('.govuk-width-container a.govuk-link');
  readonly searchResultTable = this.page.locator('.govuk-width-container .govuk-main-wrapper .govuk-table');
  readonly searchResultsTable = this.page.locator('.govuk-width-container .govuk-table');
  readonly searchResultRows = this.page.locator('.govuk-width-container .govuk-table tbody tr');
  readonly applicantOrPartyName = this.page.locator('.govuk-form-group').locator('#fullName');
  readonly paginationLinks = this.page.locator('.govuk-width-container #pagination-label .hmcts-pagination__link');
  readonly searchResultsHeader = this.page.locator('.govuk-width-container .govuk-heading-xl');

  async performGlobalSearchWithCase(caseId: string, caseType: string): Promise<void> {
    await this.searchLinkOnMenuBar.click();
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    await this.servicesOption.selectOption(caseType);
    await this.searchButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async performPartialSearchOfCaseIdAndPartyName(
    caseId: string,
    applicantOrPartyName?: string,
    caseType: string = 'PUBLICLAW'
  ): Promise<void> {
    await this.searchLinkOnMenuBar.click();
    await this.caseIdTextBox.click();
    const first5Digits = caseId.substring(0, 5);
    // search with first 5 digits of valid case id Ex : 15665*
    await this.caseIdTextBox.fill(`${first5Digits}*`);
    if (applicantOrPartyName) {
      await this.applicantOrPartyName.fill(applicantOrPartyName);
    }
    await this.servicesOption.selectOption(caseType);
    await this.searchButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async viewCaseDetails() {
    await this.viewLink.click();
  }

  constructor(page: Page) {
    super(page);
  }
}
