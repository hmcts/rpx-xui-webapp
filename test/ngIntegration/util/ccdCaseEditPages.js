const BrowserWaits = require('../../e2e/support/customWaits');


class CaseEdit{

    checkYourAnswersPageElement = $(".check-your-answers");
    continueBtn = $('ccd-case-edit .form > .form-group button[type = "submit"]');
    submitBtn = $('ccd-case-edit-submit form > .form-group button[type = "submit"]');

    async  inputCaseField(caseFieldId, inputtext) {
        await $(`#${caseFieldId}`).clear();
        await $(`#${caseFieldId}`).sendKeys(inputtext);
    }

    getSubmitButton(){
        return this.submitBtn;
    }

    async  clickSubmit() {
        await BrowserWaits.waitForElement(this.submitBtn);
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

}

module.exports = new CaseEdit(); 
