
const BrowserWaits = require("../../../../support/customWaits");

class WorkFlowContainer{
    constructor() {
        
        const continueButtons = [
            '.page .govuk-button-group button ',
            '.page .govuk-button-group button.govuk-button[type="submit"]',
            'exui-task-action-container button[type = "submit"]',
            'exui-task-container-assignment button[type = "submit"]',
            'exui-task-assignment-choose-role button[type="submit"]'
        ];

        const cancelLinks = [
            '.govuk-button-group p>a',
            '#main-content p>a',
            'exui-task-action-container p a#cancel-link',
            'exui-task-container-assignment p>a'
        ];

        this.container = $('.govuk-main-wrapper');
        this.backLink = $('a.govuk-back-link');
        this.continueButton = $(continueButtons.join());
        this.cancelLink = $(cancelLinks.join());

    }

    async isDisplayed(){
        return await this.container.isDisplayed();
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
