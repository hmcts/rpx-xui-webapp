/**
 * WebDriver Radio field component class
 */
const DEFAULT_TIMEOUT = 5000;
class RadioField{

  /**
   * This css should be an <input> tag
   * @param css
   * @param radioButtonId
   */
  constructor(css, radioButtonId){
    this.css = css;
    this.wrapperXPath = `//ccd-field-write[div/ccd-write-yes-no-field//*[@id="${radioButtonId}"]]`;
  }

  /**
   * Click value
   * @param text
   */
  async click(){
    await $(this.css).click();
  }

  async waitForElementToBeInvisible(){
    const EC = protractor.ExpectedConditions;

    try {
      await browser.wait(EC.invisibilityOf(await element(by.xpath(this.wrapperXPath))), DEFAULT_TIMEOUT);
      return true;
    } catch (e) {
      let message = `timed out after ${DEFAULT_TIMEOUT} waiting for radio element ${element} to be invisible`;
      throw new CustomError(message, e);
    }
  }

  async waitForElementToBeVisible(){
    const EC = protractor.ExpectedConditions;

    try {
      await browser.wait(EC.visibilityOf(await element(by.xpath(this.wrapperXPath))), DEFAULT_TIMEOUT);
      return true;
    } catch (e) {
      let message = `timed out after ${DEFAULT_TIMEOUT} waiting for radio element ${element} to be visible`;
      throw new CustomError(message, e);
    }
  }

  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isPresent(){
    return await $(this.css).isPresent();
  }

  /**
   * Check the input tag is enabled
   * @returns {Promise<boolean|*>}
   */
  async isEnabled(){
    return await $(this.css).isEnabled();
  }


}

module.exports = RadioField;
