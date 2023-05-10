
class Select{
    constructor(locatorType, selector){
        this.selectElement = locatorType.toLowerCase() === 'css' ? $(selector) : element(by.xpath(selector));
        this.selectElementOptions = locatorType.toLowerCase() === 'css' ? $$(`${selector} option`) : element.all(by.xpath(`${selector}//option`))
        
    }

    async isDisplayed(){
        return await this.selectElement.isPresent() && await this.selectElement.isDisplayed();
    }

    async isEnabled() {
        return await this.selectElement.isEnabled();
    }

    async getOptions(){
        const options = await this.selectElement.getSelectOptions();
     
        return options;
    }

    async selectOption(optiontext){
        await this.selectElement.selectOptionWithLabel(optiontext)
    }
}

class GovUKRadios{
    constructor(locatorType, selector) {
        this.locatorType = locatorType;
        this.selector = selector;
       
    }

    async isDisplayed() {
        const container = this.locatorType.toLowerCase() === 'css' ? $(`${this.selector}`) : element(by.xpath(`${this.selector}`));

        return await container.isPresent();
    }

    async isEnabled(){
        const container = this.locatorType.toLowerCase() === 'css' ? $(`${this.selector}`) : element(by.xpath(`${this.selector}`));

        return await containert.isEnabled();
    }

    async getRadioOptions(){
       
        return this.getOptions();
    }

    async getOptions() {
        const labels = this.locatorType.toLowerCase() === 'css' ? $$(`${this.selector} .govuk-radios__item .govuk-radios__label`) : element.all(by.xpath(`${this.selector}//div[contains(@class,"govuk-radios__item")]//label`));

        const count = await labels.count();
        const options = [];
        for (let i = 0; i < count; i++) {
            const optionVal = await labels.get(i).getText();
            options.push(optionVal);
        }
        return options;
    }


    async selectOption(option){
        const labels = this.locatorType.toLowerCase() === 'css' ? $$(`${this.selector} .govuk-radios__item .govuk-radios__label`) : element.all(by.xpath(`${this.selector}//div[contains(@class,"govuk-radios__item")]//label`));
        const options = [];
        const count = await labels.count();
        for (let i = 0; i < count; i++) {
            const element = await labels.get(i);
            const optionVal = await element.getText();
            options.push(optionVal);
            if (optionVal.includes(option)){
                await element.click();
                return;
            }
        }
        throw new Error(`Radio option "${option}" not found in options "${options}"`);
    }

}

module.exports = { Select, GovUKRadios }

