;


const assert = require('assert');

const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../util/browserUtil');
const BrowserWaits = require('../../e2e/support/customWaits');

const headerPage = require('../../e2e/features/pageObjects/headerPage');
const taskManagerPage = require('../../e2e/features/pageObjects/workAllocation/taskManagerPage');
const workAllocationMockData = require('../../nodeMock/workAllocation/mockData');
const CaselistPage = require('../../e2e/features/pageObjects/CaseListPage');

const caseListPage = new CaselistPage(); 
describe('EUI-2961 Count of tasks in Task manager', function () {

    beforeEach(async function (done) {
        await browser.manage().deleteAllCookies();
        MockApp.init();
        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });

    async function preconditionsetup(){
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);

        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();
        await browser.get('tasks/task-manager/');
        await headerPage.waitForPrimaryNavDisplay();

        await taskManagerPage.waitForTable();
    }

    [ 22, 0].forEach(tasksCount => {
        it(`Display tasks count in Task manager page - showing ${tasksCount} tasks`, async function () {
            MockApp.onPost('/workallocation/task/', (req, res) => {
                res.send(workAllocationMockData.getTaskList(tasksCount));
            });
            await MockApp.startServer();
            await preconditionsetup(); 
            expect(parseInt(await taskManagerPage.getTaskListCountInTable()), 'Task count does not match expected ').to.equal(tasksCount);
            expect(parseInt(await taskManagerPage.getTaskCountInDisplayLabel()), 'Task count does not match expected ').to.equal(tasksCount);
            if (tasksCount === 0){
                expect(await taskManagerPage.isTableFooterDisplayed(),"task list table footer is not displayed").to.be.true;
                expect(await taskManagerPage.getTableFooterMessage(),"task list table footer message when 0 tasks are displayed").to.equal("There are no tasks that match your selection.");
            }else{
                expect(await taskManagerPage.isTableFooterDisplayed(), "task list table footer is displayed").to.be.false;
            }
        });
    });

    it(` Tasks count display is refreshed upon changes to Assignee or/and Task location filters in Task manager page`, async function () {
        MockApp.onPost('/workallocation/task/', (req, res) => {
            const assignees = getTaskListReqSearchParam(req.body, "assignee","IN");
            const locations = getTaskListReqSearchParam(req.body, "location", "IN");

            console.log("assignees " + assignees.length);
            if (assignees.length === 1 && locations.length === 1) {
                res.send(workAllocationMockData.getTaskList(2));
            }else if (assignees.length === 1 || locations.length === 1){
                res.send(workAllocationMockData.getTaskList(1));
            }else{
                res.send(workAllocationMockData.getTaskList(10));
            } 
        });
        await MockApp.startServer();
        await preconditionsetup(); 

        const caseworkers = await taskManagerPage.getCaseworkerFilterOptions()
        const locations = await taskManagerPage.getLocationFilterOptions();

        await taskManagerPage.selectCaseworkerFilter(caseworkers[3]); 
        await BrowserWaits.waitForCondition(async () => { return await taskManagerPage.getTaskListCountInTable() !== 10 });
        expect(parseInt(await taskManagerPage.getTaskListCountInTable()), 'Task count does not match expected ').to.equal(1);
        expect(parseInt(await taskManagerPage.getTaskCountInDisplayLabel()), 'Task count does not match expected ').to.equal(1);

        await taskManagerPage.selectCaseworkerFilter(locations[3]);
        await BrowserWaits.waitForCondition(async () => {return await taskManagerPage.getTaskListCountInTable() !== 1});
        expect(parseInt(await taskManagerPage.getTaskListCountInTable()), 'Task count does not match expected ').to.equal(2);
        expect(parseInt(await taskManagerPage.getTaskCountInDisplayLabel()), 'Task count does not match expected ').to.equal(2)
       
    });

});


describe('EUI-2889 Sorting the Task Columns in Task List and Task Manager', function () {

    beforeEach(async function (done) {
        await browser.manage().deleteAllCookies();
        MockApp.init();
        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });

    it(`Sort tasks by column`, async function () {
        let tasksRequested = false;
        let sortColumnInRequestParam = "";
        MockApp.onPost('/workallocation/task/', (req, res) => {
            sortColumnInRequestParam = getTaskListReqSortParam(req.body);
            tasksRequested = true;
            res.send(tasklist);
        });
        await MockApp.startServer();
        await preconditionsetup(); 

       
        const columnHeaders = await taskManagerPage.getColumnHeaderNames();
        console.log(columnHeaders);
        for (let i = 0; i < columnHeaders.length; i++) {
            let headerName = columnHeaders[i];
            const headerColId = await taskManagerPage.getHeaderElementWithName(headerName).getAttribute("id");
            expect(await taskManagerPage.getColumnSortState(headerName)).to.equal("none"); 
            
            await taskManagerPage.clickColumnHeader(headerName);
            await BrowserWaits.waitForCondition(async () => { return tasksRequested });
            expect(headerColId).to.contains(sortColumnInRequestParam);
            tasksRequested = false;
            sortColumnInRequestParam = "";
            expect(await taskManagerPage.getColumnSortState(headerName)).to.equal("ascending");
            
            await taskManagerPage.clickColumnHeader(headerName);
            await BrowserWaits.waitForCondition(async () => { return tasksRequested });
            expect(headerColId).to.contains(sortColumnInRequestParam);
            sortColumnInRequestParam = "";
            tasksRequested = false;
            expect(await taskManagerPage.getColumnSortState(headerName)).to.equal("descending"); 
        }; 
    });
   

    it(`Sort column persists in session`, async function () {
       
        await MockApp.startServer();
        await preconditionsetup(); 

        const columnHeaders = await taskManagerPage.getColumnHeaderNames();
        console.log(columnHeaders);
        expect(await taskManagerPage.getColumnSortState(columnHeaders[1])).to.equal("none");

        await taskManagerPage.clickColumnHeader(columnHeaders[1]);
        expect(await taskManagerPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

        await headerPage.getTabElementWithText('Case list').click();
        expect(await caseListPage.amOnPage()).to.be.true;
        await headerPage.getTabElementWithText('Task manager').click();
        await taskManagerPage.amOnPage();
        expect(await taskManagerPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

    });

});


function getTaskListReqSearchParam(reqBody, key, operator){
    const searhParam = reqBody.search_parameters.filter(searchParam => searchParam.key === key && searchParam.operator === operator);
    if (searhParam.length === 0){
        return null;
    }
    return searhParam[0].values; 
}

function getTaskListReqSortParam(reqBody) {
    const searhParam = reqBody.search_parameters.filter(searchParam => searchParam.operator === "sort");
    if (searhParam.length === 0) {
        return null;
    }
    return searhParam[0].key;
}
