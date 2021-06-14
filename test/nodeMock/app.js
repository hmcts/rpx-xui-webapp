

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
    init(port){
        this.clientPortCounter = 3002;
        this.serverPort = port;
        this.scenarios = {};
        
        this.scenarioRequestCallbacks = { proxyReqCount : 0};
        
        this.intercepts =[];
        this.conf = {
            get: { ...this.getRequestMappings(requestMapping.get,'get') },
            post: { ...this.getRequestMappings(requestMapping.post, 'post') },
            put: { ...this.getRequestMappings(requestMapping.put, 'put') },
            delete: { ...this.getRequestMappings(requestMapping.delete, 'delete')}
        };
        // this.configurations = Object.assign({}, configurations)
        
        console.log("Mock Config Initialized");
        return "done";
    }

    getRequestMappings(requestMap,method){
        const mappingWithMiddleware = {};

        const endPoints =  Object.keys(requestMap);
        for (let i = 0; i < endPoints.length;i++){
            const endPoint = endPoints[i];
            mappingWithMiddleware[endPoint] = (req,res) => {
                const scenarioId = this.getScenarioIdFromRequest(req);
                const proxyReq = this.getReqProxy(scenarioId,method,endPoint);
                if (proxyReq){
                    this.proxyRequest(req, res, proxyReq.onPort);
                }else{
                    this.runCallback(requestMap,scenarioId,method,endPoint,req,res);
                }
                

            }
        }
        return mappingWithMiddleware;
    }

    runCallback(requestMap,scenarioId, method,path,req,res){
        
        const scenarioCallback = this.getScenarioCallBack(scenarioId, method, path);
        this.runScenarioIntercepts(scenarioId, path, req, res, () => { });
        if (scenarioCallback) {
            scenarioCallback(req, res);
        } else {
            requestMap[path](req, res);
        }
    }

    async proxyRequest(req,res,port){
        const headers = req.headers;
        const urlPath = req.originalUrl;
        let response = null;
        switch (req.method.toLowerCase()){
            case 'get':
                response = await http.get(`http://localhost:${port}${urlPath}`, {headers});
                res.status(response.status).send(response.data)
                break;
            case 'post':
                response = await http.post(`http://localhost:${port}${urlPath}`,req.body ,{ headers });
                res.status(response.status).send(response.data)
                break;
            case 'put':
                response = await http.put(`http://localhost:${port}${urlPath}`, req.body,{ headers });
                res.status(response.status).send(response.data)
                break;
            case 'delete':
                response = await http.delete(`http://localhost:${port}${urlPath}`, { headers });
                res.status(response.status).send(response.data)
                break;
            default:
                res.status(500).send({error: 'mock proxy error'});

        }

        
    }


    getScenarioIdFromRequest(req){

        var cookies = req.cookies;
        const scenarioIdCookie = req.cookies['scenarioId']; 
        this.scenarios[scenarioIdCookie] = this.scenarios[scenarioIdCookie] ? this.scenarios[scenarioIdCookie]  + 1: 1
        return scenarioIdCookie;
    }

    initScenarioSession(scenarioId){
        this.scenarioRequestCallbacks[scenarioId] = { 
            callbacks : { get:{},post:{},put:{},delete:{}},
            intercepts : {},
            proxy: { get: {}, post: {}, put: {}, delete: {}, any:{}}
        };
       
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
            return null;
        }
    }

    async setScenarioCallBack(scenarioId, method, path,callback) {
        if (!scenarioId) {
            scenarioId = await browserUtil.getScenarioIdCookieValue();
        }

        if (this.scenarioRequestCallbacks[scenarioId] === undefined){
            this.initScenarioSession(scenarioId);
        }
        //const sessionRequestMapping = this.scenarioRequestCallbacks[scenarioId];
        this.scenarioRequestCallbacks[scenarioId]['callbacks'][method][path]= callback;
    }

    async setScenarioIntercept(url,callback){
        const scenarioId = await browserUtil.getScenarioIdCookieValue();
        const scenarioIntercepts = this.scenarioRequestCallbacks[scenarioId]['intercepts'];
        if (!scenarioIntercepts[url]){   
            scenarioIntercepts[url] = [];
        }
        scenarioIntercepts[url].push(callback);
    }

    runScenarioIntercepts(scenarioId, path,req,res,next){
        if (scenarioId 
            && this.scenarioRequestCallbacks[scenarioId] 
            && this.scenarioRequestCallbacks[scenarioId]['intercepts']
            && this.scenarioRequestCallbacks[scenarioId]['intercepts'][path]){
            const interceptsArr = this.scenarioRequestCallbacks[scenarioId]['intercepts'][path];
            if (interceptsArr) {
                interceptsArr.forEach((intercept) => intercept(req, res, next));
            }
        }
        
    } 

    async setReqProxy(scenarioId,method,path, onPort){
        
        if (this.scenarioRequestCallbacks[scenarioId] === undefined  ){
            this.initScenarioSession(scenarioId);
            
        }
        this.scenarioRequestCallbacks[scenarioId]['proxy'][method][path] = { onPort: onPort  };    
    }

    getReqProxy(scenarioId, method, path){
        if (this.scenarioRequestCallbacks[scenarioId] && this.scenarioRequestCallbacks[scenarioId]['proxy'][method][path] ){
            return this.scenarioRequestCallbacks[scenarioId]['proxy'][method][path];
        } else if (this.scenarioRequestCallbacks[scenarioId] && this.scenarioRequestCallbacks[scenarioId]['proxy']['any'][path]){
            return this.scenarioRequestCallbacks[scenarioId]['proxy']['any'][path];
        }
        return null;
    }

    
    getNextAvailableClientPort(){
        return http.get('http://localhost:3001/proxy/port',{});
    }

    async startServer(){
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(express.json()); 

        app.get('/scenarios',(req,res) =>{
            res.set('content-type', 'application/json');
            res.send(this.scenarioRequestCallbacks);
        } );

        app.get('/proxy/port', (req,res) => {
            this.clientPortCounter++;
            res.send({ port: this.clientPortCounter});
        });

        app.post('/proxy/request', async (req, res) => {
            this.scenarioRequestCallbacks.proxyReqCount = req.body;
            await this.setReqProxy(req.body.scenarioId,req.body.method, req.body.path,req.body.onPort);
            res.send({ status: true });
        });

        this.intercepts.forEach(intercept =>{
            app.use(intercept.url, intercept.callback);
        }); 

        for (const [key, value] of Object.entries(this.conf.get)) {
            app.get(key, value);
        }

        for (const [key, value] of Object.entries(this.conf.post)) {
            app.post(key, value);
        }

        for (const [key, value] of Object.entries(this.conf.put)) {
            app.put(key, value);
        }

        for (const [key, value] of Object.entries(this.conf.delete)) {
            app.delete(key, value);
        }

        this.server = await app.listen(this.serverPort)
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

    async addIntercept(url, callback, scenarioId) {
        let interceptMethod = 'any';
        if(this.conf.get[url] !== undefined){
            interceptMethod = 'get';
        } else if (this.conf.post[url] !== undefined) {
            interceptMethod = 'post';
        } else if (this.conf.put[url] !== undefined) {
            interceptMethod = 'put';
        } if (this.conf.delete[url] !== undefined) {
            interceptMethod = 'delete';
        }

        await this.sendProxyRequest(interceptMethod, path, scenarioId);
        this.setScenarioIntercept(url, callback)
        //this.intercepts.push({url: url, callback: callback})
    }

   
    async onGet(path, callback,scenarioId){
        await this.sendProxyRequest('get', path, scenarioId);
        await this.setScenarioCallBack(scenarioId,'get',path,callback);
        //this.conf.get[path] = callback; 
    }


    async onPost(path, callback, scenarioId){
        await this.sendProxyRequest('post', path, scenarioId);
        await this.setScenarioCallBack(scenarioId, 'post', path, callback);
        //this.conf.post[path] = callback; 
    }

    async onPut(path, callback, scenarioId){
        await this.sendProxyRequest('put', path, scenarioId);
        await this.setScenarioCallBack(scenarioId, 'put', path, callback);
        //this.conf.put[path] = callback; 
    }

    async onDelete(path, callback, scenarioId){
        await this.sendProxyRequest('delete',path,scenarioId);
        await this.setScenarioCallBack(scenarioId, 'delete', path, callback);
        //this.conf.delete[path] = callback; 
    }

    async sendProxyRequest(method,path,scenarioId){
        if(this.serverPort === 3001){
            return;
        }
        scenarioId = scenarioId ? scenarioId : await browserUtil.getScenarioIdCookieValue();
        const response  = await http.post('http://localhost:3001/proxy/request', {
            scenarioId: scenarioId,
            method: method,
            path: path,
            onPort: this.serverPort
        }, {});;
        console.log(response);
    }

    async setConfig(configKey,value){
       //this.configurations[configKey] = value; 
    }

   

}


const mockInstance = new MockApp();
module.exports = mockInstance;


const args = minimist(process.argv)
if (args.standalone){
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

