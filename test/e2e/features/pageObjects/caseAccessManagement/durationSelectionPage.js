
const BrowserWaits = require('../../../support/customWaits');
class SpecificAccessDuration {

    constructor() {
        this.container = $('exui-specific-access-duration');
        this.header = this.container.$('h1');
        this.headerCaption = this.container.$('h1 span');

        this.errorMessage = $('#error-message');
        this.radioOptions = this.container.$$(".govuk-radios");

        this.anotherPeriodValidationIndicator = $('exui-specific-access-duration #conditional-contact-3.form-group-error');

    }


    async isDisplayed() {
        try {
            await BrowserWaits.waitForElement(this.container);
            return await this.container.isDisplayed();
        }
        catch (err) {
            console.log(err);
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


    async isDateInputWithLabelDisplayed(label) {
        const dateInput = this.getDateInputFieldWithLabel(label);
        return await dateInput.isPresent() && await dateInput.isDisplayed();
    }

    async enterDayInDateInputWithLabel(label, val) {
        const dayField = this.getFieldFromDatInput(label, 'Day');
        await dayField.clear();
        await dayField.sendKeys(val);
    }

    async enterMonthInDateInputWithLabel(label, val) {
        const monthField = this.getFieldFromDatInput(label, 'Month');
        await monthField.clear()
        await monthField.sendKeys(val);
    }

    async enterYearInDateInputWithLabel(label, val) {
        const yearField = this.getFieldFromDatInput(label, 'Year');
        await yearField.clear();
        await yearField.sendKeys(val);
    }

    async isDateInputWithLabelDisplayed(label) {
        const dateInput = this.getDateInputFieldWithLabel(label);
        return await dateInput.isPresent() && dateInput.isDisplayed();
    }

    async isValidationErrorDisplayedForDateInput(label) {
        const errorMessageElement = this.getDateInputErrorMessageElement(label);
        const isPresent = await errorMessageElement.isPresent();
        if (!isPresent){
            return isPresent;
        }
        const isDisplayed = await errorMessageElement.isDisplayed()

        return isDisplayed;
    }

    async getAnotherPeriodValidationMessageForField(label) {
        const errorMessageElement = this.getDateInputErrorMessageElement(label);
        return errorMessageElement.getText();
    }

    getDateInputErrorMessageElement(forFieldWithLabel) {
        return element(by.xpath(`//div[contains(@class,'govuk-radios__conditional')]//legend[contains(text(),'${forFieldWithLabel}')]/parent::fieldset//span[contains(@class ,'govuk-error-message')]`));
    }

    getFieldFromDatInput(forFieldWithLabel, fieldLabel) {
        return element(by.xpath(`//div[contains(@class,'govuk-radios__conditional')]//legend[contains(text(),'${forFieldWithLabel}')]/parent::fieldset//label[contains(text() ,'${fieldLabel}')]/../../input`));
    }

    getDateInputFieldWithLabel(label) {
        return this.container.element(by.xpath(`//div[contains(@class,'govuk-radios__conditional')]//legend[contains(text(),'${label}')]/parent::fieldset`));
    }





}

module.exports = new SpecificAccessDuration();
