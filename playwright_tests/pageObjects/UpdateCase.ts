import { Page, expect } from '@playwright/test';
import { SearchPage } from './SearchPage';

export class UpdateCase {
  private page: Page;
  private header = '.govuk-heading-xl';
  private jurisdiction = '#cc-jurisdiction';
  private caseType = '#cc-case-type';
  private applyButton = 'ccd-search-filters button:not(.button-secondary),ccd-workbasket-filters button:not(.button-secondary)';
  private resetButton = '#reset';
  private searchResultsTopPagination = 'ccd-search-result .pagination-top';
  private noResultsNotification = 'ccd-search-result .notification';
  private firstResultCaseLink = 'ccd-search-result>table>tbody>tr:nth-of-type(1)>td:nth-of-type(1)>a';

  constructor(page: Page) {
    this.page = page;
  }

  async selectJurisdiction(jurisdiction: string) {
    await this.page.waitForSelector(this.jurisdiction);
    await this.page.selectOption(this.jurisdiction, { label: jurisdiction });
  }

  async selectCaseType(caseType: string) {
    await this.page.waitForSelector(this.caseType);
    await this.page.selectOption(this.caseType, { label: caseType });
  }

  async clickApplyButton() {
    await this.page.waitForSelector(this.applyButton);
    await this.page.click(this.applyButton);
  }

  async clickResetButton() {
    await this.page.waitForSelector(this.resetButton);
    await this.page.click(this.resetButton);
  }

  async openFirstCaseInResults() {
    await this.page.waitForSelector(this.firstResultCaseLink);
    await this.page.click(this.firstResultCaseLink);
  }

  async amOnPage(header: string){
    await expect(this.page.getByRole('heading', { name: header })).toBeVisible();
  }

  async hasSearchReturnedResults(): Promise<boolean> {
    return await this.page.isVisible(this.searchResultsTopPagination);
  }

  async waitForAtleastOneSearchResult() {
    await this.page.waitForSelector(this.searchResultsTopPagination);
  }

  async waitForSearchWithNoResults() {
    await this.page.waitForSelector(this.noResultsNotification);
  }
}
