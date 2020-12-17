

const express = require('express');
var bodyParser = require('body-parser');
const minimist = require('minimist');


let { requestMapping,configurations} = require('./reqResMapping');
const { browser } = require('protractor');
const CCDCaseConfig = require('./ccd/ccdCaseConfig/caseCreateConfigGenerator');
const CCDCaseDetails = require('./ccd/ccdCaseConfig/caseDetailsConfigGenerator');

const port = 3001;


class MockApp{
    init(){
        this.conf = {
            get: { ...requestMapping.get },
            post: { ...requestMapping.post },
            put: { ...requestMapping.put },
            delete: { ...requestMapping.delete }
        };
        this.configurations = Object.assign({}, configurations);
        console.log("Mock Config Initialized");
        return "done";
    }

    async startServer(){
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(express.json()) 
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

        this.server = await app.listen(port)
        console.log("mock api started");
        // return "Mock started successfully"

    }

    async stopServer(){
        if (this.server){
            await this.server.close();
            this.server = null;
        }else{
            console.log("Mock server is null or undefined");
        }
        this.conf = {  };
        this.configurations = { };
    }

   
    onGet(path, callback){
        this.conf.get[path] = callback; 
    }


    onPost(path, callback){
        this.conf.post[path] = callback; 
    }

    onPut(path, callback){
        this.conf.put[path] = callback; 
    }

    onDelete(path, callback){
        this.conf.delete[path] = callback; 
    }

    setConfig(configKey,value){
       this.configurations[configKey] = value; 
    }

}


const mockInstance = new MockApp();
module.exports = mockInstance;

const args = minimist(process.argv)
if (args.standalone){
    mockInstance.init();
    // createCustomCCDCaseConfig();
    // createCustomCaseDetails();
    mockInstance.startServer()
}




function createCustomCaseDetails(){
    const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
 
    function getArrayItmeById(arrayObj, id){
        return arrayObj.filter(obj => obj.id === id);
    }


    const caseTemplate = require('./temp');

    const largeCaseDetails = JSON.parse(JSON.stringify(caseTemplate));
    const CasePeopleTabTab = getArrayItmeById(largeCaseDetails.tabs, 'CasePeopleTab')[0];
    const childrenField = getArrayItmeById(CasePeopleTabTab.fields, 'children1')[0];
    const respodentsField = getArrayItmeById(CasePeopleTabTab.fields, 'respondents1')[0];

    const confidentialPeopleTab = getArrayItmeById(largeCaseDetails.tabs, 'Confidential')[0]; 

    for (let children = 0; children < 20 ; children++){
        childrenField.value.push({ "id": new Date(), "value": childrenField.value[0].value});
    } 

    for (let respondents = 0; respondents < 20; respondents++) {
        respodentsField.value.push({ "id": new Date(), "value": respodentsField.value[0].value });
    }
   
    // CasePeopleTabTab.fields = [];
    // confidentialPeopleTab.fields = [];
   

    mockInstance.onGet('/data/internal/cases/:caseid', (req, res) => {
        res.send(largeCaseDetails);
    });

}



function createCustomCCDCaseConfig(){
    // const scenario = { fieldType: "Collection", showField: false, retainHiddenField: false };

    const scenario = { fieldType: "Document", showField: false, retainHiddenField: true };

    const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
    const page1 = caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page');

    const listItems = [
        {
            "code": "item1",
            "label": "Item 1"
        },
        {
            "code": "item2",
            "label": "Item 2"
        },
        {
            "code": "item3",
            "label": "Item 3"
        }
    ] 

    const dynamicListVal = {
        "value": listItems[2],
        "list_items": listItems 
    }

    let topLevelDynamicList = caseConfig.addCCDFieldToPage(page1, "DynamicList", "topLevelDL", "Top level Dynamic List");
    // topLevelDynamicList.field_type.fixed_list_items = listItems ;  
    topLevelDynamicList.value = dynamicListVal; 
    
   
    let complexField = caseConfig.addCCDFieldToPage(page1, "Complex", "complexField", "Complex field");

    complexField.field_type.complex_fields.push(caseConfig.getCCDFieldTemplateCopy("Text","testText","Test text"));
    let dynamicList = caseConfig.getCCDFieldTemplateCopy("DynamicList", "dynamicList", "Dynamic List");
    complexField.field_type.complex_fields.push(dynamicList);
    complexField.value = {
       "testText" : "test value input",
        "dynamicList": dynamicListVal
    }


    setUpcaseConfig(caseConfig.caseConfigTemplate);
}


function setUpcaseConfig(caseConfig) {
    mockInstance.onGet('/data/internal/cases/:caseid/event-triggers/:eventId', (req, res) => {
        res.send(caseConfig);
    });

    mockInstance.onPost('/data/case-types/:caseType/validate', (req, res) => {
        caseValidationRequestBody = req.body;
        const responseBody = {
            data: req.body.data,
            "_links": { "self": { "href": "http://ccd-data-store-api-aat.service.core-compute-demo.internal" + req.path + "?pageId=" + req.query.pageId } }
        }
        res.send(responseBody);
    });

    mockInstance.onPost('/data/cases/:caseid/events', (req, res) => {
        caseEventSubmitRequestBody = req.body;
        const responseBody = {
            id: Date.now(),
            data: req.body.data,
            "_links": { "self": { "href": "http://ccd-data-store-api-demo.service.core-compute-demo.internal" + req.path + "?ignore-warning=false" } }
        }
        res.send(responseBody)
    });

}

