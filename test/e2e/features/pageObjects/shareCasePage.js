
const BrowserWaits = require('../../support/customWaits');
const { browser, $ } = require('protractor');

const ShareCaseData = require('../../utils/shareCaseData');

const CucumberReportLog = require("../../support/reportLogger");
class ShareCasePage {

    constructor() {
        this.backLink = $('.govuk-back-link');
        this.shareCaseContainer = $('exui-case-share');
        this.selectedCases = $$('xuilib-selected-case-list xuilib-selected-case'); 

        this.continueButton = $("#share-case-nav button");

        this.noCaseDisplay = $('#noCaseDisplay');

        //User selection element
        this.userEmailInput = $('#add-user xuilib-user-select .govuk-input');

        this.userFilterContainer = $('.mat-autocomplete-panel');
        this.userFilterList = $$('.mat-autocomplete-panel .mat-option-text');
        this.addUserBtn = $('#btn-add-user');

        this.openCloseAll = $('.govuk-accordion__open-all');

        this.testData_lastSelectedUser = "";
        this.testData_lastAddedUser = "";
    }

    async waitForPageToLoad(){
        await BrowserWaits.waitForElement(this.shareCaseContainer);
        await BrowserWaits.waitForCondition(async () => {
            return await this.selectedCases.count() > 0; 
        });
        await browser.sleep(2000);

    }
    async amOnPage() {
        await this.waitForPageToLoad();
        await this.testData_storeCaseShareDataOnPage();
        return await this.shareCaseContainer.isPresent();
    }

    async testData_markUserWithEmailTobeAdded(email){
        let casesCount = await this.casesCount();
        for (let caseCounter = 1; caseCounter <= casesCount; caseCounter++) {
            let caseId = await this.getCaseSubtitle(caseCounter);
            ShareCaseData.MarkUserToShare(caseId,email);
        } 
    }
    async testData_storeCaseShareDataOnPage(){
        let casesCount = await this.casesCount();
        for (let caseCounter = 1; caseCounter <= casesCount; caseCounter++){
            let caseId = await this.getCaseSubtitle(caseCounter );
            let sharedWith = [];
            let tobeAdded = [];
            let tobeRemoved= [];

            let usersCountInCase = await this.getUsersCount(caseCounter);
            for (let userCounter = 1; userCounter <= usersCountInCase; userCounter++){
                let email = await this.getEmailForUserIncase(caseCounter, userCounter);
                let actionLinktext = await this.getActionLinkTextForUser(caseCounter, userCounter);
                if (actionLinktext === 'Cancel'){
                    let actionStatusLabel = await this.getActionLabelForUserWithEmail(caseCounter,email);

                    if (actionStatusLabel.includes('added')){
                        tobeAdded.push(email);
                    }else{
                        sharedWith.push(email);
                        tobeRemoved.push(email); 
                    }

                }else{
                    sharedWith.push(email);
                }
            }
            ShareCaseData.AddCaseShareData(caseId,sharedWith,tobeAdded,tobeRemoved);
            CucumberReportLog.AddJson(ShareCaseData.getCaseWithId(caseId));
        } 
    }

    async clickBackLink(){
        await this.backLink.click();
    }

    async casesCount(){
        await this.waitForPageToLoad();
        return await this.selectedCases.count(); 
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

    async enterUserEmailToSelect(emailText){
        return await this.userEmailInput.sendKeys(emailText); 
    }

    async getUserEmailText(emailText) {
        return await this.userEmailInput.getText();
    }

    async getFilteredUsersCount(){

        await BrowserWaits.waitForSeconds(2);
        return await this.userFilterList.count();
    }

    async getFilteredUserEmails() {
        let userEmails = [];
        let usernameEmails = await this.getFilteredUserNameEmails();
        for (let userCounter = 0; userCounter < usernameEmails.length; userCounter++ ){
            let usernameEmailText = usernameEmails[userCounter];
            let userEmail = usernameEmailText.split('-')[1].trim(); 
            userEmails.push(userEmail);
        }
        return userEmails;s
    }

    async getFilteredUserNameEmails() {
        let userNameEmails = [];
        let usersCount = await this.getFilteredUsersCount();
        for (let userCounter = 0; userCounter < usersCount; userCounter++) {
            let user = await this.userFilterList.get(userCounter);
            let usernameEmailText = await user.getText();
            userNameEmails.push(usernameEmailText);
        }
        CucumberReportLog.AddMessage("Filtered Users : " + JSON.stringify(userNameEmails));
        return userNameEmails; 
    }


    async selectUserFromFilteredList(userNum){
        let userToSelect = await this.userFilterList.get(userNum - 1);
        CucumberReportLog.AddMessage("Selected User : "+await userToSelect.getText()); 
        await userToSelect.click();
    }

    async isAddButtonEnabled(){
        return await this.addUserBtn.isEnabled();
    }

    async clickAddUserbutton(){
        await this.addUserBtn.click();
        this.testData_lastAddedUser = this.testData_lastSelectedUser;
        this.testData_lastSelectedUser = "";
        CucumberReportLog.AddMessage("Click Add with user selected : " + this.testData_lastAddedUser );
        await this.testData_markUserWithEmailTobeAdded(this.testData_lastAddedUser);
    }

    async getCaseTitle(caseNum){
        let selectedCase = await this.selectedCases.get(caseNum - 1); 
        return await selectedCase.$('.govuk-case-title').getText();
    }

    async getCaseSubtitle(caseNum) {
        let selectedCase = await this.selectedCases.get(caseNum - 1); 
        return await selectedCase.$('.govuk-case-sub-title').getText();
    }

    async clickDeselectCase(caseNum){
        let selectedCase = await this.selectedCases.get(caseNum - 1);
        CucumberReportLog.AddMessage("Deselecting Case " + await selectedCase.getText()); 
        await selectedCase.$("[id^='btn-deselect-case']").click();  
        
        await BrowserWaits.waitForCondition(async () => {
            return !(await selectedCase.isPresent()); 
        });
    }

    async clickCaseDetailsExpandCollapseBtn(caseNum){
        let selectedCase = await this.selectedCases.get(caseNum - 1);
        let button = await selectedCase.$('.govuk-accordion__section-button');
        await BrowserWaits.waitForElement(button, "Expand/collapse icon not present");
        await browser.sleep(1000);
        await browser.executeScript('arguments[0].scrollIntoView()',
            button);
        await button.click();
    }

    async isCaseContentDisplayed(caseNum){
        let selectedCase = await this.selectedCases.get(caseNum - 1); 
        return await selectedCase.$('.govuk-accordion__section--expanded').isPresent();
    }

    async getUsersCount(caseNum){
        let selectedCase = await this.selectedCases.get(caseNum - 1); 
        return await selectedCase.$$('tbody tr').count();
    }

    async getActionLinkForUser(caseNum, userNum){
        let selectedCase = await this.selectedCases.get(caseNum - 1);
        let user = await selectedCase.$$('tbody tr').get(userNum - 1);
        return user.$('a'); 
    }

    async getActionLinkTextForUser(caseNum, userNum){
        let actionLink = await this.getActionLinkForUser(caseNum, userNum);
        let linkText = await browser.executeScript('return arguments[0].textContent',
            actionLink);
        return linkText;
    }

    async clickActionLinkForUser(caseNum,userNum){
        let actionLink = await this.getActionLinkForUser(caseNum, userNum);

        let actionLinktext = await actionLink.getText();
        let caseid = await this.getCaseSubtitle(caseNum);
        let userEmail = await this.getEmailForUserIncase(caseNum, userNum);
        let actionLinkLabel = await this.getActionLabelForUserWithEmail(caseNum,userEmail); 

        await actionLink.click();
        
        if (actionLinktext === "Remove"){
            ShareCaseData.MarkUserToUnShare(caseid,userEmail);
            CucumberReportLog.AddMessage(caseid + " Case user uis marked for Unshare "+userEmail);
            console.log("*********** Marking to Remove " + caseid+" : email "+userEmail);
        } else if (actionLinkLabel.includes("added")){
            ShareCaseData.CancelMarkedForShare(caseid, userEmail);
            CucumberReportLog.AddMessage(caseid + " Case user uis marked for Share " + userEmail);
            console.log("*********** Cancel to be Added " + caseId + " : email " + userEmail);
 
        }else{
            ShareCaseData.CancelMarkedForUnShare(caseid, userEmail);
            CucumberReportLog.AddMessage(caseid + " canceled Marked or Unshare " + userEmail); 
            console.log("*********** Cancel to be removed " + caseId + " : email " + userEmail); 
        }
    }

    async getEmailForUserIncase(caseNum, userNum) {
        let selectedCase = await this.selectedCases.get(caseNum - 1);
        let userRow = await selectedCase.$$('tbody tr').get(userNum - 1);
        let email = await browser.executeScript('return arguments[0].textContent',
            userRow.$('td:nth-of-type(2)'));
        return email;
    }


    async getActionStatusLabelForUser(caseNum, userNum) {
        let selectedCase = await this.selectedCases.get(caseNum - 1);
        let user = await selectedCase.$$('tbody tr').get(userNum - 1);
        let actionLabelCol = user.$('td:nth-of-type(4)');
        let actionLabel = await browser.executeScript('return arguments[0].textContent',
            actionLabelCol); 
        return actionLabel;
    }

    async getUserRowInCase(caseNum, email){
        let selectedCase = await this.selectedCases.get(caseNum - 1);
        let users = selectedCase.$$('tbody tr');
        let userCount = await users.count();
        for (let user = 0; user < userCount; user++) {
            let userRow = await users.get(user);

            let userEmail = await browser.executeScript('return arguments[0].textContent',
                userRow.$('td:nth-of-type(2)'));

            if (userEmail === email) {
                return userRow;
            }
        }
        return null; 
    }

    async isUserWithEmailListedInCase(caseNum,email){
        let userRow = await this.getUserRowInCase(caseNum, email);    
        return userRow !== null;
    }

    async isUserWithEmailMarkedToBeAdded(caseNum, email) {
        let userRow = await this.getUserRowInCase(caseNum, email);
        let actionLabel = await browser.executeScript('return arguments[0].textContent',
            userRow.$('td:nth-of-type(4)'));
        return actionLabel.toLowerCase().includes("added");
    }

    async isUserWithEmailMarkedToBeRemoved(caseNum, email) {
        let userRow = await this.getUserRowInCase(caseNum, email);
        let actionLabel = await browser.executeScript('return arguments[0].textContent',
            userRow.$('td:nth-of-type(4)'));
        return actionLabel.toLowerCase().includes("removed");
    }

    async getActionLabelForUserWithEmail(caseNum,email){
        let selectedCase = await this.selectedCases.get(caseNum - 1);
        let users = selectedCase.$$('tbody tr');
        let userCount = await users.count();
        for (let user = 0; user < userCount; user++) {
            let userRow = await users.get(user);
            let userEmail = await browser.executeScript('return arguments[0].textContent',
                userRow.$('td:nth-of-type(2)'));
            if (userEmail === email) {
                let actionLabel = await browser.executeScript('return arguments[0].textContent',
                    userRow.$('td:nth-of-type(4)'));
                return actionLabel;
            }
        }
        return "user not listed"
    }

    async getMessageDisplayedInNoCasesDisplayed(){
        return await this.noCaseDisplay.getText();
    }

    async clickOpenOrCloseAllLink(){
        await BrowserWaits.waitForElement(this.openCloseAll, "OpenAll/CloaseAll button not present");
        await this.openCloseAll.click();
    }

    async getLinkTextForOpenOrCloseAlllink(){
        await BrowserWaits.waitForElement(this.openCloseAll, "OpenAll/CloaseAll button not present");
        return await this.openCloseAll.getText(); 
    }

    async isUserWithEmailNotSharedWithAtleastOneCase(email){
        let totalCases = await this.casesCount();
        for(let i = 1 ; i <= totalCases; i++){
            if(!(await this.isUserWithEmailListedInCase(i,email))){
                return i;
            }
        }
        return 0;
    }

    async isUserWithEmailSharedWithAtleastOneCase(email) {
        let totalCases = await this.casesCount();
        for (let i = 1; i <= totalCases; i++) {
            if ((await this.isUserWithEmailListedInCase(i, email))) {
                return i;
            }
        }
        return 0;
    }

    async selectUserWithEmail_Not_SharedWithAtLeastOneCase(){
        let useremails = await this.getFilteredUserEmails();
        let userToSelect = 0;
        let email = "";
        for(let i = 0; i < useremails.length; i++){
           email = useremails[i];
           let caseNum = await this.isUserWithEmailNotSharedWithAtleastOneCase(email);
            if (caseNum > 0){
                userToSelect = i + 1; 
                break;
           } 
        }
        if (userToSelect > 0){
            await this.selectUserFromFilteredList(userToSelect);
            this.testData_lastSelectedUser = email;
            CucumberReportLog.AddMessage("Selected a user not shared with any case : "+email);
        }else{
            throw Error("AllUsers shared with all selected cases. cannot proceed with test step to select a user not shared with atleast one case");
        }
    }


    async selectUserWithEmail_SharedWithAtLeastOneCase() {
        let useremails = await this.getFilteredUserEmails();
        let userToSelect = 0;
        let email = "";
        for (let i = 0; i < useremails.length; i++) {
            email = useremails[i];
            let caseNum = await this.isUserWithEmailSharedWithAtleastOneCase(email);
            if (caseNum > 0) {
                userToSelect = i + 1;
                break;
            }
        }
        if (userToSelect > 0) {
            await this.selectUserFromFilteredList(userToSelect);
            this.testData_lastSelectedUser = email;
            CucumberReportLog.AddMessage("Selected a user  shared with atleast one case : " + email);
        } else {
            throw Error("No user is list is shared with any case already. cannot proceed with test step to select a user not shared with atleast one case");
        }
    }

    async isLastAddedUserListedInAllCases(){      
       let casesCount = await this.casesCount();
       for(let i = 1; i<= casesCount; i++){
           if(!(await this.isUserWithEmailListedInCase(i,this.testData_lastAddedUser))){
            return false;
           }
       } 
       return true;
    }

    async isLastAddedUserMarkedTobeAddedInAnyCase() {
        let casesCount = await this.casesCount();
        for (let i = 1; i <= casesCount; i++) {
            if(await this.isUserWithEmailMarkedToBeAdded(i, this.testData_lastAddedUser)){
                return true;
            }
        }
        return false;
    }

    async isAnyUserMarkedToBeRemoved() {
        let casesCount = await this.casesCount();
        for (let i = 1; i <= casesCount; i++) {
            let usersCountInCase = await this.getUsersCount(i);
            for (let userCounter = 1; userCounter <= usersCountInCase; userCounter++) {
                let userActionLabel = await this.getActionStatusLabelForUser(i, userCounter);
                if (userActionLabel.toLowerCase().includes("remove")) {
                    return true;
                }

            } 
           
        }
        return false;
    }

    async clickRemoveForAUserInListedCases(){
        let casesCount = await this.casesCount();
        for (let caseCounter = 1; caseCounter <= casesCount; caseCounter++) {
            let usersCountInCase = await this.getUsersCount(caseCounter);
            for (let userCounter = 1; userCounter <= usersCountInCase; userCounter++ ){
                let actionLinktext = await this.getActionLinkTextForUser(caseCounter, userCounter);
                if (actionLinktext.toLowerCase().includes("remove")){

                    if(!(await this.isCaseContentDisplayed(caseCounter))){
                        CucumberReportLog.AddMessage("Expanding Case at pos " + caseCounter);
                        await this.clickCaseDetailsExpandCollapseBtn(caseCounter);
                    }
                    CucumberReportLog.AddMessage("Click Remove link for  case pos" + caseCounter + " user pos " + userCounter);
                    await this.clickActionLinkForUser(caseCounter, userCounter);
                    return;
                }
 
            }     
        }
        throw Error("No cases have cases already shared or not marked to be removed. Cannot proceed with scenario."); 
    }

    async validateShareCaseChangesPersisted(){
        CucumberReportLog.AddMessage("Validating expected test data changes");

        let casesCount = await this.casesCount();
        let issuesList = [];
        for (let caseCounter = 1; caseCounter <= casesCount; caseCounter++) {
            let caseId = await this.getCaseSubtitle(caseCounter);
            let caseShareData = ShareCaseData.getCaseWithId(caseId);
            CucumberReportLog.AddJson(caseShareData);
 
            for (let shareWithCounter = 0; shareWithCounter < caseShareData.sharedWith.length ; shareWithCounter++){
                let email = caseShareData.sharedWith[shareWithCounter];
                if(!(await this.isUserWithEmailListedInCase(caseCounter,email))){
                    issuesList.push(email + "already shared user is not listed for in case " + caseId);
                } 
            }
            
            for (let shareWithCounter = 0; shareWithCounter < caseShareData.markedForShare.length; shareWithCounter++) {
                let email = caseShareData.markedForShare[shareWithCounter];
                if (!(await this.isUserWithEmailMarkedToBeAdded(caseCounter, email))) {
                    issuesList.push(email + "marked for added in not persisted " + caseId);
                }
            }
            
            for (let shareWithCounter = 0; shareWithCounter < caseShareData.markedForUnShare.length; shareWithCounter++) {
                let email = caseShareData.markedForUnShare[shareWithCounter];
                if (!(await this.isUserWithEmailMarkedToBeRemoved(caseCounter, email))) {
                    issuesList.push(email + "marked to remove in not persisted " + caseId);
                }
            } 
        } 
        return issuesList;
    }

}

module.exports = ShareCasePage;