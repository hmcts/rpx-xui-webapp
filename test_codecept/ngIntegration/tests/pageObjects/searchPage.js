const { $, $$ } = require('../../../helpers/globals');
const BrowserWaits = require('../../../e2e/support/customWaits');
const reportLogger = require('../../../codeceptCommon/reportLogger');

class SearchCasePage {
  get pageContainer() {
    return $('exui-search-case');
  }
  get dynamicFiltersContainer() {
    return $('#dynamicFilters');
  }
  get jurisdiction() {
    return $('#s-jurisdiction');
  }
  get caseType() {
    return $('#s-case-type');
  }
  get applyBtnWorkbasketFilters() {
    return $('ccd-search-filters button:not(.button-secondary)');
  }
  get resetBtnWorkbasketFilters() {
    return $('ccd-search-filters button.button-secondary');
  }
  get paginationInfotext() {
    return $('.pagination-top span');
  }
  get nextPageLink() {
    return $('.ngx-pagination .pagination-next a');
  }
  get paginationControlsContainer() {
    return $('.ngx-pagination');
  }
  get previousPageLink() {
    return $('.ngx-pagination .pagination-previous a');
  }
  get firstResultCaseLink() {
    return $('ccd-search-result>table>tbody>tr:nth-of-type(1)>td:nth-of-type(1)>a');
  }
  get searchResultsTopPagination() {
    return $('ccd-search-result .pagination-top');
  }

  async amOnPage() {
    try {
      await BrowserWaits.waitForElement(this.pageContainer);
      return true;
    } catch (error) {
      reportLogger.AddMessage('Error waiting for case list page ' + error);
      return false;
    }
  }

  async isWorkbasketFilterDisplayed(fieldConfig) {
    await this.amOnPage();
    let retryCounter = 0;
    return await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForSeconds(retryCounter * 3);
      retryCounter++;
      return await this.dynamicFiltersContainer.locator(`#dynamicFilters .form-group #${fieldConfig.field.id}`).isVisible();
    });
  }

  async selectJurisdiction(option) {
    await BrowserWaits.waitForElement(this.jurisdiction);
    const optionElement = this.jurisdiction.locator(`xpath=//*[text()='${option}']`);
    await BrowserWaits.waitForElement(optionElement);
    await optionElement.click();
  }

  async selectCaseType(option) {
    await BrowserWaits.waitForElement(this.caseType);
    const optionElement = this.caseType.locator(`xpath=//*[text()='${option}']`);
    await BrowserWaits.waitForElement(optionElement);
    await optionElement.click();
  }

  async clickApplySearchCaseFilters() {
    await this.amOnPage();
    await this.applyBtnWorkbasketFilters.scrollIntoViewIfNeeded();
    await this.applyBtnWorkbasketFilters.click();
  }

  async clickPaginationNextPage() {
    const beforeText = await this.paginationInfotext.textContent();
    expect(await this.nextPageLink.isVisible(), `Next page not present. Current: ${beforeText}`).to.be.true;
    await this.nextPageLink.scrollIntoViewIfNeeded();
    await this.nextPageLink.click();
    const afterText = await this.paginationInfotext.textContent();
    expect(afterText).to.not.equal(beforeText);
    await BrowserWaits.waitForElement(this.paginationControlsContainer);
  }

  async clickPaginationPreviousPage() {
    const beforeText = await this.paginationInfotext.textContent();
    expect(await this.previousPageLink.isVisible(), `Previous page not present. Current: ${beforeText}`).to.be.true;
    await this.previousPageLink.scrollIntoViewIfNeeded();
    await this.previousPageLink.click();
    const afterText = await this.paginationInfotext.textContent();
    expect(afterText).to.not.equal(beforeText);
    await BrowserWaits.waitForElement(this.paginationControlsContainer);
  }

  async openFirstCaseInResults() {
    await this.searchResultsTopPagination.isVisible();
    await BrowserWaits.waitForElement(this.firstResultCaseLink);
    const currentUrl = await page.url();
    await this.firstResultCaseLink.scrollIntoViewIfNeeded();
    await this.firstResultCaseLink.click();
    await BrowserWaits.waitForPageNavigation(currentUrl);
  }

  async nextStepTriggerActions() {
    const options = $$('ccd-event-trigger >form .form-group option');
    const count = await options.count();
    const values = [];
    for (let i = 0; i < count; i++) {
      values.push(await options.nth(i).textContent());
    }
    return values;
  }
}

module.exports = new SearchCasePage();
