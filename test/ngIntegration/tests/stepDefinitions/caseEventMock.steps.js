

const CucumberReportLogger = require('../../../e2e/support/reportLogger');

var { defineSupportCode } = require('cucumber');
const jsonpath = require('jsonpath');

const BrowserWaits = require('../../../e2e/support/customWaits');
const MockApp = require('../../../nodeMock/app');
const CCDCaseConfig = require('../../../nodeMock/ccd/ccdCaseConfig/caseCreateConfigGenerator');
const SoftAssert = require('../../../ngIntegration/util/softAssert');

defineSupportCode(function ({ And, But, Given, Then, When }) {

  
    Given('I create mock Case event {string}', function (moduleRef) {
        const mockCaseEvent = new CCDCaseConfig("Mock event ", "Mock jurisdiction", "test description " + moduleRef);
        global.scenarioData[moduleRef] = mockCaseEvent;
    });

    Given('I add page to event {string}', function (moduleRef,datatable) {
        const pageConfig = datatable.hashes()[0];
        const mockCaseEvent = global.scenarioData[moduleRef];

        mockCaseEvent.addWizardPage(pageConfig.id, pageConfig.label);
        global.scenarioData[pageConfig.reference] = mockCaseEvent.getWizardPageConfig(pageConfig.id);
    });

    Given('I add fields to page {string} in event {string}',function (pageRef,moduleRef, datatable) {
        const fieldConfigs = datatable.hashes();
        for (let i = 0; i < fieldConfigs.length; i++){
            const fieldConfig = fieldConfigs[i];
            const mockCaseEvent = global.scenarioData[moduleRef];
            const pageConfig = global.scenarioData[pageRef];

            const fieldStructure = fieldConfig.id.split(".");
            if (fieldStructure.length === 1){
                mockCaseEvent.addCCDFieldToPage(pageConfig, { id: fieldStructure[0], type: fieldConfig.type, label: fieldConfig.label });
            }else{
                let deepFieldConfig = mockCaseEvent.getCaseFieldConfig(fieldStructure[0]);
                for (let i = 1; i < fieldStructure.length -1; i++) {
                    if (deepFieldConfig.field_type.type === "Complex"){
                        deepFieldConfig = deepFieldConfig.field_type.complex_fields.filter(f => f.id === fieldStructure[i])[0];
                        if (!deepFieldConfig){
                            throw new Error(`${fieldStructure[i]} is not fiund in structure ${fieldConfig.id}`);
                        }
                    } else if (deepFieldConfig.field_type.type === "Collection"){
                        deepFieldConfig = deepFieldConfig.field_type.collection_field_type;
                        if (!deepFieldConfig) {
                            throw new Error(`${fieldStructure[i]} is not fiund in structure ${fieldConfig.id}`);
                        }
                    }

                }
                const fieldConfigToAdd = mockCaseEvent.getCCDFieldTemplateCopy({ id: fieldStructure[fieldStructure.length - 1], type: fieldConfig.type, label: fieldConfig.label });
                if (deepFieldConfig.field_type){
                    if (deepFieldConfig.field_type.type === "Complex") {
                        deepFieldConfig.field_type.complex_fields.push(fieldConfigToAdd);
                    } else if (deepFieldConfig.field_type.type === "Collection") {
                        deepFieldConfig.field_type.collection_field_type = fieldConfigToAdd.field_type;
                    }
                }else{
                    if (deepFieldConfig.type === "Complex") {
                        deepFieldConfig.complex_fields.push(fieldConfigToAdd);
                    } else if (deepFieldConfig.type === "Collection") {
                        deepFieldConfig.field_type.collection_field_type = fieldConfigToAdd.field_type;
                    }
                }
                

            } 
        }
    });
        
        

    Given('I set field properties for field with id {string} in event {string}', function (fieldId, moduleRef, datatable){
        const mockCaseEvent = global.scenarioData[moduleRef];
        const fieldProps = datatable.hashes();
        const fieldpropsObj = {};
        for (let i = 0; i < fieldProps.length; i++){
            fieldpropsObj[fieldProps[i].key] = fieldProps[i].value;
            
        }
        mockCaseEvent.updateFieldProps(fieldId, fieldpropsObj);
        
    });

    Given('I set fixed list ietms to field {string} in event {string}', async function(fieldId,eventRef,fixedListDatatable){
        const mockCaseEvent = global.scenarioData[eventRef];
        mockCaseEvent.setFixedListItems(fieldId, fixedListDatatable.hashes());
    });

    Given('I set case event {string} in mock', function(eventRef){
        const mockCaseEvent = global.scenarioData[eventRef];
        // console.log(mockCaseEvent.getCase());
        CucumberReportLogger.AddJsonToReportOnly(mockCaseEvent.getCase());
        MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req,res) => {
            CucumberReportLogger.AddMessage(`event /data/internal/case-types/:jurisdiction/event-triggers/:caseType `);
            res.send(mockCaseEvent.getCase());

        });
    });



    When('I enter case event field values for event {string}', async function (eventRef, fielValuesDT){
        const mockCaseEvent = global.scenarioData[eventRef] ;
        const fieldValues = fielValuesDT.hashes();
        for (let i = 0; i < fieldValues.length; i++) {
            const pathArr = fieldValues[i].path.split(".");
            
            const fieldConfig = mockCaseEvent.getCaseFieldConfig(pathArr[0]);
            const inputFieldConfig = mockCaseEvent.getInputFieldConfig(fieldConfig, pathArr);
            await caseEditPage.inputCaseField(inputFieldConfig, fieldValues[i].value, fieldValues[i].cssSelector)
        }
    });

    Given('I set complex field overrides for case field {string} in event {string}', async function (fieldId, eventRef, overrides){
        const mockCaseEvent = global.scenarioData[eventRef];
        const overridesHashes = overrides.hashes();
        mockCaseEvent.addComplexFieldOverridesToCaseField(fieldId, overridesHashes)


    });

    Given('I set caseField values in event config {string}', async function (eventRef, fields){
        const mockCaseEvent = global.scenarioData[eventRef];
        const fieldHashes = fields.hashes();
       
        for (let i = 0; i < fieldHashes.length; i++){
            mockCaseEvent.setCaseFieldValue(fieldHashes[i].id, fieldHashes[i].value);
        } 
    });

    Given('I set event default values for event {string}', async function (eventRef){
        const mockCaseEvent = global.scenarioData[eventRef];
        const caseFields = mockCaseEvent.getCase().case_fields;
        const eventData = {};
        for (let i = 0; i < caseFields.length; i++){
            eventData[caseFields[i].id] = mockCaseEvent.getCaseFieldDefaultValue(caseFields[i].id)
            caseFields[i].value = eventData[caseFields[i].id];
        } 
        console.log(JSON.stringify(eventData))
    });

    When('I click collection add new btn for field {string} in event {string}', async function (fieldPath,eventRef){
        const mockCaseEvent = global.scenarioData[eventRef];
        const pathArr = fieldPath.split(".");
        const caseFieldConfig = mockCaseEvent.getCaseFieldConfig(pathArr[0]);
        await caseEditPage.clickAddNewCollectionItemBtn(caseFieldConfig, fieldPath);
    });

    Then('I validate request body {string} of event validate api', async function(requestBodyReference,datatable){
    // step definition code here
        await BrowserWaits.waitForCondition(() =>  global.scenarioData[requestBodyReference] !== null );
        const reqBody = global.scenarioData[requestBodyReference];
        const softAsseert = new SoftAssert();
        const dataTableHashes = datatable.hashes();
        CucumberReportLogger.AddMessage("Request body in validation");
        CucumberReportLogger.AddJson(reqBody);
        for(let i = 0; i < dataTableHashes.length; i++){
            const matchValues = jsonpath.query(reqBody, dataTableHashes[i].pathExpression);
            softAsseert.setScenario(`Validate case field present in req body ${dataTableHashes[i].pathExpression}`);
            await softAsseert.assert(() => expect(matchValues.length  > 0, `path ${dataTableHashes[i].pathExpression} not found in req body`).to.be.true);
            if (matchValues.length > 0){
                softAsseert.setScenario(`Validate feidl valUe in req body ${dataTableHashes[i].pathExpression}`)
                await softAsseert.assert(() => expect(matchValues[0], `path ${dataTableHashes[i].pathExpression} not matching expected`).to.equal(dataTableHashes[i].value));
            }
        }
        softAsseert.finally();
    });

    When('I click continue in event edit page', async function(){
       await caseEditPage.clickContinue();
    });


});