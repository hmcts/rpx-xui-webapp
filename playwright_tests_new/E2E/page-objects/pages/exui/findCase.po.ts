import { Page } from '@playwright/test';
import { Base } from "../../base";

export class FindCasePage extends Base  {
  // Locators
  readonly findCaseLinkOnMenu =  this.page.getByRole('link', { name: ' Find case ' });
  readonly showHideFilterButton = this.page.locator('.hmcts-action-bar__filter > button');
  readonly resetFilterButton  = this.page.getByRole('button',{ name: ' Reset filter '});
  readonly backToTopButton  = this.page.getByRole('button',{ name: 'Back to top'});
  readonly searchResults_caseLink = this.page.getByRole('link', { name: 'go to case with Case' });
  readonly caseReference  = this.page.getByRole('textbox', { name: 'Case reference', exact: true });
  readonly container = this.page.locator("exui-case-home");

  readonly jurisdictionSelect = this.page.locator("#s-jurisdiction")
  readonly caseTypeSelect = this.page.locator("#s-case-type")

  readonly textField0Input = this.page.locator("#TextField0")
  readonly ccdCaseReference = this.page.locator('#dynamicFilters #\\[CASE_REFERENCE\\]');
  readonly pagination = this.page.locator('.ngx-pagination');
  readonly searchResultsTable = this.page.locator('ccd-search-result#search-result');
  readonly firstRowOfSearchResultsTable = this.searchResultsTable.locator('.govuk-link').first();
  readonly workBasketFilterPanel = this.page.locator('.search-block .hmcts-filter-layout__filter ccd-search-filters-wrapper');

  async startFindCaseJourney(caseNumber,caseType,jurisdiction) : Promise<void> {
    await this.findCaseLinkOnMenu.click();
    await this.showHideButtons();
    await this.checkButtonVisibility();

    await this.jurisdictionSelect.waitFor({state:'visible'});
    await this.jurisdictionSelect.selectOption(jurisdiction);

    await this.caseTypeSelect.waitFor({state:'visible'});
    await this.caseTypeSelect.selectOption(caseType);

    await this.ccdCaseReference.waitFor({state:'visible'});
    await this.ccdCaseReference.fill(caseNumber);

    await this.applyFilters();
  }

  public async applyFilters(): Promise<void> {
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }


  async displayCaseDetailsFor(caseNumber : string) : Promise<void> {
    await this.firstRowOfSearchResultsTable.click();
    await this.page.waitForTimeout(10000);
  }

  async cleanData(searchTableRecords:any) : Promise<void> {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(searchTableRecords)) {
      if (key.trim() !== "" || key != " ") {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }

  private async checkButtonVisibility() {
    await this.exuiCaseListComponent.filters.applyFilterBtn.isVisible();
    await this.resetFilterButton.isVisible();
    await this.backToTopButton.isVisible();
  }

  private async showHideButtons() {
    // Clicking on Show/Hide button First time
    await this.showHideFilterButton.click();
    // ..and check WBFilter panel is NOT visible
    await this.workBasketFilterPanel.isHidden()
    // Clicking on Show/Hide button second time
    await this.showHideFilterButton.click();
    // ..and check WBFilter panel IS visible
    await this.workBasketFilterPanel.isEnabled();
  }

  constructor(page: Page) {
    super(page);
  }
}
