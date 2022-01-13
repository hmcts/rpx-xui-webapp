const BrowserWaits = require('../../../support/customWaits');
class Application{
    constructor(){
        this.loadingSpinner = $(".loading-spinner-in-action");

    }

    async isSpinnerDisplayed(){
        return await this.loadingSpinner.isPresent();
    }


}

module.exports = Application;