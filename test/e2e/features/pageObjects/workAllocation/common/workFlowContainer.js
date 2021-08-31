
const BrowserWaits = require("../../../../support/customWaits");

class WorkFlowContainer{
    constructor(workflowLocator) {
        this.container = workflowLocator;
        this.backLink = this.container.$('a.govuk-back-link');
        this.continueButton = this.container.$('.govuk-button-group button , button.govuk-button[type="submit"]');
        this.cancelLink = this.container.$('.govuk-button-group p>a,#main-content p>a');

    }


    async isDisplayed() {
        return await this.container.isPresent();
    }

    async waitForPage() {
        await BrowserWaits.waitForElement(this.container);
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
