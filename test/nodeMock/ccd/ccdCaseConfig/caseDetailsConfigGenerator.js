const CCDCaseField = require('./CCDCaseField');

const caseDetailsConfig = {
  "case_id": "1606297307593887",
  "_links": {
    "self": {
      "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/cases/1606297307593887"
    }
  },
  "case_type": {
    "id": "CARE_SUPERVISION_EPO",
    "name": "Care, supervision and EPOs",
    "description": "Care, supervision and emergency protection orders",
    "jurisdiction": {
      "id": "MOCKTEST_JURISDICTION",
      "name": "MOCK Test Jurisdiction",
      "description": "Public Law"
    },
    "printEnabled": false
  },
  "tabs": [ ],
  "metadataFields": [ ],
  "state": {
    "id": "Submitted",
    "name": "Submitted",
    "description": "Submitted case state - LA can no longer edit",
    "title_display": "# ${caseName}\n## **FamilyMan ID: ${familyManCaseNumber}**\n## **CCD ID: #${[CASE_REFERENCE]}**"
  },
  "triggers": [ ],
  "events": [ ]
};

class CCDCaseDetails extends CCDCaseField{
    eventIdCounter = 10000;
    triggerOrderCounter = 0;
    tabOrderCounter = 0;
    caseDetailsTemplate = JSON.parse(JSON.stringify(caseDetailsConfig));
    constructor(name) {
        super();

        this.caseConfig = new CCDCaseConfig("test","test","test"); 
        this.caseDetailsTemplate.case_type.id = this.toCamelCase(name);
        this.caseDetailsTemplate.case_type.name = name;
        this.caseDetailsTemplate.case_type.description = "Mock case description "+name;

        this.currentTab = null;

    }

    addTab(label){
        this.tabOrderCounter++;
        const tab = {
            "id": this.toCamelCase(label),
            "label": label,
            "order": this.tabOrderCounter,
            "fields": [],
            "role": null,
            "show_condition": null
        }
        this.caseDetailsTemplate.tabs.push(tab);
        this.currentTab = tab;
        return this;
    }

    addHistoryTab(tabLabel){
        const historyTab = this.addTab(tabLabel ? tabLabel : "Mock tab History");
        const historyViewer = this.caseConfig.getCCDFieldTemplateCopy({id: "CaseHistoryViewer", type: "caseHistory", label: "Mock History View"});
        historyViewer.value = this.caseDetailsTemplate.events;
        historyTab.fields.push(historyViewer);
        return this;
    }

    // addFieldToTab(tab, caseField){
    //     tab.fields.push(caseField);
    //     return this;
    // }

    addFieldWithConfigToTab( fieldConfig) {
        if (!this.currentTab){
            throw new Error("No tab added. Add a tab before adding a Case field");
        }
        let ccdCaseField = this.getCCDFieldTemplateCopy(fieldConfig);
        
        this.currentTab.fields.push(caseField);
        return this;
    }


   setState(name){
       this.caseDetailsTemplate.state = {
           "id": this.toCamelCase(name),
           "name":name,
           "description": "Mock state description for "+name,
           "title_display": null
       };
       return this; 
   }
   
    addEvent(eventName, stateName, eventDate){
        this.eventIdCounter++;
        this.caseDetailsTemplate.events.push({
           "id": this.eventIdCounter,
            "timestamp": eventDate,
           "summary": "Test summary " + eventName + ' ' + stateName,
           "comment": "Test comment " + eventName + ' ' + stateName,
            "event_id": this.toCamelCase(eventName),
            "event_name": eventName,
            "user_id": "ef1c0299-21a0-4c71-94b5-bda73f2ae48f",
            "user_last_name": "(local-authority)",
            "user_first_name": "testmockuser@test.gov.uk",
            "state_name": stateName  ,
            "state_id": this.toCamelCase(stateName),
            "significant_item": null
        });
        return this
   }

    addTrigger(name) {
        this.triggerOrderCounter++;
        this.caseDetailsTemplate.triggers.push({
           
            "id": this.toCamelCase(name),
            "name": name,
            "description": "tTest description trigger "+name,
            "order": this.triggerOrderCounter
            
        });
        return this
    }

    addMetadata(ccdField) {
        ccdField.metadata = true;
        this.caseDetailsTemplate.metadataFields.push(ccdField);
        return this;
    }

}




module.exports = CCDCaseDetails;


