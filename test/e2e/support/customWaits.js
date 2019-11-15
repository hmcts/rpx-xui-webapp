var EC = protractor.ExpectedConditions;

class BrowserWaits{

    async waitForElement(element){
        await browser.wait(EC.visibilityOf(element),30000);
    }

    async waitForElementClickable(element) {
        await browser.wait(EC.elementToBeClickable(element), 30000);
    }

     async waitForSelector(selector) {
        var selectorElement =  $(selector);
         await browser.wait(EC.presenceOf($(selector)), 30000);
    }

     async waitForstalenessOf(element){
        await browser.wait(EC.stalenessOf(element),30000);
    }
    
}

module.exports =new  BrowserWaits(); 