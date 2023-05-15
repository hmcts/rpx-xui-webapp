let CustomError = require('../../../utils/errors/custom-error.js');
let RandomUtils = require('../../../utils/euiDataGenerationUtils.js');


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
    let dropdownElements = await this._getOptionElements();
    let stringArray = [];
    for (const option of dropdownElements){
      const optionText = await option.getText();
      stringArray.push(optionText);
    }
    return stringArray
  }

  /**
   * Will select given value or randomly select any dropdown option if value not present
   */
  async selectAnOption(value){
    if (value) {
      await $(`${this._dropdownElement} option[value=${value}]`).click();
    } else {
      let options = await this._getOptionElements();
      let elementListSize = await options.length;
      let randomOptionArrayInt = await RandomUtils.generateRandomInt(1, await elementListSize);
      let optionToSelect = await options[randomOptionArrayInt-1];
      await optionToSelect.click();
    }
  }

  /**
   * Returns the value of the current option selected for a dropdown
   * @returns String
   */
  async getCurrentSelectedOption(){
    let text = await $(this._currentDropdownOptionElement).getText();
    return text.trim();
  }

  /**
   * Select a dropdown option by text value. Case insensitive
   * @param dropdownOption
   */
  async _selectFromDropdownByText(dropdownOption){
    let optionToSelect;
    let found = false;

    let options = await this._getOptionElements();
    let optionsTextArray = [];


    for (const option of options){
        const optionText = await option.getText();
        await optionsTextArray.push(optionText);
        if (optionText.trim().toLowerCase() === dropdownOption.trim().toLowerCase()){
           optionToSelect = option;
           found = true;
           break;
        }
    }
    if (!found){
      let message = `option '${dropdownOption}' not found in dropdown '${this._dropdownElement.toString()}'. Available options: ${optionsTextArray}`
      throw new CustomError(message)
    }

    await optionToSelect.click();
  }

  async _selectFromDropdownByIndex(dropdownIndex){
    let optionToSelect;
    let found = false;

    let options = await this._getOptionElements();
    let optionsTextArrayTemp = [];
    let optionsTextArray = [];

    for (const option of options){
      const optionText = await option.getText();
      await optionsTextArrayTemp.push(optionText);
    }

    for (const option of options){
      const optionText = await option.getText();
      await optionsTextArray.push(optionText);
      if (optionText.trim().toLowerCase() === optionsTextArrayTemp[dropdownIndex].trim().toLowerCase()){
        optionToSelect = option;
        found = true;
        break;
      }
    }


    if (!found){
      let message = `option '${dropdownIndex}' not found in dropdown '${this._dropdownElement.toString()}'. Available options: ${optionsTextArray}`
      throw new CustomError(message)
    }

    await optionToSelect.click();
  }

  /**
   * Check the the options exist and dropown is present
   * @returns {Promise<boolean|*>}
   */
  async isPresent(expectedTextsValues){
    let actualTextsValues = await this.getOptionsTextValues();
    for (var i = actualTextsValues.length; i--;) {
      if(!expectedTextsValues.includes(actualTextsValues[i].trim()))
        return false;
    }
    return await $(this._dropdownElement).isPresent();
  }

  /**
   * Check the input tag is enabled
   * @returns {Promise<boolean|*>}
   */
  async isEnabled(){
    return await $(this._dropdownElement).isEnabled();
  }

  async waitForElementToBeInvisible(){
    // const EC = protractor.ExpectedConditions;

    try {
      await browser.wait(EC.invisibilityOf(await element(by.css(this._dropdownElement))), DEFAULT_TIMEOUT);
      return true;
    } catch (e) {
      let message = `timed out after ${DEFAULT_TIMEOUT} waiting for dropdown element ${element} to be invisible`;
      throw new CustomError(message, e);
    }
  }

  async waitForElementToBeVisible(){
    const EC = protractor.ExpectedConditions;

    try {
      await browser.wait(EC.visibilityOf($(this._dropdownElement)), DEFAULT_TIMEOUT);
      return true;
    } catch (e) {
      let message = `timed out after ${DEFAULT_TIMEOUT} waiting for dropdown element ${element} to be visible`;
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
        await browser.sleep(2 * i)
      }
    }

    if (fail){
      throw new CustomError(failmessage, 'failed 3 retry attempts')
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
        await browser.sleep(2 * i)
      }
    }

    if (fail){
      throw new CustomError(failmessage, 'failed 3 retry attempts')
    }
  }
}



module.exports = Dropdown;
