
const CCDCaseField = require('./CCDCaseField');
const configTemplate = {
    "id": "FR_solicitorCreate",
    "name": "EXUI Test CaseType",
    "description": "Create an application for EXUI Test Casetype 1",
    "case_id": null,
    "case_fields": [],
    "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJpcTlxNWs5NW85cWllNTk5NnU1MmEyNGhqYiIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5NjU0NzA2NSwiZXZlbnQtaWQiOiJGUl9zb2xpY2l0b3JDcmVhdGUiLCJjYXNlLXR5cGUtaWQiOiJGaW5hbmNpYWxSZW1lZHlDb250ZXN0ZWQiLCJqdXJpc2RpY3Rpb24taWQiOiJESVZPUkNFIiwiY2FzZS12ZXJzaW9uIjoiYmYyMWE5ZThmYmM1YTM4NDZmYjA1YjRmYTA4NTllMDkxN2IyMjAyZiJ9.QXtddQWsWbl8H8tKvM-SViK-E9JrFeU6bS0wlt5eJ0o",
    "wizard_pages": [],
    "show_summary": true,
    "show_event_notes": false,
    "end_button_label": null,
    "can_save_draft": null,
    "_links": {
        "self": {
            "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/case-types/FinancialRemedyContested/event-triggers/FR_solicitorCreate?ignore-warning=false"
        }
    }
}

const wizardPageTemplate = {
    "id": 'page1',
    "label": null,
    "order": 1,
    "wizard_page_fields": [],
    "show_condition": null,
    "callback_url_mid_event": "http://finrem-cos-aat.service.core-compute-aat.internal/case-orchestration/contested/set-defaults",
    "retries_timeout_mid_event": []
};

class CCDCaseConfig extends CCDCaseField {

    caseConfigTemplate = JSON.parse(JSON.stringify(configTemplate));
    constructor(id, name, description) {
        super();
        this.caseConfigTemplate.id = id;
        this.caseConfigTemplate.name = name;
        this.caseConfigTemplate.description = description;

        this.currentWizardPage = null;
        this.currentCaseField = null;

        this.currentComplexField = null;
        this.currentCollectionField = null;

    }

    addWizardPage(id, label) {
        let wizardPage = JSON.parse(JSON.stringify(wizardPageTemplate));
        wizardPage.id = id;
        wizardPage.label = label;
        wizardPage.order = this.caseConfigTemplate.wizard_pages.length;
        this.caseConfigTemplate.wizard_pages.push(wizardPage);
        this.currentWizardPage = wizardPage;
        this.currentCaseField = null;
        return this;
    }



    addCCDFieldToPage(wizardPage, fieldConfig) {
        const ccdField = this.getCCDFieldTemplateCopy(fieldConfig);
        this.caseConfigTemplate.case_fields.push(ccdField);
        wizardPage.wizard_page_fields.push({
            "case_field_id": fieldConfig.id,
            "order": wizardPage.wizard_page_fields.length,
            "page_column_no": 1,
            "complex_field_overrides": []
        });
        return ccdField;
    };


    addCaseField(fieldConfig) {
        if (!this.currentWizardPage) {
            throw new Error("No wizard page added. Add a wizard page before adding case field");
        }
        const ccdField = this.getCCDFieldTemplateCopy(fieldConfig);

        if (ccdField.field_type.type === "Complex") {
            this.currentComplexField = ccdField;
            this.currentCollectionField = null;
        } else if (ccdField.field_type.type === "Collection") {
            this.currentComplexField = null;
            this.currentCollectionField = ccdField;
        } else {
            this.currentComplexField = null;
            this.currentCollectionField = null;
        }

        this.caseConfigTemplate.case_fields.push(ccdField);
        this.currentWizardPage.wizard_page_fields.push({
            "case_field_id": ccdField.id,
            "order": this.currentWizardPage.wizard_page_fields.length,
            "page_column_no": 1,
            "complex_field_overrides": []
        });
        this.currentCaseField = ccdField;
        return this;
    }

    setComplexField(fieldConfig) {
        this.currentComplexField.field_type.complex_fields.push(his.getCCDFieldTemplateCopy(fieldConfig));
        return this;
    }

    setEventProps(fieldprops) {
        this.setObjectProps(this.caseConfigTemplate, fieldprops);
        return this;
    }

    updateEventProps(fieldprops) {
        this.setObjectProps(this.caseConfigTemplate, fieldprops);
        return this;
    }

    setFieldProps(fieldprops) {
        this.checkPageAndFiedlSet();
        this.setObjectProps(this.currentCaseField, fieldprops);
        return this;
    }

    setFieldPropsForField(fieldConfig, fieldprops) {
        this.setObjectProps(fieldConfig, fieldprops);
        return this;
    }


    updateFieldProps(fieldId, fieldprops) {
        const fieldStructure = fieldId.split(".");
        let fieldConfig = this.getCaseFieldConfig(fieldStructure[0]);
        for (let i = 1; i < fieldStructure.length; i++) {
            if (fieldConfig.field_type.type === "Complex") {
                for (let complexFieldCtr = 0; complexFieldCtr < fieldConfig.field_type.complex_fields.length; complexFieldCtr++) {
                    let complexFieldElement = fieldConfig.field_type.complex_fields[complexFieldCtr];
                    if (complexFieldElement.id === fieldStructure[i]) {
                        fieldConfig = complexFieldElement;
                        break;
                    }
                }
            } else if (fieldConfig.field_type.type === "Collection") {
                fieldConfig = fieldConfig.field_type.collection_field_type;
            }
        };

        this.setObjectProps(fieldConfig, fieldprops);
        return this;
    }





    setFieldTypeProps(fieldTypeprops) {
        this.checkPageAndFiedlSet();
        this.setObjectProps(this.currentCaseField.field_type, fieldTypeprops);
        return this;
    }

    updateFieldTypeProps(fieldId, fieldTypeprops) {
        const fieldStructure = fieldId.split(".");
        let fieldConfig = this.getCaseFieldConfig(fieldStructure[0]);
        for (let i = 1; i < fieldStructure.length; i++) {
            if (fieldConfig.field_type.type === "Complex") {
                for (let complexFieldCtr = 0; complexFieldCtr < fieldConfig.field_type.complex_fields.length; complexFieldCtr++) {
                    let complexFieldElement = fieldConfig.field_type.complex_fields[complexFieldCtr];
                    if (complexFieldElement.id === fieldStructure[i]) {
                        fieldConfig = complexFieldElement;
                        break;
                    }
                }
            } else if (fieldConfig.field_type.type === "Collection") {
                fieldConfig = fieldConfig.field_type.collection_field_type;
            }
        };

        this.setObjectProps(fieldConfig.field_type, fieldTypeprops);
        return this;
    }

    setFixedListItems(fieldId, fieldListItems) {
        const fieldStructure = fieldId.split(".");
        let fieldConfig = this.getCaseFieldConfig(fieldStructure[0]);
        for (let i = 1; i < fieldStructure.length; i++) {
            if (fieldConfig.field_type.type === "Complex") {
                for (let complexFieldCtr = 0; complexFieldCtr < fieldConfig.field_type.complex_fields.length; complexFieldCtr++) {
                    let complexFieldElement = fieldConfig.field_type.complex_fields[complexFieldCtr];
                    if (complexFieldElement.id === fieldStructure[i]) {
                        fieldConfig = complexFieldElement;
                        break;
                    }
                }
            } else if (fieldConfig.field_type.type === "Collection") {
                fieldConfig = fieldConfig.field_type.collection_field_type;
            }
        };
        fieldConfig.field_type.fixed_list_items = fieldListItems;
        
        return this;
    }

    checkPageAndFiedlSet() {
        if (!this.currentWizardPage) {
            throw new Error("No wizard page added.");
        }
        if (!this.currentCaseField) {
            throw new Error("No case field added.");
        }
    }

    getCase() {
        return this.caseConfigTemplate;
    }

    getWizardPageConfig(pageId) {
        return this.caseConfigTemplate.wizard_pages.filter(wizardpage => wizardpage.id === pageId)[0];
    }

    getCaseFieldConfig(caseFieldId) {
        const fields = this.caseConfigTemplate.case_fields.filter(caseField => caseField.id === caseFieldId);
        if (fields.length === 0) {
            const fieldsIds = this.caseConfigTemplate.case_fields.map(caseField => caseField.id);
            throw new Error(`Fields with id ${caseFieldId} not found in case event config fields: ${JSON.stringify(fieldsIds)}`);
        }
        return fields[0];

    }

    addComplexFieldOverridesToCaseField(caseFieldId, overrides) {
        this.caseConfigTemplate.wizard_pages
        for (let i = 0; i < this.caseConfigTemplate.wizard_pages.length; i++) {
            const wizardPage = this.caseConfigTemplate.wizard_pages[i];

            for (let j = 0; j < wizardPage.wizard_page_fields.length; j++) {
                const caseField = wizardPage.wizard_page_fields[j];
                if (caseField.case_field_id === caseFieldId) {
                    for (let overridesCtr = 0; overridesCtr < overrides.length; overridesCtr++) {
                        let complexFieldOverride = {
                            "complex_field_element_id": "",
                            "display_context": "",
                            "label": null,
                            "hint_text": null,
                            "show_condition": "",
                            "retain_hidden_value": null
                        };

                        this.setObjectProps(complexFieldOverride, overrides[overridesCtr]);
                        caseField.complex_field_overrides.push(complexFieldOverride);
                    }

                }
            }
        }
    }

    setCaseFieldValue(fieldId, value) {
        const fieldStructure = fieldId.split(".");
        let fieldConfig = this.getCaseFieldConfig(fieldStructure[0]);
        let caseFieldValue = fieldConfig.value;

        let fieldValTracker = caseFieldValue;
        if (fieldStructure.length === 1) {
            fieldConfig.value = value;
        } else {

        }

        for (let i = 1; i < fieldStructure.length; i++) {
            fieldConfig = fieldConfig.field_type.complex_fields.filter(complexField => complexField.id === fieldStructure[i])[0];

            if (fieldConfig.field_type.type === "Complex") {
                fieldValTracker = fieldValTracker[fieldStructure[i]];
            } else if (fieldConfig.field_type.type === "Collection") {
                var myRegexp = /(?:^|\s)[(.*?)(?:\n|$)]/g;
                var match = myRegexp.exec(fieldStructure[i]);

                while (fieldValTracker.length === parseInt(match) + 1) {
                    const collectionFieldType = { id: "", label: "", field_type: fieldConfig.field_type.collection_field_type }
                    fieldValTracker.push(this.getFieldValue(collectionFieldType));
                }

                fieldValTracker = fieldValTracker[parseInt(match)];
                fieldConfig = collectionFieldType;
            } else {
                fieldValTracker[fieldStructure[i]] = value;
            }
        }

    }

    getCaseFieldDefaultValue(fieldId) {
        const fieldConfig = this.getCaseFieldConfig(fieldId);
        return this.getFieldValue(fieldConfig);
    }

    getFieldValue(fieldConfig) {
        let fieldVal = null;
        if (fieldConfig.field_type.type === "Collection") {
            fieldVal = [];
            const collectionFieldType = { id: "", label: "", field_type: fieldConfig.field_type.collection_field_type }
            fieldVal.push(this.getFieldValue(collectionFieldType));
        }
        if (fieldConfig.field_type.type === "Complex") {
            fieldVal = {};
            const complexFields = fieldConfig.field_type.complex_fields;
            for (let i = 0; i < complexFields.length; i++) {
                fieldVal[complexFields[i].id] = this.getFieldValue(complexFields[i]);
            }
        } else {

            fieldVal = this.getFieldTypeMockValue(fieldConfig)
        }
        return fieldVal;
    }

    getFieldTypeMockValue(fieldConfig) {
        let value = null;
        switch (fieldConfig.field_type.type) {
            case "Text":
            case "TextArea":
                value = "test " + fieldConfig.label;
                break;
            case "Postcode":
                value = "SW1 2AB"
                break;
            case "Number":
                value = 10;
                break;
            case "YesOrNo":
                value = true;
                break;
            case "Email":
                value = fieldConfig.id + ".test@test.com";
                break;
            case "PhoneUK":
                value = "07123456789"
                break;
            case "Date":
            case "DateTime":
                value = "2021-04-15T22:21:30.000Z";
                break;
            case "MoneyGBP":
                value = 10000;
                break;
            case "DynamicList":
                value = { value: this.getDummyListItems()[0], list_items: this.getDummyListItems() }
                break;
            case "FixedList":
            case "FixedRadioList":
                value = fieldConfig.field_type.fixed_list_items[0];
                break;
            case "MultiSelectList":
                value = [fieldConfig.field_type.fixed_list_items[0], fieldConfig.field_type.fixed_list_items[1]];
                break;
            case "Document":
                value = {}
                break;
        }
        return value;
    }

    getDummyListItems() {
        const listItems = [];
        listItems.push({ code: "item1", value: "Item 1" });
        listItems.push({ code: "item2", value: "Item 2" });
        listItems.push({ code: "item3", value: "Item 3" });
        return listItems;
    }


    getInputFieldConfig(caseFieldConfig, inputFieldPathArr) {
        let fieldConfig = caseFieldConfig;
        for (let i = 1; i < inputFieldPathArr.length; i++) {
            let childFieldId = inputFieldPathArr[i]
            let thisFieldType = fieldConfig.field_type ? fieldConfig.field_type.type : fieldConfig.type;
            if (thisFieldType === "Complex") {
                let complexFields = fieldConfig.field_type ? fieldConfig.field_type.complex_fields : fieldConfig.complex_fields;
                fieldConfig = complexFields.filter(complexField => complexField.id === childFieldId)[0];
            } else if (thisFieldType === "Collection") {
                let colletionField = fieldConfig.field_type ? fieldConfig.field_type.collection_field_type : fieldConfig.collection_field_type;
                fieldConfig = colletionField;
            } else {
                fieldConfig = fieldConfig;
            }
        }
        return fieldConfig;
    }

}

module.exports = CCDCaseConfig;


