

const MockApp = require('../../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../../util/browserUtil');
const BrowserWaits = require('../../../e2e/support/customWaits');

const headerPage = require('../../../e2e/features/pageObjects/headerPage');
const taskManagerPage = require('../../../e2e/features/pageObjects/workAllocation/taskManagerPage');
const tasklistPage = require('../../../e2e/features/pageObjects/workAllocation/taskListPage');
const taskAssignmentPage = require('../../../e2e/features/pageObjects/workAllocation/taskAssignmentPage');



const workAllocationMockData = require('../../../nodeMock/workAllocation/mockData');
const CaselistPage = require('../../../e2e/features/pageObjects/CaseListPage');

const errorPage = require('../../../e2e/features/pageObjects/errorPage');

const SoftAssert = require('../../util/softAssert');


const caseListPage = new CaselistPage();
describe('Unhappy path task actions: ', function () {
    // BrowserWaits.setDefaultWaitTime(2000);

    async function setErrorRespondeCodeOnApi(method, endpoint, responseCode) {
        await MockApp.stopServer();
        if (method === 'GET') {
            MockApp.onGet(endpoint, (req, res) => {
                res.status(responseCode).send({ error: "Mock error " });
            });
        }

        if (method === 'POST') {
            MockApp.onPost(endpoint, (req, res) => {
                res.status(responseCode).send({ error: "Mock error " });
            });
        }
        await MockApp.startServer();

    }

    async function setMockResponse(callback) {
        await MockApp.stopServer();
        callback();
        await MockApp.startServer();
    }

    async function resetMock() {
        await MockApp.stopServer();
        MockApp.init();
        await MockApp.startServer();
    }

    function errorMessageForResponseCode(responseCode) {
        let message = "";

        if (responseCode >= 500 && responseCode < 600) {
            message = "Sorry, there is a problem with the service";
        }
        else if (responseCode >= 400 && responseCode < 500) {
            if (responseCode === 401 || responseCode === 403) {
                message = "Sorry, you're not authorised to perform this action";
            } else {
                message = "Sorry, there is a problem with the service";
            }
        }
        return message;
    }

    let softAssertion = null;
    beforeEach(async function (done) {
        softAssertion = new SoftAssert(this);

        await browser.manage().deleteAllCookies();
        MockApp.init();
        await MockApp.startServer();

        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });

    const testErrorResponseCodes = [500, 400, 401, 403];
    const myTask_actions = ["Reassign task", "Unassign task"];
    const availableTask_actions = ["Assign to me",];
    const taskManager_action = ["Reassign task", "Unassign task"];



    it(`My Tasks - Reassign page errors`, async function () {
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        // expect(await tasklistPage.amOnPage()).to.be.true;
        const reassignEndpoints = [
            { name: "Task details", url: "/workallocation/task/:taskId"},
            { name: "Locations", url: "/workallocation/location" },
            { name: "caseworkers", url: "/workallocation/caseworker/location/:locationId" }

        ];
        for (const endPoint of reassignEndpoints){
            for (const responseCode of testErrorResponseCodes) {
                setMockResponse(() => {
                    MockApp.onPost('/workallocation/task/', (req, res) => {
                        res.send(workAllocationMockData.getMyTasks(10));
                    });
                });
                await headerPage.clickManageCases();
                await setErrorRespondeCodeOnApi('GET', endPoint.url, responseCode);
                await headerPage.clickTaskList();
                await tasklistPage.amOnPage();
                expect(await tasklistPage.isMyTasksDisplayed(), "Default My tasks tab page not displayed").to.be.true;

                await tasklistPage.clickManageLinkForTaskAt(1);
                expect(await tasklistPage.isTaskActionRowForTaskDisplayed(1), "Task actions for selected task not displayed").to.be.true;

                await tasklistPage.clickTaskAction("Reassign task");

                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
                await softAssertion.assert(async () => expect(isErrorPageDisplayed, `For action Reassign on ${endPoint.name} status code ${responseCode} status response, error page not displayed`).to.be.true);
                if (isErrorPageDisplayed) {
                    const errorMessageDisplayed = await errorPage.getErrorMessage();
                    await softAssertion.assert(async () => expect(errorMessageDisplayed, `For action Reassign on ${endPoint.name} status code ${responseCode} status response, error message does not match`).to.contains(errorMessageForResponseCode(responseCode)));
                }
            }

        }
        

        softAssertion.finally();
    });


    it(`My Tasks - Reassign submit errors`, async function () {
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

    
        for (const responseCode of testErrorResponseCodes) {
            setMockResponse(() => {
                MockApp.onPost('/workallocation/task/', (req, res) => {
                    res.send(workAllocationMockData.getMyTasks(10));
                });
            });
            await headerPage.clickManageCases();
            await headerPage.clickTaskList();
            await tasklistPage.amOnPage();
            expect(await tasklistPage.isMyTasksDisplayed(), "Default My tasks tab page not displayed").to.be.true;

            await tasklistPage.clickManageLinkForTaskAt(1);
            expect(await tasklistPage.isTaskActionRowForTaskDisplayed(1), "Task actions for selected task not displayed").to.be.true;

            await tasklistPage.clickTaskAction("Reassign task");
            expect(await taskAssignmentPage.amOnPage(),"Not on task assignment page").to.be.true; 

            const locations = await taskAssignmentPage.getLocationOptions();
            const caseworkers = await taskAssignmentPage.getCaseworkerOptions();

            await taskAssignmentPage.selectLocation(locations[1]);
            await taskAssignmentPage.selectCaseworker(caseworkers[1]);

            setErrorRespondeCodeOnApi('POST', '/workallocation/task/:taskId/assign', responseCode);
            await taskAssignmentPage.clickReassignBtn();


            const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
            await softAssertion.assert(async () => expect(isErrorPageDisplayed, `For action Reassign on submit status code ${responseCode} status response, error page not displayed`).to.be.true);
            if (isErrorPageDisplayed) {
                const errorMessageDisplayed = await errorPage.getErrorMessage();
                await softAssertion.assert(async () => expect(errorMessageDisplayed, `For action Reassign on submit status code ${responseCode} status response, error message does not match`).to.contains(errorMessageForResponseCode(responseCode)));
            }
        }

    


        softAssertion.finally();
    });




    it(`Available - action link page errors`, async function () {
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        // expect(await tasklistPage.amOnPage()).to.be.true;
        for (const action of availableTask_actions) {
            for (const responseCode of testErrorResponseCodes) {
                setMockResponse(() => {
                    MockApp.onPost('/workallocation/task/', (req, res) => {
                        res.send(workAllocationMockData.getAvailableTasks(10));
                    });
                });
                await headerPage.clickManageCases();
                await setErrorRespondeCodeOnApi('GET', '/workallocation/task/:taskId', responseCode);
                await headerPage.clickTaskList();
                await tasklistPage.amOnPage();
                await tasklistPage.clickAvailableTasks();

                expect(await tasklistPage.isAvailableTasksDisplayed(), "Available tasks tab page not displayed").to.be.true;

                await browser.sleep(10000);
                await tasklistPage.clickManageLinkForTaskAt(1);
                expect(await tasklistPage.isTaskActionRowForTaskDisplayed(1), "Task actions for selected task not displayed").to.be.true;

                await tasklistPage.clickTaskAction(action);

                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
                await softAssertion.assert(async () => expect(isErrorPageDisplayed, `For action ${action} on task details ${responseCode} status response, error page not displayed`).to.be.true);
                if (isErrorPageDisplayed) {
                    const errorMessageDisplayed = await errorPage.getErrorMessage();
                    await softAssertion.assert(async () => expect(errorMessageDisplayed, `For action ${action} on task details ${responseCode} status response, error message does not match`).to.contains(errorMessageForResponseCode(responseCode)));
                }
            }
        }

        softAssertion.finally();
    });

    it(`Task Manager - action link page errors`, async function () {
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        // expect(await tasklistPage.amOnPage()).to.be.true;
        for (const action of availableTask_actions) {
            for (const responseCode of testErrorResponseCodes) {
                setMockResponse(() => {
                    MockApp.onPost('/workallocation/task/', (req, res) => {
                        res.send(workAllocationMockData.getAvailableTasks(10));
                    });
                });
                await headerPage.clickManageCases();
                await setErrorRespondeCodeOnApi('GET', '/workallocation/task/:taskId', responseCode);
                await headerPage.clickTaskList();
                await tasklistPage.amOnPage();
                await tasklistPage.clickAvailableTasks();

                expect(await tasklistPage.isAvailableTasksDisplayed(), "Available tasks tab page not displayed").to.be.true;

                await browser.sleep(10000);
                await tasklistPage.clickManageLinkForTaskAt(1);
                expect(await tasklistPage.isTaskActionRowForTaskDisplayed(1), "Task actions for selected task not displayed").to.be.true;

                await tasklistPage.clickTaskAction(action);

                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
                await softAssertion.assert(async () => expect(isErrorPageDisplayed, `For action ${action} on task details ${responseCode} status response, error page not displayed`).to.be.true);
                if (isErrorPageDisplayed) {
                    const errorMessageDisplayed = await errorPage.getErrorMessage();
                    await softAssertion.assert(async () => expect(errorMessageDisplayed, `For action ${action} on task details ${responseCode} status response, error message does not match`).to.contains(errorMessageForResponseCode(responseCode)));
                }
            }
        }

        softAssertion.finally();
    });

});

