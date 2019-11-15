
var CreateCaseStartPage = require('./createCaseStartPage');

var BrowserWaits = require('../../support/customWaits');

const date = require('moment');
var path = require('path');

var CaseManager = require("./common/CaseManager");

class FRCase{

    constructor(){
        this.caseManager = new CaseManager();
    }

    async createCase(caseType){
        var caseData = {
            "Divorce Case Number": "BV18D00152"
        };

        var caseTypeSelection = "";
        var event = "";
        if (caseType === "consented"){
            caseTypeSelection= "Financial Remedy Consented";
            event = "Consent Order Application"; 
        }
        else{
            caseTypeSelection = "Contested Financial Remedy";
            event = "Form A Application";
        }

        await this.caseManager.createCase ("Family Divorce", caseTypeSelection,event,caseData);
    }



}

module.exports = FRCase;