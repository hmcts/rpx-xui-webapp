
const BrowserWaits = require('../../../support/customWaits');

class BrowserCookiesUtil{


    constructor(){
        this.acceptCookiesBtn = $("#cookie-accept-submit");
        this.rejectCookiesBtn = $("#cookie-reject-submit");

        this.hideMessageBtn = element(by.xpath('//header/div[@class=\'govuk-cookie-banner\']/div[1]/div[1]/div[1]/div[1]/p[3]/a[1]'));

    }

    async getCookie(cookieName){
        const allCookies = await browser.manage().getCookies();
        let expectedCookie = null;
        for (let i = 0; i < allCookies.length; i++){
            if(allCookies[i].name === cookieName){
                expectedCookie = allCookies[i];
                break;
            }
        }
        return expectedCookie;
    }

    async isCookiePresent(cookieName){
        const cookie = await this.getCookie(cookieName);
        return cookie !== null;
    }


    async acceptCookies() {
        await this.acceptCookiesBtn.click();
        await BrowserWaits.waitForElement(this.hideMessageBtn);
    }

    async rejectCookies() {
        await this.rejectCookiesBtn.click();
        await BrowserWaits.waitForElement(this.hideMessageBtn);
    }
}

module.exports = new BrowserCookiesUtil();

