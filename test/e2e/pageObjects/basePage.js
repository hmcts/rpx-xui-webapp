CustomError = require('../utils/errors/custom-error.js');

const DEFAULT_TIMEOUT = 30000;
const EC = protractor.ExpectedConditions;

class BasePage {


    constructor(locator) {
        if (locator != null){
            let EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(locator)), );
        }

        this._pageHeader= 'h1';

        this._formFields = 'ccd-case-edit-form > div > * > *';
        this._optionalClass = 'ng-valid';
        this._mandetoryClass = 'ng-invalid';
    }


  /**
   * Wait a designated amount of time for an element to be visible before timing out
   * and throwing an error
   * @param element to wait for
   * @param timeout - time to wait for element to be visible
   */
    async waitForElementToBeVisibleWithTimeout(element, timeout){
      try {
          await browser.wait(await EC.visibilityOf(element), timeout);
        } catch (e) {
          let message = `timed out after ${timeout} waiting for element`
          throw new CustomError(message, e)
        }
    }

    async waitForElementToBeVisible(element){
        await this.waitForElementToBeVisibleWithTimeout(element, DEFAULT_TIMEOUT);
    }

    async waitForElementToBeVisibleByLocator(locator){
      await this.waitForElementToBeVisibleWithTimeout(element(locator), DEFAULT_TIMEOUT);
    }

    async waitForUrl(expectedUrlRegex){
      let currentURL = await browser.getCurrentUrl();
      await browser.wait(EC.urlContains(expectedUrlRegex))
        .catch(err => console.log(`Failed to load page, Expected URL fragment: ${expectedUrlRegex} | Actual URL: ${currentURL}`));
    }

  /**
   * Checks if an element is displayed. Will catch a NoSuchElementError exception and return false instead
   * @param element
   * @returns Boolean
   */
    async elementDisplayed(element){
      let displayed = null;
        try {
            displayed = await element.isDisplayed();
        } catch (e) {
            if (e.name === 'NoSuchElementError'){
                displayed = false; //element not present so not displayed
            }
            else {
                throw new CustomError(e);
            }
        }

      return displayed
    }

  /**
   * Get page header title
   * @returns String
   */
  async getPageHeader(){
      return await $(this._pageHeader).getText();
    }


  /**
   * Converts an array of elements to array of string containing text values of the elements
   * @param Array of Elements
   * @returns Array of Strings
   */
  async getElementsText(elementArray){
    let textArray = [];
    for (const elem of elementArray){
      let elemText = await elem.getText();
      textArray.push(elemText)
    }

    return textArray;
  }

  /**
   * Search through list of elements and return one that matches a specified test value
   * @param elementArray
   * @param elementText
   * @returns {Promise<WebElement>}
   */
  async getElementWithText(elementArray, elementText){
    let textArray = [];
    let element = null;
    let found = false;

    for (const e of elementArray){
      let text = await e.getText();
      textArray.push(text);

      if (text === elementText){
        element = e;
        found = true;
        break;
      }
    }

    if (!found){
      throw new CustomError(`Could not find '${elementText}' in: ${textArray}`)
    }

    return element;
  }

}

module.exports = BasePage;
