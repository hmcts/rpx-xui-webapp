const BrowserWaits = require('../../../e2e/support/customWaits');
const reportLogger = require('../../../e2e/support/reportLogger');

class SearchCasePage {
    pageContainer = $('exui-search-case');
    dynamicFiltersContainer = $('#dynamicFilters');
    jurisdiction = $('#s-jurisdiction');
    caseType = $('#s-case-type');
    applyBtnWorkbasketFilters = $('ccd-search-filters button:not(.button-secondary)');
    resetBtnWorkbasketFilters = $('ccd-search-filters button.button-secondary]');
    paginationInfotext = $(".pagination-top span");
    nextPageLink = $(".ngx-pagination .pagination-next a");
    paginationControlsContainer = $(".ngx-pagination");
    previousPageLink = $(".ngx-pagination .pagination-previous a");
    firstResultCaseLink = $("ccd-search-result>table>tbody>tr:nth-of-type(1)>td:nth-of-type(1)>a"); 
    searchResultsTopPagination = $("ccd-search-result .pagination-top");



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

    async clickPaginationNextPage(){
        let paginationInfobefore = await this.paginationInfotext.getText();
         expect(await this.nextPageLink.isPresent(), "Case list next page not present. current page info : " + paginationInfobefore).to.be.true 
        
         await browser.executeScript('arguments[0].scrollIntoView()',
             this.nextPageLink);
         await this.nextPageLink.click();
         let paginationInfoCurrent = await this.paginationInfotext.getText();
         expect(paginationInfoCurrent).to.not.equal(paginationInfobefore);
        
         await BrowserWaits.waitForElement(this.paginationControlsContainer, undefined, "Data load taking too long on pagination");
     }
 
     async clickPaginationPreviousPage() {
         let paginationInfobefore = await this.paginationInfotext.getText();
         expect(await this.previousPageLink.isPresent(), "Case list previous page not present. current page info : " + paginationInfobefore).to.be.true
 
         await browser.executeScript('arguments[0].scrollIntoView()',
             this.previousPageLink);
         await this.previousPageLink.click();
         let paginationInfoCurrent = await this.paginationInfotext.getText();
         expect(paginationInfoCurrent).to.not.equal(paginationInfobefore);
         await BrowserWaits.waitForElement(this.paginationControlsContainer,undefined,"Data load taking too long on pagination");
 
     }

     async openFirstCaseInResults(){
        await this.searchResultsTopPagination.isPresent();
        await BrowserWaits.waitForElement(this.firstResultCaseLink);
        var thisPageUrl = await browser.getCurrentUrl();
    
        await browser.executeScript('arguments[0].scrollIntoView()',
          this.firstResultCaseLink);
        await this.firstResultCaseLink.click();
    
        await BrowserWaits.waitForPageNavigation(thisPageUrl);
      }

      async nextStepTriggerActions() {
        let ccd_event_trigger = $$("ccd-event-trigger >form .form-group option");
        let eventCount = await ccd_event_trigger.count();
        let optionValues = [];
        let id = "next-step";
        for (let ecount = 1; ecount <= eventCount; ecount++) {
            let optionText = await element(by.xpath(`//*[@id='${id}']//option[${ecount}]`)).getText()
            optionValues.push(`${optionText}`);
        }
        return optionValues;
    }


}

module.exports = new SearchCasePage();