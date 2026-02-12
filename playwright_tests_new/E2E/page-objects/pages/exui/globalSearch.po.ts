import { Page } from '@playwright/test';
import { Base } from '../../base';

export class GlobalSearchPage extends Base {
  // Locators
  readonly pageHeading = this.page.locator('main h1');
  readonly searchForm = this.page.locator('main form');
  readonly servicesOption = this.page.locator('#servicesList');
  readonly searchLinkOnMenuBar = this.page.locator('.hmcts-primary-navigation__link[href="/search"]');
  readonly searchButton = this.page.locator('main button[type="submit"]');
  readonly clearSearchButton = this.page.locator('main button[type="reset"]');
  readonly caseIdTextBox = this.page.locator('input#caseRef');
  readonly globalSearchInput = this.page.locator('input#searchTerm');
  readonly viewLink = this.page.locator('.govuk-table a.govuk-link[href*="/cases/case-details/"]').first();
  readonly changeSearchLink = this.page.locator('a[href*="/search"]');
  readonly searchResultTable = this.page.locator('main').getByRole('table').first();
  readonly searchResultsTable = this.page.locator('main').getByRole('table').first();
  readonly searchResultRows = this.searchResultsTable.locator('tbody tr');
  readonly applicantOrPartyName = this.page.locator('.govuk-form-group').locator('#fullName');
  readonly paginationLinks = this.page.locator('.govuk-width-container #pagination-label .hmcts-pagination__link');
  readonly searchResultsHeader = this.page.locator('.govuk-width-container .govuk-heading-xl');
  readonly errorPageHeading = this.page.getByRole('heading', { name: /something went wrong/i });

  async performGlobalSearchWithCase(caseId: string, caseType: string, applicantOrPartyName?: string): Promise<void> {
    await this.searchLinkOnMenuBar.click();
    await this.page.waitForURL(/\/search/, { timeout: 60000 });
    await this.searchForm.waitFor({ state: 'visible', timeout: 60000 });
    await this.caseIdTextBox.waitFor({ state: 'visible', timeout: 60000 });
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    if (applicantOrPartyName) {
      await this.applicantOrPartyName.fill(applicantOrPartyName);
    }
    await this.servicesOption.selectOption(caseType);
    await this.searchButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async performGlobalSearchWithRetry(caseId: string, caseType: string, applicantOrPartyName?: string): Promise<void> {
    await this.performGlobalSearchWithCase(caseId, caseType, applicantOrPartyName);
    const isErrorPage = await this.errorPageHeading.isVisible().catch(() => false);
    if (!isErrorPage) {
      return;
    }
    // One retry only for transient backend failures in AAT.
    await this.performGlobalSearchWithCase(caseId, caseType, applicantOrPartyName);
    if (await this.errorPageHeading.isVisible().catch(() => false)) {
      throw new Error('Global search returned "Something went wrong" after retry.');
    }
  }

  async viewCaseDetails() {
    await this.viewLink.click();
  }

  constructor(page: Page) {
    super(page);
  }
}
