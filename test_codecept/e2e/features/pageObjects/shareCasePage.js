const CucumberReportLog = require('../../../codeceptCommon/reportLogger');
const { $, $$, isPresent } = require('../../../helpers/globals');
const { LOG_LEVELS } = require('../../support/constants');
const BrowserWaits = require('../../support/customWaits');
const ShareCaseData = require('../../utils/shareCaseData');

class ShareCasePage {
  constructor() {
    this.testData_lastSelectedUser = '';
    this.testData_lastAddedUser = '';
  }

  get backLink() { return $('.govuk-back-link'); }
  get shareCaseContainer() { return $('exui-case-share'); }
  get selectedCases() { return $$('xuilib-selected-case-list xuilib-selected-case'); }

  get continueButton() { return $('#share-case-nav button'); }
  get noCaseDisplay() { return $('#noCaseDisplay'); }

  get userEmailInput() { return $('#add-user xuilib-user-select .govuk-input'); }
  get userFilterContainer() { return $('.mat-autocomplete-panel'); }
  get userFilterList() { return $$('.mat-autocomplete-panel .mat-option-text'); }
  get addUserBtn() { return $('#btn-add-user'); }

  get openCloseAll() { return $('.govuk-accordion__open-all'); }

  async waitForPageToLoad() {
    await BrowserWaits.waitForElement(this.shareCaseContainer);
    await BrowserWaits.waitForCondition(async () => {
      return await this.selectedCases.count() > 0;
    });
    await BrowserWaits.waitForSeconds(2);
  }

  async amOnPage() {
    await this.waitForPageToLoad();
    await this.testData_storeCaseShareDataOnPage();
    return await isPresent(this.shareCaseContainer);
  }

  async testData_markUserWithEmailTobeAdded(email) {
    const casesCount = await this.casesCount();
    for (let caseCounter = 1; caseCounter <= casesCount; caseCounter++) {
      const caseId = await this.getCaseSubtitle(caseCounter);
      ShareCaseData.MarkUserToShare(caseId, email);
    }
  }

  async testData_storeCaseShareDataOnPage() {
    const casesCount = await this.casesCount();
    for (let caseCounter = 1; caseCounter <= casesCount; caseCounter++) {
      const caseId = await this.getCaseSubtitle(caseCounter);
      const sharedWith = [];
      const tobeAdded = [];
      const tobeRemoved = [];

      const usersCountInCase = await this.getUsersCount(caseCounter);
      for (let userCounter = 1; userCounter <= usersCountInCase; userCounter++) {
        const email = await this.getEmailForUserIncase(caseCounter, userCounter);
        const actionLinktext = await this.getActionLinkTextForUser(caseCounter, userCounter);
        if (actionLinktext === 'Cancel') {
          const actionStatusLabel = await this.getActionLabelForUserWithEmail(caseCounter, email);

          if (actionStatusLabel.includes('added')) {
            tobeAdded.push(email);
          } else {
            sharedWith.push(email);
            tobeRemoved.push(email);
          }
        } else {
          sharedWith.push(email);
        }
      }
      ShareCaseData.AddCaseShareData(caseId, sharedWith, tobeAdded, tobeRemoved);
      CucumberReportLog.AddJson(ShareCaseData.getCaseWithId(caseId));
    }
  }

  async clickBackLink() {
    await this.backLink.click();
  }

  async casesCount() {
    await this.waitForPageToLoad();
    return await this.selectedCases.count();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async enterUserEmailToSelect(emailText) {
    return await this.userEmailInput.fill(emailText);
  }

  async getUserEmailText(emailText) {
    return await this.userEmailInput.textContent();
  }

  async getFilteredUsersCount() {
    await BrowserWaits.waitForSeconds(2);
    return await this.userFilterList.count();
  }

  async getFilteredUserEmails() {
    const userEmails = [];
    const usernameEmails = await this.getFilteredUserNameEmails();
    for (let userCounter = 0; userCounter < usernameEmails.length; userCounter++) {
      const usernameEmailText = usernameEmails[userCounter];
      const userEmail = usernameEmailText.split('-')[1].trim();
      userEmails.push(userEmail);
    }
    return userEmails; s;
  }

  async getFilteredUserNameEmails() {
    const userNameEmails = [];
    const usersCount = await this.getFilteredUsersCount();
    for (let userCounter = 0; userCounter < usersCount; userCounter++) {
      const user = await this.userFilterList.nth(userCounter);
      const usernameEmailText = await user.textContent();
      userNameEmails.push(usernameEmailText);
    }
    CucumberReportLog.AddMessage('Filtered Users : ' + JSON.stringify(userNameEmails), LOG_LEVELS.Debug);
    return userNameEmails;
  }

  async selectUserFromFilteredList(userNum) {
    const userToSelect = await this.userFilterList.nth(userNum - 1);
    CucumberReportLog.AddMessage('Selected User : ' + await userToSelect.textContent(), LOG_LEVELS.Debug);
    await userToSelect.click();
  }

  async isAddButtonEnabled() {
    return await this.addUserBtn.isEnabled();
  }

  async clickAddUserbutton() {
    await this.addUserBtn.click();
    this.testData_lastAddedUser = this.testData_lastSelectedUser;
    this.testData_lastSelectedUser = '';
    CucumberReportLog.AddMessage('Click Add with user selected : ' + this.testData_lastAddedUser, LOG_LEVELS.Debug);
    await this.testData_markUserWithEmailTobeAdded(this.testData_lastAddedUser);
  }

  async getCaseTitle(caseNum) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    return await selectedCase.locator('.govuk-case-title').textContent();
  }

  async getCaseSubtitle(caseNum) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    return await selectedCase.locator('.govuk-case-sub-title').textContent();
  }

  async clickDeselectCase(caseNum) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    CucumberReportLog.AddMessage('Deselecting Case ' + await selectedCase.textContent(), LOG_LEVELS.Debug);
    await selectedCase.locator('#btn-deselect-case').click();

    await BrowserWaits.waitForCondition(async () => {
      return !(await isPresent(selectedCase));
    });
  }

  async clickCaseDetailsExpandCollapseBtn(caseNum) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    const button = await selectedCase.locator('.govuk-accordion__section-button');
    await BrowserWaits.waitForElement(button, 'Expand/collapse icon not present');
    await BrowserWaits.waitForSeconds(1);
    await browser.executeScript('arguments[0].scrollIntoView()',
      button);
    await button.click();
  }

  async isCaseContentDisplayed(caseNum) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    return await isPresent(selectedCase.locator('.govuk-accordion__section--expanded'));
  }

  async getUsersCount(caseNum) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    return await selectedCase.locator('tbody tr').count();
  }

  async getActionLinkForUser(caseNum, userNum) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    const user = await selectedCase.locator('tbody tr').nth(userNum - 1);
    return user.locator('a');
  }

  async getActionLinkTextForUser(caseNum, userNum) {
    const actionLink = await this.getActionLinkForUser(caseNum, userNum);
    const linkText = await browser.executeScript('return arguments[0].textContent',
      actionLink);
    return linkText;
  }

  async clickActionLinkForUser(caseNum, userNum) {
    const actionLink = await this.getActionLinkForUser(caseNum, userNum);

    const actionLinktext = await actionLink.textContent();
    const caseid = await this.getCaseSubtitle(caseNum);
    const userEmail = await this.getEmailForUserIncase(caseNum, userNum);
    const actionLinkLabel = await this.getActionLabelForUserWithEmail(caseNum, userEmail);

    await actionLink.click();

    if (actionLinktext === 'Remove') {
      ShareCaseData.MarkUserToUnShare(caseid, userEmail);
      CucumberReportLog.AddMessage(caseid + ' Case user uis marked for Unshare ' + userEmail);
      console.log('*********** Marking to Remove ' + caseid + ' : email ' + userEmail);
    } else if (actionLinkLabel.includes('added')) {
      ShareCaseData.CancelMarkedForShare(caseid, userEmail);
      CucumberReportLog.AddMessage(caseid + ' Case user uis marked for Share ' + userEmail);
      console.log('*********** Cancel to be Added ' + caseId + ' : email ' + userEmail);
    } else {
      ShareCaseData.CancelMarkedForUnShare(caseid, userEmail);
      CucumberReportLog.AddMessage(caseid + ' canceled Marked or Unshare ' + userEmail);
      console.log('*********** Cancel to be removed ' + caseId + ' : email ' + userEmail);
    }
  }

  async getEmailForUserIncase(caseNum, userNum) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    const userRow = await selectedCase.locator('tbody tr').nth(userNum - 1);
    const email = await browser.executeScript('return arguments[0].textContent',
      userRow.locator('td:nth-of-type(2)'));
    return email;
  }

  async getActionStatusLabelForUser(caseNum, userNum) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    const user = await selectedCase.locator('tbody tr').nth(userNum - 1);
    const actionLabelCol = user.locator('td:nth-of-type(4)');
    const actionLabel = await browser.executeScript('return arguments[0].textContent',
      actionLabelCol);
    return actionLabel;
  }

  async getUserRowInCase(caseNum, email) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    const users = selectedCase.locator('tbody tr');
    const userCount = await users.count();
    for (let user = 0; user < userCount; user++) {
      const userRow = await users.nth(user);

      const userEmail = await browser.executeScript('return arguments[0].textContent',
        userRow.locator('td:nth-of-type(2)'));

      if (userEmail === email) {
        return userRow;
      }
    }
    return null;
  }

  async isUserWithEmailListedInCase(caseNum, email) {
    const userRow = await this.getUserRowInCase(caseNum, email);
    return userRow !== null;
  }

  async isUserWithEmailMarkedToBeAdded(caseNum, email) {
    const userRow = await this.getUserRowInCase(caseNum, email);
    const actionLabel = await browser.executeScript('return arguments[0].textContent',
      userRow.locator('td:nth-of-type(4)'));
    return actionLabel.toLowerCase().includes('added');
  }

  async isUserWithEmailMarkedToBeRemoved(caseNum, email) {
    const userRow = await this.getUserRowInCase(caseNum, email);
    const actionLabel = await browser.executeScript('return arguments[0].textContent',
      userRow.locator('td:nth-of-type(4)'));
    return actionLabel.toLowerCase().includes('removed');
  }

  async getActionLabelForUserWithEmail(caseNum, email) {
    const selectedCase = await this.selectedCases.nth(caseNum - 1);
    const users = selectedCase.locator('tbody tr');
    const userCount = await users.count();
    for (let user = 0; user < userCount; user++) {
      const userRow = await users.nth(user);
      const userEmail = await browser.executeScript('return arguments[0].textContent',
        userRow.locator('td:nth-of-type(2)'));
      if (userEmail === email) {
        const actionLabel = await browser.executeScript('return arguments[0].textContent',
          userRow.locator('td:nth-of-type(4)'));
        return actionLabel;
      }
    }
    return 'user not listed';
  }

  async getMessageDisplayedInNoCasesDisplayed() {
    return await this.noCaseDisplay.textContent();
  }

  async clickOpenOrCloseAllLink() {
    await BrowserWaits.waitForElement(this.openCloseAll, 'OpenAll/CloaseAll button not present');
    await this.openCloseAll.click();
  }

  async getLinkTextForOpenOrCloseAlllink() {
    await BrowserWaits.waitForElement(this.openCloseAll, 'OpenAll/CloaseAll button not present');
    return await this.openCloseAll.textContent();
  }

  async isUserWithEmailNotSharedWithAtleastOneCase(email) {
    const totalCases = await this.casesCount();
    for (let i = 1; i <= totalCases; i++) {
      if (!(await this.isUserWithEmailListedInCase(i, email))) {
        return i;
      }
    }
    return 0;
  }

  async isUserWithEmailSharedWithAtleastOneCase(email) {
    const totalCases = await this.casesCount();
    for (let i = 1; i <= totalCases; i++) {
      if ((await this.isUserWithEmailListedInCase(i, email))) {
        return i;
      }
    }
    return 0;
  }

  async selectUserWithEmail_Not_SharedWithAtLeastOneCase() {
    const useremails = await this.getFilteredUserEmails();
    let userToSelect = 0;
    let email = '';
    for (let i = 0; i < useremails.length; i++) {
      email = useremails[i];
      const caseNum = await this.isUserWithEmailNotSharedWithAtleastOneCase(email);
      if (caseNum > 0) {
        userToSelect = i + 1;
        break;
      }
    }
    if (userToSelect > 0) {
      await this.selectUserFromFilteredList(userToSelect);
      this.testData_lastSelectedUser = email;
      CucumberReportLog.AddMessage('Selected a user not shared with any case : ' + email);
    } else {
      throw Error('AllUsers shared with all selected cases. cannot proceed with test step to select a user not shared with atleast one case');
    }
  }

  async selectUserWithEmail_SharedWithAtLeastOneCase() {
    const useremails = await this.getFilteredUserEmails();
    let userToSelect = 0;
    let email = '';
    for (let i = 0; i < useremails.length; i++) {
      email = useremails[i];
      const caseNum = await this.isUserWithEmailSharedWithAtleastOneCase(email);
      if (caseNum > 0) {
        userToSelect = i + 1;
        break;
      }
    }
    if (userToSelect > 0) {
      await this.selectUserFromFilteredList(userToSelect);
      this.testData_lastSelectedUser = email;
      CucumberReportLog.AddMessage('Selected a user  shared with atleast one case : ' + email);
    } else {
      throw Error('No user is list is shared with any case already. cannot proceed with test step to select a user not shared with atleast one case');
    }
  }

  async isLastAddedUserListedInAllCases() {
    const casesCount = await this.casesCount();
    for (let i = 1; i <= casesCount; i++) {
      if (!(await this.isUserWithEmailListedInCase(i, this.testData_lastAddedUser))) {
        return false;
      }
    }
    return true;
  }

  async isLastAddedUserMarkedTobeAddedInAnyCase() {
    const casesCount = await this.casesCount();
    for (let i = 1; i <= casesCount; i++) {
      if (await this.isUserWithEmailMarkedToBeAdded(i, this.testData_lastAddedUser)) {
        return true;
      }
    }
    return false;
  }

  async isAnyUserMarkedToBeRemoved() {
    const casesCount = await this.casesCount();
    for (let i = 1; i <= casesCount; i++) {
      const usersCountInCase = await this.getUsersCount(i);
      for (let userCounter = 1; userCounter <= usersCountInCase; userCounter++) {
        const userActionLabel = await this.getActionStatusLabelForUser(i, userCounter);
        if (userActionLabel.toLowerCase().includes('remove')) {
          return true;
        }
      }
    }
    return false;
  }

  async clickRemoveForAUserInListedCases() {
    const casesCount = await this.casesCount();
    for (let caseCounter = 1; caseCounter <= casesCount; caseCounter++) {
      const usersCountInCase = await this.getUsersCount(caseCounter);
      for (let userCounter = 1; userCounter <= usersCountInCase; userCounter++) {
        const actionLinktext = await this.getActionLinkTextForUser(caseCounter, userCounter);
        if (actionLinktext.toLowerCase().includes('remove')) {
          if (!(await this.isCaseContentDisplayed(caseCounter))) {
            CucumberReportLog.AddMessage('Expanding Case at pos ' + caseCounter);
            await this.clickCaseDetailsExpandCollapseBtn(caseCounter);
          }
          CucumberReportLog.AddMessage('Click Remove link for  case pos' + caseCounter + ' user pos ' + userCounter);
          await this.clickActionLinkForUser(caseCounter, userCounter);
          return;
        }
      }
    }
    throw Error('No cases have cases already shared or not marked to be removed. Cannot proceed with scenario.');
  }

  async validateShareCaseChangesPersisted() {
    const casesCount = await this.casesCount();
    const issuesList = [];
    for (let caseCounter = 1; caseCounter <= casesCount; caseCounter++) {
      const caseId = await this.getCaseSubtitle(caseCounter);
      const caseShareData = ShareCaseData.getCaseWithId(caseId);
      CucumberReportLog.AddJson(caseShareData);

      for (let shareWithCounter = 0; shareWithCounter < caseShareData.sharedWith.length; shareWithCounter++) {
        const email = caseShareData.sharedWith[shareWithCounter];
        if (!(await this.isUserWithEmailListedInCase(caseCounter, email))) {
          issuesList.push(email + 'already shared user is not listed for in case ' + caseId);
        }
      }

      for (let shareWithCounter = 0; shareWithCounter < caseShareData.markedForShare.length; shareWithCounter++) {
        const email = caseShareData.markedForShare[shareWithCounter];
        if (!(await this.isUserWithEmailMarkedToBeAdded(caseCounter, email))) {
          issuesList.push(email + 'marked for added in not persisted ' + caseId);
        }
      }

      for (let shareWithCounter = 0; shareWithCounter < caseShareData.markedForUnShare.length; shareWithCounter++) {
        const email = caseShareData.markedForUnShare[shareWithCounter];
        if (!(await this.isUserWithEmailMarkedToBeRemoved(caseCounter, email))) {
          issuesList.push(email + 'marked to remove in not persisted ' + caseId);
        }
      }
    }
    return issuesList;
  }
}

module.exports = ShareCasePage;
