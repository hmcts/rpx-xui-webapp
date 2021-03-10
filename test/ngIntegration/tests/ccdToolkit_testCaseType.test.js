

const assert = require('assert');

const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../util/browserUtil');
const BrowserWaits = require('../../e2e/support/customWaits');

const CaseEditPage = require('../util/ccdCaseEditPages');
const CaseDetailsPage = require('../util/caseDetailsPage');
const CaseListPage = require('../util/caselistPage');


const { getTestJurisdiction} = require('../mockData/ccdCaseMock');


const headerPage = require('../../e2e/features/pageObjects/headerPage');

describe('Case Create pages', function () {

    let caseConfig = null;
    let validateReq = null;
    beforeEach(async function (done) {
        MockApp.init();
        await browser.manage().deleteAllCookies();

        MockApp.addIntercept('/data/case-types/:caseType/validate', (req,res,next) =>{
            validateReq = req.body;
            next();
        });

        done();
    });

    afterEach(async function (done) {
        await MockApp.stopServer();
        // await BrowserUtil.addScreenshot(this, browser); 
        done();

    });
    
    [
        { show_summary : true},
        { show_summary: false } 
    ].forEach(scenario => {
        it('Create and submit a case with show_summary set to '+scenario.show_summary, async function () {

            MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
                caseConfig = getTestJurisdiction(scenario).getCase();
                res.send(caseConfig);
            });
            await MockApp.startServer();
            await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
            await headerPage.waitForPrimaryNavDisplay()
            await BrowserUtil.waitForLD();


            browser.get('cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage');
            await CaseEditPage.waitForPage();

            for (const wizardPage of caseConfig.wizard_pages) {
                await CaseEditPage.waitForPage();
                expect(await CaseEditPage.getPageTitle()).to.contains(wizardPage.label);

                await CaseEditPage._formFill(caseConfig,wizardPage);

                validateReq = null;
                await CaseEditPage.clickContinue();
                
                await BrowserWaits.waitForCondition(async () => validateReq !== null);
    
            }
            await CaseEditPage.waitForChecYourAnswersPage();
            const summaryPageElementsDisplayStatus = await CaseEditPage.getSummaryPageDisplayElements();
            if (scenario.show_summary) {
                expect(summaryPageElementsDisplayStatus.header, "Check your answers header text not displayed").to.be.true;
                expect(summaryPageElementsDisplayStatus.headerDescription, "Check your answers header description text not displayed").to.be.true;
                expect(summaryPageElementsDisplayStatus.rows, "Check your answers summary rows count is 0").to.be.above(0);
            } else {
                expect(summaryPageElementsDisplayStatus.header, "Check your answers header text displayed").to.be.false;
                expect(summaryPageElementsDisplayStatus.headerDescription, "Check your answers header description text displayed").to.be.false;
                expect(summaryPageElementsDisplayStatus.rows, "Check your answers summary rows count is not 0").to.equal(0);
            }
            await CaseEditPage.clickSubmit();
            await CaseDetailsPage.amOnPage()

        });
    });

    it('Validate Case data per page validation', async function () {
        MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
            caseConfig = getTestJurisdiction();
           const multiSelectListField = caseConfig.getCaseFieldConfig("MultiSelectListField");
           const complexType2 =  caseConfig.getCaseFieldConfig("ComplexType_2");
       
           multiSelectListField.show_condition = "Gender=\"notGiven\"";
           complexType2.show_condition = "TextField0=\"SHOW\"";
           caseConfig = caseConfig.getCase();
           res.send(caseConfig);
       });
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        
        browser.get('cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage');
        await CaseEditPage.waitForPage();

        for (const wizardPage of caseConfig.wizard_pages) {
            await CaseEditPage.waitForPage();
            expect(await CaseEditPage.getPageTitle()).to.contains(wizardPage.label);
            
            let pageData = await CaseEditPage._formFill(caseConfig,wizardPage);

            validateReq = null;
            await CaseEditPage.clickContinue();
            
            await BrowserWaits.waitForCondition(async () => validateReq !== null);

            expect(pageData).to.deep.equal(validateReq.data);

        }
        await CaseEditPage.waitForChecYourAnswersPage();
        await CaseEditPage.clickSubmit();
        await CaseDetailsPage.amOnPage()

    });
    
    it('Validate Case data event submission validation', async function () {
        MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
            caseConfig = getTestJurisdiction();
           const multiSelectListField = caseConfig.getCaseFieldConfig("MultiSelectListField");
           const complexType2 =  caseConfig.getCaseFieldConfig("ComplexType_2");
       
           multiSelectListField.show_condition = "Gender=\"notGiven\"";
           complexType2.show_condition = "TextField0=\"SHOW\"";
           caseConfig = caseConfig.getCase();
           res.send(caseConfig);
       });
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        browser.get('cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage');
        await CaseEditPage.waitForPage();
        let validateSubmissionReq={};
        for (const wizardPage of caseConfig.wizard_pages) {
            await CaseEditPage.waitForPage();
            expect(await CaseEditPage.getPageTitle()).to.contains(wizardPage.label);
            
            let pageData = await CaseEditPage._formFill(caseConfig,wizardPage);
            validateSubmissionReq=Object.assign(validateSubmissionReq,pageData);
            
            validateReq = null;
            await CaseEditPage.clickContinue();
            
            await BrowserWaits.waitForCondition(async () => validateReq !== null);
            expect(pageData).to.deep.equal(validateReq.data);

        }

        await CaseEditPage.waitForChecYourAnswersPage();
        await CaseEditPage.clickSubmit();
        expect(validateSubmissionReq).to.deep.equal(validateReq.event_data);
        await CaseDetailsPage.amOnPage()

    });

    [
        { show_summary_change_option: false },
        { show_summary_change_option : true}
    ].forEach(scenario => {
        it('validate show summery edit link conditions show '+scenario.show_summary_change_option, async function () {

            MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
                caseConfig = getTestJurisdiction()
                const textField0 = caseConfig.getCaseFieldConfig("TextField0");
        
                textField0.show_summary_change_option = scenario.show_summary_change_option;
                caseConfig = caseConfig.getCase();
                res.send(caseConfig);
            });
            await MockApp.startServer();
            await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
            await headerPage.waitForPrimaryNavDisplay()
            await BrowserUtil.waitForLD();


            browser.get('cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage');
            await CaseEditPage.waitForPage();
            // console.log("caseConfig:::"+JSON.stringify(caseConfig.wizard_pages));

            for (const wizardPage of caseConfig.wizard_pages) {
                await CaseEditPage.waitForPage();
                expect(await CaseEditPage.getPageTitle()).to.contains(wizardPage.label);

                await CaseEditPage._formFill(caseConfig,wizardPage);

                validateReq = null;
                await CaseEditPage.clickContinue();
                
                await BrowserWaits.waitForCondition(async () => validateReq !== null);
    
            }
            await CaseEditPage.waitForChecYourAnswersPage();
            let field =await element(by.xpath("//table[@class='form-table']/tbody/tr[1]/th")).getText();
            if (scenario.show_summary_change_option) {
                expect(field, "Check your answers summary field ").to.equal("Text Field 0");
            } else {
                expect(field, "Check your answers summary field ").to.equal("Select your gender");
            }
            await CaseEditPage.clickSubmit();
            await CaseDetailsPage.amOnPage()

        });
    });

    it('Validate Case fields show hide property values	', async function () {

        MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
             caseConfig = getTestJurisdiction();
            const multiSelectListField = caseConfig.getCaseFieldConfig("MultiSelectListField");
            const complexType2 =  caseConfig.getCaseFieldConfig("ComplexType_2");
        
            multiSelectListField.show_condition = "Gender=\"notGiven\"";
            complexType2.show_condition = "TextField0=\"SHOW\"";
            caseConfig = caseConfig.getCase();
            res.send(caseConfig);
        });
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        
        browser.get('cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage');
        await CaseEditPage.waitForPage();
        var currentPageElement = $('ccd-case-edit-page');
        await BrowserWaits.waitForElement(currentPageElement);
        
        const MultiSelectListField =$('#MultiSelectListField');
       
        await $(`#${CaseEditPage.getFieldId("TextField0", "")}`).sendKeys("test text field");
       
        await $(`#${CaseEditPage.getFieldId("Gender", "")}-${"male"}`).click();

        let fieldIsPresent = await MultiSelectListField.isDisplayed();
        // await BrowserWaits.waitForSeconds(5);

        expect(fieldIsPresent).to.be.false;
        await $(`#${CaseEditPage.getFieldId("Gender", "")}-${"notGiven"}`).click();
        fieldIsPresent = await MultiSelectListField.isDisplayed();
        expect(fieldIsPresent).to.be.true;

    });


    it('Validate  page event data validation errors', async function () {
        MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
            caseConfig = getTestJurisdiction();
            const textField0 = caseConfig.getCaseFieldConfig("TextField0");
            textField0.display_context = "MANDATORY";
            caseConfig = caseConfig.getCase();
           res.send(caseConfig);
       });
        MockApp.addIntercept('/data/case-types/:caseType/validate', (req,res,next) =>{
            validateReq = "";
            res.status(400).send("Data validation error!");
        });

        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();
        
        browser.get('cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage');
        await CaseEditPage.waitForPage();
        var currentPageElement = $('ccd-case-edit-page');
        await BrowserWaits.waitForElement(currentPageElement);
               
        await $(`#${CaseEditPage.getFieldId("TextField0", "")}`).sendKeys("test text field");
       
        await $(`#${CaseEditPage.getFieldId("Gender", "")}-${"male"}`).click();

        await CaseEditPage.clickContinue();
        let errorElement = $('.error-summary h1');
        await BrowserWaits.waitForElement(errorElement);
        expect(await errorElement.getText(), "Create case form page error validation").to.equal("Something went wrong");

    });

});


