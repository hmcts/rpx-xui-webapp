const { $, getText } = require('../../../../helpers/globals');
const BrowserWaits = require('../../../support/customWaits');
const CucumberReporter = require('../../../../codeceptCommon/reportLogger');

class ErrorPage{
  get serviceDownContainer() {
    return $('exui-service-down');
  }

  get unauthorisedContainer() {
    return $('exui-not-authorised');
  }

  get errorMessage() {
    return $('exui-service-down,exui-not-authorised');
  }

  async isServiceDownMessageDisplayed(){
    return this.isContainerDisplayed(this.serviceDownContainer);
  }

  async isUnathorisedMessageDIsplayed(){
    return this.isContainerDisplayed(this.unauthorisedContainer);
  }

  async isContainerDisplayed() {
    try {
      BrowserWaits.waitForElement(this.serviceDownContainer);
      return true;
    } catch (err) {
      CucumberReporter.AddMessage('container not displayed ' + err.stack);
      return false;
    }
  }

  async getServiceDownErrorMessage(){
    return await getText(this.serviceDownContainer);
  }

  async getUnauthorisedErrorMessage(){
    return await getText(this.unauthorisedContainer);
  }

  async getErrorMessage(){
    return await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.errorMessage);
      return getText(this.errorMessage);
    });
  }
}

module.exports = new ErrorPage();
