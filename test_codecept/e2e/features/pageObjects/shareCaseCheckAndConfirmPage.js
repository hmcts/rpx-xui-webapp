const CucumberReportLog = require('../../../codeceptCommon/reportLogger');
const { $, $$ } = require('../../../helpers/globals');
const BrowserWaits = require('../../support/customWaits');

const ShareCaseData = require('../../utils/shareCaseData');
class ShareCaseCheckAndConfirmPage {
  get pageContainer() { return $('xuilib-share-case-confirm'); }
  get summarySelectionContainer() { return $('#summarySections'); }

  get selectedCaseConfirmList() { return $$('xuilib-selected-case-confirm #user-access-block'); }
  get backLink() { return $('.govuk-back-link'); }
  get confirmBtn() { return $('#share-case-nav button'); }

  get changesSubmissionConfirmationContainer() { return $('.govuk-panel--confirmation'); }

  async waitForPageToLoad() {
    await BrowserWaits.waitForElement(this.pageContainer, 'Share Case Conform your selection page not displayed.');
    await BrowserWaits.waitForElement(this.summarySelectionContainer, 'Share Case confirm selection summary not displayed');
  }

  async amOnPage() {
    await this.waitForPageToLoad();
    return await this.pageContainer.isVisible();
  }

  async getCaseIdOfCaseContainer(containerIndex) {
    const caseContainer = await this.selectedCaseConfirmList.nth(containerIndex);
    if (!caseContainer) {
      throw Error('no Case at position ' + containerIndex);
    }
    await BrowserWaits.waitForElement(caseContainer.locator('.case-share-confirm__caption-area .case-share-confirm__caption'), 'case sub title not displayed for case at pos ' + containerIndex);
    const caseId = await caseContainer.locator('.case-share-confirm__caption-area .case-share-confirm__caption').textContent();
    return caseId;
  }

  async getcaseContainerWithId(caseid) {
    const casesCount = await this.selectedCaseConfirmList.count();
    for (let caseCounter = 0; caseCounter < casesCount; caseCounter++) {
      const caseContainer = await this.selectedCaseConfirmList.nth(caseCounter);
      await BrowserWaits.waitForElement(caseContainer.locator('.case-share-confirm__caption-area .case-share-confirm__caption'), 'case sub title not displayed for case at pos ' + caseCounter);
      const caseId = await caseContainer.locator('.case-share-confirm__caption-area .case-share-confirm__caption').textContent();
      if (caseId.includes(caseid)) {
        return caseContainer;
      }
    }
    return null;
  }

  async getUserActionForCaseId(caseId, email) {
    const caseContainer = await this.getcaseContainerWithId(caseId);
    const userRows = caseContainer.locator('tbody tr');
    const usersCount = await userRows.count();
    for (let userCounter = 0; userCounter < usersCount; userCounter++) {
      const userRow = await userRows.nth(userCounter);
      const userEmail = await userRow.locator('td:nth-of-type(2)').textContent();
      if (userEmail.includes(email)) {
        return await userRow.locator('td:nth-of-type(3)').textContent();
      }
    }
    return null;
  }

  async isUserMarkedToBeRemovedIncase(caseId, email) {
    const userActionStatus = await this.getUserActionForCaseId(caseId, email);
    return userActionStatus ? userActionStatus.toLowerCase().includes('remove') : false;
  }

  async isUserMarkedToBeAddedIncase(caseId, email) {
    const userActionStatus = await this.getUserActionForCaseId(caseId, email);
    return userActionStatus ? userActionStatus.toLowerCase().includes('added') : false;
  }

  async validateShareCaseChangesForListedCases() {
    const casesCount = await this.selectedCaseConfirmList.count();
    const issuesList = [];
    for (let caseCounter = 0; caseCounter < casesCount; caseCounter++) {
      const caseid = await this.getCaseIdOfCaseContainer(caseCounter);
      const caseShareData = ShareCaseData.getCaseWithId(caseid);

      for (let shareWithCounter = 0; shareWithCounter < caseShareData.markedForShare.length; shareWithCounter++) {
        const email = caseShareData.markedForShare[shareWithCounter];
        if (!(await this.isUserMarkedToBeAddedIncase(caseid, email))) {
          issuesList.push(email + 'marked for added in not persisted ' + caseId);
        }
      }

      for (let shareWithCounter = 0; shareWithCounter < caseShareData.markedForUnShare.length; shareWithCounter++) {
        const email = caseShareData.markedForUnShare[shareWithCounter];
        if (!(await this.isUserMarkedToBeRemovedIncase(caseid, email))) {
          issuesList.push(email + 'marked to remove in not persisted ' + caseId);
        }
      }
    }
    CucumberReportLog.AddScreenshot(screenShotUtils);
    return issuesList;
  }

  async clickBack() {
    await this.backLink.click();
  }

  async clickChangeLinkForCase(caseNum) {
    const caseContainer = await this.getcaseContainerWithId(caseNum);
    await caseContainer.locator('a').click();
  }

  async clickConfirmBtn() {
    await this.confirmBtn.click();
    ShareCaseData.changesCommited();
  }

  async isSubmissionSuccessful() {
    await BrowserWaits.waitForElement(this.changesSubmissionConfirmationContainer);
    const message = await this.changesSubmissionConfirmationContainer.textContent();
    return message.includes('Your cases have been updated');
  }
}

module.exports = ShareCaseCheckAndConfirmPage;
