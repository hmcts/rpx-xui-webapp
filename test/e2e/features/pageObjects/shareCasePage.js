
const BrowserWaits = require('../../support/customWaits');
const { browser } = require('protractor');
class ShareCasePage {

    constructor() {
        this.shareCaseContainer = $('exui-case-share');
        this.selectedCases = $$('xuilib-selected-case-list xuilib-selected-case'); 
    }

    async waitForPageToLoad(){
        BrowserWaits.waitForElement(this.shareCaseContainer, undefined, "Share Case container not present");
        BrowserWaits.waitForElement(this.selectedCases, undefined, "Share Case selected list not present")
    }
    async amOnPage() {
        await waitForPageToLoad();
        return this.shareCaseContainer.isPresent();
    }

    async casesCount(){
        await waitForPageToLoad();
        return await this.selectedCases.count(); 
    }
}

module.exports = ShareCasePage;