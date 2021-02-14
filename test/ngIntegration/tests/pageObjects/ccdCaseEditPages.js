const BrowserWaits = require('../../../e2e/support/customWaits');
const reportLogger = require('../../../e2e/support/reportLogger');

class CaseEdit{

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


    async waitForPage(){
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

    async getPageTitle(){
        return await $('ccd-case-edit-page h1').getText();
    }

    async waitForField(caseFieldId){
        await BrowserWaits.waitForElement($('#' + caseFieldId)); 
    }

    async isFieldDisplayed(fieldConfig) {
        let fieldId = null;
        if (fieldConfig.field_type.type === "Complex"){
            fieldId = fieldConfig.id + "_"+ fieldConfig.id
        }else{
            fieldId = fieldConfig.id 
        }
        const fieldIsPresent = await $('#' + fieldId).isPresent();
        if (!fieldIsPresent){
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

    async getFieldLabel(caseFieldId){
        let fieldElement = element(by.xpath(`//*[@id="${caseFieldId}"]`));
        let fieldTagName = "";
        do{
            fieldElement = fieldElement.element(by.xpath("..")); 
            fieldTagName = await fieldElement.getTagName();
        } while (fieldTagName !== "ccd-field-write" );

        const fieldLabel = fieldElement.element(by.xpath('//*[contains(@class, "form-label")]')).getText();
        return fieldLabel; 
    }

    getFieldId(fieldId, parentId){
        let domId = null;
        if (parentId) {
            domId = parentId + "_" + fieldId;
        }
        else {
            domId = fieldId;
        }
        return domId; 
    }

    async inputTextField(fieldConfig, inputtext, parentId) {
        let inputValue = null;
        if (inputtext){
            inputValue = inputtext;
        }else{
            inputValue = fieldConfig.label ? fieldConfig.label + "Test" : fieldConfig.id + " Test";
        }
       
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).clear();
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).sendKeys(inputValue);
        return inputValue; 
    }

    async inputPostCode(fieldConfig, value){
        await ccdField.$('.form-control').sendKeys("SW1");
        await ccdField.$('button').click();
        var addressSelectionField = ccdField.$('select.form-control')
        await BrowserWaits.waitForElement(addressSelectionField);
        var addressToSelect = addressSelectionField.$("option:nth-of-type(2)");
        await BrowserWaits.waitForElement(addressToSelect);
        await addressToSelect.click()
    }

    async inputNumberField(fieldConfig, inputNumber, parentId){
        let inputValue = null;
        if (inputtext) {
            inputValue = inputNumber;
        } else {
            inputValue = 12345;
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).sendKeys(inputValue);
        return inputValue;  
    }

    async inputYesOrNoField(fieldConfig, inputOption, parentId) {
        
        let inputoptionId = null;
        if (inputOption) {
            inputoptionId = fieldConfig.id+"-"+inputOption;
        } else {
            inputoptionId = fieldConfig.id + "-Yes";
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)} #${inputoptionId}`).click();
        return inputoptionId.includes("Yes");
    }

    async inputFixedRadioListField(fieldConfig, inputOption, parentId) {

        let inputoptionId = null;
        let selectedVal = null;
        if (inputOption) {
            inputoptionId = inputOption;
        } else {
            selectedVal = fieldConfig.field_type.fixed_list_items[0].code;
            inputoptionId =  selectedVal;
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}-${inputoptionId}`).click();
        return selectedVal;
    }

    async inputFixedListField(fieldConfig, inputOption, parentId) {

        let inputoptionId = null;
        let selectedVal = null;
        if (inputOption) {
            selectedVal = inputOption; 
        } else {
            selectedVal = fieldConfig.field_type.fixed_list_items[0].code;
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)} option[ng-reflect-ng-value="${selectedVal}"]`).click();
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
        for (const option of selectedVal){
            await $(`#${this.getFieldId(fieldConfig.id, parentId)} #${option.code}`).click();

        }
        return selectedVal;
    }

    async inputEmailField(fieldConfig, email, parentId){
        let inputEmail = null;
        if (email) {
            inputEmail = fieldConfig.id + "-" + inputOption;
        } else {
            inputEmail = "test@test.com";
        }
        await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).sendKeys(inputEmail);
        return inputEmail
    }

    async inputComplexField(fieldConfig, value, parentid){
        let fieldValue = {}
       
        if (fieldConfig.field_type.id === "AddressGlobalUK" || fieldConfig.field_type.id === "AddressUK"){
            return await this.inputaddressGlobalUK(fieldConfig, value, parentid);
        }

        if (fieldConfig.field_type.id === "AddressGlobalUK"){
            return await inputOrganisationField(fieldConfig, value, parentid);
        }
        
        let thisFieldId = null;
        if (parentid){
            thisFieldId = parentid + "_" + fieldConfig.id;
        } 
        else{
            thisFieldId =  fieldConfig.id;
         }
        ;
        for (const complexFiedlConfig of fieldConfig.field_type.complex_fields){
            fieldValue[complexFiedlConfig.id] = await this.inputCaseField(complexFiedlConfig, value ? value[complexFiedlConfig.id]: null, thisFieldId);
        }

        return fieldValue; 
    }

    async inputaddressGlobalUK(fieldConfig, value, parentid) {
        // await BrowserWaits.waitForSeconds(600);
        // let thisFieldId = this.getFieldId(`${fieldConfig.id}_${fieldConfig.id}`, parentid);
       
        let fieldValue = {};
        const postCodeInput = $(`#${fieldConfig.id}_${fieldConfig.id} #postcodeLookup input`);
        const postCodeFindAddressBtn = $(`#${fieldConfig.id}_${fieldConfig.id} #postcodeLookup button`);
        const postCodeAddressSelect = $(`#${fieldConfig.id}_${fieldConfig.id} #selectAddress select`);
        const postCodeAddressSelectOption = $(`#${fieldConfig.id}_${fieldConfig.id} #selectAddress select option:nth-of-type(2)`);


        await postCodeInput.sendKeys('sw1');
        await postCodeFindAddressBtn.click();
        await BrowserWaits.waitForElement(postCodeAddressSelect);
        await BrowserWaits.waitForElement(postCodeAddressSelectOption);
        await postCodeAddressSelectOption.click();

        await BrowserWaits.waitForSeconds(10);

        for (const complexFiedlConfig of fieldConfig.field_type.complex_fields) {
            let value = await $(`#${this.getFieldId(complexFiedlConfig.id, fieldConfig.id )}`).getAttribute("value");
            fieldValue[complexFiedlConfig.id] = value;
        }

        return fieldValue;
    }

    async inputOrganisationField(fieldConfig, value, parentid){
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

    async getSummaryPageDisplayElements(){
        await this.waitForChecYourAnswersPage();
        const isHeadingPresent = await this.checkYourAnswersHeading.isPresent();
        const isHeadingDescPresent = await this.checkYourAnswersHeadingDescription.isPresent();
        const summaryRowsCount = await this.checkYourAnswersSummaryRows.count();
        return { header: isHeadingPresent, headerDescription: isHeadingDescPresent, rows: summaryRowsCount }
    }

    async isCancelLinkInEditpageDisplayed(){
        await this.waitForPage();
        return await this.cancelLinkInEditPage.isDisplayed(); 
    }

    async clickCancelLinkInEditPage() {
        expect(await this.amOnPage(),"Not in case edit page").to.be.true;
        return await this.cancelLinkInEditPage.click();
    }

    async isCancelLinkInSubmitPageDisplayed(){
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


    getSubmitButton(){
        return this.submitBtn;
    }

    async  clickSubmit() {
        await BrowserWaits.waitForElement(this.submitBtn);
        await browser.executeScript('arguments[0].scrollIntoView()',
            this.submitBtn)
        await this.submitBtn.click();
    }

    async  selectRadioYesOrNo(fieldId, value) {
        let toSelect = value ? 'Yes' : 'No';
        let inputToSelect = $(`#${fieldId} input[id$='${toSelect}']`);
        await inputToSelect.click();
    }

    async  clickContinue() {
        await BrowserWaits.waitForElement(this.continueBtn);
        await this.continueBtn.click();
    }

    async waitForChecYourAnswersPage(){
        await BrowserWaits.waitForElement(this.checkYourAnswersPageElement);
 
    }

    async isCheckYourAnswersPagePresent(){
        return await this.checkYourAnswersPageElement.isPresent(); 
    }

    async inputCaseField(fieldConfig, value, parentId){
        // await BrowserWaits.waitForSeconds(1);
        console.log(`******** input : parentId ${parentId} , value ${value}, fieldId ${fieldConfig.id}`);
        let fieldValue = null;
        switch (fieldConfig.field_type.type){
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
            case "Email":
                fieldValue = await this.inputEmailField(fieldConfig, value, parentId); 
                break;
            case "Complex":
                fieldValue = await this.inputComplexField(fieldConfig, value, parentId);
                break;
            case "FixedRadioList":
                fieldValue = await this.inputFixedRadioListField(fieldConfig, value, parentId);
                break;
            case "FixedList":
                fieldValue = await this.inputFixedListField(fieldConfig, value, parentId);
                break;
            case "MultiSelectList":
                fieldValue = await this.inputMultiSelectListField(fieldConfig, value, parentId);
                break;
         

        } 
        return fieldValue;
    }

    async validateCheckYourAnswersPage(eventConfig){
        expect(await this.isCheckYourAnswersPagePresent(),"Not on check your answers page").to.be.true;
        const isHeadingPresent = await this.checkYourAnswersHeading.isPresent();
        const isHeadingDescPresent = await this.checkYourAnswersHeadingDescription.isPresent();
        const summaryRowsCount = await this.checkYourAnswersSummaryRows.count()
        if (eventConfig.show_summary) {
            expect(isHeadingPresent, "Check your answers header text not displayed").to.be.true;
            expect(isHeadingDescPresent, "Check your answers header description text not displayed").to.be.true;
            expect(summaryRowsCount, "Check your answers summary rows count is 0").to.be.above(0);
        } else {
            expect(isHeadingPresent, "Check your answers header text displayed").to.be.false;
            expect(isHeadingDescPresent, "Check your answers header description text displayed").to.be.false;
            expect(summaryRowsCount, "Check your answers summary rows count is not 0").to.equal(0);
        }
    }

}

module.exports = new CaseEdit(); 
