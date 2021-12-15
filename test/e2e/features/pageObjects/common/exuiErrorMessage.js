
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

    async isMessageDisplayedInSummary(message){
        const messages = await await this.summaryBody.getText();
        return messages.includes(message);
    }

    async getFieldLevelErrorMessage(fieldText){
        const formGroupErrorFieldElement = this.getFormGroupErrorFieldWithText(fieldText);
        expect(await formGroupErrorFieldElement.isPresent()).to.be.true

        const fieldLevelErrorMessageElement = formGroupErrorFieldElement.$('.govuk-error-message');
        return await fieldLevelErrorMessageElement.getText();
    }

    async isFieldLevelErrorDisplayed(fieldText){
        const formGroupErrorFieldElement = this.getFormGroupErrorFieldWithText(fieldText);
        return await formGroupErrorFieldElement.isPresent();
    }

    getFormGroupErrorFieldWithText(fieldtext){
        return element(by.xpath(`//div[contains(@class,'form-group-error')]//*[contains(text(),'${fieldtext}')]//ancestor::div[contains(@class,'form-group-error')]`));
    }

}

module.exports = new EXUIErrorMessageComponent();
