
class Select{
    constructor(locatorType, selector){
        this.selectElement = locatorType.toLowerCase() === 'css' ? $(selector) : element(by.xpath(selector));
        this.selectElementOptions = locatorType.toLowerCase() === 'css' ? $$(`${selector} option`) : element.all(by.xpath(`${selector}//option`))
        
    }

    async isDisplayed(){
        return await this.selectElement.isPresent();
    }

    async isEnabled() {
        return await this.selectElement.isEnabled();
    }

    async getOptions(){
        const count = await this.selectElementOptions.count();
        const options = [];
        for(let i = 0; i < count;  i++){
            const optionVal = await this.selectElementOptions.get(i).getText();
            options.push(optionVal);
        }
        return options;
    }

    async selectOption(optiontext){
        const count = await this.selectElementOptions.count();
        for (let i = 0; i < count; i++) {
            const optionelement = await this.selectElementOptions.get(i);
            const optionVal = await optionelement.getText();
            if (optionVal.includes(optiontext)){
                await optionelement.click();
            }
        }
    }
}

class GovUKRadios{
    constructor(locatorType, selector) {
        this.locatorType = locatorType;
        this.selector = selector;
       
    }

    async isDisplayed() {
        const container = this.locatorType.toLowerCase() === 'css' ? $(`${this.selector}`) : element(by.xpath(`${selector}`));

        return await this.selectElement.isPresent();
    }

    async isEnabled(){
        const container = this.locatorType.toLowerCase() === 'css' ? $(`${this.selector}`) : element(by.xpath(`${selector}`));

        return await this.selectElement.isEnabled();
    }

    async getRadioOptions(){
        const labels = this.locatorType.toLowerCase() === 'css' ? $$(`${this.selector} .govuk-radios__item govuk-radios__label`) : element.all(by.xpath(`${selector}//div[contains(@class,"govuk-radios__item")//label]`));
    
        const count = await labels.count();
        const options = [];
        for (let i = 0; i < count; i++) {
            const optionVal = await labels.get(i).getText();
            options.push(optionVal);
        }
        return options;
    }

    async selectOption(option){
        const labels = this.locatorType.toLowerCase() === 'css' ? $$(`${this.selector} .govuk-radios__item govuk-radios__label`) : element(by.xpath(`${selector}//div[contains(@class,"govuk-radios__item")//label]`));

        const count = await labels.count();
        for (let i = 0; i < count; i++) {
            const element = await labels.get(i);
            const optionVal = await element.getText();
            if (optionVal.includes(option)){
                await element.click();
            }
        }
    }

}

module.exports = { Select, GovUKRadios }

