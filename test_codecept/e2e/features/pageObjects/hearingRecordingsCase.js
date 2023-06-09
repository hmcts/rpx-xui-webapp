
var BrowserWaits = require("../../support/customWaits");

var BrowserUtil = require('../../../ngIntegration/util/browserUtil');
var CcdFields = require("./common/ccdFields");
const caseDetailsPage = require('../pageObjects/caseDetailsPage');
class HearingRecordingsCase {

    constructor() {
      this.ccdFields = new CcdFields();
      this.addNewBtn = element(by.xpath('//button[contains(text(),\'Add new\')]'));
      this.continueBtn = element(by.xpath('//button[contains(text(),\'Continue\')]'));
      this.submitBtn = element(by.xpath('//button[contains(text(),\'Submit\')]'));
      this.hearingFilesTabBtn = element(by.xpath('//div[contains(text(),\'Case Hearing Files\')]'));
      this.hearingFilesTabContainer = $('.mat-tab-body-content .CaseFiles');
      this.fileLink = element(by.xpath('//a[contains(text(),\'dummy.pdf\')]'));
      this.fileText = element(by.xpath('//span[contains(text(),\'Dumm\')]'));
    }

    async createCase() {
      await BrowserWaits.waitForSeconds(3);
      await BrowserWaits.retryWithActionCallback(async () => {
        await BrowserUtil.scrollToElement(this.addNewBtn);

        await this.addNewBtn.click();
        await BrowserWaits.waitForElement(this.ccdFields.docUploadField,5);

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
        expect(await caseDetailsPage.amOnPage()).to.be.true
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
      return await this.fileText.isPresent();
   }

}

module.exports = HearingRecordingsCase;
