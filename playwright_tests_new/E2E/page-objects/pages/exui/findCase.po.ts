import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';
import { EXUI_TIMEOUTS, CCD_CASE_REFERENCE_LENGTH, MAX_NAVIGATION_RETRY_ATTEMPTS } from './exui-timeouts';

export class FindCasePage extends Base {
  // Locators
  readonly pageHeading = this.page.locator('main h1');
  readonly resetFilterButton = this.page.locator('button[type="reset"]');
  readonly showHideFilterButton = this.page.locator('.search-block button[aria-controls]').first();
  readonly container = this.page.locator('exui-case-home');
  readonly filtersContainer = this.page.locator('.search-block .hmcts-filter-layout__filter');
  readonly applyFilterButton = this.page.locator('.search-block button[type="submit"]');
  readonly jurisdictionSelect = this.page.locator('#s-jurisdiction, #wb-jurisdiction, #cc-jurisdiction').first();
  readonly caseTypeSelect = this.page.locator('#s-case-type, #wb-case-type, #cc-case-type').first();
  readonly ccdCaseReference = this.page
    .locator(String.raw`#dynamicFilters #\[CASE_REFERENCE\], input[id*="CASE_REFERENCE"]`)
    .first();
  readonly pagination = this.page.locator('.ngx-pagination');
  readonly searchResultsContainer = this.page.locator('#search-result');
  readonly searchResultsSummary = this.page.locator('#search-result .pagination-top');
  readonly searchResultsTable = this.page.locator('ccd-search-result#search-result');
  readonly searchResultsDataTable = this.searchResultsTable.locator('table').first();
  readonly firstRowOfSearchResultsTable = this.searchResultsTable.locator('.govuk-link').first();
  readonly workBasketFilterPanel = this.page.locator('ccd-search-filters-wrapper').first();
  readonly findCaseLinkOnMenu = this.page
    .locator('.hmcts-primary-navigation__nav .hmcts-primary-navigation__link[href*="case-search"]')
    .first();
  readonly findCaseLinkOnTopRight = this.page
    .locator('.hmcts-primary-navigation__search .hmcts-primary-navigation__link[href*="case-search"]')
    .first();

  /**
   * Opens the Find Case page from the main navigation menu.
   */
  public async openFromMainMenu(): Promise<void> {
    await this.openFindCaseVia(this.findCaseLinkOnMenu);
  }

  /**
   * Opens the Find Case page from the top-right navigation link.
   */
  public async openFromTopRight(): Promise<void> {
    await this.openFindCaseVia(this.findCaseLinkOnTopRight);
  }

  /**
   * Navigates to the Find Case page and ensures filter panel is visible.
   */
  public async navigateToFindCase(): Promise<void> {
    for (let attempt = 1; attempt <= MAX_NAVIGATION_RETRY_ATTEMPTS; attempt++) {
      await this.openFromMainMenu();
      try {
        await this.ensureFiltersVisible();
        return;
      } catch (error) {
        const jurisdictionBootstrapFailed = this.hasJurisdictionBootstrapFailure();
        const filterTimeout = this.isFindCaseFilterTimeout(error);
        const shouldRetry = attempt < MAX_NAVIGATION_RETRY_ATTEMPTS && (jurisdictionBootstrapFailed || filterTimeout);
        if (!shouldRetry) {
          throw error;
        }

        this.logger.warn('Find case filter bootstrap failed; retrying case search page', {
          attempt,
          maxAttempts: MAX_NAVIGATION_RETRY_ATTEMPTS,
          jurisdictionBootstrapFailed,
          filterTimeout,
          error: error instanceof Error ? error.message : JSON.stringify(error),
        });
        await this.page.waitForTimeout(EXUI_TIMEOUTS.CREATE_CASE_RETRY_BACKOFF);
        await this.page.goto('/cases');
        await this.exuiSpinnerComponent.wait();
      }
    }
  }

  /**
   * Fills the Find Case search criteria fields.
   *
   * @param caseNumber - 16-digit CCD case reference
   * @param caseType - Case type display label (e.g., "Public Law Applications")
   * @param jurisdiction - Jurisdiction display label (e.g., "Public Law")
   */
  public async fillSearchCriteria(caseNumber: string, caseType: string, jurisdiction: string): Promise<void> {
    await this.jurisdictionSelect.selectOption({ label: jurisdiction });
    await this.caseTypeSelect.selectOption({ label: caseType });
    await this.ccdCaseReference.fill(caseNumber);
  }

  /**
   * Submits the Find Case search form.
   */
  public async submitSearch(): Promise<void> {
    await this.applyFilters();
  }

  /**
   * Complete Find Case journey: navigate, fill criteria, and submit search.
   *
   * This is a convenience method that orchestrates the full search flow.
   * For more control, use the individual methods:
   * - navigateToFindCase()
   * - fillSearchCriteria()
   * - submitSearch()
   *
   * @param caseNumber - 16-digit CCD case reference
   * @param caseType - Case type display label
   * @param jurisdiction - Jurisdiction display label
   */
  public async startFindCaseJourney(caseNumber: string, caseType: string, jurisdiction: string): Promise<void> {
    await this.navigateToFindCase();
    await this.fillSearchCriteria(caseNumber, caseType, jurisdiction);
    await this.submitSearch();
  }

  public async applyFilters(): Promise<void> {
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  /**
   * Clicks on a case in the search results table and navigates to its details page.
   *
   * Validates case reference format, waits for search results table,
   * and uses retry logic for navigation reliability.
   *
   * @param caseNumber - 16-digit CCD case reference (may include formatting)
   * @throws {Error} If case number format is invalid or navigation fails
   */
  public async displayCaseDetailsFor(caseNumber: string): Promise<void> {
    const normalizedCaseNumber = caseNumber.replaceAll(/\D/g, '');
    if (normalizedCaseNumber.length !== CCD_CASE_REFERENCE_LENGTH) {
      throw new Error(`Expected ${CCD_CASE_REFERENCE_LENGTH}-digit case reference, received "${caseNumber}"`);
    }

    await this.searchResultsDataTable.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN });

    const caseDetailsLink = this.searchResultsTable
      .locator(`a.govuk-link[href*="/cases/case-details/"][href*="${normalizedCaseNumber}"]`)
      .first();
    await caseDetailsLink.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN });
    await this.openCaseDetailsFromSearchResult(caseDetailsLink, normalizedCaseNumber, caseNumber);
  }

  private async ensureFiltersVisible() {
    const needsOpenFilterPanel = !(await this.jurisdictionSelect.isVisible().catch(() => false));
    if (needsOpenFilterPanel && (await this.showHideFilterButton.isVisible().catch(() => false))) {
      await this.showHideFilterButton.click();
    }

    await this.jurisdictionSelect.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE });
    await this.caseTypeSelect.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE });
    await this.ccdCaseReference.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE });
    await this.exuiCaseListComponent.filters.applyFilterBtn.waitFor({ state: 'visible' });
  }

  private hasJurisdictionBootstrapFailure(): boolean {
    return this.getApiCalls()
      .slice(-30)
      .some(
        (call) =>
          call.method === 'GET' &&
          call.status >= 500 &&
          call.url.includes('/aggregated/caseworkers/') &&
          call.url.includes('/jurisdictions')
      );
  }

  private isFindCaseFilterTimeout(error: unknown): boolean {
    const message = error instanceof Error ? error.message : (JSON.stringify(error) ?? '');
    return /locator\('#s-jurisdiction, #wb-jurisdiction, #cc-jurisdiction'\).*to be visible/i.test(message);
  }

  private async openFindCaseVia(link: Locator): Promise<void> {
    await link.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE });
    await link.click();
    await this.page.waitForURL(/\/cases\/case-search/, { timeout: EXUI_TIMEOUTS.GLOBAL_SEARCH_NAVIGATION });
    await this.exuiSpinnerComponent.wait();
  }

  /**
   * Attempts to navigate to case details from search result with retry logic.
   *
   * CCD navigation can occasionally fail due to timing issues.
   * This method retries the click operation up to MAX_NAVIGATION_RETRY_ATTEMPTS times.
   *
   * @private
   * @param searchResultCaseLink - Locator for the case link in search results
   * @param caseNumberFromUrl - Normalized case number to verify in URL
   * @param originalCaseNumber - Original case number for error messages
   * @throws {Error} If navigation fails after all retry attempts
   */
  private async openCaseDetailsFromSearchResult(
    searchResultCaseLink: Locator,
    caseNumberFromUrl: string,
    originalCaseNumber: string
  ): Promise<void> {
    for (let attemptIndex = 0; attemptIndex < MAX_NAVIGATION_RETRY_ATTEMPTS; attemptIndex++) {
      await searchResultCaseLink.scrollIntoViewIfNeeded();
      await searchResultCaseLink.click();
      await this.exuiSpinnerComponent.wait();
      if (await this.waitForCaseDetailsUrl(caseNumberFromUrl, EXUI_TIMEOUTS.CASE_DETAILS_NAVIGATION)) {
        return;
      }
    }

    throw new Error(`Navigation to case details did not complete for ${originalCaseNumber}. Current URL: ${this.page.url()}`);
  }

  private async waitForCaseDetailsUrl(caseNumber: string, timeoutMs: number): Promise<boolean> {
    try {
      await this.page.waitForURL((url) => url.pathname.includes('/cases/case-details/') && url.pathname.includes(caseNumber), {
        timeout: timeoutMs,
      });
      return true;
    } catch {
      return false;
    }
  }

  constructor(page: Page) {
    super(page);
  }
}
