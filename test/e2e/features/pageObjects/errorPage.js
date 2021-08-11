const BrowserWaits = require('../../support/customWaits');

const reportLogger = require('../../support/reportLogger');

class ErrorPage{

    constructor(){
        this.title = element(by.xpath("//main[@id='content']//h1[contains(text(),'Sorry')]"))
        this.tryAgainMessage = element(by.xpath("//p[contains(text(),'Try again later')]"))
    }

    async isErrorPageDisplayed(){
        try{
            await BrowserWaits.waitForElement(this.title);
            const headermessage = await this.title.getText();
            console.log('Error messge displayed : ' + headermessage);
            return headermessage.includes('Sorry'); 
        }catch(err){
            reportLogger.AddMessage("error page not displayed : "+err);
            return false;
        }
        
    }

    async getErrorMessage(){
        expect(await this.isErrorPageDisplayed(), "Not on error page").to.be.true;
        await BrowserWaits.waitForElement(this.title);
        return await this.title.getText();
    }

    async isTryAgainMsgDisplayed(){
        expect(await this.isErrorPageDisplayed(), "Not on error page").to.be.true;

        await BrowserWaits.waitForElement(this.title);
        try{
            await BrowserWaits.waitForElement(this.tryAgainMessage);
            return true;
        }
        catch(err){
            return false;
        }
    }

}

module.exports = new ErrorPage(); 
