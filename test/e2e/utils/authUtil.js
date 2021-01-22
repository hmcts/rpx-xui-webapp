const puppeteer = require('puppeteer');
const config = require('./config/config');

class Auth {

    constructor() {
        this.authCookiesForUsers = {};

    }

    async getSessionCookieString(username, password) {

        if (!this.authCookiesForUsers.hasOwnProperty(username)) {
            this.authCookiesForUsers[username] = await this.authenticateAndGetcookies(username, password);
        }
        let cookieString = '';
        for (const cookie of this.authCookiesForUsers[username]) {
            // console.log(`${cookie.name} : ${cookie.value}`);
            cookieString = `${cookieString}${cookie.name}=${cookie.value};`;
        }
        return cookieString;
    }

    async getXSRFToken(username, password) {
        if (!this.authCookiesForUsers.hasOwnProperty(username)) {
            this.authCookiesForUsers[username] = await this.authenticateAndGetcookies(username, password);
        }
        let xsrfToken = '';
        for (const cookie of this.authCookiesForUsers[username]) {
            // console.log(cookie.name);
            if (cookie.name === 'XSRF-TOKEN') {
                xsrfToken = cookie.value;
                break;
            }
        }
        return xsrfToken;
    }

    async getUserId(username, password) {
        if (!this.authCookiesForUsers.hasOwnProperty(username)) {
            this.authCookiesForUsers[username] = await this.authenticateAndGetcookies(username, password);
        }
        let userid = '';
        for (const cookie of this.authCookiesForUsers[username]) {
            // console.log(cookie.name);
            if (cookie.name === '__userid__') {
                userid = cookie.value;
                break;
            }
        }
        return userid;
    }




    async authenticateAndGetcookies(username, password) {
        const browser = await puppeteer.launch(this.getPuppeteerLaunchOptions());

        const page = await browser.newPage();
        await page.goto(config.getBaseUrl());
        try {
            await page.waitForSelector('#username', { visible: true });

            await page.type('#username', username);
            await page.type('#password', password);

            await page.click('.button');;
            await page.waitForSelector('.hmcts-primary-navigation', { visible: true });
        } catch (error) {
            await browser.close();
            throw error;
        }
        const cookies = await page.cookies();
        await browser.close();
        return cookies;
    };

    getPuppeteerLaunchOptions() {
        const puppeteerOption = { ignoreHTTPSErrors: true, headless: true, args: [] };
        if (!config.getBaseUrl().includes('manage-case.')) {
            puppeteerOption.args.push('--proxy-server=http://proxyout.reform.hmcts.net:8080');
        }

        return puppeteerOption;
    }

}

module.exports = new Auth(); 
