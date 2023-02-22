
const assert = require('assert');

const MockUtil = require('../../util/mockUtil');
const { browser } = require('protractor');
const BrowserUtil = require('../../util/browserUtil');
const BrowserWaits = require('../../../e2e/support/customWaits');

const headerPage = require('../../../e2e/features/pageObjects/headerPage');
const taskManagerPage = require('../../../e2e/features/pageObjects/workAllocation/taskManagerPage');
const CaselistPage = require('../../../e2e/features/pageObjects/CaseListPage');
const errorPage = require('../../../e2e/features/pageObjects/errorPage');

const WAUtil = require('./utils');
const errorMessageForResponseCode = require('../../util/errorResonseMessage');

const workAllocationMockData = require('../../../nodeMock/workAllocation/mockData');
const SoftAssert = require('../../util/softAssert');

const caseListPage = new CaselistPage();
describe('Task Manager page', function () {
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

    async function navigatetoTaskManagerPage() {
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);

        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();
        await browser.get('tasks/task-manager/');
        await headerPage.waitForPrimaryNavDisplay();
        await taskManagerPage.amOnPage();
    }

    describe('Task manager :', function () {

        [22, 0].forEach(tasksCount => {
            it(`Display tasks count in Task list - showing ${tasksCount} tasks`, async function () {

                await MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
                    res.send(workAllocationMockData.getTaskManagerTasks(tasksCount));
                });

                await navigatetoTaskManagerPage();
                expect(await taskManagerPage.amOnPage(), "My tasks not dispplayed").to.be.true;

                expect(parseInt(await taskManagerPage.getTaskListCountInTable()), 'Task count does not match expected ').to.equal(tasksCount);
                expect(parseInt(await taskManagerPage.getTaskCountInDisplayLabel()), 'Task count does not match expected ').to.equal(tasksCount);
                if (tasksCount === 0) {
                    expect(await taskManagerPage.isTableFooterDisplayed(), "task list table footer is not displayed").to.be.true;
                    expect(await taskManagerPage.getTableFooterMessage(), "task list table footer message when 0 tasks are displayed").to.equal("There are no tasks that match your selection.");
                } else {
                    expect(await taskManagerPage.isTableFooterDisplayed(), "task list table footer is displayed").to.be.false;
                }
            });
        });


        it(`Sort tasks by column`, async function () {
            let tasksRequested = false;
            let sortColumnInRequestParam = "";

            await MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
                sortColumnInRequestParam = WAUtil.getTaskListReqSearchParam(req.body);
                tasksRequested = true;
                res.send(workAllocationMockData.getTaskManagerTasks(10));
            });

            await navigatetoTaskManagerPage();
            expect(await taskManagerPage.amOnPage(), "Task manager page not dispplayed").to.be.true;

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

            await navigatetoTaskManagerPage();
            expect(await taskManagerPage.amOnPage(), "Task manager not dispplayed").to.be.true;

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


        const testErrorResponseCodes = [500, 400, 401, 403];
        it(`Task manager on error `, async function () {

            await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
            await headerPage.waitForPrimaryNavDisplay()
            await BrowserUtil.waitForLD();

            await MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
                res.send(workAllocationMockData.getTaskManagerTasks(10));
            });

            // expect(await tasklistPage.amOnPage()).to.be.true;
            for (const responseCode of testErrorResponseCodes) {

                await headerPage.clickManageCases();
                MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
                    res.status(responseCode).send(workAllocationMockData.getTaskManagerTasks(10));
                })
                await headerPage.clickTaskList();

                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
                await softAssertion.assert(async () => expect(isErrorPageDisplayed, "Error page not displayed on error " + responseCode).to.be.true);
                if (isErrorPageDisplayed) {
                    const errorMessageDisplayed = await errorPage.getErrorMessage();
                    await softAssertion.assert(async () => expect(errorMessageDisplayed, "Error message does not match on error " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
                }
            }

            for (const responseCode of testErrorResponseCodes) {
                await headerPage.clickManageCases();
                MockUtil.setMockResponse("GET", "/workallocation/location", (req, res) => {
                    res.status(responseCode).send({error : "Mock error"});
                });
                await headerPage.clickTaskManager();

                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
                await softAssertion.assert(async () => expect(isErrorPageDisplayed, "/workallocation/location on error, error page not displayed " + responseCode).to.be.true);
                if (isErrorPageDisplayed) {
                    const errorMessageDisplayed = await errorPage.getErrorMessage();
                    await softAssertion.assert(async () => expect(errorMessageDisplayed, "/workallocation/location on error,Error message does not match " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
                }
            };

            for (const responseCode of testErrorResponseCodes) {
                await headerPage.clickManageCases();
                MockUtil.setMockResponse("GET", "/workallocation/caseworker", (req, res) => {
                    res.status(responseCode).send({ error: "Mock error" });
                });
                await headerPage.clickTaskManager();

                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
                await softAssertion.assert(async () => expect(isErrorPageDisplayed, "/workallocation/caseworker on error, error page not displayed " + responseCode).to.be.true);
                if (isErrorPageDisplayed) {
                    const errorMessageDisplayed = await errorPage.getErrorMessage();
                    await softAssertion.assert(async () => expect(errorMessageDisplayed, "/workallocation/caseworkeron error,Error message does not match " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
                }
            };

            softAssertion.finally();
        });

    });


});

