
const BrowserWaits = require("../../../support/customWaits");

class EXUIErrorMessageComponent{

    constructor(){
        this.component = $("exui-error-message");
        this.summaryTitle = this.component.$("h2#error-summary-title");

        this.summaryBody = this.component.$(".govuk-error-summary__body .govuk-list.govuk-error-summary__list");
    }


    async isDisplayed(){
        try{
            await BrowserWaits.waitForElement(this.component);
            return true;
        }catch(err){
            return false;
        }
    }

    async getSummaryTitle(){
        return await this.summaryTitle.getText();
    }

    async isMessageDisplayedInSummary(messagee){
        return await this.summaryBody.getText().includes(messagee);
    }

}

module.exports = new EXUIErrorMessageComponent();
