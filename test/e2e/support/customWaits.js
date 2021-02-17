var EC = protractor.ExpectedConditions;
const CucumberReporter = require('./reportLogger');

class BrowserWaits{



    constructor(){
        this.waitTime = 30000; 
        this.pageErrors = $$(".error-summary");
    }

    async waitForSeconds(waitInSec){
        await browser.sleep(waitInSec*1000);
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
        await browser.wait( condition, this.waitTime);
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
    
}

module.exports =new  BrowserWaits(); 