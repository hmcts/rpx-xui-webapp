var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');
const BrowserWaits = require('../../../e2e/support/customWaits');
const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');
const workAllocationDataModel = require("../../../dataModels/workAllocation");

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Given('I navigate to home page', async function () {
        await BrowserWaits.retryWithActionCallback(async () => {
            await browserUtil.gotoHomePage();
            await headerpage.waitForPrimaryNavDisplay();
            await browserUtil.waitForLD();
        });  
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
        global.scenarioData[reference] = null;
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
         });
     });

     Given('I set MOCK api method {string} endpoint {string} with error response code {int}', async function(apiMethod, apiEndpoint, responseCode){
        
         switch (apiMethod.toLowerCase()){
            case 'get':
                 MockApp.onGet(apiEndpoint, (req, res) => {
                     res.status(responseCode).send({ error: "Test error from mock" });
                 });
                 break;
             case 'post':
                 MockApp.onPost(apiEndpoint, (req, res) => {
                     res.status(responseCode).send({ error: "Test error from mock" });
                 });
                 break;
             case 'put':
                 MockApp.onPut(apiEndpoint, (req, res) => {
                     res.status(responseCode).send({ error: "Test error from mock" });
                 });
                 break;
             case 'delete':
                 MockApp.onDelete(apiEndpoint, (req, res) => {
                     res.status(responseCode).send({ error: "Test error from mock" });
                 });
                 break;

                 default:
                 throw new Error("api method provided not recognised " + apiMethod);
       }
        
        
     });


    Given('I set MOCK find person response for jurisdictions', async function(datatable){
        const personsConfigHashes = datatable.hashes();

        MockApp.onPost('/workallocation2/findPerson', (req,res) => {
            const inputJurisdiction = req.searchOptions.jurisdiction;
            const filterdUsersForJurisdiction = [];
            for (let i = 0; i < personsConfigHashes.length; i++){
                const inputperson = personsConfigHashes[i];
                if (inputperson.jurisdiction === inputJurisdiction){
                    const person = workAllocationDataModel.getFindPersonObj();

                    person['domain'] = inputperson['domain'];
                    person['id'] = inputperson['id'];
                    person['email'] = inputperson['email'];
                    person['name'] = inputperson['name'];
                    filterdUsersForJurisdiction.push(person);
                }
            } 
            res.send(filterdUsersForJurisdiction);
        });

     });


});
