
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


const ccdFieldTemplate = {
    "id": "testTextField",
    "label": "Organisation ID",
    "hidden": null,
    "order": null,
    "metadata": false,
    "case_type_id": null,
    "hint_text": null,
    "field_type": {
        "id": "Text",
        "type": "Text",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
    },
    "security_classification": "PUBLIC",
    "live_from": null,
    "live_until": null,
    "show_condition": null,
    "acls": [

    ],
    "complexACLs": [],
    "display_context": "OPTIONAL",
    "display_context_parameter": null,
    "formatted_value": null,
    "default_value": null,
    "retain_hidden_value": null,
    "show_summary_change_option": true,
    "show_summary_content_option": null,
    "retain_hidden_value": null
};



class CCDCaseConfig {

    caseConfigTemplate = JSON.parse(JSON.stringify(configTemplate));
    constructor(id, name, description){
        this.caseConfigTemplate.id = id;
        this.caseConfigTemplate.name = name;
        this.caseConfigTemplate.description = description;

    }
    
    addWizardPage(id, label){
        let wizardPage = JSON.parse(JSON.stringify(wizardPageTemplate));
        wizardPage.id = id;
        wizardPage.label = label;
        wizardPage.order = this.caseConfigTemplate.wizard_pages.length;
        this.caseConfigTemplate.wizard_pages.push(wizardPage);
        return wizardPage; 
    }

   

    addCCDFieldToPage(wizardPage,fieldType, id, label){
        const ccdField = this.getCCDFieldTemplateCopy(fieldType, id, label);

        this.caseConfigTemplate.case_fields.push(ccdField);
        wizardPage.wizard_page_fields.push({
            "case_field_id": id,
            "order": wizardPage.wizard_page_fields.length,
            "page_column_no": 1,
            "complex_field_overrides": []
        }); 
        return ccdField;
    };

    getCCDFieldTemplateCopy(fieldType, id, label) {
        const template =  JSON.parse(JSON.stringify(ccdFieldTemplate));
       
        switch (fieldType){
            case "AddressGlobalUK":
            case "AddressUK":
                template.field_type.id = fieldType;
                template.field_type.type = "Complex";
                const add1 = this.getCCDFieldTemplateCopy("Text", "AddressLine1", "Building and Street"); 
                const add2 = this.getCCDFieldTemplateCopy("Text", "AddressLine2", "Address Line 2");
                const add3 = this.getCCDFieldTemplateCopy("Text", "AddressLine3", "Address Line 3"); 
                const postTown = this.getCCDFieldTemplateCopy("Text", "PostTown", "Town or City");
                const county = this.getCCDFieldTemplateCopy("Text", "County", "County");
                const postCode = this.getCCDFieldTemplateCopy("Text", "PostCode", "Postcode/Zipcode");
                const country = this.getCCDFieldTemplateCopy("Text", "Country", "Country");

                template.field_type.complex_fields = [add1, add2, add3, postTown, county, postCode, country]; 
                break;
            case "AddressLine1":
                template.field_type.id = "TextMax150";
                template.field_type.type = "Text" 
                template.field_type.max = 150;
                break;
            case "AddressLine2":
            case "AddressLine3":
            case "PostTown":
            case "county":
            case "Country":
                template.field_type.id = "TextMax50";
                template.field_type.type = "Text"
                template.field_type.max = 50;
                break;
            case "PostCode":
                template.field_type.id = "TextMax14";
                template.field_type.type = "Text"
                template.field_type.max = 14;
                break
            case "OrderSummary":
            case "CaseLink":
            case "Organisation":
                template.field_type.id = fieldType;
                template.field_type.type = "Complex";
                break; 
            case "Organisation":
                template.field_type.id = "OrganisationPolicy";
                template.field_type.type = "Complex"; 

                const OrgPolicyCaseAssignedRole = this.getCCDFieldTemplateCopy("Text", "OrgPolicyCaseAssignedRole", "Case Assigned Role"); 

                const organisation = this.getCCDFieldTemplateCopy("Complex", "Organisation", "Organisation");
                organisation.field_type.id = "Organisation;";
                const orgId = this.getCCDFieldTemplateCopy("Text", "OrganisationID", "Organisation ID"); 
                const orgNaMe = this.getCCDFieldTemplateCopy("Text", "OrganisationName", "Name");   
                organisation.field_type.omplex_fields = [orgId, orgNaMe];

                template.field_type.complex_fields = [OrgPolicyCaseAssignedRole, organisation]; 
                
            default:
                template.field_type.id = fieldType;
                template.field_type.type = fieldType;
        }

     
        template.id = id;
        template.label = label;
        return template;
    }

  

}

module.exports = CCDCaseConfig;


