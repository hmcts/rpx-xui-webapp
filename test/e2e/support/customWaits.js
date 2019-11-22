var EC = protractor.ExpectedConditions;

class BrowserWaits{

    constructor(){
        this.waitTime = 20000; 
    }
    
    async waitForElement(element){
        await browser.wait(EC.visibilityOf(element), this.waitTime,"Error : "+element.locator().toString());
    }

    async waitForElementClickable(element) {
        await browser.wait(EC.elementToBeClickable(element), this.waitTime, "Error : " + element.locator().toString());
    }

    async waitForCondition(condition){
        await browser.wait(condition(), this.waitTime);
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
        await browser.wait(async () => {
            nextPage = await browser.getCurrentUrl();
            return currentPageUrl !== nextPage;
        }, this.waitTime)
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