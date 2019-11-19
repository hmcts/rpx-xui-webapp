var EC = protractor.ExpectedConditions;

class BrowserWaits{

    async waitForElement(element){
        await browser.wait(EC.visibilityOf(element), 30000,"Error : "+element.locator().toString());
    }

    async waitForElementClickable(element) {
        await browser.wait(EC.elementToBeClickable(element), 30000, "Error : " + element.locator().toString());
    }

    async waitForCondition(condition){
        await browser.wait(condition, 30000);
    }

     async waitForSelector(selector) {
        var selectorElement =  $(selector);
         await browser.wait(EC.presenceOf($(selector)), 30000, "Error find element with selector: " + selector);
    }

     async waitForstalenessOf(element){
        await browser.wait(EC.stalenessOf(element),30000);
    }

    async waitForPageNavigation(currentPageUrl) {
        var nextPage = "";
        await browser.wait(async () => {
            nextPage = await browser.getCurrentUrl();
            return currentPageUrl !== nextPage;
        }, 60000)
    }
    
}

module.exports =new  BrowserWaits(); 