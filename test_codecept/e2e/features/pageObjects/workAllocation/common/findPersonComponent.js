const { LOG_LEVELS } = require("../../../../support/constants");
const BrowserWaits = require("../../../../support/customWaits"); 
const CucumberReporter = require("../../../../../codeceptCommon/reportLogger");
const exuiErrorMessage = require("../../common/exuiErrorMessage");


class FindPersonComponent{
    constructor(parentlocator){

        this.findPersonContainer = $("xuilib-find-person");
        this.header = $("xuilib-find-person h1");
        this.headerCaption = $("xuilib-find-person h1 span");

        this.searchInput = $("xuilib-find-person #inputSelectPerson");
        this.searchInputHintText = $("xuilib-find-person .govuk-hint");
        this.searchResultsContainer = $(".cdk-overlay-container .mat-autocomplete-visible");

    }

    async amOnPage(){
       try{
           await BrowserWaits.waitForElement(this.findPersonContainer);
           return true;
       } catch(err){
           CucumberReporter.AddMessage(err.stack, LOG_LEVELS.Error);
           return false;
        }
    }

    async isDisplayed(){
        return await this.amOnPage();
    }

    async validatePage(){
        const heaerText = await this.header.getText();
        const inputHintText = await this.searchInputHintText.getText();
        expect(heaerText.includes("Find the person")).to.be.true;
        expect(inputHintText.includes("Type the name of the person and select them.")).to.be.true;

    }

    async getHeaderText(){
        expect(await this.amOnPage(),'Not on find person page').to.be.true;
        return await this.header.getText();
    }

    async getHeaderCaption(){
        return await this.headerCaption.getText();
    }

    async inputSearchTerm(searchTerm){
        await this.amOnPage();
        await BrowserWaits.waitForElementClickable(this.searchInput,5);
        await this.searchInput.clear();
        await this.searchInput.sendKeys(searchTerm);
    }

    async isSearchResultSelectionContainerDisplayed(){
        try{
            await BrowserWaits.waitForConditionAsync(async () => await this.searchResultsContainer.isDisplayed(),5000);
            return true;
        } 
        catch(err){
            CucumberReporter.AddMessage(err.stack, LOG_LEVELS.Error);
            return false;
        }
    }

    async getPersonsReturned(){
        return await BrowserWaits.retryWithActionCallback(async () => {
            const results = this.searchResultsContainer.$$(".mat-option-text");
            const resultCount = await results.count();
            const resulttexts = [];
            for (let i = 0; i < resultCount; i++) {
                const resultItem = await results.get(i);
                resulttexts.push(await resultItem.getText());
            }
            return resulttexts;
        });
        
    }

    async getResultElementWithText(resulttext){
        const elementWithResulst = element(by.xpath(`//*[contains(@class,'cdk-overlay-container')]//*[contains(@class,'mat-autocomplete-visible')]`));
        await elementWithResulst.wait()
        CucumberReporter.AddMessage(await elementWithResulst.getText(), LOG_LEVELS.Debug)
        return element(by.xpath(`//*[contains(@class,'cdk-overlay-container')]//*[contains(@class,'mat-autocomplete-visible')]//mat-option//*[contains(@class,'mat-option-text') and contains(text(),'${resulttext}')]`));
    }

    async isPersonReturned(result){
        CucumberReporter.AddMessage(`Checking is person returned "${result}"`, LOG_LEVELS.Debug)

        const resultElement = await this.getResultElementWithText(result);
        return await resultElement.isPresent() && resultElement.isDisplayed()

    }

    async selectPerson(result){
        const resultElement = await this.getResultElementWithText(result);
        CucumberReporter.AddMessage(` Select person "${result}"`, LOG_LEVELS.Debug)
        await resultElement.wait();
        expect(await this.isPersonReturned(result), `Result is not found "${result}"`).to.be.true;
        await resultElement.click();
    }

    async isPersonSelected(personText){
        const searchInputvalue = await this.searchInput.getAttribute("value");
        return searchInputvalue.includes(personText);
    }

}

module.exports = FindPersonComponent;
