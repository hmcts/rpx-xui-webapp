const path = require('path');
const { $, elementByXpath, isPresent } = require('../../../../helpers/globals');
const BrowserWaits = require('../../../support/customWaits');
const CaseManager = require('./CaseManager');

class CcdFields {
  constructor() {
    this.caseManager = new CaseManager();
  }

  get addressField ()        { return elementByXpath("//input[@name='postcode']"); }
  get findAddressBtn ()      { return elementByXpath("//button[contains(text(),'Find address')]"); }
  get selectAddressField ()  { return elementByXpath("//select[@name='address']"); }
  get firstOption ()         { return elementByXpath("//option[@value='1: Object']"); }

  get addNewBtn ()           { return elementByXpath("//button[contains(text(),'Add new')]"); }
  get docUploadField ()      { return $('input.form-control.bottom-30'); }
  get describeDocField ()    { return $('#uploadTheNoticeOfDecisionDocs_0_description'); }
  get uploadDone ()          { return elementByXpath("//ccd-write-document-field//span[contains(text(),'Uploading')]"); }


  async docUpload(){
    const fileToUpload = path.resolve(__dirname, '../../../documents/dummy.pdf');
    await this.docUploadField.fill(fileToUpload);
    await BrowserWaits.waitForSeconds(1);
    await BrowserWaits.waitForCondition(async () => {
      const isUploadDone = await isPresent(this.uploadDone);
      console.log('file upload status : ' + isUploadDone);
      await browser.sleep(5);
      return !isUploadDone;
    });
  }

  async docDescriptionField(){
    await this.describeDocField.fill('description');
  }

  async postcodeLookup(){
    await BrowserWaits.waitForSeconds(3);
    await this.addressField.fill('n1');
    await this.findAddressBtn.click();
    await BrowserWaits.waitForSeconds(3);
    await this.firstOption.click();
  }
}

module.exports = CcdFields;
