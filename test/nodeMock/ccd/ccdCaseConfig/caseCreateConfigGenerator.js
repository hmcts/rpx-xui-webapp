
const CCDCaseField = require('./CCDCaseField');
const configTemplate = {
    "id": "FR_solicitorCreate",
    "name": "EXUI Test CaseType",
    "description": "Create an application for EXUI Test Casetype 1",
    "case_id": null,
    "case_fields": [],
    "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJpcTlxNWs5NW85cWllNTk5NnU1MmEyNGhqYiIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5NjU0NzA2NSwiZXZlbnQtaWQiOiJGUl9zb2xpY2l0b3JDcmVhdGUiLCJjYXNlLXR5cGUtaWQiOiJGaW5hbmNpYWxSZW1lZHlDb250ZXN0ZWQiLCJqdXJpc2RpY3Rpb24taWQiOiJESVZPUkNFIiwiY2FzZS12ZXJzaW9uIjoiYmYyMWE5ZThmYmM1YTM4NDZmYjA1YjRmYTA4NTllMDkxN2IyMjAyZiJ9.QXtddQWsWbl8H8tKvM-SViK-E9JrFeU6bS0wlt5eJ0o",
    "wizard_pages": [ ],
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

class CCDCaseConfig extends CCDCaseField{

    caseConfigTemplate = JSON.parse(JSON.stringify(configTemplate));
    constructor(id, name, description){
        super();
        this.caseConfigTemplate.id = id;
        this.caseConfigTemplate.name = name;
        this.caseConfigTemplate.description = description;

        this.currentWizardPage = null;
        this.currentCaseField = null;

        this.currentComplexField = null;
        this.currentCollectionField = null;

    }
    
    addWizardPage(id, label){
        let wizardPage = JSON.parse(JSON.stringify(wizardPageTemplate));
        wizardPage.id = id;
        wizardPage.label = label;
        wizardPage.order = this.caseConfigTemplate.wizard_pages.length;
        this.caseConfigTemplate.wizard_pages.push(wizardPage);
        this.currentWizardPage = wizardPage; 
        this.currentCaseField = null;
        return this; 
    }

   

    addCCDFieldToPage(wizardPage,fieldConfig){
        
        this.caseConfigTemplate.case_fields.push(ccdField);
        wizardPage.wizard_page_fields.push({
            "case_field_id": fieldConfig.id,
            "order": wizardPage.wizard_page_fields.length,
            "page_column_no": 1,
            "complex_field_overrides": []
        }); 
        return ccdField;
    };


    addCaseField(fieldConfig){
        if (!this.currentWizardPage){
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

    setComplexField(fieldConfig){
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

    setFieldProps(fieldprops){
        this.checkPageAndFiedlSet();
        this.setObjectProps(this.currentCaseField,fieldprops);
        return this; 
    }

    updateFieldProps(fieldId, fieldprops) {
        const fieldConfig = this.getCaseFieldConfig(fieldId);

        this.setObjectProps(fieldConfig, fieldprops);
        return this;
    }

    

    setFieldTypeProps(fieldTypeprops){
        this.checkPageAndFiedlSet();
        this.setObjectProps(this.currentCaseField.field_type, fieldTypeprops);
        return this; 
    }

    updateFieldTypeProps(fieldId, fieldTypeprops) {
        const fieldConfig = this.getCaseFieldConfig(fieldId);

        this.setObjectProps(fieldConfig.field_type, fieldTypeprops);
        return this;
    }

    checkPageAndFiedlSet(){
        if (!this.currentWizardPage) {
            throw new Error("No wizard page added.");
        }
        if (!this.currentCaseField) {
            throw new Error("No case field added.");
        }  
    }

    getCase(){
        return this.caseConfigTemplate; 
    }

    getWizardPageConfig(pageId){
        return this.caseConfigTemplate.wizard_pages.filter(wizardpage => wizardpage.id === pageId )[0];
    }

    getCaseFieldConfig(caseFieldId){
        const fields = this.caseConfigTemplate.case_fields.filter(caseField => caseField.id === caseFieldId);
        if (fields.length === 0){
            const fieldsIds = this.caseConfigTemplate.case_fields.map(caseField => caseField.id);
            throw new Error(`Fields with id ${caseFieldId} not found in case event config fields: ${JSON.stringify(fieldsIds)}`);
        } 
        return fields[0];

    }
 
    
}

module.exports = CCDCaseConfig;
