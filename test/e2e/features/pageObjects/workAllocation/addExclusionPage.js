

const ChooseRadioOptionComponent = require("../common/chooseRadioOptionComponent");
const exuiErrorMessage = require("../common/exuiErrorMessage");

const BrowserWaits = require("../../../support/customWaits");
class AddExclusionPage {

    constructor() {

        this.container = $("eexui-choose-person-role");
        this.chooseRadioOptionsComponent = new ChooseRadioOptionComponent(this.container);

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
        return await this.chooseRadioOptionsComponent.getHeaderCaption();
    }

    async getHeader() {
        return await this.chooseRadioOptionsComponent.getHeader();
    }

    async isRadioOptionDisplayed(radioLabel) {
        return await this.chooseRadioOptionsComponent.isRadioOptionPresent(radioLabel);
    }

    async isRadioOptionSelected(radioLabel) {
        return await this.chooseRadioOptionsComponent.isRadioOptionSelected(radioLabel);

    }

    async selectRadioOption(radioLabel) {
        await this.chooseRadioOptionsComponent.selectRadioOption(radioLabel);

    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickCancelLink() {
        await this.cancelLink.click();
    }


}

module.exports = new AddExclusionPage();
