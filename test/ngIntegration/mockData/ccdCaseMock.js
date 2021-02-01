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

    const listItems = [
     { code: "male", label: "Male" }, { code: "female", label: "Female" }, { code: "notGiven", label: "Not given" }
    ]

    customCase
        .setEventProps(scenario ? scenario : {})
        .addWizardPage("testPage1", "Test Page 1")
        .addCaseField({ id: "dl", type: "DynamicList", label: "Root DL", value: { value: listItems[1], list_items: listItems }})
        .addCaseField({ id: "coll", type: "Collection", label: "Coll wth DL", collection_field_type: { id: "dl", type: "DynamicList", label: "Dl list", complex_fields: personFields },
            value: { coll: [{ value: listItems[1], list_items: listItems }] }
        })
        .setFieldProps({
            acls: [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ] }) 
        .getCase();
    return customCase;
}


module.exports = { getTestJurisdiction, getDLCaseConfig}
