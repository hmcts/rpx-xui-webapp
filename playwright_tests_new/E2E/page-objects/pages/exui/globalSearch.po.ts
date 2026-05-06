import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';
import { EXUI_TIMEOUTS, CCD_CASE_REFERENCE_LENGTH, MAX_NAVIGATION_RETRY_ATTEMPTS } from './exui-timeouts';

export class GlobalSearchPage extends Base {
  // Locators
  readonly pageHeading = this.page.getByRole('heading', { level: 1 }).first();
  readonly searchForm = this.page.locator('main form').first();
  readonly servicesOption = this.page.locator('#servicesList');
  readonly searchLinkOnMenuBar = this.page.locator('.hmcts-primary-navigation__link[href="/search"]');
  readonly searchButton = this.searchForm.getByRole('button', { name: 'Search', exact: true });
  readonly clearSearchButton = this.searchForm.getByRole('button', { name: /clear|reset/i }).first();
  readonly caseIdTextBox = this.page.locator('#caseRef');
  readonly globalSearchInput = this.page.locator('#searchTerm');
  readonly caseDetailsLinks = this.page.locator('.govuk-table a.govuk-link[href*="/cases/case-details/"]');
  readonly viewLink = this.caseDetailsLinks.first();
  readonly changeSearchLink = this.page.locator('a[href*="/search"]');
  readonly searchResultsTable = this.page.locator('main').getByRole('table').first();
  readonly searchResultTable = this.searchResultsTable;
  readonly searchResultRows = this.searchResultsTable.locator('tbody tr');
  readonly applicantOrPartyName = this.page.locator('.govuk-form-group').locator('#fullName');
  readonly paginationLinks = this.page.locator('.govuk-width-container #pagination-label .hmcts-pagination__link');
  readonly searchResultsHeader = this.page.locator('.govuk-width-container .govuk-heading-xl');
  readonly errorPageHeading = this.page.getByRole('heading', { name: /something went wrong/i });

  async performGlobalSearchWithCase(caseId: string, caseType: string, applicantOrPartyName?: string): Promise<void> {
    await this.searchLinkOnMenuBar.click();
    await this.page.waitForURL(/\/search/, { timeout: EXUI_TIMEOUTS.GLOBAL_SEARCH_NAVIGATION });
    await this.searchForm.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.GLOBAL_SEARCH_NAVIGATION });
    await this.caseIdTextBox.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE });
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    if (applicantOrPartyName) {
      await this.applicantOrPartyName.fill(applicantOrPartyName);
    }
    await this.servicesOption.selectOption(caseType);
    await this.searchButton.click();
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

  async viewCaseDetails(caseId: string): Promise<void> {
    const normalizedCaseId = caseId.replaceAll(/\D/g, '');
    if (normalizedCaseId.length !== CCD_CASE_REFERENCE_LENGTH) {
      throw new Error(`Expected ${CCD_CASE_REFERENCE_LENGTH}-digit case reference, received "${caseId}"`);
    }

    const caseLink = this.searchResultsTable
      .locator(`a.govuk-link[href*="/cases/case-details/"][href*="${normalizedCaseId}"]`)
      .first();
    await caseLink.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.WAIT_FOR_SELECT_READY_EXTENDED });
    await this.openCaseDetailsFromSearchResult(caseLink, normalizedCaseId);
  }

  private async openCaseDetailsFromSearchResult(searchResultCaseLink: Locator, caseId: string): Promise<void> {
    for (let attempt = 1; attempt <= MAX_NAVIGATION_RETRY_ATTEMPTS; attempt++) {
      await searchResultCaseLink.scrollIntoViewIfNeeded();
      await searchResultCaseLink.click();
      await this.exuiSpinnerComponent.wait();
      if (await this.waitForCaseDetailsUrl(caseId, EXUI_TIMEOUTS.CASE_DETAILS_NAVIGATION)) {
        return;
      }
    }

    throw new Error(`Navigation to case details did not complete for ${caseId}. Current URL: ${this.page.url()}`);
  }

  private async waitForCaseDetailsUrl(caseId: string, timeoutMs: number): Promise<boolean> {
    try {
      await this.page.waitForURL((url) => url.pathname.includes('/cases/case-details/') && url.pathname.includes(caseId), {
        timeout: timeoutMs,
      });
      return true;
    } catch {
      return false;
    }
  }

  private async waitForSearchResults(caseId: string): Promise<void> {
    if (await this.errorPageHeading.isVisible().catch(() => false)) {
      return;
    }

    await this.searchResultsTable.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN });
    await this.searchResultRows.first().waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN });

    if (caseId.includes('*')) {
      return;
    }

    const normalizedCaseId = caseId.replaceAll(/\D/g, '');
    if (normalizedCaseId.length !== CCD_CASE_REFERENCE_LENGTH) {
      return;
    }

    const matchingCaseLink = this.searchResultsTable
      .locator(`a.govuk-link[href*="/cases/case-details/"][href*="${normalizedCaseId}"]`)
      .first();

    try {
      await matchingCaseLink.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN });
    } catch {
      if (await this.errorPageHeading.isVisible().catch(() => false)) {
        return;
      }
      throw new Error(
        `Global search results did not contain case reference ${caseId} within ${EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN}ms`
      );
    }
  }

  constructor(page: Page) {
    super(page);
  }
}
