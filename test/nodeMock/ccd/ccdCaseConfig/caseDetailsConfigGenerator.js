
const CCDCaseConfig = require('./caseCreateConfigGenerator');
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

class CCDCaseDetails {
    eventIdCounter = 10000;
    triggerOrderCounter = 0;
    tabOrderCounter = 0;
    caseDetailsTemplate = JSON.parse(JSON.stringify(caseDetailsConfig));
    constructor(name) {
        this.caseConfig = new CCDCaseConfig("test","test","test"); 
        this.caseDetailsTemplate.case_type.id = this.toCamelCase(name);
        this.caseDetailsTemplate.case_type.name = name;
        this.caseDetailsTemplate.case_type.description = "Mock case description "+name;

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
        return tab;
    }

    addHistoryTab(tabLabel){
        const historyTab = this.addTab(tabLabel ? tabLabel : "Mock tab History");
        const historyViewer = this.caseConfig.getCCDFieldTemplateCopy("CaseHistoryViewer", "caseHistory", "Mock History View");
        historyViewer.value = this.caseDetailsTemplate.events;
        historyTab.fields.push(historyViewer)
    }

    addFieldToTab(tab, caseField){
        tab.fields.push(caseField);
    }

   setState(name){
       this.caseDetailsTemplate.state = {
           "id": this.toCamelCase(name),
           "name":name,
           "description": "Mock state description for "+name,
           "title_display": null
       }; 
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
   }

    addTrigger(name) {
        this.triggerOrderCounter++;
        this.caseDetailsTemplate.triggers.push({
           
            "id": this.toCamelCase(name),
            "name": name,
            "description": "tTest description trigger "+name,
            "order": this.triggerOrderCounter
            
        });
    }

    addMetadata(ccdField) {
        ccdField.metadata = true;
        this.caseDetailsTemplate.metadataFields.push(ccdField);
    }




    toCamelCase(str) {
        return str.split(' ').map(function (word, index) {
            // If it is the first word make sure to lowercase all the chars.
            if (index == 0) {
                return word.toLowerCase();
            }
            // If it is not the first word only upper case the first char and lowercase the rest.
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
    }

    
}




module.exports = CCDCaseDetails;


