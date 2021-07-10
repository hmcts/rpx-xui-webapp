const BrowserWaits = require("../../../support/customWaits"); 
const CucumberReporter = require("../../../support/reportLogger");

class FindPersonPage{
    constructor(){
        this.findPersonContainer = $("exui-find-person");
        this.header = $("exui-find-person h1");
        this.headerCaption = $("exui-find-person h1 span");

        this.searchInput = $("exui-find-person #inputSelectPerson");
        this.searchInputHintText = $("exui-find-person .govuk-hint");

        this.continueButton = $("exui-work-allocation-home button[type = 'submit']");
        this.cancelLink = element(by.xpath("//exui-work-allocation-home//p/a[contains(text(),'Cancel')]"));

        this.searchResultsContainer = $(".cdk-overlay-container .mat-autocomplete-visible");

    }

    async amOnPage(){
       try{
           await BrowserWaits.waitForElement(this.findPersonContainer);
           return true;
       } catch(err){
           CucumberReporter.AddMessage(err.stack);
           return false;
        }
    }

    async validatePage(){
        const heaerText = await this.header.getText();
        const inputHintText = await this.searchInputHintText.getText();
        expect(heaerText.includes("Find the person")).to.be.true;
        expect(inputHintText.includes("Type the name of the person and select them.")).to.be.true;

    }

    async getHeaderText(){
        return await this.header.getText();
    }

    async getHeaderCaption(){
        return await this.headerCaption.getText();
    }

    async clickContinueButton(){
        expect(await this.amOnPage(),"Not on find person page").to.be.true;
        await this.continueButton.click();
    }

    async clickCancelLink() {
        expect(await this.amOnPage(), "Not on find person page").to.be.true;
        await this.cancelLink.click();
    }

    async inputSearchTerm(searchTerm){
        await this.searchInput.clear();
        await this.searchInput.sendKeys(searchTerm);
    }

    async isSearchResultSelectionContainerDisplayed(){
        try{
            await BrowserWaits.waitForConditionAsync(async () => await this.searchResultsContainer.isDisplayed(),5000);
            return true;
        } 
        catch(err){
            CucumberReporter.AddMessage(err.stack);
            return false;
        }
    }

    async getPersonsReturned(){
        const results = this.searchResultsContainer.$(".mat-option-text");
        const resultCount = await results.count();
        const resulttexts = [];
        for(let i = 0; i < resultCount; i++){
            const resultItem = await results.get(i);
            resulttexts.push(await resultItem.getText());
        }
        return resulttexts;
    }

    getResultElementWithText(resulttext){
        return element(by.xpath(`//*[contains(@class,'cdk-overlay-container')]//*[contains(@class,'mat-autocomplete-visible')]//mat-option//*[contains(@class,'mat-option-text') and contains(text(),'${resulttext}')]`));
    }

    async isPersonDisplayed(result){
        const resultElement = this.getResultElementWithText(result);
        return await resultElement.isPresent() && resultElement.isDisplayed()

    }

    async selectPerson(result){
        expect(await this.isPersonDisplayed(result),'Result is not found').to.be.true;
        await this.getResultElementWithText(result).click();
    }

    async isPersonSelected(personText){
        const searchInputvalue = await this.searchInput.getAttribute("value");
        return searchInputvalue.includes(personText);
    }

}

module.exports = new FindPersonPage();
