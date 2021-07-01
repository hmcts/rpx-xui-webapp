const BrowserWaits = require('../../../e2e/support/customWaits');
const reportLogger = require('../../../e2e/support/reportLogger');

const SoftAssert = require('../../util/softAssert');
const date = require('moment');
class CaseEdit {

    checkYourAnswersPageElement = $(".check-your-answers");
    continueBtn = $('ccd-case-edit .form > .form-group button[type = "submit"]');
    previousBtnInEditPage = $('ccd-case-edit .form > .form-group button.button-secondary');
    cancelLinkInEditPage = $('ccd-case-edit .form .cancel a');

    submitBtn = $('ccd-case-edit-submit form > .form-group button[type = "submit"]');
    previousBtnInSubmitPage = $('ccd-case-edit-submit form > .form-group button.button-secondary');
    cancelLinkInSubmitPage = $('ccd-case-edit-submit form .cancel a')

    checkYourAnswersHeading = $('.check-your-answers>.heading-h2');
    checkYourAnswersHeadingDescription = $('.check-your-answers>span');

    checkYourAnswersSummaryRows = $$('.check-your-answers .form-table tr');

    validationAlertSummaryContainer = $('.govuk-error-summary[role="alert"]');
    callbackErrorSummaryContainer = $('.error-summary[role="status"]');



    async waitForPage() {
        await BrowserWaits.waitForElement($('ccd-case-edit-page'));
    }

    async amOnPage(){
        try{
            await this.waitForPage();
            return true; 
        }catch(error){
            reportLogger.AddMessage("Error waiting for case edit page :" +error);
            return false;
        }
    }

    async isValidationAlertSummaryDisplayed(){
        try {
            await BrowserWaits.waitForElement(this.validationAlertSummaryContainer);
            return true;
        } catch (error) {
            reportLogger.AddMessage("Validation error not displayed" + error);
            return false;
        }
    }

    async isValidationAlertMessageDisplayed(errorMessage){
        expect(await this.isValidationAlertSummaryDisplayed(),"Error summary not displayed").to.be.true;
        const errorSummaryText = await this.validationAlertSummaryContainer.getText();
        return errorSummaryText.includes(errorMessage);
    }

    async getValidationAlertMessageDisplayed(){
        expect(await this.isValidationAlertSummaryDisplayed(), "Error summary not displayed").to.be.true;
        const errorSummaryText = await this.validationAlertSummaryContainer.getText();
        return errorSummaryText;
    }


    async isCallbackErrorSummaryDisplayed() {
        try {
            await BrowserWaits.waitForElement(this.callbackErrorSummaryContainer);
            return true;
        } catch (error) {
            reportLogger.AddMessage("Error waiting for error summary banner :" + error);
            return false;
        }
    }

    async isCallbackErrorMessageDisplayed(errorMessage) {
        expect(await this.isValidationAlertSummaryDisplayed(), "Callback Error summary not displayed").to.be.true;
        const errorSummaryText = await this.callbackErrorSummaryContainer.getText();
        return errorSummaryText.includes(errorMessage);
    }

    async isFieldLevelValidationErrorDisplayed(fieldId){
        const fieldElementVaidationError = element(by.xpath(`//*[contains(@id,'${fieldId}')]/ancestor::*[contains(@class,"form-group-error")] | //*[contains(@id,'${fieldId}')]//span[contains(@class,'error-message')] `));
        return await fieldElementVaidationError.isPresent();
    }


    async getPageTitle(){
        return await $('ccd-case-edit-page h1').getText();
    }

    async waitForField(caseFieldId) {
        await BrowserWaits.waitForElement($('#' + caseFieldId));
    }

    async isFieldDisplayed(fieldConfig) {
        let fieldId = null;
        if (fieldConfig.field_type.type === "Complex") {
            fieldId = fieldConfig.id + "_" + fieldConfig.id
        } else {
            fieldId = fieldConfig.id
        }
        const fieldIsPresent = await $('#' + fieldId).isPresent();
        if (!fieldIsPresent) {
            return fieldIsPresent;
        }
        return await $('#' + fieldId).isDisplayed();
    }

    async isFieldPresent(fieldConfig) {
        let fieldId = null;
        if (fieldConfig.field_type.type === "Complex") {
            fieldId = fieldConfig.id + "_" + fieldConfig.id
        } else {
            fieldId = fieldConfig.id
        }
        return await $('#' + fieldId).isPresent()
    }

    async getFieldLabel(caseFieldId) {
        let fieldElement = element(by.xpath(`//*[@id="${caseFieldId}"]`));
        let fieldTagName = "";
        do {
            fieldElement = fieldElement.element(by.xpath(".."));
            fieldTagName = await fieldElement.getTagName();
        } while (fieldTagName !== "ccd-field-write");

        const fieldLabel = fieldElement.element(by.xpath('//*[contains(@class, "form-label")]')).getText();
        return fieldLabel;
    }

    getFieldId(fieldId, parentId) {
        let domId = null;
        if (parentId) {
            domId = parentId + "_" + fieldId;
        }
        else {
            domId = fieldId;
        }
        return domId;
    }

    getComplexFieldId(fieldId, parentId) {
        let domId = null;
        if (parentId) {
            domId = parentId + "_" + fieldId + "_" + fieldId;
        }
        else {
            domId = fieldId + "_" + fieldId;
        }
        return domId;
    }

    async inputTextField(fieldConfig, inputtext, parentId) {
        let inputValue = null;
        if (inputtext) {
            inputValue = inputtext;
        } else {
            inputValue = fieldConfig.label ? fieldConfig.label + "Test" : fieldConfig.id + " Test";
        }

        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).clear();
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).sendKeys(inputValue);
        return inputValue;
    }

    async inputPostCode(fieldConfig, value, parentId) {
        // await ccdField.$('.form-control').sendKeys("SW1");
        // await ccdField.$('button').click();
        // var addressSelectionField = ccdField.$('select.form-control')
        // await BrowserWaits.waitForElement(addressSelectionField);
        // var addressToSelect = addressSelectionField.$("option:nth-of-type(2)");
        // await BrowserWaits.waitForElement(addressToSelect);
        // await addressToSelect.click()
        let inputValue = null;
        if (value) {
            inputValue = value;
        } else {
            inputValue = "SW20 9DJ";
        }

        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).clear();
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).sendKeys(inputValue);
        return inputValue;
    }

    async inputNumberField(fieldConfig, inputNumber, parentId) {
        let inputValue = null;
        if (inputNumber) {
            inputValue = inputNumber;
        } else {
            inputValue = 12345;
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).sendKeys(inputValue);
        return inputValue.toString();
    }

    async inputYesOrNoField(fieldConfig, inputOption, parentId) {

        let inputoptionId = null;
        if (inputOption) {
            inputoptionId = fieldConfig.id + "_" + inputOption;
        } else {
            inputoptionId = fieldConfig.id + "_Yes";
        }

        if(parentId) inputoptionId = parentId +"_"+ inputoptionId;

        await $(`#${inputoptionId}`).click();
        // return inputoptionId.includes("Yes");
        return "Yes";
    }

    async inputFixedRadioListField(fieldConfig, inputOption, parentId) {

        let inputoptionId = null;
        let selectedVal = null;
        if (inputOption) {
            inputoptionId = inputOption;
        } else {
            selectedVal = fieldConfig.field_type.fixed_list_items[0];
            inputoptionId = selectedVal;
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}-${inputoptionId.code}`).click();

        return inputoptionId;
    }

    async inputFixedListField(fieldConfig, inputOption, parentId) {

        let inputoptionId = null;
        let selectedVal = null;
        if (inputOption) {
            selectedVal = inputOption;
        } else {
            selectedVal = fieldConfig.field_type.fixed_list_items[0];
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)} option[ng-reflect-ng-value="${selectedVal.code}"]`).click();
        return selectedVal;
    }


    async inputMultiSelectListField(fieldConfig, inputOptions, parentId) {
        let inputoptionId = [];
        let selectedVal = [];
        if (inputOptions) {
            selectedVal = inputOptions;
        } else {
            selectedVal = fieldConfig.field_type.fixed_list_items;
        }
        for (const option of selectedVal) {

            await $(`#${this.getFieldId(fieldConfig.id, parentId)} #${this.getFieldId(fieldConfig.id, parentId)}-${option.code}`).click();

        }
        return selectedVal;
    }

    async inputEmailField(fieldConfig, email, parentId) {
        let inputEmail = null;
        if (email) {
            inputEmail = fieldConfig.id + "-" + inputOption;
        } else {
            inputEmail = "test@test.com";
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).sendKeys(inputEmail);
        return inputEmail
    }

    async inputComplexField(fieldConfig, value, parentid) {
        let fieldValue = {}

        if (fieldConfig.field_type.id === "AddressGlobalUK" || fieldConfig.field_type.id === "AddressUK") {
            return await this.inputaddressGlobalUK(fieldConfig, value, parentid);
        }

        if (fieldConfig.field_type.id === "AddressGlobalUK") {
            return await inputOrganisationField(fieldConfig, value, parentid);
        }

        let thisFieldId = null;
        if (parentid) {
            thisFieldId = parentid + "_" + fieldConfig.id;
        }
        else {
            thisFieldId = fieldConfig.id;
        };
        for (const complexFiedlConfig of fieldConfig.field_type.complex_fields) {
            fieldValue[complexFiedlConfig.id] = await this.inputCaseField(complexFiedlConfig, value ? value[complexFiedlConfig.id] : null, thisFieldId);
        }
        return fieldValue;
    }

    async inputaddressGlobalUK(fieldConfig, value, parentid) {
        // await BrowserWaits.waitForSeconds(600);
        // let thisFieldId = this.getFieldId(`${fieldConfig.id}_${fieldConfig.id}`, parentid);

        let fieldValue = {};
        let complexId ='';
        if(parentid == undefined) complexId = `${fieldConfig.id}_${fieldConfig.id}`;
        if(parentid) complexId = `${parentid}_${fieldConfig.id}_${fieldConfig.id}`;
        let postCodeInput=$(`#${complexId}_postcodeLookup input`);

        const postCodeFindAddressBtn = $(`#${complexId}_postcodeLookup button`);
        const postCodeAddressSelect = $(`#${complexId}_addressList`);
        const postCodeAddressSelectOption = $(`#${complexId}_addressList option:nth-of-type(2)`);

        await postCodeInput.sendKeys('sw1');
        await postCodeFindAddressBtn.click();
        await BrowserWaits.waitForElement(postCodeAddressSelect);
        await BrowserWaits.waitForElement(postCodeAddressSelectOption);
        await postCodeAddressSelectOption.click();

        await BrowserWaits.waitForSeconds(2);

        for (const complexFiedlConfig of fieldConfig.field_type.complex_fields) {
            let prefix = parentid ? parentid+'_'+fieldConfig.id+'__detail' : fieldConfig.id+'__detail';
            let value = await $(`#${prefix}${complexFiedlConfig.id}`).getAttribute("value");
            fieldValue[complexFiedlConfig.id] = value;
        }

        return fieldValue;
    }

    async inputOrganisationField(fieldConfig, value, parentid) {
        const searchOrgInputText = $(`#${fieldConfig.id}_${fieldConfig.id} #search-org-text`);
        const orgResults = $$(`#${fieldConfig.id}_${fieldConfig.id} .scroll-container .td-select`);

        const organisationId = $(`#${fieldConfig.id}_${fieldConfig.id} ccd-write-organisation-complex-field input[@name = 'organisationID']`);
        const organisationName = $(`#${fieldConfig.id}_${fieldConfig.id} ccd-write-organisation-complex-field input[@name = 'organisationName']`);

        await searchOrgInputText.sendKeys("test");
        await BrowserWaits.waitForElement(orgResults);
        await orgResults.get(1).click();

        let fieldValue = {};
        fieldValue['organisationID'] = await organisationId.getAttribute("value");
        fieldValue['organisationName'] = await organisationName.getAttribute("value");
        return fieldValue;
    }
    async inputPhoneUKField(fieldConfig, inputPhone, parentId) {
        let inputPhoneNumber = null;
        if (inputPhone) {
            inputPhoneNumber = inputPhone;
        } else {
            inputPhoneNumber = "07123456789";
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).sendKeys(inputPhoneNumber);
        return inputPhoneNumber.toString();
    }

    async inputMoneyGBP(fieldConfig, moneyVal, parentId) {
        let moneyGBPVal = null;
        if (moneyVal) {
            moneyGBPVal = moneyVal;
        } else {
            moneyGBPVal = 10000;
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).sendKeys(moneyGBPVal);
        return moneyGBPVal*100+"";
    }

    async inputDate(fieldConfig, dateVal, parentId) {
        let inputDate = null;
        if (dateVal) {
            inputDate = dateVal;
        } else {
            inputDate = date().format('YYYY-MM-DD');
        }

        const parent = parentId ? `#${parentId}_${parentId}` : "";
        let datesValues = inputDate.split('-');
        reportLogger.AddMessage("Date field locator " + `${parent} #${fieldConfig.id}-day`);

        await $(`${parent} #${fieldConfig.id}-day`).sendKeys(datesValues[2]);
        await $(`${parent} #${fieldConfig.id}-month`).sendKeys(datesValues[1]);
        await $(`${parent} #${fieldConfig.id}-year`).sendKeys(datesValues[0]);
        return inputDate;
    }

    async inputDateTime(fieldConfig, dateVal, parentId) {
        let inputDate = null;
        if (dateVal) {
            inputDate = dateVal;
        } else {
            inputDate = date().format('YYYY-MM-DD');
        }

        let datesValues = inputDate.split('-');
        const parent = parentId ? `#${parentId}_${parentId}` : "";
        await $(`${parent} #${fieldConfig.id}-day`).sendKeys(datesValues[2]);
        await $(`${parent} #${fieldConfig.id}-month`).sendKeys(datesValues[1]);
        await $(`${parent} #${fieldConfig.id}-year`).sendKeys(datesValues[0]);

        await $(`${parent} #${fieldConfig.id}-hour`).sendKeys("02");
        await $(`${parent} #${fieldConfig.id}-minute`).sendKeys("30");
        await $(`${parent} #${fieldConfig.id}-second`).sendKeys("45");

        inputDate = `${inputDate}T02:30:45.000`;
        return inputDate;
    }

    async getSummaryPageDisplayElements() {
        await this.waitForChecYourAnswersPage();
        const isHeadingPresent = await this.checkYourAnswersHeading.isPresent();
        const isHeadingDescPresent = await this.checkYourAnswersHeadingDescription.isPresent();
        const summaryRowsCount = await this.checkYourAnswersSummaryRows.count();
        return { header: isHeadingPresent, headerDescription: isHeadingDescPresent, rows: summaryRowsCount }
    }

    async isCancelLinkInEditpageDisplayed() {
        await this.waitForPage();
        await browser.executeScript('arguments[0].scrollIntoView()', this.cancelLinkInEditPage);
        return await this.cancelLinkInEditPage.isDisplayed();
    }

    async clickCancelLinkInEditPage() {
        expect(await this.amOnPage(),"Not in case edit page").to.be.true;
        return await this.cancelLinkInEditPage.click();
    }

    async isCancelLinkInSubmitPageDisplayed() {
        await this.waitForPage();
        return await this.cancelLinkInSubmitPage.isDisplayed();
    }

    async clickCancelLinkInSubmitPage() {
        await this.waitForPage();
        return await this.cancelLinkInSubmitPage.click();
    }


    async isPreviousBtnInEditpageDisplayed() {
        await this.waitForPage();
        return await this.previousBtnInEditPage.isDisplayed();
    }

    async clickPreviousBtnInEditPage() {
        await this.waitForPage();
        return await this.previousBtnInEditPage.click();
    }

    async isPreviousBtnInSubmitPageDisplayed() {
        await this.waitForPage();
        return await this.previousBtnInSubmitPage.isDisplayed();
    }

    async clickPreviousBtnLinkInSubmitPage() {
        await this.waitForPage();
        return await this.previousBtnInSubmitPage.click();
    }


    getSubmitButton() {
        return this.submitBtn;
    }

    async clickSubmit() {
        await BrowserWaits.waitForElement(this.submitBtn);
        await browser.executeScript('arguments[0].scrollIntoView()',
            this.submitBtn)
        await this.submitBtn.click();
    }

    async selectRadioYesOrNo(fieldId, value) {
        let toSelect = value ? 'Yes' : 'No';
        let inputToSelect = $(`#${fieldId} input[id$='${toSelect}']`);
        await inputToSelect.click();
    }

    async clickContinue() {
        // await BrowserWaits.waitForElement(this.continueBtn);
        // await this.continueBtn.click();
        var continieElement = element(by.xpath('//button[@type= "submit"]'));
            await browser.executeScript('arguments[0].scrollIntoView()',
                continieElement.getWebElement())

            await BrowserWaits.waitForElement(continieElement);
            await BrowserWaits.waitForElementClickable(continieElement);

            var thisPageUrl = await browser.getCurrentUrl();
            console.log("Submitting : " + thisPageUrl )
            await continieElement.click();
    }

    async waitForChecYourAnswersPage() {
        await BrowserWaits.waitForElement(this.checkYourAnswersPageElement);

    }

    async isCheckYourAnswersPagePresent() {
        return await this.checkYourAnswersPageElement.isPresent();
    }

    async inputCaseField(fieldConfig, value, parentId) {
        // await BrowserWaits.waitForSeconds(1);
        // console.log(`******** input : parentId ${parentId} , value ${value}, fieldId ${fieldConfig.id}`);
        let fieldValue = null;
        switch (fieldConfig.field_type.type) {
            case "Text":
            case "TextArea":
                fieldValue = await this.inputTextField(fieldConfig, value, parentId);
                break;
            case "Postcode":
                fieldValue = await this.inputPostCode(fieldConfig, value, parentId);
                break;
            case "Number":
                fieldValue = await this.inputNumberField(fieldConfig, value, parentId);
                break;
            case "YesOrNo":
                fieldValue = await this.inputYesOrNoField(fieldConfig, value, parentId);
                break;
            case "Email":
                fieldValue = await this.inputEmailField(fieldConfig, value, parentId);
                break;
            case "Complex":
                fieldValue = await this.inputComplexField(fieldConfig, value, parentId);
                break;
            case "FixedRadioList":
                fieldValue = await this.inputFixedRadioListField(fieldConfig, value, parentId);
                fieldValue = fieldValue.code
                break;
            case "FixedList":
                fieldValue = await this.inputFixedListField(fieldConfig, value, parentId);
                fieldValue = fieldValue.code
                break;
            case "MultiSelectList":
                const multiSelectVal = await this.inputMultiSelectListField(fieldConfig, value, parentId);
                const fieldValues = [];
                for (const val of multiSelectVal){
                    fieldValues.push(val.code);
                }
                fieldValue = fieldValues; 
                break;
            case "PhoneUK":
                fieldValue = await this.inputPhoneUKField(fieldConfig, value, parentId);
                break;
            case "MoneyGBP":
                fieldValue = await this.inputMoneyGBP(fieldConfig, value, parentId);
                break;
            case "Date":
                fieldValue = await this.inputDate(fieldConfig, value, parentId);
                break;
            case "DateTime":
                fieldValue = await this.inputDateTime(fieldConfig, value, parentId);
                break;
        }
        reportLogger.AddMessage("Field set value for " + fieldConfig.field_type.type)
        reportLogger.AddJson(JSON.stringify(fieldValue))

        return fieldValue;
    }

    async validateCheckYourAnswersPage(eventConfig){
        const softAssert = new SoftAssert();
        softAssert.setScenario("Check yours answers page content");
        await softAssert.assert(async () => expect(await this.isCheckYourAnswersPagePresent(), "Not on check your answers page").to.be.true );
        
        const isHeadingPresent = await this.checkYourAnswersHeading.isPresent();
        const isHeadingDescPresent = await this.checkYourAnswersHeadingDescription.isPresent();
        const summaryRowsCount = await this.checkYourAnswersSummaryRows.count()
        if (eventConfig.show_summary) {
            await softAssert.assert(async() => expect(isHeadingPresent, "Check your answers header text not displayed").to.be.true);
            await softAssert.assert(async() => expect(isHeadingDescPresent, "Check your answers header description text not displayed").to.be.true);
            await softAssert.assert(async() => expect(summaryRowsCount, "Check your answers summary rows count is 0").to.be.above(0));
        } else {
            await softAssert.assert(async() => expect(isHeadingPresent, "Check your answers header text displayed").to.be.false);
            await softAssert.assert(async() => expect(isHeadingDescPresent, "Check your answers header description text displayed").to.be.false);
            await softAssert.assert(async() => expect(summaryRowsCount, "Check your answers summary rows count is not 0").to.equal(0));
        }

        for (const caseField of eventConfig.case_fields){
            softAssert.setScenario(`"${caseField.label}" Field display for condition show_summary_change_option value "${caseField.show_summary_change_option}" validation`);
            const fieldHeader = element(by.xpath(`//ccd-case-edit-submit//*[contains(@class, "form-table")]//tr//th//span[text() = "${caseField.label}"]`))
            const isFieldExpectedToDisplay = caseField.show_summary_change_option ? true : false;
            const onFailMessage = `case field ${caseField.label} with show_summary_change_option value ${caseField.show_summary_change_option} failed. is ${isFieldExpectedToDisplay ? "not displayed" : "displayed"} `;
            await softAssert.assert(async () => expect(await fieldHeader.isPresent(), onFailMessage ).to.equal(isFieldExpectedToDisplay));
        }
        softAssert.finally();
    }

}

module.exports = new CaseEdit(); 
