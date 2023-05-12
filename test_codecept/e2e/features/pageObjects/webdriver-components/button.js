CustomError = require('../../../utils/errors/custom-error.js');
/**
 * WebDriver Button component class
 */
const DEFAULT_TIMEOUT = 5000;
class Button{

  /**
   * This css and content should be an <button> tag
   * @param css
   * @param content
   */
  constructor(css, content){
    this.css = css;
    this.content = content;
    this.xpath = `.//*[contains(text(), '${this.content}')]`;
  }

  /**
   * Checks if the button is present
   * @returns {Promise<Boolean>}
   */
  async isPresent(){
    let button = await this._getElementFinder();
    return await button.isPresent();
  }

  /**
   * Checks if the button is enabled
   * @returns {Promise<Boolean>}
   */
  async isEnabled(){
    let button = await this._getElementFinder();
    return await button.isEnabled();
  }

  async isDisplayed(){
    let displayed = null;
    try {
      displayed = await $(this.css).isDisplayed();
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
   * Click Button element
   */
  async click(){
      let button = await this._getElementFinder();
      await button.click();
  }

  /**
   * Wait for an element to be clickable or throw an error.
   * will wait for the DEFAULT_TIMEOUT value of 5000ms
   * @param element to wait to be clickable
   */
  async waitForElementToBeClickable(){
    // const EC = protractor.ExpectedConditions;

    // try {
    //   await browser.wait(await EC.elementToBeClickable(await this._getElementFinder()), DEFAULT_TIMEOUT);
    // } catch (e) {
    //   let message = `timed out after ${DEFAULT_TIMEOUT} waiting for element ${element} to be clickable`;
    //   throw new CustomError(message, e)
    // }
  }

  /**
   * Gets button text
   * @returns {Promise<String>}
   */
  async getText(){
    return await $(this.css).getText();
  }

  async _getElementFinder() {
    return this.content ? element(by.xpath(this.xpath)) : element(by.css(this.css));
  }
}

module.exports = Button;
