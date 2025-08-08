const { $, elementByXpath, getText } = require('../../../../helpers/globals');

const SpecificReviewPage = require('./reviewSARPage');
const SpecificAccessDurationSelectionPage = require('./durationSelectionPage');
const requestMoreInformationPage = require('./requestMoreInformationPage');

class SpecificAccessRequestWorkflow{
  constructor(){
    this.pages = {
      'Review specific access request': new SpecificReviewPage(),
      'How long do you want to give access to this case for?': new SpecificAccessDurationSelectionPage(),
      'Request more information': new requestMoreInformationPage()
    };
  }

  get continueBtn() {
    return elementByXpath("//button[contains(text(),'Continue')]");
  }

  get submitBtn() {
    return elementByXpath("//button[contains(text(),'Submit')]");
  }

  get errorBanner() {
    return $('.govuk-error-summary');
  }

  get SARSubmitSuccessPage() {
    return $('');
  }

  async isErrorMessageDisplayed(){
    return this.errorBanner.isVisible();
  }

  async getErrorMessageDisplayed(){
    return getText(this.errorBanner);
  }
}

module.exports = new SpecificAccessRequestWorkflow();
