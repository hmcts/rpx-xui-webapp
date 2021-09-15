var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');


const TaskListTable = require('../../pageObjects/workAllocation/taskListTable');
const CaseListTable = require('../../pageObjects/workAllocation/casesTable');



defineSupportCode(function ({ And, But, Given, Then, When }) {
    const taskListTable = new TaskListTable();
    const caseListTable = new CaseListTable();

    Given('I capture task details at row {int} with reference {string}', async function(atRow,reference){
        const displayValuesAtRow = await taskListTable.getTableDisplayValuesAtRow(atRow);
        global.scenarioData[reference] = displayValuesAtRow;
        reportLogger.AddJson(displayValuesAtRow);
        
    });

    Given('I capture case details at row {int} with reference {string}', async function (atRow, reference) {
        const displayValuesAtRow = caseListTable.getTableDisplayValuesAtRow(atRow);
        global.scenarioData[reference] = displayValuesAtRow;

    });

});