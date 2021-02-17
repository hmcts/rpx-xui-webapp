const BrowserWaits = require('../../../e2e/support/customWaits');
const reportLogger = require('../../../e2e/support/reportLogger');

class SearchCasePage {
    pageContainer = $('exui-search-case');
    dynamicFiltersContainer = $('#dynamicFilters');
    jurisdiction = $('#s-jurisdiction');
    caseType = $('#s-case-type');
    applyBtnWorkbasketFilters = $('ccd-search-filters button:not(.button-secondary)');
    resetBtnWorkbasketFilters = $('ccd-search-filters button.button-secondary]');

    
    async amOnPage() {
        try {
            await BrowserWaits.waitForElement(this.pageContainer);
            return true;
        } catch (error) {
            reportLogger.AddMessage("Error waiting for case list page " + error);
            return false;
        }
    }
    async isWorkbasketFilterDisplayed(fieldConfig) {
        await this.amOnPage();
        return await this.dynamicFiltersContainer.$(`#dynamicFilters .form-group #${fieldConfig.field.id}`).isDisplayed();
    }

    async selectJurisdiction(option) {
        await BrowserWaits.waitForElement(this.jurisdiction);

        var optionElement = this.jurisdiction.element(by.xpath("//*[text() ='" + option + "']"));
        await BrowserWaits.waitForElement(optionElement);

        await optionElement.click();
    }

    async selectCaseType(option) {
        await BrowserWaits.waitForElement(this.caseType);

        var optionElement = this.caseType.element(by.xpath("//*[text() = '" + option + "']"));
        await BrowserWaits.waitForElement(optionElement);

        await optionElement.click();
    }

    async clickApplySearchCaseFilters(){
        await this.amOnPage();
        await browser.executeScript('arguments[0].scrollIntoView()', this.applyBtnWorkbasketFilters);
        await this.applyBtnWorkbasketFilters.click(); 
    }


}

module.exports = new SearchCasePage();