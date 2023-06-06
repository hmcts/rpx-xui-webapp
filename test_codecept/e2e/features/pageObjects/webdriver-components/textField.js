/**
 * WebDriver Text field component class
 */
const DEFAULT_TIMEOUT = 5000;
class TextField{

  /**
   * This css should be an <input> tag
   * @param css
   */
  constructor(css){
      this.css = css;
  }

  /**
   * Enter text value into the text boy
   * @param text
   */
  async enterText(text){
    await $(this.css).sendKeys(text);
  }
  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isType(type){
    return await $(this.css).getAttribute('type') === type;
  }

  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isPresent(){
    return await $(this.css).isPresent();
  }

  /**
   * Check the input tag is displayed
   * @returns {Promise<boolean|*>}
   */
  async isDisplayed(){
    return await $(this.css).isDisplayed();
  }

  async waitForElementToBeInvisible(){
    const EC = protractor.ExpectedConditions;

    try {
      await browser.wait(EC.invisibilityOf(await element(by.css(this.css))), DEFAULT_TIMEOUT);
      return true;
    } catch (e) {
      let message = `timed out after ${DEFAULT_TIMEOUT} waiting for text element ${element} to be invisible`;
      throw new CustomError(message, e);
    }
  }

  async waitForElementToBeVisible(){
    const EC = protractor.ExpectedConditions;

    try {
      await browser.wait(EC.visibilityOf(await element(by.css(this.css))), DEFAULT_TIMEOUT);
      return true;
    } catch (e) {
      let message = `timed out after ${DEFAULT_TIMEOUT} waiting for text element ${element} to be visible`;
      throw new CustomError(message, e);
    }
  }

  /**
   * Clear contents of an input field
   */
  async clearField(){
    await $(this.css).clear();
  }

  /**
   * Get value of text box contents
   * @returns {Promise<String>}
   */
  async getText(){
    return await $(this.css).getAttribute('value');
  }

}

module.exports = TextField;
