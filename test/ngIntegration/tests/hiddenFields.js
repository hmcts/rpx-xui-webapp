
const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../util/browserUtil');
const BrowserWaits = require('../../e2e/support/customWaits');

const headerPage = require('../../e2e/features/pageObjects/headerPage');
const exuiTestCaseType = require('../../nodeMock/ccd/solicitorCreate/exuiTestCaseType');
const config = require('../config/protractor.conf');

const CCDCaseEditPage = require('../util/ccdCaseEditPages');
const CCDCaseConfig = require('../../nodeMock/ccd/ccdCaseConfig/caseCreateConfigGenerator');

describe.only('CCD casefields, retain_hidden_field setting', function () {

    beforeEach(async function (done) {
        caseValidationRequestBody = null;
        caseEventSubmitRequestBody = null;
        MockApp.init();
        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });

    const roles = ["caseworker-divorce-financialremedy-solicitor"];
    let caseValidationRequestBody = null;
    let caseEventSubmitRequestBody = null;

    // [
    //     { showField: false, retainHiddenField: "Yes" },
    //     { showField: false, retainHiddenField: "No" },
    //     { showField: false, retainHiddenField: null },
    //     { showField: true, retainHiddenField: "No" }
    // ].forEach(scenario => {
    //     it(`Text Field : retain_hidden_field "${scenario.retainHiddenField}" and field is Displayed ${scenario.showField}`, async function () {
    //         // CCD case config setup start 
    //         const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
    //         caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page', 1);
    //         let testFieldShowYesNo = caseConfig.getYesOrNoFieldTemplate();
    //         testFieldShowYesNo.id = "showTestField";
    //         testFieldShowYesNo.label = "Show Test Field?";
    //         testFieldShowYesNo.value = true;

    //         let textField = caseConfig.getTextFieldTemplate();
    //         textField.id = "simpleTextField";
    //         textField.value = "Test old value";
    //         textField.retain_hidden_value = scenario.retainHiddenField;
    //         textField.show_condition = `${testFieldShowYesNo.id}="Yes"`;

    //         caseConfig.addFieldToPage('HiddenFieldPage_1', testFieldShowYesNo, 0);
    //         caseConfig.addFieldToPage('HiddenFieldPage_1', textField, 1);
    //         setUpcaseConfig(caseConfig.caseConfigTemplate); 
    //         // CCD case config setup end 

    //         await MockApp.startServer();
    //         await BrowserUtil.browserInitWithAuth(roles);
    //         await headerPage.isTabPresent('Case list');
    //         await browser.get(`cases/case-details/1604309496714935/trigger/casetype_1/HiddenFieldPage_1`);

    //         const showFieldYesNoElement = $(`#${testFieldShowYesNo.id}`);

    //         await BrowserWaits.waitForElement(showFieldYesNoElement);
    //         await CCDCaseEditPage.selectRadioYesOrNo(testFieldShowYesNo.id, scenario.showField);
    //         await CCDCaseEditPage.clickContinue();
    //         await BrowserWaits.waitForCondition(async () => {
    //             return !(await showFieldYesNoElement.isPresent());
    //         });

    //         await CCDCaseEditPage.waitForChecYourAnswersPage();
    //         await CCDCaseEditPage.clickSubmit();
    //         await BrowserWaits.waitForCondition(async () => {
    //             return !(await CCDCaseEditPage.isCheckYourAnswersPagePresent());
    //         });

    //         if (!scenario.showField && scenario.retainHiddenField === "yes") {
    //             expect(caseEventSubmitRequestBody.data).to.not.have.property(textField.id);
    //         }

    //         if (!scenario.showField && scenario.retainHiddenField === "No") {
    //             expect(caseEventSubmitRequestBody.data).to.have.property(textField.id);
    //         }

    //         if (!scenario.showField && !scenario.retainHiddenField) {
    //             expect(caseEventSubmitRequestBody.data).to.have.property(textField.id);
    //         }

    //         if (scenario.showField && scenario.retainHiddenField === "No") {
    //             expect(caseEventSubmitRequestBody.data).to.have.property(textField.id);
    //         }
    //     });

    // });



    [
        { showField: false, retainHiddenField: "Yes" },
        { showField: false, retainHiddenField: "No" },
        { showField: false, retainHiddenField: null },
        { showField: true, retainHiddenField: "No" }
    ].forEach(scenario => {
        it(`Complex Field : retain_hidden_field "${scenario.retainHiddenField}" and field is Displayed ${scenario.showField}`, async function () {
            // CCD case config setup start 
            const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
            caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page', 1);
            let testFieldShowYesNo = caseConfig.getYesOrNoFieldTemplate();
            testFieldShowYesNo.id = "showTestField";
            testFieldShowYesNo.label = "Show Test Field?";
            testFieldShowYesNo.value = true;

            let textField = caseConfig.getTextFieldTemplate();
            textField.id = "simpleTextField";
            textField.value = "Test old value";
            textField.retain_hidden_value = scenario.retainHiddenField;
            textField.show_condition = `${testFieldShowYesNo.id}="Yes"`;

            caseConfig.addFieldToPage('HiddenFieldPage_1', testFieldShowYesNo, 0);
            caseConfig.addFieldToPage('HiddenFieldPage_1', textField, 1);
            setUpcaseConfig(caseConfig.caseConfigTemplate);
            // CCD case config setup end 

            await MockApp.startServer();
            await BrowserUtil.browserInitWithAuth(roles);
            await headerPage.isTabPresent('Case list');
            await browser.get(`cases/case-details/1604309496714935/trigger/casetype_1/HiddenFieldPage_1`);

            const showFieldYesNoElement = $(`#${testFieldShowYesNo.id}`);

            await BrowserWaits.waitForElement(showFieldYesNoElement);
            await CCDCaseEditPage.selectRadioYesOrNo(testFieldShowYesNo.id, scenario.showField);
            await CCDCaseEditPage.clickContinue();
            await BrowserWaits.waitForCondition(async () => {
                return !(await showFieldYesNoElement.isPresent());
            });

            await CCDCaseEditPage.waitForChecYourAnswersPage();
            await CCDCaseEditPage.clickSubmit();
            await BrowserWaits.waitForCondition(async () => {
                return !(await CCDCaseEditPage.isCheckYourAnswersPagePresent());
            });

            if (!scenario.showField && scenario.retainHiddenField === "yes") {
                expect(caseEventSubmitRequestBody.data).to.not.have.property(textField.id);
            }

            if (!scenario.showField && scenario.retainHiddenField === "No") {
                expect(caseEventSubmitRequestBody.data).to.have.property(textField.id);
            }

            if (!scenario.showField && !scenario.retainHiddenField) {
                expect(caseEventSubmitRequestBody.data).to.have.property(textField.id);
            }

            if (scenario.showField && scenario.retainHiddenField === "No") {
                expect(caseEventSubmitRequestBody.data).to.have.property(textField.id);
            }
        });

    });

// Test setup and support function

    function SetUpTextFieldCCDCaseConfig(showFieldUndertest, retainHiddenValue){
        const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
        caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page', 1);
        let testFieldShowYesNo = caseConfig.getYesOrNoFieldTemplate();
        testFieldShowYesNo.id = YESORNO_CONDITION_ID;
        testFieldShowYesNo.label = "Show Test Field?";
        testFieldShowYesNo.value = true;

        let textField = caseConfig.getTextFieldTemplate();
        textField.id = TEXTFIELD_ID;
        textField.value = "Test old value";
        textField.retain_hidden_value = retainHiddenValue;
        textField.show_condition = `${testFieldShowYesNo.id}="Yes"`;

        caseConfig.addFieldToPage('HiddenFieldPage_1', testFieldShowYesNo, 0);
        caseConfig.addFieldToPage('HiddenFieldPage_1', textField, 1);
        setUpcaseConfig(caseConfig.caseConfigTemplate); 

        return testFieldShowYesNo;
    }
    
    function setUpcaseConfig(caseConfig) {
        MockApp.onGet('/data/internal/cases/:caseid/event-triggers/:eventId', (req, res) => {
            res.send(caseConfig);
        });

        MockApp.onPost('/data/case-types/:caseType/validate', (req, res) => {
            caseValidationRequestBody = req.body;
            const responseBody = {
                data: req.body.data,
                "_links": { "self": { "href": "http://ccd-data-store-api-aat.service.core-compute-demo.internal"+req.path+"?pageId="+req.query.pageId } }
            }
            res.send(responseBody);
         });

        MockApp.onPost('/data/cases/:caseid/events', (req, res) => {
            caseEventSubmitRequestBody = req.body;
            const responseBody = {
                id: Date.now(),
                data: req.body.data,
                "_links": { "self": { "href": "http://ccd-data-store-api-demo.service.core-compute-demo.internal" + req.path + "?ignore-warning=false" } }
            }
            res.send(responseBody)
        });

    }

});


