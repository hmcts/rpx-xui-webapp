var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../../nodeMock/app');
const workAllocationMockData = require('../../../../nodeMock/workAllocation/mockData');

const BrowserWaits = require('../../../../e2e/support/customWaits');
const WACasesTable = require('../../../../e2e/features/pageObjects/workAllocation/casesTable');

const caseDetailsPage = require('../../pageObjects/caseDetailsPage');

const SoftAssert = require('../../../util/softAssert');
;
const CucumberReporter = require('../../../../e2e/support/reportLogger');
const browserUtil = require('../../../util/browserUtil');


const ArrayUtil = require("../../../../e2e/utils/ArrayUtil");

defineSupportCode(function ({ And, But, Given, Then, When }) {
    const waCasesTable = new WACasesTable();
  
    
    When('I click work allocation cases pagination link {string} and wait for req reference {string} not null', async function (paginationLinktext, reference) {

        await BrowserWaits.retryWithActionCallback(async () => {
            await browserUtil.addTextToElementWithCssSelector('tbody tr:nth-of-type(1) .cdk-column-case_category exui-work-field', 'Sort test', true);

            await waCasesTable.clickPaginationLink(paginationLinktext);
            await BrowserWaits.waitForConditionAsync(async () => {
                const caseCatColVal = await waCasesTable.getColumnValueForCaseAt('Case category', 1);
                return !caseCatColVal.includes('Sort test');
            });
            await BrowserWaits.waitForConditionAsync(async () => {
                return global.scenarioData[reference] !== null
            }, 5000);
        });

    });




    Then('I validate work allocation cases search request with reference {string} has pagination parameters', async function (requestReference, datatable) {
        const reqBody = global.scenarioData[requestReference];
        const datatableHash = datatable.hashes()[0];
        expect(reqBody.searchRequest.pagination_parameters.page_number).to.equal(parseInt(datatableHash.PageNumber));
        expect(reqBody.searchRequest.pagination_parameters.page_size).to.equal(parseInt(datatableHash.PageSize));
    });


    Then('I validate work allocation cases search request with reference {string} have search parameters', async function (requestReference, datatable) {
        const softAssert = new SoftAssert();
        const reqBody = global.scenarioData[requestReference];
        const datatableHash = datatable.hashes();
        CucumberReporter.AddMessage("Req body received:");
        CucumberReporter.AddJson(reqBody);
        const reqSearchParams = reqBody.searchRequest.search_parameters;
        for (let i = 0; i < datatableHash.length; i++) {
            searchHash = datatableHash[i];
            const searchParamObj = await ArrayUtil.filter(reqSearchParams, async (searchObj) => searchObj.key === searchHash.key);

            softAssert.setScenario(`Search param with key ${searchHash.key} is present`);
            if (searchHash.keyIsPresent) {
                await softAssert.assert(async () => expect(searchParamObj.length > 0).to.equal(searchHash.keyIsPresent.toLowerCase() === "true"));
            } else {
                await softAssert.assert(async () => expect(searchParamObj.length > 0).to.be.true);
            }

            if (searchParamObj.length > 0) {
                if (searchHash.value && searchHash.value !== "") {
                    softAssert.setScenario(`Search param with key ${searchHash.key} and values ${searchHash.value} is present`);
                    await softAssert.assert(async () => expect(searchParamObj[0].values).to.includes(searchHash.value));
                }

                if (searchHash.size) {
                    softAssert.setScenario(`Search param with key ${searchHash.key} and has value count ${searchHash.size}`);
                    await softAssert.assert(async () => expect(searchParamObj[0].values.length).to.equal(parseInt(searchHash.size)));
                }

            }
        }
        softAssert.finally();

    });

    Then('I validate work allocation cases search request with reference {string} does not have search parameters', async function (requestReference, datatable) {
        const softAssert = new SoftAssert();
        const reqBody = global.scenarioData[requestReference];
        const datatableHash = datatable.hashes();

        const reqSearchParams = reqBody.searchRequest.search_parameters;
        for (let i = 0; i < datatableHash.length; i++) {
            searchHash = datatableHash[i];
            const searchParamObj = await ArrayUtil.filter(reqSearchParams, async (searchObj) => searchObj.key === searchHash.key);
            softAssert.setScenario(`Search param with key ${searchHash.key} is present`);
            if (searchParamObj.length > 0) {
                softAssert.setScenario(`Search param with key ${searchHash.key} and values ${searchHash.values} is present`);
                await softAssert.assert(async () => expect(searchParamObj[0].values).to.not.includes(searchHash.value));
            }
        }
        softAssert.finally();

    });


});