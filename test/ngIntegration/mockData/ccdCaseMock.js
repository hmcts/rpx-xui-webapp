const CCDCaseConfig = require('../../nodeMock/ccd/ccdCaseConfig/caseCreateConfigGenerator');
const CCDWorkbasketConfig = require('../../nodeMock/ccd/ccdCaseConfig/workBasketInputGenerator');

function getTestJurisdiction(scenario) {
    const job = {
        id: "job", type: "Complex", label: "Job details",
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
    ];

    const complexType_1 =[
        { id: "YesOrNoField", type: "YesOrNo", label: "YesOrNo" },
        {
            id: "Gender", type: "FixedRadioList", label: "Select your gender",
            list: [{ code: "male", label: "Male" }, { code: "female", label: "Female" }, { code: "notGiven", label: "Not given" }]
        },
        { id: "TextAreaField", type: "TextArea", label: "TextArea" },
    ];
    const ComplexType_2 =[
        { id: "AddressUKField", type: "AddressUK", label: "Uk Address"},
        { id: "DateTimeField", type: "DateTime", label: "Date Time" },
        
        { id: "DateTimeField", type: "DateTime", label: "Date Time" },
        { id: "optionsMultiVal", type: "FixedList", label: "Select all that match",
          list: [{ code: "a", label: "Option A" }, { code: "b", label: "Option B" }, { code: "c", label: "Option c" }] 
        }
    ];

    
    const customCase = new CCDCaseConfig("testCaseType", "Test jurisdiction", "test description");

    customCase
        .setEventProps(scenario ? scenario : {})
        .addWizardPage("testPage1", "Test Page 1")
        .addCaseField({ id: "TextField0", type: "Text", label: "Text Field 0" })
        .addCaseField({
            id: "Gender", type: "FixedRadioList", label: "Select your gender",
            list: [{ code: "male", label: "Male" }, { code: "female", label: "Female" }, { code: "notGiven", label: "Not given" }]
        })
        .addCaseField({
            id: "MultiSelectListField", type: "MultiSelectList", label: "Select Items",
            list: [{ code: "item_1", label: "Item 1" }, { code: "item_2", label: "Item 2" }, { code: "item_3", label: "Item 3" }]
        })
        // .setFieldProps({ show_condition: 'TextField0="Show MultiSelectListField"'})
        .addCaseField({id: "AddressGlobalUKField", type: "AddressGlobalUK", label: "Global Uk Address"})
        .addCaseField({id: "AddressUKField", type: "AddressUK", label: "Uk Address"})
        .addCaseField({ id: "TextField1", type: "Text", label: "Text Field 1" })
        .setFieldProps({ show_condition: 'TextField0!="Hide TextField1" AND TextField0!="Hide all"' })
        .addCaseField({ id: "TextField2", type: "Text", label: "Text Field 2" })
        .setFieldProps({ show_condition: 'TextField0!="Hide TextField2" AND TextField0!="Hide all"' })
        .addCaseField({ id: "TextField3", type: "Text", label: "Text Field 3" })
        .addCaseField({ id: "TextAreaField", type: "TextArea", label: "TextArea" })
        .addWizardPage("testPage2", "Test Page 2")
        // .addCaseField({id: "CaseLinkField", type: "CaseLink", label: "CaseLink"})
        .addCaseField({id: "AddressGlobalField", type: "AddressGlobal", label: "Global Address"})
        // .addCaseField({id: "OrganisationField", type: "Organisation", label: "Organisation"})
        .addWizardPage("testPage3", "Test Page 3")
        .addCaseField({ id: "NumberField", type: "Number", label: "Number" })
        .addCaseField({ id: "EmailField", type: "Email", label: "Email" })
        .addCaseField({ id: "PhoneUKField", type: "PhoneUK", label: "PhoneUK" })
        .addCaseField({ id: "DateField", type: "Date", label: "Date" })
        .addCaseField({ id: "DateTimeField", type: "DateTime", label: "Date Time" })
        .addCaseField({ id: "MoneyGBPField", type: "MoneyGBP", label: "MoneyGBP" })
        .setFieldProps({ show_condition: 'TextField0!="Hide all"' })
        .addWizardPage("testPage4", "Test Page 4")
        .addCaseField({ id: "YesOrNoField", type: "YesOrNo", label: "YesOrNo" })
        .addCaseField({ id: "PostcodeField", type: "Postcode", label: "Postcode" })
        .addCaseField({
            id: "optionsMultiVal", type: "FixedList", label: "Select all that match",
            list: [{ code: "a", label: "Option A" }, { code: "b", label: "Option B" }, { code: "c", label: "Option c" }]
        })
        .addCaseField({ id: "ComplexType_1", type: "Complex", label: "ComplexType 1", complex_fields: complexType_1 })
        .addCaseField({ id: "ComplexType_2", type: "Complex", label: "ComplexType 2", complex_fields: ComplexType_2 })
        // .addCaseField({ id: "person1", type: "Complex", label: "Person 1", complex_fields: personFields })
        // .setFieldProps({ show_condition: 'TextField0!="Hide all"' })
        // .addCaseField({ id: "person2", type: "Complex", label: "Person 2", complex_fields: personFields })
        // .setFieldProps({ show_condition: 'TextField0!="Hide all"' })
        // .addCaseField({ id: "people", type: "Collection", label: "People", collection_field_type: { id: "person2", type: "Complex", label: "Person 2", complex_fields: personFields } })
        // .setFieldProps({ show_condition: 'TextField0!="Hide all"' })
        .getCase();
    return customCase;
}


function getDLCaseConfig(scenario) {
    
    const customCase = new CCDCaseConfig("testCaseType", "Test jurisdiction", "test description");

    const listItems = [
     { code: "male", label: "Male" }, { code: "female", label: "Female" }, { code: "notGiven", label: "Not given" }
    ]

    customCase
        .setEventProps(scenario ? scenario : {})
        .addWizardPage("testPage1", "Test Page 1")
        .addCaseField({ id: "dl", type: "DynamicList", label: "Root DL", value: { value: listItems[1], list_items: listItems }})
      
     


        .addCaseField({
            id: "coll", type: "Collection", label: "collection complex in complex with DL", collection_field_type:
            {
                id: "complexDl", type: "Complex", label: "Complex collection", complex_fields: [
                    { id: "complexl1", type: "Complex", label: "Complex level 1", complex_fields: [{ id: "dl", type: "DynamicList", label: "DL1" }] },

                    { id: "complexl2", type: "Complex", label: "Complex level 2", complex_fields: [{ id: "dl", type: "DynamicList", label: "DL2" }] },
                ]
            },
            value: [
                {
                    complexDl: {
                        complexl1: { dl: { value: listItems[1], list_items: listItems }, dl1: { value: listItems[2], list_items: listItems } },
                        complexl2: { dl: { value: listItems[1], list_items: listItems }, dl2: { value: listItems[2], list_items: listItems } }
                    }
                }
            ]
        })
        .setFieldProps({ display_context_parameter: "#COLLECTION(allowInsert,allowDelete)" })



        // .addCaseField({ id: "coll", type: "Collection", label: "Coll wth DL", collection_field_type: 
        // { id: "complexDl", type: "Complex", label: "Complex collection", complex_fields: [
        //     { id: "dl1", type: "DynamicList", label: "first DL" },
        //     { id: "dl2", type: "DynamicList", label: "second dl" }
        // ] },
         
        // value: [
        //     { complexDl: { dl1: { value: listItems[1], list_items: listItems }, dl2: { value: listItems[2], list_items: listItems } }}
        //     ]
        // })
        // .setFieldProps({ display_context_parameter: "#COLLECTION(allowInsert,allowDelete)"})
      
        



        .getCase();
    return customCase;
}


function getMockJurisdictionWorkbaseketConfig(){
    const workBasketConfig = new CCDWorkbasketConfig();
    workBasketConfig
        .addField({ id: "simpletext", type: "Text", label: "Simple text input" })
        .addField({ id: "radioInput", type: "FixedRadioList", label: "Simple Radio input", list: [{ code: "a", label: "A" }, { code: "b", label: "B" }, { code: "c", label: "C" }] })
        .addField({ id: "radioYesorNo", type: "YesOrNo", label: "Simple Yes or No input" })
        .addField({ id: "fixedListItem", type: "FixedList", label: "fixed listinput", list: [{ code: "a", label: "A" }, { code: "b", label: "B" }, { code: "c", label: "C" }] })
        .addField({ id: "multiSelectItem", type: "MultiSelectList", label: "Multi select input", list: [{ code: "a", label: "A" }, { code: "b", label: "B" }, { code: "c", label: "C" }] })

        .getConfig();
    return workBasketConfig;
}

module.exports = { getTestJurisdiction, getMockJurisdictionWorkbaseketConfig, getDLCaseConfig}
