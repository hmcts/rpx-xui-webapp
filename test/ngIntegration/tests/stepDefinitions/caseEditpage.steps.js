var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

const caseEditPage = require('../pageObjects/ccdCaseEditPages');
const caseListPage = require('../pageObjects/caselistPage');

const caseDetailsPage = require('../pageObjects/caseDetailsPage');


const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const BrowserWaits = require('../../../e2e/support/customWaits');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');
const caseListPage = require('../pageObjects/caselistPage');
const { getTestJurisdiction } = require('../../mockData/ccdCaseMock');
const { Browser } = require('selenium-webdriver');


defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see case edit page displayed', async function () {
        expect(await caseEditPage.amOnPage(), "Case edit page is not displayed").to.be.true;
    });

    When('I click cancel in case edit page', async function(){
        await caseEditPage.clickCancelLinkInEditPage(); 
     });

    When('I click cancel in case edit page then I see page case list page', async function(){
        await BrowserWaits.retryWithActionCallback(async () => {
            await caseEditPage.clickCancelLinkInEditPage();
            expect(await caseListPage.amOnPage()).to.be.true;
        });
     });

    When('I click continue in case edit page', async function () {
        await caseEditPage.clickContinue();
    });

    Then('I see validation error for field with id {string}', async function(fieldId){
        expect(await caseEditPage.isFieldLevelValidationErrorDisplayed(fieldId),"field level error validation not displayed or not as expected").to.be.true;
    });

    Then('I see case event validation alert error summary messages', async function(datatable){
        const messageHashes = datatable.hashes();
        for(let i = 0; i< messageHashes.length;i++){
            expect(await caseEditPage.getValidationAlertMessageDisplayed(), 'Expected field error validation message not displayed in error summary').to.include(messageHashes[i].message);
        }
    });

     Then('I validate config {string} case edit wizard pages and fields in pages', async function(configReference){
         const caseConfigInstance = global.scenarioData[configReference];
         const caseConfig = caseConfigInstance.getCase();
         let validateReq = null; 
         MockApp.addIntercept('/data/case-types/:caseType/validate', (req, res, next) => {
             validateReq = req.body;
            //  console.log("/data/case-types/:caseType/validate req received : " + JSON.stringify(validateReq,2)); 
             next();
         });

         let submissionReq = null; 
         MockApp.addIntercept('/data/case-types/:caseType/cases', (req, res, next) => {
             submissionReq = req.body;
             console.log("/data/case-types/:caseType/cases req received : " + submissionReq); 
             next();
         });
         await MockApp.stopServer();
         await MockApp.startServer();


         let eventData = {};
         for (const wizardPage of caseConfig.wizard_pages) {
             await caseEditPage.waitForPage();
             expect(await caseEditPage.getPageTitle()).to.contains(wizardPage.label);
             const thisPageEventData = {};

             for (const pageField of wizardPage.wizard_page_fields) {

                 const fieldConfig = caseConfig.case_fields.filter(field => field.id === pageField.case_field_id)[0];
                 // if (!fieldConfig.show_condition){
                 //     expect(await CaseEditPage.isFieldDisplayed(fieldConfig)).to.be.true;
                 //     thisPageEventData[fieldConfig.id] = await CaseEditPage.inputCaseField(fieldConfig); 
                 // }  
                 expect(await caseEditPage.isFieldDisplayed(fieldConfig)).to.be.true;
                 thisPageEventData[fieldConfig.id] = await caseEditPage.inputCaseField(fieldConfig);

             }
             validateReq = null;
             await caseEditPage.clickContinue();
             await BrowserWaits.waitForCondition(function () { return validateReq !== null; });
             expect(validateReq.data).to.deep.equal( thisPageEventData);
             eventData = Object.assign(eventData, thisPageEventData)
 
         }
         await caseEditPage.waitForChecYourAnswersPage();
         await caseEditPage.validateCheckYourAnswersPage(caseConfig);
       
         await caseEditPage.clickSubmit();
         await BrowserWaits.waitForCondition(async () => submissionReq !== null);
         expect(submissionReq.data).to.deep.equal(eventData);

         await caseDetailsPage.amOnPage()
         
    });

    Then('I see collection field {string} {string} button is {string}', async function (fieldId, actionButton, buttonState) {

        actionButton = actionButton.toLowerCase();
        buttonState = buttonState.toLowerCase();
        if (!(actionButton.includes("add") || actionButton.includes("remove")) ){
            throw new Error("Step definition error : In step button type should include either Add or Remove to indicate button under validation");
        }
        if (!(buttonState.includes("enabled") || buttonState.includes("disabled"))) {
            throw new Error("Step definition error :In step button state should include either enabled or disabled to indicate button state validation");
        }

        await BrowserWaits.waitForElement($(`#${fieldId}`))
        const addNewButton = element(by.xpath("//div[@id = '" + fieldId+"']//button[text() = 'Add new']"));
        const removeButton = element(by.xpath("//div[@id = '" + fieldId +"']//button[text() = 'Remove']"));


        const buttonUnderTest = actionButton.includes("Add") ? addNewButton : removeButton;
        expect(await buttonUnderTest.isEnabled(), `${actionButton} button is not ${buttonState}`).to.equal(buttonState.includes("enabled")) 

        // if (buttonState === "enabled"){
        //     expect(await buttinUnderTest.isEnabled(), `${actionButton} button is not ${buttonState}`).to.be.true 
        // }else{
        //     expect(await buttinUnderTest.isEnabled(), `${actionButton} button is not ${buttonState}`).to.be.false 
        // }

    });

    When('I input fields in case edit page from event {string} with values', async function (eventConfigRef, datatable){
        const caseConfigInstance = global.scenarioData[eventConfigRef];
        const caseConfig = caseConfigInstance.getCase(); 
        const fieldValues = datatable.hashes();

        for (const fieldValue of fieldValues){
            const fieldConfig = caseConfigInstance.getCaseFieldConfig(fieldValue.fieldId);

            let value = fieldValue.value;
            if(fieldConfig.field_type.type.toLowerCase().includes("list")){
                value = null;
                for (const listItem of fieldConfig.field_type.fixed_list_items){
                    console.log(`${fieldValue.value} is in ${JSON.stringify(listItem)}`);
                    if (listItem.code === fieldValue.value){
                        value = listItem;
                        break; 
                    } 
                } 
                if (value === null) {
                    throw new Error(`${fieldValue.fieldId} is list item and Provided value "${fieldValue.value}" not present in fieldConfig fixed_list_items ${JSON.stringify(fieldConfig.field_type.fixed_list_items)} ` );
                }
            } 
            await caseEditPage.inputCaseField(fieldConfig, value);
        }
    });

    Then('I validate fields display in case edit page from event {string}', async function (eventConfigRef, datatable){
        await BrowserWaits.waitForSeconds(1);
        const caseConfigInstance = global.scenarioData[eventConfigRef];
        const caseConfig = caseConfigInstance.getCase();
        const fieldValues = datatable.hashes();
        for (const fieldValue of fieldValues) {
            const fieldConfig = caseConfigInstance.getCaseFieldConfig(fieldValue.fieldId)
            const isExpectedToDisplay = fieldValue.isDisplayed.includes("true") ? true : false;
            expect(await caseEditPage.isFieldDisplayed(fieldConfig), `${fieldValue.fieldId} is ${isExpectedToDisplay ? "not": ""} displayed`).to.equal(isExpectedToDisplay);
        }

    });

    Then('I validate event page continue on validate request error status code {int}', async function(statusCode){
        let validateReq = null;
        MockApp.onPost('/data/case-types/:caseType/validate', (req, res, next) => {
            validateReq = req;
            res.status(statusCode).send("Data validation error!");
        });
        await MockApp.stopServer();
        await MockApp.startServer();

        await caseEditPage.clickContinue();
        expect(await caseEditPage.isCallbackErrorSummaryDisplayed(),' Error summary banner is not displayed').to.be.true;
       
    });
});
