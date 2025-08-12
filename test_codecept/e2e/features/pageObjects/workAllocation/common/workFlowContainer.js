const { $, getText, isPresent } = require('../../../../../helpers/globals');

class WorkFlowContainer{
  get container() {
    return $('.govuk-main-wrapper');
  }

  get backLink() {
    return $('a.govuk-back-link');
  }

  get continueButton() {
    const continueButtons = [
      '.page .govuk-button-group button ',
      '.page .govuk-button-group button.govuk-button[type="submit"]',
      'exui-task-action-container button[type = "submit"]',
      'exui-task-container-assignment button[type = "submit"]',
      'exui-task-assignment-choose-role button[type="submit"]'
    ];
    return $(continueButtons.join());
  }

  get cancelLink() {
    const cancelLinks = [
      '.govuk-button-group p>a',
      '#main-content p>a',
      'exui-task-action-container p a#cancel-link',
      'exui-task-container-assignment p>a'
    ];
    return $(cancelLinks.join());
  }

  async isDisplayed(){
    return await this.container.isVisible();
  }

  async isContinueButtonDisplayed() {
    return await isPresent(this.continueButton) && await this.continueButton.isVisible();
  }

  async getContinueButtonLabel() {
    return await getText(this.continueButton);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async isCancelLinkDisplayed() {
    return await isPresent(this.cancelLink) && await this.cancelLink.isVisible();
  }

  async getCancelLinkLabel() {
    return await getText(this.cancelLink);
  }

  async clickCancelLink() {
    await this.cancelLink.click();
  }

  async isBackLinkDisplayed() {
    return await this.backLink.isPresent() && await this.backLink.isDisplayed();
  }

  async clickBackLink() {
    await this.backLink.click();
  }
}

module.exports = WorkFlowContainer;
