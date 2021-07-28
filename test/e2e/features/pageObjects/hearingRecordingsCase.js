
var BrowserWaits = require("../../support/customWaits");
var CcdFields = require("./common/ccdFields");

class HearingRecordingsCase {

    constructor() {
      this.ccdFields = new CcdFields();
      this.addNewBtn = element(by.xpath('//button[contains(text(),\'Add new\')]'));
      this.continueBtn = element(by.xpath('//button[contains(text(),\'Continue\')]'));
      this.submitBtn = element(by.xpath('//button[contains(text(),\'Submit\')]'));
      this.hearingFilesTabBtn = element(by.xpath('//div[contains(text(),\'Case Hearing Files\')]'));
      this.fileLink = element(by.xpath('//a[contains(text(),\'dummy.pdf\')]'));
      this.fileText = element(by.xpath('//span[contains(text(),\'Dumm\')]'));
    }

    async createCase() {
      await BrowserWaits.waitForSeconds(3);
      await this.addNewBtn.click();
      await BrowserWaits.waitForSeconds(3);
      await this.ccdFields.docUpload();
      await BrowserWaits.waitForSeconds(3);
      await this.continueBtn.click();
      await BrowserWaits.waitForPresenceOfElement(this.submitBtn);
      await this.submitBtn.click();
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
      await BrowserWaits.waitForElement(this.fileText);
      return await this.fileText.isPresent();
   }

}

module.exports = HearingRecordingsCase;
