var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');
const BrowserWaits = require('../../../e2e/support/customWaits');
const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../mockData/nodeApp/mockData');
const CucumberReporter = require('../../../codeceptCommon/reportLogger');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');
const workAllocationDataModel = require("../../../dataModels/workAllocation");
const reportLogger = require('../../../codeceptCommon/reportLogger');
const workAllocationMockData = require('../../mockData/workAllocation/mockData');
const { DataTableArgument } = require('codeceptjs');

const idamlogin = require('../../util/idamLogin')


    Given('I init MockApp', async function () {
        // MockApp.init();
    });

    Given('I start MockApp', async function () {
        const userDetails = await idamlogin.getUserDetails();
        reportLogger.AddJson(userDetails)
        // await workAllocationMockData.applyToSession();
  
    });

    Given('I stop MockApp', async function () {
    //    await MockApp.stopServer();
    });

    Given('I restart MockApp', async function () {
        // await MockApp.stopServer();
        // await MockApp.startServer();
    });

    When('I set MOCK with user roles', async function(rolesTable){
        const roles = [];
        const rolesTablerows = rolesTable.parse().rows();
        for (const row of rolesTablerows){
            roles.push(row[0]);
        }

        const userDetails = nodeAppMockData.getUserDetailsWithRoles(roles);
       
     });

    Given('I set MOCK request {string} intercept with reference {string}', async function(url,reference){
        // global.scenarioData[reference] = null;
        // MockApp.addIntercept(url,(req,res,next) => {
        //     CucumberReporter.AddMessage(`Intercepted: ${url}`)
        //     CucumberReporter.AddJson(req.body) 
        //     global.scenarioData[reference] = req.body;
        //     next();
        // })
     });

    Given('I set MOCK request {string} response log to report', async function (url) {
        // MockApp.addIntercept(url, (req, res, next) => { 
        //     let send = res.send;
        //     res.send = function (body) {
        //         CucumberReporter.AddMessage(` ------------------------------Mock response intercept from server with port "${MockApp.serverPort }" ---------------------------`);
        //         CucumberReporter.AddMessage('Intercept response on MOCK api ' + url);
        //         CucumberReporter.AddMessage('response code ' + res.statusCode);
        //         try{
        //             CucumberReporter.AddJson(body)
        //         }catch(err){
        //             CucumberReporter.AddMessage(body)
        //         }
        //         CucumberReporter.AddMessage('------------------------------Mock response intercept---------------------------');
        //         send.call(this, body);
        //     }
        //     next();
        // })
    });

    Given('I set MOCK request {string} intercept, hold response with reference {string}', async function (url,reference) {
        // MockApp.addIntercept(url, (req, res, next) => {
        //     CucumberReporter.AddJson(req.body)
        //     let send = res.send;
        //     res.send = function (body) {
        //         CucumberReporter.AddMessage('Intercept response or api ' + url);
        //         CucumberReporter.AddJson(body)
        //         global.scenarioData[reference] = body;
        //         send.call(this, body);
        //     }
        //     next();
        // })
    });

     Given('I reset reference {string} value to null', async function(reference){
         global.scenarioData[reference] = null;
     });

    Then('I verify reference {string} value is null', async function (reference){
        expect(global.scenarioData[reference] === null, `Assertion failed: ${reference} is not null`).to.be.true;
     });

     When('I wait for reference {string} value not null', async function(reference){
        //  await BrowserWaits.retryWithActionCallback(async () => {
        //      expect(global.scenarioData[reference] !== null, `reference ${reference} is null`).to.be.true;
        //      try{
        //          reportLogger.AddJson(global.scenarioData[reference]);
        //      }catch(err){
        //          reportLogger.AddMessage(global.scenarioData[reference]);
        //      }
 
        //  });
     });

     Given('I set MOCK api method {string} endpoint {string} with error response code {int}', async function(apiMethod, apiEndpoint, responseCode){
        
         switch (apiMethod.toLowerCase()){
            case 'get':
                 MockApp.onGet(apiEndpoint, (req, res) => {
                     reportLogger.AddMessage(`Mock response code returned ${responseCode}`);
                     res.status(responseCode).send({ error: "Test error from mock" });
                 });
                 break;
             case 'post':
                 MockApp.onPost(apiEndpoint, (req, res) => {
                     reportLogger.AddMessage(`Mock response code returned ${responseCode}`);
                     res.status(responseCode).send({ error: "Test error from mock" });
                 });
                 break;
             case 'put':
                 MockApp.onPut(apiEndpoint, (req, res) => {
                     reportLogger.AddMessage(`Mock response code returned ${responseCode}`);
                     res.status(responseCode).send({ error: "Test error from mock" });
                 });
                 break;
             case 'delete':
                 MockApp.onDelete(apiEndpoint, (req, res) => {
                    reportLogger.AddMessage(`Mock response code returned ${responseCode}`);
                    res.status(responseCode).send({ error: "Test error from mock" });
                 });
                 break;

                 default:
                 throw new Error("api method provided not recognised " + apiMethod);
       }
        
        
     });


    Given('I set MOCK find person response for jurisdictions', async function(datatable){
        const personsConfigHashes = datatable.parse().hashes();

        for (const person of personsConfigHashes) {

            if (person.domain === 'Judicial'){
                const judge = JSON.parse(JSON.stringify(workAllocationMockData.judgeUsers[0]));
                judge.sidam_id = person.id;
                judge.email_id = person.email;
                judge.full_name = person.name;

                workAllocationMockData.judgeUsers.push(judge);
            } else if (person.domain === 'Legal Ops'){
                const cw = JSON.parse(JSON.stringify(workAllocationMockData.caseWorkersList[0]));
                const fullNameArr = person.name.split(" ");
                cw.idamId = person.id;
                cw.email = person.email;
                cw.firstName = fullNameArr[0];
                cw.lastName = fullNameArr[1];

                workAllocationMockData.addCaseworker(cw,'IA'); 
 
            }

             
        }
       


     });
