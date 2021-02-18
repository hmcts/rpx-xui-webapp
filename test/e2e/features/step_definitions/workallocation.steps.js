
const taskListPage = require('../pageObjects/workAllocation/taskListPage');
const taskmanagerPage = require('../pageObjects/workAllocation/taskManagerPage');
var { defineSupportCode } = require('cucumber');

const Browserutil = require('../../../ngIntegration/util/browserUtil');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see Task list sub navigation tabs', async function () {
        expect(await taskListPage.amOnPage(), "Task list sub navigation tabs not present").to.be.true;
    });

    Then('I see Task manager page displayed', async function () {
        expect(await taskmanagerPage.amOnPage(), "Task manager page not displayed").to.be.true;
    });
 
    Then('I see Task list table', async function () {
        expect(await taskListPage.isTableDisplayed(), "Task list table is not present").to.be.true;
    });

    Then('I see Task list table displaying some tasks', async function () {
        expect(await taskListPage.getTaskListCountInTable(), "Task list tab is not present").to.be.greaterthan(0);
    });


    When('I click sub navigation tab Available tasks', async function () {
        await taskListPage.clickAvailableTasks(); 
     });

    When('I click sub navigation tab My tasks', async function () {
        await taskListPage.clickMyTasks(); 
    });


    Then('I see Available tasks page displayed', async function () {
        expect(await taskListPage.isAvailableTasksDisplayed(), "Task list Available tasks page is not present").to.be.true;
    });


    Then('I see My tasks page displayed', async function () {
        expect(await taskListPage.isMyTasksDisplayed(), "Task list My Tasks page is not present").to.be.true;
    });


});