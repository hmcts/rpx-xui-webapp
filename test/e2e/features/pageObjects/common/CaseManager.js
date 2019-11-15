
var CreateCaseStartPage = require('../createCaseStartPage');
var BrowserWaits = require('../../../support/customWaits');

const date = require('moment');
var path = require('path');

class CaseManager {

    constructor() {
        this.continueBtn = new Button('button', 'Continue');
        this.submitBtn = new Button('button', 'Submit');
        this.previousBtn = new Button("button", "Previous");
        this.cancelLink = new Button("a", "Cancel");
        this.formFields = 'ccd-case-edit-form>div';
        this.createCaseStartPage = new CreateCaseStartPage();
    }


    

    async createCase(jurisdiction, caseType, event, caseData) {
        this.caseData = caseData;
        await this.createCaseStartPage.selectJurisdiction(jurisdiction);
        await this.createCaseStartPage.selectCaseType(caseType);
        await this.createCaseStartPage.selectEvent(event);
        await this.createCaseStartPage.clickStartButton();

        var e = element(by.xpath('//h2[text() = "Before You Start"]'));
        await BrowserWaits.waitForElement(e);

        var caseCreationSubmitPage = false;
        while (!caseCreationSubmitPage) {
            await this._formFillPage();
            var submitBtn = element(by.xpath('//button[text() ="Submit" ]'));
            caseCreationSubmitPage = await submitBtn.isPresent();
            if (caseCreationSubmitPage) {
                await browser.executeScript('arguments[0].scrollIntoView()',
                    submitBtn.getWebElement())
                await submitBtn.click();
                await BrowserWaits.waitForElement($("exui-case-details-home"));
            }

        }

    }

    async _formFillPage() {

        var currentPageElement = $('ccd-case-edit-page');
        var thisPageUrl = await browser.getCurrentUrl();
        await BrowserWaits.waitForElement(currentPageElement);

        var fields = element.all(by.css(this.formFields));
        console.log('total fields : ' + await fields.count());

        for (let count = 0; count < await fields.count(); count++) {
            var isHidden = await fields.get(count).getAttribute("hidden");
            if (isHidden) {
                continue;
            }

            var inputs = fields.get(count).$$('input');
            var field = await fields.get(count).element(by.xpath('./*'));
            var readWriteField = await field.getTagName();

            if (readWriteField === "ccd-field-write") {
                var ccdField = field.element(by.xpath("./div/*"));
                await this._writeToField(ccdField);

            }

        }

        var continieElement = element(by.xpath('//button[text() = "Continue"]'));

        await browser.executeScript('arguments[0].scrollIntoView()',
            continieElement.getWebElement())

        await BrowserWaits.waitForElement(continieElement);

        console.log("Continue next");
        await continieElement.click();

        await browser.wait(async () => {
            var nextPage = await browser.getCurrentUrl();
            // console.log("Waiting for next page");
            return thisPageUrl !== nextPage;
        }, 30000);
        console.log("Continue next success");


    }

    async _writeToField(ccdField) {

        var ccdFileTagName = await ccdField.getTagName();
        console.log("Input " + ccdFileTagName + " => " + await ccdField.getText());

        var fieldName = "";
        try {
            fieldName = await ccdField.$('.form-label').getText();
        }
        catch (err) {
            fieldName = "No inline field label";
        }
        switch (ccdFileTagName) {

            case "ccd-write-text-field":
                
                await ccdField.$('input.form-control').sendKeys(this._fieldValue(fieldName));
                break;
            case "ccd-write-text-area-field":
                await ccdField.$('textarea.form-control').sendKeys(this._fieldValue(fieldName))
                break;
            case "ccd-write-address-field":
                await ccdField.$('.form-control').sendKeys("SW1");
                await ccdField.$('button').click();
                var addressSelectionField = ccdField.$('select.form-control')
                await BrowserWaits.waitForElement(addressSelectionField);
                var addressToSelect = addressSelectionField.$("option:nth-of-type(2)");
                await BrowserWaits.waitForElement(addressToSelect);
                await addressToSelect.click();
                break;
            case "ccd-write-email-field":
                await ccdField.$('input.form-control').sendKeys("test@autotest.com ");
                break;
            case "ccd-write-yes-no-field":
                await ccdField.$('.multiple-choice input').click();
                break;
            case "ccd-write-fixed-list-field":
                await ccdField.$('select option:nth-of-type(2)').click();
                break;
            case "ccd-write-date-field":

                var today = date().format('DD-MM-YYYY').split("-");
                await ccdField.$('.form-group-day input').sendKeys(today[0]);
                await ccdField.$('.form-group-month input').sendKeys(today[1]);
                await ccdField.$('.form-group-year input').sendKeys(today[2]);
                break;

            case "ccd-write-document-field":
                var fileToUpload = path.resolve(__dirname, "../../../documents/dummy.pdf");
                await ccdField.$('input.form-control').sendKeys(fileToUpload);
                await browser.sleep(1000);
                break;

            case "ccd-write-multi-select-list-field":
                var selectionFields = ccdField.$$(".multiple-choice input");
                var selectionFieldsCount = await selectionFields.count();
                for (var count = 0; count < selectionFieldsCount; count++) {
                    await selectionFields.get(count).click();
                }
                break;

            case "ccd-write-fixed-radio-list-field":
                var selectionRadioFields = ccdField.$$(".multiple-choice input");
                var selectionFieldsCount = await selectionRadioFields.count();
                await selectionRadioFields.get(0).click();
            break;

            case "ccd-write-complex-type-field":
                var writeFields = ccdField.$$("ccd-field-write");
                for (var fieldcounter = 0; fieldcounter < await writeFields.count(); fieldcounter++){
                    var isHidden = await writeFields.get(fieldcounter).getAttribute("hidden");
                    if (isHidden){
                       continue; 
                    }
                    var ccdSubField = writeFields.get(fieldcounter).element(by.xpath("./div/*"));
                    await this._writeToField(ccdSubField) 
                }
            break;
            case "ccd-write-collection-field":
                var addNewBtn = ccdField.$(".panel button");
                await browser.executeScript('arguments[0].scrollIntoView()',
                    addNewBtn.getWebElement());
                await addNewBtn.click();
                var writeFields = ccdField.$$(".panel ccd-field-write");
                var writeFieldsCount = await writeFields.count();

                for (var count = 0; count < writeFieldsCount; count++){
                    var ccdSubField = writeFields.get(fieldcounter).element(by.xpath("./div/*"));
                    await this._writeToField(ccdSubField) 
                }

            break;
            default:
                console.log("Unknown field type : " + ccdFileTagName);

        }
    }

    _fieldValue(fieldName) {
        var value = "fieldName";

        if (this.caseData[fieldName]) {
            value = this.caseData[fieldName];
        } else {
            value = "Test " + fieldName;
        }

        return value;
    }






}

module.exports = CaseManager;