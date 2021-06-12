
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
        
        MockApp.onPost("/workallocation2/taskWithPagination/", (req, res) => {
            try{
                const thisPageTasks = [];
                const pageNum = req.body.searchRequest.pagination_parameters.page_number;
                const pageSize = req.body.searchRequest.pagination_parameters.page_size;

                const startIndexForPage = (pageNum-1) * pageSize;
                const endIndexForPage = (startIndexForPage + pageSize) < tasks.length ? startIndexForPage + pageSize : tasks.length - 1;
                for (let i = startIndexForPage; i < endIndexForPage; i++) {
                    thisPageTasks.push(tasks[i]);
                }
                res.send({ tasks: thisPageTasks, total_records: tasks.length });
            }catch(e){
                CucumberReporter.AddMessage("Mock error on request /workallocation2/taskWithPagination/ "+e);
                res.status(500).send({error:'mock error occured'});
            }
            

            
        });

    });


    Then('I validate {string} tasks columns sorting with taskRequest url {string}', async function (waPage,taskRequesturl, datatable) {
        const softAssert = new SoftAssert();
        const datatableHashes = datatable.hashes();
        const pageUndertest = waPage.toLowerCase() === "my work" ? myWorkPage : null;

        let sortColumnInRequestParam = null;
        MockApp.addIntercept(taskRequesturl, (req, res, next) => {
            sortColumnInRequestParam = req.body;   
        })
        //await MockApp.stopServer();
       // await MockApp.startServer();

        for (let i = 0; i < datatableHashes.length; i++) {
            
            sortColumnInRequestParam = null;
            const headerName = datatableHashes[i]['Header'];
            const sortColumnId = datatableHashes[i]['FieldId'];

            const headerElement = await pageUndertest.getHeaderElementWithName(headerName);
            // const headerColId = await headerElement.getAttribute("id");
           
            softAssert.setScenario("sorting: " + headerName);
            await softAssert.assert(async () => expect(await pageUndertest.getColumnSortState(headerName)).to.equal("none"));
           

            await pageUndertest.clickColumnHeader(headerName);
            await BrowserWaits.waitForCondition(async () => { return sortColumnInRequestParam !== null });
            const sortingParamsInReq = sortColumnInRequestParam.searchRequest.sorting_parameters;
            await softAssert.assert(async () => expect(sortingParamsInReq.length > 0,'Sorting param not present in request').to.be.true);
            await softAssert.assert(async () => expect(sortingParamsInReq[0].sort_by, 'Sorting param name in request').to.equal(sortColumnId));
            await softAssert.assert(async () => expect(sortingParamsInReq[0].sort_order, 'Sorting param value in request').to.equal('asc'));
            await softAssert.assert(async () => expect(await pageUndertest.getColumnSortState(headerName),'Sort column state mismatch').to.equal("ascending"));


            sortColumnInRequestParam = null;
            await pageUndertest.clickColumnHeader(headerName);
            await BrowserWaits.waitForCondition(async () => { return sortColumnInRequestParam !== null });
            //  expect(headerColId).to.contains(sortColumnInRequestParam);
            await softAssert.assert(async () => expect(sortingParamsInReq.length > 0, 'Sorting param not present in request').to.be.true);
            await softAssert.assert(async () => expect(sortingParamsInReq[0].sort_by, 'Sorting param name in request').to.equal(sortColumnId));
            await softAssert.assert(async () => expect(sortingParamsInReq[0].sort_order, 'Sorting param value in request').to.equal('desc'));
            await softAssert.assert(async () => expect(await pageUndertest.getColumnSortState(headerName), 'Sort column state mismatch').to.equal("descending"));


        }
        softAssert.finally();

    });


}) ;