
const headerPage = require('../pageObjects/headerPage');

var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see header tab Task list', async function () {
        expect(await headerPage.isTabPresent("Task list"), "Task list tab is not present").to.be.true;
    });

    Then('I see header tab Task manager', async function () {
        expect(await headerPage.isTabPresent("Task manager"), "Task manager tab is not present").to.be.true;
    });
    
    When('I click on header tab Task list', async function () {
        await headerPage.clickTaskList();

    });

    When('I click on header tab Task manager', async function () {
        await headerPage.clickTaskManager();

    });


});