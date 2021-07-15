var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../../nodeMock/app');
const workAllocationMockData = require('../../../../nodeMock/workAllocation/mockData');

const BrowserWaits = require('../../../../e2e/support/customWaits');
const taskListPage = require('../../../../e2e/features/pageObjects/workAllocation/taskListPage');
const taskManagerPage = require('../../../../e2e/features/pageObjects/workAllocation/taskManagerPage');
const taskAssignmentPage = require('../../../../e2e/features/pageObjects/workAllocation/taskAssignmentPage');

const caseDetailsPage = require('../../pageObjects/caseDetailsPage');

const headerPage = require('../../../../e2e/features/pageObjects/headerPage');
const CaseListPage = require('../../../../e2e/features/pageObjects/CaseListPage');
const errorPage = require('../../../../e2e/features/pageObjects/errorPage');

const SoftAssert = require('../../../util/softAssert');
const browserUtil = require('../../../util/browserUtil');
const errorMessageForResponseCode = require('../../../util/errorResonseMessage');


const MockUtil = require('../../../util/mockUtil');
const WAUtil = require('../../workAllocation/utils');
const nodeAppMockData = require('../../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../../e2e/support/reportLogger');

const headerpage = require('../../../../e2e/features/pageObjects/headerPage');
const taskActionPage = require('../../../../e2e/features/pageObjects/workAllocation/taskActionPage');
const TaskListTable = require('../../../../e2e/features/pageObjects/workAllocation/taskListTable');

const ArrayUtil = require("../../../../e2e/utils/ArrayUtil");

defineSupportCode(function ({ And, But, Given, Then, When }) {
    const taskListTable = new TaskListTable();
    When('I click task list pagination link {string} and wait for req reference {string} not null', async function (paginationLinktext, reference) {
        await taskListTable.waitForTable();
        await BrowserWaits.retryWithActionCallback(async () => {
            
            const val = await browserUtil.addTextToElementWithCssSelector('tbody tr .cdk-column-case_category exui-task-field,tbody tr .cdk-column-case_category exui-work-field', 'Sort test', true);
            if (val !== "success"){
                throw new Error(JSON.stringify(val));

           } 
            await taskListTable.clickPaginationLink(paginationLinktext);
            await BrowserWaits.waitForConditionAsync(async () => {
                const caseCatColVal = await taskListTable.getColumnValueForTaskAt('Case category', 1);
                return !caseCatColVal.includes('Sort test');
            });
            await BrowserWaits.waitForConditionAsync(async () => {
                return global.scenarioData[reference] !== null
            }, 5000);
        });
       
    });


    Then('I validate task search request with reference {string} has pagination parameters', async function (requestReference, datatable) {
        const reqBody = global.scenarioData[requestReference];
        const datatableHash = datatable.hashes()[0];
        expect(reqBody.searchRequest.pagination_parameters.page_number).to.equal(parseInt(datatableHash.PageNumber));
        expect(reqBody.searchRequest.pagination_parameters.page_size).to.equal(parseInt(datatableHash.PageSize));
    });


    Then('I validate task search request with reference {string} have search parameters', async function (requestReference, datatable) {
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
            if (searchHash.keyIsPresent){
                await softAssert.assert(async () => expect(searchParamObj.length > 0).to.equal(searchHash.keyIsPresent.toLowerCase() ==="true"));
            }else{  
                await softAssert.assert(async () => expect(searchParamObj.length > 0).to.be.true);
            }
             
            if (searchParamObj.length > 0) {
                if (searchHash.value && searchHash.value !== ""){
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

    Then('I validate task search request with reference {string} does not have search parameters', async function (requestReference, datatable) {
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