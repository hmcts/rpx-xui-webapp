

const express = require('express');
var bodyParser = require('body-parser');
const minimist = require('minimist');


let { requestMapping,configurations} = require('./reqResMapping');
const { browser } = require('protractor');
const CCDCaseConfig = require('./ccd/ccdCaseConfig/caseCreateConfigGenerator');
const CCDCaseDetails = require('./ccd/ccdCaseConfig/caseDetailsConfigGenerator');

const { getDLCaseConfig} = require('../ngIntegration/mockData/ccdCaseMock');

const port = 3001;


class MockApp{
    init(){
        this.intercepts =[];
        this.conf = {
            get: { ...requestMapping.get },
            post: { ...requestMapping.post },
            put: { ...requestMapping.put },
            delete: { ...requestMapping.delete }
        };
        // this.configurations = Object.assign({}, configurations);
        console.log("Mock Config Initialized");
        return "done";
    }

    addIntercept(url,callback){
        this.intercepts.push({url: url, callback: callback})
    }

    async startServer(){
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(express.json()); 

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

        this.server = await app.listen(port)
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

}

function caseDetailsLabelShowCondition(){
    const caseDetail = new CCDCaseDetails("Mock Label show cosndition case type"); 
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
    labelsEventConfig.addWizardPage("testPage3", "Applicant addressess ")
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


