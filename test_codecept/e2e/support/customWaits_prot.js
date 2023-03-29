// var EC = protractor.ExpectedConditions;
const CucumberReporter = require('./reportLogger');
const BrowserLogs = require('./browserLogs');
class BrowserWaits{
    constructor(){
        this.waitTime = 45000; 
        this.pageErrors = $$(".error-summary");
        this.retriesCount = 3;

        this.logLevel = 'DEBUG'
    }

    setLoglevelINFO(){
        this.logLevel = 'INFO' 
    }

    setDefaultWaitTime(defaultWait){
        this.waitTime = defaultWait; 
 
    }

    setRetryCount(count){
        this.retriesCount = count; 
    }

    async waitForSeconds(waitInSec){
        await browser.sleep(waitInSec);
    }
   
    async waitForElementTime(element,waitTime) {
        await browser.wait(EC.presenceOf(element), waitTime ? waitTime : 10000, "Error waitForElementTime : " + element.locator().toString());

    }

    async waitForElement(element, message, waitForSeconds){
        const startTime = Date.now();
        CucumberReporter.AddMessage("starting wait for element max in sec " + this.waitTime / 1000 + " : " + element.locator().toString());
        await browser.wait(EC.visibilityOf(element), waitForSeconds ? waitForSeconds * 1000 : this.waitTime,"Error waitForElement : "+element.locator().toString() + " => "+message);
        CucumberReporter.AddMessage("wait done in sec " + (Date.now() - startTime ) / 1000); 

    }

    async waitForPresenceOfElement(element){
        await browser.wait(EC.presenceOf(element), this.waitTime, "Error waitForPresenceOfElement : " + element.locator().toString());
    }

    async waitForElementClickable(element, waitInSec) {
        const startTime = Date.now();
        const waitTimeInMilliSec = waitInSec ? waitInSec * 1000 : this.waitTime;
        CucumberReporter.AddMessage("starting wait for element clickable max in sec " + waitTimeInMilliSec+ " : " + element.locator().toString());
        try{
            await browser.wait(EC.elementToBeClickable(element), waitTimeInMilliSec, "Error waitForElementClickable : " + element.locator().toString());
        }catch(err){
            CucumberReporter.AddMessage(`Wait for element clikable failed ${element.locator().toString()}, not throwing exception to let test fail in next step if required state not met`);  
        }
        CucumberReporter.AddMessage("wait done in sec " + (Date.now() - startTime) / 1000); 
    }

    async waitForCondition(condition, message){
        await this.waitForConditionAsync(condition, this.waitTime, message);
    }

    async waitForConditionAsync(condition,waitInMillisec,waitMessage){
        const waitForMillisec = waitInMillisec ? waitInMillisec : this.waitTime;
        await new Promise((resolve,reject) => {
            const conditionCheckInterval = setInterval(async () => {
                let isConditionMet = false; 
                try{
                    isConditionMet = await condition();
                }catch(err){
                    CucumberReporter.AddMessage("Error waiting for condition " + err.stack); 
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
        var selectorElement =  $(selector);
         await browser.wait(EC.presenceOf($(selector)), this.waitTime, "Error find element with selector: " + selector);
    }

     async waitForstalenessOf(element){
         await browser.wait(EC.stalenessOf(element), this.waitTime);
    }

    async waitForPageNavigation(currentPageUrl) {
        var nextPage = "";
        let pageErrors = "";
        await browser.wait(async () => {
            nextPage = await browser.getCurrentUrl();

            for(let errorMsgCounter = 0; errorMsgCounter < this.pageErrors.length;errorMsgCounter++){
                pageErrors = pageErrors + " | "+ this.pageErrors[errorMsgCounter].getText(); 
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

    async retryForPageLoad(element,callback) {
        let retryCounter = 0;
        
        while (retryCounter < 3) {
            try {
                await this.waitForElement(element);
                retryCounter += 3;
            }
            catch (err) {
                retryCounter += 1;
                if (callback) {
                    callback(retryCounter + "");
                }
                console.log(element.locator().toString() + " .    Retry attempt for page load : " + retryCounter);

                await browser.refresh();
            
            }
        }
    }
       
    
    async retryWithActionCallback( callback,actionMessage,retryTryAttempts) {
        let retryCounter = 0;
        let isSuccess = false;
        let error = null;
        while (retryCounter <= this.retriesCount) {
            CucumberReporter.AddMessage(`Sleeping for ${retryCounter * 2}sec before performing action.`);  
            await this.waitForSeconds(retryCounter*2);

            try {
                const retVal = await callback();
                isSuccess = true;
                return retVal;
            }
            catch (err) {
                if (this.logLevel === 'DEBUG'){
                    await BrowserLogs.printBrowserLogs();
                }
                CucumberReporter.AddMessage(`Actions success Condition ${actionMessage ? actionMessage : ''} failed ${err.message} ${err.stack}. `);

                error = err
                
                const currentRoute = await browser.getCurrentUrl()
                if (currentRoute.includes('service-down')){
                    throw new Error('Generic system error displayed: "Sorry, there is a problem with the service"');
                }
               
            }
            retryCounter += 1;
            CucumberReporter.AddMessage(`************** [ Retrying attempt ${retryCounter}. ] **************`); 

        }
        if (!isSuccess){
            throw new Error(`Action failed to meet success condition after ${this.retriesCount} retry attempts.`,error.stack);
        }
    }

    async waitForSpinnerToDissappear(){
        await this.waitForCondition(async () => {
            const isSpinnerPresent = await $("div.spinner-container").isPresent();
            CucumberReporter.AddMessage('Waiting for spinner to dissappear.');
            return !isSpinnerPresent;
        }, 'Spinner is still displayed after waiting ');
    }
}

module.exports =new  BrowserWaits(); 
