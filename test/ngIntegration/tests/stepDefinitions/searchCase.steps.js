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

const caseDetailsData = require('../../../nodeMock/ccd/caseDetails_data');

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

        for (const key of Object.keys(searchCaseInputValues)) {
            if (searchCaseInputValues[key] instanceof Array) {
                searchCaseInputValues[key].forEach((val, index) => {
                    expect(caseListReq["case." + key + "." + index]).to.equal(val);
                });
            } else {
                let caseKey = key.toLowerCase();
                expect(caseListReq[caseKey]).to.equal(searchCaseInputValues[key]);
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
        
        let reqData = { size: 25 }
        const searchCaseInputValues = {}
        for (const dynamicfield of searchCaseConfig.searchInputs) {
            searchCaseInputValues[dynamicfield.field.id] = await caseListPage.inputWorkbasketFilter(dynamicfield);
        }
        await searchCasePage.clickApplySearchCaseFilters();
        let totalCount = await caseListPage.getCasesCount();
        expect(reqData.size).to.equal(totalCount);
    });

    When('I click search case pagination {string} page', async function (prevnext) {
        if (prevnext.toLowerCase() === "next"){
            await searchCasePage.clickPaginationNextPage();
        } else if (prevnext.toLowerCase() === "previous"){
            await searchCasePage.clickPaginationPreviousPage();
        }
    });

    Then('I Validate case event trigger actions listed {string}', async function (searchCaseConfigReference) {
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
        await searchCasePage.openFirstCaseInResults();
        let nextStepDropDownData = await searchCasePage.nextStepTriggerActions()
        console.log("nextStepDropDownData::"+JSON.stringify(nextStepDropDownData));
        console.log("caseDetailsData.triggers::"+JSON.stringify(caseDetailsData.triggers));
        for (const eventObj in caseDetailsData.triggers) {
            console.log("eventObj::"+JSON.stringify(caseDetailsData.triggers[eventObj]));
            expect(nextStepDropDownData).to.be.contain(caseDetailsData.triggers[eventObj].name);
        }
        
    });


});
