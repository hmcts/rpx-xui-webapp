
const BrowserWaits = require("../../../../support/customWaits");

class WorkFlowContainer{
    constructor() {
        this.container = $('.govuk-main-wrapper');
        this.backLink = $('a.govuk-back-link');
        this.continueButton = $('.page .govuk-button-group button , .page .govuk-button-group button.govuk-button[type="submit"]');
        this.cancelLink = $('.govuk-button-group p>a,#main-content p>a');

    }


    async isContinueButtonDisplayed() {
        return await this.continueButton.idPresent() && await this.continueButton.isDisplayed();
    }

    async getContinueButtonLabel() {
        return await this.continueButton.getText();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async isCancelLinkDisplayed() {
        return await this.cancelLink.isPresent() && await this.cancelLink.isDisplayed();
    }

    async getCancelLinkLabel() {
        return await this.cancelLink.getText();
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
