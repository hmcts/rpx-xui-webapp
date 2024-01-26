const Helper = require('@codeceptjs/helper');

const codeceptMochawesomeLog = require('./reportLogger')


const browserErrorLogsExclusions = [
    'Unable to find Target Element',
    'JSHandle@object',
    'JSHandle@error',
    'dc.services.visualstudio.com/'
]

class CustomHelper extends Helper {

    // before/after hooks
    _before() {
        this.browserErrorLogs = [];

        this.pageOnListener = false;

    }

    _beforeStep() {
        // const page = this.getPuppeteerPage();

        // if (!this.pageOnListener && page){

        //     page.on('console', (msg) => {
        //         const type = msg.type();
        //         if (type === 'error') {
        //             // console.log(msg);
        //             // this.attachBrowserLog(msg)
        //             this.browserErrorLogs.push(msg)
        //         }
        //     });
        //     this.pageOnListener = true;
        // }
    }


    async _failed() {
        codeceptMochawesomeLog.AddMessage('---------------------- TEST FAILED ----------------------');
        await getActor().saveScreenshot()
        for (const log of this.browserErrorLogs) {
            this.attachBrowserLog(log)
              
        }

    }

    async flushLogsToReport() {
        codeceptMochawesomeLog.AddMessage('---------------------- BROWSER CONSOLE ERROR ----------------------');
        for (const log of this.browserErrorLogs) {
            this.attachBrowserLog(log)
            //    await getActor().saveScreenshot()
        }
        codeceptMochawesomeLog.AddMessage('------------------------------------------------------------------');

    }

    async attachBrowserLog(log) {
        if (log._type !== 'error') {
            return;
        }
        if (browserErrorLogsExclusions.filter(exclusion => log._text.includes(exclusion)).length > 0) {
            return;
        }

        codeceptMochawesomeLog.AddMessage(`Error: ${log._text}`);
        for (const stacktraceLocation of log._stackTraceLocations) {
            if (stacktraceLocation.url.endsWith('.js')) {
                continue;
            }
            codeceptMochawesomeLog.AddMessage(`       ${stacktraceLocation.url}:${stacktraceLocation.lineNumber}`);
        }

    }

    async getCookies() {
        const cookiesString = await actor().executeScript(function () {
            return document.cookie;
        })

        const cookies = cookiesString.split(';').map(cookie => {
            const nameValue = cookie.split("=")
            return { name: nameValue[0].trim(), value: nameValue[1].trim() }
        })
        return cookies;
    }

    _getHelper() {
        const { WebDriver, Puppeteer, Playwright } = this.helpers;
        return Playwright;
    }


    getPuppeteer() {
        return this._getHelper();
    }

    getPlaywrightPage() {
        return this.helpers.Playwright.page
    }

    getPuppeteerPage() {
        return this.helpers.Puppeteer.page;
    }

    async getTextUsingPlaywright(selector){
        const locator = this.getPlaywrightPage().locator(selector)
        const txt = await locator.first().textContent()
        return txt
    }

    async getAttributeUsingPlaywright(selector,name) {
        let locator = null;
        if(name === 'value'){
            locator = this.getPlaywrightPage().locator(selector).first()
            return await locator.inputValue()
        }else{
            locator  = this.getPlaywrightPage().locator(selector).first()
            return await locator.getAttribute(name)
        }
        
    }


    async isVisible(selector) {
        const helper = this._getHelper();
        try {
            const numVisible = await helper.grabNumberOfVisibleElements(selector);

            if (numVisible !== undefined) {
                return numVisible > 0
            }
        } catch (err) {
            return false
        }
    }





}

module.exports = CustomHelper;