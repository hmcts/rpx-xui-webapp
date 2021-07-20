

const express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const minimist = require('minimist');

const axios = require('axios');
const http = axios.create({})
axios.defaults.headers.common['Content-Type'] = 'application/json'




let { requestMapping,configurations} = require('./reqResMapping');
const { browser } = require('protractor');
const CCDCaseConfig = require('./ccd/ccdCaseConfig/caseCreateConfigGenerator');
const CCDCaseDetails = require('./ccd/ccdCaseConfig/caseDetailsConfigGenerator');

const { getDLCaseConfig} = require('../ngIntegration/mockData/ccdCaseMock');
const nodeAppMock = require('./nodeApp/mockData');
const browserUtil = require('../ngIntegration/util/browserUtil');
const port = 3001;


class MockApp{
    init(){
        this.requestLogs = [];
        this.clientPortCounter = 3002;
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
       
        this.logMessageCallback = null;
        console.log("Mock Config Initialized");
        return "done";
    }

    setServerPort(port){
        this.serverPort = port;
    }

    setLogMessageCallback(callback){
        this.logMessageCallback = callback;
    }

    logMessage(message){
        const msg = this.serverPort+" ******* Mock app : " + message;
        this.requestLogs.push(msg);
        if (this.logMessageCallback){
            this.logMessageCallback(msg);
        }else{
            console.log(msg);
        }
    }

    onRequest(endPoint, method,req,res,callback){
        const scenarioId = this.getCookieFromRequest(req,"scenarioId");
        const scenarioMockPort = this.getCookieFromRequest(req,'scenarioMockPort');
        if (scenarioMockPort && this.serverPort !== parseInt(scenarioMockPort)) {

            this.proxyRequest(req, res, parseInt(scenarioMockPort));
        } else {
            // this.logMessage(`on mock ${this.serverPort} : req ${req.method} ${req.originalUrl}`);
            callback(req,res);
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
                reqCallback = () =>  http.delete(`http://localhost:${port}${urlPath}`, { headers }); 
                break;
            default:
                res.status(500).send({error: 'mock proxy error'});

        }

        try{
            let response = await reqCallback();
            res.status(response.status).send(response.data)
        }
        catch(err){
            res.status(err.response.status).send(err.response.data);
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

            if (this.serverPort !== 3001) {
                this.logMessage(Object.keys(this.scenarioRequestCallbacks));
                if (this.scenarioRequestCallbacks[scenarioId]){
                    this.logMessage(Object.keys(this.scenarioRequestCallbacks[scenarioId]['callbacks'][method]));
                }
            }
            return null;
        }
    }
    
    getNextAvailableClientPort(){
        return http.get('http://localhost:3001/proxy/port',{});
    }

    async startServer(){
        const app = express();
        app.disable('etag');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(express.json()); 

        app.get('/requestLogs',(req,res) =>{
            res.set('content-type', 'application/json');
            res.send(this.requestLogs);
        } );

        app.get('/proxy/port', (req,res) => {
            this.clientPortCounter++;
            res.send({ port: this.clientPortCounter});
        });

        this.intercepts.forEach(intercept =>{
            app.use(intercept.url, intercept.callback);
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

      
        
        console.log("mock api started");
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


const args = minimist(process.argv)
if (args.standalone){
    mockInstance.setServerPort(3001);
    mockInstance.init();

    setUpcaseConfig();
    // getDLCaseConfig();
    // collectionDynamicListeventConfig()
    // createCustomCaseDetails();
    mockInstance.startServer()
}

function setUpcaseConfig() {
    const { getTestJurisdiction }  = require('../ngIntegration/mockData/ccdCaseMock');
    mockInstance.onGet('/data/internal/cases/:caseid', (req, res) => {
        
        res.send(caseDetailsLabelShowCondition().getCase());
    });

    mockInstance.onGet('/api/user/details', (req, res) => {
        const userdetails = nodeAppMock.getUserDetailsTemplate();
        userdetails.userInfo.roles = ["caseworker-ia-caseofficer","caseworker","caseworker-ia-admofficer","caseworker-ia"]; //caseworker
        // userdetails.userInfo.roles = ["caseworker-ia-iacjudge",  "caseworker-ia"]; //judge

        // userdetails.userInfo.id = "12b6a360-7f19-4985-b065-94320a891eaa"; //co r1
        userdetails.userInfo.id = "3db21928-cbbc-4364-bd91-137c7031fe17"; //co r2
        // userdetails.userInfo.id = "4fd5803c-a1ae-4790-b735-dc262e8322b8"; //judge r1
        // userdetails.userInfo.id = "38eb0c5e-29c7-453e-b92d-f2029aaed6c3"; //judge r2


        res.send(userdetails);
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

