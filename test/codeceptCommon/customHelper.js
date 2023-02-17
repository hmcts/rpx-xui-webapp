const Helper = require('@codeceptjs/helper');

class CustomHelper extends Helper {

    // before/after hooks
    _before() {
        // remove if not used
    }

    _after() {
        // remove if not used
    }

    
    async getCookies(){
        const puppeteerPage = this._getBrowser().page;
        const cookiesString = await puppeteerPage.evaluate(() => {
            return document.cookie
        })

        const cookies = cookiesString.split(';').map(cookie => {
            const nameValue = cookie.split("=")
            return { name: nameValue[0].trim(), value: nameValue[1].trim() }
        })
        return cookies;
    }
    
    _getBrowser(){
        const { WebDriver, Puppeteer } = this.helpers;
        return Puppeteer;
    }

}

module.exports = CustomHelper;