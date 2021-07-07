var EC = protractor.ExpectedConditions;
const CucumberReporter = require('./reportLogger');

class BrowserWaits{



    constructor(){
        this.waitTime = 30000; 
        this.pageErrors = $$(".error-summary");
    }

    setDefaultWaitTime(defaultWait){
        this.waitTime = defaultWait; 
 
    }

    async waitForSeconds(waitInSec){
        await browser.sleep(waitInSec*1000);
    }
   
    async waitForElementTime(element,waitTime) {
        await browser.wait(EC.presenceOf(element), waitTime ? waitTime :  10000, "Error : " + element.locator().toString());

    }

    async waitForElement(element,message){
        const startTime = Date.now();
        CucumberReporter.AddMessage("starting wait for element max in sec " + this.waitTime / 1000 + " : " + element.locator().toString());
        await browser.wait(EC.visibilityOf(element), this.waitTime,"Error : "+element.locator().toString() + " => "+message);
        CucumberReporter.AddMessage("wait done in sec " + (Date.now() - startTime ) / 1000); 

    }

    async waitForPresenceOfElement(element){
        await browser.wait(EC.presenceOf(element), this.waitTime, "Error : " + element.locator().toString());
    }

    async waitForElementClickable(element) {
        const startTime = Date.now();
        CucumberReporter.AddMessage("starting wait for element clickable max in sec " + this.waitTime / 1000 + " : " + element.locator().toString());
        await browser.wait(EC.elementToBeClickable(element), this.waitTime, "Error : " + element.locator().toString());
        CucumberReporter.AddMessage("wait done in sec " + (Date.now() - startTime) / 1000); 
    }

    async waitForCondition(condition){
        await this.waitForConditionAsync( condition, this.waitTime);
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
       
    
    async retryWithActionCallback( callback,actionMessage) {
        let retryCounter = 0;
        let isSuccess = false;
        let error = null;
        while (retryCounter < 3) {
            try {
                const retVal = await callback();
                isSuccess = true;
                return retVal;
            }
            catch (err) {
                error = err
                retryCounter += 1;
                CucumberReporter.AddMessage(`Actions success Condition ${actionMessage ? actionMessage : ''} failed ${err.message} ${err.stack}. `);
                CucumberReporter.AddMessage(`Retrying attempt ${retryCounter}. `); 
            }
        }
        if (!isSuccess){
            throw new Error("Action failed to meet success condition after 3 retry attempts.",error.stack);
        }
    }
}

module.exports =new  BrowserWaits(); 
