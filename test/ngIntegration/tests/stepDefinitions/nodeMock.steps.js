
var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

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

    Given('I navigate page route {string}', async function(routeUrl){
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

});