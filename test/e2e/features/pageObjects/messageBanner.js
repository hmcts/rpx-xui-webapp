
const BrowserWaits = require('../../support/customWaits');
var cucumberReporter = require('../../support/reportLogger');

class MessageBanner{


    constructor(parentCssLocator) {
        this.parentCssLocator = parentCssLocator;
        this.bannerMessageContainer = $(`exui-info-message .hmcts-banner, exui-alert .hmcts-banner `)
        this.infoMessages = $$(`exui-info-message .hmcts-banner__message , exui-alert .hmcts-banner__message `);
    }

    async isBannerMessageDisplayed() {
       
        try {
            if (this.parentCssLocator) {
                await BrowserWaits.waitForElement($(this.parentCssLocator));
            }
            await BrowserWaits.waitForElement(this.bannerMessageContainer,5000);
            return true;
        } catch (err) {
            cucumberReporter.AddMessage("message banner not displayed: " + err);
            return false;
        }
    }

    async getBannerMessagesDisplayed() {
       
        expect(await this.isBannerMessageDisplayed(), "Message banner not displayed").to.be.true;
        const messagescount = await this.infoMessages.count();
        const messages = [];
        for (let i = 0; i < messagescount; i++) {
            const message = await this.infoMessages.get(i).getText();

            const submessagestrings = message.split("\n");
            messages.push(...submessagestrings);
        }
        return messages;
    }

}

module.exports = MessageBanner;