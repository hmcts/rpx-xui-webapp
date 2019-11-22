
const BrowserWaits = require('../../support/customWaits');
class CaseListPage{

    constructor(){
        this.caselistComponent = $('.case-list-component');

        this.jurisdictionSelectElement = $("#wb-jurisdiction");
        this.caseTypeSelectElement = $("#wb-case-type");
        this.stateSelectElement = $("#wb-case-state");

        this.searchApplyBtn = $("ccd-workbasket-filters form button:not(.button-secondary)");
        this.searchReset = $("ccd-workbasket-filters form button.button-secondary");

        this.searchFilterContainer = $("ccd-workbasket-filters form");

        this.searchResultsTopPagination = $("ccd-search-result .pagination-top");
        this.noResultsNotification = $("ccd-search-result .notification");

        this.caseListRows = $$("ccd-search-result>table>tbody>tr");

    }

    async amOnPage(){
        return this.caselistComponent.isPresent(); 
    }

    async _waitForSearchComponent(){
        await BrowserWaits.waitForElement(this.searchFilterContainer);
    }

    _getOptionSelectorWithText(optionText){
        return by.xpath("//option[text() = '"+optionText+"']");
    }

    async selectJurisdiction(jurisdiction){
        await this._waitForSearchComponent();
        await this.jurisdictionSelectElement.element(this._getOptionSelectorWithText(jurisdiction)).click(); 
    }

    async selectCaseType(caseType) {
        await this._waitForSearchComponent();
        await this.caseTypeSelectElement.element(this._getOptionSelectorWithText(caseType)).click();
    }

    async selectState(state) {
        await this._waitForSearchComponent();
        await this.stateSelectElement.element(this._getOptionSelectorWithText(state)).click();
    }


    async clickSearchApplyBtn(){
  
        await this._waitForSearchComponent();
        await this.searchApplyBtn.click();
    }

    async clickSearchResetBtn() {
        await this._waitForSearchComponent();
        await this.searchReset.click();
    }


    async waitForCaseResultsToDisplay(){
        await BrowserWaits.waitForElement(this.searchResultsTopPagination);
    }

    async waitForNoCaseResultsToDisplay() {
        await BrowserWaits.waitForElement(this.noResultsNotification);
    }

    async hasCaseListAnyResults(){
        await this.searchResultsTopPagination.isPresent();
    }

    async clickFirstCaseLink(){
        let currentPageUrl = await browser.getCurrentUrl();
        await this.caseListRows.get(0).$("td:nth-of-type(1) a").click();    
        await BrowserWaits.waitForPageNavigation(currentPageUrl);
    }

    async getCountOfCasesListedInPage(){
        await this.caseListRows.count();
    }

}

module.exports = CaseListPage;