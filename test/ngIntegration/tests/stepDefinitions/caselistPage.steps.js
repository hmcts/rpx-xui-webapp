var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

const caseListPage = require('../pageObjects/caselistPage');

const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const BrowserWaits = require('../../../e2e/support/customWaits');
const headerpage = require('../../../e2e/features/pageObjects/headerPage');

const { getTestJurisdiction } = require('../../mockData/ccdCaseMock');

const ccdApi = require('../../../nodeMock/ccd/ccdApi');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see case list page displayed', async function () {
        expect(await caseListPage.amOnPage(), "Case list page is not displayed").to.be.true;
    });

    Then('I validate workbasket {string} fields displayed', async function(workbasketConfigReference){
        const workbasketConfigurator = global.scenarioData[workbasketConfigReference];
        for (const dynamicfield of workbasketConfigurator.getConfig().workbasketInputs) {
            expect(await caseListPage.isWorkbasketFilterDisplayed(dynamicfield)).to.be.true
        }

    });

    Then('I Validate case search request to contain filters from workbasket {string}', async function(workbasketConfigRef){
        const workbasketConfig = global.scenarioData[workbasketConfigRef].getConfig();
        let caseListReq = null;
        MockApp.addIntercept('/data/internal/searchCases', (req, res, next) => {
            console.log("Add intercpy called");
            caseListReq = req.query;
            next();
        })

        //await MockApp.stopServer();
        //await MockApp.startServer();

        const workbasketInputValues = {}
        for (const dynamicfield of workbasketConfig.workbasketInputs) {
            workbasketInputValues[dynamicfield.field.id] = await caseListPage.inputWorkbasketFilter(dynamicfield);
        }

        caseListReq = null;
        await caseListPage.clickApplyWorkbasketFilters();
        await BrowserWaits.waitForCondition(async () => caseListReq !== null);

        for (const key of Object.keys(workbasketInputValues)) {
            if (workbasketInputValues[key] instanceof Array) {
                workbasketInputValues[key].forEach((val, index) => {
                    expect(caseListReq["case." + key + "." + index]).to.equal(val);
                });
            } else {
                expect(caseListReq["case." + key]).to.equal(workbasketInputValues[key]);
            }
        }
    });


    Then('I validate workbasket fixed list items for workbasket {string}', async function(workbasketConfigRef){
        const workbasketConfig = global.scenarioData[workbasketConfigRef].getConfig();

        for (const dynamicfield of workbasketConfig.workbasketInputs) {

            await caseListPage.validateDynamicFields(dynamicfield);
            
            expect(await caseListPage.isWorkbasketFilterDisplayed(dynamicfield)).to.be.true
        }
    });

    Then('I Validate case fields displayed and values {string}', async function(workbasketConfigRef){
        const workbasketConfig = global.scenarioData[workbasketConfigRef].getConfig();
        const workbasketInputValues = {}
        for (const dynamicfield of workbasketConfig.workbasketInputs) {
            workbasketInputValues[dynamicfield.field.id] = await caseListPage.inputWorkbasketFilter(dynamicfield);
        }

        await caseListPage.clickApplyWorkbasketFilters();
        await caseListPage.caseDataValidation();

    })

    Then('I Validate total cases count {string}', async function(workbasketConfigRef){
        const workbasketConfig = global.scenarioData[workbasketConfigRef].getConfig();
        let reqData = { size: 25 }

        const workbasketInputValues = {}
        for (const dynamicfield of workbasketConfig.workbasketInputs) {
            workbasketInputValues[dynamicfield.field.id] = await caseListPage.inputWorkbasketFilter(dynamicfield);
        }

        await caseListPage.clickApplyWorkbasketFilters();

        let cases = ccdApi.getWorkbasketCases();
        let totalCount = await caseListPage.getCasesCount();
        expect(reqData.size).to.equal(totalCount);
    });

});
