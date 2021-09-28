
const BrowserWaits = require("../../support/customWaits");
const CucumberReporter = require("../../support/reportLogger");

const MessageBanner = require("./messageBanner");
class CaseDetailsPage{

    constructor(){
        this.caseDetailsContainer = $("exui-case-details-home");
        this.tabsContainer = $("mat-tab-header .mat-tab-label-container");
        
        this.messageBanner = new MessageBanner();
    }

    async amOnPage(){
        try{
            await BrowserWaits.waitForElement(this.caseDetailsContainer);
            return true;
        }catch(err){
            CucumberReporter.AddMessage(err.stack);
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


}

module.exports = new CaseDetailsPage();
