var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

const caseEditPage = require('../pageObjects/ccdCaseEditPages');
const caseDetailsPage = require('../pageObjects/caseDetailsPage');


const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const BrowserWaits = require('../../../e2e/support/customWaits');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');

const { getTestJurisdiction } = require('../../mockData/ccdCaseMock');


defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see case edit page displayed', async function () {
        expect(await caseEditPage.amOnPage(), "Case edit page is not displayed").to.be.true;
    });

    When('I click cancel in case edit page', async function(){
        await caseEditPage.clickCancelLinkInEditPage(); 
     });

     Then('I validate config {string} case edit wizard pages and fields in pages', async function(configReference){
         const caseConfigInstance = global.scenarioData[configReference];
         const caseConfig = caseConfigInstance.getCase(); 
         MockApp.addIntercept('/data/case-types/:caseType/validate', (req, res, next) => {
             validateReq = req.body;
             next();
         });


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
             await BrowserWaits.waitForCondition(async () => validateReq !== null);
         }
         await caseEditPage.waitForChecYourAnswersPage();
         await caseEditPage.validateCheckYourAnswersPage(caseConfig);
       
         await caseEditPage.clickSubmit();
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


});
