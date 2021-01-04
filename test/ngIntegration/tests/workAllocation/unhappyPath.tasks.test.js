

const MockApp = require('../../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../../util/browserUtil');
const BrowserWaits = require('../../../e2e/support/customWaits');

const headerPage = require('../../../e2e/features/pageObjects/headerPage');
const taskManagerPage = require('../../../e2e/features/pageObjects/workAllocation/taskManagerPage');
const tasklistPage = require('../../../e2e/features/pageObjects/workAllocation/taskListPage');

const workAllocationMockData = require('../../../nodeMock/workAllocation/mockData');
const CaselistPage = require('../../../e2e/features/pageObjects/CaseListPage');

const errorPage = require('../../../e2e/features/pageObjects/errorPage');

const SoftAssert = require('../../util/softAssert');


const caseListPage = new CaselistPage();
describe('Unhappy path: ', function () {
    BrowserWaits.setDefaultWaitTime(2000);

    async function setErrorRespondeCodeOnApi(method ,endpoint, responseCode){
        await MockApp.stopServer();
        if(method === 'GET'){
            MockApp.onGet(endpoint, (req,res) => {
                res.status(responseCode).send({ error: "Mock error "});
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

    async function resetMock(){
        await MockApp.stopServer();
        MockApp.init();
        await MockApp.startServer();
    }

    function errorMessageForResponseCode(responseCode){
        let message = "";
       
        if (responseCode >= 500 && responseCode < 600){
            message = "Sorry, there is a problem with the service";
        }
        else if (responseCode >= 400 && responseCode < 500){
            if (responseCode === 401 || responseCode === 403 ){
                message = "Sorry, you're not authorised to perform this action";
            }else{
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

    const testErrorResponseCodes = [500, 400, 401,403];
    const myTask_actions = ["Reassign task", "Unassign task"];
    const availableTask_actions = ["Assign to me", ];
    const taskManager_action = ["Reassign task", "Unassign task"];


    it(`My Tasks on error `, async function () {

        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();
        setMockResponse(() => {
            MockApp.onPost('/workallocation/task/', (req,res) => {
                res.send(workAllocationMockData.getMyTasks(10));
            });
        });
        // expect(await tasklistPage.amOnPage()).to.be.true;
        for (const responseCode of testErrorResponseCodes) {

            await headerPage.clickManageCases();
            await setErrorRespondeCodeOnApi('POST', '/workallocation/task/', responseCode);
            await headerPage.clickTaskList();

            const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
            await softAssertion.assert(async () => expect(isErrorPageDisplayed, "Error page not displayed on error " + responseCode).to.be.true);
            if (isErrorPageDisplayed){
                const errorMessageDisplayed = await errorPage.getErrorMessage();
                await softAssertion.assert(async () => expect(errorMessageDisplayed, "Error message does not match on error " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
            } 
        }
        
        softAssertion.finally();
    });

    it(`Available  tasks on error `, async function () {

        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        // expect(await tasklistPage.amOnPage()).to.be.true;
        for (const responseCode of testErrorResponseCodes){
            resetMock();
            await headerPage.clickManageCases();
            await headerPage.clickTaskList();
            await tasklistPage.amOnPage();
            await setErrorRespondeCodeOnApi('POST', '/workallocation/task/', responseCode);
            await tasklistPage.clickAvailableTasks();
        
            const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
            await softAssertion.assert(async () => expect(isErrorPageDisplayed, "/workallocation/task/ on error, error page not displayed" + responseCode).to.be.true);
            if (isErrorPageDisplayed) {
                const errorMessageDisplayed = await errorPage.getErrorMessage();
                await softAssertion.assert(async () => expect(errorMessageDisplayed, "/workallocation/task/ on error,Error message does not match " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
            }
        };

        for (const responseCode of testErrorResponseCodes) {
            resetMock();
            await headerPage.clickManageCases();
            await headerPage.clickTaskList();
            await tasklistPage.amOnPage();
            await setErrorRespondeCodeOnApi('GET', '/workallocation/location', responseCode);
            await tasklistPage.clickAvailableTasks();

            const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
            await softAssertion.assert(async () => expect(isErrorPageDisplayed, "/workallocation/location on error, error page not displayed " + responseCode).to.be.true);
            if (isErrorPageDisplayed) {
                const errorMessageDisplayed = await errorPage.getErrorMessage();
                await softAssertion.assert(async () => expect(errorMessageDisplayed, "/workallocation/location on error,Error message does not match " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
            }
        };
        softAssertion.finally();
    });


    it(`Task manager tasks on error `, async function () {

        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        // expect(await tasklistPage.amOnPage()).to.be.true;
        for (const responseCode of testErrorResponseCodes) {
            await headerPage.clickManageCases();
            await setErrorRespondeCodeOnApi('POST', '/workallocation/task/', responseCode);
            await headerPage.clickTaskManager();

            const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
            await softAssertion.assert(async () => expect(isErrorPageDisplayed, "/workallocation/task/ on error, error page not displayed " + responseCode).to.be.true);
            if (isErrorPageDisplayed) {
                const errorMessageDisplayed = await errorPage.getErrorMessage();
                await softAssertion.assert(async () => expect(errorMessageDisplayed, "/workallocation/task/ on error,Error message does not match " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
            }
        };

        for (const responseCode of testErrorResponseCodes) {
            await headerPage.clickManageCases();
            await setErrorRespondeCodeOnApi('GET', '/workallocation/location', responseCode);
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
            await setErrorRespondeCodeOnApi('GET', '/workallocation/caseworker', responseCode);
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

