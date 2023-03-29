
const { LOG_LEVELS } = require('../../support/constants');
const BrowserWaits = require('../../support/customWaits');
var cucumberReporter = require('../../../codeceptCommon/reportLogger');
const ArrayUtil = require('../../utils/ArrayUtil');

class MessageBanner{


    constructor(parentCssLocator) {
        this.parentCssLocator = null;
        this.bannerMessageContainer = $(`.hmcts-banner`)

        this.sucessBanner = $('.hmcts-banner.hmcts-banner--success');
        this.errorBanner = $('.hmcts-banner.hmcts-banner--success');


        this.infoMessages = $$(`.hmcts-banner__message`);
    }

    async isBannerMessageDisplayed() {
       
        try {
            await this.bannerMessageContainer.wait()
            return true;
        } catch (err) {
            cucumberReporter.AddMessage("message banner not displayed: " + err, LOG_LEVELS.Error);
            return false;
        }
    }

    async getBannerMessagesDisplayed() {
        expect(await this.isBannerMessageDisplayed(), "Message banner not displayed").to.be.true;
        await this.bannerMessageContainer.isDisplayed()

        const messagescount = await this.infoMessages.count();
        const messages = [];
        for (let i = 0; i < messagescount; i++) {
            const message = await this.infoMessages.get(i).getText();

            const submessagestrings = message.split("\n");
            messages.push(...submessagestrings);
        }
        return messages;
    }

    async isMessageTextDisplayed(expectedMessage){
        const allMessages = await this.getBannerMessagesDisplayed();
        cucumberReporter.AddMessage(`Case details tasks tab banner messages : ${JSON.stringify(allMessages)}`,LOG_LEVELS.Info);
        const matchingMessages = await ArrayUtil.filter(allMessages,async (message) => {
            return message.includes(expectedMessage);
        });

        return matchingMessages.length > 0;
    }

}

module.exports = MessageBanner;