
var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');
const workAllocationMockData = require('../../../nodeMock/workAllocation/mockData');

const BrowserWaits = require('../../../e2e/support/customWaits');
const taskListPage = require('../../../e2e/features/pageObjects/workAllocation/taskListPage');
const taskManagerPage = require('../../../e2e/features/pageObjects/workAllocation/taskManagerPage');
const taskAssignmentPage = require('../../../e2e/features/pageObjects/workAllocation/taskAssignmentPage');


const headerPage = require('../../../e2e/features/pageObjects/headerPage');
const CaseListPage = require('../../../e2e/features/pageObjects/CaseListPage');
const errorPage = require('../../../e2e/features/pageObjects/errorPage'); 

const SoftAssert = require('../../util/softAssert');
const browserUtil = require('../../util/browserUtil');
const errorMessageForResponseCode = require('../../util/errorResonseMessage');


const MockUtil = require('../../util/mockUtil');
const WAUtil = require('../workAllocation/utils');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    const testErrorResponseCodes = [500, 400, 401, 403];
    const myTask_actions = ["Reassign task", "Unassign task"];
    const availableTask_actions = ["Assign to me"];
    const taskManager_action = ["Reassign task", "Unassign task"];


    const caseListPage = new CaseListPage();
    Given('I set MOCK My tasks count {int}', async function (taskCount) {
        MockApp.onPost("/workallocation/task/", (req, res) => {
            res.send(workAllocationMockData.getMyTasks(taskCount));
        });

    });

    Given('I set MOCK available tasks count {int}', async function (taskCount) {
        MockApp.onPost("/workallocation/task/", (req, res) => {
            res.send(workAllocationMockData.getAvailableTasks(taskCount));
        });

    });

    Given('I set MOCK Task manager tasks count {int}', async function (taskCount) {
        MockApp.onPost("/workallocation/task/", (req, res) => {
            res.send(workAllocationMockData.getTaskManagerTasks(taskCount));
        });

    });

    Then('I validate tasks count in page {int}', async function (tasksCount){
   
        expect(parseInt(await taskListPage.getTaskListCountInTable()), 'Task count does not match expected ').to.equal(tasksCount);
        // expect(parseInt(await taskListPage.getTaskCountInDisplayLabel()), 'Task count does not match expected ').to.equal(tasksCount);
        if (tasksCount === 0) {
            expect(await taskListPage.isTableFooterDisplayed(), "task list table footer is not displayed").to.be.true;
            expect(await taskListPage.getTableFooterMessage(), "task list table footer message when 0 tasks are displayed").to.equal("You have no assigned tasks.");
        } else {
            expect(await taskListPage.isTableFooterDisplayed(), "task list table footer is displayed").to.be.false;
        }   
     });

     Then('I validate tasks column sorting', async function(){
         let tasksRequested = false; 
         let sortColumnInRequestParam = "";
         await MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
             CucumberReporter.AddMessage("get tasks with sort request body:");
             CucumberReporter.AddJson(req.body);
             sortColumnInRequestParam = WAUtil.getTaskListReqSearchParam(req.body);
             tasksRequested = true;
             res.send(workAllocationMockData.getMyTasks(10));
         });

         const columnHeaders = await taskListPage.getColumnHeaderNames();
         console.log(columnHeaders);
         for (let i = 0; i < columnHeaders.length; i++) {

             let headerName = columnHeaders[i];
             CucumberReporter.AddMessage("Validating sort column for header : " + headerName);

             const headerElement = await taskListPage.getHeaderElementWithName(headerName);
             const headerColId = await headerElement.getAttribute("id");
             expect(await taskListPage.getColumnSortState(headerName)).to.equal("none");

             await taskListPage.clickColumnHeader(headerName);
             await BrowserWaits.waitForCondition(async () => { return tasksRequested });
            //  expect(headerColId).to.contains(sortColumnInRequestParam);
             tasksRequested = false;
             sortColumnInRequestParam = "";
             expect(await taskListPage.getColumnSortState(headerName)).to.equal("ascending");

             await taskListPage.clickColumnHeader(headerName);
             await BrowserWaits.waitForCondition(async () => { return tasksRequested });
            //  expect(headerColId).to.contains(sortColumnInRequestParam);
             sortColumnInRequestParam = "";
             tasksRequested = false;
             expect(await taskListPage.getColumnSortState(headerName)).to.equal("descending");
         }
 
     });

    Then('I validate My tasks sort column persist in session', async function () {

        const columnHeaders = await taskListPage.getColumnHeaderNames();
        CucumberReporter.AddMessage(columnHeaders);
        expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("none");

        await taskListPage.clickColumnHeader(columnHeaders[1]);
        expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

        await headerPage.getTabElementWithText('Case list').click();
        expect(await caseListPage.amOnPage()).to.be.true;
        await headerPage.getTabElementWithText('Task list').click();
        await taskListPage.amOnPage();
        await taskListPage.waitForTable();
        expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

    }); 

    Then('I validate Available tasks sort column persist in session', async function () {

        const columnHeaders = await taskListPage.getColumnHeaderNames();
        CucumberReporter.AddMessage(columnHeaders);
        expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("none");

        await taskListPage.clickColumnHeader(columnHeaders[1]);
        expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

        await headerPage.getTabElementWithText('Case list').click();
        expect(await caseListPage.amOnPage()).to.be.true;
        await headerPage.getTabElementWithText('Task list').click();
        await taskListPage.amOnPage();
        await taskListPage.clickAvailableTasks();
        expect(await taskListPage.isAvailableTasksDisplayed(),"Not on Available tasks page").to.be.true;
        await taskListPage.waitForTable();

        expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

    }); 

    Then('I validate Task manager tasks sort column persist in session', async function () {

        const columnHeaders = await taskListPage.getColumnHeaderNames();
        CucumberReporter.AddMessage(columnHeaders);
        expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("none");

        await taskListPage.clickColumnHeader(columnHeaders[1]);
        expect(await taskListPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

        await headerPage.getTabElementWithText('Case list').click();
        expect(await caseListPage.amOnPage()).to.be.true;
        await headerPage.getTabElementWithText('Task manager').click();
        await taskManagerPage.amOnPage();
        await taskManagerPage.waitForTable();
        expect(await taskManagerPage.getColumnSortState(columnHeaders[1])).to.equal("ascending");

    }); 


    Then('I validate error responses on My tasks page', async function(){
        const softAssertion = new SoftAssert(this);

        await MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
            res.send(workAllocationMockData.getMyTasks(10));
        });

        // expect(await taskListPage.amOnPage()).to.be.true;
        for (const responseCode of testErrorResponseCodes) {
            CucumberReporter.AddMessage(`Validation on ${responseCode} error POST /workallocation/task/ `);
 
            await headerPage.clickManageCases();
            await MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
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
    
    Then('I validate error responses on available tasks page', async function(){
        const softAssertion = new SoftAssert(this);
 
        await MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
            res.send(workAllocationMockData.getMyTasks(10));
        });

        // expect(await taskListPage.amOnPage()).to.be.true;
        for (const responseCode of testErrorResponseCodes) {
            await MockUtil.resetMock();
        
            await headerPage.clickManageCases();
            await headerPage.clickTaskList();
            await taskListPage.amOnPage();
            await MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
                res.status(responseCode).send(workAllocationMockData.getAvailableTasks(10));
            });
            CucumberReporter.AddMessage(`Validation on ${responseCode} error POST /workallocation/task/ `);

            await taskListPage.clickAvailableTasks();

            const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
            await softAssertion.assert(async () => expect(isErrorPageDisplayed, "Error page not displayed on error " + responseCode).to.be.true);
            if (isErrorPageDisplayed) {
                const errorMessageDisplayed = await errorPage.getErrorMessage();
                await softAssertion.assert(async () => expect(errorMessageDisplayed, "Error message does not match on error " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
            }
        }

        for (const responseCode of testErrorResponseCodes) {
            await MockUtil.resetMock();

            await headerPage.clickManageCases();
            await headerPage.clickTaskList();
            await taskListPage.amOnPage();
            await MockUtil.setMockResponse("GET", "/workallocation/location", (req, res) => {
                res.status(responseCode).send(workAllocationMockData.getAvailableTasks(10));
            })

            CucumberReporter.AddMessage(`Validation on ${responseCode} error POST /workallocation/location/ `);

            await taskListPage.clickAvailableTasks();

            const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
            await softAssertion.assert(async () => expect(isErrorPageDisplayed, "/workallocation/location on error, error page not displayed " + responseCode).to.be.true);
            if (isErrorPageDisplayed) {
                const errorMessageDisplayed = await errorPage.getErrorMessage();
                await softAssertion.assert(async () => expect(errorMessageDisplayed, "/workallocation/location on error,Error message does not match " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
            }
        };
        softAssertion.finally();
    });


    Then('I validate Task manager page tasks count {int}', async function (tasksCount){
       
        expect(parseInt(await taskManagerPage.getTaskListCountInTable()), 'Task count does not match expected ').to.equal(tasksCount);
        expect(parseInt(await taskManagerPage.getTaskCountInDisplayLabel()), 'Task count does not match expected ').to.equal(tasksCount);
        if (tasksCount === 0) {
            expect(await taskManagerPage.isTableFooterDisplayed(), "task list table footer is not displayed").to.be.true;
            expect(await taskManagerPage.getTableFooterMessage(), "task list table footer message when 0 tasks are displayed").to.equal("There are no tasks that match your selection.");
        } else {
            expect(await taskManagerPage.isTableFooterDisplayed(), "task list table footer is displayed").to.be.false;
        }

    });

    Then('I validate error responses on Task manager page', async function(){
        const softAssertion = new SoftAssert(this);

        // expect(await taskListPage.amOnPage()).to.be.true;
        for (const responseCode of testErrorResponseCodes) {

            await headerPage.clickManageCases();
            await MockUtil.setMockResponse("POST", "/workallocation/task/", (req, res) => {
                res.status(responseCode).send(workAllocationMockData.getTaskManagerTasks(10));
            })
            CucumberReporter.AddMessage(`Validation on ${responseCode} error POST /workallocation/task/ `);

            await headerPage.clickTaskList();

            const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
            await softAssertion.assert(async () => expect(isErrorPageDisplayed, "Error page not displayed on error " + responseCode).to.be.true);
            if (isErrorPageDisplayed) {
                const errorMessageDisplayed = await errorPage.getErrorMessage();
                await softAssertion.assert(async () => expect(errorMessageDisplayed, "Error message does not match on error " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
            }
        }

        for (const responseCode of [500, 401, 403]) {
            await headerPage.clickManageCases();
            await MockUtil.resetMock();
            await MockUtil.setMockResponse("GET", "/workallocation/location", (req, res) => {
                res.status(responseCode).send({ error: "Mock error" });
            });
            CucumberReporter.AddMessage(`Validation on ${responseCode} error GET /workallocation/location/ `);

            await headerPage.clickTaskManager();

            const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
            await softAssertion.assert(async () => expect(isErrorPageDisplayed, "/workallocation/location on error, error page not displayed " + responseCode).to.be.true);
            if (isErrorPageDisplayed) {
                const errorMessageDisplayed = await errorPage.getErrorMessage();
                await softAssertion.assert(async () => expect(errorMessageDisplayed, "/workallocation/location on error,Error message does not match " + responseCode).to.contains(errorMessageForResponseCode(responseCode)));
            }
        };

        softAssertion.finally();

    });

    Then('I validate My task reassign page errors', async function(){
        const softAssertion = new SoftAssert(this);

        const reassignEndpoints = [
            { name: "Task details", url: "/workallocation/task/:taskId" },
            { name: "Locations", url: "/workallocation/location" }

        ];
    
        for (const endPoint of reassignEndpoints) {
            for (const responseCode of testErrorResponseCodes) {
                await headerPage.clickManageCases();
               await MockUtil.resetMock(); 
                await MockUtil.setMockResponse("POST", '/workallocation/task/', (req, res) => {
                    res.send(workAllocationMockData.getMyTasks(10));
                });

                 await MockUtil.setMockResponse("GET", endPoint.url, (req, res) => {
                    res.status(responseCode).send({});
                })

                await headerPage.clickTaskList();
                await taskListPage.amOnPage();
                expect(await taskListPage.isMyTasksDisplayed(), "Default My tasks tab page not displayed").to.be.true;

                await taskListPage.clickManageLinkForTaskAt(1);
                expect(await taskListPage.isTaskActionRowForTaskDisplayed(1), "Task actions for selected task not displayed").to.be.true;

                await taskListPage.clickTaskAction("Reassign task");
                // await browserUtil.waitForNetworkResponse(endPoint.url);
                softAssertion.setScenario(`Scenario validation: GET ${endPoint.url} error response ${responseCode} `); 
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

    Then('I validate My task reassign submit errors', async function(){
        const softAssertion = new SoftAssert(this);
       
        for (const responseCode of testErrorResponseCodes) {
            await MockUtil.resetMock();
            await MockUtil.setMockResponse("POST", '/workallocation/task/', (req, res) => {
                res.send(workAllocationMockData.getMyTasks(10));
            }); 
            await headerPage.clickManageCases();
            await headerPage.clickTaskList();
            await taskListPage.amOnPage();
            expect(await taskListPage.isMyTasksDisplayed(), "Default My tasks tab page not displayed").to.be.true;

            await taskListPage.clickManageLinkForTaskAt(1);
            expect(await taskListPage.isTaskActionRowForTaskDisplayed(1), "Task actions for selected task not displayed").to.be.true;

            await taskListPage.clickTaskAction("Reassign task");
            expect(await taskAssignmentPage.amOnPage(), "Not on task assignment page").to.be.true;

            const locations = await taskAssignmentPage.getLocationOptions();
            const caseworkers = await taskAssignmentPage.getCaseworkerOptions();

            await taskAssignmentPage.selectLocation(locations[1]);
            await taskAssignmentPage.selectCaseworker(caseworkers[1]);

            await MockUtil.setMockResponse("POST", '/workallocation/task/:taskId/assign', (req, res) => {
                res.status(responseCode).send({});
            });

            await taskAssignmentPage.clickReassignBtn();
            softAssertion.setScenario(`Scenario validation: POST /workallocation/task/:taskId/assign error response ${responseCode} `);

            if (responseCode === 400){
                const isErrorMessageBannerDisplayed = await taskAssignmentPage.isBannerMessageDisplayed(); 
                await softAssertion.assert(async () => expect(isErrorMessageBannerDisplayed, `For action Reassign on submit status code ${responseCode} status response, error message banner not displayed`).to.be.true);
                
            }else{
                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
                await softAssertion.assert(async () => expect(isErrorPageDisplayed, `For action Reassign on submit status code ${responseCode} status response, error page not displayed`).to.be.true);
                if (isErrorPageDisplayed) {
                    const errorMessageDisplayed = await errorPage.getErrorMessage();
                    await softAssertion.assert(async () => expect(errorMessageDisplayed, `For action Reassign on submit status code ${responseCode} status response, error message does not match`).to.contains(errorMessageForResponseCode(responseCode)));
                }
            }

           
        }
        softAssertion.finally();
    });

    Then('I validate available task action page errors', async function(){
        const softAssertion = new SoftAssert(this);
        
        // expect(await taskListPage.amOnPage()).to.be.true;
        for (const action of availableTask_actions) {
            for (const responseCode of testErrorResponseCodes) {
                
                await headerPage.clickManageCases();
                await MockUtil.resetMock(); 
                await MockUtil.setMockResponse("POST", '/workallocation/task/', (req, res) => {
                    res.send(workAllocationMockData.getAvailableTasks(10));
                });
                await MockUtil.setMockResponse("POST", '/workallocation/task/:taskId/claim', (req, res) => {
                    res.status(responseCode).send({});
                })
                await headerPage.clickTaskList();
                await taskListPage.amOnPage();
                await taskListPage.clickAvailableTasks();

                expect(await taskListPage.isAvailableTasksDisplayed(), "Available tasks tab page not displayed").to.be.true;

                await taskListPage.clickManageLinkForTaskAt(1);
                expect(await taskListPage.isTaskActionRowForTaskDisplayed(1), "Task actions for selected task not displayed").to.be.true;

                await taskListPage.clickTaskAction(action);

                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();

                softAssertion.setScenario(`Scenario validation: on action ${action} GET /workallocation/task/:taskId/claim error response ${responseCode} `); 
                if(responseCode === 400){
                    expect(await taskAssignmentPage.isBannerMessageDisplayed(),"Error message banner not displayed on 400").to.be.true
                    expect(await taskAssignmentPage.isBannermessageWithTextDisplayed("The task is no longer available"), "Error message banner not displayed on 400").to.be.true;

                }else{
                    await softAssertion.assert(async () => expect(isErrorPageDisplayed, `For action ${action} on task details ${responseCode} status response, error page not displayed`).to.be.true);
                    if (isErrorPageDisplayed) {
                        const errorMessageDisplayed = await errorPage.getErrorMessage();
                        await softAssertion.assert(async () => expect(errorMessageDisplayed, `For action ${action} on task details ${responseCode} status response, error message does not match`).to.contains(errorMessageForResponseCode(responseCode)));
                    }
                }
            } 
        }

        softAssertion.finally();

    });


    Then('I validate Task manager task action page errors', async function(){
        const softAssertion = new SoftAssert(this);

       
        // expect(await taskListPage.amOnPage()).to.be.true;
        for (const action of taskManager_action) {
            for (const responseCode of testErrorResponseCodes) {
               
                await headerPage.clickManageCases();
                await MockUtil.resetMock();
                await MockUtil.setMockResponse("POST", '/workallocation/task/', (req, res) => {
                    res.send(workAllocationMockData.getTaskManagerTasks(10));
                });
                await MockUtil.setMockResponse("GET", '/workallocation/task/:taskId', (req, res) => {
                    res.status(responseCode).send({});
                });
                await headerPage.clickTaskList();
                await taskListPage.amOnPage();
                await taskListPage.clickAvailableTasks();

                expect(await taskListPage.isAvailableTasksDisplayed(), "Available tasks tab page not displayed").to.be.true;

                await taskListPage.clickManageLinkForTaskAt(1);
                expect(await taskListPage.isTaskActionRowForTaskDisplayed(1), "Task actions for selected task not displayed").to.be.true;

                await taskListPage.clickTaskAction(action);

                const isErrorPageDisplayed = await errorPage.isErrorPageDisplayed();
                softAssertion.setScenario(`Scenario validation: on action ${action} GET /workallocation/task/:taskId error response ${responseCode} `); 

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