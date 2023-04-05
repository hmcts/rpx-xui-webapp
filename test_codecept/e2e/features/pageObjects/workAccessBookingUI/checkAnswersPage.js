

const browserWaits = require('../../../support/customWaits');

class CheckAnswersPage{
    constructor(){
        this.pageContainer = $('exui-booking-check'); 
        this.header = $('exui-booking-check h1');
        this.headerCaption = $('exui-booking-check h1 span');

        this.confirmButton = $('exui-booking-check button');
        this.cancelLink = $('exui-booking-check .govuk-button-group a');

        this.summaryList = $$('exui-booking-check .govuk-summary-list .govuk-summary-list__row');
    }

    async waitForPage(){
        await browserWaits.waitForElement(this.pageContainer);
    }

    async isKeyDisplayed(key){
        const summaryist = await this.getSummaryListDetails();

        const keyRow = summaryist.find(summaryItem => summaryItem.key.includes(key));
        return keyRow !== null; 
    }

    async iskeyWithValueDisplayed(key, value){
        const keyValueRow = summaryist.find(summaryItem => summaryItem.key.includes(key) && summaryItem.value.includes(value) );
        return keyValueRow !== null;
    }

    async clickChangeLinkForRowWithkey(key){
        const keyRow = summaryist.find(summaryItem => summaryItem.key.includes(key));
        
        if (!keyRow){
            throw new Error(`row with key ${key} is not found`);
        }
        await keyRow.change.click();
    }

    async getSummaryListDetails(){
        const count = await this.summaryList.count();

        const returnValues = [];
        for(let i = 0; i< count;i++){
            const row = await await this.summaryList.get(i);
            const key = await row.$('.govuk-summary-list__key').getText();
            const value = await row.$('.govuk-summary-list__value').getText(); 
            const changeLink = row.$('.govuk-summary-list__actions a'); 
           
            returnValues.push({
                key:key,
                value:value,
                change:changeLink 
            });
        }
        return returnValues;
    }
}

module.exports = new CheckAnswersPage(); 
