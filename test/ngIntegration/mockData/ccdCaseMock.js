const CCDCaseConfig = require('../../nodeMock/ccd/ccdCaseConfig/caseCreateConfigGenerator');

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
    ];;

    const customCase = new CCDCaseConfig("testCaseType", "Test jurisdiction", "test description");

    customCase
        .setEventProps(scenario ? scenario : {})
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

                    // { id: "complexl2", type: "Complex", label: "Complex level 2", complex_fields: [{ id: "dl", type: "DynamicList", label: "DL2" }] },
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


module.exports = { getTestJurisdiction, getDLCaseConfig}
