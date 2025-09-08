const { $, $$, elementByCss, getText, isPresent } = require('../../../../helpers/globals');
const CustomError = require('../../../utils/errors/custom-error.js');
const RandomUtils = require('../../../utils/euiDataGenerationUtils.js');

/**
 * Wrapper object to handle all interactions around dealing with a dropdown box. constructor takes locator in plain string
 */
const DEFAULT_TIMEOUT = 5000;
class Dropdown {
  /**
   * Should be parsed ccs 'select' tag for a dropdown
   * @param css
   */
  constructor(css){
    this._dropdownElement = css;
    this._currentDropdownOptionElement = `${css} option:checked`;
  }

  //private
  async _getOptionElements(){
    return await $$(`${this._dropdownElement} option`);
  }

  /**
   * Get list of string dropdown options
   * @returns String Array
   */
  async getOptionsTextValues(){
    const dropdownElements = await this._getOptionElements();
    const stringArray = [];
    for (const option of dropdownElements){
      const optionText = await getText(option);
      stringArray.push(optionText);
    }
    return stringArray;
  }

  /**
   * Will select given value or randomly select any dropdown option if value not present
   */
  async selectAnOption(value){
    if (value) {
      await $(`${this._dropdownElement} option[value=${value}]`).click();
    } else {
      const options = await this._getOptionElements();
      const elementListSize = await options.length;
      const randomOptionArrayInt = await RandomUtils.generateRandomInt(1, await elementListSize);
      const optionToSelect = await options[randomOptionArrayInt-1];
      await optionToSelect.click();
    }
  }

  /**
   * Returns the value of the current option selected for a dropdown
   * @returns String
   */
  async getCurrentSelectedOption(){
    const text = await getText($(this._currentDropdownOptionElement));
    return text.trim();
  }

  /**
   * Select a dropdown option by text value. Case insensitive
   * @param dropdownOption
   */
  async _selectFromDropdownByText(dropdownOption){
    let optionToSelect;
    let found = false;

    const options = await this._getOptionElements();
    const optionsTextArray = [];

    for (const option of options){
      const optionText = await getText(option);
      await optionsTextArray.push(optionText);
      if (optionText.trim().toLowerCase() === dropdownOption.trim().toLowerCase()){
        optionToSelect = option;
        found = true;
        break;
      }
    }
    if (!found){
      const message = `option '${dropdownOption}' not found in dropdown '${this._dropdownElement.toString()}'. Available options: ${optionsTextArray}`;
      throw new CustomError(message);
    }

    await optionToSelect.click();
  }

  async _selectFromDropdownByIndex(dropdownIndex){
    let optionToSelect;
    let found = false;

    const options = await this._getOptionElements();
    const optionsTextArrayTemp = [];
    const optionsTextArray = [];

    for (const option of options){
      const optionText = await getText(option);
      await optionsTextArrayTemp.push(optionText);
    }

    for (const option of options){
      const optionText = await getText(option);
      await optionsTextArray.push(optionText);
      if (optionText.trim().toLowerCase() === optionsTextArrayTemp[dropdownIndex].trim().toLowerCase()){
        optionToSelect = option;
        found = true;
        break;
      }
    }

    if (!found){
      const message = `option '${dropdownIndex}' not found in dropdown '${this._dropdownElement.toString()}'. Available options: ${optionsTextArray}`;
      throw new CustomError(message);
    }

    await optionToSelect.click();
  }

  /**
   * Check the the options exist and dropown is present
   * @returns {Promise<boolean|*>}
   */
  async isPresent(expectedTextsValues){
    const actualTextsValues = await this.getOptionsTextValues();
    for (let i = actualTextsValues.length; i--;) {
      if (!expectedTextsValues.includes(actualTextsValues[i].trim())) {
        return false;
      }
    }
    return await isPresent($(this._dropdownElement));
  }

  /**
   * Check the input tag is enabled
   * @returns {Promise<boolean|*>}
   */
  async isEnabled(){
    return await $(this._dropdownElement).isEnabled();
  }

  async waitForElementToBeInvisible(){

    try {
      await browser.wait(EC.invisibilityOf(await elementByCss(this._dropdownElement)), DEFAULT_TIMEOUT);
      return true;
    } catch (e) {
      const message = `timed out after ${DEFAULT_TIMEOUT} waiting for dropdown element ${element} to be invisible`;
      throw new CustomError(message, e);
    }
  }

  async waitForElementToBeVisible(page, timeout = DEFAULT_TIMEOUT) {
  try {
    const locator = page.locator(this._dropdownElement);
    await locator.waitFor({ state: 'visible', timeout });
    return true;
  } catch (e) {
    const message = `timed out after ${timeout}ms waiting for dropdown element "${this._dropdownElement}" to be visible`;
    throw new CustomError(message, e);
  }
}

  /**
   * Select a dropdown option by text value. Retry 2 more times if fails.
   * @param dropdownOption
   */
  async selectFromDropdownByText(dropdownOption){
    let fail = true;
    let failmessage = null;

    for (let i = 1; i < 4; i++){
      try {
        await this._selectFromDropdownByText(dropdownOption);
        fail = false;
        break;
      } catch (e) {
        failmessage = e;
        console.log(e);
        console.log(`Attempt ${i}/3 failed, Retry after wait`);
        await pause(2000 * i);
      }
    }

    if (fail){
      throw new CustomError(failmessage, 'failed 3 retry attempts');
    }
  }

  async selectFromDropdownByIndex(dropdownOption){
    let fail = true;
    let failmessage = null;

    for (let i = 1; i < 4; i++){
      try {
        await this._selectFromDropdownByIndex(dropdownOption);
        fail = false;
        break;
      } catch (e) {
        failmessage = e;
        console.log(e);
        console.log(`Attempt ${i}/3 failed, Retry after wait`);
        await pause(2000 * i);
      }
    }

    if (fail){
      throw new CustomError(failmessage, 'failed 3 retry attempts');
    }
  }
}

module.exports = Dropdown;
