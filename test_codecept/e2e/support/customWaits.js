// var EC = protractor.ExpectedConditions;


const CucumberReporter = require('../../codeceptCommon/reportLogger');
const BrowserLogs = require('./browserLogs');
class BrowserWaits{
    constructor(){
        this.waitTime = 30000; 
        this.pageErrors = $$(".error-summary");
        this.retriesCount = 3;

        this.logLevel = 'DEBUG'
    }

    setLoglevelINFO() {
        this.logLevel = 'INFO'
    }

    setDefaultWaitTime(defaultWait) {
        this.waitTime = defaultWait;

    }

    setRetryCount(count) {
        this.retriesCount = count;
    }

    async waitForSeconds(waitInSec) {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve();
            }, waitInSec*1000)
        })
    }

    async waitForElementTime(element, waitTime) {
        await browser.wait(EC.presenceOf(element), waitTime ? waitTime : 10000, "Error waitForElementTime : " + JSON.stringify(element.selector));

    }

    async waitForElement(element, message, waitForSeconds) {
        const startTime = Date.now();
        CucumberReporter.AddMessage("ELEMENT_WAITING: for " + this.waitTime / 1000 + " : " + JSON.stringify(element.selector));
        await element.wait(this.waitTime / 1000)
        // CucumberReporter.AddMessage("ELEMENT_FOUND: in sec " + (Date.now() - startTime) / 1000 + " "+ JSON.stringify(element.selector) );

    }

    async waitForPresenceOfElement(element) {
        await this.waitForElement(element);
    }

    async waitForElementClickable(element, waitInSec) {
        const startTime = Date.now();
        const waitTimeInMilliSec = waitInSec ? waitInSec * 1000 : this.waitTime;
        CucumberReporter.AddMessage("starting wait for element clickable max in sec " + waitTimeInMilliSec + " : " + JSON.stringify(element.selector));
        try {
            // await I.waitForElement(EC.elementToBeClickable(element), waitTimeInMilliSec, "Error waitForElementClickable : " + JSON.stringify(element.selector));
        } catch (err) {
            CucumberReporter.AddMessage(`Wait for element clikable failed ${JSON.stringify(element.selector) }, not throwing exception to let test fail in next step if required state not met`);
        }
        CucumberReporter.AddMessage("wait done in sec " + (Date.now() - startTime) / 1000);
    }

    async waitForCondition(condition, message) {
        await this.waitForConditionAsync(condition, this.waitTime, message);
    }

    async waitForConditionAsync(condition, waitInMillisec, waitMessage) {
        const waitForMillisec = waitInMillisec ? waitInMillisec : this.waitTime;
        await new Promise((resolve, reject) => {
            const conditionCheckInterval = setInterval(async () => {
                let isConditionMet = false;
                try {
                    isConditionMet = await condition();
                } catch (err) {
                    CucumberReporter.AddMessage("Error waiting for condition " + err);
                }
                if (isConditionMet) {
                    clearInterval(conditionCheckInterval);
                    resolve(true);
                }
            }, 500);

            setTimeout(() => {
                clearInterval(conditionCheckInterval);
                reject(new Error(`wait condition not satisfied after total wait time ${waitForMillisec} : ${waitMessage ? waitMessage : ''}`));
            }, waitForMillisec)
        });

    }

    async waitForSelector(selector) {
        var selectorElement = $(selector);
        await browser.wait(EC.presenceOf($(selector)), this.waitTime, "Error find element with selector: " + selector);
    }

    async waitForstalenessOf(element) {
        await browser.wait(EC.stalenessOf(element), this.waitTime);
    }

    async waitForPageNavigation(currentPageUrl) {
        var nextPage = "";
        let pageErrors = "";
        await this.retryWithActionCallback(async () => {
            nextPage = await browser.getCurrentUrl();

            for (let errorMsgCounter = 0; errorMsgCounter < this.pageErrors.length; errorMsgCounter++) {
                pageErrors = pageErrors + " | " + this.pageErrors[errorMsgCounter].getText();
            }

            return currentPageUrl !== nextPage;
        }, this.waitTime, "Navigation to next page taking too long " + this.waitTime + ". Current page " + currentPageUrl + ". Errors => " + pageErrors);
        return await browser.getCurrentUrl();
    }


    async waitForPageNavigationOnAction(callback) {
        const beforeActionUrl = await browser.getCurrentUrl();
        await callback();
        await this.waitForPageNavigation(beforeActionUrl);

        return await browser.getCurrentUrl();
    }


    async waitForBrowserReadyState(waitInSec) {
        let resolvedWaitTime = waitInSec ? waitInSec * 1000 : this.waitTime;

        CucumberReporter.AddMessage("Started step");
        await this.waitForCondition(async () => {
            let browserState = await browser.executeScript('return document.readyState;');
            CucumberReporter.AddMessage('browser readyState value  "' + browserState + '"');
            return browserState === 'complete';
        }, resolvedWaitTime);
    }

    async retryForPageLoad(element, callback) {
        let retryCounter = 0;

        while (retryCounter < 3) {
            try {
                await element.wait();
                retryCounter += 3;
            }
            catch (err) {
                retryCounter += 1;
                if (callback) {
                    callback(retryCounter + "");
                }
                console.log(element.selector + " .    Retry attempt for page load : " + retryCounter);

                await browser.refresh();

            }
        }
    }


    async retryWithActionCallback(callback, actionMessage, retryTryAttempts) {
        
        let e = new Error();
        let frame = e.stack.split("\n")[2]; // change to 3 for grandparent func
        let lineNumber = frame.split(":").reverse()[1];
        let functionName = frame.split(" ")[5];
       
        if (functionName.includes('/')){
            functionName = functionName.split('/').reverse()[0]
        }
        functionName + ":" + lineNumber  ;

        let retryCounter = 0;
        let isSuccess = false;
        let error = null;
        while (retryCounter <= this.retriesCount) {
            const waitSec = retryCounter * 2;
            if (retryCounter > 0){
                CucumberReporter.AddMessage(`ACTION_WARNING: retrying ${retryCounter} ${functionName}`);
            }
            await this.waitForSeconds(waitSec);

            try {
                const retVal = await callback();
                isSuccess = true;
                return retVal;
            }
            catch (err) {
                if (this.logLevel === 'DEBUG') {
                    await BrowserLogs.printBrowserLogs();
                }
                CucumberReporter.AddMessage(`Actions success Condition ${actionMessage ? actionMessage : ''} failed ${err.message} ${err.stack}. `);

                error = err
                console.log(err)
                const currentRoute = await browser.getCurrentUrl()
                if (currentRoute.includes('service-down')) {
                    throw new Error('Generic system error displayed: "Sorry, there is a problem with the service"');
                }

            }
            retryCounter += 1;

        }
        if (!isSuccess) {
            throw new Error(`ACTION_FAILURE: Action failed to meet success condition after ${this.retriesCount} retry attempts. ${ functionName }`, error);
        }
    }

    async waitForSpinnerToDissappear() {
        let status = true
        do{
            status = await $("div.spinner-container").isPresent();
        }
        while (status)
        
        // const isSpinnerPresent = await $("div.spinner-container").isPresent();

        // await this.waitForCondition(async () => {
        //     const isSpinnerPresent = await $("div.spinner-container").isPresent();
        //     CucumberReporter.AddMessage('Waiting for spinner to dissappear.');
        //     return !isSpinnerPresent;
        // }, 'Spinner is still displayed after waiting ');
    }
}

module.exports = new BrowserWaits(); 
