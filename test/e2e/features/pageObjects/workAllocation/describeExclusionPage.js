

const BrowserWaits = require("../../../support/customWaits");
const exuiErrorMessage = require("../common/exuiErrorMessage");

class DescribeExclusionPage {

    constructor() {

        this.container = $("exui-describe-exclusion");

        this.headerCaption = this.container.$('h1 span');
        this.header = this.container.$('h1');

        this.textArea = this.container.$("#exclusion-description");


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
        return await this.headerCaption.getText();
    }

    async getHeaderText() {
        return await this.header.getText();
    }


    async enterExclusionDescription(description){
        await this.textArea.clear();
        await this.textArea.sendKeys(description);
    }

 

}

module.exports = new DescribeExclusionPage();
