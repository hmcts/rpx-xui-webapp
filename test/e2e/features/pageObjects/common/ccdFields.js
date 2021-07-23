
var CaseManager = require("./CaseManager");
var BrowserWaits = require('../../../support/customWaits');
var path = require('path');

class CcdFields {

  constructor() {
    this.caseManager = new CaseManager();

    this.addressField = element(by.xpath('//input[@name=\'postcode\']'));
    this.findAddressBtn = element(by.xpath('//button[contains(text(),\'Find address\')]'));
    this.selectAddressField = element(by.xpath('//select[@name=\'address\']'));
    this.firstOption = element(by.xpath('//option[@value=\'1: Object\']'));


    this.addNewBtn = element(by.xpath('//button[contains(text(),\'Add new\')]'));
    this.docUploadField = element(by.xpath('//input[@class=\'form-control bottom-30\']'));
    this.describeDocField = $("#uploadTheNoticeOfDecisionDocs_0_description");

    this.uploadDone = element(by.xpath('span[contains(text(),"Uploading")]'));

  }

  async docUpload(){
    var fileToUpload = path.resolve(__dirname, "../../../documents/dummy.pdf");
    await this.docUploadField.sendKeys(fileToUpload);

    await BrowserWaits.waitForCondition(async () => {
      let isUploadDone = await this.uploadDone.isPresent();
      console.log("file upload status : " + isUploadDone);
      return !isUploadDone;
    });
  }

  async docDescriptionField(){
    await this.describeDocField.sendKeys('description');
  }

  async postcodeLookup(){
    await BrowserWaits.waitForSeconds(3);
    await this.addressField.sendKeys('n1');
    await this.findAddressBtn.click();
    await BrowserWaits.waitForSeconds(3);
    await this.firstOption.click();
  }
}

module.exports = CcdFields;
