
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

const myWorkPage = require('../../../../e2e/features/pageObjects/workAllocation/myWorkPage');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    const caseListPage = new CaseListPage();
    Given('I set MOCK tasks with permissions for view {string} and assigned state {string}', async function (view,assignedState ,taskPermissionsTable) {
        const taskPermissionHashes = taskPermissionsTable.hashes(); 
        const tasks = [];

        for (let i = 0; i < taskPermissionHashes.length; i++){
            let taskCount = 0;
            if (taskPermissionHashes[i].hasOwnProperty('Count')){
                taskCount = parseInt(taskPermissionHashes[i]['Count']);
            }else{
                taskCount = 1;
            }

            for (let j = 0; j < taskCount;j++){
                tasks.push(workAllocationMockData.getRelease2TaskWithPermissions(taskPermissionHashes[i]['Permissions'].split(","), view, assignedState));
            }
            
        }
        global.scenarioData[`workallocation2.${view.split(" ").join("")}`] = tasks ;
        
    });


    Then('I validate {string} tasks columns sorting with taskRequest url {string} on page {int}', async function (waPage,taskRequesturl,onPage ,datatable) {
        const softAssert = new SoftAssert();
        const datatableHashes = datatable.hashes();
        const pageUndertest = waPage.toLowerCase() === "my work" ? myWorkPage : null;

        let sortColumnInRequestParam = null;
        MockApp.addIntercept(taskRequesturl, (req, res, next) => {
            CucumberReporter.AddJson(req.body);
            sortColumnInRequestParam = req.body;  
            next(); 
        })
        await MockApp.stopServer();
        await MockApp.startServer();

        for (let i = 0; i < datatableHashes.length; i++) {
            
            sortColumnInRequestParam = null;
            const headerName = datatableHashes[i]['Header'];
            const sortColumnId = datatableHashes[i]['FieldId'];

            const headerElement = await pageUndertest.getHeaderElementWithName(headerName);
            // const headerColId = await headerElement.getAttribute("id");
           
            softAssert.setScenario("sorting: " + headerName);
            await softAssert.assert(async () => expect(await pageUndertest.getColumnSortState(headerName)).to.equal("none"));
           
            await browserUtil.addTextToElementWithCssSelector('tbody tr:nth-of-type(1) .cdk-column-case_category exui-task-field','Sort test',true);
            await pageUndertest.clickColumnHeader(headerName); 
            await BrowserWaits.waitForConditionAsync(async () => { 
                return sortColumnInRequestParam !== null
                 });
            await BrowserWaits.waitForConditionAsync(async () => {
                const caseCatColVal = await pageUndertest.getColumnValueForTaskAt('Case category',1);
                return !caseCatColVal.includes('Sort test');
             });


            const asc_sortingParamsInReq = sortColumnInRequestParam.searchRequest.sorting_parameters;
            await softAssert.assert(async () => expect(asc_sortingParamsInReq.length > 0).to.be.true, 'Sorting param present in request');
            await softAssert.assert(async () => expect(sortColumnInRequestParam.searchRequest.pagination_parameters.page_number).to.equal(onPage), 'Sorting req on page');
            await softAssert.assert(async () => expect(asc_sortingParamsInReq[0].sort_by).to.equal(sortColumnId), 'Sorting param name in request ' + sortColumnId);
            await softAssert.assert(async () => expect(asc_sortingParamsInReq[0].sort_order).to.equal('asc'), 'Sorting param value in request asc');
            await softAssert.assert(async () => expect(await pageUndertest.getColumnSortState(headerName)).to.equal("ascending"), 'Sort column state ascending');

            
            sortColumnInRequestParam = null;
            await browserUtil.addTextToElementWithCssSelector('tbody tr:nth-of-type(1) .cdk-column-case_category exui-task-field', 'Sort test', true);
            await pageUndertest.clickColumnHeader(headerName);
           
            await BrowserWaits.waitForConditionAsync(async () => {
                return sortColumnInRequestParam !== null
            });
            await BrowserWaits.waitForConditionAsync(async () => {
                const caseCatColVal = await pageUndertest.getColumnValueForTaskAt('Case category', 1);
                return !caseCatColVal.includes('Sort test');
            });

            //  expect(headerColId).to.contains(sortColumnInRequestParam);
            const descSortingParamsInReq = sortColumnInRequestParam.searchRequest.sorting_parameters;
            await softAssert.assert(async () => expect(descSortingParamsInReq.length > 0).to.be.true, 'Sorting param present in request');
            await softAssert.assert(async () => expect(sortColumnInRequestParam.searchRequest.pagination_parameters.page_number).to.equal(onPage), 'Sorting req on page');
            await softAssert.assert(async () => expect(descSortingParamsInReq[0].sort_by).to.equal(sortColumnId), 'Sorting param name in request ' + sortColumnId);
            await softAssert.assert(async () => expect(descSortingParamsInReq[0].sort_order).to.equal('desc'), 'Sorting param value in request desc');
            await softAssert.assert(async () => expect(await pageUndertest.getColumnSortState(headerName)).to.equal("descending"), 'Sort column state descending');


        }
        softAssert.finally();

    });


}) ;