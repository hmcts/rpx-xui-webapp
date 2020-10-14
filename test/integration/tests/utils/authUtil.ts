import * as puppeteer from 'puppeteer';
import {config} from '../config/config';
const authCookiesForUsers = {

};


export async function getHeaderWithCookies( username, password) {

    if (!authCookiesForUsers.hasOwnProperty(username)) {
        authCookiesForUsers[username] = await authenticateAndGetcookies(username, password);
    }
    let cookieString = '';
    for (const cookie of authCookiesForUsers[username] ) {
        // console.log(cookie);
        cookieString = `${cookieString}${cookie.name}=${cookie.value};`;
    }
    return { headers: { Cookie: cookieString}};
}

async function  authenticateAndGetcookies(username, password)  {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(config.baseUrl);
    await page.waitForSelector('#username', { visible: true });

    await page.type('#username', username);
    await page.type('#password', password);

    await page.click('.button');;
    await page.waitForSelector('.hmcts-primary-navigation', { visible: true });
    const cookies = await page.cookies();

    await browser.close();
    return cookies;
};