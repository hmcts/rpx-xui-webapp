

const express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const minimist = require('minimist');
const fs = require('fs');
const axios = require('axios');
const http = axios.create({})
axios.defaults.headers.common['Content-Type'] = 'application/json'


let { requestMapping,configurations} = require('./reqResMapping');
const CCDCaseConfig = require('../ngIntegration/mockData/ccd/ccdCaseConfig/caseCreateConfigGenerator');
const CCDCaseDetails = require('../ngIntegration/mockData/ccd/ccdCaseConfig/caseDetailsConfigGenerator');

const { getDLCaseConfig} = require('../ngIntegration/mockData/ccdCaseMock');
// const nodeAppMock = require('./nodeApp/mockData');

// const waMockDataService = require('./workAllocation/mockData');
const CucumberReporter = require('../codeceptCommon/reportLogger');

const nodeMockConfig = require('./config');

const nodeMockPort = require('./availablePortFinder').getAvailablePort();
const parallelProxyStartPort = parseInt(nodeMockPort) + 1;
class MockApp{

    constructor(){
        this.logMessageCallback = null;
        this.logJSONCallback = null;
        this.routesLogFile = `${__dirname}/RUNTIME_ROUTES.txt`;
        this.uniqueRoutesCalled = new Set(); 
    }


    init(clientPortStart){
        this.requestLogs = [];
        this.clientPortCounter = clientPortStart ? clientPortStart : parallelProxyStartPort;
        this.scenarios = {};

        this.browserScenarioCookieCallback = null;

        this.scenarioRequestCallbacks = { proxyReqCount : 0};

        this.intercepts =[];
        this.conf = {
            get: { ...requestMapping.get },
            post: { ...requestMapping.post },
            put: { ...requestMapping.put },
            delete: { ...requestMapping.delete}
        };
        // this.configurations = Object.assign({}, configurations)

        this.mockDataServices = [];

        for (const mockDataService of requestMapping.mockServiceResetCallbacks) {
            mockDataService();
        }
        console.log("Mock Config Initialized");
        return "done";
    }



    initialiseMockDataServices(){
        // waMockDataService.init();
    }

    setServerPort(port){
        this.serverPort = port;
    }

    setLogMessageCallback(callback){
        this.logMessageCallback = callback;
    }

    setLogJSONCallback(callback) {
        this.logJSONCallback = callback;
    }

    logMessage(message){
        const msg = "[NODE_MOCK] " + message;
        if (this.logMessageCallback){
            this.logMessageCallback(msg);

        }
        console.log(msg);

    }

    logJSON(json) {
        if (this.logJSONCallback) {
            this.logJSONCallback(json);
        }
        console.log(json);

    }

    logRequestDetails(req){
        this.logMessage(`${req.method} : ${req.originalUrl}`);
        if (req.method === 'POST' || req.method === 'PUT' ){
            this.logJSON(req.body);
        }
    }

    async onRequest(endPoint, method,req,res,callback){
        let scenarioMockPort; 
        try{
            
            const scenarioId = this.getCookieFromRequest(req, "scenarioId");
            scenarioMockPort = this.getCookieFromRequest(req, 'scenarioMockPort');
            const path = req.path;
            if (nodeMockPort === this.serverPort && !this.uniqueRoutesCalled.has(path)) {
                this.uniqueRoutesCalled.add(path);
                fs.appendFileSync(this.routesLogFile, `${req.path}\n`);
            }
            // this.logMessage(` => ${scenarioMockPort} => ${req.method}: ${req.originalUrl}`);

            if (scenarioMockPort && this.serverPort !== parseInt(scenarioMockPort)) {
                this.proxyRequest(req, res, parseInt(scenarioMockPort));
            } else {
                callback(req, res);
            }
        }catch(err){
            if (scenarioMockPort !== nodeMockPort){
                await http.post(`http://localhost:${nodeMockPort}/mockerror`, { error: err })
            }
            console.log(err);
            const logErrorMessge = { message: 'MOCK onRequest error', err: err.message, stack: err.stack };
            this.logMessage(`*********************** Mock onRequest error occured  on server with port ${this.serverPort} ******************** `);
            this.logJSON(logErrorMessge);
            this.logMessage("*************************************************************** ");
            res.status(550).send(logErrorMessge);
        }
    }

    async proxyRequest(req,res,port){
        const headers = req.headers;
        const urlPath = req.originalUrl;

        let reqCallback = null;
        //this.logMessage(`${this.serverPort} proxying request to ${port} ${req.method.toUpperCase()}  ${urlPath} `);
        switch (req.method.toLowerCase()){
            case 'get':
                reqCallback = () => http.get(`http://localhost:${port}${urlPath}`, {headers});
                break;
            case 'post':
                reqCallback = () =>  http.post(`http://localhost:${port}${urlPath}`,req.body ,{ headers });
                break;
            case 'put':
                reqCallback = () =>  http.put(`http://localhost:${port}${urlPath}`, req.body,{ headers });
                break;
            case 'delete':
                reqCallback =  () =>  http.delete(`http://localhost:${port}${urlPath}`, { headers });
                break;
            default:
                await http.post(`http://localhost:${port}/mockerror`, { error: err}, { headers })
                CucumberReporter.AddMessage(`*********************** Mock onProxy unknown method  error occured  on server with port ${this.serverPort} ******************** `);
                CucumberReporter.AddMessage(err);
                CucumberReporter.AddMessage("*************************************************************** ");
                res.status(551).send({ error: 'mock proxy error, unknown req method ' + req.method});

        }
        let response = null;
        try{
            response = await reqCallback();
            res.status(response.status).send(response.data)
        }
        catch(err){

            if (err.response && err.response.status < 510){
                res.status(err.response.status ).send(err.response.body);
                return;
            }

            await http.post(`http://localhost:${port}/mockerror`, { error: err}, { headers })
            console.log(err);
            CucumberReporter.AddMessage(`*********************** Mock onProxy error occured  on server with port ${this.serverPort} ******************** `);
            CucumberReporter.AddMessage(err);
            CucumberReporter.AddMessage("*************************************************************** ");
            res.status(552).send({ message: 'MOCK onProxy error', err: err.message });
        }

    }

    getCookieFromRequest(req, cookieName){
        const cookie = req.cookies[cookieName];
        this.scenarios[cookie] = this.scenarios[cookie] ? this.scenarios[cookie] : "";
        return cookie;
    }


    deleteScenarioSession(scenarioId){
        if (scenarioId){
            delete this.scenarioRequestCallbacks[scenarioId];
        }

    }

    getScenarioCallBack(scenarioId, method, path){
        const sessionRequestMapping = this.scenarioRequestCallbacks[scenarioId] ? this.scenarioRequestCallbacks[scenarioId].callbacks : null;
        if (sessionRequestMapping && sessionRequestMapping[method] && sessionRequestMapping[method][path] ){
            return sessionRequestMapping[method][path];
        }else{

            if (this.serverPort !== nodeMockPort) {
                this.logMessage(Object.keys(this.scenarioRequestCallbacks));
                if (this.scenarioRequestCallbacks[scenarioId]){
                    this.logMessage(Object.keys(this.scenarioRequestCallbacks[scenarioId]['callbacks'][method]));
                }
            }
            return null;
        }
    }

    getNextAvailableClientPort(){
        return http.get(`http://localhost:${nodeMockPort}/proxy/port`,{});
    }

    async startServer(){

        const app = express();

        // Enable view caching
        app.set('view cache', true);

        app.disable('etag');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(express.json());

        app.get('/requestLogs',(req,res) =>{
            res.set('content-type', 'application/json');
            res.send(this.requestLogs);
        } );

        app.post('/mockerror', (req,res) => {
            CucumberReporter.AddMessage(`*********************** Mock main server reporting error to server with port ${this.serverPort} ******************** `);
            console.log(`*********************** Mock main server reporting error to server with port ${this.serverPort} ******************** `);

            console.log(req.body);
            CucumberReporter.AddMessage(req.body);
            CucumberReporter.AddJson(req.body);
            CucumberReporter.AddMessage("*************************************************************** ");
            res.send("");
        });

        app.get('/proxy/port', (req,res) => {
            this.clientPortCounter++;
            res.send({ port: this.clientPortCounter});
        });

        this.intercepts.forEach(intercept =>{
            app.use(intercept.url, intercept.callback);
        });

        // app.use('/', (req,res,next) =>{
        //     this.logMessageCallback(`[ Node Requested ] ${req.method} : ${req.originalUrl}`);
        //     next();
        // });

        nodeMockConfig.logRequests.forEach(url => {
            app.use(url, (req,res,next)=>{
                this.logRequestDetails(req);
                next();
            });
        });

        nodeMockConfig.logResponses.forEach(url => {
            app.use(url, (req, res, next) => {
                let send = res.send;
                const logMessagesCallBackLocal = this.logMessageCallback;
                const logJSONCallbackLocal = this.logJSONCallback;
        
                res.send = function (body) {

                    logMessagesCallBackLocal(` ------------------------------Mock response intercept from server with port "${MockApp.serverPort}" ---------------------------`);
                    logMessagesCallBackLocal('Intercept response on MOCK api ' + url);
                    logMessagesCallBackLocal('response code ' + res.statusCode);
                    try {
                        logJSONCallbackLocal(body)
                    } catch (err) {
                        logMessagesCallBackLocal(body)
                    }
                    logMessagesCallBackLocal('------------------------------Mock response intercept---------------------------');
                    send.call(this, body);
                }
                next();
            });
        });

        for (const [key, value] of Object.entries(this.conf.get)) {

            app.get(key, (req, res) => this.onRequest(key, 'get', req, res,value));
        }

        for (const [key, value] of Object.entries(this.conf.post)) {
            app.post(key, (req, res) => this.onRequest(key, 'post', req, res, value));
        }

        for (const [key, value] of Object.entries(this.conf.put)) {
            app.put(key, (req, res) => this.onRequest(key, 'put', req, res, value));
        }

        for (const [key, value] of Object.entries(this.conf.delete)) {
            app.delete(key, (req, res) => this.onRequest(key, 'delete', req, res, value));
        }

        await this.stopServer();
        this.server = await app.listen(this.serverPort);

        if (nodeMockPort === this.serverPort){
            fs.writeFileSync(this.routesLogFile,'')
        }


        console.log("mock server started on port : " + this.serverPort);
        // return "Mock started successfully"

    }

    async stopServer(){
        if (this.server){
            await this.server.close();
            this.server = null;
            console.log("Mock server stopped");

        }else{
            console.log("Mock server is null or undefined");
        }
    }

    addIntercept(url, callback) {
        this.intercepts.push({ url: url, callback: callback })
    }

    async onGet(path, callback){
        this.conf.get[path] = callback;
    }


    async onPost(path, callback){
        this.conf.post[path] = callback;
    }

    async onPut(path, callback){
        this.conf.put[path] = callback;
    }

    async onDelete(path, callback){
        this.conf.delete[path] = callback;
    }

    async setConfig(configKey,value){
       //this.configurations[configKey] = value;
    }



}


const mockInstance = new MockApp();
module.exports = mockInstance;

// const bookingsMockData = require('./workAllocation/bookingsData')
const args = minimist(process.argv)
if (args.standalone){
    mockInstance.setServerPort(3001);
    mockInstance.init();
    // nodeAppMock.userDetails = nodeAppMock.getMockLoginUserWithidentifierAndRoles("IAC_CaseOfficer_R2", "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator");
    // bookingsMockData.bookingResponse = [];
    // setUpcaseConfig();
    // getDLCaseConfig();
    // collectionDynamicListeventConfig()
    // createCustomCaseDetails();
    mockInstance.startServer()
}

function setUpcaseConfig() {
    const { getTestJurisdiction }  = require('../ngIntegration/mockData/ccdCaseMock');
    // mockInstance.onGet('/data/internal/cases/:caseid', (req, res) => {

    //     res.send(caseDetailsLabelShowCondition().getCase());
    // });

    // const idamid = 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8';
    const idamid = '519e0c40-d30e-4f42-8a4c-2c79838f0e4e'; //Judicial
    const workAllocationMockData = require('./workAllocation/mockData');
    workAllocationMockData.init();

    workAllocationMockData.addCaseworkerWithIdamId(idamid, 'IA');
    mockInstance.onGet('/api/user/details', (req, res) => {
        // const roles = ['task-supervisor','case-allocator','caseworker', 'caseworker-ia', 'caseworker-ia-caseofficer','task-supervisor','case-allocator'];
        // const roles = ['caseworker','caseworker-ia','caseworker-ia-caseofficer','task-supervisor'];
        const roles = ['caseworker', 'caseworker-ia', 'caseworker-ia-iacjudge', 'task-supervisor'];
        // setTimeout(() => {
        //     res.send(nodeAppMock.setUserDetailsWithRolesAndIdamId(roles, idamid));

        // },10);


        // res.send(nodeAppMock.setUserDetailsWithRolesAndIdamId(roles, idamid));


    });


}

function caseDetailsLabelShowCondition(){
    const caseDetail = new CCDCaseDetails("Mock Label show condition case type");
    caseDetail.addHistoryTab()
    .addTab("Simple Conditional show of labels")
        .addFieldWithConfigToTab({ id: "item", type: "Text", label: "Item text", value: "yes" })
        .addFieldWithConfigToTab({id: "label1ForItem1", type: "Label", label: "Item 1 text", props: { show_condition: `item="yes"` }})
    .addTab("Complex Conditional show of labels")
    .addFieldWithConfigToTab({
        id:"complexFieldWithLabels", type:"Complex", label:"Conditional show labels complex type",
        complex_fields:[
            { id: "item", type: "Text", label: "Item text", value:"1" },
            { id: "text1", type: "Text", label: "Item 1 text input", value: "sample",props: { show_condition: `item="yes"` } },
            { id: "label1ForItem1", type: "Label", label: "Show label if item= 1", props: { show_condition: `item="yesno"`}},
            { id: "label2ForItem1", type: "Label", label: "Show label if item= 2", props: { show_condition: `item="2"` } },
            { id: "label3ForItem1", type: "Label", label: "Show label if item= 3", props: { show_condition: `item="3"` } },
            { id: "label4ForItem1", type: "Label", label: "Show label if item= 1", props: { show_condition: `item="1"` } },
            { id: "label5ForItem1", type: "Label", label: "Show label if item= 2", props: { show_condition: `item="2"` } },
            { id: "label5ForItem1", type: "Label", label: "Show condition is null", props: { show_condition: null } }
        ]
    })
    .addMetadata()
    return caseDetail;
}


function labelstestConfig(){

    const labelsEventConfig = new CCDCaseConfig("testCaseType", "Test jurisdiction", "test description");
    labelsEventConfig.addWizardPage("testPage1", "Applicant details")
    labelsEventConfig.addCaseField({ id:"applicantName", type:"Text", label:"Applicant name"})
    labelsEventConfig.addWizardPage("testPage2", "More details of applicant ")
    labelsEventConfig.addCaseField({ id: "printApplicantName", type: "Label", label: "Below are more details for  ->${applicantName}<-" })
    labelsEventConfig.addCaseField({ id: "familyDetails", type: "Complex", label: "provide more details for applicant: ->${applicantName}<-",
        complex_fields:[
            { id: "applicantFamilyDetailsMsgid", type: "Label", label:"Provide ->${applicantName}<- family history"},
            { id: "familyHistoryText", type: "Text", Label: "History ref" },
            { id: "historyRefPrint", type: "Label", label: "Provided ->${familyHistoryText}<- is here" }
        ],
        value: { familyHistoryText : "Pre set value"}
    })
    labelsEventConfig.addWizardPage("testPage3", "Applicant addresses ")
    labelsEventConfig.addCaseField({
        id: "addressDetauls", type: "Collection", label: "provide address for applicant: ->${applicantName}<-",
        collection_field_type: {
            id: "addressess", type:"Complex", label: "Address", complex_fields: [
                { id: "pastAddressid", type: "Label", label: "->${applicantName}-< past address" },
                { id: "pastAddressText", type: "Text", label: "Address text" },
                { id: "pastAddressidPrint", type: "Label", label: "->${pastAddressText}-< past address is here" }
            ]
        }
    })
        .setFieldProps({ display_context_parameter: "#COLLECTION(allowInsert,allowDelete)"})


    return labelsEventConfig;
}

