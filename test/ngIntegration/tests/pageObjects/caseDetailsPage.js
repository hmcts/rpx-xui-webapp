const BrowserWaits = require('../../../e2e/support/customWaits');

class CaseDetailsPage{

    constructor(){
        this.ccdCaseDetailsContainer = $('exui-case-details-home');
        this.exuiAlert = $('exui-alert');

        this.caseTitle = $('.title');
        this.eventTriggerContainer = $('ccd-event-trigger');


    }

    async amOnPage(){
        try{
            await this.waitForPage();
            return true;
        }catch(err){
            console.log("Case details page is not displayed.", err);
            return false;
        }
    }

    async waitForPage(){
        await BrowserWaits.waitForElement(this.ccdCaseDetailsContainer); 
    }

    async isAlertMessageDisplayed(){
        await this.amOnPage();
        return await this.exuiAlert.isDisplayed(); 
    }

    async getAlertMessageText() {
        if(await this.isAlertMessageDisplayed()){
            return await this.exuiAlert.getText();
        }else{
            throw new error("Alert/notification  message is not displayed or disappeared.");
        } 
    }

    async isCaseTitleDisplayed(){
        await this.amOnPage();
        return await this.caseTitle.isDisplayed();
    }

    async getCaseTitle() {
        await this.amOnPage();
        return await this.caseTitle.getText();
    }

    async isEventTriggerDisplayed(){
        await this.amOnPage();
        return await this.eventTriggerContainer.isDisplayed();
    }

    async GetEvents(){
        const isTriggerElementDisplayed = this.isEventTriggerDisplayed();
        if (!isTriggerElementDisplayed){
            throw new Error("Event trigger element not displayed");
        }
        const eventsCount = await this.eventTriggerContainer.$$('option').count();
        const events = [];
        for (let eventCounter = 0; eventCounter < eventsCount; eventCounter++){
            events.push(await this.eventTriggerContainer.$$('option')[eventCounter].getText());
        }
        return events;
    }

    async selectNextStepEvent(eventName){
        await await this.eventTriggerContainer.$(`option[title = ${eventName}]`).click() 
    }

    async isEventTriggetGoButtonEnabled(){
        await this.amOnPage();
        return this.eventTriggerContainer.$('button').isEnabled();
    }
    async clickEventTriggerGoButton() {
        await this.amOnPage();
        if (await isEventTriggetGoButtonEnabled()){
            return this.eventTriggerContainer.$('button').click();
        }else{
            throw new error("Event trigger Go button not enabled");
        }
    }
    
}

module.exports = new CaseDetailsPage(); 
