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

  public async openFromMainMenu(): Promise<void> {
    await this.openFindCaseVia(this.findCaseLinkOnMenu);
  }

  public async openFromTopRight(): Promise<void> {
    await this.openFindCaseVia(this.findCaseLinkOnTopRight);
  }

  async startFindCaseJourney(caseNumber: string, caseType: string, jurisdiction: string): Promise<void> {
    await this.openFromMainMenu();
    await this.ensureFiltersVisible();

    await this.jurisdictionSelect.selectOption({ label: jurisdiction });

    await this.caseTypeSelect.selectOption({ label: caseType });

    await this.ccdCaseReference.fill(caseNumber);

    await this.applyFilters();
  }

  public async applyFilters(): Promise<void> {
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  async displayCaseDetailsFor(caseNumber: string): Promise<void> {
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

  private async openFindCaseVia(link: Locator): Promise<void> {
    await link.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE });
    await link.click();
    await this.page.waitForURL(/\/cases\/case-search/, { timeout: EXUI_TIMEOUTS.GLOBAL_SEARCH_NAVIGATION });
    await this.exuiSpinnerComponent.wait();
  }

  private async openCaseDetailsFromSearchResult(
    searchResultCaseLink: Locator,
    caseNumberFromUrl: string,
    originalCaseNumber: string
  ): Promise<void> {
    for (let attempt = 1; attempt <= MAX_NAVIGATION_RETRY_ATTEMPTS; attempt++) {
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
