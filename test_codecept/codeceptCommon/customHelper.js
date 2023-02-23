const Helper = require('@codeceptjs/helper');

class CustomHelper extends Helper {

    // before/after hooks
    _before() {
       
    }

    _after() {
        // remove if not used
    }

    
    async getCookies(){
        const puppeteerPage = this._getHelper().page;
        const cookiesString = await puppeteerPage.evaluate(() => {
            return document.cookie
        })

        const cookies = cookiesString.split(';').map(cookie => {
            const nameValue = cookie.split("=")
            return { name: nameValue[0].trim(), value: nameValue[1].trim() }
        })
        return cookies;
    }
    
    _getHelper(){
        const { WebDriver, Puppeteer } = this.helpers;
        return Puppeteer;
    }

    getPuppeteerPage(){
        return this._getHelper().page;
    }





    executeScript(...args){

        const puppeteerPage = this._getHelper().page;
        return puppeteerPage.evaluate(...args);
    }

}

module.exports = CustomHelper;