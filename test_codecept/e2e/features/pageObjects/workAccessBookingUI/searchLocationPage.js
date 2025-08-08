const { $, $$, getText } = require('../../../../helpers/globals');
const browserWaits = require('../../../support/customWaits');

class LocationPage {
  get pageContainer() { return $('exui-booking-location'); }
  get pageHeader() { return $('exui-booking-location h1 span'); }
  get pageHeaderCAption() { return $('exui-booking-location h1'); }
  get inputTextHint() { return $('exui-booking-location .govuk-hint'); }
  get locationSearchInput() { return $('exui-booking-location exui-search-location input'); }
  get searchResults() { return $$('.mat-autocomplete-panel mat-option span'); }

  async waitForPage() {
    await browserWaits.waitForElement(this.pageContainer);
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }

  async inputLocationText(location) {
    await this.locationSearchInput.clear();
    await this.locationSearchInput.fill(location);
  }

  async getSelectedLocation() {
    return await this.locationSearchInput.getAttribute('value');
  }

  async getSearchResultElements() {
    const count = await this.searchResults.count();
    const searchResultElements = [];
    for (let i = 0; i < count; i++) {
      const e = await this.searchResults.nth(i);
      const eLabel = await getText(e);
      searchResultElements.push({
        label: eLabel, element: e
      });
    }
    return searchResultElements;
  }

  async getResultWithLocation(loc) {
    const searchResults = await this.getSearchResultElements();
    return searchResults.find((result) => result.label.includes(loc));
  }

  async getSearchResultsCount() {
    return (await this.getSearchResultElements()).length;
  }

  async selectResultLocationAtIndex(index) {
    const searchResults = await this.getSearchResultElements();
    if (index >= searchResults.length) {
      throw Error(`location search returned ${searchResults.length} results, cannot select result at index ${index}`);
    }
    await searchResults[index].element.click();
  }

  async selectSearchResult(resultToSelect) {
    const searchResults = await this.getSearchResultElements();
    const toSelect = await this.getResultWithLocation(resultToSelect);
    if (toSelect) {
      await toSelect.element.click();
    } else {
      throw new Error(`${resultToSelect} is not found in search results`);
    }
  }
}

module.exports = new LocationPage();
