
var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');
const TaskListTable = require('../../pageObjects/workAllocation/taskListTable');
const casesTable = require('../../pageObjects/workAllocation/casesTable');


const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseListPage = require("../../pageObjects/CaseListPage");

const myWorkPage = require("../../pageObjects/workAllocation/myWorkPage");
const allWorkPage = require("../../pageObjects/workAllocation/allWorkPage");

const taskActionPage = require(".././../pageObjects/workAllocation/taskActionPage");

const ArrayUtil = require('../../../utils/ArrayUtil');
const findPersonPage = require('../../pageObjects/workAllocation/common/findPersonComponent');
const taskCheckYourChangesPage = require('../../pageObjects/workAllocation/taskCheckYourChangesPage');

const workflowUtil = require('../../pageObjects/common/workflowUtil');

const taskListPage = require('../../../../e2e/features/pageObjects/workAllocation/taskListPage');

defineSupportCode(function ({ And, But, Given, Then, When }) {
    const taskListTable = new TaskListTable();
    const waCaseListTable = new casesTable();

    Then('I validate task list page results text displayed as {string}', async function (pagnationResultText) {
        expect(await taskListTable.getPaginationResultText()).to.include(pagnationResultText);
    });

    Then('I validate WA case list page results text displayed as {string}', async function (pagnationResultText) {
        expect(await waCaseListTable.getPaginationResultText()).to.include(pagnationResultText);
    });

    Then('I validate task table pagination controls, is displayed state is {string}', async function (isDisplauyed) {
        expect(await taskListTable.isPaginationControlDisplayed()).to.equal(isDisplauyed.toLowerCase() == "true");
    });

    When('I click task list pagination link {string}', async function (paginationLinktext) {
        await BrowserWaits.waitForSeconds(1);
        
        await BrowserWaits.waitForConditionAsync(async () => {
            const colCount = await taskListTable.getColumnCount();
            const rowCount = await taskListTable.getTaskListCountInTable();
            return colCount > 0 && rowCount > 0;
        });
        if (paginationLinktext.toLowerCase() === "next") { 
            await taskListTable.pageNextLink.click();
        } else if (paginationLinktext.toLowerCase() === "previous") { 
            await taskListTable.pagePreviousLink.click();
        } else {
            await taskListTable.clickPaginationPageNum(paginationLinktext);
        }
    });

    When('I click WA case list pagination link {string}', async function (paginationLinktext) {
        await BrowserWaits.waitForSeconds(1);

        await BrowserWaits.waitForConditionAsync(async () => {
            const colCount = await waCaseListTable.getColumnCount();
            const rowCount = await waCaseListTable.getTaskListCountInTable();
            return colCount > 0 && rowCount > 0;
        });
        if (paginationLinktext.toLowerCase() === "next") {
            await waCaseListTable.pageNextLink.click();
        } else if (paginationLinktext.toLowerCase() === "previous") {
            await waCaseListTable.pagePreviousLink.click();
        } else {
            await waCaseListTable.clickPaginationPageNum(paginationLinktext);
        }
    });

    When('I click task list table header column {string}', async function(columnHeaderLabel){
        await taskListTable.clickColumnHeader(columnHeaderLabel);
    });

    Then('I validate task list table sorted with column {string} in order {string}', async function(columnheaderlabel, sortOrder){
        const columnSortVal = await taskListTable.getColumnSortState(columnheaderlabel);
        expect(columnSortVal).to.include(sortOrder.toLowerCase());
    });

    When('I click task list table header column {string}, I validate task list table sorted with column {string} in order {string}', async function (columnHeaderLabel, columnheaderlabel, sortOrder) {
       await BrowserWaits.retryWithActionCallback(async () => {
           await taskListTable.clickColumnHeader(columnHeaderLabel);
           const columnSortVal = await taskListTable.getColumnSortState(columnheaderlabel);
           await BrowserWaits.waitForConditionAsync(async () => {
               return columnSortVal.includes(sortOrder.toLowerCase())
           }, 3000, "Sort column state to be " + sortOrder.toLowerCase());
       }); 
       
    });

    Then('I validate task list table columns displayed', async function (datatable) {
        const columnHeadersHash = datatable.hashes();
        const expectdColHeaders = await ArrayUtil.map(columnHeadersHash, (headerhash) => headerhash.ColumnHeader );  
        const actualHeadeColumns = await taskListTable.getColumnHeaderNames();
        expect(actualHeadeColumns.length, `Actual Cols ||${actualHeadeColumns}|| !== Expected Cols ||${expectdColHeaders}|| `).to.equal(expectdColHeaders.length);
        expect(actualHeadeColumns, `Actual Cols ||${actualHeadeColumns}|| !== Expected Cols ||${expectdColHeaders}|| `).to.include.members(expectdColHeaders);

    });

    Then('I validate task list columns are links', async function(datatable){
        const columnHeadersHash = datatable.hashes();
        const expectdLinkCols = await ArrayUtil.map(columnHeadersHash, (headerhash) => headerhash.ColumnHeader);

        const actualHeadeColumns = await taskListTable.getColumnHeaderNames();

        const actuallinkColumns = await ArrayUtil.filter(actualHeadeColumns,  (headerCol) => {
            return  taskListTable.isColValForTaskALink(headerCol,1);
        });

        expect(actuallinkColumns.length, `Actual Cols ||${actuallinkColumns}|| !== Expected Cols ||${expectdLinkCols}|| `).to.equal(expectdLinkCols.length);
        expect(actuallinkColumns).to.include.members(expectdLinkCols);

    });

    When('I click task column link {string} at row {int}', async function(colName, rowPos){
        await taskListTable.clickTaskColLink(colName,rowPos);
    });

    Then('I validate manage link actions for tasks', async function (tasksDatatable) {
        const softAssert = new SoftAssert();
        const taskHashes = tasksDatatable.hashes();

        for (let i = 0; i < taskHashes.length; i++) {
          
            const taskActions = taskHashes[i]["actions"].split(",");
            let taskIndex = parseInt(taskHashes[i].index);
            if (taskHashes[i]["actions"] === ""){
                softAssert.setScenario(`Manage link not present for task  ${JSON.stringify(taskHashes[i])} `);
                await softAssert.assert(async () => expect(await taskListTable.isManageLinkPresent(taskIndex)).to.be.false);
                continue;
            }
            if (!(await taskListTable.isManageLinkOpenForTaskAtPos(taskIndex))){
                await taskListTable.clickManageLinkForTaskAt(taskIndex);
            }

            for (let j = 0; j < taskActions.length;j++){
                let action = taskActions[j];

                softAssert.setScenario(`Action ${action} present for task  ${JSON.stringify(taskHashes[i])} isPresent`);
                await softAssert.assert(async () => expect(await taskListTable.isTaskActionPresent(action)).to.be.true);
            }
            
        }
        softAssert.finally();

    });

    Then('I validate manage link actions for cases', async function (tasksDatatable) {
        const softAssert = new SoftAssert();
        const taskHashes = tasksDatatable.hashes();

        for (let i = 0; i < taskHashes.length; i++) {

            const taskActions = taskHashes[i]["actions"].split(",");
            let taskIndex = parseInt(taskHashes[i].index);
            if (taskHashes[i]["actions"] === "") {
                softAssert.setScenario(`Manage link not present for task  ${JSON.stringify(taskHashes[i])} `);
                await softAssert.assert(async () => expect(await waCaseListTable.isManageLinkPresent(taskIndex + 1)).to.be.false);
                continue;
            }
            if (!(await waCaseListTable.isManageLinkOpenForCaseAtPos(taskIndex))) {
                await waCaseListTable.clickManageLinkForCaseAt(taskIndex);
            }

            for (let j = 0; j < taskActions.length; j++) {
                let action = taskActions[j];
                softAssert.setScenario(`Action ${action} present for task  ${JSON.stringify(taskHashes[i])} isPresent`);
                await softAssert.assert(async () => expect(await waCaseListTable.isCaseActionPresent(action)).to.be.true);
            }

        }
        softAssert.finally();

    });


    When('I open Manage link for task at row {int}', async function (taskAtRow) {
        const isManageLinkOpen = await taskListTable.isManageLinkOpenForTaskAtPos(taskAtRow);
        if (!isManageLinkOpen) {
            await BrowserWaits.retryWithActionCallback(async () => {
                await taskListTable.clickManageLinkForTaskAt(taskAtRow);
                await BrowserWaits.waitForConditionAsync(async () => await taskListTable.isManageLinkOpenForTaskAtPos(taskAtRow), 2000);
            });
        }
    });

    When('I open Manage link for wa cases at row {int}', async function (taskAtRow) {
        const isManageLinkOpen = await waCaseListTable.isManageLinkOpenForCaseAtPos(taskAtRow);
        if (!isManageLinkOpen) {
            await BrowserWaits.retryWithActionCallback(async () => {
                await waCaseListTable.clickManageLinkForCaseAt(taskAtRow);
                await BrowserWaits.waitForConditionAsync(async () => await waCaseListTable.isManageLinkOpenForCaseAtPos(taskAtRow), 2000);
            });
        }
    });

    Then('I see action link {string} is present for task with Manage link open', async function(manageLinkAction){
        expect(await taskListTable.isTaskActionPresent(manageLinkAction), `Task action ${manageLinkAction} is not present`).to.be.true;
    });

    Then('I see action link {string} is present for case with Manage link open', async function (manageLinkAction) {
        expect(await waCaseListTable.isCaseActionPresent(manageLinkAction), `Case action ${manageLinkAction} is not present`).to.be.true;
    });

    When('I click action link {string} on task with Manage link open', async function (manageLinkAction){
        await taskListTable.clickTaskAction(manageLinkAction);
    });

    When('I click action link {string} on case with Manage link open', async function (manageLinkAction) {
        await waCaseListTable.clickCaseAction(manageLinkAction);
    });

    Then('I validate notification message banner is displayed in {string} page', async function(page){
        page = page.toLowerCase();
        let pageObject = null;
       if(page.includes("my work")){
           pageObject = myWorkPage;
       } else if (page.includes("all work")){
           pageObject = allWorkPage;
        } else if (page.includes("case details")) {
           pageObject = caseDetailsPage;
       } else if (page.includes("case list")) {
           pageObject = caseListPage;
       } else{
            throw new Error(`message banner validation step not implemented for page ${page}`);
        }

        expect(await pageObject.taskInfoMessageBanner.isBannerMessageDisplayed(),`Not on page  ${page} or message banner not displayed`).to.be.true
    });

    Then('I validate notification banner messages displayed in {string} page', async function (page,messagesDatatable) {
        const messages = messagesDatatable.hashes();
        let actualmessages = [];
        page = page.toLowerCase();
        if (page.includes("my work")) {
            actualmessages = await myWorkPage.taskInfoMessageBanner.getBannerMessagesDisplayed()
        } else if (page.includes("all work")) {
            actualmessages = await allWorkPage.taskInfoMessageBanner.getBannerMessagesDisplayed();
        } else if (page.includes("case details")) {
            actualmessages = await caseDetailsPage.taskInfoMessageBanner.getBannerMessagesDisplayed();
        } else if (page.includes("case list")) {
            actualmessages = await caseListPage.taskInfoMessageBanner.getBannerMessagesDisplayed();
        }  else {
            throw new Error(`message banner validation step not implemented for page ${page}`);
        }

        for(let i = 0; i < messages.length;i++){
            let matchingMsgs = await ArrayUtil.filter(actualmessages, async (msg) => msg.includes(messages[i].message));
            if (messages[i].message !== ""){
                expect(matchingMsgs.length > 0, `expected "${messages[i].message}" to be included in ${JSON.stringify(actualmessages)}`).to.be.true
            }   
        }   

    });

    Then('I validate task details displayed in task action page', async function (taskDetailsDatatable) {
        const taskDetails = taskDetailsDatatable.hashes()[0];
        const softAssert = new SoftAssert();

        const taskColumns = Object.keys(taskDetails);
        for (let i = 0; i < taskColumns.length; i++) {
            let columnName = taskColumns[i];
            let expectColValue = taskDetails[columnName]
            softAssert.setScenario(`Validate column ${columnName} value is ${expectColValue}`);
            const columnActalValue = await taskActionPage.getColumnValue(columnName);
            await softAssert.assert(async () => expect(columnActalValue).to.contains(expectColValue));
        }
        softAssert.finally();

    });

    Then('I see {string} task action page', async function(actionHeader){
        expect(await taskActionPage.getPageHeader()).to.contain(actionHeader);
    });

    Then('I validate task action page has description {string}', async function (actionDescription) {
        expect(await taskActionPage.getActionDescription()).to.contain(actionDescription);
    });

    When('I click {string} submit button in task action page', async function(actionSubmitBtnLabel){
        expect(await taskActionPage.getSubmitBtnActionLabel()).to.contain(actionSubmitBtnLabel);
        await taskActionPage.clickSubmit();
    });

    When('I click Cancel link in task action page', async function(){
        await taskActionPage.clickCancelLink();
    });

    When('In workflow, I click cancel link', async function(){
        const workFlowPage = workflowUtil.getWorlflowPageObject(global.scenarioData['workflow']);
        expect(workFlowPage,'workFlowPage pagee is null. test issue, include step Then I am in workflow page "xxx" ').to.be.not.null;
        await workFlowPage.workFlowContainer.clickCancelLink();
    });

    When('In workflow, I click continue', async function () {
        const workFlowPage = workflowUtil.getWorlflowPageObject(global.scenarioData['workflow']);
        expect(workFlowPage, 'workFlowPage pagee is null. test issue, include step Then I am in workflow page "xxx" ').to.be.not.null;
        await workFlowPage.workFlowContainer.clickContinue();
    });

    Then('I validate tasks count in page {int}', async function (tasksCount) {

        await BrowserWaits.retryWithActionCallback(async () => {
            expect(parseInt(await taskListPage.getTaskListCountInTable()), 'Task count does not match expected ').to.equal(tasksCount);
            if (tasksCount === 0) {
                expect(await taskListPage.isTableFooterDisplayed(), "task list table footer is not displayed").to.be.true;
                expect(await taskListPage.getTableFooterMessage(), "task list table footer message when 0 tasks are displayed").to.equal("You have no assigned tasks.");
            } else {
                expect(await taskListPage.isTableFooterDisplayed(), "task list table footer is displayed").to.be.false;
            }
        });

    });

    Then('I validate WA tasks table footer displayed status is {string}', async function(displayStateBool){
        const expectedDisplayState = displayStateBool.toLowerCase().includes("true");
        expect(await taskListTable.isTableFooterDisplayed()).to.equal(expectedDisplayState);
    });

    Then('I validate WA cases table footer displayed status is {string}', async function (displayStateBool) {
        const expectedDisplayState = displayStateBool.toLowerCase().includes("true");
        expect(await waCaseListTable.isTableFooterDisplayed()).to.equal(expectedDisplayState);
    });

    Then('I validate WA tasks table footer message is {string}', async function (message) {
        expect(await taskListTable.getTableFooterMessage()).to.include(message);
    });

    Then('I validate WA cases table footer message is {string}', async function (message) {
        expect(await waCaseListTable.getTableFooterMessage()).to.include(message);
    });

});