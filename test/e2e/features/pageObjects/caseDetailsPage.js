
const TaskMessageBanner = require("./messageBanner");
const BrowserWaits = require("../../support/customWaits");
const CucumberReporter = require("../../support/reportLogger");
class CaseDetailsPage{

    constructor(){
        this.taskInfoMessageBanner = new TaskMessageBanner("exui-case-details-home");

        this.caseDetailsContainer = $("exui-case-details-home");

    }

    async amOnPage(){
        try{
            await BrowserWaits.waitForElement(this.caseDetailsContainer);
            return true;
        }catch(err){
            CucumberReporter.AddMessage(err.stack);
            return false;
        }
    }

}

module.exports = new CaseDetailsPage();
