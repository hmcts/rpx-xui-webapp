

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

    // it('Should be able to see the test jurisdiction create case page', async () => {
    //     MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
    //         caseConfig = getTestJurisdiction().getCase();
    //         res.send(caseConfig);
    //     });
    //     await MockApp.startServer();
    //     await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
    //     await headerPage.waitForPrimaryNavDisplay()
    //     await BrowserUtil.waitForLD();

    //     browser.get('cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage');
    //     await CaseEditPage.waitForPage();
    // });

    // it('Cancel button should return the case list page', async () => {
    //     MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
    //         caseConfig = getTestJurisdiction().getCase();
    //         res.send(caseConfig);
    //     });
    //     await MockApp.startServer();
    //     await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
    //     await headerPage.waitForPrimaryNavDisplay()
    //     await BrowserUtil.waitForLD();


    //     browser.get('cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage');
    //     await CaseEditPage.waitForPage();
    //     await CaseEditPage.clickCancelLinkInEditPage();
    //     await CaseListPage.amOnPage();

    // });
 
    // [1,2,3,4].forEach(pageNum => {
    //     it(`Validate the existence of page ${pageNum} create case form page fields against the API response`, async () => {
    //         MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
    //             caseConfig = getTestJurisdiction().getCase();
    //             res.send(caseConfig);
    //         });
    //         await MockApp.startServer();
    //         await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
    //         await headerPage.waitForPrimaryNavDisplay()
    //         await BrowserUtil.waitForLD();


    //         browser.get(`cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage${pageNum}`);
    //         await CaseEditPage.waitForPage();
    //         // await CaseEditPage.clickCancelLinkInEditPage();
    //         // await CaseListPage.amOnPage();
    //         const firstPageObj = caseConfig.wizard_pages[pageNum - 1];
    //         console.log(`firstPageObj::${pageNum}::::`+JSON.stringify(firstPageObj))
    //         for (const pageField of firstPageObj.wizard_page_fields) {
    //             const fieldConfig = caseConfig.case_fields.filter(field => field.id === pageField.case_field_id)[0];
    //             console.log(`firstPageObj::${pageNum}::::`+JSON.stringify(fieldConfig))
    //             expect(await CaseEditPage.isFieldDisplayed(fieldConfig)).to.be.true;
    //         }

    //     });
    // });
    
    // [
    //     { show_summary : true},
    //     { show_summary: false } 
    // ].forEach(scenario => {
    //     it('Create and submit a case with show_summary set to '+scenario.show_summary, async function () {

    //         MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
    //             caseConfig = getTestJurisdiction(scenario).getCase();
    //             res.send(caseConfig);
    //         });
    //         await MockApp.startServer();
    //         await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
    //         await headerPage.waitForPrimaryNavDisplay()
    //         await BrowserUtil.waitForLD();


    //         browser.get('cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage');
    //         await CaseEditPage.waitForPage();
    //         console.log("caseConfig:::"+JSON.stringify(caseConfig.wizard_pages));

    //         for (const wizardPage of caseConfig.wizard_pages) {
    //             await CaseEditPage.waitForPage();
    //             expect(await CaseEditPage.getPageTitle()).to.contains(wizardPage.label);
    //             await CaseEditPage._formFill(caseConfig,wizardPage);
    //             validateReq = null;
    //             // await CaseEditPage.clickContinue();
    //             var continieElement = element(by.xpath('//button[@type= "submit"]'));
    //             await browser.executeScript('arguments[0].scrollIntoView()',
    //                 continieElement.getWebElement())

    //             await BrowserWaits.waitForElement(continieElement);
    //             await BrowserWaits.waitForElementClickable(continieElement);

    //             var thisPageUrl = await browser.getCurrentUrl();
    //             // cucumberReporter.AddMessage("Submitting page: " + thisPageUrl);
    //             console.log("Submitting : " + thisPageUrl )
    //             await continieElement.click();
    //             await BrowserWaits.waitForCondition(async () => validateReq !== null);
    
    //         }
    //         await CaseEditPage.waitForChecYourAnswersPage();
    //         const summaryPageElementsDisplayStatus = await CaseEditPage.getSummaryPageDisplayElements();
    //         if (scenario.show_summary) {
    //             expect(summaryPageElementsDisplayStatus.header, "Check your answers header text not displayed").to.be.true;
    //             expect(summaryPageElementsDisplayStatus.headerDescription, "Check your answers header description text not displayed").to.be.true;
    //             expect(summaryPageElementsDisplayStatus.rows, "Check your answers summary rows count is 0").to.be.above(0);
    //         } else {
    //             expect(summaryPageElementsDisplayStatus.header, "Check your answers header text displayed").to.be.false;
    //             expect(summaryPageElementsDisplayStatus.headerDescription, "Check your answers header description text displayed").to.be.false;
    //             expect(summaryPageElementsDisplayStatus.rows, "Check your answers summary rows count is not 0").to.equal(0);
    //         }
    //         await CaseEditPage.clickSubmit();
    //         await CaseDetailsPage.amOnPage()

    //     });
    // });

    it('Validate Case data per page validation', async function () {

        MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
            caseConfig = getTestJurisdiction().getCase();
            // const multiSelectListField = caseConfig.getCaseFieldConfig("MultiSelectListField");
            // const complexType2 = caseConfig.getCaseFieldConfig("ComplexType_2");
        
            // multiSelectListField.show_condition = "Gender=\"not Given\"";
            // complexType2.show_condition = "TextField0=\"SHOW\"";
            caseConfig = getTestJurisdiction().getCase();
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
            
            let pageData = await CaseEditPage._formFill(caseConfig,wizardPage);
            validateReq = null;
            // await CaseEditPage.clickContinue();
            var continieElement = element(by.xpath('//button[@type= "submit"]'));
            await browser.executeScript('arguments[0].scrollIntoView()',
                continieElement.getWebElement())

            await BrowserWaits.waitForElement(continieElement);
            await BrowserWaits.waitForElementClickable(continieElement);

            var thisPageUrl = await browser.getCurrentUrl();
            // cucumberReporter.AddMessage("Submitting page: " + thisPageUrl);
            console.log("Submitting : " + thisPageUrl )
            await continieElement.click();
            await BrowserWaits.waitForCondition(async () => validateReq !== null);

            expect(pageData).to.deep.equal(validateReq.data);

        }
        await CaseEditPage.waitForChecYourAnswersPage();
        await CaseEditPage.clickSubmit();
        await CaseDetailsPage.amOnPage()

    });
    

});


