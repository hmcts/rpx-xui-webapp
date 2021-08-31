

class ChooseDuration{

    constructor(parent){
        this.container = parent.$('exui-choose-duration');
        this.header = this.container.$('h1');
        this.headerCaption = this.container.$('h1 span');

        this.errorMessage = $('#error-message');
        this.radioOptions = this.container.$$(".govuk-radios");

    }


    async isDisplayed() {
        try {
            await BrowserWaits.waitForElement(this.container);
            return await this.container.isDisplayed();
        }
        catch (err) {
            return false;
        }
    }

    async isValidationErrorMessageDisplayed() {
        try {
            await BrowserWaits.waitForElement(this.errorMessage);
            return await this.container.isDisplayed();
        }
        catch (err) {
            return false;
        }
    }

    async getValidationErrorMeessage() {

        const isMsgDisplayed = await this.isValidationErrorMessageDisplayed();
        if (!isMsgDisplayed) {
            throw new Error("Validation error message is not displayed.");
        }
        return await this.errorMessage.getText();
    }

    async getHeaderCaption() {
        return await this.headerCaption.getText();
    }

    async getHeaderText() {
        return await this.header.getText();

    }

    async getCountOfRadioOptions() {
        return await this.radioOptions.count();
    }

    async isRadioOptionPresent(radioLabel) {
        return await this.container.element(by.xpath(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]`)).isDisplayed();
    }

    async getRadioOptionInputElement(radioLabel) {
        return await this.container.element(by.xpath(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]//../input`));
    }

    async getRadioOptionCaptionText(radioLabel) {
        return await this.container.element(by.xpath(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]/parent::div[contains(@class,'govuk-radios__item')]//span`)).getText();
    }

    async selectRadioOption(radioLabel) {
        const radioInput = await this.getRadioOptionInputElement(radioLabel);
        await radioInput.click();
    }

    async isRadioOptionSelected(radioLabel) {
        const radioInput = await this.getRadioOptionInputElement(radioLabel);
        return await radioInput.isSelected();
    }


    async isDateInputWithLabelDisplayed(label){
            const dateInput = this.getDateInputFieldWithLabel(label);
            return await dateInput.isPresent() && await dateInput.isDisplayed();
    }

    async enterDayInDateInputWithLabel(label){
        const dateInput = this.getDateInputFieldWithLabel(label);
        const dayField = this.getFieldFromDatInput(dateInput,'Day');
    }

    async enterMonthInDateInputWithLabel(label) {
        const dateInput = this.getDateInputFieldWithLabel(label);
        const dayField = this.getFieldFromDatInput(dateInput, 'Month');
    }

    async enterYearInDateInputWithLabel(label) {
        const dateInput = this.getDateInputFieldWithLabel(label);
        const dayField = this.getFieldFromDatInput(dateInput, 'Year');
    }

    async isDateInputWithLabelDisplayed(){
        const dateInput = this.getDateInputFieldWithLabel(label);
        return await dateInput.isPresent() && dateInput.isDisplayed();
    }

    getFieldFromDatInput(dateInputLocator,fieldLabel){
        return dateInputLocator.element(by.xpath(`//label[contains(text() ,'${fieldLabel}')]/parent::div[contains(@class,'form-group')]//input`));
    }

    getDateInputFieldWithLabel(label){
        return this.container.element(by.xpath(`//div[contains(@class,'govuk-radios__conditional')]//legend[contains(text(),'${label}')]/parent::fieldset`));
    }



}

module.exports = ChooseDuration;
