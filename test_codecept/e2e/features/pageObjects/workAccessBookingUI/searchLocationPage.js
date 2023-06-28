const browserWaits = require('../../../support/customWaits');
class LocationPage {
    constructor() {
        this.pageContainer = $('exui-booking-location');
        this.pageHeader = $('exui-booking-location h1 span');
        this.pageHeaderCAption = $('exui-booking-location h1');

        this.inputTextHint = $('exui-booking-location .govuk-hint');
        this.locationSearchInput = $('exui-booking-location exui-search-location input');

        this.searchResults = $$('.mat-autocomplete-panel mat-option span');

    }
    async waitForPage(){
        await browserWaits.waitForElement(this.pageContainer);
    }
    async isDisplayed(){
        return await this.pageContainer.isDisplayed(); 
    }

    async inputLocationText(location) {
        await this.locationSearchInput.clear();
        await this.locationSearchInput.sendKeys(location);
    }

    async getSelectedLocation() {
        return await this.locationSearchInput.getAttribute('value');
    }

    async getSearchResultElements() {
        const count = await this.searchResults.count();
        const searchResultElements = [];
        for (let i = 0; i < count; i++) {
            const e = await this.searchResults.get(i);
            const eLabel = await e.getText();
            searchResultElements.push({
                label: eLabel, element: e
            });
        }
        return searchResultElements;
    }

    async getResultWithLocation(loc) {
        const searchResults = await this.getSearchResultElements();
        return searchResults.find(result => result.label.includes(loc))
    }

    async getSearchResultsCount(){
        return (await this.getSearchResultElements()).length; 
    }

    async selectResultLocationAtIndex(index){
        const searchResults = await this.getSearchResultElements();
        if (index >= searchResults.length){
            throw Error(`location search returned ${searchResults.length} results, cannot select result at index ${index}`);
        }
        await searchResults[index].element.click();
    } 

    async selectSearchResult(resultToSelect) {
        const searchResults = await this.getSearchResultElements();
        const toSelect = await this.getResultWithLocation(resultToSelect)
        if (toSelect) {
            await toSelect.element.click();
        } else {
            throw new Error(`${resultToSelect} is not found in search results`);
        }
    }
}

module.exports = new LocationPage(); 