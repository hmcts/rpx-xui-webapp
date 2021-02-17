var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

const caseListPage = require('../pageObjects/caselistPage');
const searchCasePage = require('../pageObjects/searchPage');

const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const BrowserWaits = require('../../../e2e/support/customWaits');
const headerpage = require('../../../e2e/features/pageObjects/headerPage');

const { getTestJurisdiction } = require('../../mockData/ccdCaseMock');

const ccdApi = require('../../../nodeMock/ccd/ccdApi');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see search case page displayed', async function () {
        expect(await searchCasePage.amOnPage(), "Search case page is not displayed").to.be.true;
    });

    When('I select jurisdiction {string} case type {string}', async function (jurisdiction,caseType) {
        await searchCasePage.selectJurisdiction(jurisdiction);
        await searchCasePage.selectCaseType(caseType);
    });

    Then('I validate search case {string} fields displayed', async function(searchCaseConfigReference){
        const searchCaseConfig= global.scenarioData[searchCaseConfigReference];
        for (const dynamicfield of searchCaseConfig.getConfig().searchInputs) {
            expect(await searchCasePage.isWorkbasketFilterDisplayed(dynamicfield)).to.be.true
        }

    });

    Then('I Validate case search request to contain filters from search case {string}', async function(searchCaseConfigReference){
        const searchCaseConfig = global.scenarioData[searchCaseConfigReference].getConfig();
        let caseListReq = null;
        MockApp.addIntercept('/data/internal/searchCases', (req, res, next) => {
            console.log("Add intercpy called");
            caseListReq = req.query;
            next();
        })

        await MockApp.stopServer();
        await MockApp.startServer();

        const searchCaseInputValues = {}
        for (const dynamicfield of searchCaseConfig.searchInputs) {
            searchCaseInputValues[dynamicfield.field.id] = await caseListPage.inputWorkbasketFilter(dynamicfield);
        }

        caseListReq = null;
        await searchCasePage.clickApplySearchCaseFilters();
        await BrowserWaits.waitForCondition(async () => caseListReq !== null);
        console.log("caseListReq:::",JSON.stringify(caseListReq))

        for (const key of Object.keys(searchCaseInputValues)) {
            if (searchCaseInputValues[key] instanceof Array) {
                searchCaseInputValues[key].forEach((val, index) => {
                    expect(caseListReq["case." + key + "." + index]).to.equal(val);
                });
            } else {
                console.log("searchCaseInputValues:::"+searchCaseInputValues[key])
                expect(caseListReq[key]).to.equal(searchCaseInputValues[key]);
            }
        }
    });

    Then('I validate searchcase fixed list items for searchcase {string}', async function(searchCaseConfigRef){
        const searchCaseConfig = global.scenarioData[searchCaseConfigRef].getConfig();

        for (const dynamicfield of searchCaseConfig.searchInputs) {

            await caseListPage.validateDynamicFields(dynamicfield);
            
            expect(await caseListPage.isWorkbasketFilterDisplayed(dynamicfield)).to.be.true
        }
    });

    Then('I Validate case headers and values {string}', async function(searchCaseConfigRef){
        const searchCaseConfig = global.scenarioData[searchCaseConfigRef].getConfig();
        const searchCaseInputValues = {}
        for (const dynamicfield of searchCaseConfig.searchInputs) {
            searchCaseInputValues[dynamicfield.field.id] = await caseListPage.inputWorkbasketFilter(dynamicfield);
        }

        await searchCasePage.clickApplySearchCaseFilters();
        await caseListPage.caseDataValidation();
    })

    Then('I Validate search case total cases count {string}', async function(searchCaseConfigRef){
        const searchCaseConfig = global.scenarioData[searchCaseConfigRef].getConfig();
        
        let reqData = { size: 250 }
        const searchCaseInputValues = {}
        for (const dynamicfield of searchCaseConfig.searchInputs) {
            searchCaseInputValues[dynamicfield.field.id] = await caseListPage.inputWorkbasketFilter(dynamicfield);
        }


        await searchCasePage.clickApplySearchCaseFilters();

        let totalCount = await caseListPage.getCasesCount();
        expect(reqData.size).to.equal(totalCount);
    });

});
