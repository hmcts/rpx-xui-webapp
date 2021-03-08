


const BrowserWaits = require('../../support/customWaits');
const { browser, $ } = require('protractor');
const CucumberReportLog = require("../../support/reportLogger");


const ShareCaseData = require('../../utils/shareCaseData');
class ShareCaseCheckAndConfirmPage {

    constructor(){
        this.pageContainer = $("xuilib-share-case-confirm");
        this.summarySelectionContainer = $("#summarySections");

        this.selectedCaseConfirmList = $$("xuilib-selected-case-confirm #user-access-block");
        this.backLink = $(".govuk-back-link");
        this.confirmBtn = $("#share-case-nav button");

        this.changesSubmissionConfirmationContainer = $('.govuk-panel--confirmation');
    }

    async waitForPageToLoad(){
        await BrowserWaits.waitForElement(this.pageContainer,"Share Case Conform your selection page not displayed.");
        await BrowserWaits.waitForElement(this.summarySelectionContainer, "Share Case confirm selection summary not displayed");

    }

    async amOnPage(){
        await this.waitForPageToLoad();
        return await this.pageContainer.isDisplayed(); 
    }

    async getCaseIdOfCaseContainer(containerIndex){
        let caseContainer = await this.selectedCaseConfirmList.get(containerIndex);
        if (!caseContainer){
            throw Error("no Case at position " + containerIndex);
        }
        await BrowserWaits.waitForElement(caseContainer.$(".case-share-confirm__caption-area .case-share-confirm__caption"), "case sub title not displayed for case at pos " + containerIndex);
        let caseId = await caseContainer.$(".case-share-confirm__caption-area .case-share-confirm__caption").getText();
        return caseId; 
    }

    async getcaseContainerWithId(caseid){
        let casesCount = await this.selectedCaseConfirmList.count();
        for (let caseCounter = 0; caseCounter < casesCount; caseCounter++){
            let caseContainer = await this.selectedCaseConfirmList.get(caseCounter);
            await BrowserWaits.waitForElement(caseContainer.$(".case-share-confirm__caption-area .case-share-confirm__caption"), "case sub title not displayed for case at pos " + caseCounter);
            let caseId = await caseContainer.$(".case-share-confirm__caption-area .case-share-confirm__caption").getText();
            if (caseId.includes(caseid)){
                return caseContainer;
            } 
        } 
        return null;
    }
    
    async getUserActionForCaseId(caseId,email){
        let caseContainer = await this.getcaseContainerWithId(caseId);
        let userRows = caseContainer.$$("tbody tr");
        let usersCount = await userRows.count();
        for(let userCounter = 0; userCounter < usersCount; userCounter++){
            let userRow = await userRows.get(userCounter);
            let userEmail = await userRow.$("td:nth-of-type(2)").getText();
            if (userEmail.includes(email)){
                return await userRow.$("td:nth-of-type(3)").getText();
            } 
        }
        return null;
    }

    async isUserMarkedToBeRemovedIncase(caseId,email){
        let userActionStatus = await this.getUserActionForCaseId(caseId, email);
        return userActionStatus ? userActionStatus.toLowerCase().includes("remove") : false; 
    }

    async isUserMarkedToBeAddedIncase(caseId, email) {
        let userActionStatus = await this.getUserActionForCaseId(caseId, email);
        return userActionStatus ? userActionStatus.toLowerCase().includes("added"): false;
    }

    async validateShareCaseChangesForListedCases(){
        let casesCount = await this.selectedCaseConfirmList.count();
        let issuesList = [];
        for(let caseCounter = 0; caseCounter < casesCount; caseCounter++){
            let caseid = await this.getCaseIdOfCaseContainer(caseCounter);
            let caseShareData = ShareCaseData.getCaseWithId(caseid);

            for (let shareWithCounter = 0; shareWithCounter < caseShareData.markedForShare.length; shareWithCounter++) {
                let email = caseShareData.markedForShare[shareWithCounter];
                if (!(await this.isUserMarkedToBeAddedIncase(caseid, email))) {
                    issuesList.push(email + "marked for added in not persisted " + caseId);
                }
            }

            for (let shareWithCounter = 0; shareWithCounter < caseShareData.markedForUnShare.length; shareWithCounter++) {
                let email = caseShareData.markedForUnShare[shareWithCounter];
                if (!(await this.isUserMarkedToBeRemovedIncase(caseid, email))) {
                    issuesList.push(email + "marked to remove in not persisted " + caseId);
                }
            }  
        }
        CucumberReportLog.AddScreenshot(screenShotUtils); 
        return issuesList;
    }

    async clickBack(){
        await this.backLink.click();
    }

    async clickChangeLinkForCase(caseNum){
        let caseContainer = await this.getcaseContainerWithId(caseNum);
        await caseContainer.$("a").click(); 
    }

    async clickConfirmBtn(){

        await this.confirmBtn.click();
        ShareCaseData.changesCommited();
    }

    async isSubmissionSuccessful(){
        await BrowserWaits.waitForElement(this.changesSubmissionConfirmationContainer);
        const message = await this.changesSubmissionConfirmationContainer.getText(); 
        return message.includes("Your cases have been updated");
    }


}

module.exports = ShareCaseCheckAndConfirmPage; 