import { Page } from '@playwright/test';
import { Base } from '../../base';

export class FindCasePage extends Base {
  // Locators
  readonly pageHeading = this.page.locator('main h1');
  readonly resetFilterButton = this.page.locator('button[type="reset"]');
  readonly showHideFilterButton = this.page.locator('.hmcts-action-bar__filter > button');
  readonly container = this.page.locator('exui-case-home');
  readonly filtersContainer = this.page.locator('.search-block .hmcts-filter-layout__filter');
  readonly applyFilterButton = this.page.locator('.search-block button[type="submit"]');
  readonly jurisdictionSelect = this.page.locator('#s-jurisdiction');
  readonly caseTypeSelect = this.page.locator('#s-case-type');
  readonly ccdCaseReference = this.page.locator('#dynamicFilters #\\[CASE_REFERENCE\\]');
  readonly pagination = this.page.locator('.ngx-pagination');
  readonly searchResultsSummary = this.page.locator('#search-result .pagination-top');
  readonly searchResultsTable = this.page.locator('ccd-search-result#search-result');
  readonly firstRowOfSearchResultsTable = this.searchResultsTable.locator('.govuk-link').first();
  readonly workBasketFilterPanel = this.page.locator('.search-block .hmcts-filter-layout__filter ccd-search-filters-wrapper');
  readonly findCaseLinkOnMenu = this.page.locator('.hmcts-primary-navigation__link[href*="case-search"]');

  async startFindCaseJourney(caseNumber: string, caseType: string, jurisdiction: string): Promise<void> {
    await this.findCaseLinkOnMenu.click();
    await this.showHideButtons();
    await this.checkButtonVisibility();

    await this.jurisdictionSelect.waitFor({ state: 'visible' });
    await this.jurisdictionSelect.selectOption(jurisdiction);

    await this.caseTypeSelect.waitFor({ state: 'visible' });
    await this.caseTypeSelect.selectOption(caseType);

    await this.ccdCaseReference.waitFor({ state: 'visible' });
    await this.ccdCaseReference.fill(caseNumber);

    await this.applyFilters();
  }

  public async applyFilters(): Promise<void> {
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  async displayCaseDetails(): Promise<void> {
    await this.firstRowOfSearchResultsTable.click();
    await this.exuiSpinnerComponent.wait();
  }

  private async checkButtonVisibility() {
    await this.exuiCaseListComponent.filters.applyFilterBtn.waitFor({ state: 'visible' });
    await this.resetFilterButton.waitFor({ state: 'visible' });
  }

  private async showHideButtons() {
    // Clicking on the Show / Hide button First time
    await this.showHideFilterButton.click();
    // .now check the WBFilter panel is NOT visible
    await this.workBasketFilterPanel.waitFor({ state: 'hidden' });
    // Clicking agin Show/Hide button
    await this.showHideFilterButton.click();
    // .and now check WBFilter panel IS visible
    await this.workBasketFilterPanel.waitFor({ state: 'visible' });
  }

  constructor(page: Page) {
    super(page);
  }
}
