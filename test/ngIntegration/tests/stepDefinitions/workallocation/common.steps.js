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

defineSupportCode(function ({ And, But, Given, Then, When }) {
    const taskListTable = new TaskListTable();
    When('I click task list pagination link {string} and wait for req reference {string} not null', async function (paginationLinktext, reference) {
        
        await BrowserWaits.retryWithActionCallback(async () => {
            await browserUtil.addTextToElementWithCssSelector('tbody tr:nth-of-type(1) .cdk-column-case_category exui-task-field', 'Sort test', true);
            
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

    

});