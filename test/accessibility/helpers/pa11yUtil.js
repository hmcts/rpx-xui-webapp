

const pa11y = require('pa11y');
const assert = require('assert');
const { conf } = require('../config/config');

const jwt = require('jsonwebtoken');
const puppeteer = require('puppeteer');


const fs = require('fs');

let browser = null;
let page = null;
async function getBrowser(){

    if (browser === null){
        browser = await puppeteer.launch({
            ignoreHTTPSErrors: false,
            headless: conf.headless
        });
    }
    return browser;
}

async function getPage(){
    if(page === null){
        const testBrowser = await getBrowser();
        page = await testBrowser.newPage();
    }
     
    return page;
}

async function pa11ytest(test, actions, startUrl,roles) {
    console.log("pally test with actions : " + test.test.title);
    console.log(actions);

    let screenshotPath = process.env.PWD + "/" + conf.reportPath + 'assets/';
    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath, { recursive: true });
    }
    screenshotName = Date.now() + '.png';
    screenshotPath = screenshotPath + Date.now() + '.png';
    screenshotReportRef = 'assets/' + screenshotName;

    const startTime = Date.now();

    let token = jwt.sign({
        data: 'foobar'
    }, 'secret', { expiresIn: 60 * 60 });

    const encodedRoles = encodeURIComponent('j:["pui-case-manager"]')
    const cookies = [
        {
            name: '__auth__',
            value: token,
            domain: 'localhost:4200',
            path: '/',
            httpOnly: true,
            secure: false,
            session: true,
            sameSite: 'strict',
        },
        {
            name: 'roles',
            value: encodedRoles,
            domain: 'localhost:4200',
            path: '/',
            httpOnly: true,
            secure: false,
            session: true,
            sameSite: 'strict',
        }
    ];
    const testBrowser = await getBrowser();
    const page = await testBrowser.newPage();;
    await page.setCookie(...cookies);
    // await page.goto("http://localhost:4200/");


    let result;
    try {

        result = await pa11y(startUrl, {
            browser: testBrowser,
            page: page,
            timeout: 60000,
            screenCapture: screenshotPath,
            // log: {
            //     debug: console.log,
            //     error: console.error,
            //     info: console.info
            // },
            actions: actions
        })
    } catch (err) {
        await page.screenshot({ path: screenshotPath });
        const elapsedTime = Date.now() - startTime;
        result = {};
        result.executionTime = elapsedTime;
        result.screenshot = screenshotReportRef;
        test.a11yResult = result;
        console.log("Test Execution time : " + elapsedTime);
        console.log(err);
        await page.close();
        // await browser.close();
        throw err;

    }

    await page.close();
    // await browser.close();
    const elapsedTime = Date.now() - startTime;
    result.executionTime = elapsedTime;
    result.screenshot = screenshotReportRef;
    test.a11yResult = result;
    console.log("Test Execution time : " + elapsedTime);
    if (conf.failTestOna11yIssues) {
        assert(result.issues.length === 0, "a11y issues reported")
    }
    return result;

}



module.exports = { pa11ytest }
