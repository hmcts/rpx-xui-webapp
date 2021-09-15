
const BrowserWaits = require("../../../support/customWaits");

class ChooseRadioOptionComponent{

    constructor(){
        this.component = $("exui-choose-radio-option");

        this.header = this.component.$("h1");
        this.headerCaption = this.component.$("h1 span");

        this.radioOptions = this.component.$$(".govuk-radios");

        this.errorMessage = $('#error-message');
    }


    async isDisplayed(){
        try{
            await BrowserWaits.waitForElement(this.component);
            return await this.component.isDisplayed();
        }
        catch(err){
            return false;
        }
    }

    async isValidationErrorMessageDisplayed(){
        try {
            await BrowserWaits.waitForElement(this.errorMessage);
            return await this.component.isDisplayed();
        }
        catch (err) {
            return false;
        }
    }

    async getValidationErrorMeessage(){
        
        const isMsgDisplayed = await this.isValidationErrorMessageDisplayed();
        if (!isMsgDisplayed){
            throw new Error("Validation error message is not displayed.");
        }
        return this.errorMessage.getText();
    }

    async getHeaderCaption(){
        return this.headerCaption.getText();
    }

    async getHeaderText(){
        await this.isDisplayed();
        return this.header.getText();

    }

    async getCountOfRadioOptions(){
        return await this.radioOptions.count();
    }

    async isRadioOptionPresent(radioLabel){
        return await this.component.element(by.xpath(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]`)).isDisplayed();
    }

    async getRadioOptionInputElement(radioLabel){
        return await this.component.element(by.xpath(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]//../input`));
    }

    async selectRadioOption(radioLabel){
        const radioInput = await this.getRadioOptionInputElement(radioLabel);
        await radioInput.click();
    }

    async isRadioOptionSelected(radioLabel) {
        const radioInput = await this.getRadioOptionInputElement(radioLabel);
        return await radioInput.isSelected();
    }

}

module.exports = ChooseRadioOptionComponent;
