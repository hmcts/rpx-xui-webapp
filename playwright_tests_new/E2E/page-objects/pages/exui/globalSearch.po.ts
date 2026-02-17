import { Page } from '@playwright/test';
import { Base } from '../../base';
import { EXUI_TIMEOUTS } from './exui-timeouts';

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
    await this.page.waitForURL(/\/search/, { timeout: EXUI_TIMEOUTS.CASE_DETAILS_VISIBLE });
    await this.searchForm.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.CASE_DETAILS_VISIBLE });
    await this.caseIdTextBox.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE });
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    if (applicantOrPartyName) {
      await this.applicantOrPartyName.fill(applicantOrPartyName);
    }
    await this.servicesOption.selectOption(caseType);
    await this.searchButton.click({ timeout: EXUI_TIMEOUTS.SEARCH_BUTTON_CLICK });
    await this.exuiSpinnerComponent.wait();
    await this.waitForSearchResults(caseId);
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

  async waitForSearchResults(caseId?: string): Promise<void> {
    await this.searchResultsHeader.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN });
    await this.searchResultTable.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN });
    await this.searchResultRows.first().waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN });

    if (caseId && /^\d{16}$/.test(caseId)) {
      await this.getSearchResultRowByCase(caseId).waitFor({
        state: 'visible',
        timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN,
      });
    }
  }

  async viewCaseDetails(caseId?: string) {
    const viewLink = caseId
      ? this.getSearchResultRowByCase(caseId).locator('a.govuk-link[href*="/cases/case-details/"]').first()
      : this.viewLink;
    await viewLink.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.CASE_DETAILS_VISIBLE });
    await viewLink.click();
  }

  private getSearchResultRowByCase(caseId: string) {
    return this.searchResultRows.filter({ hasText: caseId }).first();
  }

  constructor(page: Page) {
    super(page);
  }
}
