import { Page } from '@playwright/test';
import { Base } from '../../base';

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
  readonly ccdCaseReference = this.page.locator('#dynamicFilters #\\[CASE_REFERENCE\\], input[id*="CASE_REFERENCE"]').first();
  readonly pagination = this.page.locator('.ngx-pagination');
  readonly searchResultsSummary = this.page.locator('#search-result .pagination-top');
  readonly searchResultsTable = this.page.locator('ccd-search-result#search-result');
  readonly searchResultsDataTable = this.searchResultsTable.locator('table').first();
  readonly firstRowOfSearchResultsTable = this.searchResultsTable.locator('.govuk-link').first();
  readonly workBasketFilterPanel = this.page.locator('.search-block .hmcts-filter-layout__filter ccd-search-filters-wrapper');
  readonly findCaseLinkOnMenu = this.page.locator('.hmcts-primary-navigation__nav .hmcts-primary-navigation__link[href*="case-search"]').first();
  readonly findCaseLinkOnTopRight = this.page
    .locator('.hmcts-primary-navigation__search .hmcts-primary-navigation__link[href*="case-search"]')
    .first();

  public async openFromMainMenu(): Promise<void> {
    await this.findCaseLinkOnMenu.waitFor({ state: 'visible', timeout: 60000 });
    await this.findCaseLinkOnMenu.click();
    await this.page.waitForURL(/\/cases\/case-search/, { timeout: 60000 });
    await this.exuiSpinnerComponent.wait();
  }

  public async openFromTopRight(): Promise<void> {
    await this.findCaseLinkOnTopRight.waitFor({ state: 'visible', timeout: 60000 });
    await this.findCaseLinkOnTopRight.click();
    await this.page.waitForURL(/\/cases\/case-search/, { timeout: 60000 });
    await this.exuiSpinnerComponent.wait();
  }

  async startFindCaseJourney(caseNumber: string, caseType: string, jurisdiction: string): Promise<void> {
    await this.openFromMainMenu();
    await this.ensureFiltersVisible();

    await this.jurisdictionSelect.selectOption(jurisdiction);

    await this.caseTypeSelect.selectOption(caseType);

    await this.ccdCaseReference.fill(caseNumber);

    await this.applyFilters();
  }

  public async applyFilters(): Promise<void> {
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  async displayCaseDetailsFor(caseNumber: string): Promise<void> {
    await this.page.locator(`#search-result a.govuk-link[href*="${caseNumber}"]`).first().click();
    await this.exuiSpinnerComponent.wait();
  }

  private async ensureFiltersVisible() {
    const needsOpenFilterPanel = !(await this.jurisdictionSelect.isVisible().catch(() => false));
    if (needsOpenFilterPanel && (await this.showHideFilterButton.isVisible().catch(() => false))) {
      await this.showHideFilterButton.click();
    }

    await this.jurisdictionSelect.waitFor({ state: 'visible', timeout: 60000 });
    await this.caseTypeSelect.waitFor({ state: 'visible', timeout: 60000 });
    await this.ccdCaseReference.waitFor({ state: 'visible', timeout: 60000 });
    await this.exuiCaseListComponent.filters.applyFilterBtn.waitFor({ state: 'visible' });
  }

  constructor(page: Page) {
    super(page);
  }
}
