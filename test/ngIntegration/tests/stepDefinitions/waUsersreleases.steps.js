

const { ExpectedConditions } = require('protractor');
const headerPage = require('../../../e2e/features/pageObjects/headerPage');
const SoftAssert = require('../../util/softAssert');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const taskListPage = require('../../../e2e/features/pageObjects/workAllocation/taskListPage');
const TaskListTable = require('../../../e2e/features/pageObjects/workAllocation/taskListTable');


defineSupportCode(function ({ And, But, Given, Then, When }) {
    const taskListTable = new TaskListTable();

   const testData = require('../../config/testData');
    Given('I set MOCK with {string} release user and roles', async function (releaseUer,datatableroles ) {
        if (testData.users.hasOwnProperty(releaseUer)) {
            throw new Error("Provided release user is not configured in test data. " + releaseUer);
        }
        const userIdamID = testData.users[releaseUer];
        const datatablehashes = datatableroles.hashes();
        const roles = datatablehashes.map(roleHash => roleHash.ROLE);
        MockApp.onGet("/api/user/details", (req, res) => { 
            res.send(nodeAppMock.getUserDetailsWithRolesAndIdamId(roles, userIdamID));
        });

    });

    Then('I validate primary navigation tabs for user {string} in release {string}', async function(userType, release){
        
       const softAssert = new SoftAssert(this); 
        const tabsExpected = testData.appFeatures.primaryTabs[userType][release];
        const tabsActual = await headerPage.getPrimaryTabsDisplayed();
        for(let i = 0  ;i < tabsExpected.length; i++){
            let tabExpected = tabsExpected[i];
            softAssert.setScenario("Is tab displayed " + tabExpected);
            await softAssert.assert(async () => expect(tabsActual.includes(tabExpected)), `${tabExpected} is not displayed for ${userType} in release ${release} : Actual ${tabsActual}`).to.be.true
        }

        await softAssert.assert(async () => expect(tabsActual.length), `Expected and actuals tabs dsplayed does not match:\n expected${tabsExpected}\n actual ${tabsActual} `).to.equal(tabsExpected.length)
        softAssert.finally();
    });

    Then('I validate task list column displayed for user {string} in release {string}', async function(user, release){
        const softAssert = new SoftAssert(this);
        const taskListColumnsExpected = testData.appFeatures.taskListColumns.myTasks[release];
        const taskListColumnsActual = await taskListTable.getColumnHeaderNames();

        for (let i = 0; i < taskListColumnsExpected.length; i++) {
            let columnExpected = taskListColumnsExpected[i];
            softAssert.setScenario("Is column displayed " + columnExpected);
            await softAssert.assert(async () => expect(taskListColumnsActual.includes(columnExpected)), `${columnExpected} is not displayed for ${userType} in release ${release} : Actual ${taskListColumnsActual}`).to.be.true
        }

        await softAssert.assert(async () => expect(taskListColumnsActual.length), `Expected and actuals column dsplayed does not match:\n expected${columnExpected}\n actual ${taskListColumnsActual} `).to.equal(columnExpected.length)
        softAssert.finally();

    });

    Then('I validate available task list column displayed for user {string} in release {string}', async function (user, release) {
        const softAssert = new SoftAssert(this);
        const taskListColumnsExpected = testData.appFeatures.taskListColumns.availableTasks[release];
        const taskListColumnsActual = await taskListTable.getColumnHeaderNames();

        for (let i = 0; i < taskListColumnsExpected.length; i++) {
            let columnExpected = taskListColumnsExpected[i];
            softAssert.setScenario("Is column displayed " + columnExpected);
            await softAssert.assert(async () => expect(taskListColumnsActual.includes(columnExpected)), `${columnExpected} is not displayed for ${userType} in release ${release} : Actual ${taskListColumnsActual}`).to.be.true
        }

        await softAssert.assert(async () => expect(taskListColumnsActual.length), `Expected and actuals column dsplayed does not match:\n expected${columnExpected}\n actual ${taskListColumnsActual} `).to.equal(columnExpected.length)
        softAssert.finally();

    });

});