
var CreateCaseStartPage = require('../createCaseStartPage');
var BrowserWaits = require('../../../support/customWaits');
const date = require('moment');
var path = require('path');
var cucumberReporter = require('../../../support/reportLogger');

const { accessibilityCheckerAuditor } = require('../../../../accessibility/helpers/accessibilityAuditor');

class CaseManager {

    constructor() {
        this.continueBtn = new Button('button', 'Continue');

        this.submitBtn = $("form button[@type = 'submit']");
        this.previousBtn = $("form .button-secondary");
        this.cancelLink = $("form .cancel a");

        this.formFields = 'ccd-case-edit-form>div';

        this.ccdCaseEdit = $('ccd-case-edit')
        this.exuiCaseHomeComp = $("exui-case-home");
        this.checkYourAnswers = $(".check-your-answers");

        this.caseNextStepSelect = $("select#next-step");
        this.nextStepGoButton = $(".event-trigger button");
        this.createCaseStartPage = new CreateCaseStartPage();
    }

    async cancelCaseCreation(){
        await BrowserWaits.waitForElement(this.ccdCaseEdit);
        var thisPageUrl = await browser.getCurrentUrl();
        await BrowserWaits.waitForElement(this.cancelLink);
        await this.cancelLink.click();
        await BrowserWaits.waitForPageNavigation(thisPageUrl);
    }

    async clickPreviousButton(){
        await BrowserWaits.waitForElement(this.previousBtn); 
        var thisPageUrl = await browser.getCurrentUrl();
        await this.previousBtn.click();
        await BrowserWaits.waitForPageNavigation(thisPageUrl); 
    }

    async startCaseCreation(jurisdiction, caseType, event){
        await this.createCaseStartPage.selectJurisdiction(jurisdiction);
        await this.createCaseStartPage.selectCaseType(caseType);
        await this.createCaseStartPage.selectEvent(event);

        var thisPageUrl = await browser.getCurrentUrl();
        await this.createCaseStartPage.clickStartButton();
        await BrowserWaits.waitForPageNavigation(thisPageUrl)
   } 

    async createCase( caseData,isAccessibilityTest) {
        this.caseData = caseData;

        var isCheckYourAnswersPage = false;
        let pageCounter = 1;
        while (!isCheckYourAnswersPage) {
            if (isAccessibilityTest){
               
                await accessibilityCheckerAuditor(); 
            }
            await this._formFillPage();
            var checkYouranswers = $(".check-your-answers");
            isCheckYourAnswersPage = await checkYouranswers.isPresent();
            pageCounter++;
        }
    }

    async submitCase(isAccessibilityTest){
        var checkYouranswers = $(".check-your-answers");
        var isCheckYourAnswersPage = await checkYouranswers.isPresent();
        if (isCheckYourAnswersPage) {
            var submit = element(by.xpath('//button[@type= "submit"]'));
            await BrowserWaits.waitForElement(submit);
            await browser.executeScript('arguments[0].scrollIntoView()',
                submit.getWebElement());

            var thisPageUrl = await browser.getCurrentUrl();
            await submit.click();
            await BrowserWaits.waitForPageNavigation(thisPageUrl);
            if (isAccessibilityTest) {
                await accessibilityCheckerAuditor(' Case Submitted ');
            }
        }else{
            throw new  Error("Not in case creation check your answers page");
        }
    }

    async startNextStep(stepName, isAccessibilityTest){
        await BrowserWaits.waitForElement(this.exuiCaseHomeComp);
        await BrowserWaits.waitForElement(this.caseNextStepSelect);

        var nextStepSelectoption = null;
        if (stepName){
            nextStepSelectoption = element(by.xpath("//*[@id='next-step']//option[text() = '" + stepName + "']"));

        }else{
            nextStepSelectoption = element(by.xpath("//*[@id='next-step']//option[2]"));
        }
        await BrowserWaits.waitForElement(nextStepSelectoption);

        await nextStepSelectoption.click();

        var thisPageUrl = await browser.getCurrentUrl();

        await this.nextStepGoButton.click();
        await BrowserWaits.waitForPageNavigation(thisPageUrl);
        if (isAccessibilityTest) {
            await accessibilityCheckerAuditor('CasenextStep ' + stepName); 
        }

    }


    async AmOnCaseDetailsPage(){
        expect(this.ccdCaseEdit.isPresent()).to.be.equal;
    }

    async AmOnCCDCaseEditPage() {
        expect(this.exuiCaseHomeComp.isPresent()).to.be.equal;
    }

    async AmOnChekYourAnswersPage() {
        expect(this.checkYourAnswers.isPresent()).to.be.equal;
    }

    async _formFillPage() {
        var currentPageElement = $('ccd-case-edit-page');
        await BrowserWaits.waitForElement(currentPageElement);

        var fields = element.all(by.css(this.formFields));
        for (let count = 0; count < await fields.count(); count++) {
            var isHidden = await fields.get(count).getAttribute("hidden");
            if (isHidden) {
                continue;
            }

            var field = await fields.get(count).element(by.xpath('./*'));
            var readWriteField = await field.getTagName();

            if (readWriteField === "ccd-field-write") {
                var ccdField = field.element(by.xpath("./div/*"));
                await this._writeToField(ccdField);
            }
        }

        var continieElement = element(by.xpath('//button[@type= "submit"]'));
        await browser.executeScript('arguments[0].scrollIntoView()',
            continieElement.getWebElement())

        await BrowserWaits.waitForElement(continieElement);
        await BrowserWaits.waitForElementClickable(continieElement);

        var thisPageUrl = await browser.getCurrentUrl();
        cucumberReporter.AddMessage("Submitting page: " + thisPageUrl);
        console.log("Submitting : " + thisPageUrl )
        await continieElement.click();
        await BrowserWaits.waitForPageNavigation(thisPageUrl);

        var nextPageUrl = await browser.getCurrentUrl();


    }


    async _writeToField(ccdField,parentFieldName) {
        const isElementDisplayed = await ccdField.isDisplayed(); 
        if (!isElementDisplayed) {
            return;
        }
        var ccdFileTagName = await ccdField.getTagName();
        var fieldName = "";
        try {
            if (ccdFileTagName.includes("ccd-write-collection-field")){
                console.log("collection field name");
                fieldName = await ccdField.$('h2.heading-h2').getText();
                fieldName = fieldName.trim();
                console.log("collection field name is" + fieldName);

            }else{
                fieldName = await ccdField.$('.form-label').getText();
            }
        }
        catch (err) {
            console.log(err);
        }
        fieldName = parentFieldName ? `${parentFieldName}.${fieldName}` : fieldName; 
        console.log("===> Case Field : " + fieldName);
        switch (ccdFileTagName) {
            case "ccd-write-text-field":
                let e = ccdField.$('input.form-control');
                let textvalue = this._fieldValue(fieldName); 
                await e.sendKeys(textvalue);
                cucumberReporter.AddMessage(fieldName + " : " + textvalue); 

                break;
            case "ccd-write-text-area-field":
                let e1 = ccdField.$('textarea.form-control');
                let textAreaValue = this._fieldValue(fieldName); 
                await e1.sendKeys(textAreaValue)
                cucumberReporter.AddMessage(fieldName + " : " + textAreaValue); 
                break;
            case "ccd-write-address-field":
                await ccdField.$('.form-control').sendKeys("SW1");
                await ccdField.$('button').click();
                var addressSelectionField = ccdField.$('select.form-control')
                await BrowserWaits.waitForElement(addressSelectionField);
                var addressToSelect = addressSelectionField.$("option:nth-of-type(2)");
                await BrowserWaits.waitForElement(addressToSelect);
                await addressToSelect.click();
                cucumberReporter.AddMessage(fieldName + " : 2nd option selected"); 
                break;
            case "ccd-write-email-field":
                await ccdField.$('input.form-control').sendKeys("test@autotest.com ");
                cucumberReporter.AddMessage(fieldName + " : test@autotest.com");  
                break;
            case "ccd-write-yes-no-field":
                await ccdField.$('.multiple-choice input').click();
                cucumberReporter.AddMessage(fieldName + " : " + await await ccdField.$('.multiple-choice input').getText());  
                break;
            case "ccd-write-fixed-list-field":
                var selectOption = this._fieldValue(fieldName);
                var selectOptionElement = ccdField.$('option:nth-of-type(2)'); 
                if (!selectOption.includes(fieldName)) {
                    selectOptionElement = ccdField.element(by.xpath("//option[contains(text() , '" + selectOption+"')]")); 

                }
                await selectOptionElement.click();

                let selectFieldId = await ccdField.$('select');
                let id = await selectFieldId.getAttribute('id');
                let selectionOptionValue = await selectOptionElement.getAttribute('value');
                cucumberReporter.AddMessage(fieldName + " : " + selectionOptionValue); 
                break;
            case "ccd-write-date-field":
                var dateValue = this._fieldValue(fieldName);
                if(dateValue.includes(fieldName) || dateValue === ""){
                    dateValue = date().format('DD-MM-YYYY'); 
                }
                var today = dateValue.split("-");
                await ccdField.$('.form-group-day input').sendKeys(today[0]);
                await ccdField.$('.form-group-month input').sendKeys(today[1]);
                await ccdField.$('.form-group-year input').sendKeys(today[2]);
                cucumberReporter.AddMessage(fieldName + " : " + dateValue);  
                break;

            case "ccd-write-document-field":
                var fileToUpload = path.resolve(__dirname, "../../../documents/dummy.pdf");
                await ccdField.$('input.form-control').sendKeys(fileToUpload);

                await BrowserWaits.waitForCondition(async () => {
                    let isUploadDone = await ccdField.element(by.xpath('span[contains(text(),"Uploading")]')).isPresent();
                    console.log("file upload status : " + isUploadDone);
                    return !isUploadDone; 
                });
                cucumberReporter.AddMessage(fieldName + " : dummy.pdf");  
                await browser.sleep(5000);
                break;
            case "ccd-write-multi-select-list-field":
                var selectionFields = ccdField.$$(".multiple-choice input");
                var selectionFieldsCount = await selectionFields.count();
                for (var count = 0; count < selectionFieldsCount; count++) {
                    await selectionFields.get(count).click();
                }
                cucumberReporter.AddMessage(fieldName + " : all options selected");  
                break;

            case "ccd-write-fixed-radio-list-field":
                var selectionRadioFields = ccdField.$$(".multiple-choice input");
                var selectionFieldsCount = await selectionRadioFields.count();
                await selectionRadioFields.get(0).click();
                cucumberReporter.AddMessage(fieldName + " : first option selected");  
            break;
            case "ccd-write-complex-type-field":
                cucumberReporter.AddMessage(fieldName + " : complex field values");  
                var writeFields = ccdField.$$("ccd-field-write");
                for (var fieldcounter = 0; fieldcounter < await writeFields.count(); fieldcounter++){
                    var isHidden = await writeFields.get(fieldcounter).getAttribute("hidden");
                    if (isHidden){
                       continue; 
                    }
                    var ccdSubField = writeFields.get(fieldcounter).element(by.xpath("./div/*"));
                    await this._writeToField(ccdSubField, fieldName) 
                }
                cucumberReporter.AddMessage(fieldName + " : complex field values");  
            break;
            case "ccd-write-collection-field":
                cucumberReporter.AddMessage(fieldName + " : complex write collection values");  
                var addNewBtn = ccdField.$(".panel button");

                // let arrval = this._fieldValue(fieldName); 
                // if (!(arrval instanceof Array)){
                //     break;
                // }
                await browser.executeScript('arguments[0].scrollIntoView()',
                    addNewBtn.getWebElement());
                await addNewBtn.click();
                var writeFields = ccdField.$$(".panel > .form-group > .form-group>ccd-field-write");
                var writeFieldsCount = await writeFields.count();

                for (var count = 0; count < writeFieldsCount; count++) {
                    var ccdSubField = writeFields.get(count).element(by.xpath("./div/*"));
                    var subFieldText = await ccdSubField.getText();
                    await this._writeToField(ccdSubField, `${fieldName}[0]`)
                }
               
                cucumberReporter.AddMessage(fieldName + " : complex write collection values");  
            break;
            default:
                console.log("Unknown field type : " + ccdFileTagName);
                cucumberReporter.AddMessage(fieldName + " : unknown field " + ccdFileTagName);  
        }
    }

    _fieldValue(fieldName) {;
        var value = "fieldName";
        console.log("Read field value : " + fieldName);
        if (this.caseData[fieldName]) {
            value = this.caseData[fieldName];
        } else if (fieldName.includes('Optional')){
            value = "";
        }else{
            value = "test "+fieldName
        }
        return value;
    }


}
module.exports = CaseManager;
