const { $, elementByXpath, isPresent } = require('../../../helpers/globals');
const BrowserUtil = require('../../../ngIntegration/util/browserUtil');
const BrowserWaits = require('../../support/customWaits');
const caseDetailsPage = require('../pageObjects/caseDetailsPage');
const CcdFields = require('./common/ccdFields');

class HearingRecordingsCase {
  get ccdFields() { return new CcdFields(); }

  get addNewBtn() { return elementByXpath("//button[contains(text(),'Add new')]"); }
  get continueBtn() { return elementByXpath("//button[contains(text(),'Continue')]"); }
  get submitBtn() { return elementByXpath("//button[contains(text(),'Submit')]"); }

  get hearingFilesTabBtn() { return elementByXpath("//div[contains(text(),'Case Hearing Files')]"); }
  get hearingFilesTabContainer() { return $('.mat-tab-body-content .CaseFiles'); }

  get fileLink() { return elementByXpath("//a[contains(text(),'dummy.pdf')]"); }
  get fileText() { return elementByXpath("//span[contains(text(),'Dumm')]"); }

  async createCase() {
    await BrowserWaits.waitForSeconds(3);
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserUtil.scrollToElement(this.addNewBtn);

      await this.addNewBtn.click();
      await BrowserWaits.waitForElement(this.ccdFields.docUploadField, 5);
    });
    await BrowserWaits.waitForSeconds(3);
    await this.ccdFields.docUpload();
    await BrowserWaits.waitForSeconds(3);
    await BrowserUtil.scrollToElement(this.continueBtn);
    await this.continueBtn.click();
    await BrowserWaits.waitForPresenceOfElement(this.submitBtn);
    await BrowserWaits.waitForElementClickable(this.submitBtn);
    await BrowserWaits.retryWithActionCallback(async () => {
      await this.submitBtn.click();
      expect(await caseDetailsPage.amOnPage()).to.be.true;
    });
  }

  async hearingFilesTab() {
    await BrowserWaits.waitForPresenceOfElement(this.hearingFilesTabBtn);
    await this.hearingFilesTabBtn.click();
  }

  async clickFileLink() {
    await BrowserWaits.waitForSeconds(3);
    await this.fileLink.click();
  }

  async checkFile() {
    await BrowserWaits.waitForSeconds(5);
    return await isPresent(this.fileText);
  }
}

module.exports = HearingRecordingsCase;
