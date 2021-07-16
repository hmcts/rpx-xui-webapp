

const BrowserWaits = require('../../../support/customWaits');
const CucumberReporter = require('../../../support/reportLogger');

class ErrorPage{
    constructor() {
        this.serviceDownContainer = $('exui-service-down');
        this.unauthorisedContainer = $('exui-not-authorised');

        this.errorMessage = $('exui-service-down,exui-not-authorised');
    }

    async isServiceDownMessageDisplayed(){
        return this.isContainerDisplayed(this.serviceDownContainer);
    }

    async isUnathorisedMessageDIsplayed(){
        return this.isContainerDisplayed(this.unauthorisedContainer);
    }

    async isContainerDisplayed() {
        try {
            BrowserWaits.waitForElement(this.serviceDownContainer);
            return true;
        } catch (err) {
            CucumberReporter.AddMessage("container not displayed " + err.stack);
            return false;
        }
    }

    async getServiceDownErrorMessage(){
        return await this.serviceDownContainer.getText();
    }

    async getUnauthorisedErrorMessage(){
        return await this.unauthorisedContainer.getText();
    }

    async getErrorMessage(){
        return await BrowserWaits.retryWithActionCallback(async () => {
            await BrowserWaits.waitForElement(this.errorMessage);
            return this.errorMessage.getText();
        });
        
    }
}

module.exports = new ErrorPage();
