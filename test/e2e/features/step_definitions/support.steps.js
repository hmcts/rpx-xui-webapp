

const BrowserWaits = require("../../support/customWaits");
const ArrayUtil = require("../../utils/ArrayUtil");
var { defineSupportCode } = require('cucumber');
const { browser } = require("protractor");

defineSupportCode(function ({ And, But, Given, Then, When }) {
   
    Given('I save current window handle reference {string}', async function(windowReference){
        global.scenarioData["window." + windowReference] = await browser.driver.getWindowHandle();
    });

    Given('I switch to new window opened', async function(){
        let retryCounter = 1;
        await BrowserWaits.retryWithActionCallback(async () => {
            await BrowserWaits.waitForSeconds(retryCounter * 2);
            retryCounter++;
            const unknownWindowHandles = await getUnknownWindowHandles();

            if (unknownWindowHandles.length > 1) {
                throw new Error("More than one unknown window handle found. Please reference any new windows opened or close them to keep tests clean. ");
            } else if (unknownWindowHandles.length === 0) {
                throw new Error("No new windows opened ");
            }
            await browser.switchTo().window(unknownWindowHandles[0]);
        });
        
    });

    async function getUnknownWindowHandles(){
        const scenarioDataKeys = Object.keys(global.scenarioData);
        const windowReferences = await ArrayUtil.filter(scenarioDataKeys,async (scrDataKey) => scrDataKey.includes('window.') );
        const knownWindowHandles = await ArrayUtil.map(windowReferences, async (windowRef) => { return global.scenarioData[windowRef]}); 
        const allWindowHandles = await browser.driver.getAllWindowHandles();
        const unKnownWindowHandles = await ArrayUtil.filter(allWindowHandles, async (handle) => !knownWindowHandles.includes(handle));
        return unKnownWindowHandles;
    }

});
