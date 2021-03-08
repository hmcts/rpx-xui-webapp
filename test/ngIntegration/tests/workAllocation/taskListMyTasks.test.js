
const assert = require('assert');

const MockUtil = require('../../util/mockUtil');
const { browser } = require('protractor');
const BrowserUtil = require('../../util/browserUtil');
const BrowserWaits = require('../../../e2e/support/customWaits');

const headerPage = require('../../../e2e/features/pageObjects/headerPage');
const taskListPage = require('../../../e2e/features/pageObjects/workAllocation/taskListPage');
const CaselistPage = require('../../../e2e/features/pageObjects/CaseListPage');
const errorPage = require('../../../e2e/features/pageObjects/errorPage');

const WAUtil = require('./utils');
const errorMessageForResponseCode = require('../../util/errorResonseMessage');

const workAllocationMockData = require('../../../nodeMock/workAllocation/mockData');
const SoftAssert = require('../../util/softAssert');

const caseListPage = new CaselistPage();
describe('Task list page', function () {
    let softAssertion = null;

    beforeEach(async function (done) {
        softAssertion = new SoftAssert(this);
        await browser.manage().deleteAllCookies();
        await MockUtil.resetMock();
        done();
    });
    afterEach(async function (done) {
        await MockUtil.stop();
        done();
    });

    async function navigatetoTaskListPage() {
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);

        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();
        await browser.get('tasks/list/');
        await headerPage.waitForPrimaryNavDisplay();
        await taskListPage.amOnPage();
    }

    describe('My tasks :', function(){

        [22, 0].forEach(tasksCount => {
            it(`Display tasks count in Task list - showing ${tasksCount} tasks`, async function () {

                MockUtil.setMockResponse("POST", "/workallocation/task/",(req,res)=>{
                    res.send(workAllocationMockData.getMyTasks(tasksCount));
                });
                
                await navigatetoTaskListPage();
                await taskListPage.clickMyTasks();
                expect(await taskListPage.isMyTasksDisplayed(),"My tasks not dispplayed").to.be.true;

                expect(parseInt(await taskListPage.getTaskListCountInTable()), 'Task count does not match expected ').to.equal(tasksCount);
                // expect(parseInt(await taskListPage.getTaskCountInDisplayLabel()), 'Task count does not match expected ').to.equal(tasksCount);
                if (tasksCount === 0) {
                    expect(await taskListPage.isTableFooterDisplayed(), "task list table footer is not displayed").to.be.true;
                    expect(await taskListPage.getTableFooterMessage(), "task list table footer message when 0 tasks are displayed").to.equal("You have no assigned tasks.");
                } else {
                    expect(await taskListPage.isTableFooterDisplayed(), "task list table footer is displayed").to.be.false;
                }
            });
        });


        it(`Sort tasks by column`, async function () {
            let tasksRequested = false;
            let sortColumnInRequestParam = "";

            MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
                sortColumnInRequestParam = WAUtil.getTaskListReqSearchParam(req.body);
                tasksRequested = true;
                res.send(workAllocationMockData.getMyTasks(10));
            });

            await navigatetoTaskListPage();
            await taskListPage.clickMyTasks();
            expect(await taskListPage.isMyTasksDisplayed(), "My tasks not dispplayed").to.be.true;


            const columnHeaders = await taskListPage.getColumnHeaderNames();
            console.log(columnHeaders);
            for (let i = 0; i < columnHeaders.length; i++) {
                let headerName = columnHeaders[i];
                const headerColId = await taskListPage.getHeaderElementWithName(headerName).getAttribute("id");
                expect(await taskListPage.getColumnSortState(headerName)).to.equal("none");

                await taskListPage.clickColumnHeader(headerName);
                await BrowserWaits.waitForCondition(async () => { return tasksRequested });
                expect(headerColId).to.contains(sortColumnInRequestParam);
                tasksRequested = false;
                sortColumnInRequestParam = "";
                expect(await taskListPage.getColumnSortState(headerName)).to.equal("ascending");

                await taskListPage.clickColumnHeader(headerName);
                await BrowserWaits.waitForCondition(async () => { return tasksRequested });
                expect(headerColId).to.contains(sortColumnInRequestParam);
                sortColumnInRequestParam = "";
                tasksRequested = false;
                expect(await taskListPage.getColumnSortState(headerName)).to.equal("descending");
            };
        });


        it(`Sort column persists in session`, async function () {

            await navigatetoTaskListPage();
            await taskListPage.clickMyTasks();
            expect(await taskListPage.isMyTasksDisplayed(), "My tasks not dispplayed").to.be.true;

            const columnHeaders = await taskListPage.getColumnHeaderNames();
            console.log(columnHeaders);
            expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("none");

            await taskListPage.clickColumnHeader(columnHeaders[1]);
            expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

            await headerPage.getTabElementWithText('Case list').click();
            expect(await caseListPage.amOnPage()).to.be.true;
            await headerPage.getTabElementWithText('Task list').click();
            await taskListPage.amOnPage();
            expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

        });


        const testErrorResponseCodes = [500, 400, 401, 403];
        it(`My Tasks on error `, async function () {

            await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
            await headerPage.waitForPrimaryNavDisplay()
            await BrowserUtil.waitForLD();

            MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
                res.send(workAllocationMockData.getMyTasks(10));
            });

            // expect(await tasklistPage.amOnPage()).to.be.true;
            for (const responseCode of testErrorResponseCodes) {

                await headerPage.clickManageCases();
                MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
                    res.status(responseCode).send(workAllocationMockData.getMyTasks(10));
                })
                await headerPage.clickTaskList();

                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
                await softAssertion.assert(async () => expect(isErrorPageDisplayed, "Error page not displayed on error " + responseCode).to.be.true);
                if (isErrorPageDisplayed) {
                    const errorMessageDisplayed = await errorPage.getErrorMessage();
                    await softAssertion.assert(async () => expect(errorMessageDisplayed, "Error message does not match on error " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
                }
            }

            softAssertion.finally();
        });

    });


});

