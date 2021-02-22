
const caseworkerJurisdictions  = require("./caseworkerJurisdictions");
const {divorce, probate, ia, publicLaw} = require('./workBasketInputs');

const divorceCreateCaseConfig = require('./solicitorCreate/divorceCaseCreateConfig');
const frConsentedCreaCaseConfig = require('./solicitorCreate/frConsentedConfig');
const frContestedCreaCaseConfig = require('./solicitorCreate/frContestedConfig');

const probateGrantOfRepresentationConfig = require('./solicitorCreate/probateGrantOfRepresentationConfig');
const probateCreateCaveatConfig = require('./solicitorCreate/probateCreateCaveatConfig');

const iaCreateConfig = require('./solicitorCreate/iaCreateConfig');

const fplTribunalConfig = require('./solicitorCreate/fplTribunalCreateConfig');

const fplCareSupervisionConfig = require('./solicitorCreate/fplCareSupervision');

const exuiTestCaseType = require('./solicitorCreate/exuiTestCaseType');
const { isArray } = require("core-js/fn/array");
const CCDCaseConfig = require('./ccdCaseConfig/caseCreateConfigGenerator');
const CCDWorkBasketInputGenerator = require('./ccdCaseConfig/workBasketInputGenerator');

class CCDApi{

    getJurisdictions(){
        return caseworkerJurisdictions; 
    }

    getWorkbasketInputs(jurisdiction){
        let workbasketInputs = publicLaw;
        switch (jurisdiction){
            case 'DIVORCE':
                workbasketInputs = divorce;
                break;
            case 'GrantOfRepresentation':
                workbasketInputs = probate;
                break;
            case 'Asylum':
                workbasketInputs = ia;
                break
            case 'TRIB_MVP_3_TYPE':
                workbasketInputs = publicLaw;
                break;
        }
        return workbasketInputs;
    }

    getSolicitorCreateCaseConfig(caseType,event){
        if (caseType === 'DIVORCE'){
            return divorceCreateCaseConfig; 
       } 
        if (caseType === 'FinancialRemedyMVP2' && event === 'FR_solicitorCreate'){
            return frConsentedCreaCaseConfig; 
       }
        if (caseType === 'FinancialRemedyContested' && event === 'FR_solicitorCreate') {
            return frContestedCreaCaseConfig;
        }

        if (caseType === 'GrantOfRepresentation' && event === 'solicitorCreateApplication') {
            return probateGrantOfRepresentationConfig;
        }

        if (caseType === 'Caveat' && event === 'solicitorCreateCaveat') {
            return probateCreateCaveatConfig;
        }

        if (caseType === 'Asylum' && event === 'startAppeal') {
            return iaCreateConfig;
        }



        if (caseType === 'TRIB_MVP_3_TYPE' && event === 'initiateCase') {
            return fplTribunalConfig;
        }

        if (caseType === 'CARE_SUPERVISION_EPO' && event === 'openCase') {
            return fplCareSupervisionConfig;
        }

        if (caseType === 'casetype_1' ) {
            return exuiTestCaseType;
        }
    }

    getSingleFieldCaseEventConfig(eventId) {
        const customCase = new CCDCaseConfig("testCaseType", "Test jurisdiction", "test description");
        customCase.addWizardPage("testPage1", "Test Page 1");
        switch (eventId) {
            case "text":
                customCase.addCaseField({ id: "tesxt", type: "Text", label: "Text field", value: "Sample test text value ABC" })
                break;
            case "dynamicList":
                const listItems = [
                    { "code": "item1", "label": "Item 1" },
                    { "code": "item2", "label": "Item 2" },
                    { "code": "item3", "label": "Item 3" },
                ];

                customCase.addCaseField({
                    label: "test field won label", type: "DynamicList", id: "dynamicListField", value: { "value": listItems[2], "list_items": listItems }
                })
                customCase.addCaseField({
                    type: "Complex", id: "dynamicListInComplexField", complex_fields: [
                        { type: "DynamicList", id: "dynamicListField", label: "Field Dynamic list" }
                    ]
                    , value: { "dynamicListField": { "value": listItems[2], "list_items": listItems } }
                })
                break;
            case "test":
                return this.getCustomCase();
                break;
            default:
                return mockEvents[eventId]();

        }

        return customCase.getCase();
    }

    getWorkbasketInputs(){
        const ccdWorkBasketInputGenerator = new CCDWorkBasketInputGenerator();
        return ccdWorkBasketInputGenerator
            .addField({ id: "simpletext", type: "Text", label: "Simple text input" })
            .addField({ id: "radioInput", type: "FixedRadioList", label: "Simple Radio input", list: [{ code: "a", label: "A" }, { code: "b", label: "B" }, { code: "c", label: "C" }] })
            .addField({ id: "radioYesorNo", type: "YesOrNo", label: "Simple Yes or No input" })
            .addField({ id: "fixedListItem", type: "FixedList", label: "fixed listinput", list: [{ code: "a", label: "A" }, { code: "b", label: "B" }, { code: "c", label: "C" }] })
            .addField({ id: "multiSelectItem", type: "MultiSelectList", label: "Multi select input", list: [{ code: "a", label: "A" }, { code: "b", label: "B" }, { code: "c", label: "C" }] })

            .getConfig();


    }

    getCustomCase(){
            const job = {
                id: "TextField0", type: "Complex", label: "Text Field 0",
                complex_fields: [
                    { id: "Title", type: "Text", label: "Title" },
                    { id: "Description", type: "Text", label: "Description" },
                ]
            };

            const personFields = [
                { id: "Title", type: "Text", label: "Title" },
                { id: "FirstName", type: "Text", label: "First Name" },
                { id: "LastName", type: "Text", label: "Last name" },
                { id: "MaidenName", type: "Text", label: "Maiden Name" },
                {
                    id: "Gender", type: "FixedRadioList", label: "Select your gender",
                    list: [{ code: "male", label: "Male" }, { code: "female", label: "Female" }, { code: "notGiven", label: "Not given" }]
                },
                job
            ];;

            const customCase = new CCDCaseConfig("testCaseType", "Test jurisdiction", "test description");

            return customCase
                .setEventProps({show_summary: true})
                .addWizardPage("testPage1", "Test Page 1")
                    .addCaseField({ id: "TextField0", type: "Text", label: "Text Field 0" })
                    .addCaseField({ id: "TextField1", type: "Text", label: "Text Field 1" })
                        .setFieldProps({ show_condition: 'TextField0!="Hide TextField1" AND TextField0!="Hide all"' })
                    .addCaseField({ id: "TextField2", type: "Text", label: "Text Field 2" })
                        .setFieldProps({ show_condition: 'TextField0!="Hide TextField2" AND TextField0!="Hide all"' })
                    .addCaseField({ id: "TextField3", type: "Text", label: "Text Field 3" })

                .addWizardPage("testPage2", "Test Page 2")
                    .addCaseField({
                        id: "Gender", type: "FixedRadioList", label: "Select your gender",
                        list: [{ code: "male", label: "Male" }, { code: "female", label: "Female" }, { code: "notGiven", label: "Not given" }]
                    })
                        .setFieldProps({ show_condition: 'TextField0!="Hide all"' })
                    .addCaseField({
                        id: "optionsMultiVal", type: "FixedList", label: "Select all that match",
                        list: [{ code: "a", label: "Option A" }, { code: "b", label: "Option B" }, { code: "c", label: "Option c" }]
                    })
                    .addCaseField({ id: "person1", type: "Complex", label: "Person 1", complex_fields: personFields })
                        .setFieldProps({ show_condition: 'TextField0!="Hide all"' })
                    .addCaseField({ id: "person2", type: "Complex", label: "Person 2", complex_fields: personFields })
                        .setFieldProps({ show_condition: 'TextField0!="Hide all"' })
                    .addCaseField({ id: "people", type: "Collection", label: "People", collection_field_type: { id: "person2", type: "Complex", label: "Person 2", complex_fields: personFields } })
                        .setFieldProps({ show_condition: 'TextField0!="Hide all"' })
                .getCase();
        
 
    }

}

module.exports = new CCDApi();


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
const mockEvents = {
    "complexDynamicList": () =>{
        const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Dynamic list tests', 'Dynamic list tests');

        const dynamicListVal = { "value": listItems[2], "list_items": listItems };

        return caseConfig
            .setEventProps({})
            .addWizardPage("simpleDynamicList", "Root level dynamic list")
            .addCaseField({ id: "testDynamicList", type: "DynamicList", label: "Sample Dynamic List", value: dynamicListVal })
            // .addWizardPage("complexFieldDynamicList", "Complex field level dynamic list")
            .addCaseField({
                id: "complexWithDynamicList", type: "Complex", label: "Comples having dynamic list", value: { "testComplexDynamicList": dynamicListVal }, complex_fields: [
                    { id: "testComplexDynamicList", type: "DynamicList", label: "Complex Dynamic List", }
                ]
            })
            .getCase();
    },


    "collectionDynamicList": () => {
        const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Dynamic list tests', 'Dynamic list tests');

        return caseConfig
            .setEventProps({})
            .addWizardPage("simpleDynamicList", "Root level dynamic list")
            .addCaseField({ id: "testDynamicList", type: "DynamicList", label: "Sample Dynamic List", value: { "value": listItems[2], "list_items": listItems } })
                    .setFieldProps({ display_context_parameter: "#COLLECTION(allowInsert,allowDelete)" })
                .addCaseField({
                    id: "collectionDYnamicList", type: "Collection", label: "Collection DL",
                    collection_field_type: { id: "testCollectionDynamicList", type: "DynamicList", label: "Collection Dynamic List", },
                    value: [
                        { id:1, value : { "value": listItems[2], "list_items": listItems }},
                        { id: 1, value:{ "value": listItems[1], "list_items": listItems }}
                    ]
                })
                    .setFieldProps({ display_context_parameter: "#COLLECTION(allowInsert,allowDelete)"})
            .getCase();
    }
};



 


