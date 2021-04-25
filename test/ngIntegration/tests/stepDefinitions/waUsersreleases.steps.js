var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');
const nodeAppMock = require('../../../nodeMock/nodeApp/mockData');

const { ExpectedConditions } = require('protractor');
const headerPage = require('../../../e2e/features/pageObjects/headerPage');
const SoftAssert = require('../../util/softAssert');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const taskListPage = require('../../../e2e/features/pageObjects/workAllocation/taskListPage');
const TaskListTable = require('../../../e2e/features/pageObjects/workAllocation/taskListTable');
const BrowserUtil = require('../../util/browserUtil');

defineSupportCode(function ({ And, But, Given, Then, When }) {
    const taskListTable = new TaskListTable();

   const testData = require('../../../e2e/config/appTestConfig');
    Given('I set MOCK with {string} release user and roles', async function (releaseUer,datatableroles ) {
        const testUserIdamId = testData.users.filter(testUser => testUser.release === releaseUer)[0];
        if (!testUserIdamId) {
            throw new Error("Provided release user is not configured in test data. " + releaseUer);
        }

        const userIdamID = testUserIdamId.idamId;
        await CucumberReporter.AddMessage(`${releaseUer} id ${testUserIdamId.idamId}`);
        const datatablehashes = datatableroles.hashes();
        const roles = datatablehashes.map(roleHash => roleHash.ROLE);
        MockApp.onGet("/api/user/details", (req, res) => { 
            res.send(nodeAppMock.getUserDetailsWithRolesAndIdamId(roles, userIdamID));
        });

    });

    Then('I validate primary navigation tabs for user {string} in release {string}', async function(userType, release){
        await BrowserUtil.stepWithRetry(async () => {
            const softAssert = new SoftAssert(this);
            const tabsExpected = testData.appFeatures.primaryTabs[userType][release];
            const tabsActual = await headerPage.getPrimaryTabsDisplayed();
            for (let i = 0; i < tabsExpected.length; i++) {
                let tabExpected = tabsExpected[i];
                softAssert.setScenario("Is tab displayed " + tabExpected);
                await softAssert.assert(async () => expect(tabsActual.includes(tabExpected), `${tabExpected} is not displayed for ${userType} in release ${release} : Actual ${tabsActual}`).to.be.true);
            }

            await softAssert.assert(async () => expect(tabsActual.length, `Expected and actuals tabs dsplayed does not match:\n expected${tabsExpected}\n actual ${tabsActual} `).to.equal(tabsExpected.length));
            softAssert.finally();
        });
    });

    Then('I validate primary navigation main items for user {string} in release {string}', async function (userType, release) {
        await BrowserUtil.stepWithRetry(async () => {
            const softAssert = new SoftAssert(this);
            const tabsExpected = testData.appFeatures.primaryTabsMainItems[userType][release];
            const tabsActual = await headerPage.getPrimaryTabsDisplayed();
            for (let i = 0; i < tabsExpected.length; i++) {
                let tabExpected = tabsExpected[i];
                softAssert.setScenario("Is tab displayed " + tabExpected);
                await softAssert.assert(async () => expect(tabsActual.includes(tabExpected), `${tabExpected} is not displayed for ${userType} in release ${release} : Actual ${tabsActual}`).to.be.true);
            }

            await softAssert.assert(async () => expect(tabsActual.length, `Expected and actuals tabs dsplayed does not match:\n expected${tabsExpected}\n actual ${tabsActual} `).to.equal(tabsExpected.length));
            softAssert.finally();
        });
    });

    Then('I validate primary navigation right side items for user {string} in release {string}', async function (userType, release) {
        await BrowserUtil.stepWithRetry(async () => {
            const softAssert = new SoftAssert(this);
            const tabsExpected = testData.appFeatures.primaryTabsRightSideItems[userType][release];
            const tabsActual = await headerPage.getPrimaryTabsDisplayed();
            for (let i = 0; i < tabsExpected.length; i++) {
                let tabExpected = tabsExpected[i];
                softAssert.setScenario("Is tab displayed " + tabExpected);
                await softAssert.assert(async () => expect(tabsActual.includes(tabExpected), `${tabExpected} is not displayed for ${userType} in release ${release} : Actual ${tabsActual}`).to.be.true);
            }

            await softAssert.assert(async () => expect(tabsActual.length, `Expected and actuals tabs dsplayed does not match:\n expected${tabsExpected}\n actual ${tabsActual} `).to.equal(tabsExpected.length));
            softAssert.finally();
        });
    });

    Then('I validate task list column displayed for user {string} in release {string}', async function(user, release){
        await BrowserUtil.stepWithRetry(async () => {
            const softAssert = new SoftAssert(this);
            const taskListColumnsExpected = testData.appFeatures.taskListColumns.myTasks[release];
            const taskListColumnsActual = await taskListTable.getColumnHeaderNames();

            for (let i = 0; i < taskListColumnsExpected.length; i++) {
                let columnExpected = taskListColumnsExpected[i];
                softAssert.setScenario("Is column displayed " + columnExpected);
                await softAssert.assert(async () => expect(taskListColumnsActual.includes(columnExpected), `${columnExpected} is not displayed for ${user} in release ${release} : Actual ${taskListColumnsActual}`).to.be.true);
            }

            await softAssert.assert(async () => expect(taskListColumnsActual.length, `Expected and actuals column dsplayed does not match:\n expected${columnExpected}\n actual ${taskListColumnsActual} `).to.equal(columnExpected.length));
            softAssert.finally();
            await CucumberReporter.AddScreenshot();
        });
    });

    Then('I validate available task list column displayed for user {string} in release {string}', async function (user, release) {
        await BrowserUtil.stepWithRetry(async () => {
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

});