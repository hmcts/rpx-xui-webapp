const cucumberReporter = require('../../../codeceptCommon/reportLogger');
const { $, $$ } = require('../../../helpers/globals');
const { LOG_LEVELS } = require('../../support/constants');
const ArrayUtil = require('../../utils/ArrayUtil');

class MessageBanner{
  constructor(parentCssLocator = null) {
    this.parentCssLocator = parentCssLocator;
  }

  get bannerMessageContainer() {
    return $('.hmcts-banner');
  }

  get successBanner() {
    return $('.hmcts-banner.hmcts-banner--success');
  }

  get errorBanner() {
    return $('.hmcts-banner.hmcts-banner--error');
  }

  get infoMessages() {
    return $$('.hmcts-banner__message');
  }

  async isBannerMessageDisplayed() {
    try {
      await this.bannerMessageContainer.wait();
      return true;
    } catch (err) {
      cucumberReporter.AddMessage('message banner not displayed: ' + err, LOG_LEVELS.Error);
      return false;
    }
  }

  async getBannerMessagesDisplayed() {
    expect(await this.isBannerMessageDisplayed(), 'Message banner not displayed').to.be.true;
    await this.bannerMessageContainer.isVisible();

    const messagescount = await this.infoMessages.count();
    const messages = [];
    for (let i = 0; i < messagescount; i++) {
      const message = await this.infoMessages.nth(i).textContent();

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
