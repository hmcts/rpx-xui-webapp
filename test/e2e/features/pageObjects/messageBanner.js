
const { LOG_LEVELS } = require('../../support/constants');
const BrowserWaits = require('../../support/customWaits');
const cucumberReporter = require('../../support/reportLogger');
const ArrayUtil = require('../../utils/ArrayUtil');

class MessageBanner{
  constructor(parentCssLocator) {
    this.parentCssLocator = parentCssLocator;
    this.bannerMessageContainer = $('exui-info-message .hmcts-banner, exui-alert .hmcts-banner ');
    this.infoMessages = $$('exui-info-message .hmcts-banner__message , exui-alert .hmcts-banner__message ');
  }

  async isBannerMessageDisplayed() {
    try {
      if (this.parentCssLocator) {
        await BrowserWaits.waitForElement($(this.parentCssLocator));
      }
      await BrowserWaits.waitForElement(this.bannerMessageContainer, 5000);
      return true;
    } catch (err) {
      cucumberReporter.AddMessage('message banner not displayed: ' + err, LOG_LEVELS.Error);
      return false;
    }
  }

  async getBannerMessagesDisplayed() {
    expect(await this.isBannerMessageDisplayed(), 'Message banner not displayed').to.be.true;
    const messagescount = await this.infoMessages.count();
    const messages = [];
    for (let i = 0; i < messagescount; i++) {
      const message = await this.infoMessages.get(i).getText();

      const submessagestrings = message.split('\n');
      messages.push(...submessagestrings);
    }
    return messages;
  }

  async isMessageTextDisplayed(expectedMessage){
    const allMessages = await this.getBannerMessagesDisplayed();
    cucumberReporter.AddMessage(`Case details tasks tab banner messages : ${JSON.stringify(allMessages)}`, LOG_LEVELS.Info);
    const matchingMessages = await ArrayUtil.filter(allMessages, async (message) => {
      return message.includes(expectedMessage);
    });

    return matchingMessages.length > 0;
  }
}

module.exports = MessageBanner;
