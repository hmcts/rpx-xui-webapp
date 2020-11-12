

const express = require('express');
var bodyParser = require('body-parser');

let { requestMapping,configurations} = require('./reqResMapping');
const { browser } = require('protractor');
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

// mockInstance.init();

// const CCDCaseConfig = require('./ccd/ccdCaseConfig/caseCreateConfigGenerator'); 
// const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
// caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page', 1);

// let textField = caseConfig.getTextFieldTemplate();
// textField.value = "test value";
// let textFieldShowYesNo = caseConfig.getYesOrNoFieldTemplate();
// textFieldShowYesNo.id = "showTextField";
// textFieldShowYesNo.default_value = true;
// textField.show_condition = `${textFieldShowYesNo.id}="Yes"`;
// textField.reta

// caseConfig.addFieldToPage('HiddenFieldPage_1', textFieldShowYesNo, 0);
// caseConfig.addFieldToPage('HiddenFieldPage_1', textField, 1);


// mockInstance.onGet('/data/internal/cases/:caseid/event-triggers/:eventId', (req, res) => {
//     res.send(caseConfig.caseConfigTemplate);
// })



// mockInstance.startServer();

module.exports = mockInstance;
