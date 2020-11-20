

const express = require('express');
var bodyParser = require('body-parser');

let { requestMapping,configurations} = require('./reqResMapping');
const { browser } = require('protractor');
const CCDCaseConfig = require('./ccd/ccdCaseConfig/caseCreateConfigGenerator')
const port = 3001;


class MockApp{
    init(){
        this.conf = { 
            get: { ...requestMapping.get},
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


// mockInstance.init();
// createCustomCCDCaseConfig();
// mockInstance.startServer();



function createCustomCCDCaseConfig(){
    // const scenario = { fieldType: "Collection", showField: false, retainHiddenField: false };

    const scenario = { fieldType: "Document", showField: false, retainHiddenField: true };

    const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
    const page1 = caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page');

    let testFieldShowYesNo = caseConfig.addCCDFieldToPage(page1, "YesOrNo", "showTestField", "Show Test Field?");
    testFieldShowYesNo.value = true;

    let complexField = caseConfig.addCCDFieldToPage(page1, scenario.fieldType, "complexField", "Complex field");
    complexField.value = {
            "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/a612199d-9972-4b99-b653-5ec7c310e21a",
            "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/a612199d-9972-4b99-b653-5ec7c310e21a/binary",
            "document_filename": "Redacted-dm-store135044941749889827327305460282199740737.pdf"
    }; 
    complexField.retain_hidden_value = scenario.retainHiddenField;
    complexField.show_condition = `${testFieldShowYesNo.id}=\"Yes\"`;

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

