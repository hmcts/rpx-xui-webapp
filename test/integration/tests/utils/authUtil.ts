import * as puppeteer from 'puppeteer';
import {config} from '../config/config';
import {reporterMsg} from './helper'
const authCookiesForUsers = {

};


export async function getSessionCookieString( username, password) {

    if (!authCookiesForUsers.hasOwnProperty(username)) {
        authCookiesForUsers[username] = await authenticateAndGetcookies(username, password);
    }
    let cookieString = '';
    for (const cookie of authCookiesForUsers[username] ) {
        // console.log(`${cookie.name} : ${cookie.value}`);
        cookieString = `${cookieString}${cookie.name}=${cookie.value};`;
    }
    return cookieString;
}

export async function getXSRFToken(username, password) {
    if (!authCookiesForUsers.hasOwnProperty(username)) {
        authCookiesForUsers[username] = await authenticateAndGetcookies(username, password);
    }
    let xsrfToken = '';
    for (const cookie of authCookiesForUsers[username]) {
        // console.log(cookie.name);
        if (cookie.name === 'XSRF-TOKEN') {
            xsrfToken = cookie.value;
            break;
        }
    }
    return xsrfToken;
}

export async function getUserId(username, password) {
    if (!authCookiesForUsers.hasOwnProperty(username)) {
        authCookiesForUsers[username] = await authenticateAndGetcookies(username, password);
    }
    let userid = '';
    for (const cookie of authCookiesForUsers[username]) {
        // console.log(cookie.name);
        if (cookie.name === '__userid__') {
            userid = cookie.value;
            break;
        }
    }
    return userid;
}




async function  authenticateAndGetcookies(username, password)  {

    const browser = await puppeteer.launch(getPuppeteerLaunchOptions());

    const page = await browser.newPage();
    await page.goto(config.baseUrl);
    try{
        await page.waitForSelector('#username', { visible: true });

        await page.type('#username', username);
        await page.type('#password', password);

        await page.click('.button');;
        await page.waitForSelector('.hmcts-primary-navigation', { visible: true });
    } catch (error) {
        reporterMsg(error);
        await browser.close();
        throw error;
    }
    const cookies = await page.cookies();

    await browser.close();
    return cookies;
};

function getPuppeteerLaunchOptions(){
    const puppeteerOption = { ignoreHTTPSErrors: true, headless: true, args: [] };
    if (!config.baseUrl.includes('manage-case.')) {
        puppeteerOption.args.push('--proxy-server=http://proxyout.reform.hmcts.net:8080');
    }

    return puppeteerOption;
}
