var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');
const BrowserWaits = require('../../../e2e/support/customWaits');
const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Given('I navigate to home page', async function () {
        await browserUtil.gotoHomePage();
        await headerpage.waitForPrimaryNavDisplay();
        await browserUtil.waitForLD();
    });

    Given('I navigate page route {string}', async function (routeUrl) {
        await browser.get(routeUrl);
        await headerpage.waitForPrimaryNavDisplay();
        await browserUtil.waitForLD();
    });

    Given('I init MockApp', async function () {
        MockApp.init();
    });

    Given('I start MockApp', async function () {
       await MockApp.startServer();
    });

    Given('I stop MockApp', async function () {
        await MockApp.stopServer();
    });

    Given('I restart MockApp', async function () {
        await MockApp.stopServer();
        await MockApp.startServer();
    });

    When('I set MOCK with user roles', async function(rolesTable){
        const roles = [];
        const rolesTablerows = rolesTable.rows();
        for (const row of rolesTablerows){
            roles.push(row[0]);
        }

        const userDetails = nodeAppMockData.getUserDetailsWithRoles(roles);
        CucumberReporter.AddJson(userDetails)
        MockApp.onGet('/api/user/details', (req,res) => {
            res.send(userDetails);
        });
     });

    Given('I set MOCK request {string} intercept with reference {string}', async function(url,reference){
        MockApp.addIntercept(url,(req,res,next) => {
            global.scenarioData[reference] = req.body;
            next();
        })
     });

     Given('I reset reference {string} value to null', async function(reference){
         global.scenarioData[reference] = null;
     });

     When('I wait for reference {string} value not null', async function(reference){
         await BrowserWaits.waitForConditionAsync(async () => {
             return global.scenarioData[reference] !== null
         },5000);
     });


});
