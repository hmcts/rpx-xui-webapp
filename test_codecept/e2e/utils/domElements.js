const { $, $$, elementByXpath, elementsByXpath, getSelectOptions, isPresent } = require('../../helpers/globals');

class Select{
  constructor(locatorType, selector) {
    this.locatorType = locatorType.toLowerCase();
    this.selector = selector;
  }

  get selectElement() {
    return this.locatorType === 'css'
      ? $(this.selector)
      : elementByXpath(this.selector);
  }

  get selectElementOptions() {
    return this.locatorType === 'css'
      ? $$(`${this.selector} option`)
      : elementsByXpath(`${this.selector}//option`);
  }

  async isDisplayed(){
    return await isPresent(this.selectElement) && await this.selectElement.isVisible();
  }

  async isEnabled() {
    return await this.selectElement.isEnabled();
  }

  async getOptions(){
    const options = await getSelectOptions(this.selectElement);

    return options;
  }

  async selectOption(optiontext){
    await this.selectElement.selectOption({ label: optiontext });
  }
}

class GovUKRadios{
  constructor(locatorType, selector) {
    this.locatorType = locatorType;
    this.selector = selector;
  }

  async isDisplayed() {
    const container = this.locatorType.toLowerCase() === 'css' ? $(`${this.selector}`) : elementByXpath(`${this.selector}`);

    return await isPresent(container);
  }

  async isEnabled(){
    const container = this.locatorType.toLowerCase() === 'css' ? $(`${this.selector}`) : elementByXpath(`${this.selector}`);

    return await container.isEnabled();
  }

  async getRadioOptions(){
    return this.getOptions();
  }

  async getOptions() {
    const labels = this.locatorType.toLowerCase() === 'css' ? $$(`${this.selector} .govuk-radios__item .govuk-radios__label`) : elementsByXpath(`${this.selector}//div[contains(@class,"govuk-radios__item")]//label`);

    const count = await labels.count();
    const options = [];
    for (let i = 0; i < count; i++) {
      const optionVal = await labels.nth(i).textContent();
      options.push(optionVal);
    }
    return options;
  }

  async selectOption(option){
    const labels = this.locatorType.toLowerCase() === 'css' ? $$(`${this.selector} .govuk-radios__item .govuk-radios__label`) : elementsByXpath(`${this.selector}//div[contains(@class,"govuk-radios__item")]//label`);
    const options = [];
    const count = await labels.count();
    for (let i = 0; i < count; i++) {
      const element = await labels.nth(i);
      const optionVal = await element.textContent();
      options.push(optionVal);
      if (optionVal.includes(option)){
        await element.click();
        return;
      }
    }
    throw new Error(`Radio option "${option}" not found in options "${options}"`);
  }
}

module.exports = { Select, GovUKRadios };

