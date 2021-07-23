

const BrowserWaits = require("../../../support/customWaits");
const exuiErrorMessage = require("../common/exuiErrorMessage");

class DescribeExclusionPage {

    constructor() {

        this.container = $("exui-describe-exclusion");

        this.headerCaption = this.container.$('h1 span');
        this.header = this.container.$('h1');

        this.textArea = this.container.$("#exclusion-description");

        this.continueButton = $("exui-exclusion-navigation button");

        this.cancelLink = $("exui-exclusion-navigation div>p>a");
        this.errorMessageSummary = exuiErrorMessage;

    }

    async isDisplayed() {
        try {
            await BrowserWaits.waitForElement(this.container);
            return true;
        } catch (err) {
            return false;
        }
    }

    async getHeaderCaption() {
        return await this.headerCaption.getHeaderCaption();
    }

    async getHeader() {
        return await this.header.getHeader();
    }


    async enterExclusionDescription(description){
        await this.textArea.sendKeys(description);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickCancelLink() {
        await this.cancelLink.click();
    }


}

module.exports = new DescribeExclusionPage();
