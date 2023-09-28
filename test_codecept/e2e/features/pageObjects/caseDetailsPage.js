
const { LOG_LEVELS } = require("../../support/constants");
const BrowserWaits = require("../../support/customWaits");
const CucumberReporter = require("../../../codeceptCommon/reportLogger");

const MessageBanner = require("./messageBanner");
class CaseDetailsPage{

    constructor(){
        this.caseDetailsContainer = $("exui-case-details-home");
        this.tabsContainer = $("mat-tab-header .mat-tab-label-container");
        
        this.messageBanner = new MessageBanner();
    }

    async isDisplayed(){
        return this.caseDetailsContainer.isPresent();
    }

    async amOnPage(){
        try{
            await BrowserWaits.waitForElement(this.caseDetailsContainer);
            return true;
        }catch(err){
            CucumberReporter.AddMessage(err.stack, LOG_LEVELS.Error);
            return false;
        }
    }

    async waitForTabHeader(){
        await BrowserWaits.waitForElement(this.tabsContainer);
    }

    async isTabWithLabelPresent(tabLabel){
        await this.waitForTabHeader();
        const tabElement = this.getTabElementWithLabel(tabLabel);
        return await tabElement.isPresent();
    }

    async isTabWithLabelSelected(tabLabel){
        await this.waitForTabHeader();
        const tabElement = this.getTabElementWithLabel(tabLabel);
        return (await tabElement.getAttribute('class')).includes('mat-tab-label-active');
    }

    async clickTabWithLabel(tabLabel){
        await this.waitForTabHeader();
        const tabElement = this.getTabElementWithLabel(tabLabel);
        await tabElement.click();
    }

    getTabElementWithLabel(tabLabel){
        return element(by.xpath(`//mat-tab-header//div[contains(@class,'mat-tab-list')]//div[contains(text(),'${tabLabel}')]//ancestor::div[contains(@class,'mat-tab-label') and @role='tab']`));
    }

    async openLinkedDocument() {
        let documentLink = $('tr.complex-panel-simple-field ccd-read-document-field a');
        await BrowserWaits.waitForElement(documentLink);
        await documentLink.click()
    }

    async openDummyFile() {
        let dummyLink = $('#case-viewer-field-read--DocumentUrl a');
        await BrowserWaits.waitForElement(dummyLink);
        await dummyLink.click()
    }

}

module.exports = new CaseDetailsPage();
